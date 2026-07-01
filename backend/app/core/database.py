import asyncio
import logging
from typing import Optional

logger = logging.getLogger(__name__)

from motor.motor_asyncio import AsyncIOMotorClient, AsyncIOMotorDatabase

from .config import get_settings
from .crypto import hash_password

_settings = get_settings()
_client: Optional[AsyncIOMotorClient] = None


def get_client() -> AsyncIOMotorClient:
    global _client
    if _client is None:
        _client = AsyncIOMotorClient(_settings.mongodb_uri)
    return _client


def get_database() -> AsyncIOMotorDatabase:
    return get_client()[_settings.mongodb_db]


def get_collection(name: str):
    return get_database()[name]


async def ensure_indexes() -> None:
    database = get_database()
    await database["users"].create_index("email", unique=True, name="uq_users_email")
    await database["students"].create_index("email", unique=True, name="uq_students_email")


async def initialize_database() -> bool:
    try:
        database = get_database()
        # Try to ping with a 10 second timeout
        await asyncio.wait_for(database.command("ping"), timeout=10.0)
        await ensure_indexes()

        students = database["students"]
        users = database["users"]

        # Ensure demo student exists in students collection
        demo_student = await students.find_one({"email": _settings.demo_student_email})
        if not demo_student:
            student_doc = {
                "name": "Alex Johnson",
                "email": _settings.demo_student_email,
                "profilePhoto": "",
                "role_title": "Software Engineer Intern",
                "college": "State University",
                "college_department": "Computer Science",
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
                "hr": "",
                "manager": "",
                "offer_letter": "",
                "nda": "",
                "payment": "",
                "pmo": "",
            }
            insert_result = await students.insert_one(student_doc)
            student_id = str(insert_result.inserted_id)
        else:
            student_id = str(demo_student["_id"])

        # Ensure demo student exists in users collection and is linked
        demo_student_user = await users.find_one({"email": _settings.demo_student_email})
        if not demo_student_user:
            await users.insert_one(
                {
                    "name": "Alex Johnson",
                    "email": _settings.demo_student_email,
                    "password_hash": hash_password(_settings.demo_student_password),
                    "role": "student",
                    "student_id": student_id,
                }
            )
        elif demo_student_user.get("student_id") != student_id:
            await users.update_one(
                {"email": _settings.demo_student_email},
                {"$set": {"student_id": student_id}}
            )

        # Ensure demo company admin exists in users collection
        demo_company_user = await users.find_one({"email": _settings.demo_company_email})
        if not demo_company_user:
            await users.insert_one(
                {
                    "name": "Company Admin",
                    "email": _settings.demo_company_email,
                    "password_hash": hash_password(_settings.demo_company_password),
                    "role": "company",
                }
            )

        return True
    except Exception as exc:
        logger.error("Failed to initialize database: %s", exc, exc_info=True)
        return False

