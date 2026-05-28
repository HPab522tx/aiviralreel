import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Flame, TrendingUp, Music, Hash, Sparkles, Eye } from "lucide-react";
import { AppShell } from "../components/app-shell";

export const Route = createFileRoute("/trends")({
  head: () => ({ meta: [{ title: "Trend Discovery — ViralReel AI" }] }),
  component: Trends,
});

const sounds = [
  { name: "Midnight Drive", artist: "Lo-fi Tape", trend: 312, uses: "184K", peak: "in 4 days", color: "from-cyan-400/40 to-violet-500/40" },
  { name: "Tokyo Pulse", artist: "Nova Synth", trend: 188, uses: "92K", peak: "in 7 days", color: "from-fuchsia-500/40 to-rose-500/40" },
  { name: "Slowburn", artist: "ATLS", trend: 142, uses: "61K", peak: "in 9 days", color: "from-amber-400/40 to-fuchsia-500/40" },
  { name: "Glasshouse", artist: "Yume", trend: 96, uses: "44K", peak: "in 12 days", color: "from-emerald-400/40 to-cyan-400/40" },
];

const formats = [
  { title: "POV: you wake up in 2099", score: 94, niche: "Sci-fi" },
  { title: "Get ready with me · 30s edit", score: 88, niche: "Lifestyle" },
  { title: "3 things nobody tells you about…", score: 82, niche: "Education" },
  { title: "Before / after transformation", score: 79, niche: "Fitness" },
];

const hashtags = ["#fyp", "#aiart", "#cinematic", "#nightdrive", "#bts", "#creatortok", "#viral2026", "#lofi", "#urbanlife"];

function Trends() {
  return (
    <AppShell title="Trend Discovery">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 space-y-4">
          {/* Trending sounds */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2">
              <Music className="size-4 text-cyan-300"/>
              <h2 className="font-semibold">Trending sounds</h2>
              <span className="ml-auto text-xs text-muted-foreground">Updated 2m ago</span>
            </div>
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              {sounds.map((s) => (
                <motion.div whileHover={{ y: -3 }} key={s.name} className="glass rounded-2xl p-4 flex items-center gap-4">
                  <div className={`size-14 rounded-xl bg-gradient-to-br ${s.color} flex items-center justify-center`}>
                    <Music className="size-5"/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium truncate">{s.name}</div>
                    <div className="text-xs text-muted-foreground">{s.artist} · {s.uses} uses</div>
                    <div className="mt-1 inline-flex items-center gap-1 text-xs text-emerald-400">
                      <TrendingUp className="size-3"/> +{s.trend}% · peaks {s.peak}
                    </div>
                  </div>
                  <button className="text-xs glass rounded-lg px-3 py-1.5 hover:bg-white/10">Use</button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Trending formats */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-fuchsia-300"/>
              <h2 className="font-semibold">Format templates</h2>
            </div>
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              {formats.map((f) => (
                <motion.div whileHover={{ y: -3 }} key={f.title} className="glass rounded-2xl p-4">
                  <div className="aspect-video rounded-xl bg-gradient-to-br from-fuchsia-500/20 via-violet-500/20 to-cyan-400/20 ring-1 ring-white/10 mb-3 flex items-center justify-center">
                    <Eye className="size-6 text-white/70"/>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="font-medium text-sm flex-1">{f.title}</div>
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5">{f.niche}</span>
                  </div>
                  <div className="mt-2 flex items-center gap-2 text-xs">
                    <Flame className="size-3 text-orange-300"/>
                    <span>Viral score {f.score}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Side */}
        <div className="space-y-4">
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2"><Hash className="size-4 text-cyan-300"/><h2 className="font-semibold">Hashtags rising</h2></div>
            <div className="mt-4 flex flex-wrap gap-2">
              {hashtags.map((h, i) => (
                <span key={h} className={`glass rounded-full px-3 py-1.5 text-xs ${i<3 ? "ring-1 ring-cyan-400/30 text-cyan-200" : ""}`}>{h}</span>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 size-32 rounded-full bg-fuchsia-500/30 blur-3xl"/>
            <div className="relative">
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Niche pulse</div>
              <h2 className="text-2xl font-semibold mt-1">Creator-tech</h2>
              <p className="text-sm text-muted-foreground mt-2">Your niche is up <span className="text-emerald-400">+24%</span> this week. Best posting window is <span className="text-cyan-300">Thu 7–9pm</span>.</p>
              <div className="mt-4 grid grid-cols-3 gap-2 text-center">
                <div className="glass rounded-xl p-2"><div className="text-[10px] text-muted-foreground">Velocity</div><div className="font-semibold">High</div></div>
                <div className="glass rounded-xl p-2"><div className="text-[10px] text-muted-foreground">Saturation</div><div className="font-semibold">Low</div></div>
                <div className="glass rounded-xl p-2"><div className="text-[10px] text-muted-foreground">Window</div><div className="font-semibold">6d</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
