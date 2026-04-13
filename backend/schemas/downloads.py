from __future__ import annotations

from datetime import datetime
from typing import Optional

from pydantic import Field, computed_field

from models.common import DownloadType

from .common import APIModel


class DownloadItemResponse(APIModel):
    id: str
    student_id: str = Field(alias="studentId")
    company_id: str = Field(alias="companyId")

    title: str
    description: Optional[str] = None
    document_type: DownloadType = Field(alias="documentType")

    file_name: str = Field(alias="fileName")
    file_url: str = Field(alias="fileUrl")
    file_type: str = Field(default="PDF", alias="fileType")
    size_bytes: int = Field(alias="sizeBytes", gt=0)

    generated_at: datetime = Field(alias="generatedAt")

    @computed_field
    @property
    def size(self) -> str:
        if self.size_bytes < 1024:
            return f"{self.size_bytes} B"
        if self.size_bytes < 1024 * 1024:
            return f"{self.size_bytes / 1024:.0f} KB"
        return f"{self.size_bytes / (1024 * 1024):.2f} MB"
