import os
import json
import firebase_admin

from firebase_admin import credentials, auth

if not firebase_admin._apps:

    if os.getenv("FIREBASE_SERVICE_ACCOUNT"):

        firebase_config = json.loads(
            os.getenv("FIREBASE_SERVICE_ACCOUNT")
        )

        cred = credentials.Certificate(firebase_config)

    else:

        cred = credentials.Certificate(
            "serviceAccountKey.json"
        )

    firebase_admin.initialize_app(cred)

firebase_auth = auth