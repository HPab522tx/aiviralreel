import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = Array.from({ length: 30 }, (_, i) => ({
  s: i,
  hype: Math.max(0, 40 + Math.sin(i / 2.5) * 30 + Math.cos(i / 4) * 18),
  emotion: Math.max(0, 30 + Math.sin(i / 3 + 1) * 22),
  boredom: Math.max(0, 20 + Math.cos(i / 5) * 14),
  spike: i % 6 === 0 ? 90 : 0,
}));

export function DopamineGraph({ height = 260 }: { height?: number }) {
  return (
    <div style={{ height }}>
      <ResponsiveContainer>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="dg-hype" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.85 0.18 200)" stopOpacity={0.7}/>
              <stop offset="100%" stopColor="oklch(0.85 0.18 200)" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="dg-emo" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.7 0.28 330)" stopOpacity={0.6}/>
              <stop offset="100%" stopColor="oklch(0.7 0.28 330)" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="dg-bore" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="oklch(0.65 0.25 290)" stopOpacity={0.4}/>
              <stop offset="100%" stopColor="oklch(0.65 0.25 290)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false}/>
          <XAxis dataKey="s" tickFormatter={(v)=>`${v}s`} tick={{ fill: "oklch(0.7 0 0)", fontSize: 11 }}/>
          <YAxis tick={{ fill: "oklch(0.7 0 0)", fontSize: 11 }}/>
          <Tooltip contentStyle={{ background: "oklch(0.18 0.03 270)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12 }}/>
          <Area dataKey="hype" stroke="oklch(0.85 0.18 200)" strokeWidth={2} fill="url(#dg-hype)"/>
          <Area dataKey="emotion" stroke="oklch(0.7 0.28 330)" strokeWidth={2} fill="url(#dg-emo)"/>
          <Area dataKey="boredom" stroke="oklch(0.65 0.25 290)" strokeWidth={1.5} fill="url(#dg-bore)"/>
          <Area dataKey="spike" stroke="oklch(0.85 0.2 60)" strokeWidth={1} fill="oklch(0.85 0.2 60 / 0.15)"/>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
