from __future__ import annotations

from datetime import datetime
from typing import Optional

from pydantic import AnyUrl, Field

from .common import BaseDocument, DownloadType, PyObjectId, utc_now


class DownloadDocument(BaseDocument):
    student_id: PyObjectId
    company_id: PyObjectId

    document_type: DownloadType
    title: str = Field(min_length=2, max_length=180)
    description: Optional[str] = Field(default=None, max_length=500)

    file_name: str = Field(min_length=1, max_length=200)
    file_url: AnyUrl
    mime_type: str = Field(default="application/pdf", max_length=120)
    size_bytes: int = Field(gt=0)

    generated_at: datetime = Field(default_factory=utc_now)
