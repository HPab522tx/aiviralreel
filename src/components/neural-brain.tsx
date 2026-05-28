import { motion } from "framer-motion";

const nodes = [
  { x: 80, y: 60 }, { x: 140, y: 40 }, { x: 200, y: 70 }, { x: 240, y: 130 },
  { x: 210, y: 200 }, { x: 140, y: 220 }, { x: 70, y: 200 }, { x: 40, y: 130 },
  { x: 130, y: 110 }, { x: 170, y: 150 }, { x: 100, y: 150 },
];
const edges: [number, number][] = [
  [0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0],
  [0,8],[1,8],[2,9],[3,9],[4,9],[5,10],[6,10],[7,10],[8,9],[9,10],[8,10],
];

export function NeuralBrain({ size = 280 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 280 280" className="overflow-visible">
      <defs>
        <radialGradient id="nb-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="oklch(0.7 0.28 330 / 0.3)"/>
          <stop offset="100%" stopColor="oklch(0.65 0.25 290 / 0)"/>
        </radialGradient>
      </defs>
      <circle cx={140} cy={140} r={130} fill="url(#nb-glow)"/>
      {edges.map(([a, b], i) => (
        <motion.line key={i}
          x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
          stroke="oklch(0.85 0.18 200 / 0.4)" strokeWidth={1}
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.12 }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.circle key={i} cx={n.x} cy={n.y} r={4}
          fill={i % 3 === 0 ? "oklch(0.7 0.28 330)" : "oklch(0.85 0.18 200)"}
          animate={{ scale: [1, 1.6, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </svg>
  );
}
