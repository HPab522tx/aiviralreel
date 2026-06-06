import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Wand2, Mail, Lock, Loader2, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/hooks/use-auth";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [{ title: "Sign in — ViralReel AI" }] }),
  component: AuthPage,
});

type Mode = "signin" | "signup" | "forgot";

function AuthPage() {
  const navigate = useNavigate();
  const { session, loading } = useAuth();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!loading && session) navigate({ to: "/dashboard" });
  }, [loading, session, navigate]);

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/dashboard` },
        });
        if (error) throw error;
        toast.success("Check your email to confirm your account.");
      } else if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back.");
        navigate({ to: "/dashboard" });
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        toast.success("Reset link sent. Check your email.");
        setMode("signin");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setBusy(true);
    try {
      const res = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin + "/dashboard",
      });
      if (res.error) throw res.error;
      // res.redirected: browser will navigate away.
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Google sign-in failed");
      setBusy(false);
    }
  }

  const title = mode === "signup" ? "Create your account"
    : mode === "forgot" ? "Reset your password"
    : "Welcome back";
  const cta = mode === "signup" ? "Create account"
    : mode === "forgot" ? "Send reset link"
    : "Sign in";

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute -top-32 -left-20 size-[420px] rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute -bottom-32 -right-20 size-[420px] rounded-full bg-fuchsia-500/20 blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md glass-strong rounded-3xl border border-white/10 p-8"
      >
        <Link to="/" className="flex items-center gap-2 mb-6">
          <div className="size-9 rounded-xl bg-gradient-to-br from-cyan-400 via-fuchsia-500 to-violet-500 glow-cyan flex items-center justify-center">
            <Wand2 className="size-5 text-black" />
          </div>
          <span className="font-semibold">ViralReel <span className="text-muted-foreground">AI</span></span>
        </Link>

        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {mode === "signup" ? "Start scoring reels before you publish."
            : mode === "forgot" ? "We'll email you a secure link."
            : "Sign in to your creator OS."}
        </p>

        {mode !== "forgot" && (
          <button
            type="button" onClick={handleGoogle} disabled={busy}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium hover:bg-white/10 transition disabled:opacity-50"
          >
            <GoogleIcon /> Continue with Google
          </button>
        )}

        {mode !== "forgot" && (
          <div className="my-5 flex items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70">
            <div className="h-px flex-1 bg-white/10" /> or email <div className="h-px flex-1 bg-white/10" />
          </div>
        )}

        <form onSubmit={handleEmail} className="space-y-3">
          <Field icon={Mail} type="email" placeholder="you@studio.com" value={email} onChange={setEmail} required />
          {mode !== "forgot" && (
            <Field icon={Lock} type="password" placeholder="Password" value={password} onChange={setPassword} required minLength={6} />
          )}
          <button
            type="submit" disabled={busy}
            className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-4 py-3 text-sm font-semibold text-black hover:opacity-90 transition disabled:opacity-50"
          >
            {busy ? <Loader2 className="size-4 animate-spin" /> : <>{cta} <ArrowRight className="size-4" /></>}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between text-xs text-muted-foreground">
          {mode === "signin" && (
            <>
              <button onClick={() => setMode("forgot")} className="hover:text-white">Forgot password?</button>
              <button onClick={() => setMode("signup")} className="hover:text-white">Create account</button>
            </>
          )}
          {mode === "signup" && (
            <button onClick={() => setMode("signin")} className="ml-auto hover:text-white">Have an account? Sign in</button>
          )}
          {mode === "forgot" && (
            <button onClick={() => setMode("signin")} className="ml-auto hover:text-white">Back to sign in</button>
          )}
        </div>
      </motion.div>
    </div>
  );
}

function Field({
  icon: Icon, value, onChange, ...rest
}: { icon: React.ComponentType<{ className?: string }>; value: string; onChange: (v: string) => void } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex items-center gap-2 rounded-xl border border-white/10 bg-background/40 px-3 py-2 focus-within:border-cyan-400/50">
      <Icon className="size-4 text-muted-foreground" />
      <input
        {...rest}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground/60"
      />
    </label>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" aria-hidden>
      <path fill="#EA4335" d="M12 10.2v3.9h5.5c-.24 1.4-1.7 4.1-5.5 4.1-3.3 0-6-2.7-6-6.1s2.7-6.1 6-6.1c1.9 0 3.2.8 3.9 1.5l2.7-2.6C16.9 3.3 14.7 2.3 12 2.3 6.8 2.3 2.6 6.5 2.6 11.7s4.2 9.4 9.4 9.4c5.4 0 9-3.8 9-9.2 0-.6-.06-1.1-.16-1.6H12z"/>
    </svg>
  );
}
