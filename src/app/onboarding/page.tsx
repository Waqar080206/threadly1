"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const interestsList = [
  "AI",
  "Machine Learning",
  "Cloud",
  "Cybersecurity",
  "Data Engineering",
  "Backend",
  "Frontend",
  "Research",
  "Startups",
  "Product",
];

const bottlenecksList = [
  "Finding internships",
  "Finding mentors",
  "Building network",
  "Getting referrals",
  "Learning roadmap",
  "Industry exposure",
  "Finding cofounders",
  "Finding customers",
];

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "",
    headline: "",
    age: "",
    role: "",

    university: "",
    degree: "",
    year: "",
    graduation: "",

    company: "",
    title: "",

    interests: [] as string[],

    goal: "",

    bottlenecks: [] as string[],
  });

  const toggleInterest = (interest: string) => {
    setForm((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const toggleBottleneck = (item: string) => {
    setForm((prev) => ({
      ...prev,
      bottlenecks: prev.bottlenecks.includes(item)
        ? prev.bottlenecks.filter((i) => i !== item)
        : [...prev.bottlenecks, item],
    }));
  };

  const next = () => setStep((s) => s + 1);
  const back = () => setStep((s) => s - 1);

  const finish = async () => {
    console.log(form);

    // TODO:
    // Send to FastAPI
    // Create User Node in Neo4j
    // Generate Chief Strategy

    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen paper-grain relative overflow-hidden">
         {/* Top color rail - five Crew colors with a shimmer sweep */}
      <div className="h-1 w-full rail-animated" aria-hidden />
      {/* Background washes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -bottom-48 -left-48 h-96 w-96 rounded-full blur-3xl opacity-[0.05]"
          style={{ backgroundColor: "var(--coral)" }}
        />

        <div
          className="absolute -top-48 -right-48 h-96 w-96 rounded-full blur-3xl opacity-[0.05]"
          style={{ backgroundColor: "var(--plum)" }}
        />
      </div>

      <div className="relative mx-auto max-w-3xl px-6 py-16">
        {/* Progress */}

        <div className="mb-10">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5, 6].map((s) => (
              <div
                key={s}
                className="h-2 flex-1 rounded-full transition-all"
                style={{
                  background:
                    s <= step
                      ? "var(--ink)"
                      : "var(--border)",
                }}
              />
            ))}
          </div>

          <div className="mt-4 font-mono text-[11px] uppercase tracking-widest text-[var(--muted)]">
            Step {step} of 6
          </div>
        </div>

        <div className="rounded-3xl border border-[var(--border)] bg-white p-8 md:p-12">
         {step === 1 && (
  <>
    <div className="font-mono text-[11px] uppercase tracking-widest text-[var(--muted)] mb-3">
      Welcome
    </div>

    <h1 className="font-editorial text-4xl md:text-5xl leading-tight mb-4">
      Hi, {user?.displayName?.split(" ")[0] || "there"}.
    </h1>

    <p className="text-[var(--muted-strong)] mb-8">
      Let's make sure your professional profile is accurate before
      Chief starts building your relationship strategy.
    </p>

    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">
          Full Name
        </label>

        <input
          value={form.name}
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
          placeholder="Your professional name"
          className="w-full h-12 px-4 rounded-xl border border-[var(--border)]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Professional Headline
        </label>

        <input
          value={form.headline}
          onChange={(e) =>
            setForm({
              ...form,
              headline: e.target.value,
            })
          }
          placeholder="AI & Data Science Student | Building Projects | Exploring Cloud & AI"
          className="w-full h-12 px-4 rounded-xl border border-[var(--border)]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Email
        </label>

        <input
          value={user?.email ?? ""}
          disabled
          className="w-full h-12 px-4 rounded-xl border border-[var(--border)] bg-[var(--surface)] opacity-70 cursor-not-allowed"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Age
        </label>

        <input
          type="number"
          value={form.age}
          onChange={(e) =>
            setForm({
              ...form,
              age: e.target.value,
            })
          }
          placeholder="20"
          className="w-full h-12 px-4 rounded-xl border border-[var(--border)]"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          Current Role
        </label>

        <select
          value={form.role}
          onChange={(e) =>
            setForm({
              ...form,
              role: e.target.value,
            })
          }
          className="w-full h-12 px-4 rounded-xl border border-[var(--border)]"
        >
          <option value="">
            Select role
          </option>

          <option value="Student">
            Student
          </option>

          <option value="Developer">
            Developer
          </option>

          <option value="Founder">
            Founder
          </option>

          <option value="Professional">
            Professional
          </option>

          <option value="Researcher">
            Researcher
          </option>
        </select>
      </div>
    </div>

    <button
      onClick={next}
      disabled={!form.name || !form.role}
      className="mt-8 px-5 py-3 rounded-xl bg-[var(--ink)] text-white disabled:opacity-40"
    >
      Continue
    </button>
  </>
)}
          {/* STEP 2 */}

          {step === 2 && (
            <>
              <h1 className="font-editorial text-4xl mb-4">
                Current Position
              </h1>

              {form.role === "Student" ? (
                <div className="space-y-4">
                  <input
                    placeholder="University"
                    value={form.university}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        university: e.target.value,
                      })
                    }
                    className="w-full h-12 px-4 rounded-xl border border-[var(--border)]"
                  />

                  <input
                    placeholder="Degree"
                    value={form.degree}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        degree: e.target.value,
                      })
                    }
                    className="w-full h-12 px-4 rounded-xl border border-[var(--border)]"
                  />

                  <input
                    placeholder="Year of Study"
                    value={form.year}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        year: e.target.value,
                      })
                    }
                    className="w-full h-12 px-4 rounded-xl border border-[var(--border)]"
                  />
                  <input
  placeholder="Expected Graduation Year"
  value={form.graduation}
  onChange={(e) =>
    setForm({
      ...form,
      graduation: e.target.value,
    })
  }
  className="w-full h-12 px-4 rounded-xl border border-[var(--border)]"
