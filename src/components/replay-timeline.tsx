import { motion } from "framer-motion";

export function ReplayTimeline({ length = 60, peaks = [8, 22, 41, 55] }: { length?: number; peaks?: number[] }) {
  const cells = Array.from({ length }, (_, i) => {
    const v = peaks.reduce((acc, p) => acc + Math.exp(-Math.pow((i - p) / 4, 2)), 0.1);
    return Math.min(1, v);
  });
  return (
    <div>
      <div className="flex items-end gap-px h-16">
        {cells.map((v, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${v * 100}%` }}
            transition={{ duration: 0.6, delay: i * 0.01 }}
            className="flex-1 rounded-sm"
            style={{
              background: `linear-gradient(to top, oklch(0.85 0.18 200 / ${v}), oklch(0.7 0.28 330 / ${v}))`,
              minHeight: 2,
            }}
            title={`${i}s · replay probability ${(v * 100).toFixed(0)}%`}
          />
        ))}
      </div>
      <div className="flex justify-between text-[10px] text-muted-foreground mt-2 tabular-nums">
        <span>0s</span><span>15s</span><span>30s</span><span>45s</span><span>{length}s</span>
      </div>
    </div>
  );
}
