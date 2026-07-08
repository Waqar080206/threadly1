from fastapi import FastAPI

app = FastAPI(
    title="Threadly Backend",
    version="0.1.0"
)

@app.get("/")
async def root():
    return {
        "status": "running",
        "message": "Threadly Backend Running"
    }