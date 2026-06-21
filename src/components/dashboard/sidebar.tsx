"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useViewMode } from "@/components/view-mode-provider";

import {
  LayoutDashboard,
  Users,
  Sparkles,
  PanelLeft,
  PanelRight,
  Building2,
  TrendingUp,
  ScanLine,
  BellDot,
  ShieldCheck,
  Radio,
  NotebookPen,
  Settings,
} from "lucide-react";

const mainItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Connect",
    href: "/dashboard/connect",
    icon: Sparkles,
  },
  {
    label: "Contacts",
    href: "/dashboard/contacts",
    icon: Users,
  },
  {
    label: "Lead-O-Meter",
    href: "/dashboard/lead-o-meter",
    icon: TrendingUp,
  },
];

const crewItems = [
  {
    label: "Snap",
    href: "/dashboard/crew/snap",
    icon: ScanLine,
  },
  {
    label: "Nudge",
    href: "/dashboard/crew/nudge",
    icon: BellDot,
  },
  {
    label: "Gatekeeper",
    href: "/dashboard/crew/gatekeeper",
    icon: ShieldCheck,
  },
  {
    label: "Pulse",
    href: "/dashboard/crew/pulse",
    icon: Radio,
  },
  {
    label: "Recall",
    href: "/dashboard/crew/recall",
    icon: NotebookPen,
  },
];

const modeData = {
  personal: {
    score: 67,
    metric: "Network Strength",
    goal: "AI Security Engineer",
    signal:
      "A recruiter in your extended network viewed your profile.",
  },
  teams: {
    score: 82,
    metric: "Team Coverage",
    goal: "Growing Team Relationships",
    signal:
      "Three new warm introductions became available through your team.",
  },
  enterprise: {
    score: 94,
    metric: "Ecosystem Reach",
    goal: "Portfolio Intelligence",
    signal:
      "A portfolio company requested an ecosystem introduction.",
  },
};

