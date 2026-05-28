import { Flame, Trophy } from "lucide-react";

export type LBEntry = {
  rank: number;
  name: string;
  handle: string;
  viral: number;
  retention: number;
  hook: number;
  attention: number;
  highlight?: boolean;
};

export function LeaderboardRow({ e }: { e: LBEntry }) {
  const medal =
    e.rank === 1 ? "from-amber-300 to-amber-500"
    : e.rank === 2 ? "from-slate-200 to-slate-400"
    : e.rank === 3 ? "from-orange-400 to-rose-500"
    : "";
  return (
    <tr className={`border-t border-white/5 ${e.highlight ? "bg-cyan-400/5" : "hover:bg-white/[0.03]"}`}>
      <td className="py-3 pr-2">
        {e.rank <= 3 ? (
          <span className={`inline-flex items-center justify-center size-6 rounded-full bg-gradient-to-br ${medal} text-black text-xs font-bold`}>{e.rank}</span>
        ) : (
          <span className="text-muted-foreground tabular-nums pl-1">{e.rank}</span>
        )}
      </td>
      <td className="py-3 pr-2">
        <div className="font-medium">{e.name}</div>
        <div className="text-xs text-muted-foreground">{e.handle}</div>
      </td>
      <td className="py-3 pr-2 text-right">
        <span className="inline-flex items-center gap-1 text-xs rounded-full px-2 py-0.5 ring-1 ring-cyan-400/40 text-cyan-200">
          <Flame className="size-3 text-orange-300"/>{e.viral}
        </span>
      </td>
      <td className="py-3 pr-2 text-right tabular-nums">{e.retention}%</td>
      <td className="py-3 pr-2 text-right tabular-nums">{e.hook}</td>
      <td className="py-3 pr-2 text-right">
        <span className="inline-flex items-center gap-1 text-xs">{e.attention}<Trophy className="size-3 text-amber-300"/></span>
      </td>
    </tr>
  );
}
