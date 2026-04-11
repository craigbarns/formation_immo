"use client";

import { AudioPlayer } from "./AudioPlayer";
import { KeyConceptsPanel } from "./KeyConceptsPanel";
import { StatDashboard } from "./StatDashboard";
import { ComparisonTable } from "./ComparisonTable";
import { TakeawaysCard } from "./TakeawaysCard";
import type { LessonVisuals } from "@/data/lesson-keyconcepts";
import type { ModuleAvatar } from "@/data/module-avatars";

type Props = {
  audioUrl: string;
  title: string;
  avatar?: ModuleAvatar;
  visuals: LessonVisuals | null;
};

export function AudioLessonView({ audioUrl, title, avatar, visuals }: Props) {
  return (
    <div className="space-y-6">
      {/* Audio player — hero element */}
      <AudioPlayer src={audioUrl} title={title} avatar={avatar} />

      {/* Visual learning panels */}
      {visuals && (
        <div className="space-y-5">
          {/* Key concepts */}
          {visuals.keyConcepts.length > 0 && (
            <section>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[#1a3a5c]">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#1a3a5c] text-xs text-white">
                  &#x1F4A1;
                </span>
                Concepts cles
              </h3>
              <KeyConceptsPanel concepts={visuals.keyConcepts} />
            </section>
          )}

          {/* Stats dashboard */}
          {visuals.stats && visuals.stats.length > 0 && (
            <section>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[#1a3a5c]">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#d4af37] text-xs text-[#1a3a5c]">
                  &#x1F4CA;
                </span>
                Chiffres a connaitre
              </h3>
              <StatDashboard stats={visuals.stats} />
            </section>
          )}

          {/* Comparison table */}
          {visuals.comparison && (
            <section>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-[#1a3a5c]">
                <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[#1a3a5c]/10 text-xs text-[#1a3a5c]">
                  &#x2194;&#xFE0F;
                </span>
                Comparatif
              </h3>
              <ComparisonTable
                title={visuals.comparison.title}
                colAHeader={visuals.comparison.colAHeader}
                colBHeader={visuals.comparison.colBHeader}
                rows={visuals.comparison.rows}
              />
            </section>
          )}

          {/* Takeaways */}
          {visuals.takeaways && visuals.takeaways.length > 0 && (
            <section>
              <TakeawaysCard items={visuals.takeaways} />
            </section>
          )}
        </div>
      )}
    </div>
  );
}
