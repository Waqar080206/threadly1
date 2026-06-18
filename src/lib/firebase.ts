// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: "G-ZTG8H0S00R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Only initialize analytics on client-side
/*if (typeof window !== "undefined") {
  try {
    const { getAnalytics } = require("firebase/analytics");
    getAnalytics(app);
  } catch (error) {
    console.error("Analytics initialization failed:", error);
  }
}*/
export const auth = getAuth(app);

export default app;

//export const auth = getAuth(app);