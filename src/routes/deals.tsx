import { createFileRoute } from "@tanstack/react-router";
import { Handshake, DollarSign, Target, TrendingUp } from "lucide-react";
import { AppShell } from "../components/app-shell";
import { HoloCard } from "../components/holo-card";
import { ScoreBar } from "../components/score-bar";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from "recharts";

export const Route = createFileRoute("/deals")({
  head: () => ({ meta: [{ title: "Brand Deal Optimizer — ViralReel AI" }] }),
  component: Deals,
});

const retention = Array.from({ length: 30 }, (_, i) => ({
  s: i,
  organic: Math.max(20, 100 - i * 2.4),
  withAd: Math.max(15, 100 - i * 2.6 - (i >= 14 && i <= 20 ? 12 : 0)),
}));

const ctaPie = [
  { name: "Click-through", value: 38, fill: "oklch(0.85 0.18 200)" },
  { name: "Bounce", value: 22, fill: "oklch(0.7 0.28 330)" },
  { name: "Watched past", value: 40, fill: "oklch(0.65 0.25 290)" },
];

const slots = [
  { time: "0:03 – 0:07", quality: 62, label: "Pre-hook · weak" },
  { time: "0:11 – 0:16", quality: 88, label: "Mid-payoff · ideal" },
  { time: "0:22 – 0:28", quality: 71, label: "Climax · solid" },
];

function Deals() {
  return (
    <AppShell title="Brand Deal Optimizer">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <HoloCard className="p-6">
          <div className="flex items-center gap-2">
            <Handshake className="size-5 text-cyan-300"/>
            <div>
              <div className="text-xs uppercase tracking-[0.2em] text-cyan-300">Monetization</div>
              <h2 className="text-lg font-semibold">Deal score</h2>
            </div>
          </div>
          <div className="mt-4 flex items-end gap-2">
            <div className="text-5xl font-semibold text-holo">87</div>
            <div className="text-xs text-muted-foreground mb-1.5">/ 100</div>
          </div>
          <div className="mt-4 space-y-3">
            <ScoreBar label="Sponsor placement quality" value={82} accent="cyan"/>
            <ScoreBar label="Ad retention impact" value={74} accent="magenta"/>
            <ScoreBar label="CTA effectiveness" value={91} accent="violet"/>
            <ScoreBar label="Brand-creator fit" value={88} accent="holo"/>
          </div>
          <div className="mt-5 glass rounded-xl p-3 flex items-center gap-2 text-xs">
            <DollarSign className="size-4 text-emerald-400"/>
            <span><span className="text-emerald-400 font-medium">+$1,240</span> projected CPM uplift vs default placement</span>
          </div>
        </HoloCard>

        <div className="xl:col-span-2 glass rounded-2xl p-6">
          <div className="flex items-center gap-2">
            <Target className="size-4 text-fuchsia-300"/>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Sponsor slots</div>
              <h2 className="text-lg font-semibold">Best placement windows</h2>
            </div>
          </div>
          {/* Reel timeline visual */}
          <div className="mt-4 relative h-16 rounded-xl bg-gradient-to-r from-cyan-400/20 via-fuchsia-500/20 to-violet-500/20 ring-1 ring-white/10 overflow-hidden">
            <div className="absolute inset-0 ring-grid opacity-40"/>
            {slots.map((s, i) => {
              const left = [8, 36, 70][i];
              const width = [14, 18, 22][i];
              const color = s.quality >= 80 ? "bg-cyan-400/60 ring-cyan-300" : s.quality >= 70 ? "bg-fuchsia-400/60 ring-fuchsia-300" : "bg-amber-400/60 ring-amber-300";
              return (
                <div key={s.time}
                  className={`absolute top-2 bottom-2 rounded-md ring-1 ${color} flex items-center justify-center text-[10px] font-semibold text-black`}
                  style={{ left: `${left}%`, width: `${width}%` }}>
                  {s.quality}
                </div>
              );
            })}
            <div className="absolute inset-x-0 bottom-0 flex justify-between text-[9px] px-2 text-white/60">
              <span>0s</span><span>15s</span><span>30s</span>
            </div>
          </div>
          <div className="mt-4 grid sm:grid-cols-3 gap-2">
            {slots.map((s) => (
              <div key={s.time} className="glass rounded-xl p-3">
                <div className="text-xs text-muted-foreground">{s.time}</div>
                <div className="text-sm font-medium mt-0.5">{s.label}</div>
                <div className="text-xs text-cyan-300 mt-1">Quality {s.quality}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 glass rounded-2xl p-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="size-4 text-cyan-300"/>
            <h3 className="text-lg font-semibold">Ad retention impact</h3>
          </div>
          <div className="h-64 mt-4">
            <ResponsiveContainer>
              <AreaChart data={retention}>
                <defs>
                  <linearGradient id="dl-org" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.85 0.18 200)" stopOpacity={0.5}/>
                    <stop offset="100%" stopColor="oklch(0.85 0.18 200)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="dl-ad" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.7 0.28 330)" stopOpacity={0.5}/>
                    <stop offset="100%" stopColor="oklch(0.7 0.28 330)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false}/>
                <XAxis dataKey="s" tickFormatter={(v)=>`${v}s`} tick={{ fill: "oklch(0.7 0 0)", fontSize: 11 }}/>
                <YAxis unit="%" tick={{ fill: "oklch(0.7 0 0)", fontSize: 11 }}/>
                <Tooltip contentStyle={{ background: "oklch(0.18 0.03 270)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12 }}/>
                <Area dataKey="organic" stroke="oklch(0.85 0.18 200)" strokeWidth={2} fill="url(#dl-org)"/>
                <Area dataKey="withAd" stroke="oklch(0.7 0.28 330)" strokeWidth={2} fill="url(#dl-ad)"/>
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">CTA effectiveness</div>
          <h3 className="text-lg font-semibold mt-1">Where viewers go</h3>
          <div className="h-56 mt-2">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={ctaPie} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={4}>
                  {ctaPie.map((c, i) => <Cell key={i} fill={c.fill}/>)}
                </Pie>
                <Tooltip contentStyle={{ background: "oklch(0.18 0.03 270)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12 }}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-1.5 text-xs">
            {ctaPie.map((c) => (
              <div key={c.name} className="flex items-center gap-2">
                <span className="size-2 rounded-full" style={{ background: c.fill }}/>
                <span className="flex-1">{c.name}</span>
                <span className="tabular-nums text-muted-foreground">{c.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
