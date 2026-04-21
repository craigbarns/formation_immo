"use client";

import { useState } from "react";
import type { QuizCheckpoint } from "@/data/quiz-checkpoints";
import { sounds } from "@/lib/sounds";
import { addXP, XP_REWARDS } from "@/lib/gamification";
import { saveUserAnswers } from "@/app/actions/user-answers";
import { CheckCircle2, XCircle, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function QuizCard({ q, moduleSlug, lessonSlug }: { q: QuizCheckpoint; moduleSlug?: string; lessonSlug?: string }) {
  const [picked, setPicked] = useState<number | null>(null);
  const [showExplain, setShowExplain] = useState(false);

  const correctIndex = q.options.findIndex(o => o.isCorrect);

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#070d18] p-8 shadow-2xl transition-all duration-500 hover:border-brand-gold/20 group">
      <div className="flex items-start gap-4 mb-6">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-gold/10 border border-brand-gold/20 text-brand-gold shadow-lg">
          <HelpCircle className="h-6 w-6" />
        </div>
        <p className="text-lg font-black leading-tight tracking-tight text-white uppercase">{q.question}</p>
      </div>
      
      <ul className="space-y-3">
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
                className={`w-full group relative flex items-center justify-between gap-4 rounded-2xl border-2 px-6 py-4 text-left transition-all duration-300 ${
                  !reveal
                    ? "border-white/5 bg-white/[0.02] text-white/70 hover:border-brand-gold/50 hover:bg-white/5"
                    : correct
                      ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                      : selected
                        ? "border-red-500 bg-red-500/10 text-red-400"
                        : "border-white/5 bg-white/[0.01] text-white/20 opacity-50"
                }`}
              >
                <div className="flex items-center gap-4">
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-xs font-black transition-colors ${
                        !reveal ? "bg-white/10 text-white/40 group-hover:bg-brand-gold group-hover:text-brand-navy" :
                        correct ? "bg-emerald-500 text-brand-navy" :
                        selected ? "bg-red-500 text-brand-navy" : "bg-white/5 text-white/10"
                    }`}>
                        {String.fromCharCode(65 + i)}
                    </span>
                    <span className="font-bold">{opt.label}</span>
                </div>
                {reveal && correct && <CheckCircle2 className="h-5 w-5 text-emerald-400" />}
                {reveal && selected && !correct && <XCircle className="h-5 w-5 text-red-400" />}
              </button>
            </li>
          );
        })}
      </ul>

      <AnimatePresence>
        {showExplain && picked !== null && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-6 rounded-2xl border p-6 shadow-2xl backdrop-blur-md ${
                picked === correctIndex 
                ? "border-emerald-500/20 bg-emerald-500/5 text-emerald-100" 
                : "border-amber-500/20 bg-amber-500/5 text-amber-100"
            }`}
          >
            <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-2 opacity-50">
                {picked === correctIndex ? "Excellente réponse" : "Analyse pédagogique"}
            </p>
            <p className="text-sm leading-relaxed font-medium italic">
                &laquo; {q.explanation} &raquo;
            </p>
          </motion.div>
        )}
      </AnimatePresence>
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
    <section className="space-y-8">
      <div className="flex items-center gap-4 border-b border-white/10 pb-6">
        <div className="h-1.5 w-1.5 rounded-full bg-brand-gold animate-pulse" />
        <div>
            <h2 className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">{title}</h2>
            <p className="mt-1 text-sm text-white/40 font-medium italic">
            Testez votre compréhension stratégique avant de valider cette étape.
            </p>
        </div>
      </div>
      <div className="grid gap-6">
        {checkpoints.map((q) => (
          <QuizCard key={q.id} q={q} moduleSlug={moduleSlug} lessonSlug={lessonSlug} />
        ))}
      </div>
    </section>
  );
}
