import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Wand2, Lock, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [{ title: "Reset password — ViralReel AI" }] }),
  component: ResetPassword,
});

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Recovery link puts a session in place via the auth listener.
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => { if (data.session) setReady(true); });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirm) { toast.error("Passwords don't match"); return; }
    setBusy(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast.success("Password updated. You're signed in.");
      navigate({ to: "/dashboard" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not update password");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-32 -left-20 size-[420px] rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-20 size-[420px] rounded-full bg-fuchsia-500/20 blur-3xl" />
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md glass-strong rounded-3xl border border-white/10 p-8">
        <Link to="/" className="flex items-center gap-2 mb-6">
          <div className="size-9 rounded-xl bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-violet-500 glow-cyan flex items-center justify-center">
            <Wand2 className="size-5 text-black" />
          </div>
          <span className="font-semibold">ViralReel <span className="text-muted-foreground">AI</span></span>
        </Link>

        <h1 className="text-2xl font-semibold tracking-tight">Set a new password</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {ready ? "Choose a strong password you haven't used elsewhere." : "Waiting for your recovery link to verify…"}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-3">
          <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-background/40 px-3 py-2 focus-within:border-cyan-400/50">
            <Lock className="size-4 text-muted-foreground" />
            <input type="password" required minLength={6} placeholder="New password"
              value={password} onChange={(e) => setPassword(e.target.value)}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60" />
          </label>
          <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-background/40 px-3 py-2 focus-within:border-cyan-400/50">
            <Lock className="size-4 text-muted-foreground" />
            <input type="password" required minLength={6} placeholder="Confirm password"
              value={confirm} onChange={(e) => setConfirm(e.target.value)}
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60" />
          </label>
          <button type="submit" disabled={busy || !ready}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-black hover:opacity-90 transition disabled:opacity-50">
            {busy ? <Loader2 className="size-4 animate-spin" /> : "Update password"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
