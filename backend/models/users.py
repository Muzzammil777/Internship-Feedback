from __future__ import annotations

from datetime import datetime
from typing import Optional

from pydantic import EmailStr, Field

from .common import BaseDocument, PyObjectId, UserRole


class UserDocument(BaseDocument):
    email: EmailStr
    name: str = Field(min_length=2, max_length=120)
    password_hash: str = Field(min_length=60, max_length=255)
    role: UserRole

    # Role-scoped links. Only one should typically be set.
    company_id: Optional[PyObjectId] = None
    student_id: Optional[PyObjectId] = None

    is_active: bool = True
    last_login_at: Optional[datetime] = None
