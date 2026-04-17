"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Loader2, Lock, Mail, Sparkles, UserPlus } from "lucide-react";
import { login } from "@/app/actions/auth";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const message = searchParams.get("message");

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    await login(formData);
    setLoading(false);
  }

  return (
    <div className="formation-canvas relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12">
      <style>{`
        @keyframes floatIcon {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.18; }
          50% { transform: translateY(-14px) rotate(6deg); opacity: 0.28; }
        }
        @keyframes floatIcon2 {
          0%, 100% { transform: translateY(0px) rotate(-4deg); opacity: 0.14; }
          50% { transform: translateY(-10px) rotate(4deg); opacity: 0.22; }
        }
        @keyframes fadeInCard {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .float-icon-1 { animation: floatIcon 5s ease-in-out infinite; }
        .float-icon-2 { animation: floatIcon2 6.5s ease-in-out 1s infinite; }
        .float-icon-3 { animation: floatIcon 7s ease-in-out 2.5s infinite; }
        .float-icon-4 { animation: floatIcon2 5.5s ease-in-out 0.5s infinite; }
        .login-card { animation: fadeInCard 0.6s ease-out forwards; }
      `}</style>

      <span className="pointer-events-none float-icon-1 fixed left-[6%] top-[12%] select-none text-5xl" aria-hidden>🏠</span>
      <span className="pointer-events-none float-icon-2 fixed left-[12%] bottom-[18%] select-none text-4xl" aria-hidden>📋</span>
      <span className="pointer-events-none float-icon-3 fixed right-[8%] top-[20%] select-none text-5xl" aria-hidden>⚖️</span>
      <span className="pointer-events-none float-icon-4 fixed right-[14%] bottom-[14%] select-none text-4xl" aria-hidden>💼</span>

      <div className="login-card w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-navy/10 bg-white/80 px-4 py-1.5 text-xs font-semibold text-brand-navy shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-brand-gold" aria-hidden />
            Espace réservé aux inscrits
          </p>

          <div className="mt-5 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-navy text-3xl shadow-lg ring-1 ring-brand-navy/20">
              🏛️
            </div>
          </div>

          <h1 className="mt-4 text-2xl font-bold tracking-tight text-brand-navy md:text-3xl">
            Accédez à votre formation
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">
            Connectez-vous pour retrouver l&apos;intégralité du parcours 42 h
            et suivre votre progression sur tous vos appareils.
          </p>
        </div>

        <div className="card-elevated overflow-hidden rounded-3xl border-brand-navy/10">
          <div className="h-1.5 bg-gradient-to-r from-brand-navy via-brand-navy-soft to-brand-gold" aria-hidden />
          <div className="p-8">
            <form action={handleSubmit} className="space-y-5" aria-busy={loading}>
              <div>
                <label htmlFor="email" className="mb-2 flex items-center gap-2 text-sm font-semibold text-zinc-800">
                  <Mail className="h-4 w-4 text-brand-navy/70" aria-hidden />
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="link-focus w-full rounded-xl border border-zinc-200 bg-zinc-50/80 px-4 py-3.5 text-zinc-900 placeholder:text-zinc-400"
                  placeholder="vous@exemple.com"
                />
              </div>

              <div>
                <label htmlFor="password" className="mb-2 flex items-center gap-2 text-sm font-semibold text-zinc-800">
                  <Lock className="h-4 w-4 text-brand-navy/70" aria-hidden />
                  Mot de passe
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="link-focus w-full rounded-xl border border-zinc-200 bg-zinc-50/80 px-4 py-3.5 text-zinc-900 placeholder:text-zinc-400"
                  placeholder="••••••••"
                />
              </div>

              {error ? (
                <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
                  {error}
                </p>
              ) : null}

              {message ? (
                <p className="rounded-lg bg-emerald-50 px-3 py-2 text-sm text-emerald-700" role="status">
                  {message}
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
                  "Entrer dans l'espace formation"
                )}
              </button>
            </form>

            <div className="mt-5 flex items-center justify-between text-sm">
              <Link href="/register" className="inline-flex items-center gap-1 font-semibold text-brand-navy hover:underline">
                <UserPlus className="h-4 w-4" />
                Créer un compte
              </Link>
              <Link href="/login?reset=1" className="text-zinc-500 hover:text-zinc-700">
                Mot de passe oublié ?
              </Link>
            </div>

            <div className="mt-7 rounded-2xl border border-brand-gold/25 bg-brand-gold-soft/60 px-5 py-4">
              <p className="text-xs font-bold uppercase tracking-wider text-brand-navy/70 mb-3">
                Ce que vous allez apprendre
              </p>
              <ul className="space-y-2">
                {[
                  { icon: "⚖️", text: "Juridique & ALUR" },
                  { icon: "💶", text: "Financement & fiscalité" },
                  { icon: "🤝", text: "Techniques de vente" },
                ].map(({ icon, text }) => (
                  <li key={text} className="flex items-center gap-2.5 text-sm font-medium text-brand-navy">
                    <span className="text-base" aria-hidden>{icon}</span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-6 text-center text-sm text-zinc-500">
              <Link href="/" className="font-semibold text-brand-navy underline-offset-4 hover:underline">
                ← Retour à l&apos;accueil
              </Link>
            </p>
          </div>
        </div>

        <p className="mt-6 text-center text-sm font-medium italic text-brand-navy/60">
          &ldquo;Votre réussite dans l&apos;immobilier commence ici.&rdquo;
        </p>
      </div>
    </div>
  );
}
