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
import { getAccessibleModuleSlugs, getEntitlements, type EntitlementRow } from "@/lib/entitlements";

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
  let entitlementRows: EntitlementRow[] = [];

  // 2. 🔒 VÉRIFICATION DE L'ACCÈS (sauf pour les admins)
  // Utilise le client admin (service role) côté serveur pour éviter les
  // blocages RLS/PostgREST sur auth.users.
  if (!isAdmin) {
    const admin = createAdminClient();
    const { data: subscriptions, error } = await admin
      .from("user_subscriptions")
      .select("module_slug, status")
      .eq("formation_id", "immobilier")
      .or(`email.eq.${user.email?.toLowerCase()},user_id.eq.${user.id}`)
      .eq("status", "active");

    if (error) throw new Error(error.message);
    if (!subscriptions?.length) {
      redirect("/checkout/immobilier?error=accès_non_autorisé");
    }
    entitlementRows = subscriptions;
  }

  const firstModuleSlug = getAccessibleModuleSlugs(getEntitlements(entitlementRows), isAdmin)[0];

  return (
    <FormationShell examHref={firstModuleSlug ? `/formation/examen/${firstModuleSlug}` : "/formation"}>
      <AttendanceTracker learnerId={user.id} disabled={isAdmin} />
      {children}
      <StreakReminder />
      <ProactiveCoachBanner />
      <AICoachButton />
      <StudyReminder />
    </FormationShell>
  );
}
