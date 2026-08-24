"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { X, Lightbulb } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ProactiveMessage {
  id: string;
  type: string;
  title: string;
  message: string;
  cta: string;
  priority: number;
}

const PROACTIVE_CHECK_INTERVAL_MS = 30_000;

export function ProactiveCoachBanner() {
  const [message, setMessage] = useState<ProactiveMessage | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const pathname = usePathname();

  // Only active on formation pages
  const isActivePage = pathname?.startsWith("/formation") && !pathname?.startsWith("/formation/test");

  useEffect(() => {
    if (!isActivePage) return;

    // Don't show if already dismissed in this session
    if (typeof window !== "undefined") {
      const sessionDismissed = sessionStorage.getItem("proactive-dismissed");
      if (sessionDismissed) return;
    }

    // Track time on page for "stuck" detection
    const startTime = Date.now();
    let lessonTime = 0;

    const interval = setInterval(async () => {
      lessonTime = Date.now() - startTime;

      try {
        const res = await fetch("/api/coach/proactive", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ currentLessonTimeMs: lessonTime }),
        });
        if (res.ok) {
          const data = await res.json();
          if (data.message) {
            setMessage(data.message);
            clearInterval(interval);
          }
        }
      } catch {
        // silent
      }
    }, PROACTIVE_CHECK_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [isActivePage]);

  const handleDismiss = () => {
    setDismissed(true);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("proactive-dismissed", "1");
    }
  };

  const handleOpenCoach = () => {
    // Programmatically open the coach by clicking the AICoachButton
    const coachBtn = document.querySelector('[data-coach-trigger]') as HTMLButtonElement | null;
    if (coachBtn) coachBtn.click();
    handleDismiss();
  };

  if (!message || dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-24 left-1/2 z-40 w-[calc(100%-2rem)] max-w-lg -translate-x-1/2"
      >
        <div className="relative overflow-hidden rounded-2xl border border-brand-gold/30 bg-gradient-to-r from-brand-navy to-[var(--brand-navy-light)] p-4 shadow-xl">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-gold/20">
              <Lightbulb className="h-5 w-5 text-brand-gold" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-white">{message.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-white/80">{message.message}</p>
              <button
                onClick={handleOpenCoach}
                className="mt-2 inline-flex items-center rounded-lg bg-brand-gold px-3 py-1.5 text-xs font-bold text-brand-navy transition hover:brightness-105"
              >
                {message.cta}
              </button>
            </div>
            <button
              onClick={handleDismiss}
              aria-label="Fermer"
              className="rounded-full p-1 text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
