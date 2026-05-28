import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { UploadCloud, File as FileIcon, X, Check, Loader2, Sparkles, Film, Music } from "lucide-react";
import { AppShell } from "../components/app-shell";

export const Route = createFileRoute("/upload")({
  head: () => ({ meta: [{ title: "Upload — ViralReel AI" }] }),
  component: UploadPage,
});

type UploadItem = { id: string; name: string; size: number; progress: number; stage: string; done: boolean };

function fmt(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
}

function UploadPage() {
  const [drag, setDrag] = useState(false);
  const [items, setItems] = useState<UploadItem[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((files: FileList | File[]) => {
    const arr = Array.from(files).map((f) => ({
      id: Math.random().toString(36).slice(2),
      name: f.name,
      size: f.size,
      progress: 0,
      stage: "Uploading",
      done: false,
    }));
    setItems((prev) => [...arr, ...prev]);
  }, []);

  useEffect(() => {
    const timers = items
      .filter((i) => !i.done)
      .map((i) =>
        setInterval(() => {
          setItems((prev) =>
            prev.map((x) => {
              if (x.id !== i.id || x.done) return x;
              const p = Math.min(100, x.progress + Math.random() * 8 + 2);
              const stage =
                p < 40 ? "Uploading" :
                p < 65 ? "Analyzing scenes" :
                p < 85 ? "Generating captions" :
                p < 100 ? "Predicting viral score" : "Ready";
              return { ...x, progress: p, stage, done: p >= 100 };
            }),
          );
        }, 400),
      );
    return () => timers.forEach(clearInterval);
  }, [items.length]);

  return (
    <AppShell title="Upload">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2">
          <motion.label
            htmlFor="file"
            onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
            onDragLeave={() => setDrag(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDrag(false);
              if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
            }}
            animate={{ scale: drag ? 1.01 : 1 }}
            className={`relative block rounded-3xl glass-strong p-12 text-center cursor-pointer transition ${
              drag ? "ring-2 ring-cyan-400/60 glow-cyan" : "hover:bg-white/[0.06]"
            }`}
          >
            <input
              ref={inputRef}
              id="file"
              type="file"
              multiple
              accept="video/*"
              className="hidden"
              onChange={(e) => e.target.files && addFiles(e.target.files)}
            />
            <div className="ring-grid absolute inset-0 rounded-3xl opacity-30 [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]" />
            <div className="relative">
              <div className="mx-auto size-16 rounded-2xl bg-gradient-to-br from-cyan-400/30 to-fuchsia-500/30 flex items-center justify-center glow-cyan">
                <UploadCloud className="size-8" />
              </div>
              <h2 className="mt-5 text-2xl font-semibold">Drag & drop your clips</h2>
              <p className="text-sm text-muted-foreground mt-2">MP4, MOV, WEBM up to 2 GB · Bulk upload supported</p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-xl px-5 py-2.5 bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-black font-medium">
                Browse files
              </div>
            </div>
          </motion.label>

          {/* Queue */}
          <div className="mt-6 space-y-3">
            <AnimatePresence>
              {items.map((it) => (
                <motion.div
                  key={it.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="glass rounded-2xl p-4 flex items-center gap-4"
                >
                  <div className="size-10 rounded-xl glass flex items-center justify-center">
                    <FileIcon className="size-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <div className="truncate text-sm font-medium">{it.name}</div>
                      <span className="text-xs text-muted-foreground">{fmt(it.size)}</span>
                    </div>
                    <div className="mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        animate={{ width: `${it.progress}%` }}
                        transition={{ ease: "easeOut", duration: 0.4 }}
                        className="h-full bg-gradient-to-r from-cyan-400 to-fuchsia-500"
                      />
                    </div>
                    <div className="mt-1.5 flex items-center justify-between text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        {it.done ? <Check className="size-3 text-emerald-400" /> : <Loader2 className="size-3 animate-spin" />}
                        {it.stage}
                      </span>
                      <span>{Math.round(it.progress)}%</span>
                    </div>
                  </div>
                  <button onClick={() => setItems((p) => p.filter((x) => x.id !== it.id))} className="glass rounded-lg p-2 hover:bg-white/10">
                    <X className="size-4" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Side panel */}
        <div className="space-y-4">
          <div className="glass rounded-2xl p-6">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Auto-enhance</div>
            <h3 className="text-lg font-semibold mt-1">Pipeline</h3>
            <ul className="mt-4 space-y-3 text-sm">
              {[
                { icon: Film, label: "Smart scene detection", on: true },
                { icon: Sparkles, label: "Auto captions (multi-lang)", on: true },
                { icon: Music, label: "Beat-sync to trending audio", on: true },
                { icon: Sparkles, label: "Predict viral score", on: true },
              ].map((p) => (
                <li key={p.label} className="flex items-center gap-3">
                  <div className="size-8 rounded-lg glass flex items-center justify-center"><p.icon className="size-4"/></div>
                  <span className="flex-1">{p.label}</span>
                  <span className={`relative inline-flex h-5 w-9 rounded-full ${p.on ? "bg-gradient-to-r from-cyan-400 to-fuchsia-500" : "bg-white/10"}`}>
                    <span className={`absolute top-0.5 size-4 rounded-full bg-white transition-all ${p.on ? "left-4" : "left-0.5"}`}/>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass rounded-2xl p-6">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Pro tip</div>
            <p className="mt-2 text-sm text-muted-foreground">Reels with strong first-frame motion score 31% higher on the Viral index. Upload landscape source — we'll reframe per platform.</p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
