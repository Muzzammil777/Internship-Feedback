import asyncio
from typing import Optional

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
        # Try to ping with a 3 second timeout
        await asyncio.wait_for(database.command("ping"), timeout=3.0)
        await ensure_indexes()

        users = database["users"]
        if await users.count_documents({}) == 0:
            await users.insert_many(
                [
                    {
                        "name": "Alex Johnson",
                        "email": _settings.demo_student_email,
                        "password_hash": hash_password(_settings.demo_student_password),
                        "role": "student",
                    },
                    {
                        "name": "Company Admin",
                        "email": _settings.demo_company_email,
                        "password_hash": hash_password(_settings.demo_company_password),
                        "role": "company",
                    },
                ]
            )

        return True
    except Exception:
        return False
