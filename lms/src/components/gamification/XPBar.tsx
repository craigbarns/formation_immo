"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { getLevelForXP, updateStreak } from "@/lib/gamification";
import { Flame, ShieldCheck, Zap } from "lucide-react";
import { motion } from "framer-motion";

export function XPBar() {
  const [mounted, setMounted] = useState(false);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("gamification_state")
          .select("xp, streak")
          .eq("user_id", user.id)
          .single();
        if (data) {
          setXp(data.xp || 0);
          setStreak(data.streak || 0);
          requestAnimationFrame(() => setMounted(true));
          return;
        }
      }
      const { state } = updateStreak();
      setXp(state.xp);
      setStreak(state.streak);
      requestAnimationFrame(() => setMounted(true));
    }
    load();
  }, []);

  if (!mounted) {
    return (
      <div
        className="flex h-9 min-w-[7rem] items-center sm:min-w-[10rem]"
        aria-hidden
      />
    );
  }

  const { current, progressToNext } = getLevelForXP(xp);

  return (
    <div className="flex min-w-0 flex-shrink-0 items-center gap-3 sm:gap-6">
      {/* Streak */}
      {streak > 0 && (
        <div className="group flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-xs font-black text-orange-400 shadow-lg shadow-orange-500/5">
          <Flame className="h-4 w-4 text-orange-500 fill-orange-500 group-hover:animate-bounce transition-transform" />
          <span className="tabular-nums uppercase tracking-widest">{streak} Jours</span>
        </div>
      )}

      {/* Level & XP */}
      <div className="flex items-center gap-4 group">
        <div className="relative">
            <div className="absolute inset-0 rounded-full bg-brand-gold/20 blur-lg animate-pulse" />
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-brand-gold shadow-2xl transition-transform group-hover:scale-110">
                <ShieldCheck size={20} />
            </div>
        </div>
        <div className="hidden sm:block">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-800 dark:text-white">Niveau {current.level}</span>
            <span className="text-[9px] font-black uppercase tracking-widest text-brand-gold/80 dark:text-brand-gold/60">{current.title}</span>
          </div>
          <div className="mt-1.5 flex items-center gap-3">
            <div className="h-1.5 w-24 overflow-hidden rounded-full bg-slate-200 dark:bg-white/5 ring-1 ring-slate-300 dark:ring-white/10 shadow-inner">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-brand-gold via-white to-brand-gold shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                initial={{ width: 0 }}
                animate={{ width: `${progressToNext}%` }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            <div className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-slate-500 dark:text-white/30 tabular-nums">
                <Zap size={8} className="text-brand-gold" /> {xp} XP
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
