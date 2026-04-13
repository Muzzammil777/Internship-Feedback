"""Authentication routes for demo and database-backed login flows."""

import logging

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, EmailStr
from pymongo.errors import PyMongoError

from app.core.config import get_settings
from app.core.database import get_database

router = APIRouter(prefix="/auth", tags=["auth"])
settings = get_settings()
logger = logging.getLogger(__name__)


class LoginRequest(BaseModel):
    """Login payload expected by the authentication endpoint."""

    email: EmailStr
    password: str


@router.post("/login")
async def login(payload: LoginRequest) -> dict[str, str]:
    """Authenticate a user via MongoDB, with demo credential fallback."""

    user = None

    try:
        users = get_database()["users"]
        user = await users.find_one({"email": payload.email, "password": payload.password})
    except PyMongoError as e:
        logger.warning("MongoDB lookup failed, falling back to demo credentials. Error: %s", e)
        user = None

    if user is None:
        if (
            payload.email == settings.demo_student_email
            and payload.password == settings.demo_student_password
        ):
            user = {
                "email": settings.demo_student_email,
                "name": "Alex Johnson",
                "role": "student",
            }
        elif (
            payload.email == settings.demo_company_email
            and payload.password == settings.demo_company_password
        ):
            user = {
                "email": settings.demo_company_email,
                "name": "Company Admin",
                "role": "company",
            }

    if user is None:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return {
        "access_token": "demo-token",
        "token_type": "bearer",
        "email": user["email"],
        "name": user["name"],
        "role": user["role"],
    }
