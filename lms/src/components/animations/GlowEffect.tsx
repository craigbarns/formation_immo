"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlowEffectProps {
  children: ReactNode;
  className?: string;
  color?: string;
  intensity?: "low" | "medium" | "high";
}

const intensityMap = {
  low: "0 0 20px",
  medium: "0 0 40px",
  high: "0 0 60px",
};

export function GlowEffect({
  children,
  className = "",
  color = "rgba(212, 175, 55, 0.5)",
  intensity = "medium",
}: GlowEffectProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{
        boxShadow: `${intensityMap[intensity]} ${color}`,
        transition: { duration: 0.3 },
      }}
    >
      {children}
    </motion.div>
  );
}
