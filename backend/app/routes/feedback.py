from __future__ import annotations

import logging
from datetime import datetime, timezone
from typing import Any, Dict, List, Literal, Optional, Union
from uuid import uuid4

from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException, Query, Request
from pydantic import BaseModel, ConfigDict, EmailStr, Field
from pymongo.errors import PyMongoError

from app.core.database import get_collection, get_database
from app.core.config import get_settings
from app.core.security import (
    AuthenticatedUser,
    ensure_company_feedback_access,
    ensure_student_email_ownership,
    get_current_user,
    limiter,
    require_company,
)

router = APIRouter(prefix="/feedback", tags=["feedback"])
_company_feedback_store: Dict[str, Dict[str, Any]] = {}
_student_feedback_store: Dict[str, Dict[str, Any]] = {}
logger = logging.getLogger(__name__)
settings = get_settings()


async def _ensure_mongodb_ready(request: Request) -> bool:
    """Probe MongoDB on-demand to avoid relying on stale startup readiness flags."""
    if getattr(request.app.state, "mongodb_ready", False):
        return True

    try:
        database = get_database()
        await database.command("ping")
        request.app.state.mongodb_ready = True
        return True
    except Exception as exc:
        request.app.state.mongodb_ready = False
        logger.warning("MongoDB ping failed in feedback route; using in-memory fallback: %s", exc)
        return False


async def _find_student_document(*, student_id: str | None = None, student_email: str | None = None) -> dict[str, Any] | None:
    students_collection = get_collection("students")

    if student_id:
        try:
            student_object_id = ObjectId(student_id)
        except Exception:
            student_object_id = None
        if student_object_id is not None:
            student = await students_collection.find_one({"_id": student_object_id})
            if student:
                return student

    if student_email:
        return await students_collection.find_one({"email": student_email})

    return None


class CompanyRatings(BaseModel):
    model_config = ConfigDict(extra="forbid")

    technicalKnowledge: int = Field(ge=1, le=5)
    codeQualityImplementation: int = Field(ge=1, le=5)
    taskCompletion: int = Field(ge=1, le=5)
    productivity: int = Field(ge=1, le=5)
    attentionToDetail: int = Field(ge=1, le=5)
    communicationClarity: int = Field(ge=1, le=5)
    reportingUpdates: int = Field(ge=1, le=5)
    punctuality: int = Field(ge=1, le=5)
    responsibility: int = Field(ge=1, le=5)
    discipline: int = Field(ge=1, le=5)
    collaboration: int = Field(ge=1, le=5)
    adaptability: int = Field(ge=1, le=5)
    opennessToFeedback: int = Field(ge=1, le=5)
    learningAbility: int = Field(ge=1, le=5)
    skillImprovement: int = Field(ge=1, le=5)
    initiativeToLearnNewThings: int = Field(ge=1, le=5)
    contributionToTeamProject: int = Field(ge=1, le=5)
    ownershipOfTasks: int = Field(ge=1, le=5)


class CompanyFeedbackCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    studentId: str = Field(min_length=1, max_length=64)
    studentEmail: str = Field(default="", max_length=254)
    studentName: str = Field(min_length=1, max_length=120)
    role: str = Field(min_length=1, max_length=120)
    college: str = Field(min_length=1, max_length=150)
    projectTitle: str = Field(min_length=1, max_length=150)
    duration: str = Field(min_length=1, max_length=64)
    startDate: str = Field(min_length=1, max_length=64)
    endDate: str = Field(min_length=1, max_length=64)
    typeOfWorkHandled: str = Field(default="", max_length=500)
    difficultyLevel: str = Field(default="Intermediate", max_length=64)
    overallRating: int = Field(ge=1, le=5)
    ratings: CompanyRatings
    strengths: str = Field(default="", max_length=2000)
    improvements: str = Field(default="", max_length=2000)
    comments: str = Field(default="", max_length=4000)
    recommendation: str = Field(default="Recommended", max_length=120)


class StudentFeedbackQuestion(BaseModel):
    model_config = ConfigDict(extra="forbid")

    questionId: str = Field(min_length=1, max_length=100)
    label: str = Field(min_length=1, max_length=200)
    type: Literal["rating", "boolean", "enum", "text"]
    value: Union[bool, int, str]


class StudentFeedbackSection(BaseModel):
    model_config = ConfigDict(extra="forbid")

    sectionId: str = Field(min_length=1, max_length=100)
    title: str = Field(min_length=1, max_length=200)
    questions: List[StudentFeedbackQuestion] = Field(min_length=1, max_length=64)


class StudentFeedbackCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")

    studentEmail: EmailStr
    studentName: str = Field(min_length=1, max_length=120)
    companyName: str = Field(min_length=1, max_length=150)
    department: str = Field(default="", max_length=150)
    sections: Optional[List[StudentFeedbackSection]] = None
    learningExperience: Optional[int] = Field(default=None, ge=0, le=5)
    mentorship: Optional[int] = Field(default=None, ge=0, le=5)
    workEnvironment: Optional[int] = Field(default=None, ge=0, le=5)
    communication: Optional[int] = Field(default=None, ge=0, le=5)
    strengths: str = Field(default="", max_length=2000)
    improvements: str = Field(default="", max_length=2000)
    overallComments: str = Field(default="", max_length=4000)


