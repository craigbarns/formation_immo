"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Wallet, Home, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";
import { recordSimulatorUsed } from "@/lib/gamification";

export function CapaciteEmpruntSimulator() {
  const [revenus, setRevenus] = useState(4500);
  const [charges, setCharges] = useState(800);
  const [endettementCible, setEndettementCible] = useState(35);
  const [duree, setDuree] = useState(20);
  const [taux, setTaux] = useState(3.5);
  const [apport, setApport] = useState(30000);
  const [tracked, setTracked] = useState(false);

  useEffect(() => {
    if (!tracked) {
      recordSimulatorUsed("capacite-emprunt");
      setTracked(true);
    }
  }, [tracked]);

  const result = useMemo(() => {
    const mensualiteMax = (revenus * endettementCible) / 100;
    const capaciteEmprunt =
      taux > 0
        ? (mensualiteMax * 12 * (1 - Math.pow(1 + taux / 100 / 12, -duree * 12))) / (taux / 100 / 12)
        : mensualiteMax * 12 * duree;
    const prixMaxBien = capaciteEmprunt + apport;
    const resteAVivre = revenus - mensualiteMax;
    const isComfortable = resteAVivre >= 1500 && endettementCible <= 35;

    return { mensualiteMax, capaciteEmprunt, prixMaxBien, resteAVivre, isComfortable };
  }, [revenus, charges, endettementCible, duree, taux, apport]);

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-5 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <h4 className="flex items-center gap-2 text-sm font-bold text-[#1a3a5c]">
            <Wallet size={16} className="text-[#d4af37]" /> Situation financière
          </h4>

          <div className="space-y-4">
            <InputRow label="Revenus mensuels nets" value={revenus} min={1000} max={20000} step={100} onChange={setRevenus} format={formatCurrency} />
            <InputRow label="Charges existantes" value={charges} min={0} max={3000} step={50} onChange={setCharges} format={formatCurrency} />
            <InputRow label="Endettement cible" value={endettementCible} min={10} max={45} step={1} onChange={setEndettementCible} format={(v) => `${v} %`} />
            <InputRow label="Durée du prêt" value={duree} min={5} max={30} step={1} onChange={setDuree} format={(v) => `${v} ans`} />
            <InputRow label="Taux d'intérêt" value={taux} min={0.5} max={8} step={0.1} onChange={setTaux} format={(v) => `${v} %`} />
            <InputRow label="Apport personnel" value={apport} min={0} max={300000} step={5000} onChange={setApport} format={formatCurrency} />
          </div>
        </div>

        {/* Results */}
        <motion.div
          key={result.capaciteEmprunt}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
        >
          <div className="mb-4 flex justify-center">
            <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 ${result.isComfortable ? "bg-emerald-500/15 text-emerald-600" : "bg-amber-500/15 text-amber-600"}`}>
              {result.isComfortable ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
              <span className="font-semibold">{result.isComfortable ? "Capacité confortable" : "Reste à vivre serré"}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <ResultBox icon={<TrendingUp size={16} />} label="Mensualité max" value={formatCurrency(result.mensualiteMax)} tone="gold" />
            <ResultBox icon={<Wallet size={16} />} label="Capacité d'emprunt" value={formatCurrency(result.capaciteEmprunt)} tone="navy" />
            <ResultBox icon={<Home size={16} />} label="Prix max du bien" value={formatCurrency(result.prixMaxBien)} tone="emerald" />
            <ResultBox icon={<Wallet size={16} />} label="Reste à vivre" value={formatCurrency(result.resteAVivre)} tone={result.resteAVivre >= 1500 ? "emerald" : "amber"} />
          </div>

          <div className="mt-5 rounded-xl bg-zinc-50 p-4 text-xs text-zinc-600">
            <p className="font-semibold text-zinc-800">Comment ça marche ?</p>
            <ul className="mt-2 list-disc space-y-1 pl-4">
              <li>La mensualité maximale = revenus × taux d'endettement cible.</li>
              <li>La capacité d'emprunt est calculée avec la formule de l'annuité.</li>
              <li>Le prix max du bien = capacité d'emprunt + apport personnel.</li>
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function InputRow({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
}) {
  return (
    <div>
      <div className="flex justify-between text-sm font-medium text-zinc-700">
        <label>{label}</label>
        <span className="font-bold text-[#d4af37]">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-[#1a3a5c]"
      />
    </div>
  );
}

function ResultBox({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  tone: "gold" | "navy" | "emerald" | "amber";
}) {
  const toneClasses = {
    gold: "text-[#d4af37]",
    navy: "text-[#1a3a5c]",
    emerald: "text-emerald-600",
    amber: "text-amber-600",
  };
  return (
    <div className="rounded-xl border border-zinc-100 bg-zinc-50 p-3 text-center">
      <div className="mb-1 flex items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wide text-zinc-400">
        {icon} {label}
      </div>
      <p className={`text-lg font-bold ${toneClasses[tone]}`}>{value}</p>
    </div>
  );
}
