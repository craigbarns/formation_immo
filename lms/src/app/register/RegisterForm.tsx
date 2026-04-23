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
              <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/40 bg-brand-navy-hero px-4 py-2 text-sm font-bold text-emerald-400 shadow-lg">
                <CheckCircle2 className="h-4 w-4" />
                Paiement validé ! Créez votre accès
              </p>
            </div>
          ) : (
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-brand-navy-hero px-4 py-1.5 text-xs font-bold text-brand-gold shadow-lg">
              <Sparkles className="h-3.5 w-3.5 text-brand-gold" aria-hidden />
              Nouveau sur la plateforme
            </p>
          )}

          <div className="mt-5 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gold shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              <EmojiIcon emoji="🏛️" className="h-9 w-9" />
            </div>
          </div>

          <h1 className="mt-5 text-3xl font-black tracking-tight text-white md:text-4xl">
            Créer votre compte
          </h1>
          <p className="mt-3 text-base font-medium leading-relaxed text-white/80">
            Inscrivez-vous pour accéder à la formation 42 h et suivre votre progression.
          </p>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-white/20 bg-[#0a1224] shadow-2xl backdrop-blur-2xl">
          <div className="h-1.5 bg-gradient-to-r from-brand-gold/40 via-brand-gold to-brand-gold/40" aria-hidden />
          <div className="p-8 sm:p-10">
            <form action={handleSubmit} className="space-y-6" aria-busy={loading}>
              <input type="hidden" name="next" value={next} />

              <div>
                <label htmlFor="full_name" className="mb-2.5 flex items-center gap-2 text-sm font-bold text-white">
                  <User className="h-4 w-4 text-brand-gold" aria-hidden />
                  Nom complet
                </label>
                <input
                  id="full_name"
                  name="full_name"
                  type="text"
                  autoComplete="name"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-white placeholder:text-zinc-500 focus:border-brand-gold/50 focus:outline-none focus:ring-4 focus:ring-brand-gold/10 transition-all"
                  placeholder="Jean Dupont"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-2.5 flex items-center gap-2 text-sm font-bold text-white">
                  <Mail className="h-4 w-4 text-brand-gold" aria-hidden />
                  Email professionnel
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-white placeholder:text-zinc-500 focus:border-brand-gold/50 focus:outline-none focus:ring-4 focus:ring-brand-gold/10 transition-all"
                  placeholder="vous@exemple.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-2.5 flex items-center gap-2 text-sm font-bold text-white">
                  <Lock className="h-4 w-4 text-brand-gold" aria-hidden />
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  minLength={6}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-white placeholder:text-zinc-500 focus:border-brand-gold/50 focus:outline-none focus:ring-4 focus:ring-brand-gold/10 transition-all"
                  placeholder="••••••••"
                />
                <p className="mt-2 text-xs font-bold text-white/40 tracking-wide uppercase">Minimum 6 caractères</p>
              </div>

              {error ? (
                <p className="rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm font-bold text-red-400" role="alert">
                  {error}
                </p>
              ) : null}

              <button
                type="submit"
                disabled={loading}
                className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-brand-gold py-4 text-base font-black text-brand-navy-deep shadow-xl shadow-brand-gold/10 transition hover:bg-white hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-5 w-5 shrink-0 animate-spin" aria-hidden />
                    Création en cours…
                  </>
                ) : (
                  "Créer mon compte"
                )}
              </button>
            </form>

            <div className="mt-8 text-center text-sm font-bold">
              <Link href={`/login?next=${encodeURIComponent(next)}`} className="inline-flex items-center gap-2 text-brand-gold hover:text-white transition-colors underline decoration-brand-gold/30 underline-offset-4">
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
