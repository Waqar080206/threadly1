from fastapi import FastAPI
from app.database import get_driver
from app.routes.auth import router as auth_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Threadly Backend",
    version="0.1.0",
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
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
    
app.include_router(
    auth_router,
    prefix="/auth",
    tags=["Authentication"],
)