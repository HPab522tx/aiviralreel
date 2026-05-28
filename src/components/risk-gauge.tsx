import { motion } from "framer-motion";

export function RiskGauge({ value = 24, size = 220, label = "Risk" }: { value?: number; size?: number; label?: string }) {
  const r = size / 2 - 14;
  const c = Math.PI * r; // semicircle
  const offset = c - (value / 100) * c;
  const color =
    value < 30 ? "oklch(0.78 0.18 160)" : value < 60 ? "oklch(0.85 0.2 60)" : "oklch(0.65 0.25 25)";
  return (
    <div className="relative inline-block" style={{ width: size, height: size / 2 + 30 }}>
      <svg width={size} height={size / 2 + 10} viewBox={`0 0 ${size} ${size / 2 + 10}`}>
        <defs>
          <linearGradient id="rg-grad" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="oklch(0.78 0.18 160)"/>
            <stop offset="50%" stopColor="oklch(0.85 0.2 60)"/>
            <stop offset="100%" stopColor="oklch(0.65 0.25 25)"/>
          </linearGradient>
        </defs>
        <path
          d={`M 14 ${size / 2} A ${r} ${r} 0 0 1 ${size - 14} ${size / 2}`}
          stroke="oklch(1 0 0 / 0.08)" strokeWidth={14} fill="none" strokeLinecap="round"
        />
        <motion.path
          d={`M 14 ${size / 2} A ${r} ${r} 0 0 1 ${size - 14} ${size / 2}`}
          stroke="url(#rg-grad)" strokeWidth={14} fill="none" strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
      </svg>
      <div className="absolute inset-x-0 bottom-0 text-center">
        <div className="text-3xl font-semibold" style={{ color }}>{value}</div>
        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
      </div>
    </div>
  );
}
