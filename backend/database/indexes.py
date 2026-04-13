"""MongoDB index definitions and bootstrap utility."""

from __future__ import annotations

from pymongo import ASCENDING, DESCENDING, TEXT, IndexModel
from pymongo.database import Database


USERS_INDEXES = [
    IndexModel([("email", ASCENDING)], unique=True, name="uq_users_email"),
    IndexModel([("student_id", ASCENDING)], unique=True, sparse=True, name="uq_users_student_id"),
    IndexModel(
        [
            ("company_id", ASCENDING),
            ("role", ASCENDING),
            ("is_active", ASCENDING),
            ("_id", ASCENDING),
        ],
        name="ix_users_company_role_active_cursor",
    ),
    IndexModel(
        [("role", ASCENDING), ("is_active", ASCENDING), ("_id", ASCENDING)],
        name="ix_users_role_active_cursor",
    ),
    IndexModel([("name", ASCENDING)], name="ix_users_name"),
    IndexModel(
        [("name", TEXT), ("email", TEXT)],
        name="ix_users_text_name_email",
        default_language="none",
    ),
]

COMPANIES_INDEXES = [
    IndexModel([("name", ASCENDING)], unique=True, name="uq_companies_name"),
    IndexModel([("admin_user_ids", ASCENDING)], name="ix_companies_admin_user_ids"),
]

STUDENTS_INDEXES = [
    IndexModel([("user_id", ASCENDING)], unique=True, name="uq_students_user_id"),
    IndexModel(
        [
            ("current_internship.company_id", ASCENDING),
            ("current_internship.status", ASCENDING),
            ("_id", ASCENDING),
        ],
        name="ix_students_company_status_cursor",
    ),
    IndexModel(
        [
            ("current_internship.company_id", ASCENDING),
            ("current_internship.role_title", ASCENDING),
            ("_id", ASCENDING),
        ],
        name="ix_students_company_role_cursor",
    ),
    IndexModel(
        [("current_internship.company_id", ASCENDING), ("college", ASCENDING), ("_id", ASCENDING)],
        name="ix_students_company_college_cursor",
    ),
    IndexModel([("college", ASCENDING)], name="ix_students_college"),
    IndexModel([("current_internship.supervisor_email", ASCENDING)], name="ix_students_supervisor_email"),
    IndexModel(
        [("college", TEXT), ("current_internship.role_title", TEXT)],
        name="ix_students_text_college_role",
        default_language="none",
    ),
]

FEEDBACK_INDEXES = [
    IndexModel(
        [
            ("student_id", ASCENDING),
            ("feedback_type", ASCENDING),
            ("is_latest", ASCENDING),
            ("submitted_at", DESCENDING),
            ("_id", DESCENDING),
        ],
        name="ix_feedback_student_type_latest_submitted",
    ),
    IndexModel(
        [
            ("company_id", ASCENDING),
            ("feedback_type", ASCENDING),
            ("is_latest", ASCENDING),
            ("submitted_at", DESCENDING),
            ("_id", DESCENDING),
        ],
        name="ix_feedback_company_type_latest_submitted",
    ),
    IndexModel(
        [
            ("submitted_by_user_id", ASCENDING),
            ("submitted_at", DESCENDING),
            ("_id", DESCENDING),
        ],
        name="ix_feedback_author_submitted",
    ),
    IndexModel(
        [
            ("student_id", ASCENDING),
            ("company_id", ASCENDING),
            ("feedback_type", ASCENDING),
            ("internship_key", ASCENDING),
            ("submitted_by_user_id", ASCENDING),
            ("is_latest", ASCENDING),
        ],
        unique=True,
        partialFilterExpression={"is_latest": True},
        name="uq_feedback_latest_per_cycle_author",
    ),
    IndexModel(
        [
            ("student_id", ASCENDING),
            ("company_id", ASCENDING),
            ("feedback_type", ASCENDING),
            ("internship_key", ASCENDING),
            ("revision", DESCENDING),
        ],
        name="ix_feedback_cycle_revision",
    ),
]

FORM_TEMPLATES_INDEXES = [
    IndexModel(
        [("company_id", ASCENDING), ("type", ASCENDING), ("is_active", ASCENDING)],
        unique=True,
        partialFilterExpression={"is_active": True},
        name="uq_templates_company_type_active",
    ),
    IndexModel(
        [("company_id", ASCENDING), ("type", ASCENDING), ("version", DESCENDING)],
        name="ix_templates_version",
    ),
    IndexModel(
        [("company_id", ASCENDING), ("is_active", ASCENDING), ("_id", ASCENDING)],
        name="ix_templates_company_active_cursor",
    ),
]

DOWNLOADS_INDEXES = [
    IndexModel(
        [("student_id", ASCENDING), ("generated_at", DESCENDING), ("_id", DESCENDING)],
        name="ix_downloads_student_generated_cursor",
    ),
    IndexModel(
        [("student_id", ASCENDING), ("document_type", ASCENDING), ("generated_at", DESCENDING)],
        name="ix_downloads_student_doc_type_generated",
    ),
    IndexModel(
        [("company_id", ASCENDING), ("generated_at", DESCENDING), ("_id", DESCENDING)],
        name="ix_downloads_company_generated_cursor",
    ),
]

COLLECTION_INDEXES = {
    "users": USERS_INDEXES,
    "companies": COMPANIES_INDEXES,
    "students": STUDENTS_INDEXES,
    "feedback": FEEDBACK_INDEXES,
    "form_templates": FORM_TEMPLATES_INDEXES,
    "downloads": DOWNLOADS_INDEXES,
}


def create_indexes(db: Database) -> None:
    """Create all predefined collection indexes if they are missing."""
    for collection_name, indexes in COLLECTION_INDEXES.items():
        db[collection_name].create_indexes(indexes)
