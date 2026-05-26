"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ActivityData {
  date: string;
  count: number;
}

interface HeatmapCalendarProps {
  data?: ActivityData[] | Record<string, number>;
}

export function HeatmapCalendar({ data }: HeatmapCalendarProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
  }, []);

  const generateEmptyData = (): ActivityData[] => {
    const result: ActivityData[] = [];
    const today = new Date();
    for (let i = 112; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      result.push({
        date: date.toISOString().split("T")[0],
        count: 0,
      });
    }
    return result;
  };

  const normalizeData = (input: HeatmapCalendarProps["data"]): ActivityData[] => {
    if (!input) return generateEmptyData();
    if (Array.isArray(input)) return input;
    return Object.entries(input).map(([date, count]) => ({ date, count }));
  };

  const activityData = normalizeData(data);

  const getColor = (count: number) => {
    if (count === 0) return "bg-white/5";
    if (count === 1) return "bg-emerald-500/20";
    if (count === 2) return "bg-emerald-500/40";
    if (count === 3) return "bg-emerald-500/60";
    return "bg-emerald-500";
  };

  if (!mounted) return null;

  const weeks: ActivityData[][] = [];
  for (let i = 0; i < activityData.length; i += 7) {
    weeks.push(activityData.slice(i, i + 7));
  }

  const totalActive = activityData.filter((d) => d.count > 0).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-white/75 mb-1">Impact apprentissage</p>
          <p className="text-lg font-black text-white">
            {totalActive} <span className="text-white/75 text-xs font-bold uppercase ml-1">Jours actifs</span>
          </p>
        </div>
        <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-widest text-white/75">
          <span>Moins</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map(v => (
                <div key={v} className={`w-3 h-3 rounded-sm ${getColor(v)}`} />
            ))}
          </div>
          <span>Plus</span>
        </div>
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-4 scrollbar-hide">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1.5 shrink-0">
            {week.map((day, dayIndex) => (
              <motion.div
                key={`${weekIndex}-${dayIndex}`}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: (weekIndex * 7 + dayIndex) * 0.001, ease: "easeOut" }}
                className={`w-3 h-3 rounded-sm ${getColor(day.count)} transition-colors duration-500 hover:ring-2 hover:ring-white/20`}
                title={`${day.date}: ${day.count} activité(s)`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
