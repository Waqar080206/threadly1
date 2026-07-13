"use client";

import { useEffect, useState } from "react";

import { useAuth } from "@/context/AuthContext";
import { crewAction } from "@/lib/api";

type NetworkStats = {
  people: number;
  companies: number;
  topics: number;
  founders: number;
  aiBuilders: number;
  networkHealth: number;
};

export function NetworkStrength() {
  const { user, loading } = useAuth();
  const [stats, setStats] = useState<NetworkStats | null>(null);

  useEffect(() => {
    if (loading || !user) {
      return;
    }

    let active = true;

    crewAction<NetworkStats>("health")
      .then((response) => {
        if (!active || !response.success) {
          return;
        }

        setStats(response.data);
      })
      .catch(() => {
        if (active) {
          setStats(null);
        }
      });

    return () => {
      active = false;
    };
  }, [loading, user]);

  const cards = [
    {
      label: "Relationships",
      value: stats?.people ?? "--",
      color: "var(--indigo)",
    },
    {
      label: "Companies",
      value: stats?.companies ?? "--",
      color: "var(--coral)",
    },
    {
      label: "AI Builders",
      value: stats?.aiBuilders ?? "--",
      color: "var(--teal)",
    },
    {
      label: "Founders",
      value: stats?.founders ?? "--",
      color: "var(--copper)",
    },
  ];

  return (
    <section className="mb-10">
      <div className="mb-3 flex items-center justify-between gap-3 text-[10px] uppercase tracking-widest font-mono text-[var(--muted)]">
        <span>Live from Neo4j</span>
        <span>
          Network Health · {stats?.networkHealth ?? "--"}
        </span>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {cards.map((stat) => (
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