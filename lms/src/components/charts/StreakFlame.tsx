"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";

interface StreakFlameProps {
  streak: number;
  maxStreak?: number;
}

export function StreakFlame({ streak, maxStreak = 24 }: StreakFlameProps) {
  const flames = Array.from({ length: Math.min(streak, maxStreak) }, (_, i) => i);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Engagement quotidien</p>
        <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 px-4 py-1.5 rounded-xl">
          <Flame className="w-5 h-5 text-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
          <span className="text-xl font-black text-orange-500 tabular-nums">{streak}</span>
          <span className="text-[10px] font-black uppercase text-orange-500/60">Jours</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2.5 justify-center py-4">
        {flames.map((_, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: index * 0.04,
              type: "spring",
              damping: 12,
            }}
            className="relative"
          >
            <motion.div
              animate={{
                y: [0, -4, 0],
                filter: ["brightness(1) blur(0px)", "brightness(1.3) blur(1px)", "brightness(1) blur(0px)"],
              }}
              transition={{
                duration: 1 + (index % 3) * 0.3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Flame
                className="w-10 h-10"
                style={{
                  color: "#f97316",
                }}
                fill="#f97316"
              />
            </motion.div>
          </motion.div>
        ))}
        
        {Array.from({ length: Math.max(0, maxStreak - streak) }, (_, i) => (
          <div
            key={`empty-${i}`}
            className="w-10 h-10 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center"
          >
            <Flame className="w-5 h-5 text-white/10" />
          </div>
        ))}
      </div>

      <div className="text-center bg-[#030712] rounded-2xl p-4 border border-white/5 shadow-inner">
        {streak >= 7 ? (
          <p className="text-xs text-orange-400 font-black uppercase tracking-widest flex items-center justify-center gap-2">
            <Flame className="h-4 w-4" /> Performance d&apos;Élite !
          </p>
        ) : streak >= 1 ? (
          <p className="text-xs text-white/40 font-black uppercase tracking-widest">
            Série active — Maintenez le rythme.
          </p>
        ) : (
          <p className="text-xs text-white/20 font-black uppercase tracking-widest">
            Commencez votre ascension demain.
          </p>
        )}
      </div>
    </div>
  );
}
