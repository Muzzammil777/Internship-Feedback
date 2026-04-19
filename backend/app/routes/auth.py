"""Authentication routes for demo and database-backed login flows."""

import logging

from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel, ConfigDict, EmailStr, Field
from pymongo.errors import PyMongoError

from app.core.config import get_settings
from app.core.database import get_database
from app.core.crypto import hash_password, verify_password
from app.core.security import create_access_token, limiter

router = APIRouter(prefix="/auth", tags=["auth"])
settings = get_settings()
logger = logging.getLogger(__name__)


class LoginRequest(BaseModel):
    """Login payload expected by the authentication endpoint."""

    model_config = ConfigDict(extra="forbid")

    email: EmailStr
    password: str = Field(min_length=6, max_length=128)


@router.post("/login")
@limiter.limit(settings.login_rate_limit)
async def login(request: Request, payload: LoginRequest) -> dict[str, str]:
    """Authenticate a user via MongoDB, with demo credential fallback."""

    user = None

    try:
        users = get_database()["users"]
        user = await users.find_one({"email": payload.email})
        if user is not None:
            password_hash = user.get("password_hash")
            stored_password = user.get("password")

            if password_hash and verify_password(payload.password, password_hash):
                user = {**user}
            elif stored_password and payload.password == stored_password:
                updated_password_hash = hash_password(payload.password)
                await users.update_one(
                    {"_id": user["_id"]},
                    {"$set": {"password_hash": updated_password_hash}, "$unset": {"password": ""}},
                )
                user = {**user, "password_hash": updated_password_hash}
            else:
                user = None
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

    access_token = create_access_token(
        subject=user["email"],
        role=user["role"],
        name=user["name"],
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "email": user["email"],
        "name": user["name"],
        "role": user["role"],
    }
