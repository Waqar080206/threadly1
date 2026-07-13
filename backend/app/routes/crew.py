from fastapi import APIRouter, Depends

from app.schemas.crew import CrewRequest
from app.services.crew_service import crew_service
from app.dependencies.auth import get_current_user

router = APIRouter()


@router.post("/action")
def crew_action(
    request: CrewRequest,
    user=Depends(get_current_user),
):
    return crew_service.run(
        user["uid"],
        request.action,
        request.text,
    )