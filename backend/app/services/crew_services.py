from app.services.scanner_service import scanner
from app.services.graph_service import graph_service


class CrewService:

    def run(
        self,
        uid: str,
        action: str,
        text: str | None,
    ):

        action = action.lower()

        if action == "scanner":

            result = scanner.scan(text)

            graph_service.create_person(
                uid,
                result,
            )

            return {
                "action": "scanner",
                "success": True,
                "data": result.model_dump(),
            }

        elif action == "microsoft":

            return {
                "action": action,
                "success": True,
                "data": graph_service.get_people_by_company(
                    uid,
                    "Microsoft",
                ),
            }

        elif action == "founders":

            return {
                "action": action,
                "success": True,
                "data": graph_service.get_founders(
                    uid,
                ),
            }

        elif action == "ai":

            return {
                "action": action,
                "success": True,
                "data": graph_service.get_people_by_topic(
                    uid,
                    "Artificial Intelligence",
                ),
            }

        elif action == "reconnect":

            return {
                "action": action,
                "success": True,
                "data": graph_service.people_needing_followup(
                    uid,
                ),
            }

        elif action == "health":

            return {
                "action": action,
                "success": True,
                "data": graph_service.network_stats(
                    uid,
                ),
            }

        elif action == "companies":

            return {
                "action": action,
                "success": True,
                "data": graph_service.top_companies(
                    uid,
                ),
            }

        return {
            "action": action,
            "success": False,
            "data": {
                "message": "Unknown action"
            },
        }


crew_service = CrewService()