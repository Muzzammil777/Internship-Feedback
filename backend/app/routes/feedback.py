from datetime import datetime, timezone
from typing import Any, Dict, Optional
from uuid import uuid4

from bson import ObjectId
from fastapi import APIRouter, HTTPException, Query, Request
from pydantic import BaseModel, Field

from app.core.database import get_collection

router = APIRouter(prefix="/feedback", tags=["feedback"])
_company_feedback_store: Dict[str, Dict[str, Any]] = {}
_student_feedback_store: Dict[str, Dict[str, Any]] = {}


class CompanyRatings(BaseModel):
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
    studentId: str
    studentEmail: str = ""
    studentName: str
    role: str
    college: str
    projectTitle: str
    duration: str
    startDate: str
    endDate: str
    typeOfWorkHandled: str = ""
    difficultyLevel: str = "Intermediate"
    overallRating: int = Field(ge=1, le=5)
    ratings: CompanyRatings
    strengths: str = ""
    improvements: str = ""
    comments: str = ""
    recommendation: str = "Recommended"


class StudentFeedbackCreate(BaseModel):
    studentEmail: str
    studentName: str
    companyName: str
    learningExperience: int = Field(ge=0, le=5)
    mentorship: int = Field(ge=0, le=5)
    workEnvironment: int = Field(ge=0, le=5)
    communication: int = Field(ge=0, le=5)
    strengths: str = ""
    improvements: str = ""
    overallComments: str = ""


def _normalize_document(document: Dict[str, Any]) -> Dict[str, Any]:
    normalized = dict(document)
    if "_id" in normalized:
        normalized["id"] = str(normalized.pop("_id"))
    return normalized


@router.get("/company")
async def list_company_feedback(request: Request, student_id: Optional[str] = Query(default=None)):
    if not getattr(request.app.state, "mongodb_ready", False):
        documents = list(_company_feedback_store.values())
        if student_id is not None:
            documents = [document for document in documents if document["studentId"] == student_id]
        documents.sort(key=lambda document: document.get("createdAt", ""), reverse=True)
        return documents

    collection = get_collection("company_feedback")
    query = {} if student_id is None else {"studentId": student_id}
    documents = await collection.find(query).sort("createdAt", -1).to_list(length=100)
    return [_normalize_document(document) for document in documents]


@router.post("/company", status_code=201)
async def save_company_feedback(request: Request, payload: CompanyFeedbackCreate):
    document = payload.model_dump()
    document["createdAt"] = datetime.now(timezone.utc).isoformat()

    if not getattr(request.app.state, "mongodb_ready", False):
        existing = _company_feedback_store.get(payload.studentId, {})
        document["id"] = existing.get("id", str(uuid4()))
        _company_feedback_store[payload.studentId] = document
        return document

    collection = get_collection("company_feedback")
    await collection.update_one({"studentId": payload.studentId}, {"$set": document}, upsert=True)

    # Mark student workflow as completed once company feedback exists.
    try:
        students_collection = get_collection("students")
        student_object_id = ObjectId(payload.studentId)
        update_result = await students_collection.update_one(
            {"_id": student_object_id},
            {"$set": {"status": "completed"}},
        )

        if update_result.matched_count == 0 and payload.studentEmail:
            await students_collection.update_one(
                {"email": payload.studentEmail},
                {"$set": {"status": "completed"}},
            )
    except Exception:
        # Keep feedback save successful even if status update cannot be applied.
        pass

    saved = await collection.find_one({"studentId": payload.studentId})
    if saved is None:
        raise HTTPException(status_code=500, detail="Unable to save company feedback")
    return _normalize_document(saved)


@router.get("/student")
async def list_student_feedback(request: Request, student_email: Optional[str] = Query(default=None)):
    if not getattr(request.app.state, "mongodb_ready", False):
        documents = list(_student_feedback_store.values())
        if student_email is not None:
            documents = [document for document in documents if document["studentEmail"] == student_email]
        documents.sort(key=lambda document: document.get("createdAt", ""), reverse=True)
        return documents

    collection = get_collection("student_feedback")
    query = {} if student_email is None else {"studentEmail": student_email}
    documents = await collection.find(query).sort("createdAt", -1).to_list(length=100)
    return [_normalize_document(document) for document in documents]


@router.post("/student", status_code=201)
async def save_student_feedback(request: Request, payload: StudentFeedbackCreate):
    document = payload.model_dump()
    document["createdAt"] = datetime.now(timezone.utc).isoformat()

    if not getattr(request.app.state, "mongodb_ready", False):
        existing = _student_feedback_store.get(payload.studentEmail, {})
        document["id"] = existing.get("id", str(uuid4()))
        _student_feedback_store[payload.studentEmail] = document
        return document

    collection = get_collection("student_feedback")
    await collection.update_one(
        {"studentEmail": payload.studentEmail},
        {"$set": document},
        upsert=True,
    )
    saved = await collection.find_one({"studentEmail": payload.studentEmail})
    if saved is None:
        raise HTTPException(status_code=500, detail="Unable to save student feedback")
    return _normalize_document(saved)
