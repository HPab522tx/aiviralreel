import { createFileRoute } from "@tanstack/react-router";
import { ShieldAlert, AlertTriangle, CheckCircle2 } from "lucide-react";
import { AppShell } from "../components/app-shell";
import { HoloCard } from "../components/holo-card";
import { RiskGauge } from "../components/risk-gauge";
import { ScoreBar } from "../components/score-bar";

export const Route = createFileRoute("/shadowban")({
  head: () => ({ meta: [{ title: "Shadowban Radar — ViralReel AI" }] }),
  component: Shadowban,
});

const flagged = [
  { tone: "warn", label: "Caption uses 'click the link in bio'", fix: "Rephrase to 'profile up top'", impact: "−18% reach risk" },
  { tone: "danger", label: "Background audio matches copyrighted track (84%)", fix: "Swap to trending royalty-free sound", impact: "Strike risk" },
  { tone: "warn", label: "5 hashtags overlap with throttled list", fix: "Replace 2 with niche tags", impact: "−9% impressions" },
  { tone: "ok", label: "Aspect ratio & duration look great", fix: "—", impact: "Boost eligible" },
];

function Shadowban() {
  return (
    <AppShell title="Shadowban Risk Detector">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <HoloCard className="p-6 flex flex-col items-center text-center">
          <div className="text-xs uppercase tracking-[0.2em] text-cyan-300 self-start">Overall risk</div>
          <div className="mt-4"><RiskGauge value={24} label="Low risk"/></div>
          <div className="mt-2 text-sm text-muted-foreground">Safe to publish · minor fixes recommended</div>
        </HoloCard>

        <div className="xl:col-span-2 glass rounded-2xl p-6">
          <div className="flex items-center gap-2">
            <ShieldAlert className="size-4 text-cyan-300"/>
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Risk breakdown</div>
              <h2 className="text-lg font-semibold">Algorithm signals</h2>
            </div>
          </div>
          <div className="mt-4 grid sm:grid-cols-2 gap-4">
            <ScoreBar label="Low reach risk" value={22} accent="cyan"/>
            <ScoreBar label="Spam probability" value={14} accent="cyan"/>
            <ScoreBar label="Copyright risk" value={62} accent="magenta"/>
            <ScoreBar label="Algorithm suppression" value={28} accent="violet"/>
          </div>
          <div className="mt-5 glass rounded-xl p-3 text-xs text-muted-foreground">
            <span className="text-cyan-300 font-medium">Why this matters:</span> reels flagged above 60% on any signal see a 38% drop in initial distribution within the first hour.
          </div>
        </div>
      </div>

      <div className="mt-6 glass rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Flagged elements</div>
            <h2 className="text-lg font-semibold mt-1">{flagged.length} signals reviewed</h2>
          </div>
          <button className="text-xs rounded-lg px-3 py-1.5 bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-black font-medium">Auto-fix all</button>
        </div>
        <div className="mt-4 space-y-2">
          {flagged.map((f) => {
            const Icon = f.tone === "ok" ? CheckCircle2 : f.tone === "danger" ? ShieldAlert : AlertTriangle;
            const color = f.tone === "ok" ? "text-emerald-400 ring-emerald-400/30"
              : f.tone === "danger" ? "text-rose-400 ring-rose-400/40"
              : "text-amber-300 ring-amber-300/30";
            return (
              <div key={f.label} className={`glass rounded-xl p-4 flex items-start gap-3 ring-1 ${color.split(" ")[1]}`}>
                <Icon className={`size-5 ${color.split(" ")[0]} mt-0.5`}/>
                <div className="flex-1">
                  <div className="text-sm font-medium">{f.label}</div>
                  {f.fix !== "—" && <div className="text-xs text-muted-foreground mt-1">Fix: {f.fix}</div>}
                </div>
                <div className={`text-xs ${color.split(" ")[0]} font-semibold whitespace-nowrap`}>{f.impact}</div>
              </div>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