def _extract_rating_values_from_sections(sections: List[StudentFeedbackSection]) -> List[int]:
    rating_values: List[int] = []
    for section in sections:
        for question in section.questions:
            if question.type != "rating":
                continue

            if not isinstance(question.value, int) or isinstance(question.value, bool):
                raise HTTPException(
                    status_code=422,
                    detail=f"Question '{question.questionId}' expects integer rating value",
                )
            if question.value < 1 or question.value > 5:
                raise HTTPException(
                    status_code=422,
                    detail=f"Question '{question.questionId}' rating must be between 1 and 5",
                )
            rating_values.append(question.value)
    return rating_values


def _validate_section_answers(sections: List[StudentFeedbackSection]) -> None:
    for section in sections:
        for question in section.questions:
            value = question.value
            if question.type == "rating":
                if not isinstance(value, int) or isinstance(value, bool) or value < 1 or value > 5:
                    raise HTTPException(
                        status_code=422,
                        detail=f"Question '{question.questionId}' rating must be an integer between 1 and 5",
                    )
            elif question.type == "boolean":
                if not isinstance(value, bool):
                    raise HTTPException(
                        status_code=422,
                        detail=f"Question '{question.questionId}' expects a boolean value",
                    )
            elif question.type == "enum":
                if not isinstance(value, str) or not value.strip():
                    raise HTTPException(
                        status_code=422,
                        detail=f"Question '{question.questionId}' expects a non-empty option",
                    )
            elif question.type == "text":
                if not isinstance(value, str):
                    raise HTTPException(
                        status_code=422,
                        detail=f"Question '{question.questionId}' expects a text value",
                    )


def _calculate_legacy_overall(payload: StudentFeedbackCreate) -> float:
    values = [
        int(payload.learningExperience or 0),
        int(payload.mentorship or 0),
        int(payload.workEnvironment or 0),
        int(payload.communication or 0),
    ]
    return round(sum(values) / len(values), 2)


def _normalize_document(document: Dict[str, Any]) -> Dict[str, Any]:
    normalized = dict(document)
    if "_id" in normalized:
        normalized["id"] = str(normalized.pop("_id"))
    return normalized


@router.get("/company")
async def list_company_feedback(
    request: Request,
    current_user: AuthenticatedUser = Depends(get_current_user),
    student_id: Optional[str] = Query(default=None),
):
    effective_student_id = student_id or current_user.student_id
    if current_user.role == "student":
        await ensure_company_feedback_access(current_user, student_id=effective_student_id)

    if not await _ensure_mongodb_ready(request):
        documents = list(_company_feedback_store.values())
        if effective_student_id is not None:
            documents = [document for document in documents if document["studentId"] == effective_student_id]
        documents.sort(key=lambda document: document.get("createdAt", ""), reverse=True)
        return documents

    try:
        collection = get_collection("company_feedback")
        query = {} if effective_student_id is None else {"studentId": effective_student_id}
        documents = await collection.find(query).sort("createdAt", -1).to_list(length=100)
        return [_normalize_document(document) for document in documents]
    except Exception as exc:
        request.app.state.mongodb_ready = False
        logger.warning("MongoDB read failed for company feedback; using in-memory fallback: %s", exc)
        documents = list(_company_feedback_store.values())
        if effective_student_id is not None:
            documents = [document for document in documents if document["studentId"] == effective_student_id]
        documents.sort(key=lambda document: document.get("createdAt", ""), reverse=True)
        return documents


@router.post("/company", status_code=201)
@limiter.limit(settings.feedback_rate_limit)
async def save_company_feedback(
    request: Request,
    payload: CompanyFeedbackCreate,
    current_user: AuthenticatedUser = Depends(require_company),
):
    student_document = await _find_student_document(student_id=payload.studentId, student_email=payload.studentEmail or None)
    if student_document is None:
        raise HTTPException(status_code=404, detail="Student not found")

    student_email = str(student_document.get("email", ""))
    if payload.studentEmail and payload.studentEmail != student_email:
        raise HTTPException(status_code=422, detail="Student email does not match the selected student")

    document = payload.model_dump()
    document["studentEmail"] = student_email
    document["createdAt"] = datetime.now(timezone.utc).isoformat()

    if not await _ensure_mongodb_ready(request):
        existing = _company_feedback_store.get(payload.studentId, {})
        document["id"] = existing.get("id", str(uuid4()))
        _company_feedback_store[payload.studentId] = document
        logger.info("Company feedback stored in fallback cache for student_id=%s by %s", payload.studentId, current_user.email)
        return document

    try:
        collection = get_collection("company_feedback")
        await collection.update_one({"studentId": payload.studentId}, {"$set": document}, upsert=True)

        try:
            students_collection = get_collection("students")
            student_object_id = ObjectId(payload.studentId)
            update_result = await students_collection.update_one(
                {"_id": student_object_id},
                {"$set": {"status": "completed"}},
            )

            if update_result.matched_count == 0:
                await students_collection.update_one(
                    {"email": student_email},
                    {"$set": {"status": "completed"}},
                )
        except Exception as exc:
            logger.debug("Unable to mark student as completed after company feedback save: %s", exc)

        saved = await collection.find_one({"studentId": payload.studentId})
        if saved is None:
            raise HTTPException(status_code=500, detail="Unable to save company feedback")

        logger.info("Company feedback saved for student_id=%s by %s", payload.studentId, current_user.email)
        return _normalize_document(saved)
    except Exception as exc:
        request.app.state.mongodb_ready = False
        logger.warning("MongoDB write failed for company feedback; using in-memory fallback: %s", exc)
        existing = _company_feedback_store.get(payload.studentId, {})
        document["id"] = existing.get("id", str(uuid4()))
        _company_feedback_store[payload.studentId] = document
        return document


