"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function AuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  
  useEffect(() => {
    const auth = localStorage.getItem("formation_auth");
    if (!auth) {
      router.push("/login");
    }
  }, [router]);
  
  return <>{children}</>;
}
