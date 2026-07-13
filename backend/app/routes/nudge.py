from fastapi import APIRouter, Depends

from app.auth import verify_user
from app.services.nudge_service import nudge

router = APIRouter()


@router.get("/suggestions")
def suggestions(
    current_user=Depends(verify_user),
):

    return nudge.suggestions(
        current_user["uid"]
    )