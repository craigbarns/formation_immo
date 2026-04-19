"use client";

import { motion } from "framer-motion";
import { Flame } from "lucide-react";

interface StreakFlameProps {
  streak: number;
  maxStreak?: number;
}

export function StreakFlame({ streak, maxStreak = 30 }: StreakFlameProps) {
  const flames = Array.from({ length: Math.min(streak, maxStreak) }, (_, i) => i);
  // const cols = 6;
  // const rows = Math.ceil(flames.length / cols);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900">Série de connexion</h3>
        <div className="flex items-center gap-2">
          <Flame className="w-5 h-5 text-orange-500" />
          <span className="text-2xl font-bold text-orange-600">{streak}</span>
          <span className="text-sm text-gray-500">jours</span>
        </div>
      </div>

      {/* Flame grid */}
      <div className="flex flex-wrap gap-2 justify-center">
        {flames.map((_, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: index * 0.05,
              type: "spring",
              stiffness: 200,
            }}
            whileHover={{ scale: 1.2 }}
            className="relative"
          >
            <motion.div
              animate={{
                y: [0, -3, 0],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 0.8 + (index % 3) * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Flame
                className="w-8 h-8"
                style={{
                  color: index >= streak - 3 ? "#f97316" : "#fb923c",
                }}
                fill={index >= streak - 3 ? "#f97316" : "#fb923c"}
              />
            </motion.div>
          </motion.div>
        ))}
        
        {/* Empty slots */}
        {Array.from({ length: Math.max(0, maxStreak - streak) }, (_, i) => (
          <div
            key={`empty-${i}`}
            className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center"
          >
            <Flame className="w-5 h-5 text-gray-300" />
          </div>
        ))}
      </div>

      <div className="text-center">
        {streak >= 7 ? (
          <p className="text-sm text-orange-600 font-medium">
            <Flame className="inline h-4 w-4 text-orange-500" /> Superbe série ! Continue comme ça !
          </p>
        ) : streak >= 3 ? (
          <p className="text-sm text-gray-600">
            Tu es sur la bonne voie ! Continue ta série.
          </p>
        ) : (
          <p className="text-sm text-gray-500">
            Connecte-toi demain pour commencer ta série !
          </p>
        )}
      </div>
    </div>
  );
}
