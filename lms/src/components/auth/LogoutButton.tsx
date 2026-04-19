"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="ml-1 rounded-full border border-white/40 bg-white/10 px-3.5 py-2 text-xs font-semibold text-white shadow-sm outline-none transition hover:border-amber-200/60 hover:bg-white/20 focus-ring-brand-dark"
    >
      Déconnexion
    </button>
  );
}
