"use client";

import { motion } from "framer-motion";

interface Skill {
  name: string;
  value: number;
  max: number;
}

interface RadarSkillsProps {
  skills: Skill[];
  size?: number;
}

export function RadarSkills({ skills, size = 250 }: RadarSkillsProps) {
  const center = size / 2;
  const radius = (size / 2) * 0.7;
  const angleStep = (2 * Math.PI) / skills.length;

  const getPoint = (index: number, value: number, max: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = (value / max) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const polygonPoints = skills
    .map((skill, i) => {
      const point = getPoint(i, skill.value, skill.max);
      return `${point.x},${point.y}`;
    })
    .join(" ");

  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1];

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Grid levels */}
        {gridLevels.map((level) => (
          <polygon
            key={level}
            points={skills
              .map((_, i) => {
                const point = getPoint(i, level * 100, 100);
                return `${point.x},${point.y}`;
              })
              .join(" ")}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth={1}
          />
        ))}

        {/* Axis lines */}
        {skills.map((_, i) => {
          const point = getPoint(i, 100, 100);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={point.x}
              y2={point.y}
              stroke="rgba(255,255,255,0.05)"
              strokeWidth={1}
            />
          );
        })}

        {/* Data polygon */}
        <motion.polygon
          points={polygonPoints}
          fill="rgba(212, 175, 55, 0.15)"
          stroke="#d4af37"
          strokeWidth={2}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Data points */}
        {skills.map((skill, i) => {
          const point = getPoint(i, skill.value, skill.max);
          return (
            <motion.circle
              key={i}
              cx={point.x}
              cy={point.y}
              r={3}
              fill="#fff"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.8 + i * 0.1 }}
            />
          );
        })}

        {/* Labels */}
        {skills.map((skill, i) => {
          const point = getPoint(i, 125, 100);
          return (
            <text
              key={`label-${i}`}
              x={point.x}
              y={point.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-[9px] font-black fill-white/40 uppercase tracking-widest"
            >
              {skill.name}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
