import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Play, Sparkles, Wand2, Flame, BarChart3, Upload, ArrowRight, Check, Star,
} from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ViralReel AI — Make reels that go viral" },
      { name: "description", content: "AI-powered short-form video studio with viral score prediction, trend discovery, and one-click cinematic edits." },
    ],
  }),
  component: Landing,
});

const features = [
  { icon: Wand2, title: "AI Reel Editor", desc: "Auto-cut, captions, beat-sync — cinematic edits in seconds." },
  { icon: Flame, title: "Trend Discovery", desc: "Surf sounds and formats before they peak with real-time signals." },
  { icon: BarChart3, title: "Viral Score™", desc: "Predict performance before you publish, powered by a model trained on 40M reels." },
  { icon: Sparkles, title: "Smart Recommendations", desc: "Per-platform hooks, hashtags, and timing tuned to your audience." },
];

function Landing() {
  return (
    <div className="min-h-screen">
      {/* Nav */}
      <header className="sticky top-0 z-30 glass-strong border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="size-8 rounded-lg bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-violet-500 glow-cyan flex items-center justify-center">
              <Wand2 className="size-4 text-black" />
            </div>
            <span className="font-semibold">ViralReel <span className="text-muted-foreground">AI</span></span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground ml-6">
            <a href="#features" className="hover:text-white">Features</a>
            <Link to="/trends" className="hover:text-white">Trends</Link>
            <Link to="/analytics" className="hover:text-white">Analytics</Link>
            <Link to="/pricing" className="hover:text-white">Pricing</Link>
          </nav>
          <div className="ml-auto flex items-center gap-2">
            <Link to="/dashboard" className="hidden sm:inline-flex text-sm text-muted-foreground hover:text-white px-3 py-2">Sign in</Link>
            <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-sm rounded-xl px-4 py-2 bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-black font-medium glow-cyan hover:opacity-90">
              Launch Studio <ArrowRight className="size-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 ring-grid opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
        <div className="max-w-7xl mx-auto px-6 pt-20 pb-28 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 glass rounded-full px-3 py-1 text-xs text-muted-foreground">
              <span className="size-1.5 rounded-full bg-cyan-400 animate-pulse" />
              New: Viral Score 2.0 — 38% more accurate
            </div>
            <h1 className="mt-6 text-5xl md:text-7xl font-semibold tracking-tight leading-[1.05]">
              Turn raw clips into
              <br />
              <span className="text-gradient">scroll-stopping reels.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl">
              ViralReel AI edits, captions, and predicts the virality of your short videos — so you ship what works, not what hopes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/upload" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-black font-medium glow-magenta hover:opacity-90">
                <Upload className="size-4" /> Upload your first clip
              </Link>
              <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 glass hover:bg-white/10">
                <Play className="size-4" /> Watch 60s demo
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex -space-x-2">
                {[0,1,2,3].map(i => (
                  <div key={i} className="size-7 rounded-full ring-2 ring-background bg-gradient-to-br from-cyan-400 to-fuchsia-500" />
                ))}
              </div>
              <div className="flex items-center gap-1 text-amber-300">
                {[0,1,2,3,4].map(i => <Star key={i} className="size-3 fill-current" />)}
              </div>
              <span>Loved by 42,000+ creators</span>
            </div>
          </motion.div>

          {/* Hero mock */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-16 relative"
          >
            <div className="glass-strong rounded-3xl p-3 max-w-5xl mx-auto glow-cyan">
              <div className="rounded-2xl bg-background/60 ring-1 ring-white/10 aspect-[16/9] overflow-hidden relative ring-grid">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-fuchsia-500/10" />
                <div className="absolute top-4 left-4 right-4 flex items-center gap-2 text-xs">
                  <span className="size-2.5 rounded-full bg-rose-400/80" />
                  <span className="size-2.5 rounded-full bg-amber-300/80" />
                  <span className="size-2.5 rounded-full bg-emerald-400/80" />
                  <span className="ml-3 text-muted-foreground">studio.viralreel.ai/editor/blue-wave-04</span>
                </div>
                <div className="absolute inset-x-8 bottom-6 grid grid-cols-3 gap-3">
                  {[
                    { label: "Viral Score", value: "92" },
                    { label: "Retention 7s", value: "78%" },
                    { label: "Predicted Views", value: "1.4M" },
                  ].map((s) => (
                    <div key={s.label} className="glass rounded-xl p-3">
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.label}</div>
                      <div className="text-xl font-semibold text-gradient">{s.value}</div>
                    </div>
                  ))}
                </div>
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-16 rounded-full bg-white/10 backdrop-blur flex items-center justify-center ring-1 ring-white/20">
                  <Play className="size-6 fill-white" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24">
        <div className="max-w-2xl">
          <div className="text-xs uppercase tracking-[0.2em] text-cyan-300">Built for creators</div>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight">A cinematic studio in your pocket</h2>
        </div>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="glass rounded-2xl p-6 hover:bg-white/[0.07] transition"
            >
              <div className="size-10 rounded-xl bg-gradient-to-br from-cyan-400/30 to-fuchsia-500/30 flex items-center justify-center">
                <f.icon className="size-5" />
              </div>
              <div className="mt-4 font-semibold">{f.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="glass-strong rounded-3xl p-10 md:p-14 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-fuchsia-500/10" />
          <div className="relative grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-3xl md:text-4xl font-semibold tracking-tight">Ship a viral reel tonight.</h3>
              <p className="mt-3 text-muted-foreground">Start free. Render up to 10 reels with watermark-free exports.</p>
              <ul className="mt-5 space-y-2 text-sm">
                {["No credit card required", "Cancel anytime", "1080p exports on every plan"].map(t => (
                  <li key={t} className="flex items-center gap-2"><Check className="size-4 text-cyan-300" /> {t}</li>
                ))}
              </ul>
            </div>
            <div className="flex md:justify-end gap-3">
              <Link to="/dashboard" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-black font-medium hover:opacity-90">
                Open Studio <ArrowRight className="size-4" />
              </Link>
              <Link to="/pricing" className="inline-flex items-center gap-2 rounded-xl px-5 py-3 glass hover:bg-white/10">See pricing</Link>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/5 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© 2026 ViralReel AI. All rights reserved.</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Terms</a>
            <a href="#" className="hover:text-white">Status</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
