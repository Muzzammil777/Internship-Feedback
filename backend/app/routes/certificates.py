"""Certificate issuance routes — upload by admin, retrieval by student/admin."""

from __future__ import annotations

import base64
import binascii
import logging

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, status
from pymongo.errors import PyMongoError

from app.core.database import get_database
from app.core.security import (
    AuthenticatedUser,
    ensure_student_access,
    get_current_user,
    require_company,
)

router = APIRouter(prefix="/certificates", tags=["certificates"])
logger = logging.getLogger(__name__)

MAX_CERT_BYTES = 10 * 1024 * 1024  # 10 MB


# ---------------------------------------------------------------------------
# Admin: upload / replace a student certificate
# ---------------------------------------------------------------------------

@router.post("/{student_email}", status_code=201)
async def upload_certificate(
    student_email: str,
    file: UploadFile = File(...),
    current_user: AuthenticatedUser = Depends(require_company),
) -> dict:
    """Upload (or replace) the internship certificate PDF for a student.
    Restricted to company/admin role only.
    """

    # --- Validate MIME type ------------------------------------------------
    content_type = (file.content_type or "").lower()
    if content_type != "application/pdf":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Only PDF files are accepted for certificates.",
        )

    # --- Read & validate size -----------------------------------------------
    raw_bytes = await file.read()
    if len(raw_bytes) == 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="The uploaded file is empty.",
        )
    if len(raw_bytes) > MAX_CERT_BYTES:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Certificate file must be 10 MB or smaller.",
        )

    # --- Encode to base64 data URL -----------------------------------------
    b64 = base64.b64encode(raw_bytes).decode("ascii")
    data_url = f"data:application/pdf;base64,{b64}"

    # --- Persist to the students collection --------------------------------
    db = get_database()
    student = await db["students"].find_one({"email": student_email})
    if not student:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Student not found.",
        )

    try:
        await db["students"].update_one(
            {"email": student_email},
            {"$set": {"certificate": data_url}},
        )
    except PyMongoError as exc:
        logger.error("Failed to save certificate for %s: %s", student_email, exc)
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to save certificate.",
        ) from exc

    return {
        "message": "Certificate uploaded successfully.",
        "student_email": student_email,
    }


# ---------------------------------------------------------------------------
# Admin: delete a student certificate
# ---------------------------------------------------------------------------

@router.delete("/{student_email}", status_code=200)
async def delete_certificate(
    student_email: str,
    current_user: AuthenticatedUser = Depends(require_company),
) -> dict:
    """Remove the certificate for a student. Admin only."""

    db = get_database()
    student = await db["students"].find_one({"email": student_email})
    if not student:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Student not found.")

    if not student.get("certificate"):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="No certificate found for this student.")

    try:
        await db["students"].update_one(
            {"email": student_email},
            {"$unset": {"certificate": ""}},
        )
    except PyMongoError as exc:
        logger.error("Failed to delete certificate for %s: %s", student_email, exc)
        raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Failed to delete certificate.") from exc

    return {"message": "Certificate removed successfully."}


# ---------------------------------------------------------------------------
# Student / Admin: retrieve certificate status + data URL
# ---------------------------------------------------------------------------

@router.get("/{student_email}")
async def get_certificate(
    student_email: str,
    current_user: AuthenticatedUser = Depends(get_current_user),
) -> dict:
    """Return the certificate data URL for a student.
    Students can only access their own certificate.
    """

    await ensure_student_access(current_user, student_email=student_email)

    db = get_database()
    student = await db["students"].find_one(
        {"email": student_email},
        {"certificate": 1, "_id": 0},
    )

    if not student:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Student not found.")

    certificate = student.get("certificate") or None
    return {
        "student_email": student_email,
        "available": certificate is not None,
        "certificate": certificate,
    }
