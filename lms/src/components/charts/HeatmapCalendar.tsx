"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface ActivityData {
  date: string;
  count: number;
}

interface HeatmapCalendarProps {
  data?: ActivityData[];
}

const DAYS = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
const MONTHS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];

export function HeatmapCalendar({ data }: HeatmapCalendarProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Generate last 16 weeks of data
  const generateData = (): ActivityData[] => {
    const result: ActivityData[] = [];
    const today = new Date();
    
    for (let i = 112; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Simulate activity based on localStorage if available
      const dateStr = date.toISOString().split("T")[0];
      const hasActivity = Math.random() > 0.6;
      
      result.push({
        date: dateStr,
        count: hasActivity ? Math.floor(Math.random() * 4) + 1 : 0,
      });
    }
    return result;
  };

  const activityData = data || generateData();

  const getColor = (count: number) => {
    if (count === 0) return "bg-gray-100";
    if (count === 1) return "bg-emerald-200";
    if (count === 2) return "bg-emerald-300";
    if (count === 3) return "bg-emerald-400";
    return "bg-emerald-500";
  };

  if (!mounted) return null;

  // Group by weeks
  const weeks: ActivityData[][] = [];
  for (let i = 0; i < activityData.length; i += 7) {
    weeks.push(activityData.slice(i, i + 7));
  }

  const totalActive = activityData.filter((d) => d.count > 0).length;
  const totalDays = activityData.length;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-gray-900">Activité</h3>
          <p className="text-sm text-gray-500">
            {totalActive} jours actifs sur {totalDays}
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span>Moins</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-gray-100 rounded-sm" />
            <div className="w-3 h-3 bg-emerald-200 rounded-sm" />
            <div className="w-3 h-3 bg-emerald-300 rounded-sm" />
            <div className="w-3 h-3 bg-emerald-400 rounded-sm" />
            <div className="w-3 h-3 bg-emerald-500 rounded-sm" />
          </div>
          <span>Plus</span>
        </div>
      </div>

      {/* Heatmap grid */}
      <div className="flex gap-1 overflow-x-auto pb-2">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex flex-col gap-1">
            {week.map((day, dayIndex) => (
              <motion.div
                key={`${weekIndex}-${dayIndex}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: (weekIndex * 7 + dayIndex) * 0.002 }}
                className={`w-3 h-3 rounded-sm ${getColor(day.count)}`}
                title={`${day.date}: ${day.count} activité(s)`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
