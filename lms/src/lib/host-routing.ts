export const MARKETING_HOST = "monpassformation.com";
export const WWW_MARKETING_HOST = "www.monpassformation.com";
export const APP_HOST = "app.monpassformation.com";
export const LEGACY_VERCEL_HOST = "formation-immo.vercel.app";

const PUBLIC_MARKETING_PATHS = new Set([
  "/",
  "/accessibilite-psh",
  "/cgv",
  "/checkout/immobilier",
  "/formation-immobiliere-loi-alur",
  "/livret-accueil",
  "/manifest.webmanifest",
  "/mentions-legales",
  "/planning-visioconference",
  "/reglement-interieur",
  "/robots.txt",
  "/sitemap.xml",
]);

export function requestHostname(request: {
  headers: Headers;
  nextUrl: { hostname: string };
}): string {
  const forwardedHost = request.headers.get("x-forwarded-host");
  const host = forwardedHost?.split(",")[0] ?? request.headers.get("host");
  return (host ?? request.nextUrl.hostname).split(":")[0].trim().toLowerCase();
}

export function isPublicMarketingPath(pathname: string): boolean {
  return (
    PUBLIC_MARKETING_PATHS.has(pathname) ||
    pathname === "/guides" ||
    pathname.startsWith("/guides/")
  );
}

export function canonicalMarketingPath(pathname: string): string {
  return pathname === "/checkout/immobilier"
    ? "/formation-immobiliere-loi-alur"
    : pathname;
}

export function isAppDeploymentHost(hostname: string): boolean {
  return hostname === APP_HOST || hostname.endsWith(".vercel.app");
}

export function isSessionlessAppPath(pathname: string): boolean {
  return (
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/auth/callback" ||
    pathname === "/settings/reset-password"
  );
}

export function isAppOnlyPath(pathname: string): boolean {
  return (
    isSessionlessAppPath(pathname) ||
    pathname === "/formation" ||
    pathname.startsWith("/formation/") ||
    pathname === "/achat" ||
    pathname.startsWith("/achat/")
  );
}
