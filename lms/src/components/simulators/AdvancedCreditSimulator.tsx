"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Info, RefreshCcw, Landmark, ShieldCheck } from "lucide-react";
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
  
  useEffect(() => {
    recordSimulatorUsed("credit");
  }, []);

  const result = useMemo<SimulationResult>(() => {
    const principal = montant - apport;
    const monthlyRate = taux / 100 / 12;
    const numPayments = duree * 12;
    
    const monthlyPayment = principal > 0 ? (principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) 
      / (Math.pow(1 + monthlyRate, numPayments) - 1)) : 0;
    
    const monthlyInsurance = (principal * (insuranceRate / 100)) / 12;
    const totalMonthly = monthlyPayment + monthlyInsurance;
    
    const totalCost = totalMonthly * numPayments;
    const totalInterest = totalCost - principal;
    
    const debtRatio = (totalMonthly / (revenus + charges)) * 100;
    const taeg = taux + insuranceRate;
    
    const warnings: string[] = [];
    if (debtRatio > 35) warnings.push("Taux d'endettement supérieur à 35% (HCSF)");
    if (apport / montant < 0.1) warnings.push("Apport inférieur à 10% conseillés");
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

  // Amortissement simplifié
  const amortissement = useMemo(() => {
    const principal = montant - apport;
    if (principal <= 0) return [];
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
    <div className="space-y-10">
      {/* Presets */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/30 mr-2">Scénarios types :</span>
        {presets.map((p) => (
          <button
            key={p.label}
            onClick={() => applyPreset(p)}
            className="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-600 dark:text-white/60 transition hover:bg-brand-gold hover:text-brand-navy hover:border-brand-gold"
          >
            {p.label}
          </button>
        ))}
        <button
          onClick={() => applyPreset(presets[0])}
          className="ml-auto inline-flex items-center gap-2 rounded-xl border border-slate-100 dark:border-white/5 bg-white dark:bg-white/5 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-white/20 transition hover:text-slate-900 dark:hover:text-white"
        >
          <RefreshCcw size={12} /> Réinitialiser
        </button>
      </div>

      {/* Input Section */}
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-8 rounded-[2rem] border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] p-8 shadow-inner">
          <h4 className="text-xs font-black uppercase tracking-widest text-brand-gold flex items-center gap-3">
            <Landmark className="h-4 w-4" />
            Paramètres du projet
          </h4>
          
          <Slider label="Prix d'acquisition" value={montant} onChange={setMontant} min={50000} max={1000000} step={10000} format={(v) => formatCurrency(v)} />
          <Slider label="Apport injecté" value={apport} onChange={setApport} min={0} max={montant * 0.5} step={5000} format={(v) => formatCurrency(v)} />
          <Slider label="Durée de l'emprunt" value={duree} onChange={setDuree} min={5} max={30} step={1} format={(v) => `${v} ans`} />
          <Slider label="Taux d'intérêt (nominal)" value={taux} onChange={setTaux} min={0.5} max={8} step={0.1} format={(v) => `${v}%`} />
        </div>
        
        <div className="space-y-8 rounded-[2rem] border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] p-8 shadow-inner">
          <h4 className="text-xs font-black uppercase tracking-widest text-brand-gold flex items-center gap-3">
            <ShieldCheck className="h-4 w-4" />
            Garanties & Revenus
          </h4>
          
          <Slider label="Revenus mensuels nets" value={revenus} onChange={setRevenus} min={1000} max={20000} step={100} format={(v) => formatCurrency(v)} />
          <Slider label="Charges & Crédits" value={charges} onChange={setCharges} min={0} max={3000} step={50} format={(v) => formatCurrency(v)} />
          <Slider label="Assurance emprunteur" value={insuranceRate} onChange={setInsuranceRate} min={0.1} max={1} step={0.01} format={(v) => `${v}%`} />
        </div>
      </div>

      {/* Results */}
      <motion.div
        key={result.monthlyPayment}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#030712] p-8 md:p-12 shadow-[0_30px_80px_rgba(0,0,0,0.4)]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/[0.03] to-transparent pointer-events-none" />
        
        <div className="mb-12 flex justify-center">
          <div className={`inline-flex items-center gap-3 rounded-full border px-6 py-3 text-xs font-black uppercase tracking-widest backdrop-blur-xl shadow-2xl ${
            result.isEligible ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-red-500/10 border-red-500/30 text-red-400"
          }`}>
            {result.isEligible ? (
              <><CheckCircle2 className="h-5 w-5" /> Projet finançable</>
            ) : (
              <><AlertCircle className="h-5 w-5" /> Dossier à risque</>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 rounded-3xl bg-white/5 border border-white/10 shadow-xl group hover:border-brand-gold/30 transition-all">
            <p className="text-sm font-black text-white/40 uppercase tracking-widest mb-2">Mensualité</p>
            <p className="text-3xl font-black text-brand-gold tabular-nums">{formatCurrency(result.monthlyPayment)}</p>
          </div>
          <div className="text-center p-6 rounded-3xl bg-white/5 border border-white/10 shadow-xl group hover:border-brand-gold/30 transition-all">
            <p className="text-sm font-black text-white/40 uppercase tracking-widest mb-2">Endettement</p>
            <p className={`text-3xl font-black tabular-nums ${result.debtRatio > 35 ? "text-red-400" : "text-emerald-400"}`}>
              {result.debtRatio.toFixed(1)}%
            </p>
          </div>
          <div className="text-center p-6 rounded-3xl bg-white/5 border border-white/10 shadow-xl group hover:border-brand-gold/30 transition-all">
            <p className="text-sm font-black text-white/40 uppercase tracking-widest mb-2">Coût total</p>
            <p className="text-3xl font-black text-white tabular-nums">{formatCurrency(result.totalInterest)}</p>
          </div>
          <div className="text-center p-6 rounded-3xl bg-white/5 border border-white/10 shadow-xl group hover:border-brand-gold/30 transition-all">
            <p className="text-sm font-black text-white/40 uppercase tracking-widest mb-2">TAEG cible</p>
            <p className="text-3xl font-black text-white tabular-nums">{result.taeg.toFixed(2)}%</p>
          </div>
        </div>

        {/* Amortissement */}
        <div className="mb-10 overflow-hidden rounded-3xl border border-white/5 bg-black/40 shadow-inner">
          <div className="bg-white/5 px-6 py-4 border-b border-white/5">
              <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Projection d&apos;amortissement stratégique</h5>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-sm text-left">
              <thead>
                <tr className="text-[9px] font-black uppercase tracking-widest text-brand-gold">
                  <th className="p-5 border-b border-white/5">Année</th>
                  <th className="p-5 border-b border-white/5 text-right">Intérêts</th>
                  <th className="p-5 border-b border-white/5 text-right">Capital</th>
                  <th className="p-5 border-b border-white/5 text-right">Solde restant</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {amortissement.map((row) => (
                  <tr key={row.year} className="group hover:bg-white/[0.02] transition-colors">
                    <td className="p-5 font-black text-white/40">{row.year === 1 ? "1ère année" : row.year === duree ? "Dernière" : `Année ${row.year}`}</td>
                    <td className="p-5 text-right text-red-400/60 font-medium tabular-nums">{formatCurrency(row.interest)}</td>
                    <td className="p-5 text-right text-emerald-400/60 font-medium tabular-nums">{formatCurrency(row.capital)}</td>
                    <td className="p-5 text-right font-black text-white tabular-nums">{formatCurrency(row.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {result.warnings.length > 0 && (
          <div className="space-y-3">
            {result.warnings.map((warning, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl bg-amber-500/5 border border-amber-500/20 p-4 text-sm text-amber-200/60 italic font-medium">
                <AlertCircle className="h-4 w-4 shrink-0 text-amber-500" />
                {warning}
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 pt-8 border-t border-white/5 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-white/20 italic">
          <Info size={14} />
          <p>Simulation indicative non contractuelle. Les conditions bancaires définitives dépendent du scoring client et de la Loi Lagarde.</p>
        </div>
      </motion.div>
    </div>
  );
}
