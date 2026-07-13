from typing import List, Optional

from pydantic import BaseModel, Field


class ScannerResponse(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    company: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None

    event: Optional[str] = None

    topics: List[str] = Field(default_factory=list)

    commitments: List[str] = Field(default_factory=list)

    summary: str

    confidence: float