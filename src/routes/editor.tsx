import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Play, Pause, Scissors, Type, Music, Sparkles, Wand2, Image as ImageIcon,
  SkipBack, SkipForward, Volume2, Layers, Cpu,
} from "lucide-react";
import { AppShell } from "../components/app-shell";

export const Route = createFileRoute("/editor")({
  head: () => ({ meta: [{ title: "Reel Editor — ViralReel AI" }] }),
  component: EditorPage,
});

function EditorPage() {
  const [playing, setPlaying] = useState(true);
  const [render, setRender] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setRender((r) => (r >= 100 ? 0 : r + 2)), 300);
    return () => clearInterval(t);
  }, []);

  const tools = [
    { icon: Scissors, label: "Trim" },
    { icon: Type, label: "Captions" },
    { icon: Music, label: "Audio" },
    { icon: Sparkles, label: "Effects" },
    { icon: ImageIcon, label: "B-roll" },
    { icon: Layers, label: "Layers" },
  ];

  return (
    <AppShell title="Reel Editor · Neon city night ride">
      <div className="grid grid-cols-1 xl:grid-cols-[80px_1fr_320px] gap-4">
        {/* Tool rail */}
        <div className="glass rounded-2xl p-2 flex xl:flex-col gap-2 justify-center xl:justify-start xl:py-4">
          {tools.map((t) => (
            <button key={t.label} className="group flex flex-col items-center gap-1 rounded-xl p-3 hover:bg-white/10 transition">
              <t.icon className="size-5" />
              <span className="text-[10px] text-muted-foreground group-hover:text-white">{t.label}</span>
            </button>
          ))}
        </div>

        {/* Preview + timeline */}
        <div className="space-y-4">
          <div className="glass-strong rounded-2xl p-3">
            <div className="aspect-video rounded-xl overflow-hidden relative bg-black ring-1 ring-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/30 via-fuchsia-500/20 to-violet-500/30" />
              <div className="absolute inset-0 ring-grid opacity-30" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="text-[10px] uppercase tracking-[0.2em] text-white/70">Scene 02 · 00:04</div>
                <div className="text-2xl font-semibold drop-shadow-lg">"You won't believe what happens next…"</div>
              </div>
              <button
                onClick={() => setPlaying((p) => !p)}
                className="absolute inset-0 m-auto size-16 rounded-full bg-white/15 backdrop-blur-md ring-1 ring-white/20 flex items-center justify-center hover:bg-white/25"
              >
                {playing ? <Pause className="size-6"/> : <Play className="size-6 fill-white"/>}
              </button>
            </div>

            {/* Transport */}
            <div className="mt-3 flex items-center gap-3 px-2">
              <button className="glass rounded-lg p-2"><SkipBack className="size-4"/></button>
              <button onClick={()=>setPlaying(p=>!p)} className="rounded-lg p-2 bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-black">
                {playing ? <Pause className="size-4"/> : <Play className="size-4 fill-current"/>}
              </button>
              <button className="glass rounded-lg p-2"><SkipForward className="size-4"/></button>
              <div className="text-xs text-muted-foreground">00:07 / 00:24</div>
              <div className="ml-auto flex items-center gap-2 text-muted-foreground">
                <Volume2 className="size-4"/>
                <div className="h-1 w-24 rounded-full bg-white/10 overflow-hidden"><div className="h-full w-3/4 bg-white/60"/></div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="glass rounded-2xl p-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-3">Timeline</div>
            {[
              { name: "Video", color: "from-cyan-400/40 to-cyan-400/10", clips: [20, 25, 35, 20] },
              { name: "Captions", color: "from-fuchsia-500/40 to-fuchsia-500/10", clips: [15, 30, 25, 30] },
              { name: "Audio", color: "from-violet-500/40 to-violet-500/10", clips: [100] },
            ].map((track) => (
              <div key={track.name} className="flex items-center gap-3 mb-2">
                <div className="w-16 text-xs text-muted-foreground">{track.name}</div>
                <div className="flex-1 flex gap-1 h-10">
                  {track.clips.map((w, i) => (
                    <div key={i} style={{ width: `${w}%` }} className={`rounded-md bg-gradient-to-r ${track.color} ring-1 ring-white/10 relative overflow-hidden`}>
                      <div className="absolute inset-0 flex items-center px-2 text-[10px] text-white/80">clip {i+1}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="relative h-2 mt-3 rounded-full bg-white/5">
              <motion.div animate={{ left: `${(render*0.6)+20}%` }} className="absolute -top-1 w-0.5 h-4 bg-cyan-300"/>
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="space-y-4">
          {/* Realtime render */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Realtime render</div>
                <h3 className="text-base font-semibold mt-0.5">4K · H.265</h3>
              </div>
              <div className="glass rounded-lg p-2"><Cpu className="size-4 text-cyan-300"/></div>
            </div>
            <div className="mt-4 h-2 rounded-full bg-white/5 overflow-hidden">
              <motion.div animate={{ width: `${render}%` }} transition={{ ease: "linear", duration: 0.3 }} className="h-full bg-gradient-to-r from-cyan-400 to-fuchsia-500"/>
            </div>
            <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>Compositing scene {Math.max(1, Math.ceil(render / 14))}/8</span>
              <span>{render}%</span>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center">
              <div className="glass rounded-xl p-2"><div className="text-[10px] text-muted-foreground">ETA</div><div className="text-sm font-semibold">00:42</div></div>
              <div className="glass rounded-xl p-2"><div className="text-[10px] text-muted-foreground">GPU</div><div className="text-sm font-semibold">A100</div></div>
              <div className="glass rounded-xl p-2"><div className="text-[10px] text-muted-foreground">FPS</div><div className="text-sm font-semibold">240</div></div>
            </div>
          </div>

          {/* AI suggestions */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center gap-2">
              <Wand2 className="size-4 text-cyan-300"/>
              <h3 className="font-semibold">AI Suggestions</h3>
            </div>
            <div className="mt-3 space-y-2">
              {[
                "Shorten intro by 0.8s for stronger hook",
                "Swap to vertical safe-zone captions",
                "Add a beat-drop cut at 00:11",
                "Boost saturation +12 on scene 3",
              ].map((s) => (
                <motion.button whileHover={{ x: 4 }} key={s} className="w-full text-left text-sm glass rounded-xl px-3 py-2 hover:bg-white/10">
                  {s}
                </motion.button>
              ))}
            </div>
          </div>

          <button className="w-full rounded-xl px-4 py-3 bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-black font-medium glow-magenta hover:opacity-90">
            Export & schedule
          </button>
        </div>
      </div>
    </AppShell>
  );
}
