from app.services.graph_service import graph_service


class PulseService:

    def dashboard(self, user_uid: str):

        return graph_service.network_stats(user_uid)


pulse_service = PulseService()