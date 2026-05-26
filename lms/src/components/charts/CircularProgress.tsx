"use client";

import { motion } from "framer-motion";

interface CircularProgressProps {
  value: number;
  max: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  label: string;
  sublabel?: string;
}

export function CircularProgress({
  value,
  max,
  size = 120,
  strokeWidth = 10,
  color = "#d4af37",
  label,
  sublabel,
}: CircularProgressProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const progress = Math.min(value / max, 1);
  const dashoffset = circumference - progress * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Background circle */}
        <svg
          width={size}
          height={size}
          className="transform -rotate-90"
        >
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={strokeWidth}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashoffset }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-black text-white tabular-nums tracking-tighter">
            {Math.round(progress * 100)}<span className="text-xs text-white/75 ml-0.5">%</span>
          </span>
        </div>
      </div>
      <p className="mt-4 text-[10px] font-black uppercase tracking-[0.2em] text-white/60 text-center">{label}</p>
      {sublabel && <p className="text-[9px] font-bold text-white/75 uppercase tracking-widest mt-1">{sublabel}</p>}
    </div>
  );
}
