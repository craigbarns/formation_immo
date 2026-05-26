"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, ChevronDown } from "lucide-react";
import { formatDuration } from "@/data/course";

type Lesson = {
  slug: string;
  title: string;
  duration: number;
  interactiveScenarioId?: string;
};

export function ModuleLessonsToggle({
  lessons,
  moduleSlug,
}: {
  lessons: Lesson[];
  moduleSlug: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-8 border-t border-white/5 pt-6">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/75 hover:text-white/70 transition-colors"
      >
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
        {open ? "Masquer les leçons" : `Voir les ${lessons.length} leçons`}
      </button>
      {open && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-2">
          {lessons.map((lesson) => (
            <Link
              key={lesson.slug}
              href={`/formation/${moduleSlug}/${lesson.slug}`}
              className="flex items-center justify-between gap-4 rounded-xl px-4 py-3 transition hover:bg-white/5 hover:translate-x-1 group/item border border-transparent hover:border-white/5"
            >
              <span className="flex items-center gap-3 text-sm font-bold text-white/70 group-hover/item:text-white transition-colors">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-gold opacity-40 group-hover/item:opacity-100 transition-opacity" />
                {lesson.title}
              </span>
              <div className="flex items-center gap-3">
                {lesson.interactiveScenarioId && (
                  <span className="rounded-md bg-brand-gold/20 px-2 py-0.5 text-[9px] font-black uppercase text-brand-gold border border-brand-gold/20">
                    Interactif
                  </span>
                )}
                <span className="shrink-0 text-[10px] font-black uppercase tracking-widest text-white/75 flex items-center gap-1.5">
                  <Clock className="h-3 w-3" aria-hidden />
                  {formatDuration(lesson.duration)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
