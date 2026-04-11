"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, Lock, Sparkles } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error ?? "Erreur de connexion");
        return;
      }
      router.push("/formation");
      router.refresh();
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="formation-canvas flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-navy/10 bg-white/80 px-4 py-1.5 text-xs font-semibold text-brand-navy shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-brand-gold" aria-hidden />
            Espace réservé aux inscrits
          </p>
          <h1 className="mt-5 text-2xl font-bold tracking-tight text-brand-navy md:text-3xl">
            Accédez à votre formation
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">
            Saisissez le mot de passe communiqué par votre organisme pour retrouver l&apos;intégralité
            du parcours 42 h.
          </p>
        </div>

        <div className="card-elevated overflow-hidden rounded-3xl border-brand-navy/10">
          <div className="h-1.5 bg-gradient-to-r from-brand-navy via-brand-navy-soft to-brand-gold" aria-hidden />
          <div className="p-8">
            <form onSubmit={onSubmit} className="space-y-5" aria-busy={loading}>
              <div>
                <label
                  htmlFor="password"
                  className="mb-2 flex items-center gap-2 text-sm font-semibold text-zinc-800"
                >
                  <Lock className="h-4 w-4 text-brand-navy/70" aria-hidden />
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="link-focus w-full rounded-xl border border-zinc-200 bg-zinc-50/80 px-4 py-3.5 text-zinc-900 placeholder:text-zinc-400"
                  placeholder="••••••••"
                  required
                />
              </div>
              {error ? (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
                  {error}
                </p>
              ) : null}
              <button
                type="submit"
                disabled={loading}
                className="btn-primary-solid inline-flex w-full items-center justify-center gap-2 py-3.5 text-base disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 shrink-0 animate-spin" aria-hidden />
                    Connexion…
                  </>
                ) : (
                  "Entrer dans l’espace formation"
                )}
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-zinc-500">
              <Link href="/" className="font-semibold text-brand-navy underline-offset-4 hover:underline">
                ← Retour à l’accueil
              </Link>
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-xs leading-relaxed text-zinc-500">
          Problème de connexion ? Vérifiez votre saisie ou contactez l’organisme qui vous a remis les
          accès.
        </p>
      </div>
    </div>
  );
}
