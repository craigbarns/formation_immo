"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calculator, Copy, CheckCircle2, RefreshCcw } from "lucide-react";
import { recordSimulatorUsed } from "@/lib/gamification";

export function NetVendeurSimulator() {
  const [prixFai, setPrixFai] = useState(350000);
  const [honoraires, setHonoraires] = useState(5);
  const [chargeAcquereur, setChargeAcquereur] = useState(true);
  const [copied, setCopied] = useState<number | null>(null);
  const [tracked] = useState(() => {
    if (typeof window !== 'undefined') recordSimulatorUsed("net-vendeur");
    return true;
  });


  const montantHonoraires = (prixFai * honoraires) / 100;
  const netVendeur = chargeAcquereur ? prixFai : prixFai - montantHonoraires;

  const phrases = [
    `Avec un prix affiché de ${Math.round(prixFai).toLocaleString("fr-FR")} € FAI, vous empocherez ${Math.round(netVendeur).toLocaleString("fr-FR")} € net vendeur.`,
    `Mes honoraires de ${honoraires} % incluent la stratégie marketing, la négociation et l'accompagnement jusqu'à l'acte authentique.`,
    `Études de marché 2025 : les biens vendus par agence se négocient en moyenne 10 à 15 % plus cher que les ventes entre particuliers.`,
    chargeAcquereur
      ? `L'acquéreur prend en charge les honoraires : vous touchez l'intégralité des ${Math.round(netVendeur).toLocaleString("fr-FR")} €.`
      : `Vos honoraires sont de ${Math.round(montantHonoraires).toLocaleString("fr-FR")} €, ce qui reste largement amorti par le prix de vente optimisé.`,
  ];

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopied(idx);
    setTimeout(() => setCopied(null), 1500);
  };

  const presets = [
    { label: "Studio 150k", prix: 150000, taux: 6 },
    { label: "T3 350k", prix: 350000, taux: 5 },
    { label: "Maison 650k", prix: 650000, taux: 4 },
  ];

  return (
    <div className="space-y-6">
      {/* Presets */}
      <div className="flex flex-wrap gap-2">
        {presets.map((p) => (
          <button
            key={p.label}
            onClick={() => { setPrixFai(p.prix); setHonoraires(p.taux); }}
            className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-semibold text-zinc-700 transition hover:border-brand-navy/40 hover:bg-brand-navy/5"
          >
            {p.label}
          </button>
        ))}
        <button
          onClick={() => { setPrixFai(350000); setHonoraires(5); setChargeAcquereur(true); }}
          className="ml-auto inline-flex items-center gap-1 rounded-lg border border-zinc-200 px-3 py-1.5 text-xs font-semibold text-zinc-500 transition hover:bg-zinc-50"
        >
          <RefreshCcw size={12} /> Réinitialiser
        </button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Inputs */}
        <div className="space-y-5 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
          <h4 className="flex items-center gap-2 text-sm font-bold text-brand-navy">
            <Calculator size={16} className="text-brand-gold" /> Paramètres
          </h4>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm font-medium text-zinc-700">
                <label>Prix de vente FAI</label>
                <span className="font-bold text-brand-gold">{prixFai.toLocaleString("fr-FR")} €</span>
              </div>
              <input
                type="range"
                min={50000}
                max={2000000}
                step={5000}
                value={prixFai}
                onChange={(e) => setPrixFai(Number(e.target.value))}
                className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-brand-navy"
              />
            </div>

            <div>
              <div className="flex justify-between text-sm font-medium text-zinc-700">
                <label>Taux d'honoraires</label>
                <span className="font-bold text-brand-gold">{honoraires} %</span>
              </div>
              <input
                type="range"
                min={1}
                max={10}
                step={0.5}
                value={honoraires}
                onChange={(e) => setHonoraires(Number(e.target.value))}
                className="mt-2 h-2 w-full cursor-pointer appearance-none rounded-full bg-zinc-200 accent-brand-navy"
              />
            </div>

            <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-zinc-100 bg-zinc-50 p-3 transition hover:border-zinc-200">
              <input
                type="checkbox"
                checked={chargeAcquereur}
                onChange={(e) => setChargeAcquereur(e.target.checked)}
                className="h-5 w-5 rounded border-zinc-300 text-brand-navy focus:ring-brand-navy"
              />
              <div>
                <p className="text-sm font-semibold text-zinc-800">Honoraires à charge de l'acquéreur</p>
                <p className="text-xs text-zinc-500">Le vendeur touche le prix FAI intégralement.</p>
              </div>
            </label>
          </div>
        </div>

        {/* Results */}
        <motion.div
          key={netVendeur + montantHonoraires}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5"
        >
          <h4 className="text-sm font-bold uppercase text-emerald-900">Résultat</h4>
          <div className="mt-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-zinc-700">Prix FAI</span>
              <span className="font-semibold text-zinc-900">{prixFai.toLocaleString("fr-FR")} €</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-zinc-700">Honoraires ({honoraires} %)</span>
              <span className="font-semibold text-zinc-900">{Math.round(montantHonoraires).toLocaleString("fr-FR")} €</span>
            </div>
            <div className="flex justify-between border-t border-emerald-200 pt-3">
              <span className="text-sm font-bold text-emerald-900">Net vendeur</span>
              <span className="text-2xl font-black text-emerald-800">{Math.round(netVendeur).toLocaleString("fr-FR")} €</span>
            </div>
          </div>

          <div className="mt-5 rounded-xl bg-white/70 p-3 text-xs text-emerald-900">
            {chargeAcquereur ? (
              <p>✅ L'acquéreur paie les honoraires. Le vendeur reçoit le prix FAI en intégralité.</p>
            ) : (
              <p>ℹ️ Les honoraires sont déduits du prix FAI. Net vendeur = {Math.round(netVendeur).toLocaleString("fr-FR")} €.</p>
            )}
          </div>
        </motion.div>
      </div>

      {/* Phrases */}
      <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm">
        <h4 className="text-sm font-bold text-brand-navy">Phrases d'argumentaire prêtes à l'emploi</h4>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {phrases.map((p, i) => (
            <motion.button
              key={i}
              whileHover={{ scale: 1.01 }}
              onClick={() => handleCopy(p, i)}
              className="relative text-left rounded-xl border border-zinc-200 bg-zinc-50 p-4 transition hover:border-brand-gold/50 hover:shadow-sm"
            >
              <span className="absolute right-3 top-3 text-zinc-400">
                {copied === i ? <CheckCircle2 size={14} className="text-emerald-500" /> : <Copy size={14} />}
              </span>
              <p className="pr-6 text-sm leading-relaxed text-zinc-700">{p}</p>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
