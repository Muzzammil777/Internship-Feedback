from functools import lru_cache
from typing import List

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    app_name: str = "Internship Feedback API"
    mongodb_uri: str
    mongodb_db: str = "internship_feedback"
    cors_origins: str = "http://localhost:5173"
    demo_student_email: str = "student@example.com"
    demo_student_password: str = "123456"
    demo_company_email: str = "admin@example.com"
    demo_company_password: str = "123456"

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

    @property
    def cors_origin_list(self) -> List[str]:
        return [origin.strip() for origin in self.cors_origins.split(",") if origin.strip()]


@lru_cache
def get_settings() -> Settings:
    return Settings()
