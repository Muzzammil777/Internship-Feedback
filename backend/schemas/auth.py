from __future__ import annotations

from typing import Optional

from pydantic import EmailStr, Field

from models.common import UserRole

from .common import APIModel


class LoginRequest(APIModel):
    email: EmailStr
    password: str = Field(min_length=6, max_length=128)


class AuthUserResponse(APIModel):
    email: EmailStr
    name: str = Field(min_length=2, max_length=120)
    role: UserRole
    student_id: Optional[str] = Field(default=None, alias="studentId")
    company_id: Optional[str] = Field(default=None, alias="companyId")


class LoginResponse(APIModel):
    access_token: str = Field(alias="accessToken", min_length=20)
    token_type: str = Field(default="bearer", alias="tokenType")
    expires_in: int = Field(default=3600, alias="expiresIn", ge=1)
    user: AuthUserResponse
