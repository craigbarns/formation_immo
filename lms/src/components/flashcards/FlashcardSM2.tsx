"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, RotateCw, CheckCircle2, XCircle, MoreHorizontal, Trophy, PartyPopper, BookOpen, ChevronDown, Sparkles } from "lucide-react";
import { recordFlashcardReviewed } from "@/lib/gamification";
import { createClient } from "@/lib/supabase/client";

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

async function saveSM2CardsToSupabase(cards: SM2Card[]) {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from("flashcards_sm2").upsert({
      user_id: user.id,
      cards,
      updated_at: new Date().toISOString(),
    }, { onConflict: "user_id" });
  } catch {
    // Silently fail — localStorage is the fallback
  }
}

function getDueCards(cards: SM2Card[]): SM2Card[] {
  const now = new Date();
  return cards.filter(card => new Date(card.nextReview) <= now);
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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      let existing: SM2Card[] = [];

      if (user) {
        const { data } = await supabase
          .from("flashcards_sm2")
          .select("cards")
          .eq("user_id", user.id)
          .single();
        if (data?.cards) {
          existing = data.cards as SM2Card[];
        }
      }

      if (existing.length === 0) {
        existing = loadSM2Cards();
      }

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
      if (user) {
        await saveSM2CardsToSupabase(allCards);
      }

      if (!cancelled) {
        setCards(allCards);
        setDueCards(getDueCards(allCards).filter(c => c.moduleSlug === moduleSlug));
        setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [flashcards, moduleSlug]);

  const handleResponse = useCallback((quality: number) => {
    const currentCard = dueCards[currentIndex];
    if (!currentCard) return;

    const updatedCard = calculateNextReview(quality, currentCard);
    
    // Update cards in storage
    const allCards = cards.map(c => c.id === updatedCard.id ? updatedCard : c);
    saveSM2Cards(allCards);
    saveSM2CardsToSupabase(allCards).catch(() => {});
    setCards(allCards);

    // Update stats
    setSessionStats(prev => ({
      again: prev.again + (quality < 3 ? 1 : 0),
      good: prev.good + (quality === 3 || quality === 4 ? 1 : 0),
      easy: prev.easy + (quality === 5 ? 1 : 0),
    }));

    // Track gamification
    recordFlashcardReviewed(1);

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

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-4 w-32 bg-slate-100 dark:bg-white/5 rounded-lg animate-pulse" />
          <div className="h-4 w-20 bg-slate-100 dark:bg-white/5 rounded-lg animate-pulse" />
        </div>
        <div className="h-2 w-full bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-1/3 bg-brand-gold/20 animate-shimmer" />
        </div>
        <div className="h-64 w-full bg-[#070d18] border border-slate-200 dark:border-white/5 rounded-[2rem] animate-pulse" />
      </div>
    );
  }

  if (dueCards.length === 0 && !sessionComplete) {
    return (
      <div className="rounded-[2.5rem] border border-white/10 bg-[#070d18] p-12 text-center shadow-2xl">
        <div className="h-20 w-20 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="h-10 w-10 text-emerald-400" />
        </div>
        <h3 className="text-2xl font-black text-white uppercase tracking-tight">Ancrage Terminé</h3>
        <p className="mt-4 text-base text-white/50 font-medium italic leading-relaxed max-w-sm mx-auto">
          Toutes les cartes de ce module sont à jour. Le système SM-2 vous préviendra dès qu&apos;une révision sera nécessaire.
        </p>
      </div>
    );
  }

  if (sessionComplete) {
    const total = sessionStats.again + sessionStats.good + sessionStats.easy;
    const accuracy = total > 0 ? ((sessionStats.good + sessionStats.easy) / total) * 100 : 0;
    const isPerfect = sessionStats.again === 0 && total > 0;

    return (
      <div className="rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#070d18] shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
        {/* Header */}
        <div className={`relative px-8 py-12 text-center border-b border-white/5 ${
            isPerfect ? "bg-amber-500/10" : "bg-emerald-500/10"
        }`}>
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
          <div className="flex justify-center mb-6">
              <div className={`h-16 w-16 rounded-2xl flex items-center justify-center border shadow-2xl ${
                  isPerfect ? "bg-amber-500/20 border-amber-500/40 text-brand-gold" : "bg-emerald-500/20 border-emerald-500/40 text-emerald-400"
              }`}>
                {isPerfect ? <Trophy size={32} /> : accuracy >= 70 ? <PartyPopper size={32} /> : <BookOpen size={32} />}
              </div>
          </div>
          <h3 className="text-3xl font-black text-white uppercase tracking-tight leading-none mb-3">
            {isPerfect ? "SESSION PARFAITE !" : "SESSION TERMINÉE !"}
          </h3>
          <p className="text-lg text-white/50 font-medium italic">
            &laquo; {isPerfect ? "Ancrage mémoriel total sur ce lot de concepts." : "La persévérance est la clé de l&apos;expertise."} &raquo;
          </p>
        </div>

        <div className="p-8 md:p-12">
          {/* Score ring */}
          <div className="relative mx-auto flex h-36 w-36 items-center justify-center mb-12">
            <svg className="-rotate-90 absolute inset-0" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" strokeWidth="6" fill="none" className="stroke-white/5" />
              <motion.circle
                cx="60" cy="60" r="54" strokeWidth="6" fill="none"
                stroke={accuracy >= 80 ? "#10b981" : accuracy >= 50 ? "#d4af37" : "#ef4444"}
                strokeDasharray={`${2 * Math.PI * 54}`}
                initial={{ strokeDashoffset: 2 * Math.PI * 54 }}
                animate={{ strokeDashoffset: 2 * Math.PI * 54 * (1 - accuracy / 100) }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                strokeLinecap="round"
              />
            </svg>
            <div className="text-center">
              <p className="text-4xl font-black text-white tabular-nums tracking-tighter">{accuracy.toFixed(0)}<span className="text-sm opacity-40 ml-0.5">%</span></p>
              <p className="text-[10px] font-black text-white/40 uppercase tracking-widest mt-1">Précision</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            <div className="rounded-2xl bg-red-500/5 border border-red-500/20 p-5 text-center transition-all hover:bg-red-500/10">
              <p className="text-2xl font-black text-red-400 tabular-nums">{sessionStats.again}</p>
              <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mt-1">À REVOIR</p>
            </div>
            <div className="rounded-2xl bg-blue-500/5 border border-blue-500/20 p-5 text-center transition-all hover:bg-blue-500/10">
              <p className="text-2xl font-black text-blue-400 tabular-nums">{sessionStats.good}</p>
              <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mt-1">BIEN</p>
            </div>
            <div className="rounded-2xl bg-emerald-500/5 border border-emerald-500/20 p-5 text-center transition-all hover:bg-emerald-500/10">
              <p className="text-2xl font-black text-emerald-400 tabular-nums">{sessionStats.easy}</p>
              <p className="text-[9px] font-black text-white/30 uppercase tracking-widest mt-1">FACILE</p>
            </div>
          </div>

          <div className="text-center bg-[#030712] rounded-[1.5rem] p-5 border border-white/5 shadow-inner mb-10">
              <p className="text-[10px] font-black text-white/30 uppercase tracking-widest leading-relaxed">
                  Prochaine révision planifiée dans 24h pour consolider les acquis.
              </p>
          </div>

          <button
            onClick={restartSession}
            className="group flex w-full items-center justify-center gap-4 rounded-[1.5rem] bg-brand-gold px-12 py-5 text-sm font-black uppercase tracking-[0.2em] text-brand-navy shadow-[0_20px_50px_rgba(212,175,55,0.25)] transition hover:bg-white hover:scale-105 active:scale-95"
          >
            <RotateCw className="w-4 h-4 transition-transform group-hover:rotate-180 duration-700" />
            NOUVELLE SESSION
          </button>
        </div>
      </div>
    );
  }

  const currentCard = dueCards[currentIndex];
  const progress = ((currentIndex) / dueCards.length) * 100;

  return (
    <div className="space-y-6">
      {/* Progress header */}
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold shadow-lg">
              <Brain size={20} />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-white/40">ANCRAGE EN COURS</p>
            <p className="text-sm font-black text-slate-900 dark:text-white tabular-nums">
                {currentIndex + 1} <span className="text-slate-400 dark:text-white/20">/ {dueCards.length} CARTES</span>
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-black text-brand-gold tabular-nums tracking-widest uppercase">
            {sessionStats.easy + sessionStats.good} RÉUSSIES
          </p>
          <div className="mt-1 flex items-center justify-end gap-1.5 text-[9px] font-black text-slate-400 dark:text-white/20">
              <div className="h-1 w-1 rounded-full bg-brand-gold animate-pulse" />
              <span>{Math.round(progress)}% TERMINÉ</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-white/5 ring-1 ring-slate-200 dark:ring-white/10 shadow-inner mx-2">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-brand-gold via-white to-brand-gold shadow-[0_0_10px_rgba(212,175,55,0.4)]"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>

      {/* Card with flip animation */}
      <div
        className="relative min-h-[360px] md:min-h-[400px] cursor-pointer"
        onClick={() => setShowBack(!showBack)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setShowBack(!showBack)}
        aria-label={showBack ? "Masquer la réponse" : "Révéler la réponse"}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={showBack ? "back" : "front"}
            initial={{ rotateY: showBack ? -90 : 90, opacity: 0, scale: 0.95 }}
            animate={{ rotateY: 0, opacity: 1, scale: 1 }}
            exit={{ rotateY: showBack ? 90 : -90, opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={`flex flex-col items-center justify-center rounded-[3rem] border-4 p-10 md:p-16 text-center shadow-[0_40px_100px_rgba(0,0,0,0.5)] min-h-[360px] md:min-h-[400px] transition-all duration-700 ${
              showBack
                ? "border-brand-gold/40 bg-gradient-to-br from-[#070d18] to-[#030712] shadow-brand-gold/5"
                : "border-white/10 bg-[#070d18] hover:border-brand-gold/30"
            }`}
          >
            <div className="absolute top-8 left-8 opacity-5">
                <Sparkles size={64} className="text-white" />
            </div>
            
            <p className={`text-[10px] font-black uppercase tracking-[0.4em] mb-10 ${showBack ? "text-brand-gold" : "text-white/20"}`}>
              {showBack ? "LA RÉPONSE EXPERTE" : "LA QUESTION STRATÉGIQUE"}
            </p>
            
            <h4 className={`text-2xl md:text-3xl font-black leading-[1.2] tracking-tight text-white uppercase ${showBack ? "italic" : ""}`}>
              {showBack ? currentCard.back : currentCard.front}
            </h4>
            
            {!showBack && (
              <motion.div 
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="mt-12 flex flex-col items-center gap-3"
              >
                <div className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40">
                    <ChevronDown size={20} />
                </div>
                <p className="text-[10px] font-black text-white/20 uppercase tracking-widest">Cliquez pour révéler l&apos;analyse</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Response buttons */}
      <AnimatePresence>
        {showBack && (
            <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="grid grid-cols-3 gap-4 pt-4"
            >
            <button
                onClick={(e) => { e.stopPropagation(); handleResponse(0); }}
                className="flex flex-col items-center gap-3 rounded-[1.5rem] border-2 border-red-500/20 bg-red-500/5 p-6 transition-all duration-300 hover:border-red-500/50 hover:bg-red-500/10 hover:-translate-y-1 active:scale-95 group"
            >
                <XCircle className="h-8 w-8 text-red-500 opacity-60 group-hover:opacity-100" />
                <div className="text-center">
                    <span className="block text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">ENCORE</span>
                    <span className="text-[9px] font-black text-red-400/60 uppercase tracking-widest">&lt; 1 MIN</span>
                </div>
            </button>
            <button
                onClick={(e) => { e.stopPropagation(); handleResponse(3); }}
                className="flex flex-col items-center gap-3 rounded-[1.5rem] border-2 border-blue-500/20 bg-blue-500/5 p-6 transition-all duration-300 hover:border-blue-500/50 hover:bg-blue-500/10 hover:-translate-y-1 active:scale-95 group"
            >
                <MoreHorizontal className="h-8 w-8 text-blue-400 opacity-60 group-hover:opacity-100" />
                <div className="text-center">
                    <span className="block text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">BIEN</span>
                    <span className="text-[9px] font-black text-blue-400/60 uppercase tracking-widest">1 JOUR</span>
                </div>
            </button>
            <button
                onClick={(e) => { e.stopPropagation(); handleResponse(5); }}
                className="flex flex-col items-center gap-3 rounded-[1.5rem] border-2 border-emerald-500/20 bg-emerald-500/5 p-6 transition-all duration-300 hover:border-emerald-500/50 hover:bg-emerald-500/10 hover:-translate-y-1 active:scale-95 group"
            >
                <CheckCircle2 className="h-8 w-8 text-emerald-400 opacity-60 group-hover:opacity-100" />
                <div className="text-center">
                    <span className="block text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">FACILE</span>
                    <span className="text-[9px] font-black text-emerald-400/60 uppercase tracking-widest">4 JOURS</span>
                </div>
            </button>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
