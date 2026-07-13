import json
from pathlib import Path

from app.schemas.scanner import ScannerResponse
from app.services.llm_service import llm

PROMPT_PATH = (
    Path(__file__).parent.parent
    / "prompts"
    / "scanner.md"
)


class ScannerService:
    def __init__(self):
        self.system_prompt = PROMPT_PATH.read_text(
            encoding="utf-8"
        )

    def scan(
        self,
        text: str,
    ) -> ScannerResponse:

        response = llm.chat(
            system_prompt=self.system_prompt,
            user_prompt=text,
        )

        data = json.loads(response)

        # Make optional fields safe
        data.setdefault("topics", [])
        data.setdefault("commitments", [])

        data.setdefault("email", None)
        data.setdefault("phone", None)
        data.setdefault("role", None)
        data.setdefault("company", None)
        data.setdefault("event", None)

        data.setdefault("confidence", 0.5)

        return ScannerResponse.model_validate(data)


scanner = ScannerService()