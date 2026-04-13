"""MongoDB connection helpers for the backend service."""

from __future__ import annotations

import os
from functools import lru_cache

from pymongo import MongoClient
from pymongo.database import Database


MONGODB_URI = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
MONGODB_DB_NAME = os.getenv("MONGODB_DB_NAME", "internship_feedback")

@lru_cache(maxsize=1)
def get_client() -> MongoClient:
    """Return a cached MongoDB client instance for this process."""
    return MongoClient(MONGODB_URI)


def get_database() -> Database:
    """Return the configured MongoDB database handle."""
    return get_client()[MONGODB_DB_NAME]
