from dotenv import load_dotenv
import os

load_dotenv()

NEO4J_URI = os.getenv("NEO4J_URI")
NEO4J_USERNAME = os.getenv("NEO4J_USERNAME")
NEO4J_PASSWORD = os.getenv("NEO4J_PASSWORD")

FIREBASE_PROJECT_ID = os.getenv("FIREBASE_PROJECT_ID")

GROQ_API_KEY = os.getenv("GROQ_API_KEY")