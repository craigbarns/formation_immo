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
  // Reduce radius to give more room for long labels
  const radius = (size / 2) * 0.55;
  const angleStep = (2 * Math.PI) / skills.length;

  const getPoint = (index: number, value: number, max: number, rFactor = 1) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = (value / max) * radius * rFactor;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
      angle,
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

        {/* Labels with improved positioning */}
        {skills.map((skill, i) => {
          // Push labels slightly further out
          const point = getPoint(i, 100, 100, 1.25);
          
          // Smart alignment based on position
          let textAnchor: "start" | "middle" | "end" = "middle";
          if (point.x < center - 20) textAnchor = "end";
          else if (point.x > center + 20) textAnchor = "start";

          let dy = "0.35em";
          if (point.y < center - 20) dy = "-0.5em"; // Top
          else if (point.y > center + 20) dy = "1.2em"; // Bottom

          return (
            <text
              key={`label-${i}`}
              x={point.x}
              y={point.y}
              textAnchor={textAnchor}
              dy={dy}
              className="text-[8px] font-black fill-white/50 uppercase tracking-widest"
            >
              {skill.name.split(' & ').map((part, j, arr) => (
                <tspan key={j} x={point.x} dy={j === 0 ? dy : "1.2em"}>
                  {part}{j < arr.length - 1 ? ' &' : ''}
                </tspan>
              ))}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
