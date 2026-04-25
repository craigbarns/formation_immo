"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { FileText, Trophy, PartyPopper, BookOpen, CheckCircle2, XCircle, Clock, ChevronLeft, ChevronRight, Sparkles, Send, Brain, Zap, Loader2, RotateCcw, HelpCircle, Lightbulb } from "lucide-react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";
import type { ExamQuestion, ModuleExam } from "@/data/exam-questions";
import { recordExamScore } from "@/lib/gamification";
import { createClient } from "@/lib/supabase/client";
import { saveUserAnswers } from "@/app/actions/user-answers";
import { generateFlashcardsFromMistakes } from "@/app/actions/flashcards-auto";
import { submitExamResult } from "@/app/actions/certification";
import { motion, AnimatePresence } from "framer-motion";
import { CertificateGenerator } from "@/components/certificate/CertificateGenerator";

type ExamState = "intro" | "running" | "review";

/* ── Animated counter (simple) ─────────────────────────────────── */
function AnimatedCounter({ value, total }: { value: number; total: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    if (end === 0) return;
    const duration = 1200;
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
    <div className="relative mx-auto flex h-44 w-44 items-center justify-center">
      {/* SVG circular progress */}
      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r="54" strokeWidth="6" fill="none" className="stroke-white/5" />
        <motion.circle
          cx="60" cy="60" r="54" strokeWidth="6" fill="none"
          stroke={pct >= 70 ? "#10b981" : pct >= 50 ? "#f59e0b" : "#ef4444"}
          strokeDasharray={`${2 * Math.PI * 54}`}
          strokeDashoffset={`${2 * Math.PI * 54 * (1 - pct / 100)}`}
          strokeLinecap="round"
          initial={{ strokeDashoffset: 2 * Math.PI * 54 }}
          animate={{ strokeDashoffset: 2 * Math.PI * 54 * (1 - pct / 100) }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      </svg>
      <div className="text-center">
        <p className="text-5xl font-black text-white tabular-nums tracking-tighter">{display}<span className="text-2xl text-white/20">/{total}</span></p>
        <p className="text-xs font-black uppercase tracking-[0.2em] text-white/40 mt-1">{pct}%</p>
      </div>
    </div>
  );
}

/* ── Previous score from Supabase / localStorage fallback ──────────── */
async function getPreviousScore(moduleSlug: string): Promise<{ score: number; total: number } | null> {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
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

export function ExamMode({ exam, showCertificate }: { exam: ModuleExam; showCertificate?: boolean }) {
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
    if (isGrading) return;
    if (timerRef.current) clearInterval(timerRef.current);

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

  useEffect(() => { submitExamRef.current = submitExam; }, [submitExam]);

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

  const { score, total } = useMemo(() => {
    let s = 0;
    for (const q of exam.questions) {
      if (q.type === "open") {
        const g = openGrades[q.id];
        if (g && g.score >= 70) s++;
      } else {
        if (answers[q.id] === q.correctIndex) s++;
      }
    }
    return { score: s, total: exam.questions.length };
  }, [answers, exam.questions, openGrades]);

  useEffect(() => {
    if (state === "review") {
      recordExamScore(exam.moduleSlug, score, total);
      const durationSeconds = exam.duration * 60 - timeLeft;
      const pct = Math.round((score / total) * 100);
      const formattedAnswers = exam.questions.map((q) => ({
        questionId: q.id,
        selected: answers[q.id] as number ?? -1,
        correct: q.type === "open"
          ? (openGrades[q.id]?.score ?? 0) >= 70
          : answers[q.id] === q.correctIndex,
      }));
      submitExamResult({
        moduleSlug: exam.moduleSlug,
        score: pct,
        passed: pct >= 70,
        answers: formattedAnswers,
        durationSeconds,
      }).catch(() => {});

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
            ? (grade ? grade.score >= 70 : false)
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
  const timerPct = ((exam.duration * 60 - timeLeft) / (exam.duration * 60)) * 100;
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const timerDash = circumference * (timeLeft / (exam.duration * 60));

  /* ─── INTRO SCREEN ──────────────────────────────────────────── */
  if (state === "intro") {
    const prevPct = prevScore ? Math.round((prevScore.score / prevScore.total) * 100) : null;
    return (
      <div className="rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#070d18] shadow-[0_40px_100px_rgba(0,0,0,0.6)]">
        <div className="relative bg-[#030712] px-8 py-16 text-center border-b border-white/5">
          <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/[0.05] to-transparent pointer-events-none" />
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.5rem] bg-brand-gold/10 border border-brand-gold/20 text-brand-gold shadow-2xl mb-8">
            <FileText className="h-10 w-10" />
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold mb-3">ÉVALUATION CERTIFIANTE</p>
          <h2 className="text-4xl font-black tracking-tight text-white uppercase leading-none">{exam.title}</h2>
          <p className="mt-6 text-white/50 text-lg italic font-medium">&laquo; Testez vos acquis stratégiques en conditions réelles. &raquo;</p>

          {prevScore && prevPct !== null && (
            <div className="mt-10 inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm backdrop-blur-xl">
              <span className="text-white/40 font-bold uppercase tracking-widest text-xs">Dernier essai :</span>
              <span className={`font-black tabular-nums ${prevPct >= 70 ? "text-emerald-400" : "text-amber-400"}`}>
                {prevScore.score}/{prevScore.total} ({prevPct}%)
              </span>
              {prevPct >= 70 && <CheckCircle2 className="h-5 w-5 text-emerald-400" />}
            </div>
          )}
        </div>

        <div className="px-8 py-12 md:px-16">
          <div className="mx-auto max-w-2xl grid gap-8 md:grid-cols-3 mb-12">
            <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 text-center">
                <p className="text-3xl font-black text-white tabular-nums">{exam.questions.length}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mt-2">Questions</p>
            </div>
            <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-6 text-center">
                <p className="text-3xl font-black text-white tabular-nums">{exam.duration}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mt-2">Minutes</p>
            </div>
            <div className="rounded-3xl border border-brand-gold/20 bg-brand-gold/5 p-6 text-center">
                <p className="text-3xl font-black text-brand-gold tabular-nums">70%</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-brand-gold/60 mt-2">Seuil de réussite</p>
            </div>
          </div>

          <div className="mx-auto max-w-xl p-8 rounded-3xl border border-white/5 bg-black/20 text-center">
            <p className="text-lg leading-relaxed text-white/60 font-medium italic">
                L&apos;examen est chronométré. Une fois lancé, vous ne pourrez pas mettre le compteur en pause. Assurez-vous d&apos;être dans un environnement calme.
            </p>
          </div>

          <div className="mt-12 text-center">
            <button
              onClick={startExam}
              className="group relative inline-flex items-center gap-4 rounded-[2rem] bg-brand-gold px-12 py-6 text-lg font-black uppercase tracking-[0.2em] text-brand-navy shadow-[0_20px_50px_rgba(212,175,55,0.3)] transition hover:bg-white hover:scale-105 active:scale-95 animate-pulse-subtle"
            >
              <Zap size={24} className="fill-brand-navy/20" />
              Lancer l&apos;examen
              <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ─── RESULTS SCREEN ─────────────────────────────────────────── */
  if (state === "review") {
    const passed = score / total >= 0.7;
    const isPerfect = score === total;
    let resultMsg = "";
    let resultSub = "";
    if (isPerfect) {
      resultMsg = "EXCELLENCE ATTEINTE !";
      resultSub = "Maîtrise absolue du module démontrée.";
    } else if (passed) {
      resultMsg = "EXAMEN RÉUSSI !";
      resultSub = "Validation acquise pour ce bloc de compétences.";
    } else {
      resultMsg = "PERFORMANCE À CONSOLIDER";
      resultSub = "Identifiez vos zones d'ombre et retentez votre chance.";
    }

    return (
      <div className="rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#070d18] shadow-2xl">
        <div className={`relative px-8 py-16 text-white text-center border-b border-white/5 ${
          isPerfect ? "bg-amber-500/10" : passed ? "bg-emerald-500/10" : "bg-red-500/10"
        }`}>
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none" />
          <div className="flex justify-center mb-6">
              <div className={`h-20 w-20 rounded-[1.5rem] flex items-center justify-center border shadow-2xl ${
                  isPerfect ? "bg-amber-500/20 border-amber-500/40 text-brand-gold" :
                  passed ? "bg-emerald-500/20 border-emerald-500/40 text-emerald-400" :
                  "bg-red-500/20 border-red-500/40 text-red-400"
              }`}>
                {isPerfect ? <Trophy size={40} /> : passed ? <PartyPopper size={40} /> : <BookOpen size={40} />}
              </div>
          </div>
          <h2 className="text-4xl font-black tracking-tight uppercase leading-none mb-4">{resultMsg}</h2>
          <p className="text-xl text-white/50 font-medium italic">&laquo; {resultSub} &raquo;</p>
        </div>

        <div className="p-8 md:p-12">
          <AnimatedCounter value={score} total={total} />

          <div className="mt-12 flex flex-wrap justify-center gap-4">
            <button
              onClick={startExam}
              className="group inline-flex items-center gap-3 rounded-2xl border-2 border-white/10 bg-white/5 px-8 py-4 text-xs font-black uppercase tracking-widest text-white transition hover:bg-white hover:text-brand-navy"
            >
              <RotateCcw size={16} className="transition-transform group-hover:rotate-180" /> RETENTER
            </button>
            <Link
              href={`/formation/flashcards/${exam.moduleSlug}`}
              className="group inline-flex items-center gap-3 rounded-2xl bg-brand-gold px-10 py-4 text-xs font-black uppercase tracking-widest text-brand-navy shadow-xl shadow-brand-gold/20 transition hover:bg-white hover:scale-105"
            >
              <Brain size={16} /> RÉVISER LES CONCEPTS
            </Link>
            
            {score < total && !cardsGenerated && !cardsError && (
              <button
                onClick={async () => {
                  setGeneratingCards(true);
                  setCardsError(false);
                  const res = await generateFlashcardsFromMistakes(exam.moduleSlug, 5);
                  setGeneratingCards(false);
                  if (res.success) setCardsGenerated(true);
                  else setCardsError(true);
                }}
                disabled={generatingCards}
                className="inline-flex items-center gap-3 rounded-2xl border-2 border-emerald-500/30 bg-emerald-500/5 px-8 py-4 text-xs font-black uppercase tracking-widest text-emerald-400 transition hover:bg-emerald-500 hover:text-white disabled:opacity-30"
              >
                {generatingCards ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />} 
                CRÉER FLASHCARDS AUTO
              </button>
            )}
          </div>
        </div>

        {/* Certificate download — only on certification exam after passing */}
        {passed && showCertificate && (
          <div className="border-t border-white/5 px-8 md:px-12 py-10">
            <p className="mb-6 text-center text-[10px] font-black uppercase tracking-[0.4em] text-white/20">VOTRE CERTIFICAT</p>
            <CertificateGenerator />
          </div>
        )}

        {/* Detailed review */}
        <div className="border-t border-white/5 bg-[#030712]/60 p-8 md:p-12 lg:p-16">
            <h3 className="mb-10 text-[10px] font-black uppercase tracking-[0.4em] text-white/20 text-center">ANALYSE PÉDAGOGIQUE DÉTAILLÉE</h3>
            <div className="space-y-8 max-w-4xl mx-auto">
              {exam.questions.map((q, i) => (
                <ReviewQuestion key={q.id} question={q} answer={answers[q.id]} index={i} grade={openGrades[q.id]} />
              ))}
            </div>
        </div>
      </div>
    );
  }

  /* ─── RUNNING SCREEN ─────────────────────────────────────────── */
  const q = exam.questions[current];
  const progressPct = (answeredCount / total) * 100;

  return (
    <div className="rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#070d18] shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
      {/* Top progress bar */}
      <div className="h-2 bg-white/5 shadow-inner">
        <motion.div
          className="h-full bg-gradient-to-r from-brand-gold via-white to-brand-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]"
          initial={{ width: 0 }}
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Header */}
      <div className="border-b border-white/5 bg-[#030712] px-8 py-6">
        <div className="flex items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <div>
              <p className="text-[9px] font-black uppercase tracking-widest text-white/30">Progression</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xl font-black text-white tabular-nums">{current + 1}</span>
                <span className="text-sm font-bold text-white/20">/ {total}</span>
              </div>
            </div>
            <div className="hidden sm:block h-10 w-px bg-white/10" />
            <div className="hidden sm:block">
              <p className="text-[9px] font-black uppercase tracking-widest text-white/30">Répondues</p>
              <p className="mt-1 text-sm font-black text-brand-gold uppercase tracking-tight">{answeredCount} questions</p>
            </div>
          </div>

          {/* Timer */}
          <div className={`flex items-center gap-5 px-6 py-3 rounded-[1.5rem] border backdrop-blur-xl transition-all duration-500 ${
              timeLeft < 60 ? "bg-red-500/10 border-red-500/40 text-red-400 animate-pulse shadow-[0_0_30px_rgba(239,68,68,0.2)]" : "bg-white/5 border-white/10 text-white"
          }`}>
            <Clock size={20} className={timeLeft < 60 ? "animate-spin-slow" : "text-brand-gold"} />
            <span className="text-2xl font-black tabular-nums tracking-tighter">
                {String(mins).padStart(2, "0")}:{String(secs).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="p-8 md:p-16 lg:p-20 min-h-[400px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-3xl mx-auto"
          >
            <span className="inline-flex rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold mb-8">QUESTION STRATÉGIQUE</span>
            <h3 className="text-3xl font-black text-white sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight mb-12 uppercase">{q.question}</h3>
            
            {q.type === "open" ? (
              <textarea
                value={(answers[q.id] as string) || ""}
                onChange={(e) => setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                placeholder="Rédigez votre analyse ici..."
                className="w-full min-h-[200px] rounded-[2rem] border-2 border-white/10 bg-black/40 p-8 text-lg font-medium text-white outline-none focus:border-brand-gold/50 focus:ring-8 focus:ring-brand-gold/5 transition-all resize-none shadow-inner italic"
              />
            ) : (
              <div className="grid gap-4">
                {q.options?.map((opt, i) => {
                  const selected = answers[q.id] === i;
                  return (
                    <button
                        key={i}
                        onClick={() => setAnswers((prev) => ({ ...prev, [q.id]: i }))}
                        className={`group relative flex w-full items-center gap-6 rounded-[1.5rem] border-2 p-6 text-left transition-all duration-300 ${
                        selected
                            ? "border-brand-gold bg-brand-gold/10 text-white shadow-[0_0_40px_rgba(212,175,55,0.1)]"
                            : "border-white/5 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]"
                        }`}
                    >
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-black border transition-all ${
                        selected ? "bg-brand-gold border-brand-gold text-brand-navy shadow-lg" : "bg-black/40 border-white/10 text-white/20"
                        }`}>
                        {String.fromCharCode(65 + i)}
                        </div>
                        <span className={`text-lg font-bold leading-tight ${selected ? "text-white" : "text-white/70 group-hover:text-white"}`}>{opt}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="border-t border-white/5 bg-[#030712] p-6 sm:p-10 flex flex-col sm:flex-row items-center justify-between gap-6">
        <button
          onClick={() => setCurrent((c) => Math.max(0, c - 1))}
          disabled={current === 0}
          className="group flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-8 py-4 text-xs font-black uppercase tracking-widest text-white/40 transition hover:bg-white hover:text-brand-navy disabled:opacity-10"
        >
          <ChevronLeft size={16} className="transition-transform group-hover:-translate-x-1" /> Précédente
        </button>

        <div className="flex gap-2.5 flex-wrap justify-center max-w-[300px]">
          {exam.questions.map((qq, i) => (
            <button
              key={qq.id}
              onClick={() => setCurrent(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === current ? "w-8 bg-brand-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]" : 
                answers[qq.id] !== undefined ? "w-4 bg-emerald-500" : "w-4 bg-white/10"
              }`}
            />
          ))}
        </div>

        {current < exam.questions.length - 1 ? (
          <button
            onClick={() => setCurrent((c) => c + 1)}
            className="group flex items-center gap-3 rounded-2xl bg-white px-10 py-4 text-xs font-black uppercase tracking-widest text-brand-navy shadow-2xl transition hover:bg-brand-gold hover:scale-105 active:scale-95"
          >
            Suivante <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
          </button>
        ) : (
          <button
            onClick={() => submitExam()}
            disabled={isGrading}
            className="group inline-flex items-center gap-4 rounded-2xl bg-brand-gold px-12 py-5 text-sm font-black uppercase tracking-[0.2em] text-brand-navy shadow-[0_15px_40px_rgba(212,175,55,0.3)] transition hover:bg-white hover:scale-105 active:scale-95 disabled:opacity-30"
          >
            {isGrading ? <Loader2 className="animate-spin" size={20} /> : <CheckCircle2 size={20} />}
            {isGrading ? "Notation IA..." : "Finaliser l&apos;examen"}
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
    ? (grade ? grade.score >= 70 : false)
    : answer === question.correctIndex;

  return (
    <div className={`rounded-[2rem] border-2 p-8 shadow-2xl transition-all duration-500 ${
      unanswered ? "border-white/5 bg-white/[0.01]" :
      correct ? "border-emerald-500/20 bg-emerald-500/5 shadow-emerald-500/5" :
      "border-red-500/20 bg-red-500/5 shadow-red-500/5"
    }`}>
      <div className="flex items-start gap-6">
        <div className={`mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-[1.25rem] border-2 transition-all ${
          unanswered ? "bg-white/5 border-white/10 text-white/20" :
          correct ? "bg-emerald-500 border-emerald-400 text-brand-navy" :
          "bg-red-500 border-red-400 text-brand-navy"
        }`}>
          {unanswered ? <HelpCircle size={24} /> : correct ? <CheckCircle2 size={24} /> : <XCircle size={24} />}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-4">
             <span className="text-[10px] font-black uppercase tracking-widest text-white/20">QUESTION {index + 1}</span>
             {isOpen && <span className="rounded-md bg-amber-500/20 border border-amber-500/30 px-2 py-0.5 text-[9px] font-black uppercase tracking-widest text-amber-500">FORMAT OUVERT</span>}
          </div>
          <p className="text-xl font-black tracking-tight text-white uppercase mb-6 leading-tight">
            {question.question}
          </p>
          
          {isOpen ? (
            <div className="space-y-6">
              <div className="rounded-2xl bg-black/40 border border-white/5 p-6 italic shadow-inner">
                <p className="text-[9px] font-black uppercase tracking-widest text-white/20 mb-2">VOTRE ANALYSE</p>
                <p className="text-base text-white/80 font-medium">&laquo; {unanswered ? "Non renseigné" : String(answer)} &raquo;</p>
              </div>
              
              {grade && (
                <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 space-y-4">
                  <div className="flex items-center justify-between">
                     <p className="text-[10px] font-black uppercase tracking-widest text-amber-500">FEEDBACK EXPERT IA</p>
                     <span className="text-lg font-black text-white tabular-nums">{grade.score}/100</span>
                  </div>
                  <p className="text-base text-white/70 italic leading-relaxed">&laquo; {grade.feedback} &raquo;</p>
                  <div className="grid gap-3 sm:grid-cols-2 pt-2">
                     {grade.strengths && (
                         <div className="rounded-xl bg-emerald-500/10 p-3 border border-emerald-500/20">
                            <p className="text-[9px] font-black uppercase text-emerald-400 mb-1">Points forts</p>
                            <p className="text-xs text-white/60 font-medium">{grade.strengths}</p>
                         </div>
                     )}
                     {grade.improvements && (
                         <div className="rounded-xl bg-red-500/10 p-3 border border-red-500/20">
                            <p className="text-[9px] font-black uppercase text-red-400 mb-1">Améliorations</p>
                            <p className="text-xs text-white/60 font-medium">{grade.improvements}</p>
                         </div>
                     )}
                  </div>
                </div>
              )}
              {question.modelAnswer && (
                <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6">
                  <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">RÉPONSE MODÈLE</p>
                  <p className="text-sm text-white/60 leading-relaxed italic">{question.modelAnswer}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="grid gap-3">
              {question.options?.map((opt, i) => {
                const isCorrect = i === question.correctIndex;
                const isUser = i === (answer as number);
                return (
                  <div
                    key={i}
                    className={`flex items-center justify-between gap-4 rounded-xl border-2 px-5 py-4 transition-all ${
                      isCorrect ? "border-emerald-500/40 bg-emerald-500/10 text-white" : 
                      isUser && !isCorrect ? "border-red-500/40 bg-red-500/10 text-red-300" :
                      "border-white/5 bg-[#030712] text-white/30"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                        <span className={`text-[10px] font-black uppercase ${isCorrect ? "text-emerald-400" : "opacity-30"}`}>{String.fromCharCode(65 + i)}.</span>
                        <span className={`text-sm font-bold ${isCorrect ? "opacity-100" : "opacity-60"}`}>{opt}</span>
                    </div>
                    {isCorrect && <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />}
                    {isUser && !isCorrect && <XCircle size={16} className="text-red-400 shrink-0" />}
                  </div>
                );
              })}
            </div>
          )}
          {!correct && !unanswered && !isOpen && (
            <div className="mt-8 rounded-2xl bg-brand-gold/5 border border-brand-gold/20 p-6 flex gap-4">
                <Lightbulb className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-brand-gold mb-1">Raisonnement stratégique</p>
                    <p className="text-sm text-white/60 leading-relaxed italic">&laquo; {question.explanation} &raquo;</p>
                </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

