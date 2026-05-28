import { motion } from "framer-motion";
import { Sparkles, TrendingUp } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, YAxis, XAxis } from "recharts";

export type ReelVersion = {
  version: string;
  retention: number;
  viralScore: number;
  curve: number[];
  diffs: string[];
  active?: boolean;
};

export function VersionDiffCard({ v, accent }: { v: ReelVersion; accent: string }) {
  const data = v.curve.map((y, x) => ({ x, y }));
  return (
    <motion.div
      whileHover={{ y: -3 }}
      className={`glass rounded-2xl p-5 relative overflow-hidden ${v.active ? "ring-1 ring-cyan-400/40 glow-cyan" : ""}`}
    >
      <div className={`absolute -top-12 -right-12 size-32 rounded-full ${accent} blur-2xl opacity-50`}/>
      <div className="relative">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{v.version}</div>
            <div className="text-2xl font-semibold mt-1">{v.retention}% <span className="text-xs text-muted-foreground font-normal">retention</span></div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Viral</div>
            <div className="text-xl font-semibold text-gradient">{v.viralScore}</div>
          </div>
        </div>
        <div className="h-20 mt-3 -mx-2">
          <ResponsiveContainer>
            <LineChart data={data}>
              <XAxis dataKey="x" hide/>
              <YAxis hide domain={[0, 100]}/>
              <Line dataKey="y" stroke="oklch(0.85 0.18 200)" strokeWidth={2} dot={false}/>
            </LineChart>
          </ResponsiveContainer>
        </div>
        <ul className="mt-3 space-y-1.5">
          {v.diffs.map((d) => (
            <li key={d} className="text-xs text-muted-foreground flex items-start gap-1.5">
              <Sparkles className="size-3 text-cyan-300 mt-0.5 shrink-0"/>{d}
            </li>
          ))}
        </ul>
        {v.active && (
          <div className="mt-3 inline-flex items-center gap-1 text-[10px] text-emerald-400">
            <TrendingUp className="size-3"/> Current best
          </div>
        )}
      </div>
    </motion.div>
  );
}
