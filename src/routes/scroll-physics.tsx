import { createFileRoute } from "@tanstack/react-router";
import { MousePointer2, Repeat2, AlertTriangle, Sparkles } from "lucide-react";
import { AppShell } from "../components/app-shell";
import { HoloCard } from "../components/holo-card";
import { PhoneScrollSim } from "../components/phone-scroll-sim";
import { ReplayTimeline } from "../components/replay-timeline";
import { ScoreBar } from "../components/score-bar";

export const Route = createFileRoute("/scroll-physics")({
  head: () => ({ meta: [{ title: "Scroll Physics AI — ViralReel AI" }] }),
  component: ScrollPhysics,
});

const moments = Array.from({ length: 30 }, (_, i) => ({
  s: i,
  stop: Math.max(10, 60 + Math.sin(i / 3) * 30 - (i > 18 ? 30 : 0)),
  swipe: Math.min(90, 20 + Math.cos(i / 4) * 18 + (i > 18 ? 30 : 0)),
}));

const traps = [
  { time: "0:02", title: "Eye-contact opener", impact: "+18% thumb-stop", tone: "good" },
  { time: "0:11", title: "Visual overload spike", impact: "−9% retention", tone: "bad" },
  { time: "0:19", title: "Slow zoom + bass drop", impact: "+24% loop rate", tone: "good" },
  { time: "0:24", title: "Caption density drop", impact: "−12% attention", tone: "bad" },
];

function ScrollPhysics() {
  return (
    <AppShell title="Scroll Physics AI">
      <div className="grid grid-cols-1 xl:grid-cols-[280px_1fr] gap-4">
        <HoloCard className="p-6 flex flex-col items-center">
          <div className="text-xs uppercase tracking-[0.2em] text-cyan-300 self-start mb-2">Live simulation</div>
          <PhoneScrollSim/>
          <div className="mt-4 grid grid-cols-2 gap-2 w-full text-center">
            <div className="glass rounded-xl p-2">
              <div className="text-[10px] text-muted-foreground">Thumb-stop</div>
              <div className="text-lg font-semibold text-cyan-300">71%</div>
            </div>
            <div className="glass rounded-xl p-2">
              <div className="text-[10px] text-muted-foreground">Swipe-away</div>
              <div className="text-lg font-semibold text-rose-300">29%</div>
            </div>
          </div>
        </HoloCard>

        <div className="space-y-4">
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2">
              <MousePointer2 className="size-4 text-cyan-300"/>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Per-second probability</div>
                <h2 className="text-lg font-semibold">Stop vs swipe-away</h2>
              </div>
            </div>
            <div className="mt-4 flex items-end gap-px h-32">
              {moments.map((m) => (
                <div key={m.s} className="flex-1 flex flex-col-reverse">
                  <div className="bg-cyan-400/70" style={{ height: `${m.stop * 0.5}%` }}/>
                  <div className="bg-rose-400/50" style={{ height: `${m.swipe * 0.5}%` }}/>
                </div>
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[10px] text-muted-foreground"><span>0s</span><span>15s</span><span>30s</span></div>
          </div>

          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2">
              <Repeat2 className="size-4 text-fuchsia-300"/>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Viral Replay Predictor</div>
                <h2 className="text-lg font-semibold">Replay probability timeline</h2>
              </div>
            </div>
            <div className="mt-4"><ReplayTimeline/></div>
            <div className="mt-3 grid sm:grid-cols-3 gap-2 text-xs">
              <div className="glass rounded-lg p-2"><span className="text-muted-foreground">Loop potential</span> <span className="float-right text-cyan-300 font-semibold">88</span></div>
              <div className="glass rounded-lg p-2"><span className="text-muted-foreground">Addictive moments</span> <span className="float-right text-fuchsia-300 font-semibold">4</span></div>
              <div className="glass rounded-lg p-2"><span className="text-muted-foreground">Peak replay</span> <span className="float-right text-violet-300 font-semibold">0:22</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 glass rounded-2xl p-6">
          <div className="flex items-center gap-2">
            <AlertTriangle className="size-4 text-amber-300"/>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Attention traps</div>
              <h2 className="text-lg font-semibold">Where viewers tune in and out</h2>
            </div>
          </div>
          <div className="mt-4 space-y-2">
            {traps.map((t) => (
              <div key={t.time} className={`glass rounded-xl p-3 flex items-center gap-3 ring-1 ${t.tone === "good" ? "ring-cyan-400/30" : "ring-rose-400/30"}`}>
                <div className="text-xs font-mono text-muted-foreground w-12">{t.time}</div>
                <div className="flex-1 text-sm font-medium">{t.title}</div>
                <div className={`text-xs font-semibold ${t.tone === "good" ? "text-emerald-400" : "text-rose-400"}`}>{t.impact}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-cyan-300"/>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Attention Hacker AI</div>
              <h2 className="text-lg font-semibold">Optimization report</h2>
            </div>
          </div>
          <div className="mt-4 space-y-3">
            <ScoreBar label="Curiosity" value={88} accent="cyan"/>
            <ScoreBar label="Emotional hooks" value={82} accent="magenta"/>
            <ScoreBar label="Surprise frequency" value={74} accent="violet"/>
            <ScoreBar label="Dopamine pacing" value={91} accent="holo"/>
          </div>
          <button className="mt-5 w-full rounded-xl px-4 py-2.5 bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-black text-sm font-medium hover:opacity-90">
            Auto-fix attention traps
          </button>
        </div>
      </div>
    </AppShell>
  );
}
