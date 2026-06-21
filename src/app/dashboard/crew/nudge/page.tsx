"use client";

import Link from "next/link";
import {
ArrowLeft,
BellRing,
Info,
Clock3,
MessageSquare,
TrendingDown,
Sparkles,
} from "lucide-react";

const nudges = [
{
name: "Rahul Sharma",
role: "AI Recruiter",
days: 68,
warmth: "-12",
action: "Quick check-in",
},
{
name: "Aditi Verma",
role: "Security Engineer",
days: 42,
warmth: "-8",
action: "Share recent project",
},
{
name: "Vikram Patel",
role: "Founder",
days: 91,
warmth: "-19",
action: "Coffee catch-up",
},
];

const drafts = [
{
person: "Rahul Sharma",
draft:
"Hey Rahul, it's been a while since we last spoke. I'd love to hear what you've been working on lately and catch up.",
},
{
person: "Aditi Verma",
draft:
"Hi Aditi, I recently came across an AI security paper that reminded me of our conversation. Thought you'd find it interesting.",
},
];

const moments = [
"Aditi Verma · Work Anniversary · Tomorrow",
"Rahul Sharma · Birthday · 3 days",
"Vikram Patel · Startup Launch Anniversary · 7 days",
];

export default function NudgePage() {
  return (
    <div className="pt-4 w-full max-w-7xl mx-auto px-4 md:px-6 lg:px-8 min-w-0 paper-grain min-h-screen">
      {/* Breadcrumb */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
      >
        <ArrowLeft className="h-3 w-3" strokeWidth={1.75} />
        Dashboard
      </Link>

      {/* Header */}
      <header className="mt-6">
        <div
          className="font-mono text-[10px] uppercase tracking-widest mb-3"
          style={{ color: "var(--teal)" }}
        >
          Crew · 02 · Nudge
        </div>

        <h1
          className="font-editorial text-4xl md:text-5xl tracking-tight"
          style={{
            fontWeight: 700,
            letterSpacing: "-0.03em",
          }}
        >
          Nudge keeps important relationships warm.
        </h1>

        <p className="mt-4 text-[var(--muted-strong)] max-w-2xl leading-relaxed text-base md:text-lg">
          Nudge identifies relationships that are cooling,
          drafts timely outreach, and makes sure opportunities
          don't quietly disappear because you forgot to send
          one message.
        </p>
      </header>

      {/* Metrics */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
        <MetricCard
          value="23"
          label="Need Attention"
          icon={<BellRing size={18} />}
          color="var(--teal)"
        />

        <MetricCard
          value="7"
          label="Opportunities At Risk"
          icon={<TrendingDown size={18} />}
          color="var(--terracotta)"
        />

        <MetricCard
          value="12"
          label="Drafts Ready"
          icon={<MessageSquare size={18} />}
          color="var(--plum)"
        />

        <MetricCard
          value="91%"
          label="Relationship Coverage"
          icon={<Sparkles size={18} />}
          color="var(--indigo)"
        />
      </section>

      {/* High Priority Nudges */}
      <section className="mt-10">
        <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] mb-4">
          High Priority Nudges
        </div>

        <div className="rounded-2xl border border-[var(--border)] overflow-hidden bg-white">
          {nudges.map((nudge, index) => (
            <div
              key={nudge.name}
              className={`grid md:grid-cols-5 gap-4 p-5 ${
                index !== nudges.length - 1
                  ? "border-b border-[var(--border)]"
                  : ""
              }`}
            >
              <div>
                <div className="font-editorial text-lg">
                  {nudge.name}
                </div>

                <div className="text-sm text-[var(--muted)]">
                  {nudge.role}
                </div>
              </div>

              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">
                  Last Contact
                </div>

                <div className="mt-1">
                  {nudge.days} days
                </div>
              </div>

              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">
                  Warmth Change
                </div>

                <div className="mt-1 text-[var(--terracotta)]">
                  {nudge.warmth}
                </div>
              </div>

              <div>
                <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">
                  Suggested Action
                </div>

                <div className="mt-1">
                  {nudge.action}
                </div>
              </div>

              <div className="flex md:justify-end">
                <button className="rounded-xl bg-[var(--teal)] text-white px-4 py-2 text-sm">
                  Review Draft
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Drafts */}
      <section className="mt-10">
        <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] mb-4">
          Suggested Outreach
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          {drafts.map((draft) => (
            <div
              key={draft.person}
              className="rounded-2xl border border-[var(--border)] bg-white p-5"
            >
              <div className="font-editorial text-xl">
                {draft.person}
              </div>

              <div className="mt-4 rounded-xl bg-[var(--paper)] p-4 text-sm leading-relaxed">
                {draft.draft}
              </div>

              <div className="mt-4 flex gap-2">
                <button className="rounded-xl px-4 py-2 bg-[var(--teal)] text-white text-sm">
                  Approve
                </button>

                <button className="rounded-xl px-4 py-2 border border-[var(--border)] text-sm">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Moments */}
      <section className="mt-10">
        <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] mb-4">
          Upcoming Moments
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {moments.map((moment) => (
            <div
              key={moment}
              className="rounded-2xl border border-[var(--border)] bg-white p-5"
            >
              <Clock3
                size={18}
                style={{ color: "var(--plum)" }}
              />

              <div className="mt-3 text-sm leading-relaxed">
                {moment}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Rules */}
      <section className="mt-10">
        <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] mb-4">
          Automation Rules
        </div>

        <div className="rounded-2xl border border-[var(--border)] bg-white p-6">
          <div className="space-y-4">
            <Rule text="Create a nudge after 30 days of silence." />
            <Rule text="Create a follow-up after a referral." />
            <Rule text="Create a check-in after meeting someone in person." />
            <Rule text="Prioritize people aligned with current goals." />
          </div>
        </div>
      </section>

      {/* Judge Note */}
      <aside
        className="mt-10 rounded-2xl border p-6"
        style={{
          borderColor:
            "color-mix(in srgb, var(--teal) 35%, transparent)",
          backgroundColor:
            "color-mix(in srgb, var(--teal) 7%, white)",
        }}
      >
        <div className="flex items-start gap-3">
          <Info
            className="h-4 w-4 mt-0.5 shrink-0"
            strokeWidth={1.75}
            style={{ color: "var(--teal)" }}
          />

          <div>
            <div
              className="font-mono text-[10px] uppercase tracking-widest mb-2"
              style={{ color: "var(--teal)" }}
            >
              Note to Judges
            </div>

            <p className="text-sm leading-relaxed">
              This demo uses synthetic relationship data.
              The production version continuously monitors
              relationship warmth, detects decay, ranks
              relationship importance relative to goals,
              and generates personalized outreach before
              opportunities disappear.
            </p>
          </div>
        </div>
      </aside>
    </div>
  );
}

function MetricCard({
  value,
  label,
  icon,
  color,
}: {
  value: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-white p-5">
      <div style={{ color }}>{icon}</div>

      <div className="mt-4 font-editorial text-4xl">
        {value}
      </div>

      <div className="mt-1 text-sm text-[var(--muted-strong)]">
        {label}
      </div>
    </div>
  );
}

function Rule({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="h-2 w-2 rounded-full"
        style={{
          backgroundColor: "var(--teal)",
        }}
      />

      <span className="text-sm">
        {text}
      </span>
    </div>
  );
}