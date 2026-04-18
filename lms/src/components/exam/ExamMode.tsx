"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { ExamQuestion, ModuleExam } from "@/data/exam-questions";
import { recordExamScore } from "@/lib/gamification";
import { createClient } from "@/lib/supabase/client";
import { saveUserAnswers } from "@/app/actions/user-answers";
import { generateFlashcardsFromMistakes } from "@/app/actions/flashcards-auto";

type ExamState = "intro" | "running" | "review";

/* ── Animated counter (simple) ─────────────────────────────────── */
function AnimatedCounter({ value, total }: { value: number; total: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    if (end === 0) return;
    const duration = 900;
    const step = Math.ceil(duration / end);
    const timer = setInterval(() => {
      start += 1;
      setDisplay(start);
      if (start >= end) clearInterval(timer);
    }, step);
    return () => clearInterval(timer);
  }, [value]);
  const pct = Math.round((display / total) * 100);
  return (
    <div className="relative mx-auto flex h-36 w-36 items-center justify-center">
      {/* SVG circular progress */}
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="52" strokeWidth="8" fill="none" className="stroke-zinc-100" />
        <circle
          cx="60" cy="60" r="52" strokeWidth="8" fill="none"
          stroke={pct >= 80 ? "#10b981" : pct >= 50 ? "#f59e0b" : "#ef4444"}
          strokeDasharray={`${2 * Math.PI * 52}`}
          strokeDashoffset={`${2 * Math.PI * 52 * (1 - pct / 100)}`}
          strokeLinecap="round"
          className="transition-all duration-1000"
        />
      </svg>
      <div className="text-center">
        <p className="text-3xl font-black text-brand-navy tabular-nums">{display}/{total}</p>
        <p className="text-sm font-bold text-zinc-500">{pct}%</p>
      </div>
    </div>
  );
}

