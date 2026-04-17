"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, AlertCircle, CheckCircle2, Info, RefreshCcw } from "lucide-react";
import { Slider } from "@/components/ui/Slider";
import { recordSimulatorUsed } from "@/lib/gamification";

interface SimulationResult {
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
  debtRatio: number;
  taeg: number;
  isEligible: boolean;
  warnings: string[];
}

const presets = [
  { label: "1er achat", montant: 250000, apport: 25000, duree: 20, taux: 3.5, revenus: 4000, charges: 0, assurance: 0.36 },
  { label: "Investisseur", montant: 180000, apport: 18000, duree: 15, taux: 3.8, revenus: 5000, charges: 800, assurance: 0.34 },
  { label: "Renégociation", montant: 300000, apport: 0, duree: 12, taux: 2.9, revenus: 4500, charges: 400, assurance: 0.25 },
];

export function AdvancedCreditSimulator() {
  const [montant, setMontant] = useState(250000);
  const [apport, setApport] = useState(25000);
  const [duree, setDuree] = useState(20);
  const [taux, setTaux] = useState(3.5);
  const [revenus, setRevenus] = useState(4000);
  const [charges, setCharges] = useState(0);
  const [insuranceRate, setInsuranceRate] = useState(0.36);
  const [tracked] = useState(() => {
    if (typeof window !== 'undefined') recordSimulatorUsed("credit");
    return true;
  });


  const result = useMemo<SimulationResult>(() => {
    const principal = montant - apport;
    const monthlyRate = taux / 100 / 12;
    const numPayments = duree * 12;
    
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) 
      / (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    const monthlyInsurance = (principal * (insuranceRate / 100)) / 12;
    const totalMonthly = monthlyPayment + monthlyInsurance;
    
    const totalCost = totalMonthly * numPayments;
    const totalInterest = totalCost - principal;
    
    const debtRatio = (totalMonthly / (revenus + charges)) * 100;
    const taeg = taux + insuranceRate;
    
    const warnings: string[] = [];
    if (debtRatio > 35) warnings.push("Taux d'endettement supérieur à 35%");
    if (apport / montant < 0.1) warnings.push("Apport inférieur à 10%");
    if (duree > 25) warnings.push("Durée supérieure à 25 ans");
    
    return {
      monthlyPayment: totalMonthly,
      totalInterest,
      totalCost,
      debtRatio,
      taeg,
      isEligible: debtRatio <= 35 && apport / montant >= 0.1,
      warnings,
    };
  }, [montant, apport, duree, taux, revenus, charges, insuranceRate]);

  // Amortissement simplifié (début, milieu, fin)
  const amortissement = useMemo(() => {
    const principal = montant - apport;
    const monthlyRate = taux / 100 / 12;
    const numPayments = duree * 12;
    const mensualiteHorsAssurance =
      monthlyRate > 0
        ? principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1)
        : principal / numPayments;

    const getYearData = (yearNum: number) => {
      let balance = principal;
      let interestYear = 0;
      let capitalYear = 0;
      for (let m = 1; m <= yearNum * 12; m++) {
        const interestMonth = balance * monthlyRate;
        const capitalMonth = mensualiteHorsAssurance - interestMonth;
        if (m > (yearNum - 1) * 12) {
          interestYear += interestMonth;
          capitalYear += capitalMonth;
        }
        balance = Math.max(0, balance - capitalMonth);
      }
      return { year: yearNum, interest: interestYear, capital: capitalYear, balance };
    };

    const years: { year: number; interest: number; capital: number; balance: number }[] = [];
    years.push(getYearData(1));
    if (duree > 2) years.push(getYearData(Math.ceil(duree / 2)));
    years.push(getYearData(duree));
    return years;
  }, [montant, apport, duree, taux]);

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(amount);

  const applyPreset = (p: typeof presets[0]) => {
    setMontant(p.montant);
    setApport(p.apport);
    setDuree(p.duree);
    setTaux(p.taux);
    setRevenus(p.revenus);
    setCharges(p.charges);
    setInsuranceRate(p.assurance);
  };

  return (
    <div className="space-y-6">
      {/* Presets */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold uppercase text-zinc-400">Scénarios :</span>
        {presets.map((p) => (
          <button
            key={p.label}
            onClick={() => applyPreset(p)}
            className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition hover:border-brand-navy/40 hover:bg-brand-navy/5"
          >
            {p.label}
          </button>
        ))}
        <button
          onClick={() => applyPreset(presets[0])}
          className="ml-auto inline-flex items-center gap-1 rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-500 transition hover:bg-zinc-50"
        >
          <RefreshCcw size={12} /> Réinitialiser
        </button>
      </div>

      {/* Input Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h4 className="font-semibold text-zinc-800 flex items-center gap-2">
            <Calculator className="h-4 w-4 text-brand-gold" />
            Projet immobilier
          </h4>
          
          <Slider label="Prix du bien" value={montant} onChange={setMontant} min={50000} max={1000000} step={10000} format={(v) => formatCurrency(v)} />
          <Slider label="Apport personnel" value={apport} onChange={setApport} min={0} max={montant * 0.5} step={5000} format={(v) => formatCurrency(v)} />
          <Slider label="Durée du prêt" value={duree} onChange={setDuree} min={5} max={30} step={1} format={(v) => `${v} ans`} />
          <Slider label="Taux d'intérêt" value={taux} onChange={setTaux} min={0.5} max={8} step={0.1} format={(v) => `${v}%`} />
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold text-zinc-800 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-brand-gold" />
            Situation financière
          </h4>
          
          <Slider label="Revenus mensuels nets" value={revenus} onChange={setRevenus} min={1000} max={20000} step={100} format={(v) => formatCurrency(v)} />
          <Slider label="Charges existantes" value={charges} onChange={setCharges} min={0} max={3000} step={50} format={(v) => formatCurrency(v)} />
          <Slider label="Taux assurance" value={insuranceRate} onChange={setInsuranceRate} min={0.1} max={1} step={0.01} format={(v) => `${v}%`} />
        </div>
      </div>

      {/* Results */}
      <motion.div
        key={result.monthlyPayment}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
      >
        <div className="mb-4 flex justify-center">
          <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 ${
            result.isEligible ? "bg-emerald-500/15 text-emerald-600" : "bg-red-500/15 text-red-500"
          }`}>
            {result.isEligible ? (
              <><CheckCircle2 className="h-5 w-5" /><span className="font-semibold">Projet réalisable</span></>
            ) : (
              <><AlertCircle className="h-5 w-5" /><span className="font-semibold">Projet à risque</span></>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 rounded-xl bg-zinc-50 border border-zinc-100">
            <p className="text-2xl font-bold text-brand-gold">{formatCurrency(result.monthlyPayment)}</p>
            <p className="text-xs text-zinc-500">Mensualité totale</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-zinc-50 border border-zinc-100">
            <p className={`text-2xl font-bold ${result.debtRatio > 35 ? "text-red-500" : "text-emerald-600"}`}>
              {result.debtRatio.toFixed(1)}%
            </p>
            <p className="text-xs text-zinc-500">Taux d'endettement</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-zinc-50 border border-zinc-100">
            <p className="text-2xl font-bold text-zinc-900">{formatCurrency(result.totalInterest)}</p>
            <p className="text-xs text-zinc-500">Coût du crédit</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-zinc-50 border border-zinc-100">
            <p className="text-2xl font-bold text-zinc-900">{result.taeg.toFixed(2)}%</p>
            <p className="text-xs text-zinc-500">TAEG</p>
          </div>
        </div>

        {/* Amortissement */}
        <div className="mb-4 rounded-xl border border-zinc-100 bg-zinc-50 p-4">
          <h5 className="mb-3 text-sm font-semibold text-zinc-800">Tableau d'amortissement simplifié</h5>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[360px] border-collapse text-sm">
              <thead className="bg-zinc-100">
                <tr>
                  <th className="border border-zinc-200 p-2 text-left font-semibold text-zinc-700">Année</th>
                  <th className="border border-zinc-200 p-2 text-right font-semibold text-zinc-700">Intérêts</th>
                  <th className="border border-zinc-200 p-2 text-right font-semibold text-zinc-700">Capital</th>
                  <th className="border border-zinc-200 p-2 text-right font-semibold text-zinc-700">Restant dû</th>
                </tr>
              </thead>
              <tbody>
                {amortissement.map((row) => (
                  <tr key={row.year} className="hover:bg-white">
                    <td className="border border-zinc-200 p-2">{row.year}</td>
                    <td className="border border-zinc-200 p-2 text-right text-red-500">{formatCurrency(row.interest)}</td>
                    <td className="border border-zinc-200 p-2 text-right text-emerald-600">{formatCurrency(row.capital)}</td>
                    <td className="border border-zinc-200 p-2 text-right font-medium">{formatCurrency(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {result.warnings.length > 0 && (
          <div className="space-y-2">
            {result.warnings.map((warning, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-amber-600">
                <Info className="h-4 w-4 shrink-0" />
                {warning}
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 pt-4 border-t border-zinc-200 text-xs text-zinc-400">
          <p>Simulation indicative. Les taux réels peuvent varier selon votre profil et la banque.</p>
        </div>
      </motion.div>
    </div>
  );
}
