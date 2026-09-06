import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Lock } from "lucide-react";
import { getCatalog, getModulePriceCentsFor, getPackPriceCents } from "@/data/catalog";
import { euros } from "@/lib/price";
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  serializeJsonLd,
} from "@/lib/seo";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { CartProvider } from "@/components/cart/CartProvider";
import { CartBar } from "@/components/cart/CartBar";

const PAGE_PATH = "/formation-deontologie-immobilier";
const MODULE_ID = "deontologie";

export const metadata: Metadata = {
  title: "Formation Déontologie Immobilier 4h (100% En Ligne) - Loi ALUR",
  description:
    "Validez rapidement votre formation déontologie immobilier de 4h (dont 2h de non-discrimination au logement) exigée par la Loi ALUR. Attestation immédiate.",
  keywords: [
    "formation déontologie immobilier",
    "non discrimination logement formation",
    "obligation déontologie agent immobilier",
    "décret 2020 1259 déontologie",
    "attestation déontologie carte professionnelle",
  ],
  alternates: {
    canonical: PAGE_PATH,
  },
  openGraph: {
    title: "Formation Déontologie & Non-discrimination Immobilier 4h",
    description:
      "Validez vos 4h obligatoires de déontologie (dont 2h non-discrimination au logement) en ligne.",
    url: PAGE_PATH,
    type: "website",
    siteName: SITE_NAME,
    locale: "fr_FR",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1024,
        height: 576,
        alt: "Formation Déontologie et Non-discrimination pour professionnels de l'immobilier",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Formation Déontologie Immobilier 4h en ligne",
    description:
      "Module Déontologie & Non-discrimination certifiant de 4h pour la carte professionnelle.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function FormationDeontologiePage() {
  const pageUrl = absoluteUrl(PAGE_PATH);
  const modulePrice = getModulePriceCentsFor(MODULE_ID);
  const packPrice = getPackPriceCents();

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: SITE_URL,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Formation Déontologie Immobilier",
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "Course",
        "@id": `${pageUrl}#course`,
        url: pageUrl,
        name: "Formation Déontologie & Non-discrimination Immobilier — Module 4h Obligatoire",
        description:
          "Module de 4 heures dédié aux règles de déontologie (2h) et à la non-discrimination à l'accès au logement (2h) pour le renouvellement de la carte professionnelle immobilière.",
        image: absoluteUrl(DEFAULT_OG_IMAGE),
        inLanguage: "fr-FR",
        timeRequired: "PT4H",
        educationalLevel: "Formation professionnelle continue",
        provider: {
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          name: "PASS Formation",
          url: SITE_URL,
        },
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: "online",
          inLanguage: "fr-FR",
        },
        offers: {
          "@type": "Offer",
          url: pageUrl,
          price: (modulePrice / 100).toFixed(2),
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
        },
      },
    ],
  };

  const catalog = getCatalog();
  const cartProducts = catalog
    .filter((p) => p.available)
    .map(({ id, kind, label, priceCents }) => ({ id, kind, label, priceCents }));

  return (
    <CartProvider products={cartProducts} packPriceCents={getPackPriceCents()}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />
      <main className="min-h-screen bg-zinc-50 text-zinc-950">
        <header className="border-b border-zinc-200 bg-white sticky top-0 z-50">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
            <Link href="/" className="flex items-center" aria-label="PASS Formation">
              <Image
                src="/images/pass-formation-logo.svg"
                alt="PASS Formation"
                width={140}
                height={61}
                priority
                className="h-12 w-auto"
              />
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/formation-immobiliere-loi-alur"
                className="rounded-lg bg-brand-navy px-4 py-2.5 text-sm font-black text-white transition hover:bg-brand-navy-mid"
              >
                Pack complet 45h — {euros(packPrice)}
              </Link>
            </div>
          </div>
        </header>

        <section className="relative overflow-hidden bg-brand-navy py-16 text-white sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <p className="text-sm font-black uppercase tracking-wider text-brand-gold">
                Module réglementaire obligatoire — Déontologie
              </p>
              <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                Formation Déontologie Immobilier &amp; Non-discrimination (4h)
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-white/85 sm:text-xl">
                Remplissez l&apos;obligation légale des 4 heures incluant au moins 2h de prévention de la non-discrimination au logement et 2h sur le code de déontologie des professionnels de l&apos;immobilier.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <AddToCartButton productId={MODULE_ID} />
                <Link
                  href="/formation-immobiliere-loi-alur"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-4 text-base font-bold text-white transition hover:bg-white/20"
                >
                  Voir le Pack 45h complet
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
              <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-black text-brand-navy">
                  Programme du module Déontologie (4 heures)
                </h2>
                <div className="mt-6 space-y-4">
                  {[
                    "Code de déontologie des professionnels de l'immobilier (Décret n° 2015-1090)",
                    "Prévention des conflits d'intérêts et transparence vis-à-vis des mandants",
                    "Cadre légal de la non-discrimination à l'accès au logement (Décret n° 2020-1259)",
                    "Cas pratiques d'application en agence et gestion des réclamations clients",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 rounded-2xl bg-zinc-50 p-4">
                      <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-600 mt-0.5" />
                      <span className="text-sm font-semibold text-zinc-800 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-xl lg:sticky lg:top-24">
                <p className="text-xs font-black uppercase tracking-widest text-brand-gold">Module à l&apos;unité</p>
                <div className="mt-3 flex items-baseline gap-2 border-b border-zinc-100 pb-6">
                  <span className="text-4xl font-black text-brand-navy">{euros(modulePrice)}</span>
                  <span className="text-sm font-bold text-zinc-400">TTC</span>
                </div>
                <div className="mt-6 space-y-4">
                  <AddToCartButton productId={MODULE_ID} />
                  <div className="flex gap-3 text-xs text-zinc-500 pt-2">
                    <Lock className="h-4 w-4 text-brand-gold shrink-0" />
                    Paiement sécurisé Stripe &amp; accès immédiat.
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </section>
      </main>
      <CartBar />
    </CartProvider>
  );
}
