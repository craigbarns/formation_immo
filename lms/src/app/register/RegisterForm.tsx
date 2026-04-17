"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Loader2, Lock, Mail, User, Sparkles, ArrowLeft } from "lucide-react";
import { signup } from "@/app/actions/auth";

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  async function handleSubmit(formData: FormData) {
    setLoading(true);
    await signup(formData);
    setLoading(false);
  }

  return (
    <div className="formation-canvas relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-navy/10 bg-white/80 px-4 py-1.5 text-xs font-semibold text-brand-navy shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-brand-gold" aria-hidden />
            Nouveau sur la plateforme
          </p>

          <div className="mt-5 flex justify-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-navy text-3xl shadow-lg ring-1 ring-brand-navy/20">
              🏛️
            </div>
          </div>

          <h1 className="mt-4 text-2xl font-bold tracking-tight text-brand-navy md:text-3xl">
            Créer votre compte
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600">
            Inscrivez-vous pour accéder à la formation 42 h et suivre votre progression.
          </p>
        </div>

        <div className="card-elevated overflow-hidden rounded-3xl border-brand-navy/10">
          <div className="h-1.5 bg-gradient-to-r from-brand-gold via-brand-navy-soft to-brand-navy" aria-hidden />
          <div className="p-8">
            <form action={handleSubmit} className="space-y-5" aria-busy={loading}>
              <div>
                <label htmlFor="full_name" className="mb-2 flex items-center gap-2 text-sm font-semibold text-zinc-800">
                  <User className="h-4 w-4 text-brand-navy/70" aria-hidden />
                  Nom complet
                </label>
                <input
                  id="full_name"
                  name="full_name"
                  type="text"
                  autoComplete="name"
                  required
                  className="link-focus w-full rounded-xl border border-zinc-200 bg-zinc-50/80 px-4 py-3.5 text-zinc-900 placeholder:text-zinc-400"
                  placeholder="Jean Dupont"
                />
              </div>

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
                  autoComplete="new-password"
                  required
                  minLength={6}
                  className="link-focus w-full rounded-xl border border-zinc-200 bg-zinc-50/80 px-4 py-3.5 text-zinc-900 placeholder:text-zinc-400"
                  placeholder="••••••••"
                />
                <p className="mt-1 text-xs text-zinc-500">Minimum 6 caractères</p>
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
                    Inscription…
                  </>
                ) : (
                  "Créer mon compte"
                )}
              </button>
            </form>

            <div className="mt-5 text-center text-sm">
              <Link href="/login" className="inline-flex items-center gap-1 font-semibold text-brand-navy hover:underline">
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