@router.get("/student")
async def list_student_feedback(
    request: Request,
    current_user: AuthenticatedUser = Depends(get_current_user),
    student_email: Optional[str] = Query(default=None),
):
    effective_student_email = student_email
    if current_user.role == "student":
        effective_student_email = student_email or current_user.email
    if current_user.role == "student":
        await ensure_student_email_ownership(current_user, effective_student_email)

    if not await _ensure_mongodb_ready(request):
        documents = list(_student_feedback_store.values())
        if effective_student_email is not None:
            documents = [document for document in documents if document["studentEmail"] == effective_student_email]
        documents.sort(key=lambda document: document.get("createdAt", ""), reverse=True)
        return documents

    try:
        collection = get_collection("student_feedback")
        query = {} if effective_student_email is None else {"studentEmail": effective_student_email}
        documents = await collection.find(query).sort("createdAt", -1).to_list(length=100)
        return [_normalize_document(document) for document in documents]
    except Exception as exc:
        request.app.state.mongodb_ready = False
        logger.warning("MongoDB read failed for student feedback; using in-memory fallback: %s", exc)
        documents = list(_student_feedback_store.values())
        if effective_student_email is not None:
            documents = [document for document in documents if document["studentEmail"] == effective_student_email]
        documents.sort(key=lambda document: document.get("createdAt", ""), reverse=True)
        return documents


@router.post("/student", status_code=201)
@limiter.limit(settings.feedback_rate_limit)
async def save_student_feedback(
    request: Request,
    payload: StudentFeedbackCreate,
    current_user: AuthenticatedUser = Depends(get_current_user),
):
    if current_user.role != "student":
        raise HTTPException(status_code=403, detail="Only student accounts can submit student feedback")

    await ensure_student_email_ownership(current_user, str(payload.studentEmail))

    document = payload.model_dump()
    document["createdAt"] = datetime.now(timezone.utc).isoformat()

    if payload.sections:
        _validate_section_answers(payload.sections)
        rating_values = _extract_rating_values_from_sections(payload.sections)
        document["overallRating"] = round(sum(rating_values) / len(rating_values), 2) if rating_values else None
        document["ratingCount"] = len(rating_values)
    else:
        legacy_values = [
            payload.learningExperience,
            payload.mentorship,
            payload.workEnvironment,
            payload.communication,
        ]
        if any(value is None for value in legacy_values):
            raise HTTPException(
                status_code=422,
                detail=(
                    "Provide either sections payload or all legacy rating fields: "
                    "learningExperience, mentorship, workEnvironment, communication"
                ),
            )
        document["overallRating"] = _calculate_legacy_overall(payload)
        document["ratingCount"] = 4

    if not await _ensure_mongodb_ready(request):
        existing = _student_feedback_store.get(payload.studentEmail, {})
        document["id"] = existing.get("id", str(uuid4()))
        _student_feedback_store[payload.studentEmail] = document
        logger.info("Student feedback stored in fallback cache for %s", payload.studentEmail)
        return document

    try:
        collection = get_collection("student_feedback")
        await collection.update_one(
            {"studentEmail": str(payload.studentEmail)},
            {"$set": document},
            upsert=True,
        )
        saved = await collection.find_one({"studentEmail": str(payload.studentEmail)})
        if saved is None:
            raise HTTPException(status_code=500, detail="Unable to save student feedback")
        logger.info("Student feedback saved for %s", payload.studentEmail)
        return _normalize_document(saved)
    except Exception as exc:
        request.app.state.mongodb_ready = False
        logger.warning("MongoDB write failed for student feedback; using in-memory fallback: %s", exc)
        existing = _student_feedback_store.get(payload.studentEmail, {})
        document["id"] = existing.get("id", str(uuid4()))
        _student_feedback_store[payload.studentEmail] = document
        return document
