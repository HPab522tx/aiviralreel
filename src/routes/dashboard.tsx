import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid } from "recharts";
import { Eye, Heart, PlayCircle, Users, Sparkles, ArrowUpRight, Zap, Flame, Play, Loader2, CheckCircle2, Clock } from "lucide-react";
import { AppShell } from "../components/app-shell";
import { StatCard } from "../components/stat-card";
import { ViralScore } from "../components/viral-score";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — ViralReel AI" }] }),
  component: Dashboard,
});

const retention = Array.from({ length: 30 }, (_, i) => ({
  s: i,
  a: Math.round(100 - i * 1.8 - Math.sin(i / 3) * 6),
  b: Math.round(100 - i * 2.6 - Math.cos(i / 4) * 4),
}));

const weekly = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d,i) => ({
  d, views: 30 + Math.round(Math.sin(i)*20) + i*8, likes: 10 + i*4,
}));

const reels = [
  { name: "Neon city night ride", score: 92, views: "1.4M", platform: "TikTok", thumb: "from-cyan-400/40 to-fuchsia-500/40" },
  { name: "Coffee shop POV cut", score: 78, views: "612K", platform: "Reels", thumb: "from-amber-400/40 to-rose-500/40" },
  { name: "Sunset drone reveal", score: 85, views: "904K", platform: "Shorts", thumb: "from-fuchsia-500/40 to-violet-500/40" },
  { name: "Studio gear unboxing", score: 64, views: "210K", platform: "TikTok", thumb: "from-emerald-400/40 to-cyan-400/40" },
];

const renders = [
  { name: "Sunset drone reveal · 4K", status: "rendering", progress: 72, eta: "00:38" },
  { name: "Coffee shop POV cut · 1080p", status: "queued", progress: 0, eta: "—" },
  { name: "Studio gear unboxing · 4K", status: "done", progress: 100, eta: "Ready" },
];

const sparks = {
  views: [12, 18, 14, 22, 28, 24, 32, 38, 34, 42, 48, 56],
  eng:   [8, 9, 11, 10, 12, 14, 13, 15, 14, 16, 18, 17],
  fol:   [60, 62, 64, 63, 66, 70, 72, 75, 78, 80, 82, 84],
  score: [88, 86, 87, 85, 84, 82, 83, 80, 82, 81, 82, 82],
};

