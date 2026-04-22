import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  CreditCard,
  GraduationCap,
  Lock,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Acheter la formation immobilière",
  description:
    "Finalisez votre inscription à la formation Agent Immobilier Loi ALUR 2026.",
};

const checkoutPath = "/checkout/immobilier";
const coverImage = "/generated/fal/transaction/cover-immobilier.jpg";

export default async function ImmobilierCheckoutPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <section className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="MonPassFormation">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-navy text-white">
              <GraduationCap className="h-5 w-5" aria-hidden />
            </span>
            <span className="text-lg font-black text-brand-navy">
              MonPass<span className="text-brand-gold">Formation</span>
            </span>
          </Link>
          <Link
            href="/login"
            className="text-sm font-bold text-zinc-600 transition hover:text-brand-navy"
          >
            Connexion
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-16">
        <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm">
          <div className="relative aspect-[16/9] bg-zinc-200">
            <Image
              src={coverImage}
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="p-6 sm:p-8">
            <p className="inline-flex items-center gap-2 rounded-lg bg-brand-gold/15 px-3 py-1.5 text-xs font-black uppercase text-brand-navy">
              <Sparkles className="h-4 w-4 text-brand-gold" aria-hidden />
              Formation disponible
            </p>
            <h1 className="mt-5 text-3xl font-black text-brand-navy sm:text-4xl">
              Formation Agent Immobilier
            </h1>
            <p className="mt-4 text-base leading-7 text-zinc-600">
              Accédez au parcours complet Loi ALUR 2026 : juridique, transaction,
              financement, marketing immobilier et terrain.
            </p>

            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "42h de formation",
                "36 leçons structurées",
                "5 modules professionnels",
                "QCM, supports et progression",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm font-semibold text-zinc-700">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="self-start rounded-lg border border-zinc-200 bg-white p-6 shadow-sm sm:p-8 lg:sticky lg:top-8">
          <p className="text-sm font-black uppercase text-brand-gold">Paiement sécurisé</p>
          <div className="mt-4 flex items-end justify-between border-b border-zinc-100 pb-6">
            <div>
              <p className="text-sm font-bold text-zinc-500">Accès complet</p>
              <p className="mt-1 text-5xl font-black text-brand-navy">299 €</p>
            </div>
            <CreditCard className="h-10 w-10 text-brand-navy" aria-hidden />
          </div>

          <div className="mt-6 space-y-3 text-sm text-zinc-600">
            <p className="flex gap-2">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
              Le paiement Stripe sera branché ici : confirmation automatique,
              facture et déblocage de l&apos;accès.
            </p>
            <p className="flex gap-2">
              <Lock className="mt-0.5 h-5 w-5 shrink-0 text-brand-navy" aria-hidden />
              La formation est maintenant protégée : il faut être connecté pour
              accéder au parcours.
            </p>
          </div>

          {user ? (
            <div className="mt-8 space-y-3">
              <p className="rounded-lg bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
                Compte connecté : {user.email}
              </p>
              <button
                type="button"
                disabled
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-zinc-200 px-6 py-3.5 text-base font-black text-zinc-500"
              >
                Paiement Stripe à connecter
              </button>
              <Link
                href="/formation"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-brand-navy px-6 py-3.5 text-base font-black text-brand-navy transition hover:bg-brand-navy hover:text-white"
              >
                Accéder à mon espace
                <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
            </div>
          ) : (
            <div className="mt-8 space-y-3">
              <Link
                href={`/register?next=${encodeURIComponent(checkoutPath)}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-navy px-6 py-3.5 text-base font-black text-white transition hover:bg-brand-navy-mid"
              >
                Créer mon compte
                <ArrowRight className="h-5 w-5" aria-hidden />
              </Link>
              <Link
                href={`/login?next=${encodeURIComponent(checkoutPath)}`}
                className="inline-flex w-full items-center justify-center rounded-lg border border-zinc-300 px-6 py-3.5 text-base font-black text-brand-navy transition hover:border-brand-navy hover:bg-zinc-50"
              >
                J&apos;ai déjà un compte
              </Link>
            </div>
          )}

          <p className="mt-5 text-xs leading-5 text-zinc-500">
            Prochaine étape technique : remplacer le bouton désactivé par la
            création de session Stripe Checkout, puis débloquer l&apos;accès via webhook.
          </p>
        </aside>
      </section>
    </main>
  );
}
