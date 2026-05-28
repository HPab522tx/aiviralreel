import { motion } from "framer-motion";

type Blip = { angle: number; radius: number; label: string; strength: number };

const defaultBlips: Blip[] = [
  { angle: 30, radius: 0.55, label: "Brainrot Edits", strength: 92 },
  { angle: 95, radius: 0.78, label: "Loop Reveals", strength: 84 },
  { angle: 160, radius: 0.4, label: "Faceless POV", strength: 71 },
  { angle: 220, radius: 0.62, label: "Slow Burn Hooks", strength: 66 },
  { angle: 280, radius: 0.85, label: "AI Voice Skits", strength: 88 },
  { angle: 335, radius: 0.5, label: "Synthwave Drops", strength: 74 },
];

export function RadarSweep({ blips = defaultBlips, size = 320 }: { blips?: Blip[]; size?: number }) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 4;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="relative z-10">
        <defs>
          <radialGradient id="rs-fill" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="oklch(0.85 0.18 200 / 0.15)"/>
            <stop offset="100%" stopColor="oklch(0.65 0.25 290 / 0)"/>
          </radialGradient>
          <linearGradient id="rs-sweep" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="oklch(0.85 0.18 200 / 0)"/>
            <stop offset="100%" stopColor="oklch(0.85 0.18 200 / 0.6)"/>
          </linearGradient>
        </defs>
        <circle cx={cx} cy={cy} r={r} fill="url(#rs-fill)" stroke="oklch(1 0 0 / 0.1)"/>
        {[0.33, 0.66, 1].map((f) => (
          <circle key={f} cx={cx} cy={cy} r={r * f} fill="none" stroke="oklch(1 0 0 / 0.08)" strokeDasharray="2 4"/>
        ))}
        {[0, 45, 90, 135].map((a) => {
          const rad = (a * Math.PI) / 180;
          return (
            <line key={a}
              x1={cx - Math.cos(rad) * r} y1={cy - Math.sin(rad) * r}
              x2={cx + Math.cos(rad) * r} y2={cy + Math.sin(rad) * r}
              stroke="oklch(1 0 0 / 0.06)"/>
          );
        })}
        {/* Sweep */}
        <motion.g
          style={{ transformOrigin: `${cx}px ${cy}px` }}
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
        >
          <path d={`M ${cx} ${cy} L ${cx + r} ${cy} A ${r} ${r} 0 0 1 ${cx + r * Math.cos(Math.PI / 3)} ${cy + r * Math.sin(Math.PI / 3)} Z`} fill="url(#rs-sweep)"/>
        </motion.g>
        {/* Blips */}
        {blips.map((b, i) => {
          const rad = (b.angle * Math.PI) / 180;
          const x = cx + Math.cos(rad) * r * b.radius;
          const y = cy + Math.sin(rad) * r * b.radius;
          return (
            <g key={i}>
              <motion.circle
                cx={x} cy={y} r={4}
                fill="oklch(0.85 0.18 200)"
                animate={{ scale: [1, 1.6, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.3 }}
              />
              <text x={x + 8} y={y + 3} fontSize="9" fill="oklch(0.85 0.005 250)" className="font-medium">
                {b.label}
              </text>
            </g>
          );
        })}
        <circle cx={cx} cy={cy} r={3} fill="oklch(0.85 0.18 200)"/>
      </svg>
    </div>
  );
}
