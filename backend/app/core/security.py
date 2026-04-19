from __future__ import annotations

import logging
from datetime import datetime, timedelta, timezone
from typing import Any, Callable, Optional

from fastapi import Depends, Header, HTTPException, Request, status
from jose import JWTError, jwt
from pydantic import BaseModel, EmailStr, ConfigDict
from slowapi import Limiter
from slowapi.util import get_remote_address

from app.core.config import get_settings
from app.core.crypto import hash_password, verify_password
from app.core.database import get_collection

logger = logging.getLogger(__name__)
limiter = Limiter(key_func=get_remote_address, default_limits=[])


class AuthenticatedUser(BaseModel):
    model_config = ConfigDict(extra="forbid")

    id: str
    email: EmailStr
    name: str
    role: str
    student_id: Optional[str] = None
    company_id: Optional[str] = None


class TokenClaims(BaseModel):
    model_config = ConfigDict(extra="forbid")

    sub: EmailStr
    role: str
    name: str
    exp: Optional[int] = None
    iat: Optional[int] = None


def _get_bearer_token(authorization: str | None) -> str:
    if not authorization:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication credentials were not provided",
            headers={"WWW-Authenticate": "Bearer"},
        )

    scheme, _, token = authorization.partition(" ")
    if scheme.lower() != "bearer" or not token.strip():
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid authentication scheme",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return token.strip()


async def _load_user_by_email(email: str) -> dict[str, Any] | None:
    users_collection = get_collection("users")
    return await users_collection.find_one({"email": email})


async def _resolve_student_id(email: str) -> str | None:
    students_collection = get_collection("students")
    student = await students_collection.find_one({"email": email}, {"_id": 1})
    if not student:
        return None
    return str(student["_id"])


async def build_authenticated_user_from_token(token: str) -> AuthenticatedUser:
    settings = get_settings()

    try:
        claims = jwt.decode(token, settings.jwt_secret_key, algorithms=[settings.jwt_algorithm])
        token_data = TokenClaims.model_validate(claims)
    except JWTError as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        ) from exc
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token payload",
            headers={"WWW-Authenticate": "Bearer"},
        ) from exc

    if token_data.role not in {"student", "company"}:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token role",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user_doc = await _load_user_by_email(str(token_data.sub))
    if not user_doc:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="User account no longer exists",
            headers={"WWW-Authenticate": "Bearer"},
        )

    user_role = user_doc.get("role", token_data.role)
    student_id = user_doc.get("student_id")
    if user_role == "student" and not student_id:
        student_id = await _resolve_student_id(str(token_data.sub))

    return AuthenticatedUser(
        id=str(user_doc["_id"]),
        email=str(user_doc["email"]),
        name=str(user_doc.get("name") or token_data.name),
        role=str(user_role),
        student_id=str(student_id) if student_id else None,
        company_id=str(user_doc.get("company_id")) if user_doc.get("company_id") else None,
    )


async def authenticate_request(request: Request) -> AuthenticatedUser:
    current_user = getattr(request.state, "current_user", None)
    if isinstance(current_user, AuthenticatedUser):
        return current_user

    token = _get_bearer_token(request.headers.get("Authorization"))
    current_user = await build_authenticated_user_from_token(token)
    request.state.current_user = current_user
    return current_user


async def get_current_user(
    request: Request,
    authorization: str | None = Header(default=None),
) -> AuthenticatedUser:
    current_user = getattr(request.state, "current_user", None)
    if isinstance(current_user, AuthenticatedUser):
        return current_user

    token = _get_bearer_token(authorization)
    current_user = await build_authenticated_user_from_token(token)
    request.state.current_user = current_user
    return current_user


def require_roles(*allowed_roles: str) -> Callable[..., Any]:
    async def dependency(current_user: AuthenticatedUser = Depends(get_current_user)) -> AuthenticatedUser:
        if current_user.role not in allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have permission to access this resource",
            )
        return current_user

    return dependency


require_company = require_roles("company")
require_student = require_roles("student")


async def ensure_student_access(
    current_user: AuthenticatedUser,
    *,
    student_email: str | None = None,
    student_id: str | None = None,
) -> None:
    if current_user.role == "company":
        return

    if student_email and current_user.email == student_email:
        return

    if student_id and current_user.student_id and current_user.student_id == student_id:
        return

    if student_id and not current_user.student_id:
        resolved_student_id = await _resolve_student_id(current_user.email)
        if resolved_student_id and resolved_student_id == student_id:
            return

    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="You are not allowed to access this student data",
    )


async def ensure_student_email_ownership(
    current_user: AuthenticatedUser,
    student_email: str,
) -> None:
    if current_user.role == "company":
        return

    if current_user.email != student_email:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You are not allowed to access this student data",
        )


async def ensure_company_feedback_access(
    current_user: AuthenticatedUser,
    *,
    student_id: str | None = None,
    student_email: str | None = None,
) -> None:
    if current_user.role == "company":
        return

    if student_id and current_user.student_id and current_user.student_id == student_id:
        return

    if student_email and current_user.email == student_email:
        return

    raise HTTPException(
        status_code=status.HTTP_403_FORBIDDEN,
        detail="You are not allowed to access this feedback",
    )


def create_access_token(*, subject: str, role: str, name: str) -> str:
    settings = get_settings()
    issued_at = datetime.now(timezone.utc)
    expires_at = issued_at + timedelta(minutes=settings.access_token_expire_minutes)

    payload = {
        "sub": subject,
        "role": role,
        "name": name,
        "iat": int(issued_at.timestamp()),
        "exp": int(expires_at.timestamp()),
    }
    return jwt.encode(payload, settings.jwt_secret_key, algorithm=settings.jwt_algorithm)


__all__ = [
    "AuthenticatedUser",
    "authenticate_request",
    "create_access_token",
    "ensure_company_feedback_access",
    "ensure_student_access",
    "ensure_student_email_ownership",
    "get_current_user",
    "hash_password",
    "limiter",
    "require_company",
    "require_roles",
    "require_student",
    "verify_password",
]
