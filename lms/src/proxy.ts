import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import {
  APP_HOST,
  LEGACY_VERCEL_HOST,
  MARKETING_HOST,
  WWW_MARKETING_HOST,
  canonicalMarketingPath,
  isAppOnlyPath,
  isAppDeploymentHost,
  isPublicMarketingPath,
  isSessionlessAppPath,
  requestHostname,
} from "@/lib/host-routing";

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  const hostname = requestHostname(request);
  const isMarketingPath = isPublicMarketingPath(pathname);

  if (hostname === WWW_MARKETING_HOST) {
    const canonicalUrl = new URL(`https://${MARKETING_HOST}`);
    canonicalUrl.pathname = pathname;
    canonicalUrl.search = search;
    return NextResponse.redirect(canonicalUrl, 308);
  }

  if (hostname === APP_HOST && pathname === "/") {
    const formationUrl = request.nextUrl.clone();
    formationUrl.pathname = "/formation";
    formationUrl.search = "";
    return NextResponse.redirect(formationUrl);
  }

  if (
    isMarketingPath &&
    (hostname === APP_HOST || hostname === LEGACY_VERCEL_HOST)
  ) {
    const canonicalUrl = new URL(`https://${MARKETING_HOST}`);
    canonicalUrl.pathname = canonicalMarketingPath(pathname);
    canonicalUrl.search = search;
    return NextResponse.redirect(canonicalUrl, 308);
  }

  if (hostname === MARKETING_HOST && isAppOnlyPath(pathname)) {
    const appUrl = new URL(`https://${APP_HOST}`);
    appUrl.pathname = pathname;
    appUrl.search = search;
    return NextResponse.redirect(appUrl, 308);
  }

  // La vitrine canonique ne dépend d'aucune session. Éviter l'appel Supabase
  // permet à Next.js et Netlify de servir ses pages statiques depuis le CDN.
  if (hostname === MARKETING_HOST && isMarketingPath) {
    return NextResponse.next();
  }

  if (isAppDeploymentHost(hostname) && isSessionlessAppPath(pathname)) {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
    return response;
  }

  const { response, user } = await updateSession(request);

  if (pathname.startsWith("/formation") && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/login";
    loginUrl.search = "";
    loginUrl.searchParams.set("next", `${pathname}${search}`);
    return NextResponse.redirect(loginUrl);
  }

  if (isAppDeploymentHost(hostname)) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|manifest.webmanifest|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff2?)$).*)",
  ],
};
