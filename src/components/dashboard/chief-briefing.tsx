"use client";

export function ChiefBriefing() {
  return (
    <section className="mb-10 rounded-3xl overflow-hidden border border-[var(--border)] shadow-sm">
      <div
        className="p-8 md:p-12"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in srgb, var(--plum) 14%, white) 0%, color-mix(in srgb, var(--indigo) 12%, white) 100%)",
        }}
      >
        <div
          className="font-mono text-[10px] uppercase tracking-widest mb-4"
          style={{ color: "var(--plum)" }}
        >
          Chief's Briefing
        </div>

        <h1
          className="font-editorial leading-[0.95] tracking-tight text-[var(--ink)]"
          style={{
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 700,
          }}
        >
          Good Evening, Waqar.
        </h1>

        <p className="mt-5 max-w-2xl text-[var(--muted-strong)] leading-relaxed text-lg">
          You're three introductions away from your next major
          opportunity. Your strongest path currently runs through
          cloud engineers and startup operators already inside
          your extended network.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <div className="rounded-full px-4 py-2 bg-white/80 border border-[var(--border)]">
            <span className="font-mono text-xs uppercase tracking-widest">
              Goal · AI Cloud Engineer
            </span>
          </div>

          <div className="rounded-full px-4 py-2 bg-white/80 border border-[var(--border)]">
            <span className="font-mono text-xs uppercase tracking-widest">
              Network Strength · 67/100
            </span>
          </div>

          <div className="rounded-full px-4 py-2 bg-white/80 border border-[var(--border)]">
            <span className="font-mono text-xs uppercase tracking-widest">
              Top Gap · Cloud Mentors
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}