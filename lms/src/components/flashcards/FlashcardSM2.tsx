"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, RotateCw, CheckCircle2, XCircle, MoreHorizontal } from "lucide-react";

// SM-2 Algorithm implementation
interface FlashcardData {
  id: string;
  front: string;
  back: string;
  moduleSlug: string;
}

interface SM2Card {
  id: string;
  front: string;
  back: string;
  moduleSlug: string;
  interval: number; // days
  repetitions: number;
  easeFactor: number;
  nextReview: string; // ISO date
  lastReviewed?: string;
}

const SM2_STORAGE_KEY = "formation-flashcards-sm2";

// Default ease factor
const DEFAULT_EF = 2.5;

function calculateNextReview(
  quality: number, // 0-5 (0=again, 3=good, 5=easy)
  card: SM2Card
): SM2Card {
  let { interval, repetitions, easeFactor } = card;
  
  // Update ease factor
  easeFactor = Math.max(1.3, easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
  
  if (quality < 3) {
    // Failed - reset
    repetitions = 0;
    interval = 1;
  } else {
    // Success
    repetitions += 1;
    if (repetitions === 1) {
      interval = 1;
    } else if (repetitions === 2) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
  }
  
  const nextReview = new Date();
  nextReview.setDate(nextReview.getDate() + interval);
  
  return {
    ...card,
    interval,
    repetitions,
    easeFactor,
    nextReview: nextReview.toISOString(),
    lastReviewed: new Date().toISOString(),
  };
}

function loadSM2Cards(): SM2Card[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SM2_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveSM2Cards(cards: SM2Card[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SM2_STORAGE_KEY, JSON.stringify(cards));
}

function getDueCards(cards: SM2Card[]): SM2Card[] {
  const now = new Date();
  return cards.filter(card => new Date(card.nextReview) <= now);
}

function initializeCards(flashcards: FlashcardData[]): SM2Card[] {
  const existing = loadSM2Cards();
  const existingIds = new Set(existing.map(c => c.id));
  
  const newCards = flashcards
    .filter(fc => !existingIds.has(fc.id))
    .map(fc => ({
      ...fc,
      interval: 0,
      repetitions: 0,
      easeFactor: DEFAULT_EF,
      nextReview: new Date().toISOString(),
    }));
  
  const allCards = [...existing, ...newCards];
  saveSM2Cards(allCards);
  return allCards;
}

interface FlashcardSM2Props {
  flashcards: FlashcardData[];
  moduleSlug: string;
}

export function FlashcardSM2({ flashcards, moduleSlug }: FlashcardSM2Props) {
  const [cards, setCards] = useState<SM2Card[]>([]);
  const [dueCards, setDueCards] = useState<SM2Card[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showBack, setShowBack] = useState(false);
  const [sessionStats, setSessionStats] = useState({ again: 0, good: 0, easy: 0 });
  const [sessionComplete, setSessionComplete] = useState(false);

  useEffect(() => {
    const initialized = initializeCards(flashcards);
    setCards(initialized);
    const due = getDueCards(initialized).filter(c => c.moduleSlug === moduleSlug);
    setDueCards(due);
  }, [flashcards, moduleSlug]);

  const handleResponse = useCallback((quality: number) => {
    const currentCard = dueCards[currentIndex];
    if (!currentCard) return;

    const updatedCard = calculateNextReview(quality, currentCard);
    
    // Update cards in storage
    const allCards = cards.map(c => c.id === updatedCard.id ? updatedCard : c);
    saveSM2Cards(allCards);
    setCards(allCards);

    // Update stats
    setSessionStats(prev => ({
      again: prev.again + (quality < 3 ? 1 : 0),
      good: prev.good + (quality === 3 || quality === 4 ? 1 : 0),
      easy: prev.easy + (quality === 5 ? 1 : 0),
    }));

    // Move to next card
    if (currentIndex < dueCards.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setShowBack(false);
    } else {
      setSessionComplete(true);
    }
  }, [currentIndex, dueCards, cards]);

  const restartSession = () => {
    const due = getDueCards(cards).filter(c => c.moduleSlug === moduleSlug);
    setDueCards(due);
    setCurrentIndex(0);
    setShowBack(false);
    setSessionComplete(false);
    setSessionStats({ again: 0, good: 0, easy: 0 });
  };

  if (dueCards.length === 0 && !sessionComplete) {
    return (
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400" />
        <h3 className="mt-4 text-lg font-bold text-white">Toutes les cartes sont à jour !</h3>
        <p className="mt-2 text-sm text-white/70">
          Revenez demain pour réviser les cartes programmées.
        </p>
      </div>
    );
  }

  if (sessionComplete) {
    const total = sessionStats.again + sessionStats.good + sessionStats.easy;
    const accuracy = total > 0 ? ((sessionStats.good + sessionStats.easy) / total) * 100 : 0;
    const isPerfect = sessionStats.again === 0 && total > 0;

    return (
      <div className="rounded-2xl overflow-hidden border border-[#d4af37]/20 bg-gradient-to-br from-[#1a3a5c]/60 to-[#0f1f33]/70 shadow-xl">
        {/* Header */}
        <div className="border-b border-white/10 px-6 py-6 text-center">
          <div className="text-4xl mb-2">{isPerfect ? "🏆" : accuracy >= 70 ? "🎉" : "📚"}</div>
          <h3 className="text-xl font-bold text-white">
            {isPerfect ? "Session parfaite !" : "Session terminée !"}
          </h3>
          <p className="mt-1 text-sm text-white/60">
            {isPerfect
              ? "Toutes les cartes maîtrisées !"
              : accuracy >= 70
                ? "Bonne progression — continuez !"
                : "Révisez les cartes difficiles demain."}
          </p>
        </div>

        <div className="p-6">
          {/* Score ring */}
          <div className="relative mx-auto flex h-28 w-28 items-center justify-center mb-6">
            <svg className="-rotate-90 absolute inset-0" viewBox="0 0 112 112">
              <circle cx="56" cy="56" r="48" strokeWidth="8" fill="none" className="stroke-white/10" />
              <circle
                cx="56" cy="56" r="48" strokeWidth="8" fill="none"
                stroke={accuracy >= 80 ? "#10b981" : accuracy >= 50 ? "#d4af37" : "#ef4444"}
                strokeDasharray={`${2 * Math.PI * 48}`}
                strokeDashoffset={`${2 * Math.PI * 48 * (1 - accuracy / 100)}`}
                strokeLinecap="round"
              />
            </svg>
            <div className="text-center">
              <p className="text-2xl font-black text-white">{accuracy.toFixed(0)}%</p>
              <p className="text-[10px] text-white/50">précision</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-4 text-center">
              <p className="text-2xl font-bold text-red-400">{sessionStats.again}</p>
              <p className="text-xs text-white/50 mt-1">À revoir</p>
            </div>
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4 text-center">
              <p className="text-2xl font-bold text-blue-400">{sessionStats.good}</p>
              <p className="text-xs text-white/50 mt-1">Bien</p>
            </div>
            <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 p-4 text-center">
              <p className="text-2xl font-bold text-emerald-400">{sessionStats.easy}</p>
              <p className="text-xs text-white/50 mt-1">Facile</p>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-white/40">
            Prochaine révision dans 24 h pour les cartes &ldquo;Bien&rdquo; et &ldquo;Facile&rdquo;
          </p>

          <button
            onClick={restartSession}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-[#d4af37] py-3.5 font-bold text-[#1a3a5c] shadow-lg transition hover:bg-[#e0bf4d] hover:shadow-xl active:scale-[0.98]"
          >
            <RotateCw className="h-4 w-4" />
            Nouvelle session
          </button>
        </div>
      </div>
    );
  }

  const currentCard = dueCards[currentIndex];
  const progress = ((currentIndex) / dueCards.length) * 100;

  // Feedback color after answering
  const feedbackColor = !showBack
    ? null
    : null; // will be set after response

  return (
    <div className="space-y-4">
      {/* Progress header */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <span className="text-white/70 font-medium">Carte</span>
          <span className="rounded-lg bg-white/15 px-2 py-0.5 text-sm font-bold text-white tabular-nums">
            {currentIndex + 1}/{dueCards.length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/50">{Math.round(progress)}%</span>
          <span className="text-[#d4af37] font-bold">
            {sessionStats.easy + sessionStats.good} ✓
          </span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-[#d4af37] to-amber-400"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Card with flip animation */}
      <div
        className="relative min-h-[240px] cursor-pointer"
        onClick={() => setShowBack(!showBack)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setShowBack(!showBack)}
        aria-label={showBack ? "Masquer la réponse" : "Révéler la réponse"}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={showBack ? "back" : "front"}
            initial={{ rotateY: showBack ? -90 : 90, opacity: 0, scale: 0.96 }}
            animate={{ rotateY: 0, opacity: 1, scale: 1 }}
            exit={{ rotateY: showBack ? 90 : -90, opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className={`rounded-2xl border p-8 text-center shadow-lg ${
              showBack
                ? "border-[#d4af37]/40 bg-gradient-to-br from-[#1a3a5c] via-[#1e4a73] to-[#0f1f33]"
                : "border-[#d4af37]/20 bg-gradient-to-br from-[#1a3a5c] to-[#0f1f33]"
            }`}
          >
            <div className="mb-4 flex justify-center">
              <Brain className={`h-8 w-8 ${showBack ? "text-[#d4af37]" : "text-white/40"}`} />
            </div>
            <p className={`text-xs font-bold uppercase tracking-widest ${showBack ? "text-[#d4af37]" : "text-white/40"}`}>
              {showBack ? "Réponse" : "Question"}
            </p>
            <p className="mt-4 text-lg font-medium leading-relaxed text-white">
              {showBack ? currentCard.back : currentCard.front}
            </p>
            {!showBack && (
              <p className="mt-6 text-xs text-white/30 flex items-center justify-center gap-1">
                <span>Cliquez pour révéler</span>
                <span aria-hidden>↩</span>
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Response buttons */}
      {showBack && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.22 }}
          className="grid grid-cols-3 gap-3"
        >
          <button
            onClick={() => handleResponse(0)}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-red-500/30 bg-red-500/15 p-3.5 text-red-400 transition hover:bg-red-500/25 hover:scale-[1.03] active:scale-[0.97]"
          >
            <XCircle className="h-6 w-6" />
            <span className="text-sm font-bold">Encore</span>
            <span className="text-[10px] text-white/40">&lt; 1 min</span>
          </button>
          <button
            onClick={() => handleResponse(3)}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-blue-500/30 bg-blue-500/15 p-3.5 text-blue-300 transition hover:bg-blue-500/25 hover:scale-[1.03] active:scale-[0.97]"
          >
            <MoreHorizontal className="h-6 w-6" />
            <span className="text-sm font-bold">Bien</span>
            <span className="text-[10px] text-white/40">1 jour</span>
          </button>
          <button
            onClick={() => handleResponse(5)}
            className="flex flex-col items-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/15 p-3.5 text-emerald-400 transition hover:bg-emerald-500/25 hover:scale-[1.03] active:scale-[0.97]"
          >
            <CheckCircle2 className="h-6 w-6" />
            <span className="text-sm font-bold">Facile</span>
            <span className="text-[10px] text-white/40">4 jours</span>
          </button>
        </motion.div>
      )}
    </div>
  );
}
