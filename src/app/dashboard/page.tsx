import { ChiefBriefing } from "@/components/dashboard/chief-briefing";
import { NetworkStrength } from "@/components/dashboard/network-strength";
import { Opportunities } from "@/components/dashboard/opportunities";
import { CrewActivity } from "@/components/dashboard/crew-activity";
import { RelationshipCoverage } from "@/components/dashboard/relationship-coverage";
import { RecentWins } from "@/components/dashboard/recent-wins";

export default function DashboardPage() {
  return (
    <div className="max-w-7xl mx-auto px-8 py-8 paper-grain min-h-screen">
      <ChiefBriefing />

      <NetworkStrength />

      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        <Opportunities />

        <RelationshipCoverage />
      </div>

      <CrewActivity />

      <RecentWins />
    </div>
  );
}