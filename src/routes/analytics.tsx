import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AreaChart, Area, LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import { Eye, Heart, MessageCircle, Share2, ArrowUpRight, Flame, Trophy } from "lucide-react";
import { AppShell } from "../components/app-shell";
import { ViralScore } from "../components/viral-score";
import { StatCard } from "../components/stat-card";

export const Route = createFileRoute("/analytics")({
  head: () => ({ meta: [{ title: "Viral Analytics — ViralReel AI" }] }),
  component: Analytics,
});

const PLATFORMS = ["All", "TikTok", "Reels", "Shorts"] as const;
type Platform = typeof PLATFORMS[number];

const MULTI: Record<Platform, number> = { All: 1, TikTok: 0.55, Reels: 0.28, Shorts: 0.17 };

const radial = [{ name: "Viral", value: 92, fill: "oklch(0.85 0.18 200)" }];

const leaderboard = [
  { rank: 1, name: "Neon city night ride", platform: "TikTok", views: "1.4M", eng: "14.2%", score: 92 },
  { rank: 2, name: "Sunset drone reveal", platform: "Shorts", views: "904K", eng: "11.8%", score: 85 },
  { rank: 3, name: "Coffee shop POV cut", platform: "Reels", views: "612K", eng: "10.4%", score: 78 },
  { rank: 4, name: "Lo-fi study desk tour", platform: "TikTok", views: "488K", eng: "9.7%", score: 74 },
  { rank: 5, name: "Studio gear unboxing", platform: "TikTok", views: "210K", eng: "8.1%", score: 64 },
];

// Heatmap: 10 columns (seconds) × 4 rows (cohort)
const heatmap = Array.from({ length: 4 }, (_, r) =>
  Array.from({ length: 10 }, (_, c) => Math.max(0.1, 1 - c * 0.08 - r * 0.05 + Math.sin(c + r) * 0.05)),
);