/* ── Previous score from Supabase / localStorage fallback ──────────── */
async function getPreviousScore(moduleSlug: string): Promise<{ score: number; total: number } | null> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    // Fallback localStorage
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem("formation-gamification");
      if (!raw) return null;
      const state = JSON.parse(raw);
      const entry = state?.examScores?.[moduleSlug];
      if (!entry) return null;
      return { score: entry.score, total: entry.total };
    } catch {
      return null;
    }
  }
  const { data } = await supabase
    .from("gamification_state")
    .select("exam_scores")
    .eq("user_id", user.id)
    .single();
  const entry = data?.exam_scores?.[moduleSlug];
  if (!entry) return null;
  return { score: entry.score, total: entry.total };
}

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
═══════════════════════════════════════════════════════════════════ */
export function ExamMode({ exam }: { exam: ModuleExam }) {
  const [state, setState] = useState<ExamState>("intro");
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number | string>>({});
  const [timeLeft, setTimeLeft] = useState(exam.duration * 60);
  const [prevScore, setPrevScore] = useState<{ score: number; total: number } | null>(null);
  const [generatingCards, setGeneratingCards] = useState(false);
  const [cardsGenerated, setCardsGenerated] = useState(false);
  const [cardsError, setCardsError] = useState(false);
  const [openGrades, setOpenGrades] = useState<Record<string, { score: number; feedback: string; strengths: string; improvements: string }>>({});
  const [isGrading, setIsGrading] = useState(false);

  useEffect(() => {
    getPreviousScore(exam.moduleSlug).then(setPrevScore);
  }, [exam.moduleSlug]);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const submitExamRef = useRef<(() => void) | null>(null);

  const startExam = useCallback(() => {
    setAnswers({});
    setOpenGrades({});
    setCurrent(0);
    setTimeLeft(exam.duration * 60);
    setState("running");
    setIsGrading(false);
  }, [exam.duration]);

  const submitExam = useCallback(async () => {
    if (isGrading) return; // prevent double-submit
    if (timerRef.current) clearInterval(timerRef.current);

    // Grade open questions before review
    const openQuestions = exam.questions.filter(q => q.type === "open" && answers[q.id] !== undefined);
    if (openQuestions.length > 0) {
      setIsGrading(true);
      const grades: Record<string, { score: number; feedback: string; strengths: string; improvements: string }> = {};
      await Promise.all(openQuestions.map(async (q) => {
        try {
          const res = await fetch("/api/coach/grade", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              question: q.question,
              userAnswer: answers[q.id] as string,
              modelAnswer: q.modelAnswer || "",
            }),
          });
          if (res.ok) {
            const data = await res.json();
            grades[q.id] = data;
          }
        } catch {
          grades[q.id] = { score: 0, feedback: "Erreur de notation", strengths: "", improvements: "" };
        }
      }));
      setOpenGrades(grades);
      setIsGrading(false);
    }

    setState("review");
  }, [exam.questions, answers, isGrading]);

  // Keep submitExam accessible in timer closure
  useEffect(() => { submitExamRef.current = submitExam; }, [submitExam]);

  // Timer
  useEffect(() => {
    if (state !== "running") return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          submitExamRef.current?.();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [state]);

  // Score
  const { score, total } = useMemo(() => {
    let s = 0;
    for (const q of exam.questions) {
      if (q.type === "open") {
        const g = openGrades[q.id];
        if (g && g.score >= 60) s++;
      } else {
        if (answers[q.id] === q.correctIndex) s++;
      }
    }
    return { score: s, total: exam.questions.length };
  }, [answers, exam.questions, openGrades]);

  // Save score + log every answer on review
  useEffect(() => {
    if (state === "review") {
      recordExamScore(exam.moduleSlug, score, total);

      const timeSpent = exam.duration * 60 - timeLeft;
      const perQuestion = Math.round(timeSpent / exam.questions.length);

      const answerLogs = exam.questions.map((q) => {
        const isOpen = q.type === "open";
        const userAns = answers[q.id];
        const grade = openGrades[q.id];
        return {
          questionId: q.id,
          moduleSlug: exam.moduleSlug,
          questionText: q.question,
          selectedAnswer: userAns !== undefined
            ? (isOpen ? String(userAns) : q.options?.[userAns as number] ?? "(non répondu)")
            : "(non répondu)",
          correctAnswer: isOpen ? (q.modelAnswer || "") : (q.options?.[q.correctIndex ?? 0] ?? ""),
          isCorrect: isOpen
            ? (grade ? grade.score >= 60 : false)
            : (answers[q.id] === q.correctIndex),
          timeSpentSeconds: perQuestion,
          source: "exam" as const,
        };
      });

      saveUserAnswers(answerLogs).catch(() => {});
    }
  }, [state, exam, answers, score, total, timeLeft, openGrades]);

  const answeredCount = Object.keys(answers).length;
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  // Timer bar: fills as time runs out
  const timerPct = ((exam.duration * 60 - timeLeft) / (exam.duration * 60)) * 100;
  // SVG timer circle
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const timerDash = circumference * (timeLeft / (exam.duration * 60));

  /* ─── INTRO SCREEN ──────────────────────────────────────────── */
  if (state === "intro") {
    const prevPct = prevScore ? Math.round((prevScore.score / prevScore.total) * 100) : null;
    return (
      <div className="animate-scale-in rounded-2xl overflow-hidden border border-brand-navy/15 shadow-xl">
        {/* Header gradient */}
        <div className="bg-gradient-to-br from-brand-navy via-[#1e4a73] to-brand-navy-soft px-8 py-8 text-white text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-3xl shadow-lg ring-1 ring-white/25 mb-4">
            📝
          </div>
          <h2 className="text-2xl font-bold tracking-tight">{exam.title}</h2>
          <p className="mt-2 text-white/75 text-sm">Examen chronométré · Score enregistré</p>

          {prevScore && prevPct !== null && (
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
              <span className="text-white/70">Dernier score :</span>
              <span className={`font-bold ${prevPct >= 80 ? "text-emerald-300" : "text-amber-300"}`}>
                {prevScore.score}/{prevScore.total} ({prevPct}%)
              </span>
              {prevPct >= 80 ? " ✓" : " — à améliorer"}
            </div>
          )}
        </div>

        <div className="bg-white px-8 py-7">
          <div className="mx-auto max-w-md space-y-3 text-sm text-zinc-600 text-center">
            <p>
              <strong className="text-brand-navy">{exam.questions.length} questions</strong>
              {" — "}
              <strong>Durée : {exam.duration} minutes</strong>
            </p>
            <p className="leading-relaxed">
              Répondez à toutes les questions avant la fin du chrono. Votre score sera enregistré et contribuera à votre progression.
            </p>
          </div>

          <div className="mt-6 flex justify-center gap-3">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-3 text-center">
              <p className="text-lg font-black text-emerald-700">80%+</p>
              <p className="text-xs text-emerald-600 font-medium">= Réussi ✓</p>
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50 px-5 py-3 text-center">
              <p className="text-lg font-black text-amber-700">+300 XP</p>
              <p className="text-xs text-amber-600 font-medium">minimum</p>
            </div>
            <div className="rounded-xl border border-brand-navy/15 bg-brand-navy/5 px-5 py-3 text-center">
              <p className="text-lg font-black text-brand-navy">{exam.duration} min</p>
              <p className="text-xs text-brand-navy/70 font-medium">chronométré</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={startExam}
              className="relative inline-flex items-center gap-2 rounded-xl bg-brand-navy px-10 py-4 text-base font-bold text-white shadow-lg shadow-brand-navy/25 transition hover:bg-brand-navy-deep hover:shadow-xl active:scale-[0.98] animate-[pulse-gold_2.5s_ease-in-out_infinite]"
            >
              <span>Commencer l&apos;examen</span>
              <span aria-hidden>→</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ─── RESULTS SCREEN ─────────────────────────────────────────── */
  if (state === "review") {
    const passed = score / total >= 0.8;
    const isPerfect = score === total;
    let resultMsg = "";
    let resultSub = "";
    if (isPerfect) {
      resultMsg = "Score parfait !";
      resultSub = "Vous maîtrisez parfaitement ce module.";
    } else if (passed) {
      resultMsg = "Examen réussi ! Certificat débloqué";
      resultSub = "Félicitations, vous avez validé ce module.";
    } else {
      resultMsg = "Encore quelques points à revoir";
      resultSub = "Consultez les corrections et repassez l'examen.";
    }

    return (
      <div className="animate-scale-in rounded-2xl overflow-hidden border border-brand-navy/15 shadow-xl">
        {/* Result header */}
        <div className={`px-6 py-8 text-white text-center ${
          isPerfect
            ? "bg-gradient-to-br from-amber-500 to-amber-600"
            : passed
              ? "bg-gradient-to-br from-emerald-600 to-emerald-700"
              : "bg-gradient-to-br from-amber-600 to-orange-600"
        }`}>
          <div className="text-5xl mb-3">{isPerfect ? "🏆" : passed ? "🎉" : "📚"}</div>
          <h2 className="text-2xl font-bold">{resultMsg}</h2>
          <p className="mt-1 text-sm text-white/80">{resultSub}</p>
        </div>

        <div className="bg-white px-6 py-8">
          {/* Score ring */}
          <AnimatedCounter value={score} total={total} />

          {/* Message motivant */}
          <p className="mt-4 text-center text-sm text-zinc-600">
            {Math.round((score / total) * 100)}% de bonnes réponses
          </p>

          {/* Action buttons */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={startExam}
              className="rounded-xl border-2 border-brand-navy px-6 py-2.5 text-sm font-semibold text-brand-navy transition hover:bg-brand-navy/5"
            >
              Repasser l&apos;examen
            </button>
            <a
              href={`/formation/flashcards/${exam.moduleSlug}`}
              className="rounded-xl bg-brand-gold px-6 py-2.5 text-sm font-bold text-brand-navy shadow transition hover:brightness-[1.05]"
            >
              Réviser les flashcards
            </a>
            {score < total && !cardsGenerated && !cardsError && (
              <button
                onClick={async () => {
                  setGeneratingCards(true);
                  setCardsError(false);
                  const res = await generateFlashcardsFromMistakes(exam.moduleSlug, 5);
                  setGeneratingCards(false);
                  if (res.success) {
                    setCardsGenerated(true);
                  } else {
                    setCardsError(true);
                  }
                }}
                disabled={generatingCards}
                className="rounded-xl border-2 border-emerald-600 px-6 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50 disabled:opacity-50"
              >
                {generatingCards ? "Génération…" : "📚 Flashcards auto depuis erreurs"}
              </button>
            )}
            {cardsGenerated && (
              <span className="rounded-xl bg-emerald-50 px-6 py-2.5 text-sm font-semibold text-emerald-700">
                ✅ Flashcards créées !
              </span>
            )}
            {cardsError && (
              <span className="rounded-xl bg-red-50 px-6 py-2.5 text-sm font-semibold text-red-700">
                ❌ Erreur de génération — réessaie plus tard
              </span>
            )}
          </div>
        </div>

        {/* Detailed review */}
        <div className="border-t border-zinc-100">
          <div className="max-h-[500px] overflow-y-auto p-6">
            <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-zinc-400">
              Correction détaillée
            </h3>
            <div className="space-y-4">
              {exam.questions.map((q, i) => (
                <ReviewQuestion key={q.id} question={q} answer={answers[q.id]} index={i} grade={openGrades[q.id]} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  /* ─── RUNNING SCREEN ─────────────────────────────────────────── */
  const q = exam.questions[current];
  const progressPct = (answeredCount / total) * 100;

  return (
    <div className="rounded-2xl overflow-hidden border border-brand-navy/15 shadow-lg">
      {/* Top progress bar (reading progress style) */}
      <div className="h-1 bg-zinc-100">
        <div
          className="h-full bg-gradient-to-r from-brand-navy to-brand-gold transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {/* Header: timer + question counter */}
      <div className="border-b border-zinc-100 bg-zinc-50 px-5 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Answered indicator */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-zinc-500">
              Question{" "}
              <span className="font-bold text-brand-navy">{current + 1}</span>/{total}
            </span>
            <span className="hidden sm:inline rounded-full bg-brand-navy/8 px-2 py-0.5 text-[10px] font-bold text-brand-navy">
              {answeredCount}/{total} répondues
            </span>
          </div>

          {/* SVG circular timer */}
          <div className={`flex items-center gap-2 ${timeLeft < 60 ? "text-red-600 animate-pulse" : "text-brand-navy"}`}>
            <svg width="44" height="44" viewBox="0 0 44 44" className="shrink-0">
              <circle cx="22" cy="22" r={radius} strokeWidth="3" fill="none" className="stroke-zinc-200" />
              <circle
                cx="22" cy="22" r={radius}
                strokeWidth="3" fill="none"
                stroke={timeLeft < 60 ? "#ef4444" : timeLeft < 120 ? "#f59e0b" : "#1a3a5c"}
                strokeDasharray={`${circumference}`}
                strokeDashoffset={`${circumference - timerDash}`}
                strokeLinecap="round"
                transform="rotate(-90 22 22)"
                className="transition-all duration-1000"
              />
              <text x="22" y="26" textAnchor="middle" fontSize="10" fontWeight="bold" fill="currentColor">
                {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
              </text>
            </svg>
          </div>
        </div>

        {/* Time bar */}
        <div className="mt-2 h-1 overflow-hidden rounded-full bg-zinc-200">
          <div
            className={`h-full rounded-full transition-all duration-1000 ${timeLeft < 60 ? "bg-red-500" : "bg-brand-gold"}`}
            style={{ width: `${timerPct}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white p-6">
        <h3 className="text-lg font-bold leading-snug text-brand-navy">{q.question}</h3>
        {q.type === "open" ? (
          <textarea
            value={(answers[q.id] as string) || ""}
            onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
            placeholder="Rédigez votre réponse ici…"
            className="mt-5 w-full min-h-[8rem] rounded-xl border-2 border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-brand-navy/30 focus:bg-zinc-50 transition-all resize-y"
          />
        ) : (
          <ul className="mt-5 space-y-2.5">
            {q.options?.map((opt, i) => {
              const selected = answers[q.id] === i;
              return (
                <li key={i}>
                  <button
                    onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: i }))}
                    className={`flex w-full items-start gap-3 rounded-xl border-2 px-4 py-3.5 text-left text-sm transition-all duration-150 ${
                      selected
                        ? "border-brand-navy bg-brand-navy/[0.06] scale-[1.01] text-brand-navy shadow-sm"
                        : "border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50/80"
                    }`}
                  >
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all ${
                      selected ? "bg-brand-navy text-white scale-110" : "bg-zinc-100 text-zinc-500"
                    }`}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span className="pt-0.5 leading-snug">{opt}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between border-t border-zinc-100 bg-zinc-50/80 p-4">
        <button
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-600 transition hover:bg-zinc-100 disabled:opacity-30"
        >
          ← Précédente
        </button>

        {/* Question dots */}
        <div className="hidden sm:flex gap-1.5 flex-wrap justify-center max-w-[200px]">
          {exam.questions.map((qq, i) => (
            <button
              key={qq.id}
              onClick={() => setCurrent(i)}
              title={`Question ${i + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition-all ${
                i === current
                  ? "bg-brand-navy scale-125 ring-2 ring-brand-navy/30 ring-offset-1"
                  : answers[qq.id] !== undefined
                    ? "bg-brand-gold"
                    : "bg-zinc-200 hover:bg-zinc-300"
              }`}
            />
          ))}
        </div>

        {current < exam.questions.length - 1 ? (
          <button
            onClick={() => setCurrent((c) => c + 1)}
            className="rounded-lg bg-brand-navy px-4 py-2 text-sm font-medium text-white transition hover:bg-brand-navy-deep"
          >
            Suivante →
          </button>
        ) : (
          <button
            onClick={() => submitExam()}
            disabled={isGrading}
            className="rounded-lg bg-brand-gold px-6 py-2 text-sm font-bold text-brand-navy shadow transition hover:brightness-[1.05] disabled:opacity-50"
          >
            {isGrading ? "Notation IA en cours…" : "Terminer l'examen ✓"}
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Review question component ──────────────────────────────────── */
function ReviewQuestion({
  question,
  answer,
  index,
  grade,
}: {
  question: ExamQuestion;
  answer: number | string | undefined;
  index: number;
  grade?: { score: number; feedback: string; strengths: string; improvements: string };
}) {
  const isOpen = question.type === "open";
  const unanswered = answer === undefined || (isOpen && String(answer).trim() === "");
  const correct = isOpen
    ? (grade ? grade.score >= 60 : false)
    : answer === question.correctIndex;

  return (
    <div className={`rounded-xl border p-4 ${
      unanswered
        ? "border-zinc-200 bg-zinc-50/60"
        : correct
          ? "border-emerald-200 bg-emerald-50/50"
          : "border-red-200 bg-red-50/50"
    }`}>
      <div className="flex items-start gap-2">
        <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
          unanswered ? "bg-zinc-400" : correct ? "bg-emerald-500" : "bg-red-500"
        }`}>
          {unanswered ? "?" : correct ? "✓" : "✗"}
        </span>
        <div className="flex-1">
          <p className="text-sm font-medium text-zinc-800">
            <span className="text-zinc-400">Q{index + 1}.</span> {question.question}
            {isOpen && <span className="ml-2 rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-700">OUVERTE</span>}
          </p>
          {isOpen ? (
            <div className="mt-2 space-y-2">
              <p className="text-xs text-zinc-700">
                <span className="font-semibold">Votre réponse :</span>{" "}
                {unanswered ? "(non répondu)" : String(answer)}
              </p>
              {grade && (
                <div className="rounded-lg border border-amber-200 bg-amber-50/60 p-3 text-xs space-y-1">
                  <p className="font-bold text-amber-800">Note IA : {grade.score}/100</p>
                  <p className="text-zinc-700">{grade.feedback}</p>
                  {grade.strengths && <p className="text-emerald-700">✓ {grade.strengths}</p>}
                  {grade.improvements && <p className="text-red-600">→ {grade.improvements}</p>}
                </div>
              )}
              {question.modelAnswer && (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50/40 p-3 text-xs">
                  <p className="font-semibold text-emerald-800">Réponse modèle :</p>
                  <p className="mt-1 text-zinc-700">{question.modelAnswer}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="mt-2 space-y-1">
              {question.options?.map((opt, i) => (
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
                  {i === answer && i !== question.correctIndex && " (votre réponse)"}
                </p>
              ))}
            </div>
          )}
          {!correct && !unanswered && !isOpen && (
            <p className="mt-2 text-xs italic text-zinc-600">{question.explanation}</p>
          )}
          {unanswered && (
            <p className="mt-1 text-xs font-medium text-amber-600">Non répondu</p>
          )}
        </div>
      </div>
    </div>
  );
}
