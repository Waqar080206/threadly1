import { onAuthStateChanged } from "firebase/auth";

import { auth } from "@/lib/firebase";

export function getBackendUrl() {
  return (
    process.env.NEXT_PUBLIC_BACKEND_URL ??
    "http://127.0.0.1:8000"
  );
}

async function getIdToken(): Promise<string> {
  const currentUser = auth.currentUser;

  if (currentUser) {
    return currentUser.getIdToken();
  }

  return await new Promise<string>((resolve, reject) => {
    const timeoutId = window.setTimeout(() => {
      unsubscribe();
      reject(new Error("No authenticated user found."));
    }, 8000);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        return;
      }

      window.clearTimeout(timeoutId);
      unsubscribe();
      resolve(await user.getIdToken());
    });
  });
}

export type CrewActionResponse<T = unknown> = {
  action: string;
  success: boolean;
  data: T;
};

export async function crewAction<T = unknown>(
  action: string,
  text?: string,
): Promise<CrewActionResponse<T>> {
  const token = await getIdToken();

  const response = await fetch(`${getBackendUrl()}/crew/action`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      action,
      ...(text ? { text } : {}),
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `Crew action failed (${response.status}): ${errorText || response.statusText}`,
    );
  }

  return response.json() as Promise<CrewActionResponse<T>>;
}