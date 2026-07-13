from fastapi import APIRouter, Depends

from app.auth import verify_user
from app.services.graph_service import graph_service

router = APIRouter()


@router.get("/stats")
def dashboard_stats(current_user=Depends(verify_user)):
    return graph_service.network_stats(
        current_user["uid"]
    )