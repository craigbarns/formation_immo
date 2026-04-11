import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { FormationShell } from "@/components/FormationShell";

export default async function FormationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session.isLoggedIn) {
    redirect("/login");
  }

  return <FormationShell>{children}</FormationShell>;
}
