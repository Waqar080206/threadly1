import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { ViewModeProvider } from "@/components/view-mode-provider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen paper-grain flex">
      <ViewModeProvider>
        <DashboardSidebar />

      <main className="flex-1 min-w-0">
        {children}
      </main>
    </ViewModeProvider>
    </div>
  );
}