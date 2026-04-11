"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ExamQuestion, ModuleExam } from "@/data/exam-questions";
import { recordExamScore } from "@/lib/gamification";

type ExamState = "intro" | "running" | "review";

export function ExamMode({ exam }: { exam: ModuleExam }) {
  const [state, setState] = useState<ExamState>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(exam.duration * 60);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startExam = useCallback(() => {
    setAnswers({});
    setCurrent(0);
    setTimeLeft(exam.duration * 60);
    setState("running");
  }, [exam.duration]);

  // Timer
  useEffect(() => {
    if (state !== "running") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          setState("review");
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [state]);

  const submitExam = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    setState("review");
  }, []);

  // Score
  const { score, total } = useMemo(() => {
    let s = 0;
    for (const q of exam.questions) {
      if (answers[q.id] === q.correctIndex) s++;
    }
    return { score: s, total: exam.questions.length };
  }, [answers, exam.questions]);

  // Save score on review
  useEffect(() => {
    if (state === "review") {
      recordExamScore(exam.moduleSlug, score, total);
    }
  }, [state, exam.moduleSlug, score, total]);

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const pct = ((exam.duration * 60 - timeLeft) / (exam.duration * 60)) * 100;

  if (state === "intro") {
    return (
      <div className="rounded-2xl border-2 border-[#1a3a5c]/15 bg-white p-8 text-center shadow-lg">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#1a3a5c]/10 text-3xl">
          📝
        </div>
        <h2 className="mt-4 text-2xl font-bold text-[#1a3a5c]">{exam.title}</h2>
        <div className="mx-auto mt-4 max-w-md space-y-2 text-sm text-zinc-600">
          <p><strong>{exam.questions.length} questions</strong> — Duree : <strong>{exam.duration} minutes</strong></p>
          <p>Repondez a toutes les questions avant la fin du chrono. Votre score sera enregistre et contribuera a votre progression.</p>
        </div>
        <div className="mt-4 flex justify-center gap-3">
          <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm">
            <span className="font-bold text-emerald-700">80%+</span>
            <span className="text-emerald-600"> = Reussi</span>
          </div>
          <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-2 text-sm">
            <span className="font-bold text-amber-700">+300 XP</span>
            <span className="text-amber-600"> minimum</span>
          </div>
        </div>
        <button
          onClick={startExam}
          className="mt-8 rounded-xl bg-[#1a3a5c] px-8 py-3.5 text-sm font-bold text-white shadow-lg transition hover:bg-[#142d45]"
        >
          Commencer l&apos;examen
        </button>
      </div>
    );
  }

  if (state === "review") {
    const passed = score / total >= 0.8;
    return (
      <div className="rounded-2xl border-2 border-[#1a3a5c]/15 bg-white shadow-lg">
        <div className={`rounded-t-2xl p-6 text-center text-white ${passed ? "bg-emerald-600" : "bg-amber-600"}`}>
          <div className="text-4xl">{passed ? "🎉" : "📚"}</div>
          <h2 className="mt-2 text-2xl font-bold">{passed ? "Examen reussi !" : "A retravailler"}</h2>
          <p className="mt-2 text-5xl font-black">{score}/{total}</p>
          <p className="mt-1 text-sm text-white/80">{Math.round((score / total) * 100)}% de bonnes reponses</p>
        </div>
        <div className="max-h-[500px] overflow-y-auto p-6">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-zinc-400">Correction detaillee</h3>
          <div className="space-y-4">
            {exam.questions.map((q, i) => (
              <ReviewQuestion key={q.id} question={q} answer={answers[q.id]} index={i} />
            ))}
          </div>
        </div>
        <div className="border-t border-zinc-100 p-6 text-center">
          <button
            onClick={startExam}
            className="rounded-xl border border-[#1a3a5c] px-6 py-2.5 text-sm font-semibold text-[#1a3a5c] transition hover:bg-[#1a3a5c]/5"
          >
            Repasser l&apos;examen
          </button>
        </div>
      </div>
    );
  }

  // Running state
  const q = exam.questions[current];

  return (
    <div className="rounded-2xl border-2 border-[#1a3a5c]/15 bg-white shadow-lg">
      {/* Timer bar */}
      <div className="relative border-b border-zinc-100 bg-zinc-50 px-6 py-3 rounded-t-2xl">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium text-zinc-500">
            Question {current + 1}/{exam.questions.length}
          </span>
          <div className={`flex items-center gap-2 text-sm font-mono font-bold tabular-nums ${timeLeft < 60 ? "text-red-600 animate-pulse" : "text-[#1a3a5c]"}`}>
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2m6-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
          </div>
        </div>
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-zinc-200">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${timeLeft < 60 ? "bg-red-500" : "bg-[#d4af37]"}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="p-6">
        <h3 className="text-lg font-bold text-[#1a3a5c]">{q.question}</h3>
        <ul className="mt-6 space-y-2.5">
          {q.options.map((opt, i) => {
            const selected = answers[q.id] === i;
            return (
              <li key={i}>
                <button
                  onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: i }))}
                  className={`flex w-full items-start gap-3 rounded-xl border-2 px-4 py-3.5 text-left text-sm transition ${
                    selected
                      ? "border-[#1a3a5c] bg-[#1a3a5c]/5 text-[#1a3a5c]"
                      : "border-zinc-200 bg-white hover:border-zinc-300"
                  }`}
                >
                  <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    selected ? "bg-[#1a3a5c] text-white" : "bg-zinc-100 text-zinc-500"
                  }`}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  <span className="pt-0.5">{opt}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between border-t border-zinc-100 p-4">
        <button
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-50 disabled:opacity-30"
        >
          Precedente
        </button>

        {/* Question dots */}
        <div className="hidden sm:flex gap-1">
          {exam.questions.map((qq, i) => (
            <button
              key={qq.id}
              onClick={() => setCurrent(i)}
              className={`h-2.5 w-2.5 rounded-full transition ${
                i === current
                  ? "bg-[#1a3a5c] scale-125"
                  : answers[qq.id] !== undefined
                    ? "bg-[#d4af37]"
                    : "bg-zinc-200"
              }`}
            />
          ))}
        </div>

        {current < exam.questions.length - 1 ? (
          <button
            onClick={() => setCurrent((c) => c + 1)}
            className="rounded-lg bg-[#1a3a5c] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#142d45]"
          >
            Suivante
          </button>
        ) : (
          <button
            onClick={submitExam}
            className="rounded-lg bg-[#d4af37] px-6 py-2 text-sm font-bold text-[#1a3a5c] shadow transition hover:bg-[#c4a030]"
          >
            Terminer l&apos;examen
          </button>
        )}
      </div>
    </div>
  );
}

function ReviewQuestion({
  question,
  answer,
  index,
}: {
  question: ExamQuestion;
  answer: number | undefined;
  index: number;
}) {
  const correct = answer === question.correctIndex;
  const unanswered = answer === undefined;

  return (
    <div className={`rounded-xl border p-4 ${
      correct
        ? "border-emerald-200 bg-emerald-50/50"
        : "border-red-200 bg-red-50/50"
    }`}>
      <div className="flex items-start gap-2">
        <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
          correct ? "bg-emerald-500" : "bg-red-500"
        }`}>
          {correct ? "✓" : "✗"}
        </span>
        <div className="flex-1">
          <p className="text-sm font-medium text-zinc-800">
            <span className="text-zinc-400">Q{index + 1}.</span> {question.question}
          </p>
          <div className="mt-2 space-y-1">
            {question.options.map((opt, i) => (
              <p
                key={i}
                className={`text-xs ${
                  i === question.correctIndex
                    ? "font-bold text-emerald-700"
                    : i === answer && i !== question.correctIndex
                      ? "text-red-600 line-through"
                      : "text-zinc-500"
                }`}
              >
                {String.fromCharCode(65 + i)}. {opt}
                {i === question.correctIndex && " ✓"}
                {i === answer && i !== question.correctIndex && " (votre reponse)"}
              </p>
            ))}
          </div>
          {!correct && (
            <p className="mt-2 text-xs text-zinc-600 italic">{question.explanation}</p>
          )}
          {unanswered && (
            <p className="mt-1 text-xs font-medium text-amber-600">Non repondu</p>
          )}
        </div>
      </div>
    </div>
  );
}
