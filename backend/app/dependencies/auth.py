from fastapi import Header, HTTPException
from firebase_admin import auth


async def get_current_user(
    authorization: str = Header(...)
):
    if not authorization.startswith("Bearer "):
        raise HTTPException(
            status_code=401,
            detail="Invalid Authorization header",
        )

    token = authorization.split("Bearer ")[1]

    try:
        decoded_token = auth.verify_id_token(token)

        return {
            "uid": decoded_token["uid"],
            "email": decoded_token.get("email"),
            "name": decoded_token.get("name"),
        }

    except Exception as e:
        raise HTTPException(
            status_code=401,
            detail=f"Invalid Firebase token: {e}",
        )