import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendReminderEmail } from "@/lib/email/resend";

export const dynamic = "force-dynamic";

// Appelé par Vercel Cron — protégé par CRON_SECRET
export async function GET(request: Request) {
  const auth = request.headers.get("authorization");
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString();
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  // 1. Récupère les subscriptions actives (sans join FK supprimée)
  const { data: subs } = await supabase
    .from("user_subscriptions")
    .select("email, user_id")
    .eq("status", "active")
    .eq("formation_id", "immobilier");

  if (!subs || subs.length === 0) return NextResponse.json({ sent: 0 });

  const userIds = subs.map((s) => s.user_id).filter(Boolean) as string[];

  // 2. Récupère les profils et la dernière connexion en deux requêtes séparées
  const [{ data: profiles }, { data: gamStates }] = await Promise.all([
    supabase.from("profiles").select("id, full_name").in("id", userIds),
    supabase.from("gamification_state").select("user_id, last_login_date").in("user_id", userIds),
  ]);

  const profileMap = new Map((profiles ?? []).map((p) => [p.id, p.full_name as string | null]));
  const gamMap = new Map((gamStates ?? []).map((g) => [g.user_id, g.last_login_date as string | null]));

  let sent = 0;

  for (const sub of subs) {
    const userId = sub.user_id;
    if (!userId) continue;

    const lastLogin = gamMap.get(userId);
    if (!lastLogin) continue;

    const lastLoginDate = new Date(lastLogin).toISOString();
    const daysSince = Math.floor((Date.now() - new Date(lastLogin).getTime()) / (1000 * 60 * 60 * 24));

    // Envoyer uniquement à J+3 ou J+7 (pas tous les jours)
    if (lastLoginDate < threeDaysAgo && lastLoginDate >= sevenDaysAgo) {
      const fullName = profileMap.get(userId) ?? undefined;
      await sendReminderEmail(sub.email, fullName, daysSince);
      sent++;
    }
  }

  return NextResponse.json({ sent });
}
