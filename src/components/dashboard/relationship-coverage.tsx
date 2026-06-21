"use client";

const coverage = [
  { label: "Mentors", value: 78 },
  { label: "Peers", value: 91 },
  { label: "Recruiters", value: 24 },
  { label: "Founders", value: 31 },
  { label: "Researchers", value: 42 },
];

export function RelationshipCoverage() {
  return (
    <section className="rounded-3xl border border-[var(--border)] bg-white p-6">
      <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] mb-2">
        Coverage
      </div>

      <h2 className="font-editorial text-3xl mb-6">
        Relationship Map
      </h2>

      <div className="space-y-5">
        {coverage.map((item) => (
          <div key={item.label}>
            <div className="flex justify-between mb-2">
              <span>{item.label}</span>
              <span className="font-mono text-sm">
                {item.value}%
              </span>
            </div>

            <div className="h-2 rounded-full bg-[var(--border)] overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${item.value}%`,
                  backgroundColor: "var(--teal)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}