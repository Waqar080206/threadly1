"use client";

import AuthHero from "@/components/auth/AuthHero";
import SocialAuthButtons from "@/components/auth/SocialAuthButtons";
import EmailAuthForm from "@/components/auth/EmailAuthForm";

export default function AuthPage() {
return ( <main className="min-h-screen bg-background relative overflow-hidden">

<div
className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full blur-3xl opacity-[0.06]"
style={{ backgroundColor: "var(--coral)" }}
/>

  <div
    className="absolute -top-40 -right-40 h-96 w-96 rounded-full blur-3xl opacity-[0.05]"
    style={{ backgroundColor: "var(--plum)" }}
  />

  <div className="relative z-10 min-h-screen grid lg:grid-cols-2">
    <AuthHero />

    <section className="flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-3xl border border-[var(--border)] bg-white p-8 shadow-sm">
        <div className="mb-8">
          <h2
            className="font-editorial text-3xl text-[var(--ink)]"
            style={{ fontWeight: 700 }}
          >
            Welcome to Threadly
          </h2>

          <p className="mt-2 text-sm text-[var(--muted-strong)]">
            Continue with Google, GitHub, or Email.
          </p>
        </div>

        <SocialAuthButtons />

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-[var(--border)]" />
          <span className="text-xs font-mono text-[var(--muted)]">
            OR
          </span>
          <div className="h-px flex-1 bg-[var(--border)]" />
        </div>

        <EmailAuthForm />

        <p className="mt-6 text-center text-xs text-[var(--muted)]">
          By continuing you agree to our Terms and Privacy Policy.
        </p>
      </div>
    </section>
  </div>
</main>


);
}
