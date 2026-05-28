import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid } from "recharts";
import { Eye, Heart, PlayCircle, Users, Sparkles, ArrowUpRight, Zap, Flame } from "lucide-react";
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

function Dashboard() {
  return (
    <AppShell title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard label="Total views" value="3.42M" delta={18} icon={Eye} accent="cyan" />
        <StatCard label="Engagement" value="11.8%" delta={6} icon={Heart} accent="magenta" />
        <StatCard label="Followers" value="84.2K" delta={12} icon={Users} accent="violet" />
        <StatCard label="Avg. viral score" value="82" delta={-3} icon={Sparkles} accent="cyan" />
      </div>

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

        {/* Viral score widget */}
        <div className="glass rounded-2xl p-6 flex flex-col items-center">
          <div className="self-start">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Latest reel</div>
            <h2 className="mt-1 text-lg font-semibold">Neon city night ride</h2>
          </div>
          <div className="my-4"><ViralScore score={92} /></div>
          <div className="grid grid-cols-3 gap-2 w-full text-center">
            <div className="glass rounded-xl p-2"><div className="text-[10px] text-muted-foreground">Hook</div><div className="font-semibold">96</div></div>
            <div className="glass rounded-xl p-2"><div className="text-[10px] text-muted-foreground">Retention</div><div className="font-semibold">88</div></div>
            <div className="glass rounded-xl p-2"><div className="text-[10px] text-muted-foreground">Loop</div><div className="font-semibold">91</div></div>
          </div>
          <Link to="/analytics" className="mt-4 inline-flex items-center gap-1.5 text-xs text-cyan-300 hover:underline">
            Open analytics <ArrowUpRight className="size-3"/>
          </Link>
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
              { title: "Open with a face close-up", desc: "Reels starting with eye-contact have 24% higher 3s retention in your niche.", tag: "Hook" },
              { title: "Try the sound 'Midnight Drive' (+312% trend)", desc: "Used by 18 creators you watch. Window closes in ~4 days.", tag: "Sound" },
              { title: "Post Thursday 7:48pm local", desc: "Your audience peaks at this slot — 1.6× normal CTR.", tag: "Timing" },
            ].map((r) => (
              <motion.div whileHover={{ x: 4 }} key={r.title} className="glass rounded-xl p-4 flex items-start gap-3">
                <div className="size-9 rounded-lg bg-gradient-to-br from-cyan-400/30 to-fuchsia-500/30 flex items-center justify-center"><Zap className="size-4 text-cyan-300"/></div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <div className="font-medium text-sm">{r.title}</div>
                    <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/5 text-muted-foreground">{r.tag}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{r.desc}</p>
                </div>
                <button className="text-xs glass rounded-lg px-3 py-1.5 hover:bg-white/10">Apply</button>
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