function Dashboard() {
  return (
    <AppShell title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Total views" value="3.42M" delta={18} icon={Eye} accent="cyan" trend={sparks.views} />
        <StatCard label="Engagement" value="11.8%" delta={6} icon={Heart} accent="magenta" trend={sparks.eng} />
        <StatCard label="Followers" value="84.2K" delta={12} icon={Users} accent="violet" trend={sparks.fol} />
        <StatCard label="Avg. viral score" value="82" delta={-3} icon={Sparkles} accent="cyan" trend={sparks.score} />
      </div>

      {/* Top performing reel hero */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 glass-strong rounded-3xl p-6 relative overflow-hidden"
      >
        <div className="absolute -top-20 -right-10 size-72 rounded-full bg-fuchsia-500/20 blur-3xl"/>
        <div className="absolute -bottom-20 -left-10 size-72 rounded-full bg-cyan-400/20 blur-3xl"/>
        <div className="relative grid lg:grid-cols-[260px_1fr_auto] gap-6 items-center">
          <div className="aspect-[9/12] rounded-2xl bg-gradient-to-br from-cyan-400/40 to-fuchsia-500/40 ring-1 ring-white/10 relative overflow-hidden max-w-[200px]">
            <div className="absolute inset-0 ring-grid opacity-30"/>
            <PlayCircle className="absolute inset-0 m-auto size-12 opacity-90"/>
            <div className="absolute top-2 left-2 glass rounded-full px-2 py-0.5 text-[10px] inline-flex items-center gap-1"><Flame className="size-3 text-orange-300"/>Top this week</div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-cyan-300">Top performing reel</div>
            <h2 className="mt-1 text-2xl font-semibold">Neon city night ride</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-md">Outperforming your last 30 reels by 3.2×. Strong loop rate and share velocity — consider a sequel.</p>
            <div className="mt-4 grid grid-cols-3 gap-2 max-w-md">
              {[["Views","1.4M"],["Shares","98K"],["Retention","78%"]].map(([k,v]) => (
                <div key={k} className="glass rounded-xl p-2 text-center">
                  <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{k}</div>
                  <div className="text-sm font-semibold">{v}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center gap-3">
            <ViralScore score={92} size={140}/>
            <Link to="/analytics" className="inline-flex items-center gap-1.5 text-xs rounded-xl px-3 py-2 bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-black font-medium">
              See breakdown <ArrowUpRight className="size-3"/>
            </Link>
          </div>
        </div>
      </motion.div>

      <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Retention */}
        <div className="xl:col-span-2 glass rounded-2xl p-6">
          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Retention curve</div>
              <h2 className="mt-1 text-lg font-semibold">Audience drop-off across reels</h2>
            </div>
            <div className="flex gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 glass rounded-full px-2.5 py-1"><span className="size-2 rounded-full bg-cyan-400"/>This week</span>
              <span className="inline-flex items-center gap-1.5 glass rounded-full px-2.5 py-1"><span className="size-2 rounded-full bg-fuchsia-400"/>Last week</span>
            </div>
          </div>
          <div className="h-64 mt-4">
            <ResponsiveContainer>
              <AreaChart data={retention}>
                <defs>
                  <linearGradient id="ga" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.85 0.18 200)" stopOpacity={0.6}/>
                    <stop offset="100%" stopColor="oklch(0.85 0.18 200)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="gb" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.7 0.28 330)" stopOpacity={0.5}/>
                    <stop offset="100%" stopColor="oklch(0.7 0.28 330)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false}/>
                <XAxis dataKey="s" tick={{ fill: "oklch(0.7 0 0)", fontSize: 11 }} tickFormatter={(v)=>`${v}s`} />
                <YAxis tick={{ fill: "oklch(0.7 0 0)", fontSize: 11 }} unit="%" />
                <Tooltip contentStyle={{ background: "oklch(0.18 0.03 270)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="a" stroke="oklch(0.85 0.18 200)" strokeWidth={2} fill="url(#ga)" />
                <Area type="monotone" dataKey="b" stroke="oklch(0.7 0.28 330)" strokeWidth={2} fill="url(#gb)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Render queue */}
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Render queue</div>
              <h2 className="mt-1 text-lg font-semibold">Live status</h2>
            </div>
            <span className="glass rounded-full px-2 py-1 text-[10px] inline-flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-cyan-400 animate-pulse"/>live
            </span>
          </div>
          <div className="mt-4 space-y-3">
            {renders.map((r) => {
              const pill = r.status === "rendering"
                ? { cls: "text-cyan-300", icon: <Loader2 className="size-3 animate-spin"/>, label: "Rendering" }
                : r.status === "queued"
                ? { cls: "text-muted-foreground", icon: <Clock className="size-3"/>, label: "Queued" }
                : { cls: "text-emerald-400", icon: <CheckCircle2 className="size-3"/>, label: "Done" };
              return (
                <div key={r.name} className="glass rounded-xl p-3">
                  <div className="flex items-center justify-between gap-2">
                    <div className="text-sm font-medium truncate">{r.name}</div>
                    <span className={`text-[10px] inline-flex items-center gap-1 ${pill.cls}`}>{pill.icon}{pill.label}</span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div animate={{ width: `${r.progress}%` }} className="h-full bg-gradient-to-r from-cyan-400 to-fuchsia-500"/>
                  </div>
                  <div className="mt-1 flex items-center justify-between text-[10px] text-muted-foreground">
                    <span>ETA {r.eta}</span><span>{r.progress}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* AI recommendations */}
        <div className="xl:col-span-2 glass rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">AI Recommendations</div>
              <h2 className="mt-1 text-lg font-semibold">3 ways to boost this week</h2>
            </div>
            <div className="glass rounded-lg p-2"><Sparkles className="size-4 text-cyan-300"/></div>
          </div>
          <div className="mt-4 space-y-3">
            {[
              { title: "Open with a face close-up", desc: "Reels starting with eye-contact have 24% higher 3s retention in your niche.", tag: "Hook", impact: "+12%" },
              { title: "Try the sound 'Midnight Drive' (+312% trend)", desc: "Used by 18 creators you watch. Window closes in ~4 days.", tag: "Sound", impact: "+28%" },
              { title: "Post Thursday 7:48pm local", desc: "Your audience peaks at this slot — 1.6× normal CTR.", tag: "Timing", impact: "+18%" },
            ].map((r) => (
              <motion.div whileHover={{ x: 4 }} key={r.title} className="glass rounded-xl p-4 flex items-start gap-3">
                <div className="size-9 rounded-lg bg-gradient-to-br from-cyan-400/30 to-fuchsia-500/30 flex items-center justify-center"><Zap className="size-4 text-cyan-300"/></div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className="font-medium text-sm">{r.title}</div>
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-muted-foreground">{r.tag}</span>
                    <span className="text-[10px] text-emerald-400 font-semibold">{r.impact}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{r.desc}</p>
                </div>
                <button className="text-xs rounded-lg px-3 py-1.5 bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-black font-medium hover:opacity-90">Apply</button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Weekly bar */}
        <div className="glass rounded-2xl p-6">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Weekly performance</div>
          <h2 className="mt-1 text-lg font-semibold">Views vs likes</h2>
          <div className="h-48 mt-3">
            <ResponsiveContainer>
              <BarChart data={weekly}>
                <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false}/>
                <XAxis dataKey="d" tick={{ fill: "oklch(0.7 0 0)", fontSize: 11 }}/>
                <YAxis tick={{ fill: "oklch(0.7 0 0)", fontSize: 11 }}/>
                <Tooltip contentStyle={{ background: "oklch(0.18 0.03 270)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12 }} />
                <Bar dataKey="views" radius={[6,6,0,0]} fill="oklch(0.85 0.18 200)" />
                <Bar dataKey="likes" radius={[6,6,0,0]} fill="oklch(0.7 0.28 330)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent reels */}
      <div className="mt-6 glass rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Recent reels</div>
            <h2 className="mt-1 text-lg font-semibold">Your latest uploads</h2>
          </div>
          <Link to="/upload" className="text-xs glass rounded-lg px-3 py-1.5 hover:bg-white/10">+ New upload</Link>
        </div>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          {reels.map((r) => (
            <motion.div whileHover={{ y: -4 }} key={r.name} className="glass rounded-xl overflow-hidden">
              <div className={`aspect-[9/12] bg-gradient-to-br ${r.thumb} relative`}>
                <PlayCircle className="absolute inset-0 m-auto size-10 opacity-90"/>
                <div className="absolute top-2 left-2 glass rounded-full px-2 py-0.5 text-[10px] flex items-center gap-1"><Flame className="size-3 text-orange-300"/>{r.score}</div>
                <div className="absolute bottom-2 right-2 glass rounded-full px-2 py-0.5 text-[10px]">{r.platform}</div>
              </div>
              <div className="p-3">
                <div className="text-sm font-medium truncate">{r.name}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{r.views} views</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
