from fastapi import APIRouter

router = APIRouter(prefix="/students", tags=["students"])


@router.get("")
async def list_students() -> list[dict[str, str]]:
    return []
