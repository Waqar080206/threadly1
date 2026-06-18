"use client";

export function NetworkStrength() {
  const stats = [
    {
      label: "Network Strength",
      value: "67",
      color: "var(--indigo)",
    },
    {
      label: "Warm Introductions",
      value: "4",
      color: "var(--coral)",
    },
    {
      label: "Follow Ups Due",
      value: "3",
      color: "var(--teal)",
    },
    {
      label: "Opportunities",
      value: "7",
      color: "var(--copper)",
    },
  ];

  return (
    <section className="mb-10">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border overflow-hidden"
            style={{
              borderColor: "var(--border)",
            }}
          >
            <div
              className="p-5"
              style={{
                backgroundColor: stat.color,
                color: "white",
              }}
            >
              <div
                className="font-editorial leading-none"
                style={{
                  fontSize: "3rem",
                  fontWeight: 800,
                }}
              >
                {stat.value}
              </div>

              <div className="mt-2 font-mono text-[10px] uppercase tracking-widest opacity-80">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}