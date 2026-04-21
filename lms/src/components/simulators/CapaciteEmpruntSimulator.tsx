"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, Euro, TrendingUp, Info, ShieldCheck } from "lucide-react";
import { Slider } from "@/components/ui/Slider";
import { recordSimulatorUsed } from "@/lib/gamification";

export function CapaciteEmpruntSimulator() {
  const [revenus, setRevenus] = useState(4500);
  const [charges, setCharges] = useState(0);
  const [taux, setTaux] = useState(3.5);
  const [duree, setDuree] = useState(25);
  const [tauxAssurance, setTauxAssurance] = useState(0.36);

  useEffect(() => {
    recordSimulatorUsed("capacite-emprunt");
  }, []);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(amount);

  const result = useMemo(() => {
    const netMensuel = revenus - charges;
    const mensualiteMax = netMensuel * 0.35;
    
    // Reverse calculation for total amount
    const monthlyRate = taux / 100 / 12;
    const numPayments = duree * 12;
    const insuranceMonthlyRate = tauxAssurance / 100 / 12;
    
    // We want mensualiteMax = P * (r*(1+r)^n / ((1+r)^n - 1)) + P * insuranceRate/12
    // Let K = (r*(1+r)^n / ((1+r)^n - 1)) + insuranceRate/12
    // P = mensualiteMax / K
    
    const K = monthlyRate > 0 
      ? (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1) + insuranceMonthlyRate
      : (1 / numPayments) + insuranceMonthlyRate;
      
    const capaciteEmprunt = mensualiteMax / K;
    
    return {
      mensualiteMax,
      capaciteEmprunt,
      apportSuggere: capaciteEmprunt * 0.1,
      totalProjet: capaciteEmprunt / 0.9, // Assuming 10% apport
    };
  }, [revenus, charges, taux, duree, tauxAssurance]);

  return (
    <div className="space-y-10">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-8 rounded-[2rem] border border-white/5 bg-white/[0.02] p-8 shadow-inner">
            <h4 className="text-xs font-black uppercase tracking-widest text-brand-gold flex items-center gap-3">
                <ShieldCheck className="h-4 w-4" />
                Profil Emprunteur
            </h4>
            <Slider label="Revenus nets mensuels" value={revenus} onChange={setRevenus} min={1200} max={15000} step={100} format={(v) => formatCurrency(v)} />
            <Slider label="Charges & Crédits" value={charges} onChange={setCharges} min={0} max={5000} step={50} format={(v) => formatCurrency(v)} />
        </div>

        <div className="space-y-8 rounded-[2rem] border border-white/5 bg-white/[0.02] p-8 shadow-inner">
            <h4 className="text-xs font-black uppercase tracking-widest text-brand-gold flex items-center gap-3">
                <TrendingUp className="h-4 w-4" />
                Paramètres Marché
            </h4>
            <Slider label="Durée souhaitée" value={duree} onChange={setDuree} min={10} max={27} step={1} format={(v) => `${v} ans`} />
            <Slider label="Taux d'intérêt" value={taux} onChange={setTaux} min={1} max={7} step={0.1} format={(v) => `${v}%`} />
            <Slider label="Assurance" value={tauxAssurance} onChange={setTauxAssurance} min={0.1} max={1} step={0.01} format={(v) => `${v}%`} />
        </div>
      </div>

      <motion.div
        key={result.capaciteEmprunt}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#030712] p-8 md:p-12 shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/[0.03] to-transparent pointer-events-none" />
        
        <div className="flex flex-col items-center text-center mb-12">
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold mb-4">CAPACITÉ D&apos;EMPRUNT ESTIMÉE</p>
            <h3 className="text-5xl md:text-7xl font-black text-white tabular-nums tracking-tighter shadow-xl">
                {formatCurrency(result.capaciteEmprunt)}
            </h3>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-3xl border border-white/5 bg-white/5 p-6 shadow-xl text-center group hover:border-brand-gold/30 transition-all">
            <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Mensualité Max (35%)</p>
            <p className="text-2xl font-black text-white tabular-nums">{formatCurrency(result.mensualiteMax)}</p>
          </div>
          <div className="rounded-3xl border border-white/5 bg-white/5 p-6 shadow-xl text-center group hover:border-brand-gold/30 transition-all">
            <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Apport Conseillé (10%)</p>
            <p className="text-2xl font-black text-white tabular-nums">{formatCurrency(result.apportSuggere)}</p>
          </div>
          <div className="rounded-3xl border border-white/5 bg-white/5 p-6 shadow-xl text-center group hover:border-brand-gold/30 transition-all sm:col-span-2 lg:col-span-1">
            <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Budget Projet Global</p>
            <p className="text-2xl font-black text-brand-gold tabular-nums">{formatCurrency(result.totalProjet)}</p>
          </div>
        </div>

        <div className="mt-10 p-6 rounded-2xl bg-black/40 border border-white/5 flex gap-4 items-start shadow-inner">
            <Info className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
            <p className="text-sm text-white/50 leading-relaxed font-medium italic">
                Ce calcul respecte la limite des <strong className="text-white">35% de taux d&apos;endettement</strong> fixée par le HCSF. Il inclut une estimation de l&apos;assurance emprunteur.
            </p>
        </div>
      </motion.div>
    </div>
  );
}
