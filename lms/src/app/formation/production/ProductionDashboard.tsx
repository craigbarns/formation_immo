"use client";

import { useState } from "react";
import type { CourseModule } from "@/data/course";
import type { ModuleAvatar } from "@/data/module-avatars";
import type { ModuleVisuals } from "@/data/module-visuals";
import { AvatarCard } from "@/components/avatars/AvatarCard";
import { VisualGallery } from "@/components/visuals/VisualGallery";

type Props = {
  modules: CourseModule[];
  avatars: ModuleAvatar[];
  visuals: ModuleVisuals[];
};

export function ProductionDashboard({ modules, avatars, visuals }: Props) {
  const [expandedModule, setExpandedModule] = useState<string | null>(null);

  return (
    <div className="mt-6 space-y-4">
      {modules.map((mod, i) => {
        const avatar = avatars.find((a) => a.moduleSlug === mod.slug);
        const moduleVisuals = visuals.find((v) => v.moduleSlug === mod.slug);
        const visPending = moduleVisuals?.prompts.filter((p) => !p.imageUrl).length ?? 0;
        const visReady = (moduleVisuals?.prompts.length ?? 0) - visPending;
        const videosReady = mod.lessons.filter((l) => l.videoUrl).length;
        const videosComplete = videosReady === mod.lessons.length;
        const scenariosReady = mod.lessons.filter((l) => l.interactiveScenarioId).length;
        const isExpanded = expandedModule === mod.slug;

        return (
          <div
            key={mod.slug}
            className="rounded-xl border border-zinc-200 bg-white shadow-sm overflow-hidden"
          >
            {/* Module header */}
            <button
              onClick={() => setExpandedModule(isExpanded ? null : mod.slug)}
              className="w-full flex items-center justify-between gap-3 p-5 text-left hover:bg-zinc-50 transition"
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                  style={{ backgroundColor: avatar?.accentColor ?? "#1a3a5c" }}
                >
                  M{i + 1}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-[#1a3a5c] text-sm truncate">{mod.title}</h3>
                  <p className="text-xs text-zinc-500">{mod.lessons.length} lecons — {avatar?.name ?? "Pas d'avatar"}</p>
                </div>
              </div>

              {/* Status chips */}
              <div className="flex flex-wrap gap-1.5 shrink-0">
                <StatusChip
                  label={`Visuels ${visReady}/${visReady + visPending}`}
                  done={visPending === 0 && visReady > 0}
                />
                <StatusChip
                  label={`Videos ${videosReady}/${mod.lessons.length}`}
                  done={videosReady === mod.lessons.length}
                />
                <StatusChip
                  label={`D-ID ${videosComplete ? "OK" : "A faire"}`}
                  done={videosComplete}
                />
                <StatusChip
                  label={`Scenarios ${scenariosReady}`}
                  done={scenariosReady > 0}
                />
              </div>

              <svg
                className={`h-5 w-5 shrink-0 text-zinc-400 transition ${isExpanded ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Expanded content */}
            {isExpanded && (
              <div className="border-t border-zinc-100 p-5 space-y-6">
                {/* Avatar */}
                {avatar && (
                  <section>
                    <h4 className="text-xs font-bold uppercase tracking-wide text-zinc-400 mb-3">
                      Avatar pedagogique
                    </h4>
                    <AvatarCard avatar={avatar} />
                  </section>
                )}

                <section>
                  <h4 className="mb-3 text-xs font-bold uppercase tracking-wide text-zinc-400">
                    Vidéos présentateur (D-ID)
                  </h4>
                  <div
                    className={`rounded-lg border p-4 ${
                      videosComplete
                        ? "border-green-200 bg-green-50"
                        : "border-amber-200 bg-amber-50"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          videosComplete ? "bg-green-500" : "bg-amber-500"
                        }`}
                      />
                      <span className="text-sm font-medium">
                        MP4 hébergés — {videosReady}/{mod.lessons.length} leçons
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-zinc-600">
                      {videosComplete
                        ? "Les videoUrl pointent vers vos exports D-ID (ou autre hébergeur stable)."
                        : "Chaîne : script Markdown → TTS → D-ID → URL dans course.ts. Guide : lms/docs/D-ID-INTEGRATION.md."}
                    </p>
                  </div>
                </section>

                {/* Videos status */}
                <section>
                  <h4 className="text-xs font-bold uppercase tracking-wide text-zinc-400 mb-3">
                    Videos des lecons ({videosReady}/{mod.lessons.length})
                  </h4>
                  <div className="grid gap-2">
                    {mod.lessons.map((l) => (
                      <div
                        key={l.slug}
                        className="flex items-center gap-2 rounded-lg bg-zinc-50 px-3 py-2"
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${
                            l.videoUrl ? "bg-green-500" : "bg-zinc-300"
                          }`}
                        />
                        <span className="text-sm text-zinc-700 flex-1">{l.title}</span>
                        {l.interactiveScenarioId && (
                          <span className="rounded bg-[#1a3a5c]/10 px-1.5 py-0.5 text-[10px] font-bold text-[#1a3a5c]">
                            INTERACTIF
                          </span>
                        )}
                        <span className="text-[10px] text-zinc-400">
                          {l.videoUrl ? "Pret" : "A produire"}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Visuals gallery */}
                {moduleVisuals && moduleVisuals.prompts.length > 0 && (
                  <section>
                    <h4 className="text-xs font-bold uppercase tracking-wide text-zinc-400 mb-3">
                      Visuels Midjourney ({visReady}/{visReady + visPending})
                    </h4>
                    <VisualGallery prompts={moduleVisuals.prompts} />
                  </section>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function StatusChip({ label, done }: { label: string; done: boolean }) {
  return (
    <span
      className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
        done
          ? "bg-green-100 text-green-700"
          : "bg-zinc-100 text-zinc-500"
      }`}
    >
      {label}
    </span>
  );
}
