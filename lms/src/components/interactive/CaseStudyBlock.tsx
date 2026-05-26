"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { CaseStudy, CaseStudyField } from "@/data/case-studies";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, CheckCircle2, AlertCircle, Sparkles, Lightbulb } from "lucide-react";

type FieldStatus = "idle" | "correct" | "wrong";

function parseNumber(raw: string): number | null {
  const n = parseFloat(raw.replace(/\s/g, "").replace(",", "."));
  return Number.isFinite(n) ? n : null;
}

function FieldRow({
  field,
  value,
  onChange,
  status,
}: {
  field: CaseStudyField;
  value: string;
  onChange: (v: string) => void;
  status: FieldStatus;
}) {
  const border =
    status === "correct"
      ? "border-emerald-500/50 bg-emerald-500/5"
      : status === "wrong"
        ? "border-red-500/50 bg-red-500/5"
        : "border-white/10 bg-white/5";

  return (
    <div className={`rounded-2xl border-2 p-5 transition-all duration-300 shadow-2xl ${border}`}>
      <label className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
        <span className="text-sm font-black uppercase tracking-tight text-white/90">{field.label}</span>
        <span className="text-[10px] font-black uppercase tracking-widest text-white/75">{field.unit}</span>
      </label>
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`min-w-[120px] flex-1 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-base font-black text-white tabular-nums outline-none focus:border-brand-gold/50 focus:ring-4 focus:ring-brand-gold/10 transition-all placeholder:text-white/70`}
          placeholder="Calculer..."
          autoComplete="off"
        />
        <AnimatePresence mode="wait">
            {status === "correct" && (
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-400">
                <CheckCircle2 size={16} /> VALIDÉ
            </motion.span>
            )}
            {status === "wrong" && (
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-red-400">
                <AlertCircle size={16} /> À REVOIR
            </motion.span>
            )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {status === "wrong" && field.hint && (
            <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4 flex gap-3 rounded-xl bg-amber-500/5 border border-amber-500/20 p-3 text-xs text-amber-200/60 italic font-medium"
            >
                <Lightbulb size={14} className="shrink-0 text-amber-400" />
                <span>Indice : {field.hint}</span>
            </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function CaseStudyBlock({ studies }: { studies: CaseStudy[] }) {
  const [active, setActive] = useState(0);
  const study = studies[active];
  const [values, setValues] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<Record<string, FieldStatus>>({});

  const resetKey = study?.id ?? "";
  useEffect(() => {
    const timer = setTimeout(() => {
      setValues({});
      setStatus({});
    }, 0);
    return () => clearTimeout(timer);
  }, [resetKey]);

  const checkField = useCallback((field: CaseStudyField, raw: string): FieldStatus => {
    const n = parseNumber(raw);
    if (n === null) return "idle";
    if (Math.abs(n - field.correctValue) <= field.tolerance) return "correct";
    return "wrong";
  }, []);

  const handleChange = useCallback(
    (field: CaseStudyField, raw: string) => {
      setValues((prev) => ({ ...prev, [field.id]: raw }));
      if (raw.trim() === "") {
        setStatus((prev) => ({ ...prev, [field.id]: "idle" }));
        return;
      }
      const s = checkField(field, raw);
      setStatus((prev) => ({ ...prev, [field.id]: s }));
    },
    [checkField],
  );

  const allCorrect = useMemo(() => {
    if (!study) return false;
    return study.questions.every((q) => status[q.id] === "correct");
  }, [study, status]);

  if (studies.length === 0 || !study) return null;

  return (
    <div className="overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#070d18] shadow-2xl backdrop-blur-xl transition-all duration-500 hover:border-brand-gold/20">
      <div className="relative border-b border-white/10 bg-[#030712] px-8 py-8 sm:px-12 md:py-10">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/[0.03] to-transparent pointer-events-none" />
        <div className="relative">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold mb-4">
            ANALYSE DE CAS COMPLEXE
            </p>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight leading-none">{study.title}</h2>
            <p className="mt-4 max-w-2xl text-lg text-white/50 leading-relaxed italic">&laquo; {study.description} &raquo;</p>
        </div>
      </div>

      {studies.length > 1 && (
        <div className="flex gap-2 overflow-x-auto border-b border-white/5 bg-black/20 px-6 py-4 scrollbar-hide">
          {studies.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(i)}
              className={`flex shrink-0 items-center gap-2.5 rounded-xl px-6 py-3 text-[10px] font-black uppercase tracking-widest transition-all ${
                i === active
                  ? "bg-brand-gold text-brand-navy shadow-lg shadow-brand-gold/20"
                  : "bg-white/5 text-white/75 hover:bg-white/10 hover:text-white border border-white/5"
              }`}
            >
              CAS {i + 1}
            </button>
          ))}
        </div>
      )}

      <div className="p-8 sm:p-10 lg:p-12 space-y-10">
        {/* Context Details */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {study.propertyDetails.map((d) => (
            <div
              key={d.label}
              className="rounded-2xl border border-white/5 bg-[#030712] p-5 shadow-inner transition-all hover:bg-white/5 group"
            >
              <p className="text-[9px] font-black uppercase tracking-widest text-white/75 mb-1 group-hover:text-brand-gold/60 transition-colors">
                {d.label}
              </p>
              <p className="text-base font-black text-white uppercase tracking-tight">{d.value}</p>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4 mb-2">
            <Calculator className="w-5 h-5 text-brand-gold" />
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/75">Équations de terrain</h3>
          </div>
          <div className="grid gap-6">
            {study.questions.map((q) => (
                <FieldRow
                key={q.id}
                field={q}
                value={values[q.id] ?? ""}
                onChange={(v) => handleChange(q, v)}
                status={status[q.id] ?? "idle"}
                />
            ))}
          </div>
        </div>

        <AnimatePresence>
            {allCorrect && (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="relative overflow-hidden rounded-[2rem] border-2 border-emerald-500/30 bg-emerald-500/5 p-8 shadow-2xl"
            >
                <div className="relative z-10 flex flex-col sm:flex-row items-center gap-8">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/30 shadow-xl">
                        <Sparkles className="h-8 w-8 text-emerald-400 animate-pulse" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-2">EXCELLENCE ATTEINTE</p>
                        <h4 className="text-xl font-black text-white uppercase tracking-tight mb-3">Scénario validé avec succès</h4>
                        <p className="text-base leading-relaxed text-emerald-100 font-medium italic">
                            &laquo; {study.explanation} &raquo;
                        </p>
                    </div>
                </div>
            </motion.div>
            )}
        </AnimatePresence>
      </div>
    </div>
  );
}
