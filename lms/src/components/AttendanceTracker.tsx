"use client";

import { useEffect, useRef } from "react";
import { useParams } from "next/navigation";
import { logConnectionSession } from "@/app/actions/tracking";

export function AttendanceTracker() {
  const params = useParams();
  const startTimeRef = useRef(new Date());
  const lastSyncRef = useRef(new Date());

  useEffect(() => {
    // Réinitialiser le chrono au changement de page
    startTimeRef.current = new Date();
    lastSyncRef.current = new Date();

    const saveSession = async () => {
      const now = new Date();
      const durationSeconds = Math.floor((now.getTime() - lastSyncRef.current.getTime()) / 1000);

      if (durationSeconds > 10) { // Ne pas enregistrer moins de 10 secondes
        await logConnectionSession({
          startedAt: lastSyncRef.current.toISOString(),
          durationSeconds,
          moduleSlug: params.moduleSlug as string,
          lessonSlug: params.lessonSlug as string,
        });
        lastSyncRef.current = now;
      }
    };

    // Sauvegarde automatique toutes les 2 minutes pour éviter de perdre les données
    const interval = setInterval(saveSession, 120000);

    // Sauvegarde quand on quitte la page
    const handleBeforeUnload = () => {
      saveSession();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      clearInterval(interval);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      saveSession();
    };
  }, [params]);

  return null; // Composant invisible
}
