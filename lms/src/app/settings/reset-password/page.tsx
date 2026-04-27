"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Loader2 } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }
    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error: updateError } = await supabase.auth.updateUser({ password });
    setLoading(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setDone(true);
    setTimeout(() => router.push("/login"), 2500);
  }

  return (
    <div className="formation-canvas relative flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="overflow-hidden rounded-[2rem] border border-white/20 bg-[#0a1224] shadow-2xl">
          <div className="h-1.5 bg-gradient-to-r from-brand-gold/40 via-brand-gold to-brand-gold/40" />
          <div className="p-8 sm:p-10">
            <h1 className="mb-6 text-2xl font-black text-white">Nouveau mot de passe</h1>

            {done ? (
              <p className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-4 py-3 text-sm font-bold text-emerald-400">
                Mot de passe mis à jour. Redirection vers la connexion…
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2.5 flex items-center gap-2 text-sm font-bold text-white">
                    <Lock className="h-4 w-4 text-brand-gold" />
                    Nouveau mot de passe
                  </label>
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-white placeholder:text-zinc-500 focus:border-brand-gold/50 focus:outline-none focus:ring-4 focus:ring-brand-gold/10 transition-all"
                    placeholder="••••••••"
                  />
                </div>
                <div>
                  <label className="mb-2.5 flex items-center gap-2 text-sm font-bold text-white">
                    <Lock className="h-4 w-4 text-brand-gold" />
                    Confirmer le mot de passe
                  </label>
                  <input
                    type="password"
                    required
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-white placeholder:text-zinc-500 focus:border-brand-gold/50 focus:outline-none focus:ring-4 focus:ring-brand-gold/10 transition-all"
                    placeholder="••••••••"
                  />
                </div>

                {error && (
                  <p className="rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm font-bold text-red-400">{error}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-brand-gold py-4 text-base font-black text-brand-navy-deep shadow-xl transition hover:bg-white hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
                >
                  {loading ? <><Loader2 className="h-5 w-5 animate-spin" />Mise à jour…</> : "Enregistrer le mot de passe"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
