import { FormationShell } from "@/components/FormationShell";

export default async function FormationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Session check disabled for demo - using client-side auth
  return <FormationShell>{children}</FormationShell>;
}
