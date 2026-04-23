import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import {
  ArrowRight,
  BookOpen,
  Briefcase,
  Building2,
  CheckCircle2,
  Clock,
  CreditCard,
  FileCheck2,
  FileText,
  GraduationCap,
  HandCoins,
  Headphones,
  Mail,
  Phone,
  ShieldCheck,
  Star,
  Users,
  type LucideIcon,
} from "lucide-react";

const DOMAIN = "https://www.monpassformation.com";
const IMMOBILIER_COVER = "/generated/fal/transaction/cover-immobilier.jpg";
const IMMOBILIER_CHECKOUT = "/checkout/immobilier";

export const metadata: Metadata = {
  metadataBase: new URL(DOMAIN),
  title: "MonPassFormation | Formation immobilière Loi ALUR en ligne",
  description:
    "Formation immobilière en ligne conforme Loi ALUR 2026 : 42h, 36 leçons, QCM, supports et accès apprenant. Une plateforme digitale par PASS Formation.",
  keywords: [
    "MonPassFormation",
    "PASS Formation",
    "formation immobilière",
    "formation Loi ALUR",
    "formation agent immobilier",
    "formation en ligne",
    "OPCO",
    "CPF",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "MonPassFormation | Formation immobilière Loi ALUR en ligne",
    description:
      "Le nouvel espace digital PASS Formation pour suivre une formation immobilière claire, pratique et accessible en ligne.",
    url: DOMAIN,
    siteName: "MonPassFormation",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: IMMOBILIER_COVER,
        width: 1024,
        height: 576,
        alt: "Formation immobilière en ligne",
      },
    ],
  },
};

type Formation = {
  id: string;
  title: string;
  label: string;
  description: string;
  image: string;
  icon: LucideIcon;
  duration: string;
  lessons: string;
  status: string;
  price: string;
  accent: string;
  href?: string;
  available?: boolean;
};

const activeFormation = {
  title: "Formation Agent Immobilier",
  subtitle: "42h pour consolider vos obligations Loi ALUR et vos réflexes terrain",
  image: IMMOBILIER_COVER,
  href: IMMOBILIER_CHECKOUT,
  price: "299 €",
  bullets: [
    "5 modules : juridique, transaction, financement, marketing et terrain",
    "36 leçons structurées avec QCM, supports et exercices pratiques",
    "Contenus pensés pour les professionnels de l'immobilier et leurs équipes",
    "Attestation de suivi et espace apprenant personnel",
  ],
};

const formations: Formation[] = [
  {
    id: "immobilier",
    title: "Formation Agent Immobilier",
    label: "Disponible maintenant",
    description:
      "Le parcours complet : cadre juridique, transaction, financement, marketing immobilier et closing terrain.",
    image: IMMOBILIER_COVER,
    icon: Building2,
    duration: "42h",
    lessons: "36 leçons",
    status: "Loi ALUR 2026",
    price: "299 €",
    accent: "#1a3a5c",
    href: IMMOBILIER_CHECKOUT,
    available: true,
  },
  {
    id: "management",
    title: "Management commercial",
    label: "Prochainement",
    description:
      "Un futur module pour structurer une équipe, suivre la performance et installer des rituels commerciaux efficaces.",
    image: "/generated/fal/terrain/cover.jpg",
    icon: Users,
    duration: "20h",
    lessons: "15 leçons",
    status: "En préparation",
    price: "À venir",
    accent: "#0f766e",
  },
  {
    id: "marketing",
    title: "Marketing digital",
    label: "Prochainement",
    description:
      "Un futur parcours pour améliorer la visibilité, les contenus, les réseaux sociaux et les campagnes d'acquisition.",
    image: "/generated/fal/marketing/cover.jpg",
    icon: Briefcase,
    duration: "25h",
    lessons: "20 leçons",
    status: "En préparation",
    price: "À venir",
    accent: "#b45309",
  },
];

const proofPoints = [
  {
    value: "+2000",
    label: "apprenants formés en 2023",
  },
  {
    value: "4,9/5",
    label: "taux de satisfaction annoncé",
  },
  {
    value: "42h",
    label: "formation immobilière",
  },
  {
    value: "CPF / OPCO",
    label: "financements à étudier",
  },
];

