"use client";

import { motion } from "framer-motion";

interface PulseRingProps {
  className?: string;
  color?: string;
  size?: number;
}

export function PulseRing({
  className = "",
  color = "#d4af37",
  size = 100,
}: PulseRingProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{ backgroundColor: color }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <div
        className="absolute inset-0 rounded-full flex items-center justify-center"
        style={{ backgroundColor: color }}
      >
        <div className="w-2 h-2 bg-white rounded-full" />
      </div>
    </div>
  );
}
