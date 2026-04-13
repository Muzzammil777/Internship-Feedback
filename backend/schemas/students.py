from __future__ import annotations

from datetime import date
from typing import List, Optional

from pydantic import EmailStr, Field, computed_field, field_validator, model_validator

from models.common import (
    InternshipStatus,
    calculate_duration_weeks,
    ensure_start_before_end,
    normalize_unique_strings,
)

from .common import APIModel


class TaskPayload(APIModel):
    id: Optional[str] = None
    title: str = Field(min_length=1, max_length=180)
    description: str = Field(min_length=1, max_length=3000)


class StudentCreateRequest(APIModel):
    name: str = Field(min_length=2, max_length=120)
    email: EmailStr
    password: str = Field(min_length=6, max_length=128)
    phone: Optional[str] = Field(default=None, max_length=30)

    college: str = Field(alias="COLLEGE", min_length=2, max_length=160)
    role_title: str = Field(alias="Role", min_length=2, max_length=120)
    supervisor: str = Field(min_length=2, max_length=120)
    supervisor_email: EmailStr = Field(alias="supervisorEmail")

    start_date: date = Field(alias="startDate")
    end_date: date = Field(alias="endDate")
    status: InternshipStatus = InternshipStatus.PENDING

    skills: List[str] = Field(default_factory=list, max_length=128)
    tasks: List[TaskPayload] = Field(default_factory=list, max_length=300)

    # Optional override, usually inferred from the authenticated company user.
    company_id: Optional[str] = Field(default=None, alias="companyId")

    @field_validator("skills")
    @classmethod
    def normalize_skills(cls, values: List[str]) -> List[str]:
        return normalize_unique_strings(values)

    @model_validator(mode="after")
    def validate_date_range(self) -> "StudentCreateRequest":
        ensure_start_before_end(
            start_date=self.start_date,
            end_date=self.end_date,
            start_name="startDate",
            end_name="endDate",
        )
        return self


class StudentListQuery(APIModel):
    # Cursor-based pagination scales better than high OFFSET/SKIP values.
    limit: int = Field(default=20, ge=1, le=100)
    cursor: Optional[str] = Field(default=None, alias="cursor")

    search: Optional[str] = Field(default=None, max_length=120)
    status: Optional[InternshipStatus] = None
    company_id: Optional[str] = Field(default=None, alias="companyId")


class InternshipHistoryItem(APIModel):
    company_id: str = Field(alias="companyId")
    role_title: str = Field(alias="Role")
    supervisor: str
    supervisor_email: EmailStr = Field(alias="supervisorEmail")
    start_date: date = Field(alias="startDate")
    end_date: date = Field(alias="endDate")
    status: InternshipStatus


class StudentListItemResponse(APIModel):
    id: str
    name: str
    email: EmailStr
    phone: Optional[str] = None

    college: str = Field(alias="COLLEGE")
    role_title: str = Field(alias="Role")
    supervisor: str
    supervisor_email: EmailStr = Field(alias="supervisorEmail")

    start_date: date = Field(alias="startDate")
    end_date: date = Field(alias="endDate")
    status: InternshipStatus

    tasks: List[TaskPayload] = Field(default_factory=list, max_length=300)
    skills: List[str] = Field(default_factory=list, max_length=128)

    user_id: str = Field(alias="userId")
    company_id: str = Field(alias="companyId")

    @computed_field
    @property
    def duration(self) -> str:
        weeks = calculate_duration_weeks(start_date=self.start_date, end_date=self.end_date)
        return f"{weeks} weeks"


class StudentDetailResponse(StudentListItemResponse):
    internship_history: List[InternshipHistoryItem] = Field(default_factory=list, max_length=24, alias="internshipHistory")
