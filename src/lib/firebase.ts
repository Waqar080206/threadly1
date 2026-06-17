// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDw6JsbPxAU3Okj-v5EG9j-Bx4sqDE-lQA",
  authDomain: "threadly-bf1d5.firebaseapp.com",
  projectId: "threadly-bf1d5",
  storageBucket: "threadly-bf1d5.firebasestorage.app",
  messagingSenderId: "613950158259",
  appId: "1:613950158259:web:7fe66808895a0eccd607c6",
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