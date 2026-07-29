import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Lock, ShieldCheck, Scale, FileText } from "lucide-react";
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

const PAGE_PATH = "/formation-tracfin-immobilier";
const MODULE_ID = "tracfin";

export const metadata: Metadata = {
  title: "Formation TRACFIN Immobilier 3h en ligne | LCB-FT Obligatoire",
  description:
    "Module de formation TRACFIN et LCB-FT de 3h obligatoire pour agents immobiliers, négociateurs et mandataires. Conforme Loi ALUR avec attestation immédiate.",
  keywords: [
    "formation TRACFIN immobilier",
    "formation LCB-FT agent immobilier",
    "lutte anti blanchiment immobilier",
    "obligation TRACFIN Loi ALUR 3h",
    "attestation TRACFIN carte professionnelle",
  ],
  alternates: {
    canonical: PAGE_PATH,
  },
  openGraph: {
    title: "Formation TRACFIN & LCB-FT Immobilier 3h en ligne",
    description:
      "Validez vos 3h obligatoires de lutte contre le blanchiment et le financement du terrorisme en ligne avec PASS Formation.",
    url: PAGE_PATH,
    type: "website",
    siteName: SITE_NAME,
    locale: "fr_FR",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1024,
        height: 576,
        alt: "Formation TRACFIN et LCB-FT pour professionnels de l'immobilier",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Formation TRACFIN Immobilier 3h en ligne",
    description:
      "Module TRACFIN & LCB-FT certifiant de 3h pour la carte professionnelle immobilière.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function FormationTracfinPage() {
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
            name: "Formation TRACFIN Immobilier",
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "Course",
        "@id": `${pageUrl}#course`,
        url: pageUrl,
        name: "Formation TRACFIN & LCB-FT Immobilier — Module 3h Obligatoire",
        description:
          "Module de 3 heures dédié à la Lutte Contre le Blanchiment de Capitaux et le Financement du Terrorisme (LCB-FT) et aux obligations de déclaration à TRACFIN pour les professionnels de l'immobilier.",
        image: absoluteUrl(DEFAULT_OG_IMAGE),
        inLanguage: "fr-FR",
        timeRequired: "PT3H",
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
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "La formation TRACFIN est-elle obligatoire pour la carte T ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Oui. Dans le cadre de la formation continue obligatoire (Loi ALUR), les professionnels de l'immobilier doivent valider un socle de formation LCB-FT et TRACFIN.",
            },
          },
          {
            "@type": "Question",
            name: "Quelle est la durée de ce module ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Ce module dure 3 heures et donne lieu à une attestation de formation officielle délivrée à l'issue de la validation des QCM.",
            },
          },
        ],
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
                Module réglementaire obligatoire — LCB-FT
              </p>
              <h1 className="mt-4 text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
                Formation TRACFIN &amp; LCB-FT Immobilier (3h)
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-white/85 sm:text-xl">
                Maîtrisez le cadre légal de la lutte contre le blanchiment de capitaux et le financement du terrorisme. Un module certifiant de 3h conforme aux exigences de la CCI pour le renouvellement de votre carte professionnelle.
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
                  Programme du module TRACFIN (3 heures)
                </h2>
                <div className="mt-6 space-y-4">
                  {[
                    "Cadre juridique LCB-FT appliqué à l'immobilier & rôle de TRACFIN",
                    "Obligations de vigilance client & identification du bénéficiaire effectif",
                    "Détection des anomalies, opérations suspectes & formalisation de la déclaration de soupçon",
                    "Cas pratiques terrain, critères d'alerte & fiches réflexes pour l'agence",
                  ].map((item, idx) => (
                    <div key={idx} className="flex items-start gap-4 rounded-2xl bg-zinc-50 p-4">
                      <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-600 mt-0.5" />
                      <span className="text-sm font-semibold text-zinc-800 leading-relaxed">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
                <h2 className="text-2xl font-black text-brand-navy">
                  Pourquoi choisir PASS Formation ?
                </h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-5">
                    <ShieldCheck className="h-7 w-7 text-brand-gold" />
                    <h3 className="mt-3 font-black text-brand-navy">Processus Certifié Qualiopi</h3>
                    <p className="mt-1 text-xs text-zinc-600">Attestation de formation valide auprès de la CCI.</p>
                  </div>
                  <div className="rounded-2xl border border-zinc-100 bg-zinc-50 p-5">
                    <FileText className="h-7 w-7 text-brand-gold" />
                    <h3 className="mt-3 font-black text-brand-navy">Attestation Immédiate</h3>
                    <p className="mt-1 text-xs text-zinc-600">Délivrée automatiquement après validation des QCM.</p>
                  </div>
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
                  <AddToCartButton productId={MODULE_ID} />
                  <div className="flex gap-3 text-xs text-zinc-500 pt-2">
                    <Lock className="h-4 w-4 text-brand-gold shrink-0" />
                    Paiement sécurisé Stripe &amp; accès immédiat 24/7.
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
