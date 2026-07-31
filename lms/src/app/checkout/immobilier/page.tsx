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
import { getPackPriceCents } from "@/data/catalog";
import { euros } from "@/lib/price";

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
export const metadata: Metadata = {
  title: "Acheter la formation immobilière",
  description:
    "Découvrez puis achetez la formation Agent Immobilier Loi ALUR : 45h, 40 leçons et 7 modules en ligne.",
  alternates: {
    canonical: "/formation-immobiliere-loi-alur",
  },
  robots: {
    index: false,
    follow: true,
  },
};

const coverImage = "/generated/fal/transaction/cover-immobilier.jpg";
const PASS_FORMATION_LOGO = "/images/pass-formation-logo.svg";

import { StripeButton } from "@/components/StripeButton";

export default function ImmobilierCheckoutPage() {
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
              href="https://app.monpassformation.com/login"
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
                <h1 className="mt-3 text-3xl font-black md:text-4xl">Formation Agent Immobilier — Loi ALUR 42h &amp; TRACFIN</h1>
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
            <div className="mt-4 flex flex-col border-b border-zinc-100 pb-6">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl sm:text-5xl lg:text-6xl font-black text-brand-navy">
                  {euros(getPackPriceCents())}
                </span>
                <span className="text-sm font-bold text-zinc-400">TTC</span>
              </div>
              <p className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-xl px-3 py-1.5 border border-emerald-200">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                Attestation officielle conforme Loi ALUR &amp; CCI
              </p>
            </div>

            <div className="mt-6 space-y-6">
              <StripeButton formationId="immobilier" label="Acheter maintenant" />
              
              <div className="space-y-3.5 pt-2">
                <div className="flex gap-3">
                  <Lock className="h-5 w-5 shrink-0 text-brand-gold" />
                  <p className="text-xs font-medium leading-relaxed text-zinc-600">
                    Paiement 100% sécurisé par <strong>Stripe</strong>. Cryptage SSL 256 bits.
                  </p>
                </div>
                <div className="flex gap-3">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                  <p className="text-xs font-medium leading-relaxed text-zinc-600">
                    <strong>Attestation 24h</strong> transmise à la validation des QCM pour la CCI.
                  </p>
                </div>
                <div className="flex gap-3">
                  <ShieldCheck className="h-5 w-5 shrink-0 text-brand-navy" />
                  <p className="text-xs font-medium leading-relaxed text-zinc-600">
                    <strong>Facture disponible</strong> immédiatement après votre commande.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-brand-gold/30 bg-gradient-to-br from-brand-gold/10 to-transparent p-4">
              <div className="flex items-center gap-2">
                <div className="flex text-amber-500">
                  {"★".repeat(5)}
                </div>
                <span className="text-xs font-black text-brand-navy">4.9 / 5</span>
              </div>
              <p className="mt-1 text-xs text-zinc-600 font-medium">
                &ldquo;Attestation reçue le lendemain, dossier CCI validé sans souci !&rdquo;
              </p>
              <p className="mt-1 text-[11px] font-bold text-zinc-400">— Thomas L., Négociateur à Lyon</p>
            </div>
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

      <section className="mx-auto mt-16 max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-zinc-200 bg-white p-7 shadow-sm sm:p-10">
          <p className="text-xs font-black uppercase tracking-[0.2em] text-brand-gold">
            Ressources Loi ALUR
          </p>
          <h2 className="mt-3 max-w-3xl text-2xl font-black text-brand-navy sm:text-3xl">
            Vérifiez vos obligations avant de démarrer
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-zinc-600">
            Nos guides s&apos;appuient sur les textes Légifrance et les informations de CCI France
            pour expliquer les 42 heures obligatoires et le renouvellement de la carte
            professionnelle.
          </p>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            <Link
              href="/guides/formation-loi-alur-42-heures"
              className="group rounded-2xl border border-zinc-200 bg-zinc-50 p-5 transition hover:border-brand-gold/60 hover:bg-white hover:shadow-md"
            >
              <h3 className="font-black text-brand-navy">
                Formation Loi ALUR : le guide des 42 heures
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Durée, personnes concernées, déontologie et justificatifs.
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-brand-navy">
                Lire le guide
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
            <Link
              href="/guides/renouvellement-carte-professionnelle-immobilier"
              className="group rounded-2xl border border-zinc-200 bg-zinc-50 p-5 transition hover:border-brand-gold/60 hover:bg-white hover:shadow-md"
            >
              <h3 className="font-black text-brand-navy">
                Renouvellement de la carte professionnelle
              </h3>
              <p className="mt-2 text-sm leading-6 text-zinc-600">
                Délai, formation continue et préparation du dossier CCI.
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-brand-navy">
                Voir la checklist
                <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden />
              </span>
            </Link>
          </div>
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

      <footer className="border-t border-zinc-200 bg-white px-5 py-8 text-center">
        <nav
          aria-label="Informations légales"
          className="flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm font-bold text-zinc-600"
        >
          <Link href="/" className="hover:text-brand-navy">
            Accueil
          </Link>
          <Link href="/cgv" className="hover:text-brand-navy">
            Conditions générales de vente
          </Link>
          <Link href="/mentions-legales" className="hover:text-brand-navy">
            Mentions légales
          </Link>
          <Link href="/accessibilite-psh" className="hover:text-brand-navy">
            Accessibilité
          </Link>
        </nav>
      </footer>
    </main>
  );
}
