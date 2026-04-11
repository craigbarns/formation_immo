"use client";

import { useState, useEffect } from "react";
import { recordSimulatorUsed } from "@/lib/gamification";

export function CreditSimulator() {
  const [price, setPrice] = useState(250000);
  const [apport, setApport] = useState(50000);
  const [rate, setRate] = useState(3.5);
  const [duration, setDuration] = useState(20);
  const [insurance, setInsurance] = useState(0.34);
  const [tracked, setTracked] = useState(false);

  useEffect(() => {
    if (!tracked) {
      recordSimulatorUsed("credit");
      setTracked(true);
    }
  }, [tracked]);

  const loanAmount = price - apport;
  const monthlyRate = rate / 100 / 12;
  const totalMonths = duration * 12;

  // Mensualite hors assurance
  const monthlyPayment =
    monthlyRate > 0
      ? (loanAmount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -totalMonths))
      : loanAmount / totalMonths;

  // Assurance mensuelle
  const monthlyInsurance = (loanAmount * (insurance / 100)) / 12;
  const totalMonthly = monthlyPayment + monthlyInsurance;
  const totalCost = totalMonthly * totalMonths;
  const totalInterest = totalCost - loanAmount;
  const tauxEndettement = totalMonthly > 0 ? (totalMonthly / 4000) * 100 : 0; // salaire fictif 4000

  return (
    <div className="rounded-2xl border-2 border-[#1a3a5c]/15 bg-white shadow-lg">
      <div className="border-b border-zinc-100 bg-gradient-to-r from-[#1a3a5c] to-[#2d5a7c] px-6 py-4 text-white rounded-t-2xl">
        <h3 className="text-lg font-bold">Simulateur de Credit Immobilier</h3>
        <p className="mt-1 text-xs text-white/70">Ajustez les parametres pour calculer vos mensualites</p>
      </div>

      <div className="grid gap-6 p-6 md:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-5">
          <SliderInput
            label="Prix du bien"
            value={price}
            onChange={setPrice}
            min={50000}
            max={1000000}
            step={5000}
            format={(v) => `${v.toLocaleString("fr-FR")} EUR`}
          />
          <SliderInput
            label="Apport personnel"
            value={apport}
            onChange={setApport}
            min={0}
            max={price}
            step={5000}
            format={(v) => `${v.toLocaleString("fr-FR")} EUR`}
          />
          <SliderInput
            label="Taux d'interet"
            value={rate}
            onChange={setRate}
            min={0.5}
            max={7}
            step={0.1}
            format={(v) => `${v.toFixed(1)}%`}
          />
          <SliderInput
            label="Duree (annees)"
            value={duration}
            onChange={setDuration}
            min={5}
            max={30}
            step={1}
            format={(v) => `${v} ans`}
          />
          <SliderInput
            label="Assurance (% du capital)"
            value={insurance}
            onChange={setInsurance}
            min={0}
            max={1}
            step={0.01}
            format={(v) => `${v.toFixed(2)}%`}
          />
        </div>

        {/* Results */}
        <div className="space-y-4">
          <ResultCard
            label="Montant emprunte"
            value={`${loanAmount.toLocaleString("fr-FR")} EUR`}
            color="blue"
          />
          <ResultCard
            label="Mensualite totale"
            value={`${Math.round(totalMonthly).toLocaleString("fr-FR")} EUR/mois`}
            color="gold"
            large
          />
          <ResultCard
            label="Dont assurance"
            value={`${Math.round(monthlyInsurance).toLocaleString("fr-FR")} EUR/mois`}
            color="gray"
          />
          <ResultCard
            label="Cout total du credit"
            value={`${Math.round(totalCost).toLocaleString("fr-FR")} EUR`}
            color="blue"
          />
          <ResultCard
            label="Total des interets"
            value={`${Math.round(totalInterest).toLocaleString("fr-FR")} EUR`}
            color="red"
          />

          <div className={`rounded-xl p-3 text-center ${tauxEndettement > 35 ? "bg-red-50 border border-red-200" : "bg-emerald-50 border border-emerald-200"}`}>
            <p className="text-xs text-zinc-600">Taux d&apos;endettement (salaire 4 000 EUR)</p>
            <p className={`text-xl font-bold ${tauxEndettement > 35 ? "text-red-600" : "text-emerald-600"}`}>
              {tauxEndettement.toFixed(1)}%
            </p>
            <p className={`text-xs font-medium ${tauxEndettement > 35 ? "text-red-500" : "text-emerald-500"}`}>
              {tauxEndettement > 35 ? "Depasse le seuil HCSF de 35%" : "Conforme au seuil HCSF"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SliderInput({
  label,
  value,
  onChange,
  min,
  max,
  step,
  format,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min: number;
  max: number;
  step: number;
  format: (v: number) => string;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label className="text-sm font-medium text-zinc-700">{label}</label>
        <span className="text-sm font-bold text-[#1a3a5c]">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1.5 w-full accent-[#1a3a5c]"
      />
    </div>
  );
}

function ResultCard({
  label,
  value,
  color,
  large,
}: {
  label: string;
  value: string;
  color: "blue" | "gold" | "gray" | "red";
  large?: boolean;
}) {
  const bg = {
    blue: "bg-[#1a3a5c]/5 border-[#1a3a5c]/15",
    gold: "bg-[#d4af37]/10 border-[#d4af37]/30",
    gray: "bg-zinc-50 border-zinc-200",
    red: "bg-red-50 border-red-200",
  }[color];

  return (
    <div className={`rounded-xl border p-3 ${bg}`}>
      <p className="text-xs text-zinc-500">{label}</p>
      <p className={`font-bold text-[#1a3a5c] ${large ? "text-2xl" : "text-lg"}`}>{value}</p>
    </div>
  );
}
