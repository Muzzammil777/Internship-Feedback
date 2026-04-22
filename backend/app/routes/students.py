"""Student management routes for listing and creating intern records."""

from __future__ import annotations

import base64
import binascii
import logging
import re
import secrets

from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, ConfigDict, EmailStr, Field, field_validator
from pymongo.errors import DuplicateKeyError, PyMongoError

from app.core.crypto import hash_password
from app.core.database import get_database
from app.core.security import AuthenticatedUser, get_current_user, require_company, ensure_student_access

router = APIRouter(prefix="/students", tags=["students"])
logger = logging.getLogger(__name__)
MAX_PROFILE_PHOTO_BYTES = 2 * 1024 * 1024
PROFILE_PHOTO_DATA_URL_PATTERN = re.compile(
    r"^data:(image/jpeg|image/png);base64,([A-Za-z0-9+/=\s]+)$",
    re.IGNORECASE,
)


class CreateStudentRequest(BaseModel):
    """Payload used when creating a student account from company dashboard."""

    model_config = ConfigDict(extra="forbid")

    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    password: str = Field(min_length=6, max_length=128)
    role_title: str = Field(default="", max_length=120)
    college: str = Field(default="", max_length=150)
    college_department: str = Field(default="", max_length=150)


class TaskPayload(BaseModel):
    model_config = ConfigDict(extra="forbid")

    id: str = Field(min_length=1, max_length=64)
    title: str = Field(min_length=1, max_length=200)
    description: str = Field(min_length=1, max_length=2000)


class UpdateStudentProfileRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    name: str = Field(min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(default="", max_length=30)
    profilePhoto: str = Field(default="", max_length=3_000_000)
    role_title: str = Field(default="", max_length=120)
    college: str = Field(default="", max_length=150)
    college_department: str = Field(default="", max_length=150)
    startDate: str = Field(default="", max_length=64)
    endDate: str = Field(default="", max_length=64)
    duration: str = Field(default="", max_length=64)
    supervisor: str = Field(default="", max_length=120)
    supervisorEmail: str = Field(default="", max_length=254)
    skills: list[str] = Field(default_factory=list, max_length=50)
    tasks: list[TaskPayload] = Field(default_factory=list, max_length=50)

    @field_validator("profilePhoto")
    @classmethod
    def validate_profile_photo(cls, value: str) -> str:
        if not value:
            return value

        match = PROFILE_PHOTO_DATA_URL_PATTERN.match(value.strip())
        if not match:
            raise ValueError("Profile photo must be a JPEG or PNG data URL")

        payload = match.group(2).replace("\n", "").replace("\r", "").strip()
        try:
            raw_bytes = base64.b64decode(payload, validate=True)
        except binascii.Error as exc:
            raise ValueError("Profile photo data is not valid base64") from exc

        if len(raw_bytes) > MAX_PROFILE_PHOTO_BYTES:
            raise ValueError("Profile photo must be 2MB or smaller")

        return value


class ResetStudentPasswordRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")

    password: str | None = Field(default=None, min_length=6, max_length=128)


def _serialize(doc: dict) -> dict:
    """Convert MongoDB _id ObjectId to string and ensure default fields exist."""
    serialized = dict(doc)
    serialized["id"] = str(serialized.pop("_id"))
    serialized.pop("password", None)
    serialized.pop("password_hash", None)
    serialized.pop("student_id", None)

    serialized.setdefault("name", "")
    serialized.setdefault("email", "")
    serialized.setdefault("tasks", [])
    serialized.setdefault("skills", [])
    serialized.setdefault("profilePhoto", "")
    serialized.setdefault("role_title", "")
    serialized.setdefault("college", "")
    serialized.setdefault("college_department", "")
    serialized.setdefault("status", "pending")
    serialized.setdefault("phone", "")
    serialized.setdefault("supervisor", "")
    serialized.setdefault("supervisorEmail", "")
    serialized.setdefault("startDate", "")
    serialized.setdefault("endDate", "")
    serialized.setdefault("duration", "")
    serialized.setdefault("company_name", "")

    serialized["Role"] = serialized.get("role_title", "")
    serialized["COLLEGE"] = serialized.get("college", "")
    serialized["COLLEGE_DEPARTMENT"] = serialized.get("college_department", "")
    return serialized


@router.get("")
async def list_students(current_user: AuthenticatedUser = Depends(require_company)) -> list[dict]:
    """Return all students from MongoDB, or an empty list when DB is unavailable."""

    try:
        db = get_database()
        cursor = db["students"].find({})
        students = [_serialize(doc) async for doc in cursor]
        return students
    except PyMongoError as exc:
        logger.error("Failed to list students: %s", exc)
        return []


@router.get("/profile/{email}")
async def get_student_profile(
    email: str,
    current_user: AuthenticatedUser = Depends(get_current_user),
) -> dict:
    try:
        await ensure_student_access(current_user, student_email=email)

        db = get_database()
        student = await db["students"].find_one({"email": email})
        if not student:
            raise HTTPException(status_code=404, detail="Student profile not found")
        return _serialize(student)
    except HTTPException:
        raise
    except Exception as exc:
        logger.error("Failed to fetch student profile: %s", exc)
        raise HTTPException(status_code=500, detail="Internal server error") from exc


@router.post("", status_code=201)
async def create_student(
    payload: CreateStudentRequest,
    current_user: AuthenticatedUser = Depends(require_company),
) -> dict:
    """Create a student record and a matching user login record."""

    db = get_database()

    existing_student = await db["students"].find_one({"email": payload.email})
    if existing_student:
        raise HTTPException(status_code=409, detail="A student with this email already exists.")

    existing_user = await db["users"].find_one({"email": payload.email})
    if existing_user:
        raise HTTPException(status_code=409, detail="This email is already registered as a user account.")

    student_doc = {
        "name": payload.name,
        "email": payload.email,
        "profilePhoto": "",
        "role_title": payload.role_title,
        "college": payload.college,
        "college_department": payload.college_department,
        "status": "pending",
        "tasks": [],
        "skills": [],
        "company_name": "",
        "phone": "",
        "supervisor": "",
        "supervisorEmail": "",
        "startDate": "",
        "endDate": "",
        "duration": "",
    }

    student_result = None
    try:
        student_result = await db["students"].insert_one(student_doc)
        user_doc = {
            "name": payload.name,
            "email": payload.email,
            "password_hash": hash_password(payload.password),
            "role": "student",
            "student_id": str(student_result.inserted_id),
        }
        await db["users"].insert_one(user_doc)
    except DuplicateKeyError as exc:
        if student_result is not None:
            await db["students"].delete_one({"_id": student_result.inserted_id})
        raise HTTPException(status_code=409, detail="A student with this email already exists.") from exc
    except PyMongoError as exc:
        if student_result is not None:
            await db["students"].delete_one({"_id": student_result.inserted_id})
        logger.error("Failed to create student account: %s", exc)
        raise HTTPException(status_code=500, detail="Failed to create student") from exc

    created = await db["students"].find_one({"_id": student_result.inserted_id})
    if created is None:
        raise HTTPException(status_code=500, detail="Failed to create student")
    return _serialize(created)


@router.put("/profile/{email}")
async def update_student_profile(
    email: str,
    payload: UpdateStudentProfileRequest,
    current_user: AuthenticatedUser = Depends(get_current_user),
) -> dict:
    db = get_database()

    existing = await db["students"].find_one({"email": email})
    if not existing:
        raise HTTPException(status_code=404, detail="Student profile not found")

    await ensure_student_access(current_user, student_email=email, student_id=str(existing["_id"]))

    if payload.email != email:
        duplicate = await db["students"].find_one({"email": payload.email})
        if duplicate and str(duplicate.get("_id")) != str(existing.get("_id")):
            raise HTTPException(status_code=409, detail="A student with this email already exists.")

    updated_doc = {
        "name": payload.name,
        "email": payload.email,
        "phone": payload.phone,
        "profilePhoto": payload.profilePhoto,
        "status": existing.get("status", "pending"),
        "role_title": payload.role_title,
        "college": payload.college,
        "college_department": payload.college_department,
        "startDate": payload.startDate,
        "endDate": payload.endDate,
        "duration": payload.duration,
        "supervisor": payload.supervisor,
        "supervisorEmail": payload.supervisorEmail,
        "skills": payload.skills,
        "tasks": [task.model_dump() for task in payload.tasks],
    }

    try:
        await db["students"].update_one({"_id": existing["_id"]}, {"$set": updated_doc})
        user_update = {
            "email": payload.email,
            "name": payload.name,
        }
        result = await db["users"].update_one(
            {"student_id": str(existing["_id"])},
            {"$set": user_update},
        )
        if result.matched_count == 0:
            await db["users"].update_one(
                {"email": email, "role": "student"},
                {"$set": user_update},
            )
    except DuplicateKeyError as exc:
        raise HTTPException(status_code=409, detail="A student with this email already exists.") from exc
    except PyMongoError as exc:
        logger.error("Failed to update student profile: %s", exc)
        raise HTTPException(status_code=500, detail="Failed to update student profile") from exc

    updated = await db["students"].find_one({"_id": existing["_id"]})
    if updated is None:
        raise HTTPException(status_code=500, detail="Failed to update student profile")
    return _serialize(updated)


@router.delete("/{student_id}")
async def delete_student(
    student_id: str,
    current_user: AuthenticatedUser = Depends(require_company),
) -> dict:
    db = get_database()

    try:
        student_object_id = ObjectId(student_id)
    except Exception as exc:
        raise HTTPException(status_code=400, detail="Invalid student id") from exc

    existing = await db["students"].find_one({"_id": student_object_id})
    if not existing:
        raise HTTPException(status_code=404, detail="Student not found")

    try:
        await db["students"].delete_one({"_id": student_object_id})

        student_email = existing.get("email")
        if student_email:
            await db["users"].delete_one({"email": student_email, "role": "student"})
            await db["users"].delete_one({"student_id": student_id})

        return {"message": "Student deleted successfully", "id": student_id}
    except PyMongoError as exc:
        logger.error("Failed to delete student %s: %s", student_id, exc)
        raise HTTPException(status_code=500, detail="Failed to delete student") from exc


@router.post("/{student_id}/reset-password")
async def reset_student_password(
    student_id: str,
    payload: ResetStudentPasswordRequest,
    current_user: AuthenticatedUser = Depends(require_company),
) -> dict:
    db = get_database()

    try:
        student_object_id = ObjectId(student_id)
    except Exception as exc:
        raise HTTPException(status_code=400, detail="Invalid student id") from exc

    student = await db["students"].find_one({"_id": student_object_id})
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    new_password = payload.password or secrets.token_urlsafe(8)

    try:
        update_result = await db["users"].update_one(
            {"student_id": student_id},
            {"$set": {"password_hash": hash_password(new_password)}, "$unset": {"password": ""}},
        )
        if update_result.matched_count == 0:
            student_email = student.get("email")
            if not student_email:
                raise HTTPException(status_code=404, detail="Student account not found")
            update_result = await db["users"].update_one(
                {"email": student_email, "role": "student"},
                {"$set": {"password_hash": hash_password(new_password)}, "$unset": {"password": ""}},
            )
            if update_result.matched_count == 0:
                raise HTTPException(status_code=404, detail="Student account not found")
    except PyMongoError as exc:
        logger.error("Failed to reset student password %s: %s", student_id, exc)
        raise HTTPException(status_code=500, detail="Failed to reset student password") from exc

    return {
        "message": "Password reset successfully",
        "temporaryPassword": new_password,
    }
