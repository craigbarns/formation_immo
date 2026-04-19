"use client";

import { useEffect, useState } from "react";
import { X, Bell } from "lucide-react";

const LAST_VISIT_KEY = "formation-last-visit";
const DISMISSED_KEY = "formation-reminder-dismissed";

export function StudyReminder() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const dismissed = localStorage.getItem(DISMISSED_KEY);
    if (dismissed && Date.now() - parseInt(dismissed) < 24 * 60 * 60 * 1000) return;

    const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
    const now = Date.now();

    if (lastVisit) {
      const daysSince = (now - parseInt(lastVisit)) / (1000 * 60 * 60 * 24);
      if (daysSince >= 2) setShow(true);
    }

    localStorage.setItem(LAST_VISIT_KEY, String(now));
  }, []);

  if (!show) return null;

  return (
    <div className="fixed bottom-24 right-4 z-50 max-w-sm rounded-2xl border border-brand-gold/30 bg-gradient-to-br from-brand-navy to-[var(--brand-navy-deep)] p-4 shadow-2xl md:bottom-6">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-gold/20">
          <Bell className="h-5 w-5 text-brand-gold" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-white">Il est temps de reprendre !</p>
          <p className="mt-1 text-xs leading-relaxed text-white/80">
            Vous n&apos;avez pas étudié depuis 2 jours. 20 minutes aujourd&apos;hui = 1 leçon de plus vers votre certification.
          </p>
          <button
            onClick={() => {
              setShow(false);
              localStorage.setItem(DISMISSED_KEY, String(Date.now()));
            }}
            className="mt-3 rounded-lg bg-brand-gold px-4 py-1.5 text-xs font-bold text-brand-navy transition hover:bg-yellow-300"
          >
            Continuer ma formation
          </button>
        </div>
        <button
          onClick={() => {
            setShow(false);
            localStorage.setItem(DISMISSED_KEY, String(Date.now()));
          }}
          className="rounded p-1 text-white/40 hover:bg-white/10"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
