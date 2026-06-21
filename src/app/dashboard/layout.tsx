import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { ViewModeProvider } from "@/components/view-mode-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden">
  <DashboardSidebar />

  <main className="flex-1 overflow-y-auto">
    {children}
  </main>
</div>
  );
}