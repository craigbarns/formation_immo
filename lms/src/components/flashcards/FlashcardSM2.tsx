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
    
    return (
      <div className="rounded-2xl border border-[#d4af37]/20 bg-gradient-to-br from-[#1a3a5c]/50 to-[#0f1f33]/50 p-8">
        <h3 className="text-center text-xl font-bold text-white">Session terminée !</h3>
        
        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="rounded-xl bg-red-500/10 p-4 text-center">
            <p className="text-2xl font-bold text-red-400">{sessionStats.again}</p>
            <p className="text-xs text-white/50">À revoir</p>
          </div>
          <div className="rounded-xl bg-blue-500/10 p-4 text-center">
            <p className="text-2xl font-bold text-blue-400">{sessionStats.good}</p>
            <p className="text-xs text-white/50">Bien</p>
          </div>
          <div className="rounded-xl bg-emerald-500/10 p-4 text-center">
            <p className="text-2xl font-bold text-emerald-400">{sessionStats.easy}</p>
            <p className="text-xs text-white/50">Facile</p>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-white/70">
            Précision : <span className="font-bold text-[#d4af37]">{accuracy.toFixed(0)}%</span>
          </p>
          <p className="mt-1 text-xs text-white/40">
            Prochaine révision dans 24h pour les cartes "Bien" et "Facile"
          </p>
        </div>
        
        <button
          onClick={restartSession}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#d4af37] py-3 font-semibold text-[#1a3a5c] transition hover:bg-[#e0bf4d]"
        >
          <RotateCw className="h-4 w-4" />
          Nouvelle session
        </button>
      </div>
    );
  }

  const currentCard = dueCards[currentIndex];
  const progress = ((currentIndex) / dueCards.length) * 100;

  return (
    <div className="space-y-4">
      {/* Progress */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-white/50">Carte {currentIndex + 1} sur {dueCards.length}</span>
        <span className="text-[#d4af37]">{Math.round(progress)}%</span>
      </div>
      <div className="h-2 rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full bg-[#d4af37]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
        />
      </div>

      {/* Card */}
      <div 
        className="relative min-h-[240px] cursor-pointer perspective-1000"
        onClick={() => setShowBack(!showBack)}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={showBack ? "back" : "front"}
            initial={{ rotateY: showBack ? -90 : 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: showBack ? 90 : -90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl border border-[#d4af37]/30 bg-gradient-to-br from-[#1a3a5c] to-[#0f1f33] p-8 text-center"
          >
            <div className="mb-4 flex justify-center">
              <Brain className="h-8 w-8 text-[#d4af37]" />
            </div>
            <p className="text-sm text-white/50">
              {showBack ? "Réponse" : "Question"}
            </p>
            <p className="mt-4 text-lg font-medium text-white">
              {showBack ? currentCard.back : currentCard.front}
            </p>
            {!showBack && (
              <p className="mt-6 text-xs text-white/30">
                Cliquez pour révéler la réponse
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Response buttons */}
      {showBack && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-3"
        >
          <button
            onClick={() => handleResponse(0)}
            className="flex flex-col items-center gap-1 rounded-xl bg-red-500/20 p-3 text-red-400 transition hover:bg-red-500/30"
          >
            <XCircle className="h-5 w-5" />
            <span className="text-xs font-semibold">Encore</span>
            <span className="text-[10px] text-white/50">&lt; 1min</span>
          </button>
          <button
            onClick={() => handleResponse(3)}
            className="flex flex-col items-center gap-1 rounded-xl bg-blue-500/20 p-3 text-blue-400 transition hover:bg-blue-500/30"
          >
            <MoreHorizontal className="h-5 w-5" />
            <span className="text-xs font-semibold">Bien</span>
            <span className="text-[10px] text-white/50">1 jour</span>
          </button>
          <button
            onClick={() => handleResponse(5)}
            className="flex flex-col items-center gap-1 rounded-xl bg-emerald-500/20 p-3 text-emerald-400 transition hover:bg-emerald-500/30"
          >
            <CheckCircle2 className="h-5 w-5" />
            <span className="text-xs font-semibold">Facile</span>
            <span className="text-[10px] text-white/50">4 jours</span>
          </button>
        </motion.div>
      )}
    </div>
  );
}
