import { PageShell } from "@/components/page-shell";
import {  Mail,  Link2,  Globe, ArrowRight,} from "lucide-react";
import { FaXTwitter, FaGlobe } from 'react-icons/fa6';

const channels = [
  {
    icon: Mail,
    label: "Email",
    value: "syed.waqar.akhtar08@gmail.com",
    href: "mailto:syed.waqar.akhtar08@gmail.com",
    color: "var(--coral)",
  },
   {
    icon: Link2,
    label: "LinkedIn",
    value: "/in/waqar08",
    href: "https://www.linkedin.com/in/waqar08",
    color: "var(--indigo)",
  },
 {
  icon: FaXTwitter,
  label: "X",
  value: "@waqar0802",
  href: "https://x.com/waqar0802",
  color: "var(--teal)",
},
{
  icon: FaGlobe,
  label: "Portfolio",
  value: "waqar.tech",
  href: "https://personal-portfolio-psi-ashy.vercel.app",
  color: "var(--terracotta)",
},
];

export default function ContactPage() {
  return (
    <PageShell
      eyebrow="Contact"
      title={
        <>
          Say hi to the{" "}
          <span style={{ color: "var(--terracotta)" }}>human</span> behind
          Threadly.
        </>
      }
      lede="Beta access, enterprise pilots, investor introductions, partnership conversations, or just a hello from fellow founders and operators. Every road leads to the same inbox."
      accent="var(--terracotta)"
    >
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {channels.map((c) => {
          const Icon = c.icon;
          return (
            <a
              key={c.label}
              href={c.href}
              target={c.href.startsWith("http") ? "_blank" : undefined}
              rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="rounded-2xl border border-[var(--border)] bg-white p-6 hover:shadow-md hover:-translate-y-1 transition-all group reveal-on-scroll flex flex-col"
            >
              <div
                className="h-10 w-10 rounded-xl flex items-center justify-center mb-4"
                style={{
                  backgroundColor: `color-mix(in srgb, ${c.color} 14%, white)`,
                  border: `1px solid color-mix(in srgb, ${c.color} 25%, transparent)`,
                }}
              >
                <Icon className="h-5 w-5" style={{ color: c.color }} strokeWidth={1.5} />
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-[var(--muted)] mb-2">
                {c.label}
              </div>
              <div className="font-editorial text-lg md:text-xl tracking-tight break-all">
                {c.value}
              </div>
              <div
                className="mt-auto pt-4 inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider opacity-60 group-hover:opacity-100 transition-opacity"
                style={{ color: c.color }}
              >
                open <ArrowRight className="h-3 w-3" strokeWidth={2} />
              </div>
            </a>
          );
        })}
      </section>
    </PageShell>
  );
}
