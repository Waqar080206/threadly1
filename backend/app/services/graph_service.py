from neo4j import GraphDatabase

from app.config import (
    NEO4J_URI,
    NEO4J_USERNAME,
    NEO4J_PASSWORD,
)

driver = GraphDatabase.driver(
    NEO4J_URI,
    auth=(NEO4J_USERNAME, NEO4J_PASSWORD),
)


class GraphService:

    def _scanner_person(self, scanner_result):
        person = getattr(scanner_result, "person", scanner_result)
        meeting = getattr(scanner_result, "meeting", scanner_result)

        return person, meeting

    def find_existing_person(
        self,
        user_uid: str,
        scanner_result,
    ):
        person, _ = self._scanner_person(scanner_result)

        with driver.session() as session:

            result = session.run(
                """
                MATCH (me:User {firebaseUid:$user_uid})-[:KNOWS]->(p:Person)

                WHERE
                    toLower(p.name)=toLower($name)

                    OR (
                        $email IS NOT NULL
                        AND p.email=$email
                    )

                RETURN p
                LIMIT 1
                """,
                user_uid=user_uid,
                name=getattr(person, "name", None),
                email=getattr(person, "email", None),
            )

            return result.single()

    def create_person(
        self,
        user_uid: str,
        scanner_result,
    ):
        person, meeting = self._scanner_person(scanner_result)

        name = getattr(person, "name", None)
        role = getattr(person, "role", None)
        company = getattr(person, "company", None)
        email = getattr(person, "email", None)
        phone = getattr(person, "phone", None)
        event = getattr(meeting, "event", None)
        topics = list(getattr(meeting, "topics", []) or [])
        summary = getattr(meeting, "summary", "")
        commitments = list(getattr(meeting, "commitments", []) or [])

        existing = self.find_existing_person(
            user_uid,
            scanner_result,
        )

        if existing:
            return {
                "created": False,
                "duplicate": True,
                "person": existing["p"],
            }

        with driver.session() as session:

            session.run(
                """
                MATCH (me:User {firebaseUid:$user_uid})

                MERGE (p:Person {
                    name:$name
                })

                ON CREATE SET
                    p.role=$role,
                    p.company=$company,
                    p.email=$email,
                    p.phone=$phone,
                    p.createdAt=datetime()

                MERGE (me)-[r:KNOWS]->(p)

                ON CREATE SET
                    r.firstMet=datetime(),
                    r.lastContact=datetime(),
                    r.heatScore=100,
                    r.strength=100,
                    r.metVia=$event
                """,
                user_uid=user_uid,
                name=name,
                role=role,
                company=company,
                email=email,
                phone=phone,
                event=event,
            )

            # Event

            if event:

                session.run(
                    """
                    MATCH (p:Person {name:$name})

                    MERGE (e:Event {
                        name:$event
                    })

                    MERGE (p)-[:MET_AT]->(e)
                    """,
                    name=name,
                    event=event,
                )

            # Topics

            for topic in topics:

                session.run(
                    """
                    MATCH (p:Person {name:$name})

                    MERGE (t:Topic {
                        name:$topic
                    })

                    MERGE (p)-[:INTERESTED_IN {
                        strength:50
                    }]->(t)
                    """,
                    name=name,
                    topic=topic,
                )

            # Interaction

            session.run(
                """
                MATCH (me:User {firebaseUid:$user_uid})
                MATCH (p:Person {name:$name})

                CREATE (i:Interaction {
                    id:randomUUID(),
                    date:datetime(),
                    type:'first_meeting',
                    aiSummary:$summary,
                    commitments:$commitments
                })

                MERGE (me)-[:HAD]->(i)
                MERGE (p)-[:HAD]->(i)
                """,
                user_uid=user_uid,
                name=name,
                summary=summary,
                commitments=commitments,
            )

            return {
                "created": True,
                "duplicate": False,
                "person": {
                    "name": name,
                    "company": company,
                },
            }

    def get_people_by_event(
        self,
        user_uid: str,
        event: str,
    ):

        with driver.session() as session:

            result = session.run(
                """
                MATCH (u:User {firebaseUid:$uid})-[:KNOWS]->(p)

                MATCH (p)-[:MET_AT]->(e)

                WHERE toLower(e.name)
                CONTAINS toLower($event)

                RETURN
                    p.name AS name,
                    p.role AS role,
                    p.company AS company,
                    e.name AS event
                """,
                uid=user_uid,
                event=event,
            )

            return [r.data() for r in result]

    def get_people_by_topic(
        self,
        user_uid: str,
        topic: str,
    ):

        with driver.session() as session:

            result = session.run(
                """
                MATCH (u:User {firebaseUid:$uid})-[:KNOWS]->(p)

                MATCH (p)-[:INTERESTED_IN]->(t)

                WHERE toLower(t.name)
                CONTAINS toLower($topic)

                RETURN
                    p.name AS name,
                    p.role AS role,
                    p.company AS company,
                    collect(t.name) AS topics
                """,
                uid=user_uid,
                topic=topic,
            )

            return [r.data() for r in result]

    def get_people_by_company(
        self,
        user_uid: str,
        company: str,
    ):

        with driver.session() as session:

            result = session.run(
                """
                MATCH (u:User {firebaseUid:$uid})-[:KNOWS]->(p)

                WHERE
                    toLower(p.company)
                    CONTAINS toLower($company)

                RETURN
                    p.name AS name,
                    p.role AS role,
                    p.company AS company
                """,
                uid=user_uid,
                company=company,
            )

            return [r.data() for r in result]
    def get_founders(self, uid):

    with driver.session() as session:

        result = session.run(
            """
            MATCH (:User {firebaseUid:$uid})-[:KNOWS]->(p)

            WHERE toLower(p.role) CONTAINS "founder"

            RETURN
                p.name AS name,
                p.role AS role,
                p.company AS company

            ORDER BY p.name
            """,
            uid=uid,
        )

        return [record.data() for record in result]
    
    def top_companies(self, uid):

    with driver.session() as session:

        result = session.run(
            """
            MATCH (:User {firebaseUid:$uid})-[:KNOWS]->(p)

            MATCH (p)-[:WORKS_AT]->(c)

            RETURN
                c.name AS company,
                count(*) AS people

            ORDER BY people DESC

            LIMIT 10
            """,
            uid=uid,
        )

        return [record.data() for record in result]
    
    def people_needing_followup(
        self,
        user_uid: str,
    ):

        with driver.session() as session:

            result = session.run(
                """
                MATCH (u:User {firebaseUid:$uid})

                MATCH (u)-[r:KNOWS]->(p)

                RETURN
                    p.name AS name,
                    p.company AS company,
                    r.lastContact AS lastContact,
                    r.heatScore AS heatScore
                ORDER BY r.lastContact ASC
                LIMIT 10
                """,
                uid=user_uid,
            )

            return [r.data() for r in result]

    def network_stats(self, uid):

        with driver.session() as session:

            result = session.run(
                """
                MATCH (u:User {firebaseUid:$uid})

                OPTIONAL MATCH (u)-[:KNOWS]->(p)

                OPTIONAL MATCH (p)-[:MET_AT]->(e)

                OPTIONAL MATCH (p)-[:INTERESTED_IN]->(t)

                RETURN
                    count(DISTINCT p) AS people,
                    count(DISTINCT e) AS events,
                    count(DISTINCT t) AS topics
                """,
                uid=uid,
            )

            stats = result.single().data()

        stats["companies"] = self.total_companies(uid)
        stats["founders"] = self.total_founders(uid)
        stats["aiBuilders"] = self.total_ai_people(uid)
        stats["networkHealth"] = 84

        return stats

    def relationship_health(
        self,
        user_uid: str,
    ):
        with driver.session() as session:

            result = session.run(
                """
                MATCH (u:User {firebaseUid:$uid})-[r:KNOWS]->(p)

                RETURN
                    count(p) AS totalPeople,
                    avg(r.heatScore) AS averageWarmth,
                    min(r.lastContact) AS oldestContact
                """,
                uid=user_uid,
            )

            return result.single().data()

    def total_people(self, uid):

        with driver.session() as session:

            result = session.run(
                """
                MATCH (:User {firebaseUid:$uid})-[:KNOWS]->(p)

                RETURN count(p) AS total
                """,
                uid=uid,
            )

            return result.single()["total"]

    def total_companies(self, uid):

        with driver.session() as session:

            result = session.run(
                """
                MATCH (:User {firebaseUid:$uid})-[:KNOWS]->(:Person)-[:WORKS_AT]->(c)

                RETURN count(DISTINCT c) AS total
                """,
                uid=uid,
            )

            return result.single()["total"]

    def total_topics(self, uid):

        with driver.session() as session:

            result = session.run(
                """
                MATCH (:User {firebaseUid:$uid})-[:KNOWS]->(:Person)-[:HAS_EXPERTISE]->(t)

                RETURN count(DISTINCT t) AS total
                """,
                uid=uid,
            )

            return result.single()["total"]

    def total_founders(self, uid):

        with driver.session() as session:

            result = session.run(
                """
                MATCH (:User {firebaseUid:$uid})-[:KNOWS]->(p)

                WHERE toLower(coalesce(p.role, "")) CONTAINS "founder"

                RETURN count(p) AS total
                """,
                uid=uid,
            )

            return result.single()["total"]

    def total_ai_people(self, uid):

        with driver.session() as session:

            result = session.run(
                """
                MATCH (:User {firebaseUid:$uid})-[:KNOWS]->(p)

                MATCH (p)-[:HAS_EXPERTISE]->(:Topic {name:"Artificial Intelligence"})

                RETURN count(DISTINCT p) AS total
                """,
                uid=uid,
            )

            return result.single()["total"]

    def get_founders(self, uid):

        with driver.session() as session:

            result = session.run(
                """
                MATCH (:User {firebaseUid:$uid})-[:KNOWS]->(p)

                WHERE toLower(coalesce(p.role, "")) CONTAINS "founder"

                RETURN
                    p.name AS name,
                    p.role AS role,
                    p.company AS company
                ORDER BY p.company, p.name
                """,
                uid=uid,
            )

            return [r.data() for r in result]

    def top_companies(self, uid):

        with driver.session() as session:

            result = session.run(
                """
                MATCH (:User {firebaseUid:$uid})-[:KNOWS]->(p)

                WHERE p.company IS NOT NULL AND p.company <> ""

                RETURN
                    p.company AS company,
                    count(DISTINCT p) AS people
                ORDER BY people DESC, company ASC
                LIMIT 10
                """,
                uid=uid,
            )

            return [r.data() for r in result]


graph_service = GraphService()