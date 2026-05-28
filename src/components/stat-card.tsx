import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { Sparkline } from "./sparkline";

export function StatCard({
  label, value, delta, icon: Icon, accent = "cyan", trend,
}: {
  label: string; value: string; delta: number; icon: LucideIcon;
  accent?: "cyan" | "magenta" | "violet";
  trend?: number[];
}) {
  const up = delta >= 0;
  const ring = accent === "cyan" ? "ring-cyan-400/30" : accent === "magenta" ? "ring-fuchsia-400/30" : "ring-violet-400/30";
  const grad = accent === "cyan" ? "from-cyan-400/20" : accent === "magenta" ? "from-fuchsia-500/20" : "from-violet-500/20";
  const color = accent === "cyan" ? "oklch(0.85 0.18 200)" : accent === "magenta" ? "oklch(0.7 0.28 330)" : "oklch(0.65 0.25 290)";
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className={`glass rounded-2xl p-5 relative overflow-hidden ring-1 ${ring}`}
    >
      <div className={`absolute -top-12 -right-12 size-32 rounded-full bg-gradient-to-br ${grad} to-transparent blur-2xl`} />
      <div className="flex items-center justify-between relative">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
        <div className="glass rounded-lg p-2"><Icon className="size-4" /></div>
      </div>
      <div className="mt-3 flex items-end justify-between gap-3 relative">
        <div className="text-3xl font-semibold tracking-tight">{value}</div>
        {trend && <Sparkline data={trend} color={color} width={80} height={32} className="opacity-90"/>}
      </div>
      <div className={`mt-2 inline-flex items-center gap-1 text-xs ${up ? "text-emerald-400" : "text-rose-400"}`}>
        {up ? <TrendingUp className="size-3" /> : <TrendingDown className="size-3" />}
        {up ? "+" : ""}{delta}% vs last week
      </div>
    </motion.div>
  );
}
