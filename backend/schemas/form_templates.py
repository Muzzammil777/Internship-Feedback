from __future__ import annotations

from enum import Enum
from typing import List, Optional

from pydantic import Field, field_validator

from models.common import TemplateFieldType, ensure_unique_values

from .common import APIModel


class FormTypePublic(str, Enum):
    COMPANY_TO_STUDENT = "companyToStudent"
    STUDENT_TO_COMPANY = "studentToCompany"


class FormFieldPayload(APIModel):
    id: str = Field(min_length=1, max_length=64)
    label: str = Field(min_length=1, max_length=120)
    type: TemplateFieldType
    required: bool = False

    min_value: Optional[int] = Field(default=None, alias="minValue", ge=0, le=10)
    max_value: Optional[int] = Field(default=None, alias="maxValue", ge=1, le=10)
    step: Optional[float] = Field(default=None, gt=0, le=5)

    order: int = Field(default=0, ge=0)
    placeholder: Optional[str] = Field(default=None, max_length=200)


class FormTemplateUpdateRequest(APIModel):
    fields: List[FormFieldPayload] = Field(min_length=1, max_length=64)

    @field_validator("fields")
    @classmethod
    def validate_unique_field_ids(cls, values: List[FormFieldPayload]) -> List[FormFieldPayload]:
        ids = [field.id for field in values]
        ensure_unique_values(ids, label="Template field ids")
        return values


class FormTemplateResponse(APIModel):
    id: str
    type: FormTypePublic
    fields: List[FormFieldPayload]
    version: int
    is_active: bool = Field(alias="isActive")
    company_id: str = Field(alias="companyId")
