from __future__ import annotations

from datetime import date
from typing import List, Optional

from bson import ObjectId
from pydantic import BaseModel, ConfigDict, EmailStr, Field, computed_field, field_validator, model_validator

from .common import (
    BaseDocument,
    InternshipStatus,
    PyObjectId,
    calculate_duration_weeks,
    ensure_start_before_end,
    normalize_unique_strings,
)


class TaskItem(BaseModel):
    id: str = Field(default_factory=lambda: str(ObjectId()))
    title: str = Field(min_length=1, max_length=180)
    description: str = Field(min_length=1, max_length=3000)

    model_config = ConfigDict(str_strip_whitespace=True)


class InternshipSnapshot(BaseModel):
    company_id: PyObjectId
    role_title: str = Field(min_length=2, max_length=120)
    supervisor_name: str = Field(min_length=2, max_length=120)
    supervisor_email: EmailStr
    start_date: date
    end_date: date
    status: InternshipStatus = InternshipStatus.ACTIVE
    project_title: Optional[str] = Field(default=None, max_length=180)

    model_config = ConfigDict(str_strip_whitespace=True, use_enum_values=True)

    @model_validator(mode="after")
    def validate_dates(self) -> "InternshipSnapshot":
        ensure_start_before_end(
            start_date=self.start_date,
            end_date=self.end_date,
            start_name="start_date",
            end_name="end_date",
        )
        return self

    @computed_field
    @property
    def duration_weeks(self) -> int:
        return calculate_duration_weeks(start_date=self.start_date, end_date=self.end_date)


class StudentDocument(BaseDocument):
    user_id: PyObjectId
    phone: Optional[str] = Field(default=None, max_length=30)
    college: str = Field(min_length=2, max_length=160)
    skills: List[str] = Field(default_factory=list, max_length=128)
    tasks: List[TaskItem] = Field(default_factory=list, max_length=300)

    # Current internship used by dashboard/profile/listing endpoints.
    current_internship: InternshipSnapshot

    # Optional history to support future multiple internships per student.
    internship_history: List[InternshipSnapshot] = Field(default_factory=list, max_length=24)

    @field_validator("skills")
    @classmethod
    def normalize_skills(cls, values: List[str]) -> List[str]:
        return normalize_unique_strings(values)
