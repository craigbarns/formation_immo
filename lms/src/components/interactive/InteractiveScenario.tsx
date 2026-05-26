"use client";

import { useCallback, useMemo, useState } from "react";
import type { InteractiveScenario as Scenario, ScenarioStep } from "@/data/interactive-scenarios";
import { VideoEmbed } from "@/components/VideoEmbed";
import Link from "next/link";
import Image from "next/image";
import { Lightbulb, ArrowRight, RotateCcw, Trophy, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  scenario: Scenario;
};

export function InteractiveScenario({ scenario }: Props) {
  const [stepId, setStepId] = useState(scenario.startStepId);
  const [moveCount, setMoveCount] = useState(0);
  const [scoreByQuiz, setScoreByQuiz] = useState<Record<string, boolean>>({});
  const step = scenario.steps[stepId];

  const go = useCallback(
    (next: string) => {
      if (!scenario.steps[next]) {
        return;
      }
      setStepId(next);
      setMoveCount((c) => c + 1);
    },
    [scenario.steps],
  );

  const reset = useCallback(() => {
    setStepId(scenario.startStepId);
    setMoveCount(0);
    setScoreByQuiz({});
  }, [scenario.startStepId]);

  const quizTotal = useMemo(
    () => Object.values(scenario.steps).filter((s) => s.type === "quiz").length,
    [scenario.steps],
  );
  const score = useMemo(
    () => Object.values(scoreByQuiz).filter(Boolean).length,
    [scoreByQuiz],
  );

  const progressApprox = useMemo(() => {
    if (step?.type === "complete") return 100;
    return Math.min(95, Math.round((moveCount / 7) * 100));
  }, [moveCount, step?.type]);

  if (!step) {
    return (
      <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-sm text-red-400">
        Étape introuvable : <code>{stepId}</code>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#070d18] shadow-2xl">
      {/* En-tête avec motif */}
      <div className="relative border-b border-white/10 bg-[#030712] px-6 py-8 text-white sm:px-10">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative flex flex-wrap items-center justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">
              IMMERSION INTERACTIVE
            </p>
            <h2 className="mt-2 text-2xl font-black leading-tight tracking-tight text-white sm:text-3xl uppercase">
              {scenario.title}
            </h2>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="flex gap-2">
                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white/70">
                Progression {progressApprox}%
                </span>
                {quizTotal > 0 ? (
                <span className="rounded-full border border-brand-gold/30 bg-brand-gold/10 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-brand-gold">
                    Score {score}/{quizTotal}
                </span>
                ) : null}
            </div>
            <div className="h-1.5 w-32 overflow-hidden rounded-full bg-white/5 sm:w-48 ring-1 ring-white/10">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-gold via-white to-brand-gold shadow-[0_0_10px_rgba(212,175,55,0.3)] transition-all duration-700"
                style={{ width: `${progressApprox}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative p-6 sm:p-10 lg:p-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={stepId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <StepBody
                step={step}
                onNavigate={go}
                onQuizValidated={(quizId) =>
                setScoreByQuiz((prev) => ({ ...prev, [quizId]: true }))
                }
                score={score}
                quizTotal={quizTotal}
                onRestart={reset}
            />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function StepBody({
  step,
  onNavigate,
  onQuizValidated,
  score,
  quizTotal,
  onRestart,
}: {
  step: ScenarioStep;
  onNavigate: (id: string) => void;
  onQuizValidated: (quizId: string) => void;
  score: number;
  quizTotal: number;
  onRestart: () => void;
}) {
  switch (step.type) {
    case "video":
      return <StepVideo key={step.id} step={step} onNavigate={onNavigate} />;
    case "info":
      return <StepInfo step={step} onNavigate={onNavigate} />;
    case "choice":
      return <StepChoice step={step} onNavigate={onNavigate} />;
    case "quiz":
      return (
        <StepQuiz key={step.id} step={step} onNavigate={onNavigate} onValidated={onQuizValidated} />
      );
    case "complete":
      return <StepComplete step={step} score={score} quizTotal={quizTotal} onRestart={onRestart} />;
    default:
      return null;
  }
}

function StepVideo({
  step,
  onNavigate,
}: {
  step: Extract<ScenarioStep, { type: "video" }>;
  onNavigate: (id: string) => void;
}) {
  const FALLBACK_COVER = "/scenarios/alur-mandat.png";
  const [coverSrc, setCoverSrc] = useState<string | null>(step.coverImageUrl ?? null);

  return (
    <div className="space-y-8">
      <div>
        {step.badge ? (
            <span className="inline-flex items-center rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold mb-4">
            {step.badge}
            </span>
        ) : null}
        <h3 className="text-3xl font-black tracking-tight text-white sm:text-4xl leading-tight">
            {step.title}
        </h3>
        {step.lead ? (
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-white/60 max-w-3xl">
            {step.lead.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
            ))}
            </div>
        ) : null}
      </div>

      {coverSrc ? (
        <div className="relative group overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl aspect-[21/9] sm:aspect-[2.4/1]">
          <Image
            src={coverSrc}
            alt={step.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            onError={() => {
              if (coverSrc !== FALLBACK_COVER) {
                setCoverSrc(FALLBACK_COVER);
              } else {
                setCoverSrc(null);
              }
            }}
            sizes="(max-width: 1200px) 100vw, 1200px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-60 pointer-events-none" />
          <div className="absolute bottom-6 left-8 right-8 pointer-events-none">
             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold mb-1">Contextualisation</p>
             <p className="text-sm font-bold text-white/90 drop-shadow-md">
                Environnement professionnel simulé
             </p>
          </div>
        </div>
      ) : (
        <div className="relative overflow-hidden rounded-[2rem] border border-white/5 bg-white/[0.02] p-10 text-center shadow-inner">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/5 to-transparent opacity-50" />
          <p className="relative text-lg font-black text-white/75 uppercase tracking-widest">
            Visuel en attente
          </p>
          <p className="relative mt-2 text-sm text-white/75 italic">
            Focus sur le contenu pédagogique
          </p>
        </div>
      )}

      {step.videoUrl ? (
        <div className="mt-10 overflow-hidden rounded-[2rem] border border-white/10 bg-black shadow-2xl">
            <VideoEmbed url={step.videoUrl} title={step.title} />
        </div>
      ) : null}

      <div className="pt-4">
        <button
            type="button"
            onClick={() => onNavigate(step.next)}
            className="group inline-flex items-center justify-center gap-4 rounded-2xl bg-brand-gold px-10 py-5 text-sm font-black uppercase tracking-widest text-brand-navy shadow-xl shadow-brand-gold/20 transition hover:bg-white hover:scale-105 active:scale-95 w-full sm:w-auto"
        >
            Passer à la décision
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}

function StepInfo({
  step,
  onNavigate,
}: {
  step: Extract<ScenarioStep, { type: "info" }>;
  onNavigate: (id: string) => void;
}) {
  const isWarn = step.variant === "warn";
  const isSuccess = step.variant === "success";

  return (
    <div className="max-w-3xl mx-auto">
        <div
        className={`relative overflow-hidden rounded-[2.5rem] border-2 p-8 md:p-12 shadow-2xl ${
            isWarn
            ? "border-amber-500/30 bg-amber-500/5 shadow-amber-500/5"
            : isSuccess
                ? "border-emerald-500/30 bg-emerald-500/5 shadow-emerald-500/5"
                : "border-white/10 bg-white/5 shadow-black/20"
        }`}
        >
        <div className="flex flex-col items-center text-center">
            <div
                className={`flex h-20 w-20 items-center justify-center rounded-full text-3xl mb-8 shadow-xl border-2 ${
                isWarn
                    ? "bg-amber-500/20 text-amber-400 border-amber-500/40"
                    : isSuccess
                    ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/40"
                    : "bg-white/10 text-white border-white/20"
                }`}
            >
                {isWarn ? "!" : isSuccess ? "✓" : "i"}
            </div>
            
            <h3 className={`text-3xl font-black tracking-tight uppercase mb-6 ${
                isWarn ? "text-amber-400" : isSuccess ? "text-emerald-400" : "text-white"
            }`}>
                {step.title}
            </h3>
            
            <div className="text-lg leading-relaxed text-white/70 whitespace-pre-line mb-10 italic">
                &laquo; {step.body} &raquo;
            </div>

            <button
            type="button"
            onClick={() => onNavigate(step.next)}
            className="group flex items-center justify-center gap-3 rounded-2xl bg-white/10 border border-white/10 px-10 py-4 text-xs font-black uppercase tracking-[0.2em] text-white transition hover:bg-white hover:text-brand-navy hover:scale-105 active:scale-95 shadow-xl"
            >
            <RotateCcw className="w-4 h-4 transition-transform group-hover:-rotate-45" />
            Réajuster le tir
            </button>
        </div>
        </div>
    </div>
  );
}

function StepChoice({
  step,
  onNavigate,
}: {
  step: Extract<ScenarioStep, { type: "choice" }>;
  onNavigate: (id: string) => void;
}) {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <span className="inline-flex rounded-full border border-brand-gold/30 bg-brand-gold/10 px-5 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold mb-6">
            DÉCISION STRATÉGIQUE
        </span>
        <h3 className="text-3xl font-black text-white sm:text-5xl tracking-tight leading-[1.1] mb-6 uppercase">
            {step.title}
        </h3>
        <p className="text-xl leading-relaxed text-white/60 italic max-w-2xl mx-auto">&laquo; {step.question} &raquo;</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
        {step.options.map((opt, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onNavigate(opt.next)}
            className="group relative flex w-full gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 text-left shadow-xl transition-all duration-300 hover:border-brand-gold/40 hover:bg-white/10 hover:-translate-y-1 active:scale-[0.98]"
          >
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-brand-navy text-xl font-black text-white shadow-2xl border border-white/10 group-hover:bg-brand-gold group-hover:text-brand-navy transition-colors">
              {String.fromCharCode(65 + i)}
            </div>
            <div className="pt-1">
                <p className="text-base font-bold leading-snug text-white/90 group-hover:text-white transition-colors">
                {opt.label}
                </p>
                <div className="mt-3 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/75 group-hover:text-brand-gold/70 transition-colors">
                    Sélectionner l&apos;option <ArrowRight className="w-3 h-3" />
                </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

function StepQuiz({
  step,
  onNavigate,
  onValidated,
}: {
  step: Extract<ScenarioStep, { type: "quiz" }>;
  onNavigate: (id: string) => void;
  onValidated: (quizId: string) => void;
}) {
  const [picked, setPicked] = useState<number | null>(null);
  const [showExplain, setShowExplain] = useState(false);

  const correctIndex = step.options.findIndex((o) => o.isCorrect);
  const isCorrect = picked !== null && picked === correctIndex;

  function choose(i: number) {
    if (picked !== null) return;
    setPicked(i);
    setShowExplain(i !== correctIndex);
  }

  function continueNext() {
    if (picked === null || !isCorrect) return;
    onValidated(step.id);
    setPicked(null);
    setShowExplain(false);
    onNavigate(step.next);
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
        <span className="rounded-full bg-brand-navy border border-brand-gold/30 px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-brand-gold">
          CHECKPOINT QCM
        </span>
        <span className="text-xs font-bold uppercase tracking-widest text-white/75">{step.title}</span>
      </div>
      
      <h3 className="text-2xl font-black leading-tight text-white sm:text-4xl text-center mb-12">
        {step.question}
      </h3>

      <div className="flex flex-col gap-3">
        {step.options.map((opt, i) => {
          const selected = picked === i;
          const wrong = selected && !opt.isCorrect;
          const right = selected && opt.isCorrect;
          const disabled = picked !== null && !selected;

          return (
            <button
                key={i}
                type="button"
                disabled={picked !== null}
                onClick={() => choose(i)}
                className={`group flex w-full items-center gap-5 rounded-2xl border-2 px-6 py-5 text-left text-lg font-bold transition-all duration-300 ${
                  right
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                    : wrong
                      ? "border-red-500 bg-red-500/10 text-red-400"
                      : disabled
                        ? "border-white/5 bg-white/[0.02] text-white/75 opacity-50"
                        : "border-white/10 bg-white/5 text-white/80 hover:border-brand-gold/50 hover:bg-white/10"
                }`}
              >
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-black transition-colors ${
                    right ? "bg-emerald-500 text-brand-navy" : wrong ? "bg-red-500 text-brand-navy" : "bg-white/10 text-white group-hover:bg-brand-gold group-hover:text-brand-navy"
                }`}>
                  {i + 1}
                </div>
                <span className="flex-1">{opt.label}</span>
                {right && <CheckCircle2 className="w-6 h-6 text-emerald-400" />}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {showExplain && picked !== null && !isCorrect && (
            <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 flex gap-5 rounded-3xl border border-amber-500/30 bg-amber-500/5 p-8 shadow-2xl shadow-amber-500/5"
            >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-400">
                    <Lightbulb className="h-6 w-6" />
                </div>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-2">Explication pédagogique</p>
                    <p className="text-lg leading-relaxed text-white/80 italic">&laquo; {step.explanation} &raquo;</p>
                    <button 
                        onClick={() => { setPicked(null); setShowExplain(false); }}
                        className="mt-6 text-xs font-black uppercase tracking-widest text-white hover:text-brand-gold transition-colors"
                    >
                        Essayer une autre réponse
                    </button>
                </div>
            </motion.div>
        )}

        {isCorrect && (
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-10 flex flex-col gap-6 rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-8 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left"
            >
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-1">Excellent réflexe</p>
                    <p className="text-lg font-bold text-white">Validation acquise — Compétence confirmée.</p>
                </div>
                <button
                    type="button"
                    onClick={continueNext}
                    className="rounded-2xl bg-emerald-500 px-10 py-4 text-xs font-black uppercase tracking-widest text-brand-navy shadow-xl shadow-emerald-500/20 transition hover:bg-white hover:scale-105"
                >
                    Question suivante
                </button>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StepComplete({
  step,
  score,
  quizTotal,
  onRestart,
}: {
  step: Extract<ScenarioStep, { type: "complete" }>;
  score: number;
  quizTotal: number;
  onRestart: () => void;
}) {
  return (
    <div className="text-center max-w-2xl mx-auto py-10">
      <div className="relative mx-auto flex h-32 w-32 items-center justify-center mb-10">
        <div className="absolute inset-0 rounded-full bg-brand-gold/20 blur-3xl animate-pulse" />
        <div className="relative flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-brand-gold to-yellow-600 shadow-2xl border-4 border-white/20">
          <Trophy className="h-12 w-12 text-brand-navy" />
        </div>
      </div>
      
      <h3 className="text-4xl font-black text-white sm:text-6xl tracking-tight leading-none uppercase mb-8">
        {step.title}
      </h3>
      
      <div className="mx-auto space-y-6 text-xl leading-relaxed text-white/60 italic mb-12">
        {step.message.split("\n\n").map((para, i) => (
          <p key={i}>&laquo; {para} &raquo;</p>
        ))}
      </div>

      {quizTotal > 0 && (
        <div className="mb-12">
             <div className="inline-flex flex-col items-center rounded-[2rem] border border-white/10 bg-white/5 px-10 py-6 shadow-2xl">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/75 mb-2">Performance finale</p>
                <p className="text-4xl font-black text-brand-gold tabular-nums">
                    {score} <span className="text-xl text-white/75">/ {quizTotal}</span>
                </p>
            </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          type="button"
          onClick={onRestart}
          className="group flex items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-xs font-black uppercase tracking-widest text-white transition hover:bg-white/10 hover:border-white/30"
        >
          <RotateCcw className="w-4 h-4 transition-transform group-hover:rotate-180 duration-500" />
          Recommencer
        </button>
        
        {step.nextLesson && (
          <Link
            href={step.nextLesson.href}
            className="inline-flex items-center gap-4 rounded-2xl bg-brand-gold px-12 py-5 text-sm font-black uppercase tracking-widest text-brand-navy shadow-2xl shadow-brand-gold/30 transition hover:bg-white hover:scale-105 active:scale-95"
          >
            {step.nextLesson.label}
            <ArrowRight className="w-5 h-5" />
          </Link>
        )}
      </div>
    </div>
  );
}
