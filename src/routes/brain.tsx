import { createFileRoute } from "@tanstack/react-router";
import { Brain, Eye, Heart, Zap, Smile, AlertTriangle } from "lucide-react";
import { AppShell } from "../components/app-shell";
import { HoloCard } from "../components/holo-card";
import { NeuralBrain } from "../components/neural-brain";
import { DopamineGraph } from "../components/dopamine-graph";
import { ScoreBar } from "../components/score-bar";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/brain")({
  head: () => ({ meta: [{ title: "Brain Scanner — ViralReel AI" }] }),
  component: BrainPage,
});

const emotions = Array.from({ length: 30 }, (_, i) => ({
  s: i,
  excitement: 30 + Math.sin(i / 2) * 25 + (i > 20 ? 15 : 0),
  boredom: 20 + Math.cos(i / 3) * 15,
  laughter: i > 10 && i < 18 ? 70 - Math.abs(i - 14) * 8 : 12,
  shock: i === 6 || i === 22 ? 88 : 14 + Math.sin(i) * 6,
  hype: 40 + Math.sin(i / 1.5 + 1) * 30,
}));

const psychology = [
  { label: "Curiosity loops", value: 88 },
  { label: "Attention manipulation", value: 76 },
  { label: "Emotional pacing", value: 84 },
  { label: "Engagement traps", value: 71 },
  { label: "Dopamine cadence", value: 92 },
];

function BrainPage() {
  return (
    <AppShell title="TikTok Brain Scanner">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <HoloCard className="p-6 flex flex-col items-center text-center">
          <div className="text-xs uppercase tracking-[0.2em] text-cyan-300 self-start">Viewer Psychology</div>
          <h2 className="text-lg font-semibold mt-1 self-start">Neural pattern map</h2>
          <div className="my-4"><NeuralBrain/></div>
          <div className="text-3xl font-semibold text-holo">+38%</div>
          <div className="text-xs text-muted-foreground">stronger curiosity loop vs avg</div>
        </HoloCard>

        <div className="xl:col-span-2 glass rounded-2xl p-6">
          <div className="flex items-center gap-2">
            <Brain className="size-4 text-cyan-300"/>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">AI Dopamine Graph</div>
              <h2 className="text-lg font-semibold">Hype · emotion · boredom across the reel</h2>
            </div>
          </div>
          <div className="mt-4"><DopamineGraph/></div>
          <div className="mt-3 flex flex-wrap gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-full bg-cyan-400"/>Hype</span>
            <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-full bg-fuchsia-400"/>Emotion</span>
            <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-full bg-violet-400"/>Boredom</span>
            <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-full bg-amber-300"/>Attention spikes</span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 glass rounded-2xl p-6">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Viewer Emotion Simulation</div>
          <h2 className="text-lg font-semibold mt-1">What your audience feels, second by second</h2>
          <div className="h-72 mt-4">
            <ResponsiveContainer>
              <LineChart data={emotions}>
                <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false}/>
                <XAxis dataKey="s" tickFormatter={(v)=>`${v}s`} tick={{ fill: "oklch(0.7 0 0)", fontSize: 11 }}/>
                <YAxis tick={{ fill: "oklch(0.7 0 0)", fontSize: 11 }}/>
                <Tooltip contentStyle={{ background: "oklch(0.18 0.03 270)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12 }}/>
                <Line dataKey="excitement" stroke="oklch(0.85 0.18 200)" strokeWidth={2} dot={false}/>
                <Line dataKey="boredom" stroke="oklch(0.55 0.05 260)" strokeWidth={1.5} dot={false}/>
                <Line dataKey="laughter" stroke="oklch(0.85 0.2 60)" strokeWidth={2} dot={false}/>
                <Line dataKey="shock" stroke="oklch(0.65 0.25 25)" strokeWidth={2} dot={false}/>
                <Line dataKey="hype" stroke="oklch(0.7 0.28 330)" strokeWidth={2} dot={false}/>
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-3 flex flex-wrap gap-4 text-xs">
            {[
              { icon: Zap, label: "Excitement", c: "text-cyan-300" },
              { icon: Smile, label: "Laughter", c: "text-amber-300" },
              { icon: AlertTriangle, label: "Shock", c: "text-rose-300" },
              { icon: Heart, label: "Hype", c: "text-fuchsia-300" },
              { icon: Eye, label: "Boredom", c: "text-muted-foreground" },
            ].map((l) => (
              <span key={l.label} className={`inline-flex items-center gap-1.5 ${l.c}`}>
                <l.icon className="size-3"/>{l.label}
              </span>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Viral Psychology Report</div>
          <h2 className="text-lg font-semibold mt-1">Manipulation index</h2>
          <div className="mt-4 space-y-3">
            {psychology.map((p) => (
              <ScoreBar key={p.label} {...p} accent="holo"/>
            ))}
          </div>
          <div className="mt-5 glass rounded-xl p-3 text-xs text-muted-foreground">
            <span className="text-cyan-300 font-medium">Insight:</span> your reel triggers an unresolved curiosity loop at 0:06 and pays it off at 0:22 — that gap is the engine of your replay rate.
          </div>
        </div>
      </div>
    </AppShell>
  );
}
