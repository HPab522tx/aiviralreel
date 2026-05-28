import { createFileRoute } from "@tanstack/react-router";
import { GitBranch, Sparkles } from "lucide-react";
import { AppShell } from "../components/app-shell";
import { VersionDiffCard } from "../components/version-diff-card";

export const Route = createFileRoute("/evolution")({
  head: () => ({ meta: [{ title: "Reel Evolution — ViralReel AI" }] }),
  component: Evolution,
});

const curve = (drop: number) => Array.from({ length: 30 }, (_, i) => Math.max(20, 100 - i * drop - Math.sin(i / 3) * 4));

const versions = [
  {
    version: "Version 1 · Original",
    retention: 54, viralScore: 68, curve: curve(2.4),
    diffs: ["Slow hook", "Captions small", "No beat-sync"],
  },
  {
    version: "Version 2 · AI tuned",
    retention: 71, viralScore: 81, curve: curve(1.7),
    diffs: ["+12% hook strength", "Captions enlarged 1.4×", "Beat-sync added at 0:08"],
  },
  {
    version: "Version 3 · Evolved",
    retention: 86, viralScore: 92, curve: curve(1.0),
    diffs: ["First-frame face close-up", "Loop seam at 0:23 → 0:00", "Retention curve flattened"],
    active: true,
  },
];

function Evolution() {
  return (
    <AppShell title="Reel Evolution System">
      <div className="glass-strong rounded-3xl p-6 relative overflow-hidden">
        <div className="absolute -top-20 -right-10 size-72 rounded-full bg-cyan-400/20 blur-3xl"/>
        <div className="relative flex flex-wrap items-center gap-4">
          <div className="glass rounded-2xl p-3"><GitBranch className="size-5 text-cyan-300"/></div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-cyan-300">AI Reel Evolution</div>
            <h2 className="text-2xl font-semibold">Your reel <span className="text-holo">gets smarter</span> every cycle.</h2>
            <p className="text-sm text-muted-foreground mt-1 max-w-xl">We A/B the original against AI-tuned variants and keep the version that wins on retention and shares.</p>
          </div>
          <label className="ml-auto inline-flex items-center gap-2 text-xs glass rounded-xl px-3 py-2 cursor-pointer">
            <span className="text-muted-foreground">Auto-evolve weekly</span>
            <span className="relative inline-flex h-4 w-7 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500">
              <span className="absolute top-0.5 left-3.5 size-3 rounded-full bg-white"/>
            </span>
          </label>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <VersionDiffCard v={versions[0]} accent="bg-rose-500/30"/>
        <VersionDiffCard v={versions[1]} accent="bg-fuchsia-500/30"/>
        <VersionDiffCard v={versions[2]} accent="bg-cyan-400/30"/>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-cyan-300"/>
            <h3 className="font-semibold">Next evolution plan</h3>
          </div>
          <ul className="mt-3 space-y-2 text-sm">
            {[
              "Try mirror-cut hook at 0:00 (predicted +6% retention)",
              "Increase caption density on scenes 4–6",
              "Introduce a curiosity gap at 0:14 (cliffhanger)",
              "Replace outro with a loop seam",
            ].map((s) => (
              <li key={s} className="glass rounded-xl p-3">{s}</li>
            ))}
          </ul>
        </div>
        <div className="glass rounded-2xl p-6">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Lineage</div>
          <h3 className="font-semibold mt-1">Retention over generations</h3>
          <div className="mt-4 flex items-end gap-3 h-40">
            {[54, 71, 86, 91].map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="text-xs text-muted-foreground tabular-nums">{v}%</div>
                <div className="w-full rounded-t-md bg-gradient-to-t from-cyan-400 to-fuchsia-500" style={{ height: `${v}%` }}/>
                <div className="text-[10px] text-muted-foreground">v{i + 1}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