const salesBenefits = [
  {
    icon: ShieldCheck,
    title: "Conforme Loi ALUR",
    text: "Un parcours pensé pour les professionnels de l'immobilier qui doivent maintenir leurs compétences à jour.",
  },
  {
    icon: Clock,
    title: "À votre rythme",
    text: "Accès en ligne, progression personnelle, leçons courtes et reprise possible dès que vous avez du temps.",
  },
  {
    icon: BookOpen,
    title: "Outils concrets",
    text: "QCM, fiches, simulateurs, scripts et supports pratiques pour passer rapidement de la théorie au terrain.",
  },
  {
    icon: Headphones,
    title: "Accompagnement",
    text: "Un espace apprenant clair avec support pédagogique et possibilité de contacter l'équipe PASS Formation.",
  },
];

const documents = [
  {
    icon: FileText,
    title: "Conditions générales de vente",
    href: "/cgv",
    text: "Prix, paiement, accès au contenu, rétractation et cadre contractuel.",
  },
  {
    icon: FileCheck2,
    title: "Mentions légales",
    href: "/mentions-legales",
    text: "Éditeur, hébergement, données personnelles et propriété intellectuelle.",
  },
  {
    icon: BookOpen,
    title: "Livret d'accueil",
    href: "/livret-accueil",
    text: "Informations pratiques pour comprendre le déroulement d'une formation.",
  },
  {
    icon: ShieldCheck,
    title: "Accessibilité PSH",
    href: "/accessibilite-psh",
    text: "Conditions d'accès et accompagnement des personnes en situation de handicap.",
  },
];

const faq = [
  {
    q: "La formation est-elle disponible tout de suite ?",
    a: "Oui, le module immobilier est déjà accessible. Quand Stripe sera branché, l'accès sera automatiquement ouvert après paiement validé.",
  },
  {
    q: "Le paiement Stripe est-il déjà actif ?",
    a: "Pas encore. La page est prête pour vendre, et le bouton pourra ensuite créer une session Stripe Checkout sécurisée.",
  },
  {
    q: "Puis-je demander une prise en charge CPF ou OPCO ?",
    a: "Les financements peuvent être étudiés selon votre situation. Le site principal PASS Formation met déjà en avant les possibilités CPF et OPCO.",
  },
  {
    q: "La formation remplace-t-elle la carte professionnelle ?",
    a: "Non. Elle accompagne la montée en compétence et la formation continue. Elle ne remplace pas les démarches administratives auprès des organismes compétents.",
  },
  {
    q: "Y a-t-il une attestation ?",
    a: "Oui, le parcours prévoit une attestation de suivi ou de fin de formation selon les conditions définies dans les documents contractuels.",
  },
];

const testimonials = [
  {
    name: "Thomas M.",
    role: "Agent indépendant",
    text: "Le parcours immobilier m'a permis de revoir les points juridiques essentiels et de structurer ma méthode commerciale.",
  },
  {
    name: "Sophie L.",
    role: "Conseillère immobilière",
    text: "La formation est claire, dense et directement utile. J'ai surtout gagné du temps sur les sujets ALUR et les QCM.",
  },
  {
    name: "Karim B.",
    role: "Responsable d'agence",
    text: "Le format par modules est pratique pour former une équipe et suivre progressivement la montée en compétence.",
  },
];

const VERCEL_APP_URL = "https://app.monpassformation.com";

