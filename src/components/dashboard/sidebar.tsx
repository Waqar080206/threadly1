"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

const items = [
  {
    label: "Dashboard",
    href: "/dashboard",
  },
  {
    label: "Connections",
    href: "/dashboard/connections",
  },
  {
    label: "Opportunities",
    href: "/dashboard/opportunities",
  },
  {
    label: "Crew",
    href: "/dashboard/crew",
  },
  {
    label: "Inbox",
    href: "/dashboard/inbox",
  },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <aside className="w-[300px] shrink-0 border-r border-[var(--border)] min-h-screen sticky top-0 bg-[var(--background)]">
      {/* Logo */}
      <div className="p-6 border-b border-[var(--border)]">
        <img
          src="/brand/logobg.png"
          alt="Threadly"
          className="h-8 w-auto"
          draggable={false}
        />
      </div>

      {/* Chief Status */}
      <div className="p-5">
        <div className="rounded-2xl border border-[var(--border)] bg-white/80 p-5">
          <div className="font-mono text-[9px] uppercase tracking-widest text-[var(--muted)]">
            Chief Status
          </div>

          <div
            className="mt-3 font-editorial text-4xl"
            style={{ color: "var(--plum)" }}
          >
            67
          </div>

          <div className="text-sm text-[var(--muted-strong)]">
            Network Strength
          </div>

          <div className="mt-4 pt-4 border-t border-[var(--border)]">
            <div className="font-mono text-[9px] uppercase tracking-widest text-[var(--muted)]">
              Current Goal
            </div>

            <div className="mt-2 text-sm leading-relaxed">
              AI Cloud Engineer
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-4">
        {items.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-3 rounded-xl transition-all mb-1 ${
                active
                  ? "bg-white shadow-sm border border-[var(--border)]"
                  : "hover:bg-white/60"
              }`}
            >
              <span className="text-sm">
                {item.label}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Recent Signal */}
      <div className="px-5 mt-8">
        <div className="rounded-2xl border border-[var(--border)] p-4 bg-white/70">
          <div className="font-mono text-[9px] uppercase tracking-widest text-[var(--muted)]">
            Latest Signal
          </div>

          <div className="mt-3 text-sm leading-relaxed">
            A recruiter in your extended network viewed your profile.
          </div>
        </div>
      </div>

      {/* Profile */}
      <div className="absolute bottom-0 left-0 right-0 p-5 border-t border-[var(--border)]">
        <div className="flex items-center gap-3">
          <div
            className="h-10 w-10 rounded-full flex items-center justify-center text-white font-medium"
            style={{ backgroundColor: "var(--indigo)" }}
          >
            {(user?.displayName?.[0] || "U").toUpperCase()}
          </div>

          <div className="min-w-0">
            <div className="text-sm font-medium truncate">
              {user?.displayName || "User"}
            </div>

            <div className="text-xs text-[var(--muted)] truncate">
              {user?.email}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}