"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calculator, Info } from "lucide-react";
import { Slider } from "@/components/ui/Slider";

export function CreditSimulator() {
  const [montant, setMontant] = useState(200000);
  const [taux, setTaux] = useState(3.5);
  const [duree, setDuree] = useState(20);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(amount);

  const result = useMemo(() => {
    const monthlyRate = taux / 100 / 12;
    const numPayments = duree * 12;
    const monthlyPayment =
      (montant * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
      (Math.pow(1 + monthlyRate, numPayments) - 1);
    
    const totalCost = monthlyPayment * numPayments;
    const totalInterest = totalCost - montant;
    
    return {
      monthlyPayment,
      totalCost,
      totalInterest,
    };
  }, [montant, taux, duree]);

  return (
    <div className="space-y-10">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-8 rounded-[2rem] border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] p-8 shadow-inner">
            <h4 className="text-xs font-black uppercase tracking-widest text-brand-gold flex items-center gap-3">
                <Calculator className="h-4 w-4" />
                Configuration du prêt
            </h4>
            <Slider label="Montant emprunté" value={montant} onChange={setMontant} min={10000} max={1000000} step={10000} format={(v) => formatCurrency(v)} />
            <Slider label="Taux d'intérêt" value={taux} onChange={setTaux} min={0.5} max={8} step={0.1} format={(v) => `${v}%`} />
            <Slider label="Durée (années)" value={duree} onChange={setDuree} min={5} max={30} step={1} format={(v) => `${v} ans`} />
        </div>

        <motion.div
            key={result.monthlyPayment}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#030712] p-8 shadow-2xl"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/[0.03] to-transparent pointer-events-none" />
            
            <div className="text-center mb-10">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold mb-3">MENSUALITÉ ESTIMÉE (HORS ASS.)</p>
                <h3 className="text-4xl md:text-5xl font-black text-white tabular-nums tracking-tighter">
                    {formatCurrency(result.monthlyPayment)}
                </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/5 text-center">
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/75 mb-1">Coût total crédit</p>
                    <p className="text-xl font-black text-brand-gold tabular-nums">{formatCurrency(result.totalInterest)}</p>
                </div>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/5 text-center">
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/75 mb-1">Montant total remboursé</p>
                    <p className="text-xl font-black text-white tabular-nums">{formatCurrency(result.totalCost)}</p>
                </div>
            </div>

            <div className="mt-8 p-4 rounded-xl bg-black/40 border border-white/5 flex gap-3 items-start shadow-inner">
                <Info className="w-4 h-4 text-brand-gold shrink-0 mt-0.5" />
                <p className="text-[10px] text-white/75 leading-relaxed font-medium">
                    Attention : Ce calcul ne comprend pas l&apos;assurance emprunteur ni les frais de dossier. Utilisez le simulateur avancé pour une analyse complète.
                </p>
            </div>
        </motion.div>
      </div>
    </div>
  );
}
