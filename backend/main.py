from __future__ import annotations

from fastapi import FastAPI

from database.indexes import create_indexes
from database.mongodb import get_database


app = FastAPI(
    title="MoviCloud Internship Feedback API",
    version="0.1.0",
)


@app.on_event("startup")
def startup_event() -> None:
    create_indexes(get_database())
