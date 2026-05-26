"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Loader2, Lock, Mail, Sparkles, Home, ClipboardList, Scale, Briefcase, Building2, CircleDollarSign, Handshake } from "lucide-react";
import { login, resetPassword } from "@/app/actions/auth";

export default function LoginForm() {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const message = searchParams.get("message");
  const next = searchParams.get("next") ?? "/formation";
  const isReset = searchParams.get("reset") === "1";

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    await login(formData);
    setLoading(false);
  }

  async function handleReset(formData: FormData) {
    setLoading(true);
    await resetPassword(formData);
    setLoading(false);
  }

  return (
    <div className="formation-canvas relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12">
      <style>{`
        @keyframes floatIcon {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.1; }
          50% { transform: translateY(-14px) rotate(6deg); opacity: 0.15; }
        }
        @keyframes floatIcon2 {
          0%, 100% { transform: translateY(0px) rotate(-4deg); opacity: 0.08; }
          50% { transform: translateY(-10px) rotate(4deg); opacity: 0.12; }
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

      <span className="pointer-events-none float-icon-1 fixed left-[6%] top-[12%] select-none text-brand-gold/20" aria-hidden><Home className="h-12 w-12" /></span>
      <span className="pointer-events-none float-icon-2 fixed left-[12%] bottom-[18%] select-none text-brand-gold/20" aria-hidden><ClipboardList className="h-10 w-10" /></span>
      <span className="pointer-events-none float-icon-3 fixed right-[8%] top-[20%] select-none text-brand-gold/20" aria-hidden><Scale className="h-12 w-12" /></span>
      <span className="pointer-events-none float-icon-4 fixed right-[14%] bottom-[14%] select-none text-brand-gold/20" aria-hidden><Briefcase className="h-10 w-10" /></span>

      <div className="login-card w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-brand-navy-hero px-4 py-1.5 text-xs font-bold text-brand-gold shadow-lg">
            <Sparkles className="h-3.5 w-3.5 text-brand-gold" aria-hidden />
            Espace réservé aux inscrits
          </p>

          <div className="mt-5 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-gold shadow-[0_0_20px_rgba(212,175,55,0.3)]">
              <Building2 className="h-8 w-8 text-brand-navy-deep" />
            </div>
          </div>

          <h1 className="mt-5 text-3xl font-black tracking-tight text-slate-900 dark:text-white md:text-4xl">
            Accédez à votre formation
          </h1>
          <p className="mt-3 text-base font-medium leading-relaxed text-slate-600 dark:text-white/80">
            Connectez-vous pour retrouver l&apos;intégralité du parcours 42 h
            et suivre votre progression sur tous vos appareils.
          </p>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-white/20 bg-[#0a1224] shadow-2xl backdrop-blur-2xl">
          <div className="h-1.5 bg-gradient-to-r from-brand-gold/40 via-brand-gold to-brand-gold/40" aria-hidden />
          <div className="p-8 sm:p-10">
            {isReset ? (
              <form action={handleReset} className="space-y-6" aria-busy={loading}>
                <div>
                  <p className="mb-4 text-sm font-medium text-white/70">
                    Entrez votre email — vous recevrez un lien pour réinitialiser votre mot de passe.
                  </p>
                  <label htmlFor="reset-email" className="mb-2.5 flex items-center gap-2 text-sm font-bold text-white">
                    <Mail className="h-4 w-4 text-brand-gold" aria-hidden />
                    Email
                  </label>
                  <input
                    id="reset-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-white placeholder:text-zinc-500 focus:border-brand-gold/50 focus:outline-none focus:ring-4 focus:ring-brand-gold/10 transition-all"
                    placeholder="votre@email.com"
                  />
                </div>

                {error && (
                  <p className="rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm font-bold text-red-400" role="alert">{error}</p>
                )}
                {message && (
                  <p className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-4 py-3 text-sm font-bold text-emerald-400" role="status">{message}</p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="inline-flex w-full items-center justify-center gap-3 rounded-xl bg-brand-gold py-4 text-base font-black text-brand-navy-deep shadow-xl transition hover:bg-white hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
                >
                  {loading ? <><Loader2 className="h-5 w-5 animate-spin" />Envoi…</> : "Envoyer le lien"}
                </button>

                <div className="text-center">
                  <Link href="/login" className="text-sm text-white/50 hover:text-white transition-colors">
                    ← Retour à la connexion
                  </Link>
                </div>
              </form>
            ) : (
            <><form action={handleSubmit} className="space-y-6" aria-busy={loading}>
              <input type="hidden" name="next" value={next} />

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
                  placeholder="votre@email.com"
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
                  autoComplete="current-password"
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-4 text-white placeholder:text-zinc-500 focus:border-brand-gold/50 focus:outline-none focus:ring-4 focus:ring-brand-gold/10 transition-all"
                  placeholder="••••••••"
                />
              </div>

              {error ? (
                <p className="rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-sm font-bold text-red-400" role="alert">
                  {error}
                </p>
              ) : null}

              {message ? (
                <p className="rounded-xl bg-emerald-500/10 border border-emerald-500/30 px-4 py-3 text-sm font-bold text-emerald-400" role="status">
                  {message}
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
                    Connexion en cours…
                  </>
                ) : (
                  "Entrer dans l'espace formation"
                )}
              </button>
            </form>

            <div className="mt-6 flex flex-col gap-4 text-center">
              <div className="flex items-center justify-end text-sm font-bold">
                <Link href="/login?reset=1" className="text-white/60 hover:text-white transition-colors">
                  Mot de passe oublié ?
                </Link>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-white/5 bg-white/[0.03] p-5">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/75 mb-4 text-center">
                Au programme de votre formation
              </p>
              <ul className="space-y-3">
                {[
                  { Icon: Scale, text: "Juridique & ALUR 2026" },
                  { Icon: CircleDollarSign, text: "Financement & fiscalité" },
                  { Icon: Handshake, text: "Techniques de vente" },
                ].map(({ Icon, text }) => (
                  <li key={text} className="flex items-center gap-3 text-sm font-bold text-white/90">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-brand-gold/10 text-brand-gold" aria-hidden><Icon className="h-3.5 w-3.5" /></span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            <p className="mt-8 text-center">
              <Link href="/" className="text-xs font-black uppercase tracking-widest text-white/75 hover:text-brand-gold transition-colors">
                ← Retour à l&apos;accueil
              </Link>
            </p>
            </>)}
          </div>
        </div>

        <p className="mt-8 text-center text-sm font-bold italic text-slate-400 dark:text-white/75">
          &ldquo;Votre réussite dans l&apos;immobilier commence ici.&rdquo;
        </p>
      </div>
    </div>
  );
}
