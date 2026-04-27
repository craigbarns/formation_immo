import { redirect } from "next/navigation";
import { FormationShell } from "@/components/FormationShell";
import { AICoachButton } from "@/components/ai-coach";
import { ProactiveCoachBanner } from "@/components/ai-coach/ProactiveCoachBanner";
import { StreakReminder } from "@/components/retention";
import { StudyReminder } from "@/components/retention/StudyReminder";
import { AttendanceTracker } from "@/components/AttendanceTracker";
import { createClient } from "@/lib/supabase/server";

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

  // 2. 🔒 VÉRIFICATION DU PAIEMENT STRIPE (sauf pour les admins)
  if (!isAdmin) {
    const { data: subscription } = await supabase
      .from("user_subscriptions")
      .select("status")
      .eq("email", user.email)
      .eq("formation_id", "immobilier")
      .maybeSingle();

    if (!subscription || subscription.status !== "active") {
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
