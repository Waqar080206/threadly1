"use client";

import AuthHero from "@/components/auth/AuthHero";
import SocialAuthButtons from "@/components/auth/SocialAuthButtons";
import EmailAuthForm from "@/components/auth/EmailAuthForm";

export default function AuthPage() {
return ( <main className="min-h-screen paper-grain relative overflow-hidden">
  {/* Top color rail - five Crew colors with a shimmer sweep */}
      <div className="h-1 w-full rail-animated" aria-hidden />
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
  {/* Bottom color rail mirrors the top */}
      <div className="h-1 w-full rail-animated" aria-hidden />
  {/* Decorative drifting blobs - dynamic background motion */}
  <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    <div
      className="absolute top-[20%] -left-16 h-72 w-72 rounded-full blur-3xl opacity-[0.08] anim-drift-1"
      style={{ backgroundColor: "var(--coral)" }}
    />
    <div
      className="absolute top-[60%] -right-20 h-80 w-80 rounded-full blur-3xl opacity-[0.07] anim-drift-2"
      style={{ backgroundColor: "var(--teal)" }}
    />
    <div
      className="absolute bottom-[10%] left-1/3 h-64 w-64 rounded-full blur-3xl opacity-[0.06] anim-drift-3"
      style={{ backgroundColor: "var(--copper)" }}
    />
  </div>
</main>


);
}
