"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
signUpWithEmail,
loginWithEmail,
} from "@/lib/auth";

export default function EmailAuthForm() {
const router = useRouter();

const [mode, setMode] = useState<"login" | "signup">(
"login"
);

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

async function handleSubmit(
e: React.FormEvent<HTMLFormElement>
) {
e.preventDefault();

setLoading(true);
setError("");

try {
  if (mode === "signup") {
    await signUpWithEmail(email, password);

    router.push("/onboarding");
  } else {
    await loginWithEmail(email, password);

    router.push("/dashboard");
  }
} catch (err: any) {
  setError(
    err?.message || "Something went wrong."
  );
} finally {
  setLoading(false);
}
}

return (
    <div>
      <div className="flex rounded-xl border border-[var(--border)] p-1 mb-5">
<button
type="button"
onClick={() => setMode("login")}
className={`flex-1 py-2 rounded-lg text-sm transition-all ${
            mode === "login"
              ? "bg-[var(--ink)] text-white"
              : "text-[var(--muted-strong)]"
          }`}
      >
        Login
      </button>

      <button
      type="button"
      onClick={() => setMode("signup")}
      className={`flex-1 py-2 rounded-lg text-sm transition-all ${
        mode === "signup"
          ? "bg-[var(--ink)] text-white"
          : "text-[var(--muted-strong)]"
      }`}
    >
      Sign Up
    </button>
  </div>

  <form
    onSubmit={handleSubmit}
    className="space-y-4"
  >
    <div>
      <label className="block mb-2 text-sm font-medium text-[var(--ink)]">
        Email
      </label>

      <input
        type="email"
        required
        value={email}
        onChange={(e) =>
          setEmail(e.target.value)
        }
        placeholder="you@example.com"
        className="
          w-full
          h-12
          px-4
          rounded-xl
          border
          border-[var(--border)]
          bg-white
          outline-none
          focus:border-[var(--plum)]
        "
      />
    </div>

    <div>
      <label className="block mb-2 text-sm font-medium text-[var(--ink)]">
        Password
      </label>

      <input
        type="password"
        required
        minLength={6}
        value={password}
        onChange={(e) =>
          setPassword(e.target.value)
        }
        placeholder="••••••••"
        className="
          w-full
          h-12
          px-4
          rounded-xl
          border
          border-[var(--border)]
          bg-white
          outline-none
          focus:border-[var(--plum)]
        "
      />
    </div>

    {error && (
      <div className="text-sm text-red-500">
        {error}
      </div>
    )}

    <button
      type="submit"
      disabled={loading}
      className="
        w-full
        h-12
        rounded-xl
        bg-[var(--ink)]
        text-white
        transition-all
        hover:opacity-90
        disabled:opacity-50
      "
    >
      {loading
        ? "Please wait..."
        : mode === "signup"
        ? "Create Account"
        : "Login"}
    </button>
    </form>
    </div>
  );
}
