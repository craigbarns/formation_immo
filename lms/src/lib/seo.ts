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
    path: "/guides/formation-loi-alur-42-heures",
    lastModified: "2026-07-28",
  },
  {
    path: "/guides/renouvellement-carte-professionnelle-immobilier",
    lastModified: "2026-07-28",
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
