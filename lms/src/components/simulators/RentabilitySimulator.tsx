"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Home, DollarSign, PieChart, AlertTriangle } from "lucide-react";
import { Slider } from "@/components/ui/Slider";

interface RentabilityResult {
  grossYield: number;
  netYield: number;
  cashflow: number;
  monthlyRent: number;
  annualCharges: number;
  monthlyCharges: number;
  totalInvestment: number;
  yearsToReturn: number;
  recommendation: "excellent" | "good" | "average" | "poor";
}

export function RentabilitySimulator() {
  const [purchasePrice, setPurchasePrice] = useState(200000);
  const [notaryFees, setNotaryFees] = useState(8);
  const [renovation, setRenovation] = useState(10000);
  const [monthlyRent, setMonthlyRent] = useState(800);
  const [vacancyRate, setVacancyRate] = useState(5);
  const [propertyTax, setPropertyTax] = useState(1000);
  const [condoFees, setCondoFees] = useState(100);
  const [insurance, setInsurance] = useState(300);
  const [maintenance, setMaintenance] = useState(5);
  const [management, setManagement] = useState(8);

  const result = useMemo<RentabilityResult>(() => {
    const totalInvestment = purchasePrice * (1 + notaryFees / 100) + renovation;
    const annualRent = monthlyRent * 12 * (1 - vacancyRate / 100);
    const annualCondoFees = condoFees * 12;
    const annualMaintenance = (purchasePrice * maintenance) / 100;
    const annualManagement = annualRent * (management / 100);
    const annualCharges = propertyTax + annualCondoFees + insurance + annualMaintenance + annualManagement;
    
    const grossYield = (annualRent / totalInvestment) * 100;
    const netYield = ((annualRent - annualCharges) / totalInvestment) * 100;
    const cashflow = (annualRent - annualCharges) / 12;
    const yearsToReturn = totalInvestment / (annualRent - annualCharges);

    let recommendation: RentabilityResult["recommendation"];
    if (netYield >= 8) recommendation = "excellent";
    else if (netYield >= 5) recommendation = "good";
    else if (netYield >= 2) recommendation = "average";
    else recommendation = "poor";

    return {
      grossYield,
      netYield,
      cashflow,
      monthlyRent,
      annualCharges,
      monthlyCharges: annualCharges / 12,
      totalInvestment,
      yearsToReturn,
      recommendation,
    };
  }, [purchasePrice, notaryFees, renovation, monthlyRent, vacancyRate, propertyTax, condoFees, insurance, maintenance, management]);

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(amount);

  const recommendationConfig = {
    excellent: { color: "text-emerald-400", bg: "bg-emerald-500/20", label: "Excellent investissement" },
    good: { color: "text-blue-400", bg: "bg-blue-500/20", label: "Bon investissement" },
    average: { color: "text-amber-400", bg: "bg-amber-500/20", label: "Rentabilité moyenne" },
    poor: { color: "text-red-400", bg: "bg-red-500/20", label: "Rentabilité faible" },
  };

  const rec = recommendationConfig[result.recommendation];

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h4 className="font-semibold text-white flex items-center gap-2">
            <Home className="h-4 w-4 text-[#d4af37]" />
            Acquisition
          </h4>
          
          <Slider label="Prix d'achat" value={purchasePrice} onChange={setPurchasePrice} min={50000} max={1000000} step={10000} format={(v) => formatCurrency(v)} />
          <Slider label="Frais notaire" value={notaryFees} onChange={setNotaryFees} min={0} max={15} step={0.5} format={(v) => `${v}%`} />
          <Slider label="Travaux" value={renovation} onChange={setRenovation} min={0} max={100000} step={1000} format={(v) => formatCurrency(v)} />
          <Slider label="Loyer mensuel" value={monthlyRent} onChange={setMonthlyRent} min={300} max={5000} step={50} format={(v) => formatCurrency(v)} />
          <Slider label="Vacance locative" value={vacancyRate} onChange={setVacancyRate} min={0} max={20} step={1} format={(v) => `${v}%`} />
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-white flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-[#d4af37]" />
            Charges annuelles
          </h4>
          
          <Slider label="Taxe foncière" value={propertyTax} onChange={setPropertyTax} min={0} max={5000} step={100} format={(v) => formatCurrency(v)} />
          <Slider label="Charges copropriété/mois" value={condoFees} onChange={setCondoFees} min={0} max={500} step={10} format={(v) => formatCurrency(v)} />
          <Slider label="Assurance PNO" value={insurance} onChange={setInsurance} min={0} max={1000} step={50} format={(v) => formatCurrency(v)} />
          <Slider label="Entretien (% prix)" value={maintenance} onChange={setMaintenance} min={0} max={20} step={0.5} format={(v) => `${v}%`} />
          <Slider label="Gestion locative" value={management} onChange={setManagement} min={0} max={15} step={0.5} format={(v) => `${v}%`} />
        </div>
      </div>

      <motion.div
        key={result.netYield}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-[#d4af37]/20 bg-gradient-to-br from-[#1a3a5c]/50 to-[#0f1f33]/50 p-6"
      >
        {/* Recommendation */}
        <div className={`mb-6 rounded-xl ${rec.bg} p-4 text-center`}>
          <p className={`text-lg font-bold ${rec.color}`}>{rec.label}</p>
        </div>

        {/* Main metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-3 rounded-xl bg-white/5">
            <p className="text-2xl font-bold text-white">{result.grossYield.toFixed(2)}%</p>
            <p className="text-xs text-white/50">Rendement brut</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-white/5">
            <p className={`text-2xl font-bold ${result.netYield >= 0 ? "text-emerald-400" : "text-red-400"}`}>
              {result.netYield.toFixed(2)}%
            </p>
            <p className="text-xs text-white/50">Rendement net</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-white/5">
            <p className={`text-2xl font-bold ${result.cashflow >= 0 ? "text-emerald-400" : "text-red-400"}`}>
              {formatCurrency(result.cashflow)}
            </p>
            <p className="text-xs text-white/50">Cashflow mensuel</p>
          </div>
          <div className="text-center p-3 rounded-xl bg-white/5">
            <p className="text-2xl font-bold text-[#d4af37]">
              {result.yearsToReturn > 0 && result.yearsToReturn < 100 ? result.yearsToReturn.toFixed(1) : "∞"}
            </p>
            <p className="text-xs text-white/50">Années de retour</p>
          </div>
        </div>

        {/* Investment breakdown */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="rounded-xl bg-white/5 p-4">
            <h5 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <PieChart className="h-4 w-4 text-[#d4af37]" />
              Investissement total
            </h5>
            <p className="text-2xl font-bold text-white">{formatCurrency(result.totalInvestment)}</p>
            <div className="mt-2 text-xs text-white/50 space-y-1">
              <p>Prix: {formatCurrency(purchasePrice)}</p>
              <p>Notaire: {formatCurrency(purchasePrice * notaryFees / 100)}</p>
              <p>Travaux: {formatCurrency(renovation)}</p>
            </div>
          </div>

          <div className="rounded-xl bg-white/5 p-4">
            <h5 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-[#d4af37]" />
              Charges annuelles
            </h5>
            <p className="text-2xl font-bold text-white">{formatCurrency(result.annualCharges)}</p>
            <div className="mt-2 text-xs text-white/50 space-y-1">
              <p>Taxe foncière: {formatCurrency(propertyTax)}</p>
              <p>Copropriété: {formatCurrency(condoFees * 12)}</p>
              <p>Entretien: {formatCurrency((purchasePrice * maintenance) / 100)}</p>
            </div>
          </div>
        </div>

        {result.cashflow < 0 && (
          <div className="mt-4 flex items-center gap-2 text-amber-400 text-sm">
            <AlertTriangle className="h-4 w-4" />
            <span>Attention : cashflow négatif. Vous devrez compléter de votre poche chaque mois.</span>
          </div>
        )}
      </motion.div>
    </div>
  );
}
