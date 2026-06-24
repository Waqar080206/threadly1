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
     TextAlignJustify,
   Briefcase, 
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
const enterpriseItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Ecosystem Directory",
    href: "/dashboard/ecosystem",
    icon: Building2,
  },
  {
    label: "Intro Approvals",
    href: "/dashboard/intro-approvals",
    icon: ShieldCheck,
  },
  {
    label: "PortCos",
    href: "/dashboard/portcos",
    icon: Briefcase,
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
 
  const [moreOpen, setMoreOpen] = useState(false);

  const current =
    modeData[mode] || modeData.personal;

  const activeItems =
  mode === "enterprise"
    ? enterpriseItems
    : mainItems;

  return (
  <>
   <nav
  className="
    lg:hidden
    fixed
    bottom-0
    left-0
    right-0
    z-40
    h-16
    bg-[var(--background)]
    border-t
    border-[var(--border)]
    grid
    grid-cols-4
    backdrop-blur-xl
  "
>
  <Link
    href="/dashboard"
    className="flex flex-col items-center justify-center gap-1"
  >
    <LayoutDashboard size={20} />
    <span className="text-[10px] font-mono uppercase">
      Dashboard
    </span>
  </Link>

  <Link
    href="/dashboard/connect"
    className="flex flex-col items-center justify-center gap-1"
  >
    <Sparkles size={20} />
    <span className="text-[10px] font-mono uppercase">
      Connect
    </span>
  </Link>

  <Link
    href="/dashboard/contacts"
    className="flex flex-col items-center justify-center gap-1"
  >
    <Users size={20} />
    <span className="text-[10px] font-mono uppercase">
      Contacts
    </span>
  </Link>

  <button
    onClick={() => setMoreOpen(true)}
    className="flex flex-col items-center justify-center gap-1"
  >
    <TextAlignJustify size={20} />

    <span className="text-[10px] font-mono uppercase">
      More
    </span>
  </button>
</nav>
{moreOpen && (
  <div className="lg:hidden fixed inset-0 z-50">
    {/* Backdrop */}

    <button
      onClick={() => setMoreOpen(false)}
      className="
        absolute inset-0
        bg-black/30
        backdrop-blur-md
      "
    />

    {/* Sheet */}

    <div
      className="
        absolute
        bottom-0
        left-0
        right-0
        bg-[var(--ink)]
        text-white
        rounded-t-3xl
        border-t border-white/10
        overflow-hidden
        animate-in slide-in-from-bottom
      "
    >
      {/* Header */}

      <div className="flex items-center justify-between p-6 border-b border-white/10">
        <h3 className="font-editorial text-3xl">
          More
        </h3>

        <button
          onClick={() => setMoreOpen(false)}
          className="
            h-10 w-10
            rounded-full
            hover:bg-white/10
            flex items-center justify-center
          "
        >
          ×
        </button>
      </div>
      {/* Analytics */}

<div className="px-5 pb-2">
  <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-4">
    Analytics
  </div>

  <Link
    href="/dashboard/lead-o-meter"
    onClick={() => setMoreOpen(false)}
    className="
      flex items-center gap-3
      px-4 py-4
      rounded-xl
      bg-white/5
      hover:bg-white/10
      transition-all
    "
  >
    <TrendingUp size={18} />

    <span>
      Lead-O-Meter
    </span>
  </Link>
</div>
  
      {/* Crew */}

      <div className="p-5">
        <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-4">
          Your Crew
        </div>

        {crewItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMoreOpen(false)}
              className="
                flex items-center justify-between
                rounded-xl
                px-4 py-4
                mb-2
                text-white
              "
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
              <div className="flex items-center gap-3">
                <Icon size={18} />
                <span>{item.label}</span>
              </div>

              <div className="bg-white/20 rounded-lg px-2 py-1 text-xs">
                4
              </div>
            </Link>
          );
        })}
      </div>

      {/* Account */}

      <div className="px-5 pb-8">
        <div className="font-mono text-[10px] uppercase tracking-widest text-white/40 mb-4">
          Account
        </div>

        <Link
          href="/dashboard/settings"
          onClick={() => setMoreOpen(false)}
          className="
            flex items-center gap-3
            px-4 py-4
            rounded-xl
            hover:bg-white/5
          "
        >
          <Settings size={18} />
          Settings
        </Link>
      </div>
    </div>
  </div>
)}
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
        ? "w-[96px]"
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
  {/* Chief */}
{!collapsed && (
  <div className="p-5">
    <Link
      href="/dashboard/connect"
      className="block rounded-2xl p-5 transition-all hover:scale-[1.02]"
      style={{
        background:
          mode === "enterprise"
            ? "linear-gradient(135deg,var(--indigo),color-mix(in srgb,var(--indigo) 70%, black))"
            : "linear-gradient(135deg,var(--plum),color-mix(in srgb,var(--plum) 70%, black))",
        boxShadow:
          mode === "enterprise"
            ? "0 10px 30px -15px var(--indigo)"
            : "0 10px 30px -15px var(--plum)",
      }}
    >
      {mode === "enterprise" ? (
        <>
          <div className="font-mono text-[9px] uppercase tracking-widest text-white/70">
            Enterprise
          </div>

          <div className="mt-3 font-editorial text-3xl text-white">
            Command Center
          </div>

          <div className="mt-4 text-sm text-white/80 leading-relaxed">
            Monitor portfolio companies,
            ecosystem relationships and
            strategic introductions.
          </div>
        </>
      ) : (
        <>
          <div className="font-mono text-[9px] uppercase tracking-widest text-white/70">
            Chief
          </div>

          <div className="mt-3 font-editorial text-3xl text-white">
            Ask the Graph
          </div>

          <div className="mt-4 text-sm text-white/80 leading-relaxed">
            Who should I meet?
            <br />
            Which connection matters?
            <br />
            Who can help me reach my goal?
          </div>
        </>
      )}
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
    {activeItems.map((item) => {
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
        size={collapsed ? 28 : 16}
        strokeWidth={2.25}
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
 {mode !== "enterprise" && (
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
  ? 28
  : 16}
  strokeWidth={ 2.25 }
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
 )}
  {/* Latest Signal */}
  {!collapsed && (
    <div className="px-5 mt-6 mb-6">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="font-mono text-[9px] uppercase tracking-widest text-white/50">
          Latest Signal
        </div>

        <div className="mt-3 text-sm leading-relaxed text-white/80">
          {mode === "enterprise"
  ? "TCS requested an introduction through a portfolio company."
  : current.signal}
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
  mode === "enterprise"
    ? "var(--indigo)"
    : mode === "teams"
    ? "var(--teal)"
    : "var(--terracotta)"
            }}
          >
            {mode === "enterprise"
  ? "T"
  : (user?.displayName?.[0] || "U").toUpperCase()}
             </div>

          {!collapsed && (
            <div className="min-w-0">
              <div className="text-sm font-medium truncate">
               {mode === "enterprise"
  ? "TATA Group"
  : user?.displayName || "User"}
              </div>

              <div className="text-xs text-white/50 truncate">
                {mode === "enterprise"
  ? "Enterprise Workspace"
  : user?.email}
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  </>
  );
}