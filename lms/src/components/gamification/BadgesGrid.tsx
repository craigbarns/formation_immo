"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { BADGES, getGamificationState, type BadgeId } from "@/lib/gamification";

const RARITY_BORDER = {
  common: "border-zinc-200",
  rare: "border-blue-300",
  epic: "border-purple-300",
  legendary: "border-amber-400",
};

const RARITY_BG = {
  common: "bg-zinc-50",
  rare: "bg-blue-50",
  epic: "bg-purple-50",
  legendary: "bg-gradient-to-br from-amber-50 to-yellow-50",
};

export function BadgesGrid() {
  const [earned, setEarned] = useState<BadgeId[]>([]);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("gamification_state")
          .select("earned_badges")
          .eq("user_id", user.id)
          .single();
        if (data) {
          setEarned(data.earned_badges || []);
          return;
        }
      }
      setEarned(getGamificationState().earnedBadges);
    }
    load();
  }, []);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {BADGES.map((badge) => {
        const unlocked = earned.includes(badge.id);
        return (
          <div
            key={badge.id}
            className={`relative rounded-xl border-2 p-3 text-center transition ${
              unlocked
                ? `${RARITY_BORDER[badge.rarity]} ${RARITY_BG[badge.rarity]} shadow-sm`
                : "border-zinc-200 bg-zinc-100/50 opacity-40 grayscale"
            }`}
          >
            <div className="text-3xl">{badge.icon}</div>
            <p className="mt-1 text-xs font-bold text-brand-navy">{badge.name}</p>
            <p className="mt-0.5 text-[10px] text-zinc-500">{badge.description}</p>
            {unlocked && (
              <div className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-[10px] text-white shadow">
                ✓
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
