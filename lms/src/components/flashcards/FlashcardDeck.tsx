"use client";

import { useState, useCallback, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Flashcard } from "@/data/flashcards";

const DIFFICULTY_LABELS = { 1: "Facile", 2: "Moyen", 3: "Difficile" } as const;
const DIFFICULTY_COLORS = {
  1: "bg-green-100 text-green-700",
  2: "bg-amber-100 text-amber-700",
  3: "bg-red-100 text-red-700",
} as const;

function loadLocalKnown(moduleSlug: string): Set<string> {
  if (typeof window === "undefined") return new Set();
  const stored = localStorage.getItem(`flashcards-known-${moduleSlug}`);
  return stored ? new Set(JSON.parse(stored)) : new Set();
}

function saveLocalKnown(moduleSlug: string, known: Set<string>) {
  if (typeof window !== "undefined") {
    localStorage.setItem(
      `flashcards-known-${moduleSlug}`,
      JSON.stringify([...known])
    );
  }
}

export function FlashcardDeck({ cards, moduleSlug }: { cards: Flashcard[]; moduleSlug: string }) {
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [known, setKnown] = useState<Set<string>>(() => loadLocalKnown(moduleSlug));
  const [showAll, setShowAll] = useState(true);

  // Load from Supabase on mount (and keep localStorage as fallback)
  useEffect(() => {
    let cancelled = false;

    async function loadFromSupabase() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user || cancelled) return;

      const { data } = await supabase
        .from("user_settings")
        .select("flashcards_known")
        .eq("user_id", user.id)
        .single();

      if (cancelled) return;

      const flashcardsKnown = data?.flashcards_known as Record<string, string[]> | undefined;
      const moduleKnown = flashcardsKnown?.[moduleSlug];
      if (moduleKnown && Array.isArray(moduleKnown)) {
        setKnown(new Set(moduleKnown));
      }
    }

    loadFromSupabase();
    return () => { cancelled = true; };
  }, [moduleSlug]);

  // Save to Supabase + localStorage whenever known changes
  useEffect(() => {
    saveLocalKnown(moduleSlug, known);

    async function saveToSupabase() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from("user_settings")
        .select("flashcards_known")
        .eq("user_id", user.id)
        .single();

      const existing = (data?.flashcards_known as Record<string, string[]> | undefined) || {};
      const next = { ...existing, [moduleSlug]: [...known] };

      await supabase
        .from("user_settings")
        .upsert({
          user_id: user.id,
          flashcards_known: next,
          updated_at: new Date().toISOString(),
        }, { onConflict: "user_id" });
    }

    saveToSupabase();
  }, [known, moduleSlug]);

  const filteredCards = showAll
    ? cards
    : cards.filter((c) => !known.has(c.id));

  const card = filteredCards[current];

  const nextCard = useCallback(() => {
    setFlipped(false);
    setCurrent((prev) => (prev + 1) % Math.max(filteredCards.length, 1));
  }, [filteredCards.length]);

  const prevCard = useCallback(() => {
    setFlipped(false);
    setCurrent((prev) =>
      prev === 0 ? Math.max(filteredCards.length - 1, 0) : prev - 1
    );
  }, [filteredCards.length]);

  function markKnown() {
    if (!card) return;
    setKnown((prev) => new Set(prev).add(card.id));
    nextCard();
  }

  function markUnknown() {
    if (!card) return;
    setKnown((prev) => {
      const next = new Set(prev);
      next.delete(card.id);
      return next;
    });
  }

  function resetAll() {
    setKnown(new Set());
    setCurrent(0);
    setFlipped(false);
    setShowAll(true);
  }

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        if (flipped) nextCard();
        else setFlipped(true);
      } else if (e.key === "ArrowLeft") {
        prevCard();
      } else if (e.key === "Enter") {
        setFlipped((f) => !f);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [flipped, nextCard, prevCard]);

  if (filteredCards.length === 0) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
        <p className="text-lg font-bold text-green-700">Bravo ! Toutes les cartes sont maitrisees.</p>
        <p className="mt-1 text-sm text-green-600">{known.size}/{cards.length} cartes validees</p>
        <button
          onClick={resetAll}
          className="mt-4 rounded-lg bg-brand-navy px-4 py-2 text-sm font-medium text-white hover:bg-brand-navy-deep"
        >
          Recommencer
        </button>
      </div>
    );
  }

  return (
    <div>
      {/* Stats bar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3 text-xs text-zinc-500">
          <span>
            Carte {current + 1}/{filteredCards.length}
          </span>
          <span className="text-green-600 font-medium">
            {known.size} maitrisee{known.size > 1 ? "s" : ""}
          </span>
          <span>/ {cards.length} total</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setShowAll(!showAll);
              setCurrent(0);
              setFlipped(false);
            }}
            className="rounded border border-zinc-300 px-2 py-1 text-[10px] font-medium text-zinc-600 hover:bg-zinc-50"
          >
            {showAll ? "A reviser uniquement" : "Toutes les cartes"}
          </button>
          <button
            onClick={resetAll}
            className="rounded border border-zinc-300 px-2 py-1 text-[10px] font-medium text-zinc-600 hover:bg-zinc-50"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Flashcard */}
      <div
        onClick={() => setFlipped((f) => !f)}
        className="relative cursor-pointer select-none"
        role="button"
        tabIndex={0}
      >
        <div
          className={`min-h-[220px] rounded-xl border-2 p-6 shadow-lg transition-all duration-300 ${
            flipped
              ? "border-brand-gold bg-gradient-to-br from-brand-navy to-brand-navy-deep"
              : "border-brand-navy/20 bg-white"
          }`}
        >
          {/* Category & difficulty */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-[10px] font-bold text-zinc-600">
              {card.category}
            </span>
            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                DIFFICULTY_COLORS[card.difficulty]
              }`}
            >
              {DIFFICULTY_LABELS[card.difficulty]}
            </span>
          </div>

          {/* Content */}
          {!flipped ? (
            <div className="flex flex-col items-center justify-center min-h-[120px]">
              <p className="text-center text-lg font-bold text-brand-navy">
                {card.question}
              </p>
              <p className="mt-4 text-xs text-zinc-400">
                Cliquez pour voir la reponse
              </p>
            </div>
          ) : (
            <div className="min-h-[120px]">
              <p className="text-sm font-medium text-zinc-200 mb-2">
                Reponse :
              </p>
              <p className="text-sm leading-relaxed text-white whitespace-pre-line">
                {card.answer}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-4 flex items-center justify-between gap-3">
        <button
          onClick={prevCard}
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
        >
          Precedente
        </button>
        <div className="flex gap-2">
          {flipped && !known.has(card.id) && (
            <button
              onClick={markKnown}
              className="rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
            >
              Je maitrise
            </button>
          )}
          {flipped && known.has(card.id) && (
            <button
              onClick={markUnknown}
              className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 hover:bg-amber-100"
            >
              A revoir
            </button>
          )}
        </div>
        <button
          onClick={nextCard}
          className="rounded-lg bg-brand-navy px-4 py-2 text-sm font-medium text-white hover:bg-brand-navy-deep"
        >
          Suivante
        </button>
      </div>

      {/* Progress dots */}
      <div className="mt-4 flex flex-wrap justify-center gap-1">
        {filteredCards.map((c, i) => (
          <button
            key={c.id}
            onClick={() => {
              setCurrent(i);
              setFlipped(false);
            }}
            className={`h-2 w-2 rounded-full transition ${
              i === current
                ? "bg-brand-gold scale-125"
                : known.has(c.id)
                ? "bg-green-400"
                : "bg-zinc-300"
            }`}
          />
        ))}
      </div>

      <p className="mt-3 text-center text-[10px] text-zinc-400">
        Navigation : Espace/Droite = retourner/suivante, Gauche = precedente, Entree = retourner
      </p>
    </div>
  );
}
