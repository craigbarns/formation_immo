import { type NextRequest, NextResponse } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key) {
    console.warn("[proxy] Supabase env vars missing — skipping session update");
    return NextResponse.next({ request });
  }

  const { response, user, supabase } = await updateSession(request);
  const pathname = request.nextUrl.pathname;

  // Only check auth/placement on page routes (not API, not static files)
  const isPageRoute =
    !pathname.startsWith("/api/") &&
    !pathname.startsWith("/_next/") &&
    !pathname.startsWith("/static/") &&
    !pathname.match(/\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|json)$/);

  if (!isPageRoute) return response;

  // Public pages — no auth check needed
  const publicPages = ["/", "/login", "/register"];
  if (publicPages.includes(pathname)) return response;

  // Not authenticated → login
  if (!user) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Placement test pages — exempt from placement check (avoid infinite loop)
  const placementExempt = [
    "/formation/test",
    "/formation/test-conversationnel",
  ];
  if (placementExempt.some((p) => pathname.startsWith(p))) {
    return response;
  }

  // Formation pages — require placement test
  if (pathname.startsWith("/formation")) {
    const { data: placement } = await supabase
      .from("placement_results")
      .select("user_id")
      .eq("user_id", user.id)
      .single();

    if (!placement) {
      return NextResponse.redirect(new URL("/formation/test", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
