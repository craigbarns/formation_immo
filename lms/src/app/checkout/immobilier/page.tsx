import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  DoorOpen,
  Handshake,
  Lock,
  Mail,
  Megaphone,
  Phone,
  PiggyBank,
  Scale,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const PROGRAMME_MODULES = [
  {
    number: "01",
    icon: Scale,
    title: "Juridique & conformité",
    summary: "Loi ALUR 2026, compromis, diagnostics, mandats, copropriété, TRACFIN, baux d'habitation.",
    lessons: 8,
  },
  {
    number: "02",
    icon: Handshake,
    title: "Transaction & négociation",
    summary: "Estimation, prospection, négociation avancée, CRM, offre d'achat, acte authentique.",
    lessons: 7,
  },
  {
    number: "03",
    icon: PiggyBank,
    title: "Financement & fiscalité",
    summary: "Crédit, fiscalité, rentabilité, assurances, dispositifs avancés.",
    lessons: 5,
  },
  {
    number: "04",
    icon: Megaphone,
    title: "Marketing digital",
    summary: "Photos pro, annonces, portails, réseaux sociaux, SEO, vidéo, personal branding.",
    lessons: 7,
  },
  {
    number: "05",
    icon: DoorOpen,
    title: "Visite, closing & fidélisation",
    summary: "Visites, argumentaire, closing, promesse, fidélisation, découverte client.",
    lessons: 6,
  },
  {
    number: "06",
    icon: BookOpen,
    title: "Déontologie & éthique professionnelle",
    summary: "Code de déontologie, non-discrimination, conflits d'intérêts, éthique pratique.",
    lessons: 4,
  },
  {
    number: "07",
    icon: Scale,
    title: "TRACFIN & LCB-FT — Lutte anti-blanchiment",
    summary: "Cadre légal LCB-FT, vigilance client, bénéficiaire effectif, déclaration de soupçon à TRACFIN.",
    lessons: 3,
  },
];
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Acheter la formation immobilière",
  description:
    "Finalisez votre inscription à la formation Agent Immobilier Loi ALUR 2026.",
};

const coverImage = "/generated/fal/transaction/cover-immobilier.jpg";
const PASS_FORMATION_LOGO = "/images/pass-formation-logo.svg";

import { StripeButton } from "@/components/StripeButton";

export default async function ImmobilierCheckoutPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <main className="min-h-screen bg-zinc-50 text-zinc-950">
      <header className="border-b border-zinc-200 bg-white sticky top-0 z-50">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center" aria-label="PASS Formation">
            <Image
              src={PASS_FORMATION_LOGO}
              alt="PASS Formation"
              width={140}
              height={61}
              priority
              className="h-12 w-auto"
            />
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
                Maîtrisez les 5 piliers du métier : juridique, transaction, financement, marketing et terrain, complétés par la déontologie et TRACFIN. Un parcours certifiant de 45h conçu pour les professionnels exigeants.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {[
                  "Accès immédiat 24h/24",
                  "40 leçons interactives",
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
                { step: "03", title: "Formation", desc: "Accédez directement à vos 7 modules." },
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
        </aside>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-gold">
            Programme complet
          </p>
          <h2 className="mx-auto mt-3 max-w-3xl text-3xl font-black leading-tight text-brand-navy sm:text-4xl">
            7 modules · 40 leçons · 45h de formation
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-zinc-600">
            Un parcours structuré couvrant l&apos;ensemble du métier d&apos;agent immobilier, de la conformité juridique à l&apos;éthique professionnelle.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMME_MODULES.map((mod) => {
            const Icon = mod.icon;
            return (
              <div
                key={mod.number}
                className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-brand-gold/40 hover:shadow-xl"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy text-brand-gold">
                    <Icon className="h-6 w-6" aria-hidden />
                  </span>
                  <span className="text-3xl font-black text-brand-gold/30 leading-none">
                    {mod.number}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-black uppercase tracking-tight text-brand-navy">
                  {mod.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600">
                  {mod.summary}
                </p>
                <div className="mt-5 flex items-center gap-2 border-t border-zinc-100 pt-4 text-xs font-bold text-zinc-500">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  {mod.lessons} leçons interactives
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="mt-16 rounded-3xl bg-brand-navy px-6 py-16 text-center sm:px-12 md:py-20">
        <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-gold">
          Besoin d&apos;un renseignement ?
        </p>
        <h2 className="mx-auto mt-4 max-w-4xl text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
          Parlez à PASS Formation avant de démarrer
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-relaxed text-white/70 sm:text-base">
          Pour une question sur le financement, l&apos;accessibilité, l&apos;achat en ligne ou l&apos;organisation de la formation, contactez l&apos;équipe.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="tel:0954467773"
            className="inline-flex items-center gap-3 rounded-2xl bg-brand-gold px-6 py-4 text-base font-black text-brand-navy shadow-lg transition-transform hover:scale-[1.02]"
          >
            <Phone className="h-5 w-5" />
            09 54 46 77 73
          </a>
          <a
            href="mailto:contact@passformation.com"
            className="inline-flex items-center gap-3 rounded-2xl border border-white/20 px-6 py-4 text-base font-black text-white transition-colors hover:border-brand-gold hover:text-brand-gold"
          >
            <Mail className="h-5 w-5" />
            contact@passformation.com
          </a>
        </div>
      </section>
    </main>
  );
}
