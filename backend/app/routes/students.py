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


def _serialize(doc: dict) -> dict:
    """Convert MongoDB _id ObjectId to string so it can be JSON-serialised."""
    doc["id"] = str(doc.pop("_id"))
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
