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

  // Calculate points for the radar
  const getPoint = (index: number, value: number, max: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = (value / max) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  // Generate polygon points
  const polygonPoints = skills
    .map((skill, i) => {
      const point = getPoint(i, skill.value, skill.max);
      return `${point.x},${point.y}`;
    })
    .join(" ");

  // Generate grid circles
  const gridLevels = [0.2, 0.4, 0.6, 0.8, 1];

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} className="overflow-visible">
        {/* Grid circles */}
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
            stroke="#e5e7eb"
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
              stroke="#e5e7eb"
              strokeWidth={1}
            />
          );
        })}

        {/* Data polygon */}
        <motion.polygon
          points={polygonPoints}
          fill="rgba(26, 58, 92, 0.2)"
          stroke="#1a3a5c"
          strokeWidth={2}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* Data points */}
        {skills.map((skill, i) => {
          const point = getPoint(i, skill.value, skill.max);
          return (
            <motion.circle
              key={i}
              cx={point.x}
              cy={point.y}
              r={4}
              fill="#1a3a5c"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + i * 0.1 }}
            />
          );
        })}

        {/* Labels */}
        {skills.map((skill, i) => {
          const point = getPoint(i, 120, 100);
          return (
            <text
              key={`label-${i}`}
              x={point.x}
              y={point.y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="text-xs fill-gray-600 font-medium"
            >
              {skill.name}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
