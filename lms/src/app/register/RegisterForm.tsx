"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Loader2, Lock, Mail, User, Sparkles, ArrowLeft, CheckCircle2 } from "lucide-react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";
import { signup } from "@/app/actions/auth";
import { useEffect } from "react";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [prefilledEmail, setPrefilledEmail] = useState("");
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const sessionId = searchParams.get("session_id");
  const next = searchParams.get("next") ?? "/formation";

  // Récupérer l'email de Stripe si on arrive d'un paiement
  useEffect(() => {
    if (sessionId) {
      // On pourrait appeler une API pour récupérer l'email exact, 
      // mais pour l'instant on laisse l'utilisateur le saisir ou on le passera en query param
    }
  }, [sessionId]);

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    await signup(formData);
    setLoading(false);
  }

  return (
    <div className="formation-canvas relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          {sessionId ? (
            <div className="mb-6 animate-bounce">
              <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-bold text-emerald-400 backdrop-blur-md">
                <CheckCircle2 className="h-4 w-4" />
                Paiement validé ! Créez votre accès
              </p>
            </div>
          ) : (
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-gold/20 bg-brand-gold/5 px-4 py-1.5 text-xs font-semibold text-brand-gold shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-brand-gold" aria-hidden />
              Nouveau sur la plateforme
            </p>
          )}

          <div className="mt-5 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gold shadow-lg ring-1 ring-brand-gold/20">
              <EmojiIcon emoji="🏛️" className="h-9 w-9" />
            </div>
          </div>

          <h1 className="mt-4 text-2xl font-bold tracking-tight text-white md:text-3xl">
            Créer votre compte
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-zinc-400">
            Inscrivez-vous pour accéder à la formation 42 h et suivre votre progression.
          </p>
        </div>

        <div className="card-elevated overflow-hidden rounded-3xl border-white/10 bg-white/5 backdrop-blur-xl">
          <div className="h-1.5 bg-gradient-to-r from-brand-gold/50 via-brand-gold to-brand-gold/50" aria-hidden />
          <div className="p-8">
            <form action={handleSubmit} className="space-y-5" aria-busy={loading}>
              <input type="hidden" name="next" value={next} />

              <div>
                <label htmlFor="full_name" className="mb-2 flex items-center gap-2 text-sm font-semibold text-zinc-300">
                  <User className="h-4 w-4 text-brand-gold/70" aria-hidden />
                  Nom complet
                </label>
                <input
                  id="full_name"
                  name="full_name"
                  type="text"
                  autoComplete="name"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-zinc-500 focus:border-brand-gold/50 focus:outline-none focus:ring-2 focus:ring-brand-gold/20"
                  placeholder="Jean Dupont"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2 flex items-center gap-2 text-sm font-semibold text-zinc-300">
                  <Mail className="h-4 w-4 text-brand-gold/70" aria-hidden />
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-zinc-500 focus:border-brand-gold/50 focus:outline-none focus:ring-2 focus:ring-brand-gold/20"
                  placeholder="vous@exemple.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-2 flex items-center gap-2 text-sm font-semibold text-zinc-300">
                  <Lock className="h-4 w-4 text-brand-gold/70" aria-hidden />
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={6}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder:text-zinc-500 focus:border-brand-gold/50 focus:outline-none focus:ring-2 focus:ring-brand-gold/20"
                  placeholder="••••••••"
                />
                <p className="mt-1 text-xs text-zinc-500">Minimum 6 caractères</p>
              </div>

              {error ? (
                <p className="rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-2 text-sm text-red-400" role="alert">
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
                    Inscription…
                  </>
                ) : (
                  "Créer mon compte"
                )}
              </button>
            </form>

            <div className="mt-5 text-center text-sm">
              <Link href={`/login?next=${encodeURIComponent(next)}`} className="inline-flex items-center gap-1 font-semibold text-brand-gold hover:text-brand-gold/80 hover:underline">
                <ArrowLeft className="h-4 w-4" />
                Déjà un compte ? Se connecter
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
