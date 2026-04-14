from __future__ import annotations

from datetime import datetime
from typing import Dict, List, Literal, Optional, Union

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


class StudentQuestionAnswerPayload(APIModel):
    question_id: str = Field(alias="questionId", min_length=1, max_length=100)
    label: str = Field(min_length=1, max_length=200)
    type: Literal["rating", "boolean", "enum", "text"]
    value: Union[bool, int, str]

    @model_validator(mode="after")
    def validate_type_value_pair(self) -> "StudentQuestionAnswerPayload":
        if self.type == "rating":
            if not isinstance(self.value, int) or isinstance(self.value, bool):
                raise ValueError("rating answer must be an integer")
            if self.value < 1 or self.value > 5:
                raise ValueError("rating answer must be between 1 and 5")
        elif self.type == "boolean":
            if not isinstance(self.value, bool):
                raise ValueError("boolean answer must be true or false")
        elif self.type == "enum":
            if not isinstance(self.value, str) or not self.value.strip():
                raise ValueError("enum answer must be a non-empty string")
        elif self.type == "text":
            if not isinstance(self.value, str):
                raise ValueError("text answer must be a string")
        return self


class StudentSectionPayload(APIModel):
    section_id: str = Field(alias="sectionId", min_length=1, max_length=100)
    title: str = Field(min_length=1, max_length=200)
    questions: List[StudentQuestionAnswerPayload] = Field(min_length=1, max_length=64)


class StudentToCompanyFeedbackCreate(BaseFeedbackCreate):
    sections: Optional[List[StudentSectionPayload]] = None

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
        if self.sections:
            return self

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
        if self.sections:
            section_ratings: Dict[str, int] = {}
            for section in self.sections:
                for question in section.questions:
                    if question.type != "rating":
                        continue
                    section_ratings[question.question_id] = int(question.value)
            if section_ratings:
                return section_ratings

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
