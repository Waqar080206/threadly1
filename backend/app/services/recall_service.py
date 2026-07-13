import json
from pathlib import Path

from app.services.graph_service import graph_service
from app.services.llm_service import llm

PROMPT = (
    Path(__file__)
    .parent.parent
    / "prompts"
    / "recall.md"
).read_text(encoding="utf-8")


class RecallService:

    def search(
        self,
        uid: str,
        query: str,
    ):

        q = query.lower()

        if "event" in q or "met" in q:

            words = query.split()

            event = words[-1]

            graph = graph_service.get_people_by_event(
                uid,
                event,
            )

        elif "company" in q or "work" in q:

            company = query.split()[-1]

            graph = graph_service.get_people_by_company(
                uid,
                company,
            )

        else:

            topic = query.split()[-1]

            graph = graph_service.get_people_by_topic(
                uid,
                topic,
            )

        response = llm.chat(
            system_prompt=PROMPT,
            user_prompt=json.dumps(graph),
        )

        return {
            "results": graph,
            "answer": response,
        }


recall = RecallService()