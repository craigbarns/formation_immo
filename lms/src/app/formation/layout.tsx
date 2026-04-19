import { FormationShell } from "@/components/FormationShell";
import { StudyReminder } from "@/components/retention/StudyReminder";

export default async function FormationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FormationShell>
      {children}
      <StudyReminder />
    </FormationShell>
  );
}
