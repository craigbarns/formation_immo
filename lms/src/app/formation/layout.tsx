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