/>
                </div>
              ) : (
                <div className="space-y-4">
                  <input
                    placeholder="Current Title"
                    value={form.title}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        title: e.target.value,
                      })
                    }
                    className="w-full h-12 px-4 rounded-xl border border-[var(--border)]"
                  />

                  <input
                    placeholder="Organization"
                    value={form.company}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        company: e.target.value,
                      })
                    }
                    className="w-full h-12 px-4 rounded-xl border border-[var(--border)]"
                  />
                </div>
              )}

              <div className="mt-8 flex gap-3">
                <button onClick={back}>
                  Back
                </button>

                <button
                  onClick={next}
                  className="px-5 py-3 rounded-xl bg-[var(--ink)] text-white"
                >
                  Continue
                </button>
              </div>
            </>
          )}

          {/* STEP 3 */}

          {step === 3 && (
            <>
              <h1 className="font-editorial text-4xl mb-4">
                What interests you?
              </h1>

              <p className="text-[var(--muted-strong)] mb-8">
                Select everything relevant.
              </p>

              <div className="flex flex-wrap gap-3">
                {interestsList.map((item) => (
                  <button
                    key={item}
                    onClick={() => toggleInterest(item)}
                    className={`px-4 py-2 rounded-full border transition-all ${
                      form.interests.includes(item)
                        ? "bg-[var(--ink)] text-white"
                        : ""
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <button
                onClick={next}
                className="mt-8 px-5 py-3 rounded-xl bg-[var(--ink)] text-white"
              >
                Continue
              </button>
            </>
          )}

          {/* STEP 4 */}

          {step === 4 && (
            <>
              <h1 className="font-editorial text-4xl mb-4">
                Where do you want to be?
              </h1>

              <p className="text-[var(--muted-strong)] mb-8">
                Describe your long-term goal.
              </p>

              <textarea
                rows={6}
                value={form.goal}
                onChange={(e) =>
                  setForm({
                    ...form,
                    goal: e.target.value,
                  })
                }
                placeholder="Example: Become an AI Security Engineer building infrastructure used by millions."
                className="w-full rounded-xl border border-[var(--border)] p-4"
              />

              <button
                onClick={next}
                className="mt-8 px-5 py-3 rounded-xl bg-[var(--ink)] text-white"
              >
                Continue
              </button>
            </>
          )}

          {/* STEP 5 */}

          {step === 5 && (
            <>
              <h1 className="font-editorial text-4xl mb-4">
                What's slowing you down?
              </h1>

              <p className="text-[var(--muted-strong)] mb-8">
                Chief will prioritize relationships that
                can help remove these obstacles.
              </p>

              <div className="space-y-3">
                {bottlenecksList.map((item) => (
                  <button
                    key={item}
                    onClick={() =>
                      toggleBottleneck(item)
                    }
                    className={`w-full text-left rounded-xl border px-4 py-3 transition-all ${
                      form.bottlenecks.includes(item)
                        ? "bg-[var(--ink)] text-white"
                        : ""
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <button
                onClick={next}
                className="mt-8 px-5 py-3 rounded-xl bg-[var(--ink)] text-white"
              >
                Continue
              </button>
            </>
          )}

          {/* STEP 6 */}

          {step === 6 && (
            <>
              <div className="font-mono text-[11px] uppercase tracking-widest text-[var(--muted)] mb-3">
                Chief's Briefing
              </div>

              <h1 className="font-editorial text-4xl mb-4">
                Your strategy is taking shape.
              </h1>

              <p className="text-[var(--muted-strong)] leading-relaxed mb-8">
                Based on your goal, Chief will identify
                mentors, recruiters, founders, engineers,
                researchers, and operators most relevant
                to your success.
              </p>

              <div className="rounded-2xl border border-[var(--border)] p-6">
                <div className="font-mono text-xs uppercase tracking-widest text-[var(--muted)] mb-2">
                  Goal
                </div>

                <div className="text-lg">
                  {form.goal}
                </div>
              </div>

              <button
                onClick={finish}
                className="mt-8 px-6 py-3 rounded-xl bg-[var(--ink)] text-white"
              >
                Enter Threadly
              </button>
            </>
          )}
        </div>
        
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