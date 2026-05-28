import type { ReactNode } from "react";

export function HoloCard({ children, className = "", glow = false }: { children: ReactNode; className?: string; glow?: boolean }) {
  return (
    <div className={`glass-strong holo-border rounded-2xl ${glow ? "glow-holo" : ""} ${className}`}>
      {children}
    </div>
  );
}
