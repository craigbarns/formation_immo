"use client";

import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { logConnectionSession } from "@/app/actions/tracking";

export function AttendanceTracker() {
  const params = useParams();
  const lastSyncRef = useRef(new Date());

  useEffect(() => {
    lastSyncRef.current = new Date();

    const saveSession = async () => {
      const now = new Date();
      const durationSeconds = Math.floor((now.getTime() - lastSyncRef.current.getTime()) / 1000);

      if (durationSeconds > 10) {
        const result = await logConnectionSession({
          startedAt: lastSyncRef.current.toISOString(),
          durationSeconds,
          moduleSlug: params.moduleSlug as string,
          lessonSlug: params.lessonSlug as string,
        });
        if (result?.error) {
          console.error("[AttendanceTracker] Échec de la sauvegarde de session:", result.error);
          return;
        }
        lastSyncRef.current = now;
      }
    };

    // Sauvegarde toutes les 30 secondes
    const interval = setInterval(saveSession, 30000);

    // Sauvegarde quand l'onglet devient inactif (changement d'onglet, minimisation)
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        saveSession();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearInterval(interval);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      saveSession();
    };
  }, [params]);

  return null;
}
