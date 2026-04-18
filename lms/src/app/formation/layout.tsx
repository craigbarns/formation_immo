import { FormationShell } from "@/components/FormationShell";

export default async function FormationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <FormationShell>{children}</FormationShell>
  );
}
