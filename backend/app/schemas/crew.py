from typing import Optional
from pydantic import BaseModel


class CrewRequest(BaseModel):
    action: str
    text: Optional[str] = None


class CrewResponse(BaseModel):
    action: str
    success: bool
    data: dict | list