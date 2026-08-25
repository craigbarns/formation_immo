import type { Metadata } from "next";
import ImmobilierCheckoutPage from "@/app/checkout/immobilier/page";
import { getPackPriceCents } from "@/data/catalog";
import {
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
  serializeJsonLd,
} from "@/lib/seo";

const PAGE_PATH = "/formation-immobiliere-loi-alur";

export const metadata: Metadata = {
  title: "Formation Loi ALUR 42h (100% En Ligne) - Attestation Immédiate",
  description:
    "Validez vos 42h obligatoires Loi ALUR pour le renouvellement de votre carte professionnelle. Formation 100% en ligne, module TRACFIN 3h inclus. Attestation immédiate.",
  keywords: [
    "formation Loi ALUR 42h",
    "formation agent immobilier en ligne",
    "formation continue immobilier",
    "renouvellement carte professionnelle immobilier",
    "formation TRACFIN immobilier",
  ],
  alternates: {
    canonical: PAGE_PATH,
  },
  openGraph: {
    title: "Formation Loi ALUR 42h (100% En Ligne) - Attestation Immédiate",
    description:
      "Validez vos 42h obligatoires Loi ALUR pour le renouvellement de votre carte professionnelle. Formation 100% en ligne, module TRACFIN 3h inclus. Attestation immédiate.",
    url: PAGE_PATH,
    type: "website",
    siteName: SITE_NAME,
    locale: "fr_FR",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        width: 1024,
        height: 576,
        alt: "Formation Agent Immobilier — Loi ALUR en ligne",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Formation Loi ALUR 42h (100% En Ligne) - Attestation Immédiate",
    description:
      "Validez vos 42h obligatoires Loi ALUR pour le renouvellement de votre carte professionnelle. Formation 100% en ligne, module TRACFIN 3h inclus. Attestation immédiate.",
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function FormationImmobiliereLoiAlurPage() {
  const pageUrl = absoluteUrl(PAGE_PATH);
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
            name: "Formation Loi ALUR en ligne",
            item: pageUrl,
          },
        ],
      },
      {
        "@type": "Course",
        "@id": `${pageUrl}#course`,
        url: pageUrl,
        name: "Formation Agent Immobilier — Loi ALUR 42h + TRACFIN 3h",
        description:
          "Parcours de formation continue en ligne de 45 heures pour les professionnels de l'immobilier : socle Loi ALUR de 42h, module TRACFIN de 3h, QCM, supports pratiques et attestation.",
        image: absoluteUrl(DEFAULT_OG_IMAGE),
        inLanguage: "fr-FR",
        timeRequired: "PT45H",
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
          price: (getPackPriceCents() / 100).toFixed(2),
          priceCurrency: "EUR",
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: "La formation est-elle valable pour la CCI ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Oui, cette formation de 42h (incluant le module TRACFIN de 3h) est strictement conforme à la Loi ALUR et vous permet de renouveler votre carte professionnelle (Carte T) auprès de votre CCI."
            }
          },
          {
            "@type": "Question",
            name: "Comment obtenir mon attestation de formation ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Dès la validation de l'ensemble de vos modules et QCM en ligne, votre attestation de fin de formation est générée automatiquement. Vous pouvez la télécharger immédiatement au format PDF."
            }
          },
          {
            "@type": "Question",
            name: "Puis-je suivre la formation à mon rythme ?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Absolument. La formation est 100% en ligne (e-learning). Vous avez accès à la plateforme 24h/24 et 7j/7, ce qui vous permet d'avancer selon vos disponibilités professionnelles."
            }
          }
        ]
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
      />
      <ImmobilierCheckoutPage />
    </>
  );
}
