import { DashboardSidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen paper-grain flex">
      <DashboardSidebar />

      <main className="flex-1 min-w-0">
        {children}
      </main>
    </div>
  );
}