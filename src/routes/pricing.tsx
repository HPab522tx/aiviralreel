import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { AppShell } from "../components/app-shell";

export const Route = createFileRoute("/pricing")({
  head: () => ({ meta: [{ title: "Pricing — ViralReel AI" }] }),
  component: Pricing,
});

const tiers = [
  {
    name: "Starter",
    monthly: 0,
    blurb: "For creators getting started.",
    features: ["10 reels / month", "1080p exports", "Auto captions", "Basic viral score"],
    cta: "Start free",
    highlight: false,
  },
  {
    name: "Creator",
    monthly: 29,
    blurb: "Most-loved by indie creators.",
    features: ["Unlimited reels", "4K exports", "Trend discovery", "Viral Score™ 2.0", "AI recommendations", "Scheduling"],
    cta: "Go Creator",
    highlight: true,
  },
  {
    name: "Studio",
    monthly: 89,
    blurb: "For teams and agencies.",
    features: ["Everything in Creator", "5 team seats", "Brand kits", "API access", "Priority GPU rendering", "Dedicated support"],
    cta: "Contact sales",
    highlight: false,
  },
];

function Pricing() {
  const [yearly, setYearly] = useState(true);
  return (
    <AppShell title="Pricing" requireAuth={false}>
      <div className="max-w-5xl mx-auto">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-muted-foreground">
            <Sparkles className="size-3 text-cyan-300"/> Save 20% yearly
          </div>
          <h1 className="mt-4 text-4xl md:text-5xl font-semibold tracking-tight">Simple, cinematic pricing</h1>
          <p className="mt-3 text-muted-foreground">Cancel anytime. Every plan includes the Viral Score™ engine.</p>

          <div className="mt-6 inline-flex glass rounded-full p-1">
            {(["Monthly","Yearly"] as const).map((opt) => {
              const active = (opt === "Yearly") === yearly;
              return (
                <button key={opt} onClick={() => setYearly(opt === "Yearly")} className={`relative px-4 py-1.5 text-sm rounded-full ${active ? "text-black" : "text-muted-foreground"}`}>
                  {active && <motion.span layoutId="bill" className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500"/>}
                  <span className="relative">{opt}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {tiers.map((t) => {
            const price = yearly ? Math.round(t.monthly * 0.8) : t.monthly;
            return (
              <motion.div
                whileHover={{ y: -6 }}
                key={t.name}
                className={`relative rounded-2xl p-6 ${t.highlight ? "glass-strong ring-1 ring-cyan-400/40 glow-cyan" : "glass"}`}
              >
                {t.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-black font-semibold">
                    Most popular
                  </div>
                )}
                <div className="text-sm text-muted-foreground">{t.name}</div>
                <div className="mt-2 flex items-end gap-1">
                  <div className="text-4xl font-semibold">${price}</div>
                  <div className="text-sm text-muted-foreground pb-1">/{yearly ? "mo, billed yearly" : "month"}</div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{t.blurb}</p>
                <ul className="mt-5 space-y-2 text-sm">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className={`mt-0.5 size-4 rounded-full flex items-center justify-center ${t.highlight ? "bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-black" : "bg-white/10"}`}>
                        <Check className="size-3"/>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>
                <button className={`mt-6 w-full rounded-xl px-4 py-2.5 text-sm font-medium ${
                  t.highlight ? "bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-black hover:opacity-90" : "glass hover:bg-white/10"
                }`}>
                  {t.cta}
                </button>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-12 glass rounded-2xl p-6 text-center">
          <h3 className="font-semibold">Need something custom?</h3>
          <p className="text-sm text-muted-foreground mt-1">Enterprise plans with custom GPU pools, SSO, and white-label exports.</p>
          <button className="mt-3 rounded-xl px-4 py-2 glass hover:bg-white/10 text-sm">Talk to sales</button>
        </div>
      </div>
    </AppShell>
  );
}
