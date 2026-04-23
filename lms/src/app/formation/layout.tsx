import { redirect } from "next/navigation";
import { FormationShell } from "@/components/FormationShell";
import { AICoachButton } from "@/components/ai-coach";
import { ProactiveCoachBanner } from "@/components/ai-coach/ProactiveCoachBanner";
import { StreakReminder } from "@/components/retention";
import { StudyReminder } from "@/components/retention/StudyReminder";
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

  // 🔒 VÉRIFICATION DU PAIEMENT STRIPE
  // On vérifie si l'email de l'utilisateur correspond à un achat validé
  const { data: subscription } = await supabase
    .from("user_subscriptions")
    .select("status")
    .eq("email", user.email)
    .eq("formation_id", "immobilier")
    .single();

  if (!subscription || subscription.status !== "active") {
    // Si l'utilisateur n'a pas payé, on le renvoie au tunnel de vente
    redirect("/checkout/immobilier?error=accès_non_autorisé");
  }

  return (
    <FormationShell>
      {children}
      <StreakReminder />
      <ProactiveCoachBanner />
      <AICoachButton />
      <StudyReminder />
    </FormationShell>
  );
}
