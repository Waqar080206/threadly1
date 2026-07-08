from app.database import get_driver


def sync_user(uid, name, email):
    driver = get_driver()

    with driver.session() as session:

        result = session.run(
            """
            MERGE (u:User {firebaseUid:$uid})

            ON CREATE SET
                u.name=$name,
                u.email=$email,
                u.createdAt=datetime()

            ON MATCH SET
                u.lastSeen=datetime()

            RETURN u
            """,
            uid=uid,
            name=name,
            email=email,
        )

        return result.single()