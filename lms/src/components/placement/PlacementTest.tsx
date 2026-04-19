"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  XCircle,
  Target,
  Trophy,
  AlertTriangle,
  BookOpen,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";
import {
  PLACEMENT_QUESTIONS,
  calculatePlacementResult,
  PLACEMENT_MODULE_LABELS,
} from "@/data/placement-test";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

type Step = "intro" | "running" | "review" | "result";

export function PlacementTest() {
  const [step, setStep] = useState<Step>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [, setReviewMode] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const total = PLACEMENT_QUESTIONS.length;
  const q = PLACEMENT_QUESTIONS[current];
  const progressPct = ((current + 1) / total) * 100;
  const result = step === "result" || step === "review" ? calculatePlacementResult(answers) : null;

  const selectAnswer = useCallback((index: number) => {
    setAnswers((prev) => ({ ...prev, [q.id]: index }));
  }, [q.id]);

  const saveResult = useCallback(async () => {
    setSaving(true);
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setSaving(false);
      setSaved(true);
      return;
    }
    const res = calculatePlacementResult(answers);
    await supabase.from("placement_results").upsert({
      user_id: user.id,
      score: res.totalScore,
      total_questions: res.totalQuestions,
      percentage: res.percentage,
      level: res.level,
      module_scores: res.moduleScores,
      weak_modules: res.weakModules,
      strong_modules: res.strongModules,
      answers,
      created_at: new Date().toISOString(),
    }, { onConflict: "user_id" });
    setSaving(false);
    setSaved(true);
  }, [answers]);

  const next = useCallback(() => {
    if (current < total - 1) {
      setCurrent((c) => c + 1);
    } else {
      setStep("result");
      saveResult();
    }
  }, [current, total, saveResult]);

  const prev = useCallback(() => {
    if (current > 0) setCurrent((c) => c - 1);
  }, [current]);

  // ─── INTRO ───────────────────────────────────────────────
  if (step === "intro") {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="rounded-3xl border border-brand-navy/10 bg-white p-8 shadow-xl md:p-12">
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-navy text-3xl shadow-lg">
            <Target className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-brand-navy md:text-4xl">
            Test de positionnement
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-zinc-600">
            Avant de commencer votre formation, évaluez votre niveau actuel en 15 questions.
            Nous personnaliserons votre parcours en fonction de vos résultats.
          </p>
          <ul className="mt-6 space-y-3 text-zinc-600">
            <li className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
              <span>15 questions couvrant les 5 modules de la formation</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
              <span>Durée estimée : 5 à 8 minutes</span>
            </li>
            <li className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-500" />
              <span>Correction détaillée et parcours personnalisé</span>
            </li>
          </ul>
          <button
            onClick={() => setStep("running")}
            className="btn-primary-solid mt-8 inline-flex w-full items-center justify-center gap-2 py-4 text-lg"
          >
            Commencer le test QCM
            <ArrowRight className="h-5 w-5" />
          </button>

          <div className="mt-4 text-center">
            <Link
              href="/formation/test-conversationnel"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-brand-navy underline-offset-2 hover:underline"
            >
              <Sparkles className="h-4 w-4 text-brand-gold" />
              Essayer le test conversationnel avec Marie (plus rapide + adaptatif)
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ─── RUNNING ─────────────────────────────────────────────
  if (step === "running") {
    const selected = answers[q.id];
    const isLast = current === total - 1;

    return (
      <div className="mx-auto max-w-2xl">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-medium text-zinc-500">
            <span>Question {current + 1} / {total}</span>
            <span>{Math.round(progressPct)}%</span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-100">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-brand-navy to-brand-gold"
              initial={{ width: 0 }}
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        <div className="card-elevated-lg p-6 md:p-8">
          {/* Question */}
          <div className="mb-2">
            <span className="inline-flex items-center rounded-full bg-brand-navy/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-navy">
              {PLACEMENT_MODULE_LABELS[q.module]}
            </span>
          </div>
          <h2 className="text-xl font-bold leading-snug text-brand-navy md:text-2xl">
            {q.question}
          </h2>

          {/* Options */}
          <div className="mt-6 space-y-3">
            {q.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => selectAnswer(i)}
                className={`flex w-full items-start gap-3 rounded-xl border-2 px-4 py-3.5 text-left text-sm transition-all duration-150 ${
                  selected === i
                    ? "border-brand-navy bg-brand-navy/[0.06] text-brand-navy shadow-sm"
                    : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50"
                }`}
              >
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all ${
                    selected === i ? "bg-brand-navy text-white" : "bg-zinc-100 text-zinc-500"
                  }`}
                >
                  {String.fromCharCode(65 + i)}
                </span>
                <span className="pt-0.5 leading-snug">{opt}</span>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={prev}
              disabled={current === 0}
              className="inline-flex items-center gap-1 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
              Précédente
            </button>
            <button
              onClick={next}
              disabled={selected === undefined}
              className="btn-primary-solid inline-flex items-center gap-1 px-6 py-2.5 text-sm disabled:opacity-40"
            >
              {isLast ? "Voir mes résultats" : "Suivante"}
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─── RESULT ──────────────────────────────────────────────
  if (step === "result" && result) {
    const levelConfig = {
      debutant: {
        label: "Débutant",
        color: "text-amber-600",
        bg: "bg-amber-50",
        border: "border-amber-200",
        icon: <BookOpen className="h-8 w-8 text-amber-600" />,
        message: "Excellent départ ! Vous allez construire des bases solides.",
      },
      intermediaire: {
        label: "Intermédiaire",
        color: "text-blue-600",
        bg: "bg-blue-50",
        border: "border-blue-200",
        icon: <Target className="h-8 w-8 text-blue-600" />,
        message: "Bonne base ! Concentrons-nous sur vos points à renforcer.",
      },
      avance: {
        label: "Avancé",
        color: "text-emerald-600",
        bg: "bg-emerald-50",
        border: "border-emerald-200",
        icon: <Trophy className="h-8 w-8 text-emerald-600" />,
        message: "Excellent niveau ! Vous pouvez viser l'expertise complète.",
      },
    };

    const cfg = levelConfig[result.level];

    return (
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Score card */}
        <div className={`rounded-3xl border-2 ${cfg.border} ${cfg.bg} p-8 text-center shadow-lg md:p-12`}>
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-md">
            {cfg.icon}
          </div>
          <h2 className={`text-4xl font-black ${cfg.color}`}>{result.percentage}%</h2>
          <p className="mt-1 text-lg font-bold text-zinc-800">
            {result.totalScore} / {result.totalQuestions} bonnes réponses
          </p>
          <p className={`mt-2 inline-block rounded-full border ${cfg.border} bg-white px-4 py-1 text-sm font-bold ${cfg.color}`}>
            Niveau {cfg.label}
          </p>
          <p className="mt-4 text-zinc-600">{cfg.message}</p>
          <p className="mt-2 text-sm font-medium text-zinc-500">{result.recommendation}</p>

          {saving && <p className="mt-4 text-xs text-zinc-400">Sauvegarde...</p>}
          {saved && <p className="mt-4 text-xs text-emerald-600 inline-flex items-center justify-center gap-1"><EmojiIcon emoji="✓" className="h-3.5 w-3.5" /> Résultats enregistrés</p>}
        </div>

        {/* Module breakdown */}
        <div className="card-elevated-lg p-6">
          <h3 className="text-lg font-bold text-brand-navy">Détail par module</h3>
          <div className="mt-4 space-y-4">
            {Object.entries(result.moduleScores).map(([mod, scores]) => {
              const pct = Math.round((scores.correct / scores.total) * 100);
              const isWeak = result.weakModules.includes(mod);
              const isStrong = result.strongModules.includes(mod);
              return (
                <div key={mod}>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-zinc-700">
                      {PLACEMENT_MODULE_LABELS[mod]}
                      {isWeak && <AlertTriangle className="ml-1 inline h-4 w-4 text-amber-500" />}
                      {isStrong && <CheckCircle2 className="ml-1 inline h-4 w-4 text-emerald-500" />}
                    </span>
                    <span className={`font-bold ${pct < 50 ? "text-red-500" : pct >= 80 ? "text-emerald-600" : "text-zinc-600"}`}>
                      {scores.correct}/{scores.total} ({pct}%)
                    </span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-zinc-100">
                    <div
                      className={`h-full rounded-full transition-all ${
                        pct < 50 ? "bg-red-400" : pct >= 80 ? "bg-emerald-500" : "bg-brand-navy"
                      }`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            onClick={() => {
              setReviewMode(true);
              setCurrent(0);
              setStep("review");
            }}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border-2 border-brand-navy px-6 py-3.5 text-sm font-bold text-brand-navy transition hover:bg-brand-navy/5"
          >
            Voir la correction
          </button>
          <Link
            href="/formation"
            className="btn-primary-solid inline-flex flex-1 items-center justify-center gap-2 py-3.5 text-sm"
          >
            Démarrer ma formation
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    );
  }

  // ─── REVIEW ──────────────────────────────────────────────
  if (step === "review" && result) {
    const q = PLACEMENT_QUESTIONS[current];
    const userAnswer = answers[q.id];
    const isCorrect = userAnswer === q.correctIndex;

    return (
      <div className="mx-auto max-w-2xl">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-medium text-zinc-500">
            Correction {current + 1} / {total}
          </span>
          <button
            onClick={() => setStep("result")}
            className="text-sm font-bold text-brand-navy hover:underline"
          >
            ← Retour aux résultats
          </button>
        </div>

        <div className="card-elevated-lg p-6">
          <div className="mb-4 flex items-center gap-3">
            {isCorrect ? (
              <CheckCircle2 className="h-6 w-6 text-emerald-500" />
            ) : (
              <XCircle className="h-6 w-6 text-red-500" />
            )}
            <span className={`text-sm font-bold ${isCorrect ? "text-emerald-600" : "text-red-600"}`}>
              {isCorrect ? "Bonne réponse" : "Mauvaise réponse"}
            </span>
          </div>

          <h2 className="text-lg font-bold text-brand-navy">{q.question}</h2>

          <div className="mt-4 space-y-2">
            {q.options.map((opt, i) => {
              const isSelected = userAnswer === i;
              const isCorrectOption = q.correctIndex === i;
              let bg = "bg-white border-zinc-200";
              if (isCorrectOption) bg = "bg-emerald-50 border-emerald-300";
              else if (isSelected && !isCorrectOption) bg = "bg-red-50 border-red-300";

              return (
                <div
                  key={i}
                  className={`flex items-start gap-3 rounded-xl border-2 px-4 py-3 text-sm ${bg}`}
                >
                  <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    isCorrectOption ? "bg-emerald-500 text-white" : "bg-zinc-100 text-zinc-500"
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="pt-0.5">{opt}</span>
                  {isSelected && isCorrectOption && <CheckCircle2 className="ml-auto h-5 w-5 text-emerald-500" />}
                  {isSelected && !isCorrectOption && <XCircle className="ml-auto h-5 w-5 text-red-500" />}
                </div>
              );
            })}
          </div>

          <div className="mt-4 rounded-xl bg-brand-gold-soft/40 p-4">
            <p className="text-sm font-medium text-brand-navy">
              <span className="font-bold">Explication :</span> {q.explanation}
            </p>
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button
              onClick={() => current > 0 && setCurrent((c) => c - 1)}
              disabled={current === 0}
              className="inline-flex items-center gap-1 rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 disabled:opacity-30"
            >
              <ChevronLeft className="h-4 w-4" />
              Précédent
            </button>
            <button
              onClick={() => {
                if (current < total - 1) {
                  setCurrent((c) => c + 1);
                } else {
                  setStep("result");
                }
              }}
              className="btn-primary-solid inline-flex items-center gap-1 px-6 py-2.5 text-sm"
            >
              {current < total - 1 ? "Suivant" : "Terminer"}
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
