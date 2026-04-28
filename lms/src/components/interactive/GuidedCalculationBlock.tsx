"use client";

import React, { useCallback, useState } from "react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";
import type { GuidedCalculation, CalcStep } from "@/data/guided-calculations";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, CheckCircle2, RotateCcw, Calculator, AlertCircle } from "lucide-react";

type StepStatus = "locked" | "active" | "correct" | "wrong";

function parseNum(raw: string): number | null {
  const n = parseFloat(raw.replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

function StepCard({
  step,
  status,
  onValidate,
}: {
  step: CalcStep;
  status: StepStatus;
  onValidate: (value: number) => void;
}) {
  const [input, setInput] = useState("");
  const [showHint, setShowHint] = useState(false);
  const [tried, setTried] = useState(false);

  const validate = useCallback(() => {
    const n = parseNum(input);
    if (n === null) return;
    setTried(true);
    onValidate(n);
  }, [input, onValidate]);

  const isCorrect = status === "correct";
  const isWrong = status === "wrong";
  const isLocked = status === "locked";

  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border-2 transition-all duration-500 ${
        isLocked
          ? "border-white/5 bg-white/[0.02] opacity-40 grayscale"
          : isCorrect
            ? "border-emerald-500/30 bg-emerald-500/5 shadow-emerald-500/5"
            : isWrong
              ? "border-red-500/30 bg-red-500/5 shadow-red-500/5"
              : "border-brand-gold/30 bg-[#070d18] shadow-2xl"
      }`}
    >
      {/* Step number + title */}
      <div className="flex items-start gap-5 p-6 md:p-8">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-black shadow-xl ring-1 transition-colors ${
            isLocked
              ? "bg-white/5 text-white/20 ring-white/10"
              : isCorrect
                ? "bg-emerald-500 text-brand-navy ring-emerald-400/50"
                : "bg-brand-gold text-brand-navy ring-brand-gold/50"
          }`}
        >
          {isLocked ? <Lock size={18} /> : isCorrect ? <CheckCircle2 size={18} /> : step.stepNumber}
        </div>
        <div className="flex-1 pt-1">
          <p className={`font-black uppercase tracking-tight ${isLocked ? "text-white/20" : "text-white"}`}>
            {step.title}
          </p>
          {!isLocked && (
            <p className="mt-2 text-sm leading-relaxed text-white/50 font-medium italic">
                &laquo; {step.instruction} &raquo;
            </p>
          )}
        </div>
      </div>

      {!isLocked && (
        <div className="border-t border-white/5 p-6 md:p-8 space-y-6 bg-white/[0.01]">
          {/* Formula */}
          {step.formula && (
            <div className="relative group overflow-hidden rounded-2xl bg-black/40 border border-white/5 p-5">
              <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/[0.05] to-transparent pointer-events-none" />
              <p className="text-[10px] font-black uppercase tracking-widest text-brand-gold mb-2 opacity-60">Modèle de calcul</p>
              <code className="relative z-10 block font-mono text-base text-white/90 tracking-tight">
                {step.formula}
              </code>
            </div>
          )}

          {/* Input row */}
          {!isCorrect && (
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex flex-1 items-center overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-2xl focus-within:border-brand-gold/50 focus-within:ring-4 focus-within:ring-brand-gold/10 transition-all">
                <input
                  type="text"
                  inputMode="decimal"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && validate()}
                  placeholder="Saisir le résultat..."
                  className="flex-1 bg-transparent px-5 py-4 text-base font-black text-white outline-none placeholder:text-white/20"
                />
                <span className="shrink-0 border-l border-white/10 bg-white/5 px-5 py-4 text-[10px] font-black uppercase tracking-widest text-white/40">
                  {step.inputUnit}
                </span>
              </div>
              <button
                onClick={validate}
                className="rounded-2xl bg-brand-gold px-8 py-4 text-xs font-black uppercase tracking-widest text-brand-navy shadow-xl shadow-brand-gold/20 transition hover:bg-white hover:scale-105 active:scale-95"
              >
                Vérifier
              </button>
              {step.hint && (
                <button
                  onClick={() => setShowHint((v) => !v)}
                  className={`rounded-2xl border px-6 py-4 text-[10px] font-black uppercase tracking-widest transition-all ${
                    showHint 
                    ? "bg-brand-gold/20 border-brand-gold text-brand-gold" 
                    : "bg-white/5 border-white/10 text-white/40 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {showHint ? "Cacher l'indice" : "Indice"}
                </button>
              )}
            </div>
          )}

          <AnimatePresence>
            {/* Hint */}
            {showHint && step.hint && !isCorrect && (
                <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="rounded-2xl border border-brand-gold/20 bg-brand-gold/5 p-5 text-sm text-white/70 italic leading-relaxed"
                >
                <span className="font-black uppercase tracking-widest text-[9px] text-brand-gold block mb-1">Aide stratégique</span>
                {step.hint}
                </motion.div>
            )}

            {/* Wrong feedback */}
            {tried && isWrong && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-start gap-4 rounded-2xl border border-red-500/20 bg-red-500/5 p-5 text-sm text-red-300"
                >
                <AlertCircle className="h-5 w-5 shrink-0" />
                <span className="font-medium italic leading-relaxed">Résultat inexact. Vérifiez vos variables ou utilisez l&apos;indice pédagogique.</span>
                </motion.div>
            )}

            {/* Correct explanation */}
            {isCorrect && (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 text-base leading-relaxed text-emerald-100 font-medium italic"
                >
                <span className="font-black uppercase tracking-widest text-[9px] text-emerald-400 block mb-2 not-italic">Validation acquise</span>
                &laquo; {step.explanation} &raquo;
                </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

function CalcView({ calc }: { calc: GuidedCalculation }) {
  const [statuses, setStatuses] = useState<StepStatus[]>(() =>
    calc.steps.map((_, i) => (i === 0 ? "active" : "locked")),
  );
  const [complete, setComplete] = useState(false);

  const handleValidate = useCallback(
    (stepIndex: number, value: number) => {
      const step = calc.steps[stepIndex];
      const ok = Math.abs(value - step.correctValue) <= step.tolerance;
      setStatuses((prev) => {
        const next = [...prev];
        next[stepIndex] = ok ? "correct" : "wrong";
        if (ok && stepIndex + 1 < next.length) {
          next[stepIndex + 1] = "active";
        }
        if (ok && stepIndex === next.length - 1) {
          setComplete(true);
        }
        return next;
      });
    },
    [calc.steps],
  );

  const reset = useCallback(() => {
    setStatuses(calc.steps.map((_, i) => (i === 0 ? "active" : "locked")));
    setComplete(false);
  }, [calc.steps]);

  const doneCount = statuses.filter((s) => s === "correct").length;
  const pct = Math.round((doneCount / calc.steps.length) * 100);

  return (
    <div className="space-y-10">
      {/* Scenario */}
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#030712] p-8 md:p-10 shadow-inner">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/[0.05] to-transparent pointer-events-none" />
        <div className="relative z-10">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold mb-6 flex items-center gap-2">
                <Calculator size={14} /> SITUATION D&apos;EXCELLENCE
            </p>
            <p className="text-lg leading-relaxed text-white/70 italic font-medium max-w-3xl">
                &laquo; {calc.scenario} &raquo;
            </p>
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {calc.propertyContext.map((ctx) => (
                <div key={ctx.label} className="rounded-2xl border border-white/5 bg-white/[0.02] p-5 text-center shadow-2xl transition-all hover:bg-white/5 group">
                    <div className="flex justify-center mb-3"><EmojiIcon emoji={ctx.icon} className="h-8 w-8 group-hover:scale-110 transition-transform" /></div>
                    <p className="text-[9px] font-black text-white/30 uppercase tracking-widest">{ctx.label}</p>
                    <p className="mt-1 text-base font-black text-white uppercase tracking-tight">{ctx.value}</p>
                </div>
            ))}
            </div>
        </div>
      </section>

      {/* Progress */}
      <div className="px-2">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">ÉTAPES :</span>
              <span className="text-sm font-black text-white tabular-nums">{doneCount} / {calc.steps.length}</span>
          </div>
          <span className="text-sm font-black text-brand-gold tabular-nums">{pct}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/5 ring-1 ring-white/5 shadow-inner">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            className="h-full rounded-full bg-gradient-to-r from-brand-gold via-white to-brand-gold shadow-[0_0_15px_rgba(212,175,55,0.4)] transition-all duration-700"
          />
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-6">
        {calc.steps.map((step, i) => (
          <StepCard
            key={step.id}
            step={step}
            status={statuses[i]}
            onValidate={(val) => handleValidate(i, val)}
          />
        ))}
      </div>

      {/* Final summary */}
      <AnimatePresence>
        {complete && (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-[2.5rem] border-2 border-brand-gold/40 bg-gradient-to-br from-brand-gold/10 to-[#030712] p-10 shadow-2xl"
            >
            <div className="relative z-10 text-center">
                <div className="flex justify-center mb-8">
                    <div className="h-16 w-16 rounded-full bg-brand-gold/20 flex items-center justify-center border border-brand-gold/30 shadow-xl">
                        <Trophy width={32} height={32} className="text-brand-gold animate-bounce" />
                    </div>
                </div>
                <h3 className="text-2xl font-black uppercase tracking-tight text-white mb-6">Bilan de l&apos;Analyse</h3>
                <p className="text-lg leading-relaxed text-white/70 italic max-w-2xl mx-auto mb-10">
                    &laquo; {calc.finalSummary} &raquo;
                </p>
                <button
                    onClick={reset}
                    className="group inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-10 py-5 text-xs font-black uppercase tracking-widest text-white transition hover:bg-white hover:text-brand-navy shadow-xl active:scale-95"
                >
                    <RotateCcw className="w-4 h-4 transition-transform group-hover:rotate-180 duration-500" />
                    Recommencer l&apos;exercice
                </button>
            </div>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function GuidedCalculationBlock({
  calculations,
}: {
  calculations: GuidedCalculation[];
}) {
  const [active, setActive] = useState(0);
  if (calculations.length === 0) return null;

  return (
    <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#070d18] shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-brand-gold/20">
      {/* Header */}
      <div className="relative border-b border-white/10 bg-[#030712] px-8 py-8 md:px-12 md:py-10">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/[0.03] to-transparent pointer-events-none" />
        <div className="relative">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold">
            SIMULATION FINANCIÈRE
            </p>
            <h2 className="mt-2 text-3xl font-black text-white uppercase tracking-tight leading-none">
            {calculations[active].title}
            </h2>
        </div>
      </div>

      {/* Tabs */}
      {calculations.length > 1 && (
        <div className="flex gap-2 overflow-x-auto border-b border-white/5 bg-black/20 px-6 py-4 scrollbar-hide">
          {calculations.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActive(i)}
              className={`flex shrink-0 items-center gap-2.5 rounded-xl px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${
                i === active
                  ? "bg-brand-gold text-brand-navy shadow-lg shadow-brand-gold/20"
                  : "bg-white/5 text-white/40 hover:bg-white/10 hover:text-white border border-white/5"
              }`}
            >
              <Calculator size={14} />
              <span>{c.title}</span>
            </button>
          ))}
        </div>
      )}

      <div className="p-8 md:p-12 lg:p-16">
        <CalcView calc={calculations[active]} />
      </div>
    </div>
  );
}

interface TrophyProps extends React.SVGProps<SVGSVGElement> {
  size?: number;
}
function Trophy({ size, ...props }: TrophyProps) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width={size ?? 24}
        height={size ?? 24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
        <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
        <path d="M4 22h16" />
        <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
        <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
        <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      </svg>
    )
  }
