import os
import json
import firebase_admin
from firebase_admin import credentials, auth

print("=" * 60)
print("FIREBASE_SERVICE_ACCOUNT exists:",
      os.getenv("FIREBASE_SERVICE_ACCOUNT") is not None)

print("Length:",
      len(os.getenv("FIREBASE_SERVICE_ACCOUNT", "")))
print("=" * 60)

if not firebase_admin._apps:

    if os.getenv("FIREBASE_SERVICE_ACCOUNT"):

        print("Using Render environment variable")

        firebase_config = json.loads(
            os.getenv("FIREBASE_SERVICE_ACCOUNT")
        )

        cred = credentials.Certificate(firebase_config)

    else:

        print("Using local JSON file")

        cred = credentials.Certificate(
            "serviceAccountKey.json"
        )

    firebase_admin.initialize_app(cred)

firebase_auth = auth