import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Film, Sparkles, Wand2, Loader2, Play, Hash, Flame, Calendar } from "lucide-react";
import { AppShell } from "../components/app-shell";
import { HoloCard } from "../components/holo-card";

export const Route = createFileRoute("/factory")({
  head: () => ({ meta: [{ title: "Multi-Reel Factory — ViralReel AI" }] }),
  component: Factory,
});

const palette = [
  "from-cyan-400/60 to-fuchsia-500/60",
  "from-fuchsia-500/60 to-rose-500/60",
  "from-violet-500/60 to-cyan-400/60",
  "from-amber-400/60 to-rose-500/60",
  "from-emerald-400/60 to-cyan-400/60",
];
const hooks = [
  "POV: you just discovered…", "3 things nobody tells you…", "Wait for it… 🤯",
  "The truth about…", "I tried this for 30 days", "Why everyone is wrong about…",
  "This changed everything", "Stop scrolling. Watch this.", "Hidden trick most miss",
  "Don't make this mistake", "The 10s rule that…", "She didn't expect…",
];
const hashSets = [
  ["#fyp","#viral","#cinematic"], ["#aiart","#creator","#trend"],
  ["#nightdrive","#lofi","#urban"], ["#bts","#studio","#reel"],
];

const reels = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  hook: hooks[i % hooks.length],
  caption: ["short", "medium length", "longer style with emoji ✨"][i % 3],
  color: palette[i % palette.length],
  score: 64 + ((i * 7) % 32),
  hashtags: hashSets[i % hashSets.length],
}));

function Factory() {
  const [generating, setGenerating] = useState(false);
  return (
    <AppShell title="Multi-Reel Factory">
      <HoloCard className="p-8 relative overflow-hidden">
        <div className="absolute -top-20 -right-10 size-80 rounded-full bg-cyan-400/20 blur-3xl"/>
        <div className="absolute -bottom-20 -left-10 size-80 rounded-full bg-fuchsia-500/20 blur-3xl"/>
        <div className="relative grid lg:grid-cols-2 gap-6 items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-cyan-300">AI Multi-Reel Factory</div>
            <h2 className="mt-2 text-3xl font-semibold">Upload one long video. <span className="text-holo">Get 20 reels.</span></h2>
            <p className="text-sm text-muted-foreground mt-3 max-w-md">AI slices the highlights, writes 20 hooks, paints 20 thumbnails, drafts 20 captions and tags everything for you.</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={() => { setGenerating(true); setTimeout(() => setGenerating(false), 1800); }}
                className="inline-flex items-center gap-2 rounded-xl px-5 py-3 bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-black font-medium glow-magenta hover:opacity-90"
              >
                {generating ? <Loader2 className="size-4 animate-spin"/> : <Wand2 className="size-4"/>}
                {generating ? "Slicing reels…" : "Generate 20 reels"}
              </button>
              <button className="glass rounded-xl px-4 py-3 text-sm hover:bg-white/10 inline-flex items-center gap-2">
                <Film className="size-4"/>Upload source video
              </button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {[1,2,3,4,5,6].map((i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.15 }}
                className={`aspect-[9/12] rounded-xl bg-gradient-to-br ${palette[i % palette.length]} ring-1 ring-white/10`}
              />
            ))}
          </div>
        </div>
      </HoloCard>

      <div className="mt-6 flex items-center gap-3 text-xs">
        <span className="glass rounded-full px-3 py-1.5">20 reels · 20 hooks · 20 thumbnails · 20 captions</span>
        <button className="ml-auto glass rounded-lg px-3 py-1.5 hover:bg-white/10 inline-flex items-center gap-1.5"><Sparkles className="size-3"/>Regenerate all</button>
        <button className="glass rounded-lg px-3 py-1.5 hover:bg-white/10 inline-flex items-center gap-1.5"><Calendar className="size-3"/>Schedule all</button>
      </div>

      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {reels.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.02 }}
            whileHover={{ y: -4 }}
            className="glass rounded-xl overflow-hidden"
          >
            <div className={`aspect-[9/12] bg-gradient-to-br ${r.color} relative`}>
              <Play className="absolute inset-0 m-auto size-9 opacity-90"/>
              <div className="absolute top-2 left-2 glass rounded-full px-1.5 py-0.5 text-[10px]">#{r.id}</div>
              <div className="absolute top-2 right-2 glass rounded-full px-1.5 py-0.5 text-[10px] flex items-center gap-1">
                <Flame className="size-3 text-orange-300"/>{r.score}
              </div>
            </div>
            <div className="p-2.5 space-y-1.5">
              <div className="text-xs font-medium truncate">{r.hook}</div>
              <div className="flex flex-wrap gap-1">
                {r.hashtags.map((h) => (
                  <span key={h} className="text-[9px] glass rounded px-1 py-0.5 inline-flex items-center gap-0.5">
                    <Hash className="size-2.5 text-cyan-300"/>{h.replace("#","")}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </AppShell>
  );
}
