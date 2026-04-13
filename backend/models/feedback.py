"""Feedback document models for company-to-student and student-to-company flows."""

from __future__ import annotations

from datetime import datetime
from typing import Dict, Optional

from pydantic import Field, field_validator, model_validator

from .common import BaseDocument, FeedbackType, PyObjectId, normalize_rating_map, utc_now


class FeedbackDocument(BaseDocument):
    """MongoDB document representing one feedback submission revision."""

    feedback_type: FeedbackType
    student_id: PyObjectId
    company_id: PyObjectId
    submitted_by_user_id: PyObjectId

    # Stable key for one internship cycle (for example: 2026-01-15_2026-03-30).
    internship_key: str = Field(min_length=4, max_length=80, pattern=r"^[A-Za-z0-9_.:-]+$")

    template_id: Optional[PyObjectId] = None

    # Dynamic metric map validated against active form template in service layer.
    ratings: Dict[str, int] = Field(min_length=1, max_length=32)
    overall_rating: Optional[float] = Field(default=None, ge=0, le=5)

    strengths: Optional[str] = Field(default=None, max_length=3000)
    improvements: Optional[str] = Field(default=None, max_length=3000)
    comments: Optional[str] = Field(default=None, max_length=4000)
    recommendation: Optional[str] = Field(default=None, max_length=120)

    # Keep immutable history while making latest reads O(1) with an index.
    revision: int = Field(default=1, ge=1)
    is_latest: bool = True

    submitted_at: datetime = Field(default_factory=utc_now)

    @field_validator("ratings")
    @classmethod
    def validate_rating_values(cls, values: Dict[str, int]) -> Dict[str, int]:
        """Validate rating keys and range constraints."""

        return normalize_rating_map(values, min_value=0, max_value=5, max_metrics=32)

    @model_validator(mode="after")
    def validate_feedback_type_rules(self) -> "FeedbackDocument":
        """Enforce feedback-type-specific field constraints."""

        if self.feedback_type == FeedbackType.STUDENT_TO_COMPANY and self.recommendation is not None:
            raise ValueError("recommendation is only valid for company_to_student feedback")
        return self
