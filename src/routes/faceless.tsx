import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Bot, Mic, FileText, Film, Type, ImageIcon, Calendar, Sparkles } from "lucide-react";
import { AppShell } from "../components/app-shell";
import { HoloCard } from "../components/holo-card";
import { Stepper } from "../components/stepper";

export const Route = createFileRoute("/faceless")({
  head: () => ({ meta: [{ title: "Faceless Empire — ViralReel AI" }] }),
  component: Faceless,
});

const niches = ["Finance tips", "History facts", "Sci-fi lore", "Gaming clips", "Motivation", "Productivity"];
const voices = ["Cinematic deep", "Conversational US", "British calm", "Energetic hype"];

const pipeline = [
  { label: "Script" }, { label: "Voice" }, { label: "B-roll" },
  { label: "Captions" }, { label: "Thumbnail" }, { label: "Schedule" },
];

const queue = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  title: ["The rise of Roman roads", "5 stocks Buffett quietly loves", "AI in 2031: predictions", "Mars colony lore"][i % 4],
  stage: (i % 6),
  eta: `${4 + i}m`,
}));

function Faceless() {
  const [niche, setNiche] = useState(niches[0]);
  const [voice, setVoice] = useState(voices[0]);
  const waveform = Array.from({ length: 60 }, (_, i) => 0.3 + Math.abs(Math.sin(i * 0.4)) * 0.7);

  return (
    <AppShell title="Auto Faceless Empire">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <HoloCard className="xl:col-span-2 p-6 relative overflow-hidden">
          <div className="absolute -top-20 -right-10 size-72 rounded-full bg-violet-500/20 blur-3xl"/>
          <div className="relative">
            <div className="flex items-center gap-2">
              <Bot className="size-5 text-cyan-300"/>
              <div>
                <div className="text-xs uppercase tracking-[0.2em] text-cyan-300">One-click faceless</div>
                <h2 className="text-2xl font-semibold">Build a faceless channel <span className="text-holo">on autopilot</span></h2>
              </div>
            </div>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Niche</div>
                <div className="flex flex-wrap gap-2">
                  {niches.map((n) => (
                    <button key={n} onClick={() => setNiche(n)}
                      className={`text-xs rounded-full px-3 py-1.5 transition ${niche === n ? "bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-black font-medium" : "glass hover:bg-white/10"}`}>
                      {n}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">AI voice</div>
                <div className="flex flex-wrap gap-2">
                  {voices.map((v) => (
                    <button key={v} onClick={() => setVoice(v)}
                      className={`text-xs rounded-full px-3 py-1.5 transition inline-flex items-center gap-1.5 ${voice === v ? "ring-1 ring-cyan-400/60 text-cyan-200 bg-cyan-400/10" : "glass hover:bg-white/10"}`}>
                      <Mic className="size-3"/>{v}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-5 glass rounded-xl p-4">
              <div className="text-xs text-muted-foreground mb-2">Voice preview · {voice}</div>
              <div className="flex items-center gap-px h-12">
                {waveform.map((h, i) => (
                  <motion.div key={i}
                    animate={{ height: [`${h * 50}%`, `${h * 100}%`, `${h * 50}%`] }}
                    transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.02 }}
                    className="flex-1 bg-gradient-to-t from-cyan-400 to-fuchsia-500 rounded-sm" style={{ minHeight: 2 }}
                  />
                ))}
              </div>
            </div>

            <div className="mt-5 space-y-2">
              {[
                { icon: FileText, label: "AI scripts (long & short)" },
                { icon: Film, label: "Gameplay & stock footage" },
                { icon: Type, label: "Auto captions (multi-lang)" },
                { icon: ImageIcon, label: "Thumbnail generation" },
                { icon: Calendar, label: "Auto-schedule across platforms" },
              ].map((p) => (
                <div key={p.label} className="flex items-center gap-3 text-sm">
                  <div className="size-8 rounded-lg glass flex items-center justify-center"><p.icon className="size-4"/></div>
                  <span className="flex-1">{p.label}</span>
                  <span className="relative inline-flex h-5 w-9 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500">
                    <span className="absolute top-0.5 left-4 size-4 rounded-full bg-white"/>
                  </span>
                </div>
              ))}
            </div>

            <button className="mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-3 bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-black font-medium glow-magenta hover:opacity-90">
              <Sparkles className="size-4"/>Spin up empire
            </button>
          </div>
        </HoloCard>

        <div className="glass rounded-2xl p-6">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Production queue</div>
          <h2 className="text-lg font-semibold mt-1">8 reels in flight</h2>
          <div className="mt-4 space-y-3">
            {queue.map((q) => (
              <div key={q.id} className="glass rounded-xl p-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium truncate">{q.title}</div>
                  <span className="text-[10px] text-muted-foreground">ETA {q.eta}</span>
                </div>
                <div className="mt-3"><Stepper steps={pipeline} current={q.stage}/></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