function Analytics() {
  const [platform, setPlatform] = useState<Platform>("All");
  const [compare, setCompare] = useState(true);
  const m = MULTI[platform];

  const data30 = useMemo(() => Array.from({ length: 30 }, (_, i) => ({
    d: i + 1,
    views: Math.round((50 + Math.sin(i / 3) * 30 + i * 4) * m),
    engagement: Math.round((20 + Math.cos(i / 4) * 12 + i * 1.5) * m),
    viewsPrev: Math.round((40 + Math.sin(i / 3) * 25 + i * 3.2) * m),
  })), [m]);

  const retention = useMemo(() => Array.from({ length: 30 }, (_, i) => ({
    s: i,
    v: Math.round(100 - i * 2.2 - Math.sin(i / 2) * 5),
    vPrev: Math.round(100 - i * 2.6 - Math.cos(i / 2) * 4),
  })), []);

  const filtered = platform === "All" ? leaderboard : leaderboard.filter((r) => r.platform === platform);

  return (
    <AppShell title="Viral Analytics">
      {/* Platform tabs + compare */}
      <div className="flex flex-wrap items-center gap-2 mb-4">
        <div className="glass rounded-xl p-1 inline-flex">
          {PLATFORMS.map((p) => (
            <button
              key={p}
              onClick={() => setPlatform(p)}
              className={`text-xs px-3 py-1.5 rounded-lg transition ${platform === p ? "bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-black font-medium" : "text-muted-foreground hover:text-white"}`}
            >
              {p}
            </button>
          ))}
        </div>
        <label className="ml-auto inline-flex items-center gap-2 text-xs glass rounded-xl px-3 py-2 cursor-pointer">
          <span className="text-muted-foreground">Compare to previous period</span>
          <span className={`relative inline-flex h-4 w-7 rounded-full ${compare ? "bg-gradient-to-r from-cyan-400 to-fuchsia-500" : "bg-white/10"}`}>
            <input type="checkbox" checked={compare} onChange={(e) => setCompare(e.target.checked)} className="sr-only"/>
            <span className={`absolute top-0.5 size-3 rounded-full bg-white transition-all ${compare ? "left-3.5" : "left-0.5"}`}/>
          </span>
        </label>
      </div>

      <div className="grid md:grid-cols-4 gap-4">
        <StatCard label="Attention captured" value={`${(6.2 * m).toFixed(1)}M`} delta={42} icon={Eye} accent="cyan"/>
        <StatCard label="Attention lost" value={`${Math.round(812 * m)}K`} delta={-12} icon={Heart} accent="magenta"/>
        <StatCard label="Dopamine score" value={`${Math.round(54 * m)}`} delta={11} icon={MessageCircle} accent="violet"/>
        <StatCard label="Curiosity retention" value={`${Math.round(78 * m)}%`} delta={36} icon={Share2} accent="cyan"/>
      </div>


      <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 glass rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Performance</div>
              <h2 className="text-lg font-semibold mt-1">Views & engagement (30 days)</h2>
            </div>
            <button className="text-xs glass rounded-lg px-3 py-1.5 hover:bg-white/10 inline-flex items-center gap-1">Export <ArrowUpRight className="size-3"/></button>
          </div>
          <div className="h-72 mt-4">
            <ResponsiveContainer>
              <AreaChart data={data30}>
                <defs>
                  <linearGradient id="va" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.85 0.18 200)" stopOpacity={0.6}/>
                    <stop offset="100%" stopColor="oklch(0.85 0.18 200)" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="ve" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.7 0.28 330)" stopOpacity={0.6}/>
                    <stop offset="100%" stopColor="oklch(0.7 0.28 330)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false}/>
                <XAxis dataKey="d" tick={{ fill: "oklch(0.7 0 0)", fontSize: 11 }}/>
                <YAxis tick={{ fill: "oklch(0.7 0 0)", fontSize: 11 }}/>
                <Tooltip contentStyle={{ background: "oklch(0.18 0.03 270)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12 }}/>
                <Area dataKey="views" stroke="oklch(0.85 0.18 200)" strokeWidth={2} fill="url(#va)"/>
                <Area dataKey="engagement" stroke="oklch(0.7 0.28 330)" strokeWidth={2} fill="url(#ve)"/>
                {compare && (
                  <Area dataKey="viewsPrev" stroke="oklch(0.7 0.05 260)" strokeWidth={1.5} strokeDasharray="4 4" fill="transparent"/>
                )}
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-2xl p-6 flex flex-col items-center">
          <div className="self-start">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Viral Score™</div>
            <h2 className="text-lg font-semibold mt-1">Latest reel</h2>
          </div>
          <div className="my-4"><ViralScore score={92} size={180}/></div>
          <div className="w-full space-y-2 text-sm">
            {[
              ["Hook strength", 96],
              ["3s retention", 88],
              ["Loop rate", 91],
              ["Share velocity", 84],
            ].map(([k, v]) => (
              <div key={k as string} className="">
                <div className="flex justify-between text-xs"><span className="text-muted-foreground">{k}</span><span>{v}</span></div>
                <div className="h-1.5 rounded-full bg-white/5 mt-1 overflow-hidden"><div style={{ width: `${v}%` }} className="h-full bg-gradient-to-r from-cyan-400 to-fuchsia-500"/></div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 glass rounded-2xl p-6">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Retention</div>
          <h2 className="text-lg font-semibold mt-1">Where viewers drop off</h2>
          <div className="h-64 mt-4">
            <ResponsiveContainer>
              <LineChart data={retention}>
                <CartesianGrid stroke="oklch(1 0 0 / 0.05)" vertical={false}/>
                <XAxis dataKey="s" tickFormatter={(v)=>`${v}s`} tick={{ fill: "oklch(0.7 0 0)", fontSize: 11 }}/>
                <YAxis unit="%" tick={{ fill: "oklch(0.7 0 0)", fontSize: 11 }}/>
                <Tooltip contentStyle={{ background: "oklch(0.18 0.03 270)", border: "1px solid oklch(1 0 0 / 0.1)", borderRadius: 12 }}/>
                <Line dataKey="v" stroke="oklch(0.85 0.18 200)" strokeWidth={3} dot={false}/>
                {compare && <Line dataKey="vPrev" stroke="oklch(0.7 0.05 260)" strokeWidth={1.5} strokeDasharray="4 4" dot={false}/>}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass rounded-2xl p-6">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Audience</div>
          <h2 className="text-lg font-semibold mt-1">Top regions</h2>
          <div className="mt-4 space-y-3 text-sm">
            {[["United States", 38],["Brazil", 17],["Germany", 12],["India", 11],["UK", 9]].map(([c,v]) => (
              <div key={c as string}>
                <div className="flex justify-between text-xs"><span>{c}</span><span className="text-muted-foreground">{v}%</span></div>
                <div className="h-1.5 rounded-full bg-white/5 mt-1 overflow-hidden"><div style={{ width: `${v as number * 2.5}%` }} className="h-full bg-gradient-to-r from-fuchsia-500 to-violet-500"/></div>
              </div>
            ))}
          </div>
          <div className="h-40 mt-4">
            <ResponsiveContainer>
              <RadialBarChart innerRadius="70%" outerRadius="100%" data={radial} startAngle={90} endAngle={-270}>
                <PolarAngleAxis type="number" domain={[0,100]} tick={false}/>
                <RadialBar background={{ fill: "oklch(1 0 0 / 0.05)" }} dataKey="value" cornerRadius={20}/>
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Hook / first-10s heatmap + Leaderboard */}
      <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="glass rounded-2xl p-6">
          <div className="text-xs uppercase tracking-wider text-muted-foreground">Hook heatmap</div>
          <h2 className="text-lg font-semibold mt-1">First 10 seconds</h2>
          <div className="mt-4 space-y-1">
            {heatmap.map((row, ri) => (
              <div key={ri} className="flex items-center gap-2">
                <span className="text-[10px] w-12 text-muted-foreground">Cohort {ri + 1}</span>
                <div className="flex-1 grid grid-cols-10 gap-0.5">
                  {row.map((v, ci) => (
                    <div
                      key={ci}
                      title={`${ci}s · ${(v * 100).toFixed(0)}%`}
                      className="aspect-square rounded-sm"
                      style={{ background: `oklch(0.85 0.18 200 / ${v})` }}
                    />
                  ))}
                </div>
              </div>
            ))}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-[10px] w-12"/>
              <div className="flex-1 grid grid-cols-10 gap-0.5 text-[9px] text-muted-foreground tabular-nums">
                {Array.from({ length: 10 }, (_, i) => <div key={i} className="text-center">{i}s</div>)}
              </div>
            </div>
          </div>
        </div>

        <div className="xl:col-span-2 glass rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">Leaderboard</div>
              <h2 className="text-lg font-semibold mt-1">Top reels {platform !== "All" && `· ${platform}`}</h2>
            </div>
            <Trophy className="size-4 text-amber-300"/>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-[10px] uppercase tracking-wider text-muted-foreground text-left">
                  <th className="font-normal py-2 pr-2">#</th>
                  <th className="font-normal py-2 pr-2">Reel</th>
                  <th className="font-normal py-2 pr-2">Platform</th>
                  <th className="font-normal py-2 pr-2 text-right">Views</th>
                  <th className="font-normal py-2 pr-2 text-right">Engagement</th>
                  <th className="font-normal py-2 pr-2 text-right">Score</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => (
                  <tr key={r.rank} className="border-t border-white/5 hover:bg-white/[0.03]">
                    <td className="py-3 pr-2 text-muted-foreground tabular-nums">{r.rank}</td>
                    <td className="py-3 pr-2 font-medium">{r.name}</td>
                    <td className="py-3 pr-2"><span className="glass rounded-full px-2 py-0.5 text-[10px]">{r.platform}</span></td>
                    <td className="py-3 pr-2 text-right tabular-nums">{r.views}</td>
                    <td className="py-3 pr-2 text-right tabular-nums">{r.eng}</td>
                    <td className="py-3 pr-2 text-right">
                      <span className={`inline-flex items-center gap-1 text-xs rounded-full px-2 py-0.5 ring-1 ${r.score >= 85 ? "ring-cyan-400/40 text-cyan-200" : r.score >= 75 ? "ring-fuchsia-400/40 text-fuchsia-200" : "ring-white/10 text-muted-foreground"}`}>
                        <Flame className="size-3 text-orange-300"/>{r.score}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
