"use client";

import { useState } from "react";
import type { QuizCheckpoint } from "@/data/quiz-checkpoints";
import { sounds } from "@/lib/sounds";
import { addXP, XP_REWARDS } from "@/lib/gamification";
import { saveUserAnswers } from "@/app/actions/user-answers";

function QuizCard({ q, moduleSlug, lessonSlug }: { q: QuizCheckpoint; moduleSlug?: string; lessonSlug?: string }) {
  const [picked, setPicked] = useState<number | null>(null);
  const [showExplain, setShowExplain] = useState(false);

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold leading-snug text-zinc-900">{q.question}</p>
      <ul className="mt-4 space-y-2">
        {q.options.map((opt, i) => {
          const selected = picked === i;
          const correct = opt.isCorrect;
          const reveal = picked !== null;
          return (
            <li key={i}>
              <button
                type="button"
                disabled={picked !== null}
                onClick={() => {
                  setPicked(i);
                  setShowExplain(true);
                  const isCorrect = opt.isCorrect;
                  if (isCorrect) {
                    sounds.quizCorrect();
                    addXP(XP_REWARDS.QUIZ_CORRECT, "Bonne réponse QCM");
                  } else {
                    sounds.quizWrong();
                  }
                  // Log answer
                  const correctOption = q.options.find(o => o.isCorrect);
                  saveUserAnswers([{
                    questionId: q.id,
                    moduleSlug: moduleSlug || q.moduleSlug,
                    lessonSlug: lessonSlug || q.lessonSlug,
                    questionText: q.question,
                    selectedAnswer: opt.label,
                    correctAnswer: correctOption?.label || "",
                    isCorrect,
                    source: "quiz",
                  }]).catch(() => {});
                }}
                className={`w-full rounded-lg border px-4 py-2.5 text-left text-sm transition ${
                  !reveal
                    ? "border-zinc-200 hover:border-brand-navy/30 hover:bg-zinc-50"
                    : correct
                      ? "border-emerald-400 bg-emerald-50 text-emerald-900"
                      : selected
                        ? "border-red-300 bg-red-50 text-red-900"
                        : "border-zinc-100 text-zinc-400"
                }`}
              >
                {opt.label}
              </button>
            </li>
          );
        })}
      </ul>
      {showExplain && picked !== null && (
        <div className="mt-4 rounded-lg border border-brand-gold/25 bg-brand-gold/5 px-4 py-3 text-sm text-zinc-700">
          {q.explanation}
        </div>
      )}
    </div>
  );
}

export function QuizCheckpointsSection({
  checkpoints,
  title = "Questions de vérification",
  moduleSlug,
  lessonSlug,
}: {
  checkpoints: QuizCheckpoint[];
  title?: string;
  moduleSlug?: string;
  lessonSlug?: string;
}) {
  if (checkpoints.length === 0) return null;

  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wide text-brand-navy">{title}</h2>
        <p className="mt-1 text-sm text-zinc-600">
          Testez votre compréhension avant de passer à la suite.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-1">
        {checkpoints.map((q) => (
          <QuizCard key={q.id} q={q} moduleSlug={moduleSlug} lessonSlug={lessonSlug} />
        ))}
      </div>
    </section>
  );
}
