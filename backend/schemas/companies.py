from __future__ import annotations

from typing import List, Optional

from pydantic import EmailStr, Field

from .common import APIModel


class CompanyCreateRequest(APIModel):
    name: str = Field(min_length=2, max_length=160)
    contact_email: Optional[EmailStr] = Field(default=None, alias="contactEmail")


class CompanyResponse(APIModel):
    id: str
    name: str
    contact_email: Optional[EmailStr] = Field(default=None, alias="contactEmail")
    admin_user_ids: List[str] = Field(default_factory=list, alias="adminUserIds")
    is_active: bool = Field(default=True, alias="isActive")
