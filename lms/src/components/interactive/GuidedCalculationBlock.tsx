"use client";

import { useCallback, useState } from "react";
import type { GuidedCalculation, CalcStep } from "@/data/guided-calculations";

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
      className={`relative overflow-hidden rounded-2xl border transition-all duration-300 ${
        isLocked
          ? "border-zinc-200 bg-zinc-50 opacity-60"
          : isCorrect
            ? "border-emerald-300 bg-emerald-50 shadow-md"
            : isWrong
              ? "border-red-300 bg-red-50"
              : "border-[#d4af37]/40 bg-white shadow-lg ring-1 ring-[#d4af37]/20"
      }`}
    >
      {/* Step number + title */}
      <div className="flex items-start gap-4 p-5">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-black ${
            isLocked
              ? "bg-zinc-200 text-zinc-400"
              : isCorrect
                ? "bg-emerald-500 text-white"
                : "bg-[#1a3a5c] text-white"
          }`}
        >
          {isLocked ? "🔒" : isCorrect ? "✓" : step.stepNumber}
        </div>
        <div className="flex-1">
          <p className="font-bold text-[#1a3a5c]">{step.title}</p>
          {!isLocked && (
            <p className="mt-1 text-sm leading-relaxed text-zinc-600">{step.instruction}</p>
          )}
        </div>
      </div>

      {!isLocked && (
        <div className="border-t border-zinc-100 px-5 pb-5 pt-4 space-y-4">
          {/* Formula */}
          {step.formula && (
            <div className="rounded-xl bg-[#0f1f33] px-4 py-3 font-mono text-sm text-[#d4af37]">
              {step.formula}
            </div>
          )}

          {/* Input row */}
          {!isCorrect && (
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex flex-1 items-center overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm focus-within:border-[#d4af37] focus-within:ring-2 focus-within:ring-[#d4af37]/20">
                <input
                  type="text"
                  inputMode="decimal"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && validate()}
                  placeholder="Votre réponse..."
                  className="flex-1 bg-transparent px-4 py-2.5 text-sm outline-none"
                />
                <span className="shrink-0 border-l border-zinc-100 bg-zinc-50 px-3 py-2.5 text-xs font-semibold text-zinc-500">
                  {step.inputUnit}
                </span>
              </div>
              <button
                onClick={validate}
                className="rounded-xl bg-[#1a3a5c] px-5 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-[#142d45]"
              >
                Vérifier
              </button>
              {step.hint && (
                <button
                  onClick={() => setShowHint((v) => !v)}
                  className="rounded-xl border border-[#d4af37]/40 px-4 py-2.5 text-sm font-semibold text-[#7a6008] transition hover:bg-[#d4af37]/10"
                >
                  {showHint ? "Masquer l'indice" : "💡 Indice"}
                </button>
              )}
            </div>
          )}

          {/* Hint */}
          {showHint && step.hint && !isCorrect && (
            <div className="rounded-xl border border-[#d4af37]/30 bg-[#d4af37]/5 px-4 py-3 text-sm text-[#7a6008]">
              <span className="font-semibold">Indice : </span>{step.hint}
            </div>
          )}

          {/* Wrong feedback */}
          {tried && isWrong && (
            <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              <span>❌</span>
              <span>Pas tout à fait — réessayez ou utilisez l&apos;indice pour vous guider.</span>
            </div>
          )}

          {/* Correct explanation */}
          {isCorrect && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm leading-relaxed text-emerald-800">
              <span className="font-semibold">✓ Correct ! </span>{step.explanation}
            </div>
          )}
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
    <div className="space-y-6">
      {/* Scenario */}
      <div className="rounded-2xl border border-[#1a3a5c]/15 bg-gradient-to-br from-[#1a3a5c]/[0.04] to-white p-5">
        <p className="text-xs font-bold uppercase tracking-widest text-[#d4af37]">Situation</p>
        <p className="mt-2 text-sm leading-relaxed text-zinc-700">{calc.scenario}</p>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {calc.propertyContext.map((ctx) => (
            <div key={ctx.label} className="rounded-xl border border-zinc-200 bg-white p-3 text-center shadow-sm">
              <div className="text-xl">{ctx.icon}</div>
              <p className="mt-1 text-xs font-bold text-zinc-500">{ctx.label}</p>
              <p className="mt-0.5 text-sm font-bold text-[#1a3a5c]">{ctx.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Progress */}
      <div>
        <div className="mb-1 flex items-center justify-between text-xs font-semibold text-zinc-500">
          <span>{doneCount} / {calc.steps.length} étapes</span>
          <span>{pct}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-zinc-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#1a3a5c] to-[#d4af37] transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-4">
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
      {complete && (
        <div className="rounded-2xl border-2 border-[#d4af37]/40 bg-gradient-to-br from-[#d4af37]/10 to-amber-50 p-6">
          <p className="text-sm font-bold uppercase tracking-widest text-[#d4af37]">
            🎓 Bilan de l&apos;analyse
          </p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-700">{calc.finalSummary}</p>
          <button
            onClick={reset}
            className="mt-4 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-600 transition hover:border-zinc-300 hover:shadow-sm"
          >
            Recommencer l&apos;exercice
          </button>
        </div>
      )}
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
    <div className="overflow-hidden rounded-2xl border border-[#1a3a5c]/15 bg-white shadow-lg">
      {/* Header */}
      <div className="border-b border-zinc-100 bg-gradient-to-r from-[#1a3a5c] to-[#244b75] px-5 py-4 sm:px-7">
        <p className="text-[11px] font-bold uppercase tracking-widest text-[#d4af37]">
          Calcul guidé
        </p>
        <p className="mt-0.5 text-sm font-semibold text-white/90">
          {calculations[active].title}
        </p>
      </div>

      {/* Tabs */}
      {calculations.length > 1 && (
        <div className="flex gap-1 overflow-x-auto border-b border-zinc-100 bg-zinc-50 px-4 py-2">
          {calculations.map((c, i) => (
            <button
              key={c.id}
              onClick={() => setActive(i)}
              className={`shrink-0 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                i === active ? "bg-[#1a3a5c] text-white" : "text-zinc-600 hover:bg-zinc-200"
              }`}
            >
              {c.title}
            </button>
          ))}
        </div>
      )}

      <div className="p-5 sm:p-7">
        <CalcView calc={calculations[active]} />
      </div>
    </div>
  );
}
