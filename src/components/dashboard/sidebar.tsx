"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  LayoutDashboard,
  Users,
  Sparkles,
  Bot,
  Inbox,
  PanelLeft,
  PanelRight,
} from "lucide-react";
import { Building2, User, Users2 } from "lucide-react";

const items = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Connections",
    href: "/dashboard/connections",
    icon: Users,
  },
  {
    label: "Opportunities",
    href: "/dashboard/opportunities",
    icon: Sparkles,
  },
  {
    label: "Crew",
    href: "/dashboard/crew",
    icon: Bot,
  },
  {
    label: "Inbox",
    href: "/dashboard/inbox",
    icon: Inbox,
  },
];


export function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const [collapsed, setCollapsed] = useState(false);
  const [workspace, setWorkspace] = useState<
  "personal" | "team" | "enterprise"
>("personal");

  return (
    <aside
      className={`
        hidden lg:flex flex-col
        h-screen sticky top-0
        relative
        shrink-0
        transition-all duration-300 ease-out
        border-r
        border-[color-mix(in_srgb,var(--ink)_80%,white)]
        bg-[var(--ink)]
        text-white
        ${
          collapsed
            ? "w-[80px]"
            : "w-[280px]"
        }
      `}
    >
      {/* Logo + Toggle */}
     <div className="flex items-center justify-center p-4 border-b border-white/10">
  {collapsed ? (
    <button
      onClick={() => setCollapsed(false)}
      className="group h-12 w-12 flex items-center justify-center rounded-xl transition-all duration-200 hover:bg-white/10"
    >
      <img
        src="/brand/faviconc.png"
        alt="Threadly"
        className="absolute h-12 w-auto transition-all duration-200 group-hover:opacity-0"
        draggable={false}
      />

      <PanelRight
        size={18}
        className="opacity-0 transition-all duration-200 group-hover:opacity-100"
      />
    </button>
  ) : (
    <div className="flex items-center justify-between w-full">
      <img
        src="/brand/faviconc.png"
        alt="Threadly"
        className="h-12.5 w-auto"
        draggable={false}
      />

      <button
        onClick={() => setCollapsed(true)}
        className="rounded-xl p-2 hover:bg-white/10 transition-colors"
      >
        <PanelLeft size={18} />
      </button>
    </div>
  )}
</div>


      {/* Workspace Switcher */}
{!collapsed && (
  <div className="px-5 pt-5">
    <div className="rounded-2xl bg-white/5 p-1 flex border border-white/10">
      <button
        onClick={() => setWorkspace("personal")}
        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs transition-all ${
          workspace === "personal"
            ? "bg-white text-[var(--ink)]"
            : "text-white/70 hover:text-white"
        }`}
      >
        <User size={14} />
        Personal
      </button>

      <button
        onClick={() => setWorkspace("team")}
        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs transition-all ${
          workspace === "team"
            ? "bg-white text-[var(--ink)]"
            : "text-white/70 hover:text-white"
        }`}
      >
        <Users2 size={14} />
        Team
      </button>

      <button
        onClick={() => setWorkspace("enterprise")}
        className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs transition-all ${
          workspace === "enterprise"
            ? "bg-white text-[var(--ink)]"
            : "text-white/70 hover:text-white"
        }`}
      >
        <Building2 size={14} />
        Enterprise
      </button>
    </div>
  </div>
)}

      {/* Chief Status */}
      {!collapsed && (
        <div className="p-5">
          <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-5">
            <div className="font-mono text-[9px] uppercase tracking-widest text-white/50">
              Chief Status
            </div>

            <div
              className="mt-3 font-editorial text-4xl"
              style={{
                color: "var(--plum)",
              }}
            >
              67
            </div>

            <div className="text-sm text-white/70">
              Network Strength
            </div>

            <div className="mt-4 pt-4 border-t border-white/10">
              <div className="font-mono text-[9px] uppercase tracking-widest text-white/50">
                Current Goal
              </div>

              <div className="mt-2 text-sm leading-relaxed">
                AI Cloud Engineer
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="px-3 flex-1 overflow-y-auto">
        {items.map((item) => {
          const active =
            pathname === item.href;

          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                flex items-center
                ${
                  collapsed
                    ? "justify-center"
                    : "gap-3"
                }
                px-4 py-3 rounded-xl mb-1
                transition-all
                ${
                  active
                    ? "bg-white text-[var(--ink)] shadow-sm"
                    : "text-white/75 hover:bg-white/10 hover:text-white"
                }
              `}
            >
              <Icon size={18} />

              {!collapsed && (
                <span className="text-sm">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Recent Signal */}
      {!collapsed && (
        <div className="px-5 mb-5">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="font-mono text-[9px] uppercase tracking-widest text-white/50">
              Latest Signal
            </div>

            <div className="mt-3 text-sm leading-relaxed text-white/80">
              A recruiter in your extended
              network viewed your profile.
            </div>
          </div>
        </div>
      )}

      {/* Profile */}
      <div className="border-t border-white/10 p-4">
        <div
          className={`flex items-center ${
            collapsed
              ? "justify-center"
              : "gap-3"
          }`}
        >
          <div
            className="h-10 w-10 rounded-full flex items-center justify-center text-white font-medium shrink-0"
            style={{
              backgroundColor:
                "var(--indigo)",
            }}
          >
            {(
              user?.displayName?.[0] || "U"
            ).toUpperCase()}
          </div>

          {!collapsed && (
            <div className="min-w-0">
              <div className="text-sm font-medium truncate">
                {user?.displayName ||
                  "User"}
              </div>

              <div className="text-xs text-white/50 truncate">
                {user?.email}
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}