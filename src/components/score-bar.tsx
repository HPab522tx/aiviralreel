import { motion } from "framer-motion";

export function ScoreBar({
  label, value, max = 100, accent = "cyan", suffix = "%",
}: {
  label: string; value: number; max?: number;
  accent?: "cyan" | "magenta" | "violet" | "holo";
  suffix?: string;
}) {
  const pct = Math.min(100, (value / max) * 100);
  const grad =
    accent === "cyan" ? "from-cyan-400 to-cyan-300"
    : accent === "magenta" ? "from-fuchsia-500 to-rose-400"
    : accent === "violet" ? "from-violet-500 to-fuchsia-500"
    : "from-cyan-400 via-fuchsia-500 to-violet-500";
  return (
    <div>
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">{label}</span>
        <span className="tabular-nums">{value}{suffix}</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 mt-1 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${grad}`}
        />
      </div>
    </div>
  );
}
