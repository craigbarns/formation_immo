"use client";

import { useMemo } from "react";
import { COURSE } from "@/data/course";
import { Calendar, CheckCircle2, Circle, Clock } from "lucide-react";

export function FormationCalendar({ completedLessons = [] }: { completedLessons?: string[] }) {
  const schedule = useMemo(() => {
    const weeks: Array<{
      week: number;
      moduleSlug: string;
      moduleTitle: string;
      lessons: Array<{ slug: string; title: string; duration: number; completed: boolean }>;
      totalDuration: number;
    }> = [];

    let currentWeek = 1;
    let weekDuration = 0;
    const TARGET_WEEK_HOURS = 5; // 5h par semaine

    for (const mod of COURSE) {
      const modWeeks: typeof weeks = [];
      let currentModLessons: typeof weeks[0]["lessons"] = [];

      for (const lesson of mod.lessons) {
        const isCompleted = completedLessons.includes(`${mod.slug}/${lesson.slug}`);
        currentModLessons.push({
          slug: lesson.slug,
          title: lesson.title,
          duration: lesson.duration,
          completed: isCompleted,
        });
        weekDuration += lesson.duration;

        if (weekDuration >= TARGET_WEEK_HOURS * 60) {
          modWeeks.push({
            week: currentWeek,
            moduleSlug: mod.slug,
            moduleTitle: mod.title,
            lessons: currentModLessons,
            totalDuration: weekDuration,
          });
          currentWeek++;
          currentModLessons = [];
          weekDuration = 0;
        }
      }

      if (currentModLessons.length > 0) {
        modWeeks.push({
          week: currentWeek,
          moduleSlug: mod.slug,
          moduleTitle: mod.title,
          lessons: currentModLessons,
          totalDuration: weekDuration,
        });
        currentWeek++;
        weekDuration = 0;
      }

      weeks.push(...modWeeks);
    }

    return weeks;
  }, [completedLessons]);

  const totalWeeks = schedule.length;
  const completedWeeks = schedule.filter((w) => w.lessons.every((l) => l.completed)).length;

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5 text-brand-navy" />
          <h3 className="text-lg font-bold text-brand-navy">Plan de formation</h3>
        </div>
        <p className="text-sm text-zinc-500">
          {completedWeeks}/{totalWeeks} semaines validées
        </p>
      </div>

      <div className="space-y-4">
        {schedule.map((week) => {
          const allDone = week.lessons.every((l) => l.completed);
          const someDone = week.lessons.some((l) => l.completed);
          return (
            <div
              key={week.week}
              className={`rounded-xl border p-4 transition ${
                allDone
                  ? "border-emerald-200 bg-emerald-50/50"
                  : someDone
                  ? "border-brand-gold/30 bg-brand-gold/5"
                  : "border-zinc-100 bg-zinc-50/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {allDone ? (
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <Circle className="h-4 w-4 text-zinc-300" />
                  )}
                  <p className="text-sm font-bold text-zinc-800">
                    Semaine {week.week} — {week.moduleTitle.replace(/^Module \d+ — /, "")}
                  </p>
                </div>
                <span className="flex items-center gap-1 text-2xs text-zinc-400">
                  <Clock className="h-3 w-3" />
                  {Math.round(week.totalDuration / 60 * 10) / 10}h
                </span>
              </div>
              <ul className="mt-2 space-y-1 pl-6">
                {week.lessons.map((lesson) => (
                  <li
                    key={lesson.slug}
                    className={`flex items-center gap-2 text-sm ${
                      lesson.completed ? "text-emerald-700 line-through" : "text-zinc-600"
                    }`}
                  >
                    {lesson.completed ? (
                      <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                    ) : (
                      <Circle className="h-3 w-3 text-zinc-300" />
                    )}
                    {lesson.title}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
