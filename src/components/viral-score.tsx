import { motion } from "framer-motion";

export function ViralScore({ score = 87, label = "Viral Score", size = 160 }: { score?: number; label?: string; size?: number }) {
  const r = size / 2 - 12;
  const c = 2 * Math.PI * r;
  const offset = c - (score / 100) * c;
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id="vs-grad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.85 0.18 200)" />
            <stop offset="50%" stopColor="oklch(0.7 0.28 330)" />
            <stop offset="100%" stopColor="oklch(0.65 0.25 290)" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} stroke="oklch(1 0 0 / 0.08)" strokeWidth={10} fill="none" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="url(#vs-grad)"
          strokeWidth={10}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-3xl font-semibold text-gradient">{score}</div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">{label}</div>
      </div>
    </div>
  );
}
