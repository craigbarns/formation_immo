"use client";

import { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { getLessonJourneyPosition } from "@/lib/formation-journey";

export function LessonJourneyBadge({
  moduleSlug,
  lessonSlug,
}: {
  moduleSlug: string;
  lessonSlug: string;
}) {
  const [pos, setPos] = useState<{ stepNumber: number; totalSteps: number } | null>(null);

  useEffect(() => {
    setPos(getLessonJourneyPosition(moduleSlug, lessonSlug));
  }, [moduleSlug, lessonSlug]);

  if (!pos) return null;

  return (
    <p className="mt-3 inline-flex items-center gap-2 rounded-full border border-brand-navy/10 bg-brand-navy/[0.04] px-3 py-1.5 text-xs font-semibold text-brand-navy">
      <MapPin className="h-3.5 w-3.5 shrink-0 text-brand-gold" aria-hidden />
      <span className="tabular-nums">
        Étape {pos.stepNumber} sur {pos.totalSteps} du parcours
      </span>
    </p>
  );
}
