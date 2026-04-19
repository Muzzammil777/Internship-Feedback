from fastapi import FastAPI, HTTPException, Request
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from slowapi.errors import RateLimitExceeded
from slowapi.extension import _rate_limit_exceeded_handler
from slowapi.middleware import SlowAPIMiddleware

from app.core.config import get_settings
from app.core.database import initialize_database
from app.core.security import authenticate_request, limiter
from app.routes.auth import router as auth_router
from app.routes.health import router as health_router
from app.routes.feedback import router as feedback_router
from app.routes.students import router as students_router

settings = get_settings()

app = FastAPI(title=settings.app_name)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)
app.add_middleware(SlowAPIMiddleware)

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


@app.middleware("http")
async def authenticate_sensitive_requests(request: Request, call_next):
    protected_paths = ("/students", "/feedback")
    path = request.url.path

    if request.method != "OPTIONS" and any(path == prefix or path.startswith(f"{prefix}/") for prefix in protected_paths):
        try:
            request.state.current_user = await authenticate_request(request)
        except HTTPException as exc:
            detail = exc.detail
            status_code = exc.status_code
            return JSONResponse(status_code=status_code, content={"detail": detail})

    response = await call_next(request)
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    response.headers["Permissions-Policy"] = "camera=(), microphone=(), geolocation=()"
    response.headers["Content-Security-Policy"] = settings.content_security_policy
    return response


@app.on_event("startup")
async def startup_event() -> None:
    app.state.mongodb_ready = await initialize_database()


@app.get("/")
async def root() -> dict[str, str]:
    return {"message": settings.app_name}
