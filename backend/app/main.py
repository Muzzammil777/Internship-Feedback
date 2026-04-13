from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import get_settings
from app.core.database import initialize_database
from app.routes.auth import router as auth_router
from app.routes.health import router as health_router
from app.routes.feedback import router as feedback_router
from app.routes.students import router as students_router

settings = get_settings()

app = FastAPI(title=settings.app_name)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(auth_router)
app.include_router(feedback_router)
app.include_router(students_router)


@app.on_event("startup")
async def startup_event() -> None:
    app.state.mongodb_ready = await initialize_database()


@app.get("/")
async def root() -> dict[str, str]:
    return {"message": settings.app_name}
