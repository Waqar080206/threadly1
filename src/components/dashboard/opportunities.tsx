"use client";

const opportunities = [
  {
    name: "Rohit Sharma",
    role: "Senior Cloud Engineer",
    company: "Microsoft",
    relevance: 96,
    reason: "Matches your AI Cloud Engineer goal",
  },
  {
    name: "Priya Verma",
    role: "Technical Recruiter",
    company: "Google",
    relevance: 91,
    reason: "Actively hiring for cloud roles",
  },
  {
    name: "Arjun Patel",
    role: "Startup Founder",
    company: "Stealth AI",
    relevance: 88,
    reason: "Strong operator network",
  },
];

export function Opportunities() {
  return (
    <section className="rounded-3xl border border-[var(--border)] bg-white p-6">
      <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] mb-2">
        Top Opportunities
      </div>

      <h2 className="font-editorial text-3xl mb-6">
        People worth meeting.
      </h2>

      <div className="space-y-4">
        {opportunities.map((person) => (
          <div
            key={person.name}
            className="rounded-2xl border border-[var(--border)] p-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="font-medium">
                  {person.name}
                </div>

                <div className="text-sm text-[var(--muted-strong)]">
                  {person.role} · {person.company}
                </div>
              </div>

              <div className="font-mono text-xs">
                {person.relevance}%
              </div>
            </div>

            <p className="mt-3 text-sm text-[var(--muted-strong)]">
              {person.reason}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}