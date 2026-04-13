from __future__ import annotations

from typing import List, Optional

from pydantic import EmailStr, Field

from .common import BaseDocument, PyObjectId


class CompanyDocument(BaseDocument):
    name: str = Field(min_length=2, max_length=160)
    contact_email: Optional[EmailStr] = None
    admin_user_ids: List[PyObjectId] = Field(default_factory=list)
    is_active: bool = True
