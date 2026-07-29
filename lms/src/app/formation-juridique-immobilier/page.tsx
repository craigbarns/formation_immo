import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Lock, ShieldCheck, Scale, BookOpen } from "lucide-react";
import { getModulePriceCents, getPackPriceCents } from "@/data/catalog";
import { euros } from "@/lib/price";
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  serializeJsonLd,
} from "@/lib/seo";
import { AddToCartButton } from "@/components/cart/AddToCartButton";

const PAGE_PATH = "/formation-juridique-immobilier";
const MODULE_ID = "juridique";

export const metadata: Metadata = {
  title: "Formation Juridique Immobilier & Conformité ALUR 2026 | 8h en ligne",
  description:
    "Module juridique et conformité pour professionnels de l'immobilier : ALUR 2026, compromis, mandats, diagnostics et baux d'habitation. 8h en ligne.",
  keywords: [
    "formation juridique immobilier",
    "droit immobilier formation ALUR",
    "compromis de vente diagnostics mandats",
    "formation continue juridique carte T",
  ],
  alternates: {
    canonical: PAGE_PATH,
  },
  openGraph: {
    title: "Formation Juridique & Conformité Immobilier 8h",
    description:
      "Sécurisez la rédaction de vos actes et la conformité de vos transactions immobilières en ligne.",
    url: PAGE_PATH,
    type: "website",
    siteName: SITE_NAME,
    locale: "fr_FR",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1024,
        height: 576,
        alt: "Formation Juridique et Conformité Immobilière",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Formation Juridique Immobilier 8h en ligne",
    description:
      "Module Juridique & Conformité certifiant de 8h pour la carte professionnelle.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function FormationJuridiquePage() {
  const pageUrl = absoluteUrl(PAGE_PATH);
  const modulePrice = getModulePriceCents(MODULE_ID);
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
            name: "Formation Juridique Immobilier",
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "Course",
        "@id": `${pageUrl}#course`,
        url: pageUrl,
        name: "Formation Juridique & Conformité Immobilier — Module 8h",
        description:
          "Module de 8 heures couvrant le droit de l'immobilier, les nouveautés ALUR 2026, les mandats, les promesses de vente et la prévention des risques juridiques.",
        image: absoluteUrl(DEFAULT_OG_IMAGE),
        inLanguage: "fr-FR",
        timeRequired: "PT8H",
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

  return (
    <>
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
                Module fondamental — Droit &amp; Transaction
              </p>
              <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                Formation Juridique &amp; Conformité Immobilier (8h)
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-white/85 sm:text-xl">
                Sécurisez vos transactions et maîtrisez les évolutions réglementaires 2026 : mandats, promesses, baux d&apos;habitation, copropriété et dossier de diagnostic technique.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <AddToCartButton
                  productId={MODULE_ID}
                  productKind="module"
                  label={`Acheter le module Juridique — ${euros(modulePrice)}`}
                  className="rounded-xl bg-brand-gold px-6 py-4 text-base font-black text-brand-navy shadow-lg transition hover:bg-brand-gold-hover"
                />
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
                  Programme du module Juridique (8 heures)
                </h2>
                <div className="mt-6 space-y-4">
                  {[
                    "Évolutions réglementaires ALUR 2026 & droit de la vente immobilière",
                    "Rédaction sécurisée du mandat de vente & du compromis de vente",
                    "Dossier de Diagnostic Technique (DDT), DPE & obligations d'information du vendeur",
                    "Droit de la copropriété & règles relatives aux baux d'habitation",
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
                <p className="text-xs font-black uppercase tracking-widest text-brand-gold">Module à l'unité</p>
                <div className="mt-3 flex items-baseline gap-2 border-b border-zinc-100 pb-6">
                  <span className="text-4xl font-black text-brand-navy">{euros(modulePrice)}</span>
                  <span className="text-sm font-bold text-zinc-400">TTC</span>
                </div>
                <div className="mt-6 space-y-4">
                  <AddToCartButton
                    productId={MODULE_ID}
                    productKind="module"
                    label={`Ajouter au panier — ${euros(modulePrice)}`}
                    className="w-full justify-center rounded-xl bg-brand-navy py-4 text-sm font-black text-white transition hover:bg-brand-navy-mid"
                  />
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
    </>
  );
}