export default async function HomePage() {
  // Redirection automatique pour le sous-domaine "app"
  const host = (await headers()).get("host");
  if (host === "app.monpassformation.com") {
    redirect("/formation");
  }

  return (
    <div className="min-h-screen bg-white text-zinc-950">
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3" aria-label="MonPassFormation">
            <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-navy text-white">
              <GraduationCap className="h-5 w-5" aria-hidden />
            </span>
            <span className="text-lg font-black text-brand-navy">
              MonPass<span className="text-brand-gold">Formation</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-semibold text-zinc-600 md:flex">
            <Link href="#formation-immobiliere" className="transition hover:text-brand-navy">
              Immobilier
            </Link>
            <Link href="#financement" className="transition hover:text-brand-navy">
              Financement
            </Link>
            <Link href="#documents" className="transition hover:text-brand-navy">
              Documents
            </Link>
            <Link href="#faq" className="transition hover:text-brand-navy">
              FAQ
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={`${VERCEL_APP_URL}/login`}
              className="hidden rounded-lg px-4 py-2 text-sm font-bold text-zinc-600 transition hover:bg-zinc-100 hover:text-brand-navy sm:inline-flex"
            >
              Connexion
            </Link>
            <Link
              href="#formation-immobiliere"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-navy px-4 py-2.5 text-sm font-black text-white transition hover:bg-brand-navy-mid"
            >
              Voir la formation
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>
      </header>

      <main>
        <section className="relative isolate overflow-hidden bg-zinc-950 text-white">
          <Image
            src={IMMOBILIER_COVER}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-65"
          />
          <div className="absolute inset-0 bg-zinc-950/70" aria-hidden />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-6 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-24">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-wide text-brand-gold">
                Espace digital PASS Formation
              </p>
              <h1 className="mt-5 text-5xl font-black leading-none sm:text-6xl lg:text-7xl">
                Formez-vous à l&apos;immobilier en ligne, sans perdre de temps
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/85 sm:text-xl">
                MonPassFormation centralise vos formations professionnelles. Premier module actif :
                une formation immobilière Loi ALUR de 42h, conçue pour progresser concrètement et
                suivre votre parcours à votre rythme.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="#formation-immobiliere"
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-gold px-6 py-3.5 text-base font-black text-brand-navy transition hover:bg-brand-gold-hover"
                >
                  Découvrir la formation
                  <ArrowRight className="h-5 w-5" aria-hidden />
                </Link>
                <a
                  href="tel:0954467773"
                  className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 py-3.5 text-base font-black text-white transition hover:bg-white hover:text-brand-navy"
                >
                  <Phone className="h-5 w-5" aria-hidden />
                  Être conseillé
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-3 text-sm font-bold text-white/80">
                {[
                  "Formation en ligne",
                  "Espace apprenant",
                  "Attestation",
                  "Paiement Stripe à venir",
                ].map((item) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-brand-gold" aria-hidden />
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-lg border border-white/15 bg-white p-6 text-zinc-950 shadow-2xl lg:self-end">
              <p className="text-sm font-black uppercase text-brand-gold">Formation disponible</p>
              <h2 className="mt-3 text-3xl font-black text-brand-navy">
                Agent immobilier - Loi ALUR 2026
              </h2>
              <p className="mt-3 text-sm leading-6 text-zinc-600">
                Un parcours complet pour revoir les fondamentaux réglementaires et commerciaux de
                l&apos;activité immobilière.
              </p>
              <dl className="mt-6 grid grid-cols-3 gap-3 text-center">
                {[
                  ["42h", "durée"],
                  ["36", "leçons"],
                  ["5", "modules"],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-lg bg-zinc-50 p-4">
                    <dt className="text-xs font-bold uppercase text-zinc-500">{label}</dt>
                    <dd className="mt-1 text-2xl font-black text-brand-navy">{value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 flex items-end justify-between border-t border-zinc-100 pt-5">
                <div>
                  <p className="text-xs font-bold uppercase text-zinc-500">Tarif affiché</p>
                  <p className="text-3xl font-black text-brand-navy">299 €</p>
                </div>
                <Link
                  href={IMMOBILIER_CHECKOUT}
                  className="inline-flex items-center gap-2 rounded-lg bg-brand-navy px-5 py-3 text-sm font-black text-white transition hover:bg-brand-navy-mid"
                >
                  Acheter
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-zinc-200 bg-white">
          <div className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-8">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {proofPoints.map((item) => (
                <div key={item.label} className="rounded-lg border border-zinc-200 p-5">
                  <p className="text-3xl font-black text-brand-navy">{item.value}</p>
                  <p className="mt-1 text-sm font-semibold text-zinc-600">{item.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 grid gap-5 rounded-lg border border-zinc-200 bg-zinc-50 p-5 md:grid-cols-[360px_1fr] md:items-center">
              <div className="overflow-hidden rounded-lg bg-white p-5 shadow-sm">
                <Image
                  src="/images/qualiopi-logo.webp"
                  alt="Qualiopi processus certifié République Française"
                  width={633}
                  height={338}
                  className="h-auto w-full"
                />
              </div>
              <div>
                <p className="text-sm font-black uppercase text-brand-gold">Certification qualité</p>
                <h2 className="mt-2 text-2xl font-black text-brand-navy">
                  Processus certifié Qualiopi
                </h2>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  PASS Formation met en avant un processus certifié Qualiopi. La certification
                  qualité a été délivrée au titre des actions de formation.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="formation-immobiliere" className="bg-zinc-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-zinc-200 shadow-xl">
                <Image
                  src={activeFormation.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover"
                />
              </div>

              <div>
                <p className="text-sm font-black uppercase text-brand-gold">
                  Formation immobilière
                </p>
                <h2 className="mt-3 text-4xl font-black leading-tight text-brand-navy sm:text-5xl">
                  {activeFormation.title}
                </h2>
                <p className="mt-4 text-lg leading-8 text-zinc-600">{activeFormation.subtitle}</p>

                <ul className="mt-7 space-y-3">
                  {activeFormation.bullets.map((item) => (
                    <li key={item} className="flex gap-3 text-sm leading-6 text-zinc-700">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 rounded-lg border border-zinc-200 bg-white p-5">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm font-bold uppercase text-zinc-500">
                        Accès complet au module
                      </p>
                      <p className="mt-1 text-3xl font-black text-brand-navy">
                        {activeFormation.price}
                      </p>
                      <p className="mt-1 text-sm text-zinc-500">
                        Paiement sécurisé Stripe activable à la prochaine étape.
                      </p>
                    </div>
                    <Link
                      href={activeFormation.href}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-navy px-6 py-3.5 text-base font-black text-white transition hover:bg-brand-navy-mid"
                    >
                      Acheter la formation
                      <ArrowRight className="h-5 w-5" aria-hidden />
                    </Link>
                  </div>
                </div>

                <p className="mt-4 text-xs leading-5 text-zinc-500">
                  Cette formation accompagne la montée en compétence professionnelle. Elle ne
                  remplace pas les démarches administratives nécessaires auprès des organismes
                  compétents.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-black uppercase text-brand-gold">Pourquoi choisir ce parcours</p>
              <h2 className="mt-3 text-3xl font-black text-brand-navy sm:text-4xl">
                Un format clair pour apprendre, suivre et valider
              </h2>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {salesBenefits.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="rounded-lg border border-zinc-200 p-6">
                    <Icon className="h-7 w-7 text-brand-gold" aria-hidden />
                    <h3 className="mt-4 text-lg font-black text-brand-navy">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-zinc-600">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section id="financement" className="bg-brand-navy py-16 text-white sm:py-20">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
            <div>
              <p className="text-sm font-black uppercase text-brand-gold">Financement et achat</p>
              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                Préparez la vente en ligne sans bloquer les demandes financées
              </h2>
              <p className="mt-4 text-base leading-7 text-white/75">
                Stripe servira au paiement carte bancaire. Pour les clients qui demandent une prise
                en charge CPF ou OPCO, le contact PASS Formation reste visible.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-white/15 bg-white/5 p-6">
                <CreditCard className="h-7 w-7 text-brand-gold" aria-hidden />
                <h3 className="mt-4 text-lg font-black">Paiement en ligne</h3>
                <p className="mt-2 text-sm leading-6 text-white/75">
                  Bouton Stripe Checkout à brancher plus tard pour ouvrir automatiquement l&apos;accès
                  après paiement validé.
                </p>
              </div>
              <div className="rounded-lg border border-white/15 bg-white/5 p-6">
                <HandCoins className="h-7 w-7 text-brand-gold" aria-hidden />
                <h3 className="mt-4 text-lg font-black">CPF / OPCO</h3>
                <p className="mt-2 text-sm leading-6 text-white/75">
                  Les possibilités de financement peuvent être étudiées avec un conseiller selon la
                  situation du client.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-zinc-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-black uppercase text-brand-gold">Catalogue</p>
              <h2 className="mt-3 text-3xl font-black text-brand-navy sm:text-4xl">
                Les autres modules arrivent ensuite
              </h2>
              <p className="mt-4 text-base leading-7 text-zinc-600">
                L&apos;immobilier reste la priorité commerciale. Les cartes suivantes préparent la
                plateforme à accueillir de nouvelles formations sans modifier la structure.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {formations.map((formation) => {
                const Icon = formation.icon;

                return (
                  <article
                    key={formation.id}
                    className="flex overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-sm"
                  >
                    <div className="flex min-w-0 flex-1 flex-col">
                      <div className="relative aspect-[16/10] bg-zinc-100">
                        <Image
                          src={formation.image}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-zinc-950/20" aria-hidden />
                        <span className="absolute left-4 top-4 rounded-lg bg-white px-3 py-1 text-xs font-black text-brand-navy shadow-sm">
                          {formation.label}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col p-6">
                        <div className="flex items-center gap-3">
                          <span
                            className="flex h-10 w-10 items-center justify-center rounded-lg text-white"
                            style={{ backgroundColor: formation.accent }}
                          >
                            <Icon className="h-5 w-5" aria-hidden />
                          </span>
                          <div>
                            <p className="text-xs font-bold uppercase text-zinc-500">
                              {formation.status}
                            </p>
                            <h3 className="text-xl font-black text-brand-navy">
                              {formation.title}
                            </h3>
                          </div>
                        </div>

                        <p className="mt-4 flex-1 text-sm leading-6 text-zinc-600">
                          {formation.description}
                        </p>

                        <div className="mt-5 flex flex-wrap gap-2 text-xs font-bold text-zinc-600">
                          <span className="rounded-lg bg-zinc-100 px-3 py-1.5">
                            {formation.duration}
                          </span>
                          <span className="rounded-lg bg-zinc-100 px-3 py-1.5">
                            {formation.lessons}
                          </span>
                          <span className="rounded-lg bg-zinc-100 px-3 py-1.5">
                            {formation.price}
                          </span>
                        </div>

                        <div className="mt-6 border-t border-zinc-100 pt-5">
                          {formation.available && formation.href ? (
                            <Link
                              href={formation.href}
                              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-brand-navy px-5 py-3 text-sm font-black text-white transition hover:bg-brand-navy-mid"
                            >
                              Acheter ce module
                              <ArrowRight className="h-4 w-4" aria-hidden />
                            </Link>
                          ) : (
                            <span className="inline-flex w-full items-center justify-center rounded-lg bg-zinc-100 px-5 py-3 text-sm font-black text-zinc-500">
                              Bientôt disponible
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section id="avis" className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-black uppercase text-brand-gold">Retours apprenants</p>
              <h2 className="mt-3 text-3xl font-black text-brand-navy sm:text-4xl">
                Une promesse simple : un parcours utilisable sur le terrain
              </h2>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <figure key={testimonial.name} className="rounded-lg border border-zinc-200 p-6">
                  <div className="flex gap-1 text-brand-gold" aria-label="5 étoiles">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="h-4 w-4 fill-current" aria-hidden />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-sm leading-6 text-zinc-700">
                    &ldquo;{testimonial.text}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 border-t border-zinc-100 pt-4">
                    <p className="font-black text-brand-navy">{testimonial.name}</p>
                    <p className="mt-1 text-sm text-zinc-500">{testimonial.role}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section id="documents" className="bg-zinc-50 py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
              <div>
                <p className="text-sm font-black uppercase text-brand-gold">Cadre qualité</p>
                <h2 className="mt-3 text-3xl font-black text-brand-navy sm:text-4xl">
                  Les documents utiles sont accessibles avant l&apos;achat
                </h2>
                <p className="mt-4 text-base leading-7 text-zinc-600">
                  Comme sur le site principal PASS Formation, les informations légales et
                  pédagogiques restent visibles : CGV, mentions légales, livret d&apos;accueil,
                  règlement et accessibilité.
                </p>
                <div className="mt-6 max-w-sm overflow-hidden rounded-lg border border-zinc-200 bg-white p-5 shadow-sm">
                  <Image
                    src="/images/qualiopi-logo.webp"
                    alt="Qualiopi processus certifié République Française"
                    width={633}
                    height={338}
                    className="h-auto w-full"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {documents.map((document) => {
                  const Icon = document.icon;

                  return (
                    <Link
                      key={document.title}
                      href={document.href}
                      className="rounded-lg border border-zinc-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg"
                    >
                      <Icon className="h-7 w-7 text-brand-gold" aria-hidden />
                      <h3 className="mt-4 text-lg font-black text-brand-navy">
                        {document.title}
                      </h3>
                      <p className="mt-2 text-sm leading-6 text-zinc-600">{document.text}</p>
                    </Link>
                  );
                })}
                <Link
                  href="/reglement-interieur"
                  className="rounded-lg border border-zinc-200 bg-white p-6 transition hover:-translate-y-1 hover:shadow-lg sm:col-span-2"
                >
                  <FileCheck2 className="h-7 w-7 text-brand-gold" aria-hidden />
                  <h3 className="mt-4 text-lg font-black text-brand-navy">
                    Règlement intérieur
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">
                    Règles applicables aux apprenants, discipline, sécurité et cadre de formation.
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="faq" className="bg-white py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-black uppercase text-brand-gold">Questions fréquentes</p>
              <h2 className="mt-3 text-3xl font-black text-brand-navy sm:text-4xl">
                Les réponses avant de s&apos;inscrire
              </h2>
            </div>

            <div className="mt-10 space-y-4">
              {faq.map((item) => (
                <div key={item.q} className="rounded-lg border border-zinc-200 p-6">
                  <h3 className="text-lg font-black text-brand-navy">{item.q}</h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-600">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-brand-navy py-16 text-white sm:py-20">
          <div className="mx-auto max-w-5xl px-5 text-center sm:px-6 lg:px-8">
            <p className="text-sm font-black uppercase text-brand-gold">
              Besoin d&apos;un renseignement ?
            </p>
            <h2 className="mt-3 text-3xl font-black sm:text-4xl">
              Parlez à PASS Formation avant de démarrer
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-white/75">
              Pour une question sur le financement, l&apos;accessibilité, l&apos;achat en ligne ou
              l&apos;organisation de la formation, contactez l&apos;équipe.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href="tel:0954467773"
                className="inline-flex items-center gap-2 rounded-lg bg-brand-gold px-6 py-3.5 text-base font-black text-brand-navy transition hover:bg-brand-gold-hover"
              >
                <Phone className="h-5 w-5" aria-hidden />
                09 54 46 77 73
              </a>
              <a
                href="mailto:contact@passformation.com"
                className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-6 py-3.5 text-base font-black text-white transition hover:bg-white hover:text-brand-navy"
              >
                <Mail className="h-5 w-5" aria-hidden />
                contact@passformation.com
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 bg-white">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-10 sm:px-6 md:grid-cols-[1.2fr_0.8fr_0.8fr_0.8fr] lg:px-8">
          <div>
            <Link href="/" className="flex items-center gap-3" aria-label="MonPassFormation">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-navy text-white">
                <GraduationCap className="h-5 w-5" aria-hidden />
              </span>
              <span className="text-lg font-black text-brand-navy">
                MonPass<span className="text-brand-gold">Formation</span>
              </span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-6 text-zinc-600">
              Espace digital de formation professionnelle. PASS Formation, 6 rue Maurice Caunes,
              31200 Toulouse.
            </p>
          </div>

          <div>
            <h3 className="font-black text-brand-navy">Formations</h3>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600">
              <li>
                <Link href={IMMOBILIER_CHECKOUT} className="transition hover:text-brand-navy">
                  Formation immobilière
                </Link>
              </li>
              <li>Management commercial</li>
              <li>Marketing digital</li>
            </ul>
          </div>

          <div>
            <h3 className="font-black text-brand-navy">Documents</h3>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600">
              <li>
                <Link href="/cgv" className="transition hover:text-brand-navy">
                  CGV
                </Link>
              </li>
              <li>
                <Link href="/mentions-legales" className="transition hover:text-brand-navy">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/accessibilite-psh" className="transition hover:text-brand-navy">
                  Accessibilité PSH
                </Link>
              </li>
              <li>
                <Link href="/livret-accueil" className="transition hover:text-brand-navy">
                  Livret d&apos;accueil
                </Link>
              </li>
              <li>
                <Link href="/reglement-interieur" className="transition hover:text-brand-navy">
                  Règlement intérieur
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-black text-brand-navy">Contact</h3>
            <ul className="mt-3 space-y-2 text-sm text-zinc-600">
              <li>
                <a href="tel:0954467773" className="transition hover:text-brand-navy">
                  09 54 46 77 73
                </a>
              </li>
              <li>
                <a href="mailto:contact@passformation.com" className="transition hover:text-brand-navy">
                  contact@passformation.com
                </a>
              </li>
              <li>
                <Link href={`${VERCEL_APP_URL}/login`} className="transition hover:text-brand-navy">
                  Connexion apprenant
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-zinc-100 px-5 py-5 text-center text-sm text-zinc-500">
          © 2026 MonPassFormation. Tous droits réservés.
        </div>
      </footer>
    </div>
  );
}
