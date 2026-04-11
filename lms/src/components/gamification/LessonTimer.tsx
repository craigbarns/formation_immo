"use client";

import { useEffect, useRef, useState } from "react";
import { recordLessonTime, recordModuleTime } from "@/lib/gamification";

export function LessonTimer({
  lessonKey,
  moduleSlug,
}: {
  lessonKey: string;
  moduleSlug: string;
}) {
  const [seconds, setSeconds] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lastSaveRef = useRef(0);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      // Save remaining time on unmount
      const elapsed = seconds - lastSaveRef.current;
      if (elapsed > 0) {
        recordLessonTime(lessonKey, elapsed);
        recordModuleTime(moduleSlug, elapsed);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save every 30 seconds
  useEffect(() => {
    if (seconds > 0 && seconds % 30 === 0) {
      const elapsed = seconds - lastSaveRef.current;
      recordLessonTime(lessonKey, elapsed);
      recordModuleTime(moduleSlug, elapsed);
      lastSaveRef.current = seconds;
    }
  }, [seconds, lessonKey, moduleSlug]);

  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return (
    <div className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-mono tabular-nums text-zinc-600 shadow-sm">
      <svg className="h-3.5 w-3.5 text-[#d4af37]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      {hrs > 0 && `${hrs}h `}
      {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
    </div>
  );
}
