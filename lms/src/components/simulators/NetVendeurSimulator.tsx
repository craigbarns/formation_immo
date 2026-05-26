"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { Info, HandCoins, CheckCircle2, MessageSquare, Quote } from "lucide-react";
import { Slider } from "@/components/ui/Slider";
import { recordSimulatorUsed } from "@/lib/gamification";

export function NetVendeurSimulator() {
  const [prixFAI, setPrixFAI] = useState(350000);
  const [tauxHonoraires, setTauxHonoraires] = useState(5);

  useEffect(() => {
    recordSimulatorUsed("net-vendeur");
  }, []);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(amount);

  const result = useMemo(() => {
    const honoraires = (prixFAI * tauxHonoraires) / 100;
    const netVendeur = prixFAI - honoraires;
    
    return {
      honoraires,
      netVendeur,
    };
  }, [prixFAI, tauxHonoraires]);

  const argumentaires = [
    `Le prix net pour vous est de ${formatCurrency(result.netVendeur)}, nous prenons en charge toute la commercialisation pour ${formatCurrency(result.honoraires)}.`,
    `Afin de garantir votre net vendeur à ${formatCurrency(result.netVendeur)}, nous positionnons le bien à ${formatCurrency(prixFAI)} sur le marché.`,
    `Nos honoraires de ${tauxHonoraires}% incluent le reportage photo pro, la diffusion premium et le filtrage des acquéreurs.`,
  ];

  return (
    <div className="space-y-10">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-8 rounded-[2rem] border border-slate-100 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] p-8 shadow-inner">
            <h4 className="text-xs font-black uppercase tracking-widest text-brand-gold flex items-center gap-3">
                <HandCoins className="h-4 w-4" />
                Valorisation Marché
            </h4>
            <Slider label="Prix de vente FAI" value={prixFAI} onChange={setPrixFAI} min={50000} max={1500000} step={5000} format={(v) => formatCurrency(v)} />
            <Slider label="Taux d'honoraires" value={tauxHonoraires} onChange={setTauxHonoraires} min={1} max={10} step={0.1} format={(v) => `${v}%`} />
        </div>

        <motion.div
            key={result.netVendeur}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#030712] p-8 shadow-2xl"
        >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/[0.03] to-transparent pointer-events-none" />
            
            <div className="text-center mb-10">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold mb-3">NET VENDEUR ESTIMÉ</p>
                <h3 className="text-4xl md:text-5xl font-black text-white tabular-nums tracking-tighter">
                    {formatCurrency(result.netVendeur)}
                </h3>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/5 text-center">
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/75 mb-1">Honoraires agence</p>
                    <p className="text-xl font-black text-brand-gold tabular-nums">{formatCurrency(result.honoraires)}</p>
                </div>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/5 text-center">
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/75 mb-1">Part honoraires</p>
                    <p className="text-xl font-black text-white tabular-nums">{tauxHonoraires}%</p>
                </div>
            </div>

            <div className="mt-8 flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-400">
                <CheckCircle2 size={12} /> Calcul conforme barème
            </div>
        </motion.div>
      </div>

      {/* Argumentaire */}
      <section className="space-y-6">
          <div className="flex items-center gap-4">
            <MessageSquare className="w-5 h-5 text-brand-gold" />
            <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 dark:text-white/75">Éléments de langage stratégiques</h3>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {argumentaires.map((arg, i) => (
                <div key={i} className="relative group overflow-hidden rounded-[1.5rem] border border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-[#070d18] p-6 shadow-2xl transition-all hover:border-brand-gold/20 hover:bg-slate-50 dark:hover:bg-white/[0.02]">
                    <Quote className="absolute -right-1 -top-1 w-12 h-12 text-slate-300 dark:text-white/5 opacity-50" />
                    <p className="relative z-10 text-sm leading-relaxed text-slate-600 dark:text-white/70 italic font-medium">
                        &laquo; {arg} &raquo;
                    </p>
                </div>
            ))}
          </div>
      </section>

      <div className="p-6 rounded-2xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/5 flex gap-4 items-start shadow-inner">
          <Info className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
          <p className="text-xs text-slate-400 dark:text-white/75 leading-relaxed font-medium">
              Note : Assurez-vous que vos honoraires respectent le barème affiché en agence et que le mandat précise clairement qui supporte la charge des honoraires (acquéreur ou vendeur).
          </p>
      </div>
    </div>
  );
}
