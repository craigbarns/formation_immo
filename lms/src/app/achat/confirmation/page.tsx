import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PurchasePoller } from "./PurchasePoller";

export const metadata: Metadata = {
  title: "Confirmation d'achat",
  robots: { index: false },
};

export const dynamic = "force-dynamic";

export default async function PurchaseConfirmationPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login?next=/achat/confirmation");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-5">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-xl">
        <PurchasePoller />
      </div>
    </main>
  );
}
