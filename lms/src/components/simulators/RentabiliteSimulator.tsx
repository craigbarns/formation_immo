"use client";

import { useState, useEffect } from "react";
import { recordSimulatorUsed } from "@/lib/gamification";

export function RentabiliteSimulator() {
  const [price, setPrice] = useState(180000);
  const [notaryFees, setNotaryFees] = useState(8);
  const [monthlyRent, setMonthlyRent] = useState(750);
  const [charges, setCharges] = useState(1200);
  const [taxeFonciere, setTaxeFonciere] = useState(900);
  const [vacance, setVacance] = useState(5);
  const [travaux, setTravaux] = useState(5000);
  const [gestion, setGestion] = useState(7);
  const [tracked, setTracked] = useState(false);

  useEffect(() => {
    if (!tracked) {
      recordSimulatorUsed("rentabilite");
      setTracked(true);
    }
  }, [tracked]);

  const totalAcquisition = price + price * (notaryFees / 100) + travaux;
  const loyerAnnuelBrut = monthlyRent * 12;
  const loyerEffectif = loyerAnnuelBrut * (1 - vacance / 100);
  const fraisGestion = loyerEffectif * (gestion / 100);
  const revenuNet = loyerEffectif - charges - taxeFonciere - fraisGestion;

  const rentaBrute = (loyerAnnuelBrut / price) * 100;
  const rentaNette = (revenuNet / totalAcquisition) * 100;

  const cashFlowMensuel = revenuNet / 12;

  // Estimation temps de retour
  const anneesRetour = revenuNet > 0 ? totalAcquisition / revenuNet : Infinity;

  return (
    <div className="rounded-2xl border-2 border-[#1a3a5c]/15 bg-white shadow-lg">
      <div className="border-b border-zinc-100 bg-gradient-to-r from-[#1a3a5c] to-[#2d5a7c] px-6 py-4 text-white rounded-t-2xl">
        <h3 className="text-lg font-bold">Simulateur de Rentabilite Locative</h3>
        <p className="mt-1 text-xs text-white/70">Comparez rentabilite brute et nette en temps reel</p>
      </div>

      <div className="grid gap-6 p-6 md:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">Acquisition</h4>
          <SliderInput
            label="Prix d'achat"
            value={price}
            onChange={setPrice}
            min={30000}
            max={1000000}
            step={5000}
            format={(v) => `${v.toLocaleString("fr-FR")} EUR`}
          />
          <SliderInput
            label="Frais de notaire"
            value={notaryFees}
            onChange={setNotaryFees}
            min={2}
            max={12}
            step={0.5}
            format={(v) => `${v}%`}
          />
          <SliderInput
            label="Travaux initiaux"
            value={travaux}
            onChange={setTravaux}
            min={0}
            max={100000}
            step={1000}
            format={(v) => `${v.toLocaleString("fr-FR")} EUR`}
          />

          <h4 className="mt-2 text-xs font-bold uppercase tracking-wider text-zinc-400">Revenus & charges</h4>
          <SliderInput
            label="Loyer mensuel"
            value={monthlyRent}
            onChange={setMonthlyRent}
            min={200}
            max={5000}
            step={50}
            format={(v) => `${v.toLocaleString("fr-FR")} EUR`}
          />
          <SliderInput
            label="Charges annuelles"
            value={charges}
            onChange={setCharges}
            min={0}
            max={10000}
            step={100}
            format={(v) => `${v.toLocaleString("fr-FR")} EUR`}
          />
          <SliderInput
            label="Taxe fonciere"
            value={taxeFonciere}
            onChange={setTaxeFonciere}
            min={0}
            max={5000}
            step={50}
            format={(v) => `${v.toLocaleString("fr-FR")} EUR`}
          />
          <SliderInput
            label="Vacance locative"
            value={vacance}
            onChange={setVacance}
            min={0}
            max={20}
            step={1}
            format={(v) => `${v}%`}
          />
          <SliderInput
            label="Frais de gestion"
            value={gestion}
            onChange={setGestion}
            min={0}
            max={15}
            step={0.5}
            format={(v) => `${v}%`}
          />
        </div>

        {/* Results */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-[#1a3a5c]/15 bg-[#1a3a5c]/5 p-4 text-center">
              <p className="text-xs text-zinc-500">Rentabilite brute</p>
              <p className="text-3xl font-bold text-[#1a3a5c]">{rentaBrute.toFixed(2)}%</p>
            </div>
            <div className={`rounded-xl border p-4 text-center ${
              rentaNette >= 5
                ? "border-emerald-300 bg-emerald-50"
                : rentaNette >= 3
                  ? "border-amber-300 bg-amber-50"
                  : "border-red-300 bg-red-50"
            }`}>
              <p className="text-xs text-zinc-500">Rentabilite nette</p>
              <p className={`text-3xl font-bold ${
                rentaNette >= 5
                  ? "text-emerald-600"
                  : rentaNette >= 3
                    ? "text-amber-600"
                    : "text-red-600"
              }`}>
                {rentaNette.toFixed(2)}%
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-[#d4af37]/30 bg-[#d4af37]/10 p-4 text-center">
            <p className="text-xs text-zinc-500">Cash-flow mensuel net</p>
            <p className={`text-2xl font-bold ${cashFlowMensuel >= 0 ? "text-emerald-600" : "text-red-600"}`}>
              {cashFlowMensuel >= 0 ? "+" : ""}{Math.round(cashFlowMensuel).toLocaleString("fr-FR")} EUR
            </p>
          </div>

          <div className="space-y-2 rounded-xl border border-zinc-200 bg-zinc-50 p-4">
            <DetailRow label="Cout total acquisition" value={`${Math.round(totalAcquisition).toLocaleString("fr-FR")} EUR`} />
            <DetailRow label="Loyer annuel brut" value={`${loyerAnnuelBrut.toLocaleString("fr-FR")} EUR`} />
            <DetailRow label="Loyer effectif (- vacance)" value={`${Math.round(loyerEffectif).toLocaleString("fr-FR")} EUR`} />
            <DetailRow label="Charges + taxe fonciere" value={`-${(charges + taxeFonciere).toLocaleString("fr-FR")} EUR`} />
            <DetailRow label="Frais de gestion" value={`-${Math.round(fraisGestion).toLocaleString("fr-FR")} EUR`} />
            <hr className="border-zinc-200" />
            <DetailRow label="Revenu net annuel" value={`${Math.round(revenuNet).toLocaleString("fr-FR")} EUR`} bold />
            <DetailRow
              label="Retour sur investissement"
              value={anneesRetour === Infinity ? "N/A" : `~${Math.round(anneesRetour)} ans`}
            />
          </div>

          {/* Jauge visuelle */}
          <div className="rounded-xl border border-zinc-200 bg-white p-4">
            <p className="text-xs font-medium text-zinc-500 mb-2">Evaluation du rendement</p>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => {
                const filled = rentaNette >= i * 0.8;
                return (
                  <div
                    key={i}
                    className={`h-6 flex-1 rounded ${
                      filled
                        ? i <= 3
                          ? "bg-red-400"
                          : i <= 6
                            ? "bg-amber-400"
                            : "bg-emerald-400"
                        : "bg-zinc-100"
                    }`}
                  />
                );
              })}
            </div>
            <div className="mt-1 flex justify-between text-[10px] text-zinc-400">
              <span>Faible</span>
              <span>Moyen</span>
              <span>Excellent</span>
            </div>
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
        <label className="text-xs font-medium text-zinc-600">{label}</label>
        <span className="text-xs font-bold text-[#1a3a5c]">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 w-full accent-[#1a3a5c]"
      />
    </div>
  );
}

function DetailRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-zinc-500">{label}</span>
      <span className={bold ? "font-bold text-[#1a3a5c]" : "text-zinc-700"}>{value}</span>
    </div>
  );
}
