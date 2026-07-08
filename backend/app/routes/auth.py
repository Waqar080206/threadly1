from fastapi import APIRouter, Depends

from app.auth import verify_user
from app.services.neo4j_service import sync_user

router = APIRouter()


@router.post("/sync")
async def sync(current_user=Depends(verify_user)):
    sync_user(
        current_user["uid"],
        current_user["name"],
        current_user["email"],
    )

    return {
        "message": "User synced successfully",
        "user": current_user,
    }