"use client";

import { useCallback, useMemo, useState } from "react";
import type { DragDropExercise } from "@/data/drag-drop-exercises";

/** Mélange identique côté serveur et client (évite les erreurs d'hydratation). */
function mulberry32(seed: number) {
  return function next() {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seedFromString(key: string): number {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < key.length; i++) {
    h ^= key.charCodeAt(i);
    h = Math.imul(h, 16777619) >>> 0;
  }
  return h >>> 0;
}

function shuffleDeterministic<T>(items: readonly T[], seedKey: string): T[] {
  const out = [...items];
  const rand = mulberry32(seedFromString(seedKey));
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

type Props = {
  exercises: DragDropExercise[];
};

export function DragDropExerciseBlock({ exercises }: Props) {
  const [activeTab, setActiveTab] = useState(0);

  if (exercises.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-2xl border border-[#1a3a5c]/15 bg-white shadow-[0_25px_50px_-12px_rgba(26,58,92,0.18)] ring-1 ring-black/5">
      {/* En-tete */}
      <div className="relative border-b border-[#1a3a5c]/10 bg-[#1a3a5c] px-5 py-5 sm:px-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#d4af37]">
            Exercice interactif
          </p>
          <h2 className="mt-1.5 text-xl font-bold leading-snug tracking-tight text-white sm:text-2xl">
            {exercises[activeTab].title}
          </h2>
        </div>
      </div>

      {/* Onglets si plusieurs exercices */}
      {exercises.length > 1 && (
        <div className="flex gap-1 border-b border-[#1a3a5c]/10 bg-slate-50 px-5 sm:px-8">
          {exercises.map((ex, i) => (
            <button
              key={ex.id}
              onClick={() => setActiveTab(i)}
              className={`relative px-4 py-3 text-sm font-medium transition-colors ${
                i === activeTab
                  ? "text-[#1a3a5c]"
                  : "text-zinc-400 hover:text-zinc-600"
              }`}
            >
              Exercice {i + 1}
              {i === activeTab && (
                <span className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-[#d4af37]" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Contenu */}
      <div className="px-5 py-7 sm:px-8 sm:py-9">
        {exercises[activeTab].type === "order" ? (
          <OrderExercise key={exercises[activeTab].id} exercise={exercises[activeTab]} />
        ) : (
          <MatchExercise key={exercises[activeTab].id} exercise={exercises[activeTab]} />
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   ORDER EXERCISE
   ───────────────────────────────────────────── */

function OrderExercise({ exercise }: { exercise: DragDropExercise }) {
  const correctOrder = exercise.correctOrder ?? [];
  const totalSlots = correctOrder.length;

  const shuffledItems = useMemo(() => {
    const indices = exercise.items.map((_, i) => i);
    return shuffleDeterministic(indices, `${exercise.id}:order`);
  }, [exercise.id, exercise.items]);

  const [placedItems, setPlacedItems] = useState<(number | null)[]>(
    Array(totalSlots).fill(null),
  );
  const [validated, setValidated] = useState(false);

  const availableItems = useMemo(() => {
    const placed = new Set(placedItems.filter((v): v is number => v !== null));
    return shuffledItems.filter((idx) => !placed.has(idx));
  }, [shuffledItems, placedItems]);

  const handlePickItem = useCallback(
    (itemIndex: number) => {
      if (validated) return;
      setPlacedItems((prev) => {
        const nextSlot = prev.indexOf(null);
        if (nextSlot === -1) return prev;
        const updated = [...prev];
        updated[nextSlot] = itemIndex;
        return updated;
      });
    },
    [validated],
  );

  const handleRemoveFromSlot = useCallback(
    (slotIndex: number) => {
      if (validated) return;
      setPlacedItems((prev) => {
        const updated = [...prev];
        updated[slotIndex] = null;
        return updated;
      });
    },
    [validated],
  );

  const handleValidate = useCallback(() => {
    setValidated(true);
  }, []);

  const handleRetry = useCallback(() => {
    setPlacedItems(Array(totalSlots).fill(null));
    setValidated(false);
  }, [totalSlots]);

  const allPlaced = placedItems.every((v) => v !== null);

  const score = useMemo(() => {
    if (!validated) return 0;
    return placedItems.reduce<number>((acc, itemIdx, slotIdx) => {
      if (itemIdx === null) return acc;
      return acc + (itemIdx === correctOrder[slotIdx] ? 1 : 0);
    }, 0);
  }, [validated, placedItems, correctOrder]);

  return (
    <div>
      <p className="mb-6 text-sm leading-relaxed text-zinc-600">
        {exercise.instruction}
      </p>

      {/* Slots numerotes */}
      <div className="mb-6 space-y-3">
        {placedItems.map((itemIdx, slotIdx) => {
          let borderColor = "border-[#1a3a5c]/15";
          let bgColor = "bg-slate-50";
          if (validated && itemIdx !== null) {
            const isCorrect = itemIdx === correctOrder[slotIdx];
            borderColor = isCorrect ? "border-emerald-400" : "border-red-400";
            bgColor = isCorrect ? "bg-emerald-50" : "bg-red-50";
          }

          return (
            <div key={slotIdx} className="flex items-center gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#1a3a5c] text-xs font-bold text-white">
                {slotIdx + 1}
              </span>
              <button
                onClick={() => handleRemoveFromSlot(slotIdx)}
                disabled={validated || itemIdx === null}
                className={`min-h-[48px] w-full rounded-xl border-2 ${borderColor} ${bgColor} px-4 py-3 text-left text-sm font-medium transition-all ${
                  itemIdx !== null && !validated
                    ? "cursor-pointer text-[#1a3a5c] hover:border-red-300 hover:bg-red-50/50"
                    : itemIdx !== null
                      ? "cursor-default text-[#1a3a5c]"
                      : "cursor-default text-zinc-300"
                }`}
              >
                {itemIdx !== null ? (
                  <span className="flex items-center gap-2">
                    {exercise.items[itemIdx]}
                    {validated &&
                      (itemIdx === correctOrder[slotIdx] ? (
                        <span className="ml-auto text-lg">&#10003;</span>
                      ) : (
                        <span className="ml-auto text-lg">&#10007;</span>
                      ))}
                  </span>
                ) : (
                  "Cliquez sur un element ci-dessous..."
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Elements disponibles */}
      {!validated && availableItems.length > 0 && (
        <div className="mb-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-400">
            Elements a placer
          </p>
          <div className="flex flex-wrap gap-2">
            {availableItems.map((itemIdx) => (
              <button
                key={itemIdx}
                onClick={() => handlePickItem(itemIdx)}
                className="rounded-xl border-2 border-[#d4af37]/30 bg-white px-4 py-3 text-sm font-medium text-[#1a3a5c] shadow-sm transition-all hover:border-[#d4af37] hover:bg-[#d4af37]/5 hover:shadow-md active:scale-[0.97]"
              >
                {exercise.items[itemIdx]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Score + boutons */}
      {validated && (
        <div className="mb-6 rounded-xl border border-[#1a3a5c]/10 bg-gradient-to-r from-[#1a3a5c]/5 to-transparent p-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-[#1a3a5c]">
              {score}/{totalSlots}
            </span>
            <div>
              <p className="text-sm font-semibold text-[#1a3a5c]">
                {score === totalSlots
                  ? "Parfait !"
                  : score >= totalSlots / 2
                    ? "Bien joue !"
                    : "Continuez vos efforts !"}
              </p>
              <p className="text-xs text-zinc-500">
                {score === totalSlots
                  ? "Vous maîtrisez parfaitement cet enchaînement."
                  : "Relisez la lecon et reessayez pour ameliorer votre score."}
              </p>
            </div>
            {score === totalSlots && (
              <span className="ml-auto rounded-full bg-[#d4af37]/15 px-3 py-1.5 text-xs font-bold text-[#d4af37]">
                +25 XP
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex gap-3">
        {!validated && (
          <button
            onClick={handleValidate}
            disabled={!allPlaced}
            className="rounded-xl bg-[#1a3a5c] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#1a3a5c]/90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Verifier
          </button>
        )}
        {validated && (
          <button
            onClick={handleRetry}
            className="rounded-xl border-2 border-[#1a3a5c]/20 bg-white px-6 py-3 text-sm font-semibold text-[#1a3a5c] transition-all hover:border-[#1a3a5c]/40 hover:bg-slate-50"
          >
            Recommencer
          </button>
        )}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   MATCH EXERCISE
   ───────────────────────────────────────────── */

const PAIR_COLORS = [
  { bg: "bg-blue-50", border: "border-blue-400", text: "text-blue-700" },
  { bg: "bg-amber-50", border: "border-amber-400", text: "text-amber-700" },
  { bg: "bg-emerald-50", border: "border-emerald-400", text: "text-emerald-700" },
  { bg: "bg-purple-50", border: "border-purple-400", text: "text-purple-700" },
  { bg: "bg-rose-50", border: "border-rose-400", text: "text-rose-700" },
  { bg: "bg-cyan-50", border: "border-cyan-400", text: "text-cyan-700" },
  { bg: "bg-orange-50", border: "border-orange-400", text: "text-orange-700" },
  { bg: "bg-teal-50", border: "border-teal-400", text: "text-teal-700" },
];

function MatchExercise({ exercise }: { exercise: DragDropExercise }) {
  const matchPairs = exercise.matchPairs ?? [];
  const leftItems = matchPairs.map((p) => p.left);

  const shuffledRight = useMemo(() => {
    const items = matchPairs.map((p) => p.right);
    return shuffleDeterministic(items, `${exercise.id}:match`);
  }, [exercise.id, exercise.matchPairs]);

  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [matches, setMatches] = useState<Map<number, number>>(new Map());
  const [validated, setValidated] = useState(false);

  const matchedLeftIndices = useMemo(() => new Set(matches.keys()), [matches]);
  const matchedRightIndices = useMemo(
    () => new Set(matches.values()),
    [matches],
  );

  const getColorForLeft = useCallback(
    (leftIdx: number) => {
      if (!matches.has(leftIdx)) return null;
      const orderedKeys = [...matches.keys()].sort((a, b) => a - b);
      const colorIdx = orderedKeys.indexOf(leftIdx) % PAIR_COLORS.length;
      return PAIR_COLORS[colorIdx];
    },
    [matches],
  );

  const getColorForRight = useCallback(
    (rightIdx: number) => {
      for (const [leftIdx, rIdx] of matches) {
        if (rIdx === rightIdx) return getColorForLeft(leftIdx);
      }
      return null;
    },
    [matches, getColorForLeft],
  );

  const handleLeftClick = useCallback(
    (leftIdx: number) => {
      if (validated) return;
      if (matchedLeftIndices.has(leftIdx)) {
        setMatches((prev) => {
          const next = new Map(prev);
          next.delete(leftIdx);
          return next;
        });
        setSelectedLeft(null);
        return;
      }
      setSelectedLeft((prev) => (prev === leftIdx ? null : leftIdx));
    },
    [validated, matchedLeftIndices],
  );

  const handleRightClick = useCallback(
    (rightIdx: number) => {
      if (validated) return;
      if (matchedRightIndices.has(rightIdx)) {
        for (const [leftIdx, rIdx] of matches) {
          if (rIdx === rightIdx) {
            setMatches((prev) => {
              const next = new Map(prev);
              next.delete(leftIdx);
              return next;
            });
            break;
          }
        }
        return;
      }
      if (selectedLeft === null) return;
      setMatches((prev) => {
        const next = new Map(prev);
        next.set(selectedLeft, rightIdx);
        return next;
      });
      setSelectedLeft(null);
    },
    [validated, selectedLeft, matchedRightIndices, matches],
  );

  const handleValidate = useCallback(() => {
    setValidated(true);
  }, []);

  const handleRetry = useCallback(() => {
    setMatches(new Map());
    setSelectedLeft(null);
    setValidated(false);
  }, []);

  const allMatched = matches.size === leftItems.length;

  const results = useMemo(() => {
    if (!validated) return new Map<number, boolean>();
    const map = new Map<number, boolean>();
    for (const [leftIdx, rightIdx] of matches) {
      const correctRight = matchPairs[leftIdx].right;
      const isCorrect = shuffledRight[rightIdx] === correctRight;
      map.set(leftIdx, isCorrect);
    }
    return map;
  }, [validated, matches, matchPairs, shuffledRight]);

  const score = useMemo(
    () => [...results.values()].filter(Boolean).length,
    [results],
  );

  return (
    <div>
      <p className="mb-6 text-sm leading-relaxed text-zinc-600">
        {exercise.instruction}
      </p>

      <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-zinc-400">
        {selectedLeft !== null
          ? "Maintenant, cliquez sur la definition correspondante a droite"
          : "Cliquez sur un element a gauche, puis sur sa definition a droite"}
      </p>

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {/* Colonne gauche */}
        <div className="space-y-2">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#1a3a5c]/60">
            Elements
          </p>
          {leftItems.map((label, leftIdx) => {
            const color = getColorForLeft(leftIdx);
            const isSelected = selectedLeft === leftIdx;
            const isMatched = matchedLeftIndices.has(leftIdx);
            let validationClass = "";
            if (validated && results.has(leftIdx)) {
              validationClass = results.get(leftIdx)
                ? "border-emerald-400 bg-emerald-50"
                : "border-red-400 bg-red-50";
            }

            return (
              <button
                key={leftIdx}
                onClick={() => handleLeftClick(leftIdx)}
                disabled={validated}
                className={`w-full rounded-xl border-2 px-4 py-3 text-left text-sm font-medium transition-all ${
                  validated
                    ? `cursor-default ${validationClass}`
                    : isSelected
                      ? "border-[#d4af37] bg-[#d4af37]/10 text-[#1a3a5c] shadow-md"
                      : isMatched && color
                        ? `${color.border} ${color.bg} ${color.text}`
                        : "border-[#1a3a5c]/15 bg-white text-[#1a3a5c] hover:border-[#d4af37]/50 hover:bg-[#d4af37]/5"
                }`}
              >
                <span className="flex items-center gap-2">
                  {label}
                  {validated &&
                    results.has(leftIdx) &&
                    (results.get(leftIdx) ? (
                      <span className="ml-auto text-emerald-600">&#10003;</span>
                    ) : (
                      <span className="ml-auto text-red-500">&#10007;</span>
                    ))}
                </span>
              </button>
            );
          })}
        </div>

        {/* Colonne droite */}
        <div className="space-y-2">
          <p className="mb-2 text-xs font-bold uppercase tracking-widest text-[#1a3a5c]/60">
            Definitions
          </p>
          {shuffledRight.map((def, rightIdx) => {
            const color = getColorForRight(rightIdx);
            const isMatched = matchedRightIndices.has(rightIdx);

            return (
              <button
                key={rightIdx}
                onClick={() => handleRightClick(rightIdx)}
                disabled={validated}
                className={`w-full rounded-xl border-2 px-4 py-3 text-left text-sm transition-all ${
                  validated
                    ? "cursor-default border-[#1a3a5c]/10 bg-slate-50 text-zinc-600"
                    : isMatched && color
                      ? `${color.border} ${color.bg} ${color.text}`
                      : selectedLeft !== null
                        ? "border-[#1a3a5c]/15 bg-white text-zinc-600 hover:border-[#d4af37]/50 hover:bg-[#d4af37]/5"
                        : "border-[#1a3a5c]/10 bg-slate-50 text-zinc-500"
                }`}
              >
                {def}
              </button>
            );
          })}
        </div>
      </div>

      {/* Score + boutons */}
      {validated && (
        <div className="mb-6 rounded-xl border border-[#1a3a5c]/10 bg-gradient-to-r from-[#1a3a5c]/5 to-transparent p-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold text-[#1a3a5c]">
              {score}/{leftItems.length}
            </span>
            <div>
              <p className="text-sm font-semibold text-[#1a3a5c]">
                {score === leftItems.length
                  ? "Parfait !"
                  : score >= leftItems.length / 2
                    ? "Bien joue !"
                    : "Continuez vos efforts !"}
              </p>
              <p className="text-xs text-zinc-500">
                {score === leftItems.length
                  ? "Toutes les correspondances sont correctes."
                  : "Relisez la lecon et reessayez."}
              </p>
            </div>
            {score === leftItems.length && (
              <span className="ml-auto rounded-full bg-[#d4af37]/15 px-3 py-1.5 text-xs font-bold text-[#d4af37]">
                +25 XP
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex gap-3">
        {!validated && (
          <button
            onClick={handleValidate}
            disabled={!allMatched}
            className="rounded-xl bg-[#1a3a5c] px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-[#1a3a5c]/90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            Verifier
          </button>
        )}
        {validated && (
          <button
            onClick={handleRetry}
            className="rounded-xl border-2 border-[#1a3a5c]/20 bg-white px-6 py-3 text-sm font-semibold text-[#1a3a5c] transition-all hover:border-[#1a3a5c]/40 hover:bg-slate-50"
          >
            Recommencer
          </button>
        )}
      </div>
    </div>
  );
}
