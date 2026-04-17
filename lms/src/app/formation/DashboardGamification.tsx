"use client";

import { useEffect, useState } from "react";
import { getGamificationState, getLevelForXP } from "@/lib/gamification";
import { createClient } from "@/lib/supabase/client";
import { GlobalTimeTracker } from "@/components/gamification/ModuleTimeTracker";
import { motion } from "framer-motion";
import { Medal, CheckCircle2, Flame } from "lucide-react";
import { AnimatedCounter } from "@/components/animations";

export function DashboardGamification() {
  const [mounted, setMounted] = useState(false);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [badges, setBadges] = useState(0);
  const [quizCorrect, setQuizCorrect] = useState(0);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));

    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data } = await supabase
          .from("gamification_state")
          .select("xp, streak, earned_badges, total_quiz_correct")
          .eq("user_id", user.id)
          .single();

        if (data) {
          setXp(data.xp ?? 0);
          setStreak(data.streak ?? 0);
          setBadges((data.earned_badges ?? []).length);
          setQuizCorrect(data.total_quiz_correct ?? 0);
        }
      } else {
        const state = getGamificationState();
        setXp(state.xp);
        setStreak(state.streak);
        setBadges(state.earnedBadges.length);
        setQuizCorrect(state.totalQuizCorrect);
      }
    }

    load();
  }, []);

  if (!mounted) return (
    <div className="mb-6 space-y-4">
      <div className="h-[188px] animate-pulse rounded-2xl bg-gradient-to-br from-zinc-200 to-zinc-100" />
      <div className="h-16 animate-pulse rounded-2xl bg-zinc-100" />
    </div>
  );

  const { current, next, progressToNext } = getLevelForXP(xp);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mb-6 space-y-4"
    >
      {/* Level progress card */}
      <div className="rounded-2xl border border-zinc-200/50 bg-gradient-to-br from-brand-navy via-[#244b75] to-brand-navy p-6 text-white shadow-xl relative overflow-hidden">
        {/* Decorative glass highlight */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-[0.03] rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 relative z-10">
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-4xl shadow-inner border border-white/20 backdrop-blur-sm"
          >
            {current.icon}
          </motion.div>
          <div className="flex-1 w-full">
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="text-lg font-bold tracking-tight">Niv. {current.level} — {current.title}</span>
              {streak > 0 && (
                <motion.span 
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="rounded-full bg-gradient-to-r from-orange-500/30 to-rose-500/30 border border-orange-400/30 px-2.5 py-0.5 text-xs font-bold text-orange-200 flex items-center gap-1 shadow-sm"
                >
                  <Flame size={12} className="text-orange-400" /> {streak} jours
                </motion.span>
              )}
            </div>
            <div className="mt-3 flex items-center gap-4">
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-black/40 shadow-inner">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressToNext}%` }}
                  transition={{ duration: 1.2, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-brand-gold via-[#f9e596] to-brand-gold shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                />
              </div>
              <AnimatedCounter value={xp} suffix=" XP" duration={1.5} className="text-sm font-bold tabular-nums tracking-wide text-amber-100" />
            </div>
            {next && (
              <p className="mt-1.5 text-xs font-medium text-white/70 tracking-wide">
                Encore <span className="text-white/80">{next.xpRequired - xp} XP</span> pour le statut {next.title} {next.icon}
              </p>
            )}
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3 relative z-10">
          <MiniStat icon={<Medal size={20} className="text-amber-300" />} value={badges} suffix="" label="Badges débloqués" />
          <MiniStat icon={<CheckCircle2 size={20} className="text-emerald-400" />} value={quizCorrect} suffix="" label="QCM réussis" />
          <MiniStat icon={<Flame size={20} className="text-orange-400" />} value={streak} suffix="j" label="Série en cours" />
        </div>
      </div>

      {/* Time tracker */}
      <GlobalTimeTracker />
    </motion.div>
  );
}

function MiniStat({ icon, value, suffix, label }: { icon: React.ReactNode; value: number; suffix: string; label: string }) {
  return (
    <motion.div
      whileHover={{ y: -2, backgroundColor: "rgba(255,255,255,0.15)" }}
      className="flex flex-col items-center justify-center rounded-xl bg-white/10 px-3 py-3 text-center border border-white/10 backdrop-blur-md transition-colors"
    >
      <div className="mb-1.5 drop-shadow-md">{icon}</div>
      <AnimatedCounter value={value} suffix={suffix} duration={1.2} className="text-lg font-bold tracking-tight" />
      <div className="text-[10px] font-medium uppercase tracking-wider text-white/70 mt-0.5">{label}</div>
    </motion.div>
  );
}
