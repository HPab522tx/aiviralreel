import { createFileRoute } from "@tanstack/react-router";
import { AreaChart, Area, LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import { Eye, Heart, MessageCircle, Share2, ArrowUpRight } from "lucide-react";
import { AppShell } from "../components/app-shell";
import { ViralScore } from "../components/viral-score";
import { StatCard } from "../components/stat-card";

export const Route = createFileRoute("/analytics")({
  head: () => ({ meta: [{ title: "Viral Analytics — ViralReel AI" }] }),
  component: Analytics,
});

const data30 = Array.from({ length: 30 }, (_, i) => ({
  d: i + 1,
  views: 50 + Math.round(Math.sin(i / 3) * 30 + i * 4),
  engagement: 20 + Math.round(Math.cos(i / 4) * 12 + i * 1.5),
}));

const retention = Array.from({ length: 30 }, (_, i) => ({
  s: i,
  v: Math.round(100 - i * 2.2 - Math.sin(i / 2) * 5),
}));

const radial = [{ name: "Viral", value: 92, fill: "oklch(0.85 0.18 200)" }];

function Analytics() {
  return (
    <AppShell title="Viral Analytics">
      <div className="grid md:grid-cols-4 gap-4">
        <StatCard label="Views (30d)" value="6.2M" delta={42} icon={Eye} accent="cyan"/>
        <StatCard label="Likes" value="812K" delta={28} icon={Heart} accent="magenta"/>
        <StatCard label="Comments" value="54K" delta={11} icon={MessageCircle} accent="violet"/>
        <StatCard label="Shares" value="98K" delta={36} icon={Share2} accent="cyan"/>
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
    </AppShell>
  );
}
