from fastapi import APIRouter, Depends

from pydantic import BaseModel

from app.auth import verify_user
from app.services.graph_service import graph_service
from app.services.scanner_service import scanner

router = APIRouter()


class ScanRequest(BaseModel):
    text: str


@router.post("/scan")
def scan_contact(
    request: ScanRequest,
    current_user=Depends(verify_user),
):

    result = scanner.scan(request.text)

    graph_service.create_person(
        current_user["uid"],
        result,
    )

    return result.model_dump()