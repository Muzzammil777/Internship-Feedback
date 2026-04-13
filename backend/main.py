from __future__ import annotations

from dotenv import load_dotenv

load_dotenv()

from app.main import app  # noqa: E402 – load_dotenv must run before app import

__all__ = ["app"]
