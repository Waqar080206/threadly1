from dotenv import load_dotenv
import os

load_dotenv()

NEO4J_URI = os.getenv("NEO4J_URI")
NEO4J_USERNAME = os.getenv("NEO4J_USERNAME")
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD")

FIREBASE_PROJECT_ID = os.getenv("FIREBASE_PROJECT_ID")

GROQ_API_KEY = os.getenv("GROQ_API_KEY")

CORS_ORIGINS = [
	origin.strip()
	for origin in os.getenv(
		"CORS_ORIGINS",
		"http://localhost:3000,http://127.0.0.1:3000",
	).split(",")
	if origin.strip()
]