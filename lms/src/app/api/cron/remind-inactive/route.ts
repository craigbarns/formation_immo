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

  // Apprenants inactifs depuis 3 ou 7 jours (pas de connection_log récent)
  // et dont la formation est active
  const { data: subs } = await supabase
    .from("user_subscriptions")
    .select("email, profiles!inner(id, full_name, gamification_state(last_login_date))")
    .eq("status", "active")
    .eq("formation_id", "immobilier");

  if (!subs) return NextResponse.json({ sent: 0 });

  let sent = 0;

  interface SubRow { email: string; profiles: { full_name: string | null; gamification_state: { last_login_date: string }[] }[] }
  for (const sub of (subs as unknown as SubRow[])) {
    const profile = sub.profiles?.[0];
    const lastLogin = profile?.gamification_state?.[0]?.last_login_date;
    if (!lastLogin) continue;

    const lastLoginDate = new Date(lastLogin).toISOString();
    const daysSince = Math.floor((Date.now() - new Date(lastLogin).getTime()) / (1000 * 60 * 60 * 24));

    // Envoyer uniquement à J+3 ou J+7 (pas tous les jours)
    if (lastLoginDate < threeDaysAgo && lastLoginDate >= sevenDaysAgo) {
      await sendReminderEmail(sub.email, profile?.full_name, daysSince);
      sent++;
    }
  }

  return NextResponse.json({ sent });
}
