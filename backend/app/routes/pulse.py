from fastapi import APIRouter, Depends

from app.auth import verify_user
from app.services.graph_service import graph_service

router = APIRouter()


@router.get("/health")
def health(
    current_user=Depends(verify_user),
):

    return graph_service.relationship_health(
        current_user["uid"]
    )