export function DashboardSidebar() {
  const pathname = usePathname();
  const { user } = useAuth();

  const { mode, setMode } = useViewMode();

  const [collapsed, setCollapsed] = useState(false);

  const current =
    modeData[mode] || modeData.personal;

  return (
<aside
  className={`
    hidden lg:flex flex-col
    h-screen max-h-screen
    sticky top-0
    shrink-0
    overflow-hidden
    bg-[var(--ink)]
    text-white
    border-r border-white/10
    transition-all duration-300
    ${
      collapsed
        ? "w-[80px]"
        : "w-[280px]"
    }
  `}
>
      {/* Header */}
      <div className="border-b border-white/10">
        {collapsed ? (
          <div className="flex items-center justify-center py-4">
            <button
              onClick={() =>
                setCollapsed(false)
              }
              className="group relative h-12 w-12 flex items-center justify-center rounded-xl"
            >
              <img
                src="/brand/faviconc.png"
                alt="Threadly"
                className="absolute h-12 w-auto transition-opacity duration-200 group-hover:opacity-0"
                draggable={false}
              />

              <PanelRight
                size={18}
                className="opacity-0 transition-opacity duration-200 group-hover:opacity-100"
              />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between p-4">
            <img
              src="/brand/faviconc.png"
              alt="Threadly"
              className="h-[50px] w-auto"
              draggable={false}
            />

            <button
              onClick={() =>
                setCollapsed(true)
              }
              className="rounded-xl p-2 hover:bg-white/10 transition-colors"
            >
              <PanelLeft size={18} />
            </button>
          </div>
        )}
      </div>

<div
  className={`flex-1 min-h-0 ${
    collapsed
      ? "overflow-hidden"
      : "overflow-y-auto threadly-scroll"
  }`}
>
  {/* View Mode */}
  {!collapsed && (
    <div className="px-5 pt-5">
      <div className="grid grid-cols-3 gap-1 rounded-xl bg-white/5 p-1 border border-white/10">
        <button
          onClick={() => setMode("personal")}
          className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs transition-all ${
            mode === "personal"
              ? "bg-[var(--terracotta)] text-white"
              : "text-white/60 hover:text-white"
          }`}
        >
          Personal
        </button>

        <button
          onClick={() => setMode("teams")}
          className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs transition-all ${
            mode === "teams"
              ? "bg-[var(--teal)] text-white"
              : "text-white/60 hover:text-white"
          }`}
        >
          Team
        </button>

        <button
          onClick={() => setMode("enterprise")}
          className={`flex items-center justify-center gap-2 py-2 rounded-lg text-xs transition-all ${
            mode === "enterprise"
              ? "bg-[var(--indigo)] text-white"
              : "text-white/60 hover:text-white"
          }`}
        >
          Enterprise
        </button>
      </div>
    </div>
  )}

  {/* Chief */}
  {!collapsed && (
    <div className="p-5">
      <Link
        href="/dashboard/connect"
        className="block rounded-2xl p-5 transition-all hover:scale-[1.02]"
        style={{
          background:
            "linear-gradient(135deg,var(--plum),color-mix(in srgb,var(--plum) 70%, black))",
          boxShadow:
            "0 10px 30px -15px var(--plum)",
        }}
      >
        <div className="font-mono text-[9px] uppercase tracking-widest text-white/70">
          Chief
        </div>

        <div className="mt-3 font-editorial text-3xl text-white">
          Ask the graph
        </div>

        <div className="mt-4 text-sm text-white/80 leading-relaxed">
          Who should I meet?
          <br />
          Which connection matters?
          <br />
          Who can help me reach my goal?
        </div>
      </Link>
    </div>
  )}

  {/* Workspace */}
  <nav className="px-3">
    {!collapsed && (
      <div className="px-3 mb-3 font-mono text-[9px] uppercase tracking-widest text-white/40">
        Workspace
      </div>
    )}

    {mainItems.map((item) => {
      const active = pathname === item.href;
      const Icon = item.icon;

      return (
        <Link
          key={item.href}
          href={item.href}
          className={`flex items-center ${
            collapsed ? "justify-center" : "gap-3"
          } px-4 py-3 rounded-xl mb-1 transition-all`}
          style={{
            backgroundColor: active
              ? "rgba(255,255,255,0.08)"
              : undefined,
            boxShadow: active
              ? "inset 2px 0 0 0 white"
              : undefined,
          }}
        >
          <Icon
  size={collapsed
  ? 18
  : 14}
  strokeWidth={collapsed ? 2.25 : 2}
/>

          {!collapsed && (
            <span className="text-sm">
              {item.label}
            </span>
          )}
        </Link>
      );
    })}
  </nav>

  {/* Crew */}
  <nav className="px-3 mt-6">
    {!collapsed && (
      <div className="px-3 mb-3 font-mono text-[9px] uppercase tracking-widest text-white/40">
        Your Crew
      </div>
    )}

    {crewItems.map((item) => {
      const Icon = item.icon;

      return (
        <Link
          key={item.href}
          href={item.href}
          className={`flex items-center ${
            collapsed ? "justify-center" : "gap-3"
          } px-4 py-3 rounded-xl mb-1 text-white transition-all hover:opacity-90`}
          style={{
            backgroundColor:
              item.label === "Snap"
                ? "var(--terracotta)"
                : item.label === "Nudge"
                ? "var(--teal)"
                : item.label === "Gatekeeper"
                ? "var(--indigo)"
                : item.label === "Pulse"
                ? "var(--plum)"
                : "var(--copper)",
          }}
        >
          <Icon
  size={collapsed
  ? 18
  : 14}
  strokeWidth={collapsed ? 2.25 : 2}
/>

          {!collapsed && (
            <span className="text-sm">
              {item.label}
            </span>
          )}
        </Link>
      );
    })}
  </nav>

  {/* Latest Signal */}
  {!collapsed && (
    <div className="px-5 mt-6 mb-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="font-mono text-[9px] uppercase tracking-widest text-white/50">
          Latest Signal
        </div>

        <div className="mt-3 text-sm leading-relaxed text-white/80">
          {current.signal}
        </div>
      </div>
    </div>
  )}
</div>

<div className="px-3 my-1">
  <Link
    href="/dashboard/settings"
    className={`
      flex items-center
      ${
        collapsed
          ? "justify-center"
          : "gap-3"
      }
      px-4 py-3 rounded-xl
      text-white/75 hover:bg-white/10 hover:text-white
      transition-all
    `}
  >
    <Settings size={collapsed ? 18 : 14} />

    {!collapsed && (
      <span className="text-sm">
        Settings
      </span>
    )}
  </Link>
</div>
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