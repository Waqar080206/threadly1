import {
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";

import { auth } from "./firebase";
import { getBackendUrl } from "./api";

const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

async function syncUserWithBackend(
  credential: UserCredential
) {
  const token = await credential.user.getIdToken();

  const response = await fetch(
    `${getBackendUrl()}/auth/sync`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to sync user with backend.");
  }

  return response.json();
}

export async function signInWithGoogle(): Promise<UserCredential> {
  const credential = await signInWithPopup(
    auth,
    googleProvider
  );

  await syncUserWithBackend(credential);

  return credential;
}

export async function signInWithGithub(): Promise<UserCredential> {
  const credential = await signInWithPopup(
    auth,
    githubProvider
  );

  await syncUserWithBackend(credential);

  return credential;
}

export async function signUpWithEmail(
  email: string,
  password: string
): Promise<UserCredential> {
  const credential =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

  await syncUserWithBackend(credential);

  return credential;
}

export async function loginWithEmail(
  email: string,
  password: string
): Promise<UserCredential> {
  const credential =
    await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

  await syncUserWithBackend(credential);

  return credential;
}

export async function logout() {
  return signOut(auth);
}