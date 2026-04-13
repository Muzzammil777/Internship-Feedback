from __future__ import annotations

from datetime import date, datetime, timezone
from enum import Enum
from typing import Any, Annotated, Iterable, Mapping

from bson import ObjectId
from pydantic import BaseModel, ConfigDict, Field
from pydantic.functional_validators import BeforeValidator


def _validate_object_id(value: Any) -> str:
    if isinstance(value, ObjectId):
        return str(value)
    if isinstance(value, str) and ObjectId.is_valid(value):
        return value
    raise ValueError("Invalid ObjectId")


PyObjectId = Annotated[str, BeforeValidator(_validate_object_id)]


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


class UserRole(str, Enum):
    STUDENT = "student"
    COMPANY = "company"


class InternshipStatus(str, Enum):
    ACTIVE = "active"
    COMPLETED = "completed"
    PENDING = "pending"


class FeedbackType(str, Enum):
    COMPANY_TO_STUDENT = "company_to_student"
    STUDENT_TO_COMPANY = "student_to_company"


class TemplateType(str, Enum):
    COMPANY_TO_STUDENT = "company_to_student"
    STUDENT_TO_COMPANY = "student_to_company"


class TemplateFieldType(str, Enum):
    TEXT = "text"
    TEXTAREA = "textarea"
    SLIDER = "slider"
    RATING = "rating"


class DownloadType(str, Enum):
    FEEDBACK_REPORT = "feedback_report"
    INTERNSHIP_CERTIFICATE = "internship_certificate"
    DETAILED_ANALYSIS = "detailed_analysis"


class BaseDocument(BaseModel):
    id: PyObjectId = Field(default_factory=lambda: str(ObjectId()), alias="_id")
    created_at: datetime = Field(default_factory=utc_now)
    updated_at: datetime = Field(default_factory=utc_now)

    model_config = ConfigDict(
        populate_by_name=True,
        str_strip_whitespace=True,
        use_enum_values=True,
        json_encoders={ObjectId: str},
    )


def normalize_unique_strings(values: Iterable[str]) -> list[str]:
    seen: set[str] = set()
    cleaned: list[str] = []
    for item in values:
        value = item.strip()
        if not value:
            continue
        key = value.casefold()
        if key in seen:
            continue
        seen.add(key)
        cleaned.append(value)
    return cleaned


def ensure_start_before_end(
    *,
    start_date: date,
    end_date: date,
    start_name: str,
    end_name: str,
) -> None:
    if end_date < start_date:
        raise ValueError(f"{end_name} must be on or after {start_name}")


def calculate_duration_weeks(*, start_date: date, end_date: date) -> int:
    ensure_start_before_end(
        start_date=start_date,
        end_date=end_date,
        start_name="start_date",
        end_name="end_date",
    )
    day_delta = (end_date - start_date).days
    return max(1, (day_delta + 1 + 6) // 7)


def normalize_rating_map(
    values: Mapping[str, int],
    *,
    min_value: int,
    max_value: int,
    max_metrics: int = 32,
) -> dict[str, int]:
    if len(values) > max_metrics:
        raise ValueError(f"Too many rating metrics. Maximum allowed is {max_metrics}")

    cleaned: dict[str, int] = {}
    for key, value in values.items():
        metric = key.strip()
        if not metric:
            raise ValueError("Rating keys cannot be blank")
        if value < min_value or value > max_value:
            raise ValueError(f"Rating for '{metric}' must be between {min_value} and {max_value}")
        cleaned[metric] = int(value)
    return cleaned


def ensure_unique_values(values: Iterable[str], *, label: str) -> None:
    items = list(values)
    if len(items) != len(set(items)):
        raise ValueError(f"{label} must be unique")
