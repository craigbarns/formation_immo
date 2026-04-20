"use client";

import { useCallback, useMemo, useState } from "react";
import type { InteractiveScenario as Scenario, ScenarioStep } from "@/data/interactive-scenarios";
import { VideoEmbed } from "@/components/VideoEmbed";
import Link from "next/link";
import { Lightbulb } from "lucide-react";

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
        // Étape manquante — fallback silencieux
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
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
        Étape introuvable : <code>{stepId}</code>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-brand-navy/15 bg-white shadow-xl ring-1 ring-black/5">
      {/* En-tête avec motif */}
      <div className="relative border-b border-brand-navy/10 bg-brand-navy px-5 py-5 text-white sm:px-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
        <div className="relative flex flex-wrap items-start justify-between gap-4">
          <div className="max-w-xl">
            <p className="text-3xs font-semibold uppercase tracking-[0.2em] text-brand-gold">
              Parcours interactif
            </p>
            <h2 className="mt-1.5 text-xl font-bold leading-snug tracking-tight text-white sm:text-2xl">
              {scenario.title}
            </h2>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-3xs font-medium tabular-nums text-white/95">
              Progression {progressApprox}%
            </span>
            {quizTotal > 0 ? (
              <span className="rounded-full border border-white/20 bg-black/15 px-3 py-1 text-3xs font-medium text-white/95">
                Score {score}/{quizTotal}
              </span>
            ) : null}
            <div className="h-1.5 w-32 overflow-hidden rounded-full bg-black/20 sm:w-40">
              <div
                className="h-full rounded-full bg-gradient-to-r from-brand-gold to-[var(--brand-gold-pale)] transition-all duration-500"
                style={{ width: `${progressApprox}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative bg-gradient-to-b from-slate-50/80 to-white px-5 py-7 sm:px-8 sm:py-9">
        <div className="pointer-events-none absolute left-0 top-0 h-24 w-full bg-gradient-to-b from-brand-navy/[0.03] to-transparent" />
        <div className="relative">
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
        </div>
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
    <div>
      {step.badge ? (
        <span className="inline-flex items-center rounded-full border border-brand-navy/15 bg-brand-navy/5 px-3 py-1 text-3xs font-semibold uppercase tracking-wide text-brand-navy">
          {step.badge}
        </span>
      ) : null}
      <h3 className="mt-3 text-2xl font-bold tracking-tight text-brand-navy sm:text-[1.65rem]">
        {step.title}
      </h3>
      {step.lead ? (
        <div className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-600">
          {step.lead.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      ) : null}

      {coverSrc ? (
        <div className="relative mt-6 overflow-hidden rounded-xl border border-zinc-200/80 shadow-md">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverSrc}
            alt={step.title}
            className="aspect-[21/9] w-full object-cover sm:aspect-[2.4/1]"
            onError={() => {
              if (coverSrc !== FALLBACK_COVER) {
                setCoverSrc(FALLBACK_COVER);
              } else {
                setCoverSrc(null);
              }
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/50 to-transparent" />
          <p className="absolute bottom-3 left-4 right-4 text-xs font-medium text-white/95 drop-shadow-sm">
            Formation immobilier — illustration de contexte
          </p>
        </div>
      ) : (
        <div className="relative mt-6 overflow-hidden rounded-xl border border-zinc-200/80 bg-gradient-to-br from-slate-100 to-slate-200/80 p-6 shadow-md">
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/10 to-transparent" />
          <p className="relative text-sm font-semibold text-brand-navy">
            Illustration temporairement indisponible
          </p>
          <p className="relative mt-1 text-xs text-zinc-600">
            Le contenu de la simulation reste accessible.
          </p>
        </div>
      )}

      {step.videoUrl ? (
        <div className="mt-6">
          <div className="overflow-hidden rounded-xl border border-zinc-200/90 bg-zinc-950 shadow-inner ring-1 ring-black/5">
            <VideoEmbed url={step.videoUrl} title={step.title} />
          </div>
          {step.caption ? (
            <p className="mt-2 text-center text-xs text-zinc-500">{step.caption}</p>
          ) : null}
        </div>
      ) : null}

      <button
        type="button"
        onClick={() => onNavigate(step.next)}
        className="group mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-navy py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-navy/25 transition hover:bg-brand-navy-deep sm:w-auto sm:px-10"
      >
        Passer à la décision
        <span className="transition group-hover:translate-x-0.5" aria-hidden>
          →
        </span>
      </button>
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
  const styles =
    step.variant === "warn"
      ? "border-amber-300/80 bg-gradient-to-br from-amber-50 to-amber-100/50 shadow-amber-900/5"
      : step.variant === "success"
        ? "border-emerald-300/80 bg-gradient-to-br from-emerald-50 to-white shadow-emerald-900/5"
        : "border-zinc-200 bg-white shadow-zinc-900/5";

  return (
    <div
      className={`relative overflow-hidden rounded-2xl border-2 p-6 shadow-lg ${styles}`}
    >
      <div
        className={`absolute left-0 top-0 h-full w-1.5 ${
          step.variant === "warn"
            ? "bg-amber-500"
            : step.variant === "success"
              ? "bg-emerald-500"
              : "bg-brand-navy"
        }`}
      />
      <div className="pl-4">
        <div className="flex items-start gap-3">
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg ${
              step.variant === "warn"
                ? "bg-amber-200/80 text-amber-900"
                : "bg-brand-navy/10 text-brand-navy"
            }`}
            aria-hidden
          >
            {step.variant === "warn" ? "!" : "i"}
          </span>
          <div>
            <h3 className="text-xl font-bold text-brand-navy">{step.title}</h3>
            <div className="prose prose-sm prose-zinc mt-3 max-w-none whitespace-pre-line leading-relaxed">
              {step.body}
            </div>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onNavigate(step.next)}
          className="mt-8 w-full rounded-xl bg-brand-gold py-3 text-sm font-semibold text-brand-navy shadow-md transition hover:bg-[var(--brand-gold-hover)] sm:w-auto sm:px-8"
        >
          Retour au choix
        </button>
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
    <div>
      <span className="inline-flex rounded-full border border-brand-gold/40 bg-brand-gold/10 px-3 py-1 text-3xs font-semibold uppercase tracking-wide text-brand-gold-dark">
        Décision
      </span>
      <h3 className="mt-3 text-2xl font-bold text-brand-navy">{step.title}</h3>
      <p className="mt-4 text-base leading-relaxed text-zinc-800">{step.question}</p>
      <ul className="mt-8 flex flex-col gap-3">
        {step.options.map((opt, i) => (
          <li key={i}>
            <button
              type="button"
              onClick={() => onNavigate(opt.next)}
              className="group flex w-full gap-4 rounded-2xl border-2 border-zinc-200 bg-white px-4 py-4 text-left shadow-sm transition hover:border-brand-navy hover:shadow-md focus:outline-none focus:ring-2 focus:ring-brand-gold/80"
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-navy to-[var(--brand-navy-alt)] text-sm font-bold text-white shadow-inner">
                {String.fromCharCode(65 + i)}
              </span>
              <span className="pt-0.5 text-sm font-medium leading-snug text-zinc-800 group-hover:text-brand-navy">
                {opt.label}
              </span>
            </button>
          </li>
        ))}
      </ul>
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
    <div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-brand-navy px-3 py-1 text-3xs font-bold uppercase tracking-wide text-brand-gold">
          QCM
        </span>
        <span className="text-xs font-medium text-zinc-500">{step.title}</span>
      </div>
      <h3 className="mt-4 text-lg font-bold leading-snug text-brand-navy sm:text-xl">
        {step.question}
      </h3>
      <ul className="mt-6 flex flex-col gap-2.5">
        {step.options.map((opt, i) => {
          const selected = picked === i;
          const wrong = selected && !opt.isCorrect;
          const right = selected && opt.isCorrect;
          return (
            <li key={i}>
              <button
                type="button"
                onClick={() => choose(i)}
                className={`w-full rounded-xl border-2 px-4 py-3.5 text-left text-sm leading-snug transition ${
                  right
                    ? "border-emerald-500 bg-emerald-50/90 text-emerald-950 shadow-sm"
                    : wrong
                      ? "border-red-300 bg-red-50/90 text-red-950 shadow-sm"
                      : "border-zinc-200 bg-white hover:border-brand-navy/35 hover:bg-slate-50/80"
                }`}
              >
                <span className="mr-2 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md text-xs font-bold text-zinc-500">
                  {i + 1}
                </span>
                {opt.label}
              </button>
            </li>
          );
        })}
      </ul>

      {showExplain && picked !== null && !isCorrect ? (
        <div className="mt-5 flex gap-3 rounded-xl border border-amber-200/80 bg-amber-50/90 p-4 text-sm text-amber-950 shadow-sm">
          <Lightbulb className="h-5 w-5 text-amber-600 shrink-0" aria-hidden="true" />
          <p className="leading-relaxed">{step.explanation}</p>
        </div>
      ) : null}

      {isCorrect ? (
        <div className="mt-8 flex flex-col gap-4 rounded-xl border border-emerald-200 bg-emerald-50/50 p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold text-emerald-800">Réponse exacte — bon réflexe professionnel.</p>
          <button
            type="button"
            onClick={continueNext}
            className="rounded-xl bg-brand-navy px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-brand-navy-deep"
          >
            Question suivante
          </button>
        </div>
      ) : picked !== null && !isCorrect ? (
        <p className="mt-4 text-xs font-medium text-zinc-500">Sélectionnez une autre réponse pour continuer.</p>
      ) : null}
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
    <div className="text-center">
      <div className="relative mx-auto flex h-20 w-20 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-emerald-400/20 blur-2xl" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 text-2xl text-white shadow-lg shadow-emerald-600/30">
          <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>
      <h3 className="mt-6 text-2xl font-bold text-brand-navy">{step.title}</h3>
      <div className="mx-auto mt-4 max-w-lg space-y-3 text-sm leading-relaxed text-zinc-600">
        {step.message.split("\n\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
      {quizTotal > 0 ? (
        <p className="mx-auto mt-4 inline-flex rounded-full border border-zinc-200 bg-zinc-50 px-4 py-1.5 text-sm font-semibold text-zinc-700">
          Resultat final: {score}/{quizTotal}
        </p>
      ) : null}
      <div className="mt-6">
        <button
          type="button"
          onClick={onRestart}
          className="rounded-xl border border-zinc-300 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-700 transition hover:border-brand-navy hover:text-brand-navy"
        >
          Recommencer la demo
        </button>
      </div>
      {step.nextLesson ? (
        <div className="mt-10">
          <Link
            href={step.nextLesson.href}
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-brand-gold to-[var(--brand-gold-pale)] px-8 py-3.5 text-sm font-bold text-brand-navy shadow-lg shadow-amber-900/10 transition hover:from-[var(--brand-gold-hover)] hover:to-brand-gold"
          >
            {step.nextLesson.label}
            <span aria-hidden>→</span>
          </Link>
        </div>
      ) : null}
    </div>
  );
}
