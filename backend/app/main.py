from fastapi import FastAPI
from app.database import get_driver

app = FastAPI(
    title="Threadly Backend",
    version="0.1.0",
)


@app.get("/")
async def root():
    return {
        "status": "running",
        "message": "Threadly Backend Running",
    }


@app.get("/neo4j-test")
def neo4j_test():
    driver = get_driver()

    with driver.session() as session:
        result = session.run(
            "RETURN 'Threadly Connected 🚀' AS message"
        )

        record = result.single()

        return {
            "neo4j": record["message"]
        }