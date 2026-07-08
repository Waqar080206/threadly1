from fastapi import Header, HTTPException
from app.firebase import firebase_auth


async def verify_user(
    authorization: str = Header(...)
):
    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=401,
            detail="Invalid Authorization header",
        )

    token = authorization.replace("Bearer ", "")

    try:
        decoded = firebase_auth.verify_id_token(token)

        return {
            "uid": decoded["uid"],
            "email": decoded.get("email"),
            "name": decoded.get("name"),
        }

    except Exception:
        raise HTTPException(
            status_code=401,
            detail="Invalid Firebase token",
        )