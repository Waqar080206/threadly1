"use client";

import { useState } from "react";

import { AlertCircle, Loader2, Sparkles } from "lucide-react";

import { crewAction, type CrewActionResponse } from "@/lib/api";

const ACTIONS = [
  { action: "microsoft", label: "Microsoft Search" },
  { action: "founders", label: "Founder Search" },
  { action: "ai", label: "AI Search" },
  { action: "reconnect", label: "Reconnect" },
  { action: "health", label: "Network Health" },
  { action: "companies", label: "Top Companies" },
] as const;

type ActionName = (typeof ACTIONS)[number]["action"] | "scanner";

export function CrewConsole() {
  const [text, setText] = useState("");
  const [selectedAction, setSelectedAction] = useState<ActionName>("health");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CrewActionResponse | null>(null);

  async function runAction(action: ActionName) {
    if (action === "scanner" && !text.trim()) {
      setError("Add a short note for the scanner.");
      return;
    }

    setSelectedAction(action);
    setLoading(true);
    setError(null);

    try {
      const response = await crewAction(
        action,
        action === "scanner" ? text.trim() : undefined,
      );

      setResult(response);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Crew request failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="mb-10 rounded-3xl border border-[var(--border)] bg-white overflow-hidden">
      <div className="px-6 md:px-8 py-5 border-b border-[var(--border)] bg-[var(--surface)]/60">
        <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] mb-2">
          Live Crew Console
        </div>
        <h2 className="font-editorial text-2xl md:text-3xl tracking-tight">
          Dispatch one of the seven MVP actions.
        </h2>
        <p className="mt-2 text-sm text-[var(--muted-strong)] max-w-2xl">
          Every request goes through Firebase auth, then POST /crew/action,
          then Neo4j. No extra orchestration layer.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-0">
        <div className="p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-[var(--border)]">
          <div className="grid grid-cols-2 gap-2">
            {ACTIONS.map((item) => (
              <button
                key={item.action}
                type="button"
                onClick={() => runAction(item.action)}
                className="rounded-2xl border px-4 py-3 text-left transition-colors hover:border-[var(--foreground)]"
                style={{
                  borderColor:
                    selectedAction === item.action
                      ? "var(--foreground)"
                      : "var(--border)",
                  backgroundColor:
                    selectedAction === item.action
                      ? "color-mix(in srgb, var(--plum) 6%, white)"
                      : "white",
                }}
              >
                <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">
                  {item.action}
                </div>
                <div className="mt-1 font-medium">{item.label}</div>
              </button>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-[var(--border)] p-4 bg-[var(--paper)]/40">
            <div className="flex items-center gap-2 text-sm font-medium mb-2">
              <Sparkles className="h-4 w-4 text-[var(--plum)]" />
              Scanner note
            </div>
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              placeholder="Met Maya Okonkwo at TOKEN2049 reception. She is a founder at Polygon Labs and wants coffee next week."
              className="min-h-32 w-full rounded-xl border border-[var(--border)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--foreground)]"
            />
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => runAction("scanner")}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-full bg-[var(--plum)] px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {loading && selectedAction === "scanner" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : null}
                Run Scanner
              </button>
              <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)]">
                Scanner saves the contact and returns structured JSON.
              </div>
            </div>
          </div>

          {error ? (
            <div className="mt-4 rounded-2xl border border-[var(--copper)]/40 bg-[var(--copper)]/8 px-4 py-3 text-sm text-[var(--foreground)] flex items-start gap-2">
              <AlertCircle className="h-4 w-4 mt-0.5 text-[var(--copper)] shrink-0" />
              <span>{error}</span>
            </div>
          ) : null}
        </div>

        <div className="p-6 md:p-8">
          <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] mb-3">
            Latest response
          </div>
          <div className="rounded-2xl border border-[var(--border)] bg-[var(--paper)]/50 p-4 min-h-[320px] overflow-auto">
            {loading ? (
              <div className="h-full min-h-[280px] flex items-center justify-center text-[var(--muted-strong)] gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Calling backend...
              </div>
            ) : result ? (
              <CrewResponseView response={result} />
            ) : (
              <div className="text-sm text-[var(--muted-strong)] leading-relaxed">
                Run an action to see the live response from FastAPI and Neo4j.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function CrewResponseView({
  response,
}: {
  response: CrewActionResponse;
}) {
  const data = response.data as
    | Record<string, unknown>
    | Array<Record<string, unknown>>
    | null;

  if (!response.success) {
    return (
      <div className="text-sm leading-relaxed text-[var(--foreground)]">
        <span className="font-medium text-[var(--copper)]">{response.action}</span>{" "}
        did not complete successfully.
      </div>
    );
  }

  if (response.action === "health" && data && !Array.isArray(data)) {
    return <HealthSummary stats={data} />;
  }

  if (response.action === "companies" && Array.isArray(data)) {
    return <CompanySummary companies={data} />;
  }

  if (
    (response.action === "microsoft" ||
      response.action === "founders" ||
      response.action === "ai") &&
    Array.isArray(data)
  ) {
    return <PeopleSummary action={response.action} people={data} />;
  }

  if (response.action === "reconnect" && Array.isArray(data)) {
    return <ReconnectSummary people={data} />;
  }

  if (response.action === "scanner" && data && !Array.isArray(data)) {
    return <ScannerSummary contact={data} />;
  }

  return (
    <div className="space-y-3 text-sm leading-relaxed text-[var(--foreground)]">
      <p>
        <span className="font-medium text-[var(--plum)]">{response.action}</span>{" "}
        completed successfully.
      </p>
      <div className="rounded-xl border border-[var(--border)] bg-white p-4 text-xs font-mono text-[var(--muted-strong)] whitespace-pre-wrap break-words">
        {JSON.stringify(response.data, null, 2)}
      </div>
    </div>
  );
}

function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-md bg-[color-mix(in_srgb,var(--plum)_12%,white)] px-1.5 py-0.5 font-medium text-[var(--foreground)]">
      {children}
    </span>
  );
}

function HealthSummary({
  stats,
}: {
  stats: Record<string, unknown>;
}) {
  const people = String(stats.people ?? 0);
  const companies = String(stats.companies ?? 0);
  const topics = String(stats.topics ?? 0);
  const founders = String(stats.founders ?? 0);
  const aiBuilders = String(stats.aiBuilders ?? 0);
  const networkHealth = String(stats.networkHealth ?? 0);

  return (
    <div className="space-y-4 text-sm leading-relaxed text-[var(--foreground)]">
      <p>
        Your graph currently has <Highlight>{people}</Highlight> relationships,
        <Highlight>{companies}</Highlight> companies, and <Highlight>{topics}</Highlight> topics.
      </p>
      <p>
        It includes <Highlight>{founders}</Highlight> founders and <Highlight>{aiBuilders}</Highlight> AI builders.
      </p>
      <p>
        Network health is <Highlight>{networkHealth}</Highlight> out of 100.
      </p>
    </div>
  );
}

function PeopleSummary({
  action,
  people,
}: {
  action: string;
  people: Array<Record<string, unknown>>;
}) {
  return (
    <div className="space-y-4 text-sm leading-relaxed text-[var(--foreground)]">
      <p>
        <Highlight>{people.length}</Highlight> results for <Highlight>{action}</Highlight>.
      </p>
      <div className="space-y-3">
        {people.map((person, index) => (
          <div
            key={`${String(person.name ?? index)}-${index}`}
            className="rounded-xl border border-[var(--border)] bg-white p-4"
          >
            <div className="font-medium">
              <Highlight>{String(person.name ?? "Unknown")}</Highlight>
            </div>
            <div className="mt-1 text-[var(--muted-strong)]">
              {person.role ? <span>{String(person.role)}</span> : <span>Role not set</span>}
              {person.company ? (
                <span>
                  {" "}at <Highlight>{String(person.company)}</Highlight>
                </span>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ReconnectSummary({
  people,
}: {
  people: Array<Record<string, unknown>>;
}) {
  return (
    <div className="space-y-4 text-sm leading-relaxed text-[var(--foreground)]">
      <p>
        The five oldest relationships are listed below in order of last contact.
      </p>
      <div className="space-y-3">
        {people.slice(0, 5).map((person, index) => (
          <div
            key={`${String(person.name ?? index)}-${index}`}
            className="rounded-xl border border-[var(--border)] bg-white p-4"
          >
            <div className="font-medium">
              <Highlight>{String(person.name ?? "Unknown")}</Highlight>
              {person.company ? (
                <span className="text-[var(--muted-strong)]"> · {String(person.company)}</span>
              ) : null}
            </div>
            <div className="mt-1 text-[var(--muted-strong)]">
              Last contact: <Highlight>{String(person.lastContact ?? "unknown")}</Highlight>
              {person.heatScore !== undefined ? (
                <span>
                  {" "}· warmth <Highlight>{String(person.heatScore)}</Highlight>
                </span>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CompanySummary({
  companies,
}: {
  companies: Array<Record<string, unknown>>;
}) {
  return (
    <div className="space-y-4 text-sm leading-relaxed text-[var(--foreground)]">
      <p>
        Top companies by known people.
      </p>
      <div className="space-y-3">
        {companies.map((item, index) => (
          <div
            key={`${String(item.company ?? index)}-${index}`}
            className="rounded-xl border border-[var(--border)] bg-white p-4"
          >
            <div className="font-medium">
              <Highlight>{String(item.company ?? "Unknown company")}</Highlight>
            </div>
            <div className="mt-1 text-[var(--muted-strong)]">
              <Highlight>{String(item.people ?? 0)}</Highlight> known people
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ScannerSummary({
  contact,
}: {
  contact: Record<string, unknown>;
}) {
  const person = (contact.person as Record<string, unknown> | undefined) ?? {};
  const meeting = (contact.meeting as Record<string, unknown> | undefined) ?? {};
  const confidence = (contact.confidence as Record<string, unknown> | undefined) ?? {};

  return (
    <div className="space-y-4 text-sm leading-relaxed text-[var(--foreground)]">
      <p>
        Saved <Highlight>{String(person.name ?? "the contact")}</Highlight>
        {person.company ? (
          <span>
            {" "}from <Highlight>{String(person.company)}</Highlight>
          </span>
        ) : null}
        {confidence.overall !== undefined ? (
          <span>
            {" "}with confidence <Highlight>{String(confidence.overall)}</Highlight>
          </span>
        ) : null}.
      </p>
      {meeting.event ? (
        <p>
          Met at <Highlight>{String(meeting.event)}</Highlight>
          {Array.isArray(meeting.topics) && meeting.topics.length > 0 ? (
            <span>
              {" "}and captured topics like <Highlight>{String(meeting.topics[0])}</Highlight>
            </span>
          ) : null}
          {Array.isArray(meeting.commitments) && meeting.commitments.length > 0 ? (
            <span>
              {" "}with a commitment to <Highlight>{String(meeting.commitments[0])}</Highlight>
            </span>
          ) : null}.
        </p>
      ) : null}
      <p>
        The record is now in Neo4j and ready for follow-up.
      </p>
    </div>
  );
}