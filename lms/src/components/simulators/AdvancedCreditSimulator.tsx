"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, TrendingUp, AlertCircle, CheckCircle2, Info } from "lucide-react";
import { Slider } from "@/components/ui/Slider";

interface SimulationResult {
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
  debtRatio: number;
  taeg: number;
  isEligible: boolean;
  warnings: string[];
}

export function AdvancedCreditSimulator() {
  const [montant, setMontant] = useState(200000);
  const [apport, setApport] = useState(20000);
  const [duree, setDuree] = useState(20);
  const [taux, setTaux] = useState(3.5);
  const [revenus, setRevenus] = useState(3000);
  const [charges, setCharges] = useState(500);
  const [insuranceRate, setInsuranceRate] = useState(0.36);
  
  const result = useMemo<SimulationResult>(() => {
    const principal = montant - apport;
    const monthlyRate = taux / 100 / 12;
    const numPayments = duree * 12;
    
    // Monthly payment calculation (annuity formula)
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) 
      / (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    // Insurance
    const monthlyInsurance = (principal * (insuranceRate / 100)) / 12;
    const totalMonthly = monthlyPayment + monthlyInsurance;
    
    const totalCost = totalMonthly * numPayments;
    const totalInterest = totalCost - principal;
    
    // Debt ratio
    const debtRatio = (totalMonthly / (revenus + charges)) * 100;
    
    // TAEG approximation
    const taeg = taux + insuranceRate;
    
    // Warnings
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

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(amount);

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h4 className="font-semibold text-white flex items-center gap-2">
            <Calculator className="h-4 w-4 text-[#d4af37]" />
            Projet immobilier
          </h4>
          
          <Slider
            label="Prix du bien"
            value={montant}
            onChange={setMontant}
            min={50000}
            max={1000000}
            step={10000}
            format={(v) => formatCurrency(v)}
          />
          
          <Slider
            label="Apport personnel"
            value={apport}
            onChange={setApport}
            min={0}
            max={montant * 0.5}
            step={5000}
            format={(v) => formatCurrency(v)}
          />
          
          <Slider
            label="Durée du prêt"
            value={duree}
            onChange={setDuree}
            min={5}
            max={30}
            step={1}
            format={(v) => `${v} ans`}
          />
          
          <Slider
            label="Taux d'intérêt"
            value={taux}
            onChange={setTaux}
            min={0.5}
            max={8}
            step={0.1}
            format={(v) => `${v}%`}
          />
        </div>
        
        <div className="space-y-4">
          <h4 className="font-semibold text-white flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-[#d4af37]" />
            Situation financière
          </h4>
          
          <Slider
            label="Revenus mensuels nets"
            value={revenus}
            onChange={setRevenus}
            min={1000}
            max={20000}
            step={100}
            format={(v) => formatCurrency(v)}
          />
          
          <Slider
            label="Charges existantes"
            value={charges}
            onChange={setCharges}
            min={0}
            max={3000}
            step={50}
            format={(v) => formatCurrency(v)}
          />
          
          <Slider
            label="Taux assurance"
            value={insuranceRate}
            onChange={setInsuranceRate}
            min={0.1}
            max={1}
            step={0.01}
            format={(v) => `${v}%`}
          />
        </div>
      </div>

      {/* Results */}
      <motion.div
        key={result.monthlyPayment}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-[#d4af37]/20 bg-gradient-to-br from-[#1a3a5c]/50 to-[#0f1f33]/50 p-6"
      >
        {/* Eligibility Badge */}
        <div className="mb-4 flex justify-center">
          <div className={`inline-flex items-center gap-2 rounded-full px-4 py-2 ${
            result.isEligible 
              ? "bg-emerald-500/20 text-emerald-400" 
              : "bg-red-500/20 text-red-400"
          }`}>
            {result.isEligible ? (
              <>
                <CheckCircle2 className="h-5 w-5" />
                <span className="font-semibold">Projet réalisable</span>
              </>
            ) : (
              <>
                <AlertCircle className="h-5 w-5" />
                <span className="font-semibold">Projet à risque</span>
              </>
            )}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 rounded-xl bg-white/5">
            <p className="text-2xl font-bold text-[#d4af37]">{formatCurrency(result.monthlyPayment)}</p>
            <p className="text-xs text-white/50">Mensualité totale</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-white/5">
            <p className={`text-2xl font-bold ${result.debtRatio > 35 ? "text-red-400" : "text-emerald-400"}`}>
              {result.debtRatio.toFixed(1)}%
            </p>
            <p className="text-xs text-white/50">Taux d'endettement</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-white/5">
            <p className="text-2xl font-bold text-white">{formatCurrency(result.totalInterest)}</p>
            <p className="text-xs text-white/50">Coût du crédit</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-white/5">
            <p className="text-2xl font-bold text-white">{result.taeg.toFixed(2)}%</p>
            <p className="text-xs text-white/50">TAEG</p>
          </div>
        </div>

        {/* Warnings */}
        {result.warnings.length > 0 && (
          <div className="space-y-2">
            {result.warnings.map((warning, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-amber-400">
                <Info className="h-4 w-4 shrink-0" />
                {warning}
              </div>
            ))}
          </div>
        )}

        {/* Explanation */}
        <div className="mt-4 pt-4 border-t border-white/10 text-xs text-white/40">
          <p>Simulation indicative. Les taux réels peuvent varier selon votre profil et la banque.</p>
        </div>
      </motion.div>
    </div>
  );
}
