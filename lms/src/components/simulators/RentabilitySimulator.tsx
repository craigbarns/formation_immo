"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Info, CheckCircle2, AlertTriangle, Sparkles, Building2 } from "lucide-react";
import { Slider } from "@/components/ui/Slider";
import { recordSimulatorUsed } from "@/lib/gamification";

export function RentabilitySimulator() {
  const [prixAchat, setPrixAchat] = useState(220000);
  const [travaux, setTravaux] = useState(30000);
  const [loyerMensuel, setLoyerMensuel] = useState(1150);
  const [taxeFonciere, setTaxeFonciere] = useState(1200);
  const [chargesMensuelles] = useState(80);
  const [fraisGestionPct] = useState(7);
  const [isLMNP, setIsLMNP] = useState(false);

  useEffect(() => {
    recordSimulatorUsed("rentability");
  }, []);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(amount);

  const result = useMemo(() => {
    const fraisNotaire = prixAchat * 0.075;
    const totalInvesti = prixAchat + travaux + fraisNotaire;
    
    const revenusAnnuels = loyerMensuel * 12;
    const rentabiliteBrute = (revenusAnnuels / prixAchat) * 100;
    
    const chargesGestionAnnuelles = (revenusAnnuels * fraisGestionPct) / 100;
    const chargesCoproprieteAnnuelles = chargesMensuelles * 12;
    
    const totalChargesAnnuelles = taxeFonciere + chargesCoproprieteAnnuelles + chargesGestionAnnuelles;
    const revenusNets = revenusAnnuels - totalChargesAnnuelles;
    
    const rentabiliteNette = (revenusNets / totalInvesti) * 100;
    
    // Impact fiscal simplifié (Micro-BIC)
    let impotEstime = 0;
    if (isLMNP) {
      const abattement = revenusAnnuels * 0.5;
      const baseImposable = revenusAnnuels - abattement;
      impotEstime = baseImposable * (0.30 + 0.172); // TMI 30% + Prélèvements sociaux
    }
    
    const cashflowMensuel = (revenusNets - impotEstime) / 12;
    
    return {
      fraisNotaire,
      totalInvesti,
      rentabiliteBrute,
      rentabiliteNette,
      cashflowMensuel,
      impotEstime,
    };
  }, [prixAchat, travaux, loyerMensuel, taxeFonciere, chargesMensuelles, fraisGestionPct, isLMNP]);

  return (
    <div className="space-y-10">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-8 rounded-[2rem] border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] p-8 shadow-inner">
            <h4 className="text-xs font-black uppercase tracking-widest text-brand-gold flex items-center gap-3">
                <Building2 className="h-4 w-4" />
                Dépenses d&apos;acquisition
            </h4>
            <Slider label="Prix d'achat net vendeur" value={prixAchat} onChange={setPrixAchat} min={50000} max={1000000} step={10000} format={(v) => formatCurrency(v)} />
            <Slider label="Budget travaux" value={travaux} onChange={setTravaux} min={0} max={200000} step={5000} format={(v) => formatCurrency(v)} />
            <div className="p-4 rounded-xl bg-slate-100 dark:bg-black/20 border border-slate-200 dark:border-white/5 text-xs text-slate-500 dark:text-white/75 italic">
                Frais de notaire estimés : <span className="text-slate-700 dark:text-white/60 font-bold">{formatCurrency(result.fraisNotaire)} (7.5%)</span>
            </div>
        </div>

        <div className="space-y-8 rounded-[2rem] border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] p-8 shadow-inner">
            <h4 className="text-xs font-black uppercase tracking-widest text-brand-gold flex items-center gap-3">
                <TrendingUp className="h-4 w-4" />
                Exploitation & Fiscalité
            </h4>
            <Slider label="Loyer mensuel HC" value={loyerMensuel} onChange={setLoyerMensuel} min={300} max={5000} step={50} format={(v) => formatCurrency(v)} />
            <Slider label="Taxe foncière annuelle" value={taxeFonciere} onChange={setTaxeFonciere} min={0} max={5000} step={100} format={(v) => formatCurrency(v)} />

            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-300 dark:border-white/10 transition-all hover:bg-slate-100 dark:hover:bg-white/10">
                <label className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight cursor-pointer" htmlFor="lmnp-toggle">Simulation LMNP (Micro-BIC)</label>
                <input 
                    id="lmnp-toggle"
                    type="checkbox" 
                    checked={isLMNP} 
                    onChange={(e) => setIsLMNP(e.target.checked)}
                    className="w-5 h-5 accent-brand-gold rounded border-white/20 bg-white/5"
                />
            </div>
        </div>
      </div>

      <motion.div
        key={`${result.rentabiliteNette}-${isLMNP}`}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#030712] p-8 md:p-12 shadow-[0_30px_80px_rgba(0,0,0,0.5)]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/[0.03] to-transparent pointer-events-none" />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <div className="text-center p-6 rounded-3xl bg-white/5 border border-white/10 shadow-xl group hover:border-brand-gold/30 transition-all">
                <p className="text-[10px] font-black text-white/75 uppercase tracking-widest mb-2">Investissement total</p>
                <p className="text-2xl font-black text-white tabular-nums">{formatCurrency(result.totalInvesti)}</p>
            </div>
            <div className="text-center p-6 rounded-3xl bg-white/5 border border-white/10 shadow-xl group hover:border-brand-gold/30 transition-all">
                <p className="text-[10px] font-black text-white/75 uppercase tracking-widest mb-2">Rentabilité brute</p>
                <p className="text-3xl font-black text-brand-gold tabular-nums">{result.rentabiliteBrute.toFixed(2)}%</p>
            </div>
            <div className="text-center p-6 rounded-3xl bg-white/5 border border-white/10 shadow-xl group hover:border-brand-gold/30 transition-all">
                <p className="text-[10px] font-black text-white/75 uppercase tracking-widest mb-2">Rentabilité nette-net</p>
                <p className="text-3xl font-black text-emerald-400 tabular-nums">{result.rentabiliteNette.toFixed(2)}%</p>
            </div>
            <div className="text-center p-6 rounded-3xl bg-brand-gold/10 border border-brand-gold/30 shadow-xl group transition-all">
                <p className="text-[10px] font-black text-brand-gold uppercase tracking-widest mb-2">Cashflow mensuel</p>
                <p className="text-3xl font-black text-white tabular-nums">{formatCurrency(result.cashflowMensuel)}</p>
            </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-6 pt-6 border-t border-white/5">
            {result.rentabiliteNette > 5 ? (
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-emerald-400">
                    <CheckCircle2 size={16} /> Performance supérieure au marché
                </div>
            ) : (
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-400">
                    <AlertTriangle size={16} /> Rendement conservateur
                </div>
            )}
            <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-white/75">
                <Sparkles size={16} className="text-brand-gold" /> Calcul certifié formation 42h
            </div>
        </div>

        {isLMNP && (
            <div className="mt-10 p-6 rounded-2xl bg-brand-gold/5 border border-brand-gold/20 flex gap-4 items-start shadow-inner">
                <Info className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                <p className="text-sm text-white/60 leading-relaxed font-medium italic">
                    Simulation fiscale basée sur le régime <strong className="text-brand-gold">Micro-BIC LMNP</strong>. Nous appliquons un abattement forfaitaire de 50% sur vos revenus locatifs avant imposition (TMI 30% + PS 17.2%).
                </p>
            </div>
        )}
      </motion.div>
    </div>
  );
}
