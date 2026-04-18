"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export function AuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    async function check() {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        setChecking(false);
        return;
      }

      // If already on test page, no need to redirect
      if (pathname === "/formation/test" || pathname === "/formation/test-conversationnel") {
        setChecking(false);
        return;
      }

      // Check if user has completed placement test
      const { data: placement } = await supabase
        .from("placement_results")
        .select("user_id")
        .eq("user_id", user.id)
        .single();

      if (!placement) {
        router.push("/formation/test");
      }

      setChecking(false);
    }

    check();
  }, [router, pathname]);

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-navy border-t-transparent" />
      </div>
    );
  }

  return <>{children}</>;
}
