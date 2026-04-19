from functools import lru_cache
from pathlib import Path
from typing import List

from pydantic_settings import BaseSettings, SettingsConfigDict


ENV_FILE = Path(__file__).resolve().parents[2] / ".env"


class Settings(BaseSettings):
    app_name: str = "Internship Feedback API"
    mongodb_uri: str
    mongodb_db: str = "internship_feedback"
    cors_origins: str = "http://localhost:5173"
    jwt_secret_key: str = "change-this-in-production"
    jwt_algorithm: str = "HS256"
    access_token_expire_minutes: int = 60
    login_rate_limit: str = "8/minute"
    feedback_rate_limit: str = "10/minute"
    content_security_policy: str = (
        "default-src 'self'; "
        "base-uri 'self'; "
        "frame-ancestors 'none'; "
        "form-action 'self'; "
        "img-src 'self' data: blob:; "
        "style-src 'self' 'unsafe-inline'; "
        "script-src 'self' 'unsafe-inline' 'unsafe-eval'; "
        "connect-src 'self'"
    )
    demo_student_email: str = "student@example.com"
    demo_student_password: str = "123456"
    demo_company_email: str = "admin@internfeedback.com"
    demo_company_password: str = "123456"

    model_config = SettingsConfigDict(
        env_file=str(ENV_FILE),
        env_file_encoding="utf-8",
        extra="ignore",
    )

    @property
    def cors_origin_list(self) -> List[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
