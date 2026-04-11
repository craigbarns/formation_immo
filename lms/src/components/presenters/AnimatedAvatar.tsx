"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface AnimatedAvatarProps {
  name: string;
  role: string;
  color: string;
  emoji: string;
  isSpeaking?: boolean;
  expression?: "neutral" | "happy" | "thinking" | "excited" | "focused";
  size?: "sm" | "md" | "lg";
}

const expressions = {
  neutral: { scale: 1, rotate: 0 },
  happy: { scale: 1.1, rotate: [-5, 5, -5, 0] },
  thinking: { scale: 1, rotate: [0, -10, 0] },
  excited: { scale: [1, 1.2, 1], rotate: [-10, 10, -10, 10, 0] },
  focused: { scale: 1, rotate: 0 },
};

export function AnimatedAvatar({
  name,
  role,
  color,
  emoji,
  isSpeaking = false,
  expression = "neutral",
  size = "md",
}: AnimatedAvatarProps) {
  const [blink, setBlink] = useState(false);

  // Auto blink
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 150);
    }, 3000 + Math.random() * 2000);
    return () => clearInterval(blinkInterval);
  }, []);

  const sizeClasses = {
    sm: "w-16 h-16 text-2xl",
    md: "w-24 h-24 text-4xl",
    lg: "w-32 h-32 text-5xl",
  };

  return (
    <div className="flex flex-col items-center">
      {/* Avatar container */}
      <motion.div
        className={`relative ${sizeClasses[size]} rounded-3xl flex items-center justify-center shadow-2xl`}
        style={{ backgroundColor: color }}
        animate={expressions[expression]}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Glow effect when speaking */}
        {isSpeaking && (
          <motion.div
            className="absolute inset-0 rounded-3xl"
            style={{ backgroundColor: color }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}

        {/* Avatar face */}
        <motion.div
          className="relative z-10"
          animate={blink ? { scaleY: 0.1 } : { scaleY: 1 }}
          transition={{ duration: 0.1 }}
        >
          {emoji}
        </motion.div>

        {/* Speaking indicator */}
        {isSpeaking && (
          <div className="absolute -bottom-1 -right-1 flex gap-0.5">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 bg-white rounded-full"
                animate={{ height: [4, 16, 4] }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  delay: i * 0.15,
                }}
              />
            ))}
          </div>
        )}

        {/* Expression indicators */}
        {expression === "thinking" && (
          <motion.div
            className="absolute -top-2 -right-2 text-2xl"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, y: [-5, -10, -5] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            💭
          </motion.div>
        )}

        {expression === "excited" && (
          <motion.div
            className="absolute -top-3 left-0 right-0 flex justify-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-xl">✨</span>
            <span className="text-xl">🌟</span>
            <span className="text-xl">✨</span>
          </motion.div>
        )}
      </motion.div>

      {/* Name and role */}
      <div className="mt-3 text-center">
        <p className="font-bold text-gray-900">{name}</p>
        <p className="text-xs text-gray-500 uppercase tracking-wide">{role}</p>
      </div>
    </div>
  );
}
