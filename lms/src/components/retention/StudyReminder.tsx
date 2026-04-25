"use client";

import { useEffect, useState } from "react";
import { X, Bell, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LAST_VISIT_KEY = "formation-last-visit";
const DISMISSED_KEY = "formation-reminder-dismissed";

function getInitialShow(): boolean {
  if (typeof window === "undefined") return false;
  const dismissed = localStorage.getItem(DISMISSED_KEY);
  if (dismissed && Date.now() - parseInt(dismissed) < 24 * 60 * 60 * 1000) return false;
  const lastVisit = localStorage.getItem(LAST_VISIT_KEY);
  if (!lastVisit) return false;
  const daysSince = (Date.now() - parseInt(lastVisit)) / (1000 * 60 * 60 * 24);
  return daysSince >= 2;
}

export function StudyReminder() {
  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return false;
    return getInitialShow();
  });

  useEffect(() => {
    localStorage.setItem(LAST_VISIT_KEY, String(Date.now()));
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed bottom-24 right-4 z-[70] max-w-sm rounded-[2rem] border border-brand-gold/30 bg-[#070d18] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.6)] md:bottom-8 backdrop-blur-xl"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/[0.05] to-transparent pointer-events-none rounded-[2rem]" />
            <div className="relative flex items-start gap-4">
                <div className="relative shrink-0">
                    <div className="absolute inset-0 rounded-full bg-brand-gold/20 blur-xl animate-pulse" />
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-brand-gold/10 border border-brand-gold/20 text-brand-gold shadow-lg">
                        <Bell className="h-6 w-6" />
                    </div>
                </div>
                <div className="min-w-0 flex-1 pt-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold mb-1 flex items-center gap-2">
                        <Sparkles size={10} /> RAPPEL D&apos;ENGAGEMENT
                    </p>
                    <p className="text-base font-black text-white leading-tight uppercase tracking-tight">Le succès n&apos;attend pas</p>
                    <p className="mt-3 text-sm leading-relaxed text-white/50 font-medium italic">
                        &laquo; 20 minutes aujourd&apos;hui = 1 étape de plus vers votre excellence opérationnelle. Reprenez là où vous en étiez. &raquo;
                    </p>
                    <button
                        onClick={() => {
                            setShow(false);
                            localStorage.setItem(DISMISSED_KEY, String(Date.now()));
                        }}
                        className="mt-6 w-full rounded-xl bg-white/[0.05] border border-white/10 py-3 text-[10px] font-black uppercase tracking-widest text-white/60 transition hover:bg-brand-gold hover:text-brand-navy hover:border-brand-gold"
                    >
                        Compris, je m&apos;y remets
                    </button>
                </div>
                <button
                    onClick={() => {
                        setShow(false);
                        localStorage.setItem(DISMISSED_KEY, String(Date.now()));
                    }}
                    className="shrink-0 rounded-full p-1.5 text-white/20 transition hover:bg-white/10 hover:text-white"
                    aria-label="Fermer"
                >
                    <X className="h-4 w-4" />
                </button>
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
