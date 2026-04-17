"use client";

import { useCallback, useEffect, useState } from "react";
import { Check } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { lessonId } from "@/data/course";
import { getStoredProgress } from "@/components/LessonProgress";
import {
  FORMATION_PROGRESS_CHANGED_EVENT,
  FORMATION_PROGRESS_STORAGE_KEY,
} from "@/constants/formation-storage";

export function ModuleLessonStatusBadge({
  moduleSlug,
  lessonSlug,
  index,
  accentColor,
}: {
  moduleSlug: string;
  lessonSlug: string;
  index: number;
  accentColor: string;
}) {
  const id = lessonId(moduleSlug, lessonSlug);
  const [done, setDone] = useState<boolean>(false);

  const refresh = useCallback(async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setDone(!!getStoredProgress()[id]);
    } else {
      const { data } = await supabase
        .from("lesson_progress")
        .select("completed")
        .eq("user_id", user.id)
        .eq("lesson_key", id)
        .single();
      setDone(!!data?.completed);
    }
  }, [id]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === null || e.key === FORMATION_PROGRESS_STORAGE_KEY) refresh();
    };
    window.addEventListener("storage", onStorage);
    window.addEventListener(FORMATION_PROGRESS_CHANGED_EVENT, refresh);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(FORMATION_PROGRESS_CHANGED_EVENT, refresh);
    };
  }, [refresh]);

  return (
    <span className="relative shrink-0">
      <span
        className="flex h-12 w-12 items-center justify-center rounded-2xl text-base font-bold text-white shadow-md transition group-hover:scale-105"
        style={{ backgroundColor: accentColor }}
      >
        {index}
      </span>
      {done ? (
        <span
          className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-emerald-500 text-white shadow-md"
          title="Leçon vue"
          aria-label="Leçon marquée comme vue"
        >
          <Check className="h-3 w-3" strokeWidth={3} aria-hidden />
        </span>
      ) : null}
    </span>
  );
}
