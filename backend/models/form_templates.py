from __future__ import annotations

from typing import List, Optional

from pydantic import BaseModel, ConfigDict, Field, field_validator, model_validator

from .common import BaseDocument, PyObjectId, TemplateFieldType, TemplateType, ensure_unique_values


class TemplateField(BaseModel):
    id: str = Field(min_length=1, max_length=64)
    label: str = Field(min_length=1, max_length=120)
    type: TemplateFieldType
    required: bool = False

    min_value: Optional[int] = Field(default=None, ge=0, le=10)
    max_value: Optional[int] = Field(default=None, ge=1, le=10)
    step: Optional[float] = Field(default=None, gt=0, le=5)

    order: int = Field(default=0, ge=0)
    placeholder: Optional[str] = Field(default=None, max_length=200)

    model_config = ConfigDict(str_strip_whitespace=True, use_enum_values=True)

    @model_validator(mode="after")
    def validate_numeric_bounds(self) -> "TemplateField":
        is_numeric = self.type in {TemplateFieldType.SLIDER, TemplateFieldType.RATING}
        if not is_numeric:
            return self

        min_value = 0 if self.min_value is None else self.min_value
        max_value = 5 if self.max_value is None else self.max_value
        if min_value >= max_value:
            raise ValueError("min_value must be lower than max_value")
        return self


class FormTemplateDocument(BaseDocument):
    company_id: PyObjectId
    type: TemplateType
    fields: List[TemplateField] = Field(min_length=1, max_length=64)
    version: int = Field(default=1, ge=1)
    is_active: bool = True

    @field_validator("fields")
    @classmethod
    def validate_unique_field_ids(cls, values: List[TemplateField]) -> List[TemplateField]:
        ids = [field.id for field in values]
        ensure_unique_values(ids, label="Template field ids")
        return values
