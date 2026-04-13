import logging
from bson import ObjectId
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr

from app.core.database import get_database

router = APIRouter(prefix="/students", tags=["students"])
logger = logging.getLogger(__name__)


class CreateStudentRequest(BaseModel):
    name: str
    email: EmailStr
    password: str
    role_title: str = ""   # internship role / department (e.g. "Engineering - Frontend")
    college: str = ""


class TaskPayload(BaseModel):
    id: str
    title: str
    description: str


class UpdateStudentProfileRequest(BaseModel):
    name: str
    email: EmailStr
    phone: str = ""
    role_title: str = ""
    college: str = ""
    startDate: str = ""
    endDate: str = ""
    duration: str = ""
    supervisor: str = ""
    supervisorEmail: str = ""
    skills: list[str] = []
    tasks: list[TaskPayload] = []


def _serialize(doc: dict) -> dict:
    """Convert MongoDB _id ObjectId to string and ensure default fields exist."""
    doc["id"] = str(doc.pop("_id"))
    # Ensure UI-expected fields exist
    doc.setdefault("tasks", [])
    doc.setdefault("skills", [])
    doc.setdefault("role_title", "")
    doc.setdefault("college", "")
    doc.setdefault("status", "pending")
    # Mapping backend role_title to frontend Role and college to COLLEGE for consistency
    doc["Role"] = doc.get("role_title", "")
    doc["COLLEGE"] = doc.get("college", "")
    return doc


@router.get("")
async def list_students() -> list[dict]:
    try:
        db = get_database()
        cursor = db["students"].find({})
        students = [_serialize(doc) async for doc in cursor]
        return students
    except Exception as e:
        logger.error("Failed to list students: %s", e)
        return []


@router.get("/profile/{email}")
async def get_student_profile(email: str) -> dict:
    try:
        db = get_database()
        student = await db["students"].find_one({"email": email})
        if not student:
            raise HTTPException(status_code=404, detail="Student profile not found")
        return _serialize(student)
    except Exception as e:
        if isinstance(e, HTTPException):
            raise e
        logger.error("Failed to fetch student profile: %s", e)
        raise HTTPException(status_code=500, detail="Internal server error")



@router.post("", status_code=201)
async def create_student(payload: CreateStudentRequest) -> dict:
    db = get_database()

    # Prevent duplicate emails
    existing = await db["students"].find_one({"email": payload.email})
    if existing:
        raise HTTPException(status_code=409, detail="A student with this email already exists.")

    # Also block using the same email as an existing user account
    existing_user = await db["users"].find_one({"email": payload.email})
    if existing_user:
        raise HTTPException(status_code=409, detail="This email is already registered as a user account.")

    student_doc = {
        "name": payload.name,
        "email": payload.email,
        "password": payload.password,
        "role_title": payload.role_title,
        "college": payload.college,
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

    # Insert into students collection
    result = await db["students"].insert_one(student_doc)

    # Also add to users collection so they can log in
    await db["users"].insert_one({
        "name": payload.name,
        "email": payload.email,
        "password": payload.password,
        "role": "student",
    })

    created = await db["students"].find_one({"_id": result.inserted_id})
    return _serialize(created)


@router.put("/profile/{email}")
async def update_student_profile(email: str, payload: UpdateStudentProfileRequest) -> dict:
    db = get_database()

    existing = await db["students"].find_one({"email": email})
    if not existing:
        raise HTTPException(status_code=404, detail="Student profile not found")

    if payload.email != email:
        duplicate = await db["students"].find_one({"email": payload.email})
        if duplicate and str(duplicate.get("_id")) != str(existing.get("_id")):
            raise HTTPException(status_code=409, detail="A student with this email already exists.")

    updated_doc = {
        "name": payload.name,
        "email": payload.email,
        "phone": payload.phone,
        "role_title": payload.role_title,
        "college": payload.college,
        "startDate": payload.startDate,
        "endDate": payload.endDate,
        "duration": payload.duration,
        "supervisor": payload.supervisor,
        "supervisorEmail": payload.supervisorEmail,
        "skills": payload.skills,
        "tasks": [task.model_dump() for task in payload.tasks],
    }

    await db["students"].update_one({"_id": existing["_id"]}, {"$set": updated_doc})

    if payload.email != email:
        await db["users"].update_one(
            {"email": email, "role": "student"},
            {"$set": {"email": payload.email, "name": payload.name}},
        )
    else:
        await db["users"].update_one(
            {"email": email, "role": "student"},
            {"$set": {"name": payload.name}},
        )

    updated = await db["students"].find_one({"_id": existing["_id"]})
    return _serialize(updated)
