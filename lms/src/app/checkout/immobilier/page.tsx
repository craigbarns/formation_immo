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

import { StripeButton } from "@/components/StripeButton";

export default async function ImmobilierCheckoutPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <header className="border-b border-zinc-200 bg-white sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="MonPassFormation">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-navy text-white">
              <GraduationCap className="h-5 w-5" aria-hidden />
            </span>
            <span className="text-lg font-black text-brand-navy">
              MonPass<span className="text-brand-gold">Formation</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-bold text-zinc-600 transition hover:text-brand-navy"
            >
              Déjà un compte ? Connexion
            </Link>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-6 lg:grid-cols-[1fr_400px] lg:px-8 lg:py-16">
        <div className="space-y-8">
          <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-xl">
            <div className="relative aspect-[21/9] bg-zinc-200">
              <Image
                src={coverImage}
                alt="Formation Agent Immobilier"
                fill
                priority
                sizes="(min-width: 1024px) 65vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="inline-flex items-center gap-2 rounded-full bg-brand-gold px-3 py-1 text-[10px] font-black uppercase text-brand-navy">
                  <Sparkles className="h-3.5 w-3.5" />
                  Conforme Loi ALUR 2026
                </p>
                <h1 className="mt-3 text-3xl font-black md:text-4xl">Formation Agent Immobilier</h1>
              </div>
            </div>
            <div className="p-8">
              <p className="text-lg leading-relaxed text-zinc-600">
                Maîtrisez les 5 piliers du métier : juridique, transaction, financement, marketing et terrain. Un parcours certifiant de 42h conçu pour les professionnels exigeants.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  "Accès immédiat 24h/24",
                  "36 leçons interactives",
                  "Scripts & Outils terrain",
                  "Certification MasterClass",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-2xl border border-zinc-100 bg-zinc-50/50 p-4">
                    <CheckCircle2 className="h-6 w-6 text-emerald-600" />
                    <span className="text-sm font-bold text-zinc-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-brand-gold/20 bg-brand-gold/5 p-8">
            <h2 className="text-xl font-black text-brand-navy uppercase tracking-tight flex items-center gap-2">
              <ShieldCheck className="h-6 w-6 text-brand-gold" />
              Comment ça marche ?
            </h2>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              {[
                { step: "01", title: "Paiement", desc: "Réglez par CB via l'interface Stripe sécurisée." },
                { step: "02", title: "Compte", desc: "Créez votre accès après le paiement validé." },
                { step: "03", title: "Formation", desc: "Accédez directement à vos 5 modules." },
              ].map((item) => (
                <div key={item.step}>
                  <p className="text-2xl font-black text-brand-gold/40">{item.step}</p>
                  <h3 className="mt-1 font-black text-brand-navy uppercase text-xs">{item.title}</h3>
                  <p className="mt-2 text-sm text-zinc-600 leading-snug">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-2xl lg:sticky lg:top-24">
            <p className="text-xs font-black uppercase tracking-widest text-brand-gold">Tarif Unique</p>
            <div className="mt-4 flex items-baseline gap-2 border-b border-zinc-100 pb-8">
              <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-navy">299€</span>
              <span className="text-sm font-bold text-zinc-400">TTC</span>
            </div>

            <div className="mt-8 space-y-6">
              <StripeButton formationId="immobilier" label="Acheter maintenant" />
              
              <div className="space-y-4 pt-4">
                <div className="flex gap-4">
                  <Lock className="h-5 w-5 shrink-0 text-brand-gold" />
                  <p className="text-xs font-medium leading-relaxed text-zinc-500">
                    Transaction sécurisée par **Stripe**. Vos données bancaires ne transitent jamais par nos serveurs.
                  </p>
                </div>
                <div className="flex gap-4">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-600" />
                  <p className="text-xs font-medium leading-relaxed text-zinc-500">
                    **Accès à vie** incluant les mises à jour réglementaires Loi ALUR 2026.
                  </p>
                </div>
              </div>
            </div>

            {user && (
              <div className="mt-8 rounded-2xl bg-zinc-50 p-4 border border-zinc-100">
                <p className="text-[10px] font-black uppercase text-zinc-400">Vous êtes connecté</p>
                <p className="mt-1 text-sm font-bold text-zinc-700 truncate">{user.email}</p>
                <Link href="/formation" className="mt-3 inline-flex items-center gap-2 text-xs font-black text-brand-navy hover:underline">
                  Aller directement à ma formation <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            )}
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-zinc-50 p-6 text-center">
            <p className="text-xs font-bold text-zinc-500">Besoin d&apos;un devis CPF ou OPCO ?</p>
            <a href="tel:0954467773" className="mt-2 block text-sm font-black text-brand-navy hover:text-brand-gold transition-colors">
              09 54 46 77 73
            </a>
          </div>
        </aside>
      </section>
    </main>
  );
}
