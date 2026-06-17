"use client";

import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import {
signInWithGoogle,
signInWithGithub,
} from "@/lib/auth";

export default function SocialAuthButtons() {
const router = useRouter();

async function handleGoogle() {
try {
await signInWithGoogle();
router.push("/onboarding");
} catch (error) {
console.error(error);
}
}

async function handleGithub() {
try {
await signInWithGithub();
router.push("/onboarding");
} catch (error) {
console.error(error);
}
}

return (
    <div className="space-y-3">
      <button
        onClick={handleGoogle}
        className="w-full h-14 rounded-2xl border border-[var(--border)] bg-white flex items-center justify-center gap-3 hover:shadow-sm transition-all"
      >
        <FcGoogle size={22} />
        Continue with Google
      </button>

      <button
    onClick={handleGithub}
    className="w-full h-14 rounded-2xl border border-[var(--border)] bg-white flex items-center justify-center gap-3 hover:shadow-sm transition-all"
  >
    <FaGithub size={20} />
    Continue with GitHub
      </button>
    </div>
  );
}
