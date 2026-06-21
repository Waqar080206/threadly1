"use client";

const activity = [
  {
    crew: "Chief",
    value: "3 recommendations",
    color: "var(--plum)",
  },
  {
    crew: "Snap",
    value: "8 contacts enriched",
    color: "var(--coral)",
  },
  {
    crew: "Nudge",
    value: "4 follow-ups scheduled",
    color: "var(--teal)",
  },
  {
    crew: "Gatekeeper",
    value: "17 emails processed",
    color: "var(--copper)",
  },
  {
    crew: "Pulse",
    value: "5 social signals detected",
    color: "var(--indigo)",
  },
  {
    crew: "Recall",
    value: "2 meetings summarized",
    color: "var(--sage)",
  },
];

export function CrewActivity() {
  return (
    <section className="mb-8">
      <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] mb-2">
        Crew Activity
      </div>

      <h2 className="font-editorial text-4xl mb-6">
        Working behind the scenes.
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activity.map((item) => (
          <div
            key={item.crew}
            className="rounded-2xl border border-[var(--border)] p-5 bg-white"
          >
            <div
              className="font-editorial text-2xl"
              style={{
                color: item.color,
              }}
            >
              {item.crew}
            </div>

            <div className="mt-2 text-sm text-[var(--muted-strong)]">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}