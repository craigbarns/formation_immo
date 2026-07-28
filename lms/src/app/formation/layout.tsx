import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { FormationShell } from "@/components/FormationShell";
import { AICoachButton } from "@/components/ai-coach";
import { ProactiveCoachBanner } from "@/components/ai-coach/ProactiveCoachBanner";
import { StreakReminder } from "@/components/retention";
import { StudyReminder } from "@/components/retention/StudyReminder";
import { AttendanceTracker } from "@/components/AttendanceTracker";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default async function FormationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/formation");
  }

  // 1. On vérifie d'abord si l'utilisateur est ADMIN
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  const isAdmin = profile?.role === "admin";

  // 2. 🔒 VÉRIFICATION DE L'ACCÈS (sauf pour les admins)
  // Utilise le client admin (service role) côté serveur pour éviter les
  // blocages RLS/PostgREST sur auth.users.
  if (!isAdmin) {
    const admin = createAdminClient();
    const { data: subscription } = await admin
      .from("user_subscriptions")
      .select("status")
      .eq("formation_id", "immobilier")
      .or(`email.eq.${user.email},user_id.eq.${user.id}`)
      .eq("status", "active")
      .limit(1)
      .maybeSingle();

    if (!subscription) {
      redirect("/checkout/immobilier?error=accès_non_autorisé");
    }
  }

  return (
    <FormationShell>
      <AttendanceTracker />
      {children}
      <StreakReminder />
      <ProactiveCoachBanner />
      <AICoachButton />
      <StudyReminder />
    </FormationShell>
  );
}
