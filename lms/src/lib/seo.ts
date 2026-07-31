import type { Metadata } from "next";

export const SITE_NAME = "MonPassFormation";
export const SITE_URL = "https://monpassformation.com";
export const DEFAULT_OG_IMAGE =
  "/generated/fal/transaction/cover-immobilier.jpg";

export type PublicSeoRoute = {
  path: string;
  lastModified: string;
  images?: string[];
};

export const PUBLIC_SEO_ROUTES: readonly PublicSeoRoute[] = [
  {
    path: "/",
    lastModified: "2026-07-28",
    images: [DEFAULT_OG_IMAGE],
  },
  {
    path: "/formation-immobiliere-loi-alur",
    lastModified: "2026-07-28",
    images: [DEFAULT_OG_IMAGE],
  },
  {
    path: "/formation-tracfin-immobilier",
    lastModified: "2026-07-29",
    images: [DEFAULT_OG_IMAGE],
  },
  {
    path: "/formation-deontologie-immobilier",
    lastModified: "2026-07-29",
    images: [DEFAULT_OG_IMAGE],
  },
  {
    path: "/formation-juridique-immobilier",
    lastModified: "2026-07-29",
    images: [DEFAULT_OG_IMAGE],
  },
  {
    path: "/guides",
    lastModified: "2026-07-31",
  },
  {
    path: "/guides/formation-loi-alur-42-heures",
    lastModified: "2026-07-28",
  },
  {
    path: "/guides/renouvellement-carte-professionnelle-immobilier",
    lastModified: "2026-07-28",
  },
  {
    path: "/guides/formation-loi-alur-obligatoire",
    lastModified: "2026-07-31",
  },
  {
    path: "/guides/qui-doit-suivre-formation-42-heures",
    lastModified: "2026-07-31",
  },
  {
    path: "/guides/contenus-obligatoires-formation-alur",
    lastModified: "2026-07-31",
  },
  {
    path: "/guides/attestation-formation-alur-validite",
    lastModified: "2026-07-31",
  },
  {
    path: "/guides/erreurs-renouvellement-carte-professionnelle",
    lastModified: "2026-07-31",
  },
  {
    path: "/guides/carte-professionnelle-immobilier-prix-delais",
    lastModified: "2026-07-31",
  },
  {
    path: "/guides/examen-carte-professionnelle-cci",
    lastModified: "2026-07-31",
  },
  {
    path: "/guides/devenir-agent-immobilier-sans-diplome",
    lastModified: "2026-07-31",
  },
  {
    path: "/guides/negociateur-immobilier-statut-salaire",
    lastModified: "2026-07-31",
  },
  {
    path: "/guides/syndic-copropriete-carte-g-formation",
    lastModified: "2026-07-31",
  },
  {
    path: "/guides/tracfin-obligations-agent-immobilier",
    lastModified: "2026-07-31",
  },
  {
    path: "/guides/dpe-passoires-thermiques-location-interdite",
    lastModified: "2026-07-31",
  },
  {
    path: "/guides/murs-fonds-commerce-differences",
    lastModified: "2026-07-31",
  },
  {
    path: "/guides/immobilier-intelligence-artificielle",
    lastModified: "2026-07-31",
  },
  {
    path: "/guides/loi-hoguet-guide-complet",
    lastModified: "2026-07-31",
  },
  {
    path: "/guides/formation-immobilier-en-ligne-vs-presentiel",
    lastModified: "2026-07-31",
  },
  {
    path: "/guides/financement-formation-immobilier-opco-cpf",
    lastModified: "2026-07-31",
  },
  {
    path: "/guides/formation-loi-alur-prix-comparatif",
    lastModified: "2026-07-31",
  },
  {
    path: "/guides/mandat-exclusif-vs-mandat-simple",
    lastModified: "2026-07-31",
  },
  {
    path: "/guides/estimation-immobiliere-methodes",
    lastModified: "2026-07-31",
  },
  {
    path: "/accessibilite-psh",
    lastModified: "2026-04-01",
  },
  {
    path: "/cgv",
    lastModified: "2026-04-01",
  },
  {
    path: "/livret-accueil",
    lastModified: "2026-04-01",
  },
  {
    path: "/mentions-legales",
    lastModified: "2026-04-01",
  },
  {
    path: "/reglement-interieur",
    lastModified: "2026-04-01",
  },
] as const;

export function absoluteUrl(path = "/"): string {
  return new URL(path, `${SITE_URL}/`).toString();
}

export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function createPublicPageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title,
      description,
      url: path,
      type: "website",
      siteName: SITE_NAME,
      locale: "fr_FR",
      images: [
        {
          url: DEFAULT_OG_IMAGE,
          width: 1024,
          height: 576,
          alt: "Formation immobilière en ligne — MonPassFormation",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE],
    },
  };
}
