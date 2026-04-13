from __future__ import annotations

from datetime import datetime
from typing import Dict, Optional

from pydantic import Field, field_validator, model_validator

from models.common import FeedbackType, normalize_rating_map

from .common import APIModel


class FeedbackNarrativePayload(APIModel):
    strengths: Optional[str] = Field(default=None, max_length=3000)
    improvements: Optional[str] = Field(default=None, max_length=3000)


class BaseFeedbackCreate(FeedbackNarrativePayload):
    template_id: Optional[str] = Field(default=None, alias="templateId")
    internship_key: Optional[str] = Field(default=None, alias="internshipKey", max_length=80)


class CompanyToStudentFeedbackCreate(BaseFeedbackCreate):
    ratings: Dict[str, int] = Field(min_length=1, max_length=32)
    overall_rating: float = Field(alias="overallRating", ge=0, le=5)

    comments: Optional[str] = Field(default=None, max_length=4000)
    recommendation: str = Field(default="Recommended", max_length=120)

    @field_validator("ratings")
    @classmethod
    def validate_ratings(cls, values: Dict[str, int]) -> Dict[str, int]:
        return normalize_rating_map(values, min_value=1, max_value=5, max_metrics=32)


class StudentToCompanyFeedbackCreate(BaseFeedbackCreate):
    # Preferred dynamic payload when using form templates.
    ratings: Optional[Dict[str, int]] = Field(default=None, max_length=32)

    # Backward-compatible fields currently used by frontend page.
    learning_experience: Optional[int] = Field(default=None, alias="learningExperience", ge=0, le=5)
    mentorship: Optional[int] = Field(default=None, ge=0, le=5)
    work_environment: Optional[int] = Field(default=None, alias="workEnvironment", ge=0, le=5)
    communication: Optional[int] = Field(default=None, ge=0, le=5)

    overall_comments: Optional[str] = Field(default=None, alias="overallComments", max_length=4000)

    @field_validator("ratings")
    @classmethod
    def validate_ratings(cls, values: Optional[Dict[str, int]]) -> Optional[Dict[str, int]]:
        if values is None:
            return values
        return normalize_rating_map(values, min_value=0, max_value=5, max_metrics=32)

    @model_validator(mode="after")
    def validate_required_payload(self) -> "StudentToCompanyFeedbackCreate":
        if self.ratings:
            return self

        fixed_values = [
            self.learning_experience,
            self.mentorship,
            self.work_environment,
            self.communication,
        ]
        if any(value is None for value in fixed_values):
            raise ValueError(
                "Provide either ratings map or all fixed rating fields: "
                "learningExperience, mentorship, workEnvironment, communication"
            )
        return self

    def to_ratings_map(self) -> Dict[str, int]:
        if self.ratings:
            return self.ratings

        return {
            "learningExperience": int(self.learning_experience or 0),
            "mentorship": int(self.mentorship or 0),
            "workEnvironment": int(self.work_environment or 0),
            "communication": int(self.communication or 0),
        }


class FeedbackResponse(FeedbackNarrativePayload):
    id: str
    type: FeedbackType

    student_id: str = Field(alias="studentId")
    company_id: str = Field(alias="companyId")
    submitted_by_user_id: str = Field(alias="submittedByUserId")
    template_id: Optional[str] = Field(default=None, alias="templateId")
    internship_key: str = Field(alias="internshipKey")
    revision: int = Field(default=1, ge=1)
    is_latest: bool = Field(default=True, alias="isLatest")

    ratings: Dict[str, int]
    overall_rating: Optional[float] = Field(default=None, alias="overallRating")

    comments: Optional[str] = None
    recommendation: Optional[str] = None

    submitted_at: datetime = Field(alias="submittedAt")
