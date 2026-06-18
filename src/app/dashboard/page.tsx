"use client";

import { ChiefBriefing } from "@/components/dashboard/chief-briefing";
import { NetworkStrength } from "@/components/dashboard/network-strength";

export default function DashboardPage() {
  return (<main className="min-h-screen paper-grain relative overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <ChiefBriefing />

      <NetworkStrength />
    </div>
    </main>
  );
  
}