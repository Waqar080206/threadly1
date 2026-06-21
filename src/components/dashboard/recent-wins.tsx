"use client";

const wins = [
  {
    title: "Mentor replied",
    time: "2 hours ago",
  },
  {
    title: "Cloud engineer accepted request",
    time: "Yesterday",
  },
  {
    title: "Referral conversation scheduled",
    time: "2 days ago",
  },
  {
    title: "Founder connection added",
    time: "3 days ago",
  },
];

export function RecentWins() {
  return (
    <section className="rounded-3xl border border-[var(--border)] bg-white p-6">
      <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] mb-2">
        Recent Progress
      </div>

      <h2 className="font-editorial text-3xl mb-6">
        Momentum.
      </h2>

      <div className="space-y-4">
        {wins.map((win) => (
          <div
            key={win.title}
            className="flex items-center justify-between border-b border-[var(--border)] pb-4"
          >
            <div>
              <div className="font-medium">
                {win.title}
              </div>

              <div className="text-sm text-[var(--muted-strong)]">
                Relationship graph updated
              </div>
            </div>

            <div className="font-mono text-xs text-[var(--muted)]">
              {win.time}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}