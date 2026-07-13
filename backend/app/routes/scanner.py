from fastapi import APIRouter

from pydantic import BaseModel

from app.services.scanner_service import scanner

router = APIRouter()


class ScanRequest(BaseModel):
    text: str


@router.post("/scan")
def scan_contact(
    request: ScanRequest,
):
    result = scanner.scan(request.text)

    return result.model_dump()