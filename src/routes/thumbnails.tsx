import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Eye, Smile, Sparkles, MousePointerClick } from "lucide-react";
import { AppShell } from "../components/app-shell";
import { ScoreBar } from "../components/score-bar";

export const Route = createFileRoute("/thumbnails")({
  head: () => ({ meta: [{ title: "Thumbnail Lab — ViralReel AI" }] }),
  component: Thumbnails,
});

const thumbs = [
  { name: "Wide-eyed shock", color: "from-cyan-400/60 to-fuchsia-500/60", eye: 94, emotion: "Shock", curiosity: 88, ctr: 14.2 },
  { name: "Subtle smirk", color: "from-fuchsia-500/60 to-rose-500/60", eye: 76, emotion: "Smug", curiosity: 71, ctr: 9.8 },
  { name: "Direct stare", color: "from-violet-500/60 to-cyan-400/60", eye: 91, emotion: "Intense", curiosity: 84, ctr: 12.6 },
  { name: "Mouth-open hype", color: "from-amber-400/60 to-rose-500/60", eye: 88, emotion: "Hype", curiosity: 92, ctr: 13.7 },
  { name: "Confused puzzle", color: "from-emerald-400/60 to-cyan-400/60", eye: 68, emotion: "Curious", curiosity: 86, ctr: 11.1 },
  { name: "Side-eye reveal", color: "from-cyan-400/60 to-violet-500/60", eye: 82, emotion: "Skeptical", curiosity: 79, ctr: 10.4 },
];

const feels = [
  { name: "MrBeast", value: 78, color: "from-cyan-400 to-fuchsia-500" },
  { name: "Alex Hormozi", value: 42, color: "from-fuchsia-500 to-rose-500" },
  { name: "Documentary", value: 24, color: "from-violet-500 to-cyan-400" },
  { name: "TikTok meme", value: 88, color: "from-amber-400 to-rose-500" },
  { name: "Gaming creator", value: 36, color: "from-emerald-400 to-cyan-400" },
];

function Thumbnails() {
  return (
    <AppShell title="Thumbnail Lab">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 glass rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">AI Face Analyzer</div>
              <h2 className="text-lg font-semibold mt-1">6 generated variants</h2>
            </div>
            <button className="text-xs glass rounded-lg px-3 py-1.5 hover:bg-white/10">Regenerate set</button>
          </div>
          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {thumbs.map((t, i) => (
              <motion.div
                key={t.name}
                whileHover={{ y: -4 }}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-xl overflow-hidden"
              >
                <div className={`aspect-video bg-gradient-to-br ${t.color} relative`}>
                  <div className="absolute inset-0 ring-grid opacity-40"/>
                  {/* Face placeholder ring */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="size-20 rounded-full ring-2 ring-cyan-300/60 glow-cyan animate-pulse"/>
                  </div>
                  <div className="absolute top-2 left-2 glass rounded-full px-2 py-0.5 text-[10px] flex items-center gap-1">
                    <MousePointerClick className="size-3 text-cyan-300"/>CTR {t.ctr}%
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[10px] text-white/90">
                    <span className="glass rounded px-1.5 py-0.5">👁 {t.eye}%</span>
                    <span className="glass rounded px-1.5 py-0.5">{t.emotion}</span>
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="mt-2"><ScoreBar label="curiosity" value={t.curiosity} accent="holo"/></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="glass rounded-2xl p-6">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Emotional strength</div>
            <h2 className="text-lg font-semibold mt-1">Top thumbnail</h2>
            <div className="mt-4 space-y-3">
              <ScoreBar label="Eye contact" value={94} accent="cyan"/>
              <ScoreBar label="Facial emotion" value={88} accent="magenta"/>
              <ScoreBar label="Curiosity trigger" value={86} accent="violet"/>
              <ScoreBar label="Expression intensity" value={91} accent="holo"/>
            </div>
            <div className="mt-5 glass rounded-xl p-3 flex items-center gap-3">
              <Smile className="size-4 text-amber-300"/>
              <div className="text-xs"><span className="text-cyan-300 font-medium">Predicted CTR:</span> 14.2% — top 4% in your niche.</div>
            </div>
          </div>

          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2">
              <Sparkles className="size-4 text-fuchsia-300"/>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">This Reel Feels Like…</div>
                <h2 className="text-lg font-semibold">Style similarity</h2>
              </div>
            </div>
            <div className="mt-4 space-y-3">
              {feels.map((f) => (
                <div key={f.name}>
                  <div className="flex justify-between text-xs">
                    <span>{f.name}</span><span className="tabular-nums text-muted-foreground">{f.value}%</span>
                  </div>
                  <div className="h-1.5 rounded-full bg-white/5 mt-1 overflow-hidden">
                    <div style={{ width: `${f.value}%` }} className={`h-full bg-gradient-to-r ${f.color}`}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
