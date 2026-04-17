"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { CaseStudy, CaseStudyField } from "@/data/case-studies";

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
      ? "border-emerald-400/60 ring-emerald-500/20"
      : status === "wrong"
        ? "border-red-400/50 ring-red-500/15"
        : "border-zinc-200";

  return (
    <div className="rounded-xl border bg-white px-4 py-3 shadow-sm">
      <label className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="text-sm font-medium text-zinc-800">{field.label}</span>
        <span className="text-xs text-zinc-400">({field.unit})</span>
      </label>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <input
          type="text"
          inputMode="decimal"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`min-w-[120px] flex-1 rounded-lg border px-3 py-2 text-sm tabular-nums outline-none ring-2 ring-transparent transition focus:border-brand-gold focus:ring-brand-gold/30 ${border}`}
          placeholder="Votre calcul"
          autoComplete="off"
        />
        {status === "correct" && (
          <span className="text-xs font-semibold text-emerald-600">Correct</span>
        )}
        {status === "wrong" && (
          <span className="text-xs font-medium text-red-600">À ajuster</span>
        )}
      </div>
      {status === "wrong" && field.hint && (
        <p className="mt-2 text-xs text-zinc-500">Indice : {field.hint}</p>
      )}
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
    <div className="overflow-hidden rounded-2xl border border-brand-navy/15 bg-white shadow-lg">
      <div className="border-b border-brand-navy/10 bg-gradient-to-r from-brand-navy to-brand-navy-deep px-5 py-5 sm:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-gold">
          Étude de cas chiffrée
        </p>
        <h2 className="mt-1 text-xl font-bold text-white sm:text-2xl">{study.title}</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/75">{study.description}</p>
      </div>

      {studies.length > 1 && (
        <div className="flex gap-1 border-b border-zinc-100 bg-zinc-50 px-5 sm:px-8">
          {studies.map((s, i) => (
            <button
              key={s.id}
              type="button"
              onClick={() => setActive(i)}
              className={`relative px-4 py-3 text-sm font-medium transition ${
                i === active ? "text-brand-navy" : "text-zinc-400 hover:text-zinc-600"
              }`}
            >
              Cas {i + 1}
              {i === active && (
                <span className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-brand-gold" />
              )}
            </button>
          ))}
        </div>
      )}

      <div className="space-y-6 px-5 py-7 sm:px-8 sm:py-9">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {study.propertyDetails.map((d) => (
            <div
              key={d.label}
              className="rounded-lg border border-zinc-100 bg-zinc-50/80 px-3 py-2 text-sm"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wide text-zinc-400">
                {d.label}
              </p>
              <p className="mt-0.5 font-medium text-zinc-800">{d.value}</p>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-brand-navy">Vos calculs</h3>
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

        {allCorrect && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 px-4 py-4 text-sm leading-relaxed text-emerald-950">
            <p className="font-semibold text-emerald-800">Bravo — scénario validé</p>
            <p className="mt-2 text-emerald-900/90">{study.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
}
