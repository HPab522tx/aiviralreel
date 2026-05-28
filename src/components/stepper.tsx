import { Check } from "lucide-react";

type Step = { label: string };

export function Stepper({ steps, current }: { steps: Step[]; current: number }) {
  return (
    <div className="flex items-center w-full gap-1">
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <div key={s.label} className="flex items-center flex-1 last:flex-none gap-1">
            <div className="flex flex-col items-center gap-1 min-w-0">
              <div
                className={`size-6 rounded-full grid place-items-center text-[10px] font-semibold ring-1 transition ${
                  done
                    ? "bg-gradient-to-br from-cyan-400 to-fuchsia-500 text-black ring-transparent"
                    : active
                    ? "bg-white/10 text-white ring-cyan-400/60"
                    : "bg-white/5 text-muted-foreground ring-white/10"
                }`}
              >
                {done ? <Check className="size-3" /> : i + 1}
              </div>
              <div className={`text-[10px] truncate ${active ? "text-white" : "text-muted-foreground"}`}>{s.label}</div>
            </div>
            {i < steps.length - 1 && (
              <div className="flex-1 h-px bg-white/10 relative -translate-y-2 mx-1 overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-400 to-fuchsia-500 transition-all"
                  style={{ width: done ? "100%" : active ? "50%" : "0%" }}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
