"use client";

import { useCallback, useMemo, useState } from "react";
import type { DragDropExercise } from "@/data/drag-drop-exercises";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, RotateCcw, MousePointer2, ListOrdered, Sparkles, XCircle } from "lucide-react";

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
    <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#070d18] shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-brand-gold/20">
      {/* En-tete */}
      <div className="relative border-b border-white/10 bg-[#030712] px-8 py-8 sm:px-12 md:py-10">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/[0.03] to-transparent pointer-events-none" />
        <div className="relative">
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">
            ATELIER PRATIQUE INTERACTIF
          </p>
          <h2 className="mt-2 text-3xl font-black text-white uppercase tracking-tight leading-none">
            {exercises[activeTab].title}
          </h2>
        </div>
      </div>

      {/* Onglets si plusieurs exercices */}
      {exercises.length > 1 && (
        <div className="flex gap-2 overflow-x-auto border-b border-white/5 bg-black/20 px-6 py-4 scrollbar-hide">
          {exercises.map((ex, i) => (
            <button
              key={ex.id}
              onClick={() => setActiveTab(i)}
              className={`flex shrink-0 items-center gap-2.5 rounded-xl px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${
                i === activeTab
                  ? "bg-brand-gold text-brand-navy shadow-lg shadow-brand-gold/20"
                  : "bg-white/5 text-white/75 hover:bg-white/10 hover:text-white border border-white/5"
              }`}
            >
              EXERCICE {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* Contenu */}
      <div className="p-8 sm:p-10 lg:p-12">
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
  const correctOrder = useMemo(() => exercise.correctOrder ?? [], [exercise.correctOrder]);
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
    <div className="space-y-10">
      <div className="flex items-start gap-4">
          <ListOrdered className="w-6 h-6 text-brand-gold shrink-0 mt-1" />
          <p className="text-lg leading-relaxed text-white/70 italic font-medium">
            {exercise.instruction}
          </p>
      </div>

      {/* Slots numerotes */}
      <div className="space-y-3">
        {placedItems.map((itemIdx, slotIdx) => {
          let borderColor = "border-white/10";
          let bgColor = "bg-white/[0.02]";
          if (validated && itemIdx !== null) {
            const isCorrect = itemIdx === correctOrder[slotIdx];
            borderColor = isCorrect ? "border-emerald-500/50" : "border-red-500/50";
            bgColor = isCorrect ? "bg-emerald-500/5" : "bg-red-500/5";
          }

          return (
            <div key={slotIdx} className="flex items-center gap-5">
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-black transition-colors ${
                  itemIdx !== null ? "bg-brand-gold text-brand-navy" : "bg-white/5 text-white/75 border border-white/5"
              }`}>
                {slotIdx + 1}
              </span>
              <button
                onClick={() => handleRemoveFromSlot(slotIdx)}
                disabled={validated || itemIdx === null}
                className={`min-h-[64px] w-full rounded-2xl border-2 px-6 py-4 text-left text-base font-bold transition-all duration-300 ${borderColor} ${bgColor} ${
                  itemIdx !== null && !validated
                    ? "cursor-pointer text-white hover:border-red-500/50 hover:bg-red-500/10"
                    : itemIdx !== null
                      ? "cursor-default text-white"
                      : "cursor-default text-white/75 italic"
                }`}
              >
                {itemIdx !== null ? (
                  <div className="flex items-center justify-between gap-4">
                    <span>{exercise.items[itemIdx]}</span>
                    {validated && (
                        <AnimatePresence>
                            {itemIdx === correctOrder[slotIdx] ? (
                                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-emerald-400">
                                    <CheckCircle2 size={20} />
                                </motion.span>
                            ) : (
                                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-red-400">
                                    <XCircle size={20} />
                                </motion.span>
                            )}
                        </AnimatePresence>
                    )}
                  </div>
                ) : (
                  "Emplacement vide"
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Elements disponibles */}
      {!validated && (
        <div className="rounded-[2rem] border border-white/5 bg-white/[0.01] p-8 shadow-inner">
          <p className="mb-6 text-[10px] font-black uppercase tracking-widest text-white/75 text-center">
            ÉLÉMENTS À CLASSER
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {availableItems.map((itemIdx) => (
              <button
                key={itemIdx}
                onClick={() => handlePickItem(itemIdx)}
                className="rounded-2xl border-2 border-white/10 bg-white/5 px-6 py-4 text-sm font-bold text-white transition-all hover:border-brand-gold hover:bg-brand-gold/10 hover:-translate-y-1 active:scale-[0.97] shadow-xl"
              >
                {exercise.items[itemIdx]}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Score + boutons */}
      <AnimatePresence>
        {validated && (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-[2rem] border-2 border-white/10 bg-white/5 p-8 shadow-2xl"
            >
                <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8">
                    <div className="flex flex-col items-center">
                        <span className="text-5xl font-black text-brand-gold tabular-nums">
                            {score}<span className="text-2xl text-white/75">/{totalSlots}</span>
                        </span>
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/75 mt-2">SCORE FINAL</p>
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                        <p className="text-xl font-black text-white uppercase tracking-tight mb-2">
                            {score === totalSlots
                            ? "Maîtrise Parfaite"
                            : score >= totalSlots / 2
                                ? "Résultat Encourageant"
                                : "Nécessite une Révision"}
                        </p>
                        <p className="text-base text-white/50 font-medium italic">
                            {score === totalSlots
                            ? "Vous avez ordonné les étapes avec une précision chirurgicale."
                            : "Certaines nuances du processus sont encore à valider."}
                        </p>
                    </div>
                    {score === totalSlots && (
                        <div className="flex flex-col items-center gap-2 px-6 py-4 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 shadow-xl">
                            <Sparkles className="text-brand-gold w-6 h-6 animate-pulse" />
                            <span className="text-xs font-black text-brand-gold">+25 XP</span>
                        </div>
                    )}
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        {!validated && (
          <button
            onClick={handleValidate}
            disabled={!allPlaced}
            className="rounded-2xl bg-brand-gold px-12 py-5 text-sm font-black uppercase tracking-widest text-brand-navy shadow-2xl shadow-brand-gold/20 transition hover:bg-white hover:scale-105 active:scale-95 disabled:opacity-30 disabled:grayscale"
          >
            Vérifier l&apos;ordre
          </button>
        )}
        {validated && (
          <button
            onClick={handleRetry}
            className="group flex items-center justify-center gap-3 rounded-2xl border-2 border-white/10 bg-white/5 px-10 py-5 text-xs font-black uppercase tracking-widest text-white transition hover:bg-white hover:text-brand-navy shadow-xl active:scale-95"
          >
            <RotateCcw className="w-4 h-4 transition-transform group-hover:rotate-180 duration-500" />
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
  { bg: "bg-blue-500/10", border: "border-blue-500/30", text: "text-blue-300" },
  { bg: "bg-amber-500/10", border: "border-amber-500/30", text: "text-brand-gold" },
  { bg: "bg-emerald-500/10", border: "border-emerald-500/30", text: "text-emerald-300" },
  { bg: "bg-purple-500/10", border: "border-purple-500/30", text: "text-purple-300" },
  { bg: "bg-rose-500/10", border: "border-rose-500/30", text: "text-rose-300" },
  { bg: "bg-cyan-500/10", border: "border-cyan-500/30", text: "text-cyan-300" },
  { bg: "bg-orange-500/10", border: "border-orange-500/30", text: "text-orange-300" },
  { bg: "bg-teal-500/10", border: "border-teal-500/30", text: "text-teal-300" },
];

function MatchExercise({ exercise }: { exercise: DragDropExercise }) {
  const matchPairs = useMemo(
    () => exercise.matchPairs ?? [],
    [exercise.matchPairs],
  );
  const leftItems = useMemo(() => matchPairs.map((p) => p.left), [matchPairs]);

  const shuffledRight = useMemo(() => {
    const items = matchPairs.map((p) => p.right);
    return shuffleDeterministic(items, `${exercise.id}:match`);
  }, [exercise.id, matchPairs]);

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
    <div className="space-y-10">
      <div className="flex items-start gap-4">
          <MousePointer2 className="w-6 h-6 text-brand-gold shrink-0 mt-1" />
          <p className="text-lg leading-relaxed text-white/70 italic font-medium">
            {exercise.instruction}
          </p>
      </div>

      <p className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-white/75">
        {selectedLeft !== null
          ? "ÉTAPE 2 : Sélectionnez la définition correspondante à droite"
          : "ÉTAPE 1 : Choisissez un élément dans la colonne de gauche"}
      </p>

      <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 relative">
        {/* Decorative divider */}
        <div className="hidden sm:block absolute left-1/2 top-0 bottom-0 w-px bg-white/5 -translate-x-1/2" />

        {/* Colonne gauche */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-brand-gold/60 mb-4 px-2">ÉLÉMENTS CLÉS</h3>
          {leftItems.map((label, leftIdx) => {
            const color = getColorForLeft(leftIdx);
            const isSelected = selectedLeft === leftIdx;
            const isMatched = matchedLeftIndices.has(leftIdx);
            let validationClass = "border-white/5 bg-white/[0.02]";
            if (validated && results.has(leftIdx)) {
              validationClass = results.get(leftIdx)
                ? "border-emerald-500/50 bg-emerald-500/5 text-emerald-400"
                : "border-red-500/50 bg-red-500/5 text-red-400";
            }

            return (
              <button
                key={leftIdx}
                onClick={() => handleLeftClick(leftIdx)}
                disabled={validated}
                className={`w-full rounded-2xl border-2 px-6 py-5 text-left text-base font-black transition-all duration-300 ${
                  validated
                    ? `cursor-default ${validationClass}`
                    : isSelected
                      ? "border-brand-gold bg-brand-gold/10 text-white shadow-[0_0_30px_rgba(212,175,55,0.1)]"
                      : isMatched && color
                        ? `${color.border} ${color.bg} ${color.text} opacity-60`
                        : "border-white/10 bg-[#030712] text-white/70 hover:border-brand-gold/50 hover:bg-white/5"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span>{label}</span>
                  <AnimatePresence>
                    {validated && results.has(leftIdx) && (
                        <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }}>
                            {results.get(leftIdx) ? <CheckCircle2 size={20} /> : <XCircle size={20} />}
                        </motion.span>
                    )}
                  </AnimatePresence>
                </div>
              </button>
            );
          })}
        </div>

        {/* Colonne droite */}
        <div className="space-y-4">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-white/75 mb-4 px-2">DÉFINITIONS & ANALYSES</h3>
          {shuffledRight.map((def, rightIdx) => {
            const color = getColorForRight(rightIdx);
            const isMatched = matchedRightIndices.has(rightIdx);

            return (
              <button
                key={rightIdx}
                onClick={() => handleRightClick(rightIdx)}
                disabled={validated}
                className={`w-full rounded-2xl border-2 px-6 py-5 text-left text-sm font-medium leading-relaxed transition-all duration-300 ${
                  validated
                    ? "cursor-default border-white/5 bg-black/20 text-white/75"
                    : isMatched && color
                      ? `${color.border} ${color.bg} ${color.text} opacity-60`
                      : selectedLeft !== null
                        ? "border-white/20 bg-white/5 text-white hover:border-brand-gold/50 hover:bg-white/10"
                        : "border-white/5 bg-black/20 text-white/75"
                }`}
              >
                {def}
              </button>
            );
          })}
        </div>
      </div>

      {/* Score + boutons */}
      <AnimatePresence>
        {validated && (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-[2rem] border-2 border-white/10 bg-white/5 p-8 shadow-2xl"
            >
                <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8">
                    <div className="flex flex-col items-center">
                        <span className="text-5xl font-black text-brand-gold tabular-nums">
                            {score}<span className="text-2xl text-white/75">/{leftItems.length}</span>
                        </span>
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/75 mt-2">PRÉCISION</p>
                    </div>
                    <div className="flex-1 text-center sm:text-left">
                        <p className="text-xl font-black text-white uppercase tracking-tight mb-2">
                            {score === leftItems.length
                            ? "Parcours sans faute"
                            : score >= leftItems.length / 2
                                ? "Bons acquis de base"
                                : "Révision Recommandée"}
                        </p>
                        <p className="text-base text-white/50 font-medium italic">
                            {score === leftItems.length
                            ? "Toutes les corrélations terminologiques sont maîtrisées."
                            : "Quelques confusions subsistent entre les différents concepts."}
                        </p>
                    </div>
                    {score === leftItems.length && (
                        <div className="flex flex-col items-center gap-2 px-6 py-4 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 shadow-xl">
                            <Sparkles className="text-brand-gold w-6 h-6 animate-pulse" />
                            <span className="text-xs font-black text-brand-gold">+25 XP</span>
                        </div>
                    )}
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col sm:flex-row justify-center gap-4">
        {!validated && (
          <button
            onClick={handleValidate}
            disabled={!allMatched}
            className="rounded-2xl bg-brand-gold px-12 py-5 text-sm font-black uppercase tracking-widest text-brand-navy shadow-2xl shadow-brand-gold/20 transition hover:bg-white hover:scale-105 active:scale-95 disabled:opacity-30 disabled:grayscale"
          >
            Valider mes choix
          </button>
        )}
        {validated && (
          <button
            onClick={handleRetry}
            className="group flex items-center justify-center gap-3 rounded-2xl border-2 border-white/10 bg-white/5 px-10 py-5 text-xs font-black uppercase tracking-widest text-white transition hover:bg-white hover:text-brand-navy shadow-xl active:scale-95"
          >
            <RotateCcw className="w-4 h-4 transition-transform group-hover:rotate-180 duration-500" />
            Réinitialiser
          </button>
        )}
      </div>
    </div>
  );
}
