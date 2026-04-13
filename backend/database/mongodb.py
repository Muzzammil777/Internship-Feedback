from __future__ import annotations

import os
from typing import Optional

from pymongo import MongoClient
from pymongo.database import Database


MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
MONGODB_DB_NAME = os.getenv("MONGODB_DB_NAME", "internship_feedback")

_client: Optional[MongoClient] = None


def get_client() -> MongoClient:
    global _client
    if _client is None:
        _client = MongoClient(MONGODB_URI)
    return _client


def get_database() -> Database:
    return get_client()[MONGODB_DB_NAME]
