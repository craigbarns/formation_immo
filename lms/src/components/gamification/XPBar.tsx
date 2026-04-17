"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { getGamificationState, getLevelForXP, updateStreak } from "@/lib/gamification";

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

  const { current, next, progressToNext } = getLevelForXP(xp);

  return (
    <div className="flex min-w-0 flex-shrink-0 items-center gap-2 sm:gap-3">
      {/* Streak */}
      {streak > 0 && (
        <div className="flex items-center gap-1 rounded-full border border-orange-300/50 bg-orange-50 px-2.5 py-1 text-xs font-bold text-orange-700">
          <span className="text-sm">🔥</span>
          {streak}j
        </div>
      )}

      {/* Level & XP */}
      <div className="flex items-center gap-2">
        <span className="text-base">{current.icon}</span>
        <div className="hidden sm:block">
          <div className="flex items-baseline gap-1.5">
            <span className="text-xs font-bold text-white">Niv. {current.level}</span>
            <span className="text-[10px] text-white/80">{current.title}</span>
          </div>
          <div className="mt-0.5 flex items-center gap-2">
            <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/20">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-gold to-[#f0e6c8] transition-all duration-700"
                style={{ width: `${progressToNext}%` }}
              />
            </div>
            <span className="text-[10px] tabular-nums text-white/70">{xp} XP</span>
          </div>
        </div>
      </div>
    </div>
  );
}
