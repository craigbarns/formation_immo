import { FormationShell } from "@/components/FormationShell";
import { AuthCheck } from "@/components/auth/AuthCheck";

export default async function FormationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthCheck>
      <FormationShell>{children}</FormationShell>
    </AuthCheck>
  );
}
