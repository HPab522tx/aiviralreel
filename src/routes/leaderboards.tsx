import { createFileRoute } from "@tanstack/react-router";
import { Trophy, Crown, Flame } from "lucide-react";
import { AppShell } from "../components/app-shell";
import { LeaderboardRow, type LBEntry } from "../components/leaderboard-row";

export const Route = createFileRoute("/leaderboards")({
  head: () => ({ meta: [{ title: "Leaderboards — ViralReel AI" }] }),
  component: Leaderboards,
});

const entries: LBEntry[] = [
  { rank: 1, name: "Aiko Nakamura", handle: "@aikoreels", viral: 96, retention: 88, hook: 94, attention: 91 },
  { rank: 2, name: "Marcus Vale", handle: "@valecinematic", viral: 93, retention: 84, hook: 90, attention: 88 },
  { rank: 3, name: "Sofia Lin", handle: "@sofialoops", viral: 91, retention: 82, hook: 87, attention: 86 },
  { rank: 4, name: "You", handle: "@yourchannel", viral: 88, retention: 78, hook: 85, attention: 82, highlight: true },
  { rank: 5, name: "Jordan Reyes", handle: "@reyesedits", viral: 86, retention: 76, hook: 82, attention: 80 },
  { rank: 6, name: "Kai Hoffman", handle: "@kaisynth", viral: 84, retention: 74, hook: 80, attention: 79 },
  { rank: 7, name: "Mira Patel", handle: "@mirapov", viral: 82, retention: 73, hook: 78, attention: 77 },
  { rank: 8, name: "Theo Brand", handle: "@theobrand", viral: 80, retention: 71, hook: 76, attention: 75 },
];

const podiumStyles = [
  { h: "h-32", grad: "from-amber-300 to-amber-500", crown: true },
  { h: "h-24", grad: "from-slate-200 to-slate-400", crown: false },
  { h: "h-20", grad: "from-orange-400 to-rose-500", crown: false },
];

function Leaderboards() {
  return (
    <AppShell title="Creator Leaderboards">
      <div className="glass-strong rounded-3xl p-6 relative overflow-hidden">
        <div className="absolute -top-20 -right-10 size-72 rounded-full bg-amber-300/20 blur-3xl"/>
        <div className="absolute -bottom-20 -left-10 size-72 rounded-full bg-fuchsia-500/20 blur-3xl"/>
        <div className="relative flex flex-wrap items-end justify-center gap-4 py-6">
          {[entries[1], entries[0], entries[2]].map((e, i) => {
            const style = [podiumStyles[1], podiumStyles[0], podiumStyles[2]][i];
            return (
              <div key={e.rank} className="flex flex-col items-center gap-2 w-32">
                <div className={`size-16 rounded-full bg-gradient-to-br ${style.grad} ring-2 ring-white/20 grid place-items-center relative`}>
                  {style.crown && <Crown className="absolute -top-5 size-6 text-amber-300"/>}
                  <span className="text-black font-bold text-lg">{e.rank}</span>
                </div>
                <div className="text-sm font-semibold text-center">{e.name}</div>
                <div className="text-[10px] text-muted-foreground">{e.handle}</div>
                <div className="inline-flex items-center gap-1 text-xs"><Flame className="size-3 text-orange-300"/>{e.viral}</div>
                <div className={`w-full rounded-t-xl bg-gradient-to-t ${style.grad} ${style.h}`}/>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-6 glass rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Weekly ranking</div>
            <h2 className="text-lg font-semibold mt-1">Top creators in your niche</h2>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <span className="glass rounded-full px-3 py-1.5 ring-1 ring-cyan-400/30 text-cyan-200">Diamond tier</span>
            <Trophy className="size-4 text-amber-300"/>
          </div>
        </div>
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-[10px] uppercase tracking-wider text-muted-foreground text-left">
                <th className="font-normal py-2 pr-2">#</th>
                <th className="font-normal py-2 pr-2">Creator</th>
                <th className="font-normal py-2 pr-2 text-right">Viral</th>
                <th className="font-normal py-2 pr-2 text-right">Retention</th>
                <th className="font-normal py-2 pr-2 text-right">Hook</th>
                <th className="font-normal py-2 pr-2 text-right">Attention</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((e) => <LeaderboardRow key={e.rank} e={e}/>)}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
