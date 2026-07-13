from fastapi import APIRouter, Depends
from pydantic import BaseModel

from app.auth import verify_user
from app.services.recall_service import recall

router = APIRouter()


class RecallRequest(BaseModel):
    query: str


@router.post("/search")
def recall_search(
    request: RecallRequest,
    current_user=Depends(verify_user),
):

    return recall.search(
        current_user["uid"],
        request.query,
    )