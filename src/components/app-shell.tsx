import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Upload, Scissors, BarChart3, Flame, Sparkles,
  Search, Bell, Settings, Wand2, Brain, MousePointer2, ImageIcon,
  Factory, Bot, GitBranch, ShieldAlert, Trophy, Handshake, Layers,
  LogOut, Loader2,
} from "lucide-react";
import { useEffect, type ReactNode, type ComponentType } from "react";
import { useAuth } from "@/hooks/use-auth";

type NavItem = { to: string; label: string; icon: ComponentType<{ className?: string }>; badge?: "NEW" | "BETA" };
type NavSection = { title: string; items: NavItem[] };

const sections: NavSection[] = [
  {
    title: "Create",
    items: [
      { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { to: "/upload", label: "Upload", icon: Upload },
      { to: "/editor", label: "Reel Editor", icon: Scissors },
      { to: "/factory", label: "Multi-Reel Factory", icon: Factory, badge: "NEW" },
      { to: "/faceless", label: "Faceless Empire", icon: Bot, badge: "NEW" },
    ],
  },
  {
    title: "Intelligence",
    items: [
      { to: "/clone", label: "Clone Studio", icon: Layers, badge: "NEW" },
      { to: "/brain", label: "Brain Scanner", icon: Brain, badge: "BETA" },
      { to: "/scroll-physics", label: "Scroll Physics", icon: MousePointer2, badge: "BETA" },
      { to: "/thumbnails", label: "Thumbnail Lab", icon: ImageIcon, badge: "NEW" },
    ],
  },
  {
    title: "Growth",
    items: [
      { to: "/analytics", label: "Attention Economy", icon: BarChart3 },
      { to: "/trends", label: "Trend Discovery", icon: Flame },
      { to: "/evolution", label: "Reel Evolution", icon: GitBranch, badge: "NEW" },
      { to: "/shadowban", label: "Shadowban Radar", icon: ShieldAlert, badge: "BETA" },
      { to: "/leaderboards", label: "Leaderboards", icon: Trophy },
    ],
  },
  {
    title: "Business",
    items: [
      { to: "/deals", label: "Brand Deals", icon: Handshake, badge: "NEW" },
      { to: "/pricing", label: "Pricing", icon: Sparkles },
    ],
  },
];

export function AppShell({ children, title, requireAuth = true }: { children: ReactNode; title: string; requireAuth?: boolean }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();

  useEffect(() => {
    if (requireAuth && !loading && !user) {
      navigate({ to: "/auth" });
    }
  }, [requireAuth, loading, user, navigate]);

  if (requireAuth && (loading || !user)) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        <Loader2 className="size-5 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex text-foreground">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 shrink-0 flex-col gap-2 p-4 glass-strong border-r border-white/5 sticky top-0 h-screen overflow-y-auto">
        <Link to="/" className="flex items-center gap-2 px-2 py-3">
          <div className="size-9 rounded-xl bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-violet-500 glow-cyan flex items-center justify-center">
            <Wand2 className="size-5 text-black" />
          </div>
          <div>
            <div className="font-semibold tracking-tight">ViralReel</div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Creator OS</div>
          </div>
        </Link>

        <nav className="mt-2 flex flex-col gap-4">
          {sections.map((section) => (
            <div key={section.title} className="flex flex-col gap-0.5">
              <div className="px-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70 mb-1">{section.title}</div>
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = path === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`group relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-all ${
                      active ? "text-white" : "text-muted-foreground hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="active-pill"
                        className="absolute inset-0 rounded-xl ring-1 ring-cyan-400/40 bg-gradient-to-r from-cyan-400/10 to-fuchsia-500/10"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <Icon className="size-4 relative shrink-0" />
                    <span className="relative truncate">{item.label}</span>
                    {item.badge && (
                      <span className={`relative ml-auto text-[9px] uppercase tracking-wider rounded px-1.5 py-0.5 ${
                        item.badge === "NEW"
                          ? "bg-gradient-to-r from-cyan-400 to-fuchsia-500 text-black font-semibold"
                          : "ring-1 ring-fuchsia-400/40 text-fuchsia-200"
                      }`}>{item.badge}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div className="mt-4 glass rounded-2xl p-4">
          <div className="text-xs text-muted-foreground">Render credits</div>
          <div className="mt-1 text-2xl font-semibold">128 <span className="text-xs text-muted-foreground">/ 500</span></div>
          <div className="mt-3 h-1.5 rounded-full bg-white/5 overflow-hidden">
            <div className="h-full w-[26%] bg-gradient-to-r from-cyan-400 to-fuchsia-500" />
          </div>
          <Link to="/pricing" className="mt-3 block text-xs text-cyan-300 hover:underline">Upgrade plan →</Link>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 glass-strong border-b border-white/5">
          <div className="flex items-center gap-3 px-4 md:px-8 h-16">
            <div>
              <div className="text-xs text-muted-foreground">Studio</div>
              <h1 className="text-base font-semibold leading-none">{title}</h1>
            </div>
            <div className="ml-6 hidden lg:flex items-center gap-2 glass rounded-xl px-3 py-2 w-80">
              <Search className="size-4 text-muted-foreground" />
              <input
                placeholder="Search reels, trends, sounds…"
                className="bg-transparent outline-none text-sm flex-1 placeholder:text-muted-foreground"
              />
              <kbd className="text-[10px] text-muted-foreground border border-white/10 rounded px-1.5 py-0.5">⌘K</kbd>
            </div>
            <div className="ml-auto flex items-center gap-2">
              <button className="glass rounded-xl p-2 hover:bg-white/10"><Bell className="size-4" /></button>
              <button className="glass rounded-xl p-2 hover:bg-white/10"><Settings className="size-4" /></button>
              {user && (
                <button
                  onClick={async () => { await signOut(); navigate({ to: "/" }); }}
                  className="glass rounded-xl p-2 hover:bg-white/10"
                  title={user.email ?? "Sign out"}
                >
                  <LogOut className="size-4" />
                </button>
              )}
              <div
                className="size-9 rounded-full bg-gradient-to-br from-fuchsia-500 to-violet-500 ring-2 ring-white/10 flex items-center justify-center text-xs font-semibold text-black"
                title={user?.email ?? ""}
              >
                {user?.email?.[0]?.toUpperCase() ?? "·"}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-4 md:px-8 py-6 md:py-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
