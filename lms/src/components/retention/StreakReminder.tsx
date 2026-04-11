"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flame, X, Clock, Trophy } from "lucide-react";
import { getGamificationState, updateStreak } from "@/lib/gamification";

interface StreakReminderProps {
  onDismiss?: () => void;
}

export function StreakReminder({ onDismiss }: StreakReminderProps) {
  const [show, setShow] = useState(false);
  const [streak, setStreak] = useState(0);
  const [variant, setVariant] = useState<"morning" | "evening" | "broken" | null>(null);

  useEffect(() => {
    // Check if we should show reminder
    const checkReminder = () => {
      const state = getGamificationState();
      const lastLogin = state.lastLoginDate;
      const today = new Date().toISOString().slice(0, 10);
      
      // Already logged in today
      if (lastLogin === today) {
        setShow(false);
        return;
      }

      // Check if streak is at risk (yesterday was last login)
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const yesterdayStr = yesterday.toISOString().slice(0, 10);
      
      const hours = new Date().getHours();
      
      if (lastLogin === yesterdayStr && state.streak > 0) {
        // Streak at risk
        if (hours >= 18) {
          setVariant("evening");
          setStreak(state.streak);
          setShow(true);
        }
      } else if (state.streak >= 3 && hours >= 9 && hours <= 11) {
        // Morning motivation for good streak
        setVariant("morning");
        setStreak(state.streak);
        setShow(true);
      }
    };

    checkReminder();
    
    // Check every hour
    const interval = setInterval(checkReminder, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDismiss = () => {
    setShow(false);
    onDismiss?.();
    // Remember dismissal for today
    localStorage.setItem("streak-reminder-dismissed", new Date().toISOString().slice(0, 10));
  };

  const handleContinue = () => {
    // Trigger streak update
    updateStreak();
    setShow(false);
    onDismiss?.();
  };

  // Check if already dismissed today
  useEffect(() => {
    const dismissed = localStorage.getItem("streak-reminder-dismissed");
    if (dismissed === new Date().toISOString().slice(0, 10)) {
      setShow(false);
    }
  }, []);

  if (!show || !variant) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -50, scale: 0.9 }}
        className="fixed top-20 right-4 z-50 max-w-sm"
      >
        <div className={`relative overflow-hidden rounded-2xl border p-4 shadow-2xl ${
          variant === "evening" 
            ? "border-amber-500/30 bg-gradient-to-br from-amber-500/20 to-orange-500/10" 
            : "border-emerald-500/30 bg-gradient-to-br from-emerald-500/20 to-teal-500/10"
        }`}>
          {/* Background animation */}
          <div className="absolute inset-0 opacity-30">
            <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10 blur-2xl" />
          </div>
          
          <button
            onClick={handleDismiss}
            className="absolute right-2 top-2 rounded-full p-1 text-white/40 hover:bg-white/10 hover:text-white"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="relative flex items-start gap-3">
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
              variant === "evening" 
                ? "bg-amber-500/30 text-amber-400" 
                : "bg-emerald-500/30 text-emerald-400"
            }`}>
              {variant === "evening" ? (
                <Clock className="h-6 w-6" />
              ) : (
                <Trophy className="h-6 w-6" />
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h4 className="font-bold text-white">
                  {variant === "evening" ? "Votre série est en danger !" : "Continuez votre légende !"}
                </h4>
                <div className="flex items-center gap-1 rounded-full bg-black/20 px-2 py-0.5 text-xs font-bold text-amber-400">
                  <Flame className="h-3 w-3" />
                  {streak}
                </div>
              </div>
              
              <p className="mt-1 text-sm text-white/70">
                {variant === "evening" 
                  ? `Vous n'avez pas encore étudié aujourd'hui. Il ne vous reste que quelques heures pour maintenir votre série de ${streak} jours !`
                  : `Vous êtes sur une série de ${streak} jours ! Continuez comme ça pour débloquer le badge Marathonien (30 jours).`
                }
              </p>
              
              <div className="mt-3 flex gap-2">
                <button
                  onClick={handleContinue}
                  className={`flex-1 rounded-xl px-4 py-2 text-sm font-semibold transition ${
                    variant === "evening"
                      ? "bg-amber-500 text-white hover:bg-amber-400"
                      : "bg-emerald-500 text-white hover:bg-emerald-400"
                  }`}
                >
                  {variant === "evening" ? "Continuer ma série" : "Aller à la formation"}
                </button>
                <button
                  onClick={handleDismiss}
                  className="rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-white/70 hover:bg-white/20"
                >
                  Plus tard
                </button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
