"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Scale, TrendingUp, Check, Info, AlertTriangle } from "lucide-react";
import type { SupportVisuelMeta } from "@/data/supports-visuels";

function LessonLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="mt-6 inline-flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 px-6 py-3 text-xs font-black uppercase tracking-widest text-white hover:bg-brand-gold hover:text-brand-navy hover:border-brand-gold transition-all shadow-xl active:scale-95"
    >
      {label} <span className="text-lg">→</span>
    </Link>
  );
}

export function InfographieBlocks({ id, meta, themeColor = "#d4af37" }: { id: string; meta: SupportVisuelMeta; themeColor?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="relative mb-12 overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#070d18] shadow-2xl"
    >
      {/* Bordure supérieure colorée par thème */}
      <div className="h-2 w-full" style={{ backgroundColor: themeColor }} />

      <div className="p-8 md:p-12 lg:p-16">
        <div className="flex flex-wrap items-start justify-between gap-8 border-b border-white/5 pb-10">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-2xl border border-white/10"
                style={{ backgroundColor: `${themeColor}44` }}
              >
                <Scale size={20} className="text-white" />
              </span>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">
                {meta.moduleLabel}
              </p>
            </div>
            <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl uppercase leading-none mb-6">
              {meta.title}
            </h2>
            <p className="text-lg leading-relaxed text-white/50 max-w-3xl italic">
              &laquo; {meta.summary} &raquo;
            </p>
          </div>
        </div>

        <div className="relative z-10 my-12">{renderInteractive(id)}</div>

        <div className="flex items-center justify-between border-t border-white/5 pt-8">
          <LessonLink href={meta.hrefLesson} label="Consulter la leçon associée" />
          <div className="hidden sm:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/75">
              <Info className="w-3 h-3" /> Support pédagogique interactif
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function renderInteractive(id: string) {
  switch (id) {
    case "checklist-investisseur": return <BlockChecklist />;
    case "matrice-risques": return <BlockMatrice />;
    case "cadre-negociation": return <BlockNegociation />;
    case "calcul-rentabilite": return <BlockRentabilite />;
    case "timeline-juridique": return <BlockTimeline />;
    case "structure-financement": return <BlockFinancement />;
    case "regimes-fiscaux": return <BlockFiscal />;
    case "tableau-diagnostics": return <BlockDiagnostics />;
    case "comparatif-mandats": return <BlockMandats />;
    case "checklist-reseaux": return <BlockReseaux />;
    case "calculateur-net-vendeur": return <BlockNetVendeur />;
    default: return null;
  }
}

function BlockChecklist() {
  const phases = [
    {
      title: "Avant la visite",
      accent: "text-sky-400",
      bg: "bg-sky-500/5",
      border: "border-sky-500/20",
      items: ["Définir budget max", "Étudier le quartier", "Analyser comparables", "Vérifier zonage PLU", "Calculer rentabilité", "Préparer questions"],
    },
    {
      title: "Pendant la visite",
      accent: "text-brand-gold",
      bg: "bg-brand-gold/5",
      border: "border-brand-gold/20",
      items: ["Photos détaillées", "Orientation / lumière", "Bruits environnants", "État des communs", "Stationnement", "Commerces à proximité"],
    },
    {
      title: "Après la visite",
      accent: "text-emerald-400",
      bg: "bg-emerald-500/5",
      border: "border-emerald-500/20",
      items: ["Réviser calculs", "Estimation travaux", "Vérifier diagnostics", "Négocier offre", "Constituer dossier", "Contacter notaire"],
    },
  ];
  return (
    <div className="space-y-12">
      <div className="grid gap-6 md:grid-cols-3">
        {phases.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className={`rounded-3xl border-2 ${p.border} ${p.bg} p-8 shadow-2xl`}
          >
            <h3 className={`text-center flex flex-col items-center gap-3 text-xs font-black uppercase tracking-widest ${p.accent}`}>
              <CheckCircle2 className="w-6 h-6" />
              {p.title}
            </h3>
            <ul className="mt-8 space-y-4 text-sm font-bold text-white/80">
              {p.items.map((t) => (
                <li key={t} className="flex items-start gap-3">
                  <Check className={`mt-0.5 h-4 w-4 shrink-0 ${p.accent}`} />
                  <span className="leading-tight">{t}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      
      <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-[2rem] border border-white/5 bg-white/[0.02] p-8 shadow-xl">
            <h3 className="text-center text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold mb-8">
              Questions stratégiques
            </h3>
            <div className="space-y-6">
              {[
                { who: "Vendeur", q: "Motif de vente & Travaux ?" },
                { who: "Agent", q: "Délai souhaité & Offres ?" },
                { who: "Syndic", q: "Travaux prévus & Procès ?" },
              ].map((col) => (
                <div key={col.who} className="flex items-center gap-4 group">
                  <div className="h-10 w-10 shrink-0 flex items-center justify-center rounded-full bg-brand-navy border border-white/10 text-[10px] font-black text-white group-hover:bg-brand-gold group-hover:text-brand-navy transition-colors">{col.who}</div>
                  <p className="text-sm font-bold text-white/70">{col.q}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="rounded-[2rem] border border-red-500/20 bg-red-500/5 p-8 shadow-xl flex flex-col justify-center">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-red-400 mb-6 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4" /> Risques majeurs
            </h3>
            <ul className="space-y-3 text-sm font-bold text-red-200/60">
              {["Sauter les diagnostics", "Sous-estimer les travaux", "Négliger les charges", "Ignorer le contexte local"].map((t) => (
                <li key={t} className="flex gap-3 items-center">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" /> {t}
                </li>
              ))}
            </ul>
          </div>
      </div>
    </div>
  );
}

function BlockMatrice() {
  const riskCellDark = {
    low: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20 hover:bg-emerald-500/20",
    mid: "bg-amber-500/10 text-brand-gold border-brand-gold/20 hover:bg-amber-500/20",
    high: "bg-red-500/10 text-red-300 border-red-500/20 hover:bg-red-500/20",
  };
  type MatrixCell = { text: string; tone: "low" | "mid" | "high"; note?: string };
  const grid: MatrixCell[][] = [
    [{ text: "Vacance locative", tone: "low" }, { text: "Défaut de paiement", tone: "mid" }, { text: "Catastrophe naturelle", note: "[1] [2]", tone: "high" }],
    [{ text: "Dégradations", tone: "low" }, { text: "Hausse des charges", tone: "mid" }, { text: "Marché en baisse", note: "[3] [4] [5]", tone: "high" }],
    [{ text: "Travaux importants", tone: "mid" }, { text: "Changement de zone", tone: "high" }, { text: "Illiquidité", tone: "high" }],
  ];
  const rowLabels = ["Impact faible", "Impact moyen", "Impact élevé"];
  
  return (
    <div className="grid gap-12 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <p className="mb-4 text-center text-[10px] font-black uppercase tracking-widest text-white/75">
          PROBABILITÉ D&apos;OCCURRENCE →
        </p>
        <div className="overflow-x-auto rounded-[2rem] border border-white/10 bg-white/5 shadow-2xl">
          <table className="w-full min-w-[400px] border-collapse text-center">
            <thead>
              <tr className="bg-white/5">
                <th className="p-5" />
                {["Faible", "Moyen", "Élevé"].map(l => (
                  <th key={l} className="p-5 text-[10px] font-black uppercase tracking-widest text-white/60 border-l border-white/10">{l}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {grid.map((row, ri) => (
                <tr key={ri} className="border-t border-white/10">
                  <th className="p-5 text-[10px] font-black uppercase tracking-widest text-white/75 bg-white/[0.02] text-left">{rowLabels[ri]}</th>
                  {row.map((cell, ci) => (
                    <td key={ci} className={`p-6 border-l border-white/10 transition-all duration-300 ${riskCellDark[cell.tone]}`}>
                      <p className="text-sm font-black uppercase tracking-tight">{cell.text}</p>
                      {cell.note && <span className="mt-2 block text-[9px] font-black opacity-50">{cell.note}</span>}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="space-y-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-xl">
          <h3 className="text-xs font-black uppercase tracking-widest text-brand-gold mb-6 flex items-center gap-2">
            <TrendingUp className="w-4 h-4" /> Stratégies
          </h3>
          <ol className="space-y-4 text-sm font-bold text-white/70">
            {["[1] Assurance loyers", "[2] Diagnostic complet", "[3] Zone tendue", "[4] Fonds de précaution", "[5] Caution bancaire"].map((t, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-brand-gold shrink-0">{t.slice(0, 3)}</span>
                <span>{t.slice(4)}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

function BlockNegociation() {
  return (
    <div className="grid gap-12 lg:grid-cols-2">
      <div className="flex flex-col items-center gap-10">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="rounded-[3rem] border-4 border-brand-gold bg-[#030712] px-16 py-10 text-center shadow-[0_0_50px_rgba(212,175,55,0.2)]"
        >
          <p className="text-5xl font-black tracking-tighter text-white uppercase italic">WIN-WIN</p>
          <p className="mt-4 text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold">Équilibre de valeur</p>
        </motion.div>
        <div className="grid w-full grid-cols-2 gap-4">
          {["DÉLAIS", "PRIX", "CONDITIONS", "GARANTIES"].map(t => (
            <motion.div key={t} whileHover={{ y: -5 }} className="rounded-[2rem] border border-white/10 bg-white/5 p-6 text-center shadow-xl">
               <p className="text-brand-gold font-black uppercase tracking-widest text-xs mb-1">{t}</p>
               <span className="text-[9px] font-bold text-white/75 uppercase tracking-widest">Facteur clé</span>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="space-y-10">
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-red-500/20 bg-red-500/5 p-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-red-400 mb-4 italic">Interdit</p>
            <ul className="space-y-2 text-sm font-bold text-red-200/50 italic">
              <li>&laquo; C&apos;est mon dernier prix &raquo;</li>
              <li>&laquo; Prenez ou laissez &raquo;</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-4 italic">Recommandé</p>
            <ul className="space-y-2 text-sm font-bold text-emerald-200/50 italic">
              <li>&laquo; Comment pouvons-nous... ? &raquo;</li>
              <li>&laquo; Voyons ensemble... &raquo;</li>
            </ul>
          </div>
        </div>
        <div className="rounded-[2rem] border border-brand-gold/30 bg-brand-gold/10 p-8 shadow-2xl">
          <p className="text-lg font-bold text-white leading-relaxed italic">
            <strong className="text-brand-gold uppercase tracking-widest block text-xs not-italic mb-2">Règle d&apos;or</strong>
            Préparez toujours 3 scénarios : Optimal, Réaliste, et votre limite de rupture (Plan B).
          </p>
        </div>
      </div>
    </div>
  );
}

function BlockRentabilite() {
  return (
    <div className="space-y-10">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="relative overflow-hidden rounded-[2.5rem] border-2 border-brand-gold/30 bg-[#030712] p-10 text-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-brand-gold/10 to-transparent pointer-events-none" />
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold mb-6"><TrendingUp className="inline w-4 h-4 mr-2" /> Équation de rentabilité brute</p>
        <p className="text-2xl sm:text-4xl font-black text-white tracking-tighter uppercase leading-none">
          (Loyer mensuel × 12) <br className="sm:hidden" />
          <span className="text-brand-gold">÷</span> <br className="sm:hidden" />
          Total investi × 100
        </p>
      </motion.div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-3xl border border-white/5 bg-white/[0.02] p-8 shadow-xl">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-white/75 mb-6 italic">Simulation type</h3>
          <div className="space-y-3">
             {[["Prix d&apos;achat", "200k €"], ["Travaux", "20k €"], ["Frais notaire", "16k €"], ["Loyer mensuel", "900 €"]].map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-sm font-bold text-white/60">{k}</span>
                    <span className="text-sm font-black text-white">{v}</span>
                </div>
             ))}
          </div>
        </div>
        <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-8 shadow-xl flex flex-col justify-center text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-2">Résultat brut</p>
            <p className="text-6xl font-black text-white tracking-tighter">4,58 <span className="text-2xl text-emerald-400">%</span></p>
        </div>
      </div>
    </div>
  );
}

function BlockTimeline() {
  const steps = [
    { day: "J", title: "Offre" },
    { day: "J+7", title: "Compromis" },
    { day: "J+45", title: "Prêt" },
    { day: "J+60", title: "Acte" },
    { day: "J+90", title: "Livraison" },
  ];
  return (
    <div className="space-y-12 py-10">
      <div className="relative flex justify-between items-center max-w-4xl mx-auto px-4">
        <div className="absolute left-8 right-8 top-1/2 h-1 bg-white/10 -translate-y-1/2" />
        {steps.map((s, i) => (
          <div key={i} className="relative z-10 flex flex-col items-center group">
            <div className="mb-4 h-12 w-12 rounded-2xl bg-[#030712] border-2 border-brand-gold flex items-center justify-center text-xs font-black text-brand-gold shadow-2xl group-hover:scale-110 transition-transform">
                {s.day}
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-white group-hover:text-brand-gold transition-colors">{s.title}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {["Identité", "Domicile", "Imposition", "Salaire", "Relevés", "Contrat"].map(t => (
            <div key={t} className="flex items-center gap-3 rounded-2xl bg-white/5 border border-white/10 p-4">
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold text-white/80 uppercase tracking-widest">{t}</span>
            </div>
          ))}
      </div>
    </div>
  );
}

function BlockFinancement() {
  return (
    <div className="grid gap-12 lg:grid-cols-2 items-center">
        <div className="relative h-64 w-64 mx-auto">
            <div className="absolute inset-0 rounded-full border-[16px] border-white/5" />
            <div className="absolute inset-0 rounded-full border-[16px] border-brand-gold" style={{ clipPath: 'polygon(50% 50%, 50% 0%, 100% 0%, 100% 50%)' }} />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-4xl font-black text-white">25%</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-brand-gold">Apport</p>
            </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
           {[["Taux endettement", "33%"], ["Reste à vivre", "1500€"], ["Durée max", "25 ans"], ["Assurance", "0.4%"]].map(([k, v]) => (
                <div key={k} className="rounded-2xl bg-white/5 border border-white/10 p-6 text-center">
                    <p className="text-[10px] font-black uppercase tracking-widest text-white/75 mb-2">{k}</p>
                    <p className="text-xl font-black text-white">{v}</p>
                </div>
           ))}
        </div>
    </div>
  );
}

function BlockFiscal() {
  const regimes = [
    { name: "Micro-BIC", sub: "Abattement 50%", border: "border-sky-500/30" },
    { name: "Réel BIC", sub: "Amortissement", border: "border-brand-gold/30" },
    { name: "Foncier", sub: "Déficit foncier", border: "border-emerald-500/30" },
  ];
  return (
    <div className="grid gap-6 md:grid-cols-3">
        {regimes.map(r => (
            <div key={r.name} className={`rounded-3xl border-2 ${r.border} bg-white/5 p-8 text-center shadow-xl hover:-translate-y-2 transition-transform duration-500`}>
                <h3 className="text-xl font-black text-white uppercase tracking-tight mb-2">{r.name}</h3>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold">{r.sub}</p>
                <div className="mt-6 h-1 w-12 bg-white/10 mx-auto rounded-full" />
            </div>
        ))}
    </div>
  );
}

function BlockDiagnostics() {
  const rows = [
    { name: "DPE", valid: "10 ans", alert: false },
    { name: "Amiante", valid: "Illimité*", alert: false },
    { name: "Plomb", valid: "1 an**", alert: true },
    { name: "Termites", valid: "6 mois", alert: true },
    { name: "ERP", valid: "6 mois", alert: true },
  ];
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl">
      <table className="w-full text-left">
        <thead className="bg-white/10">
          <tr>
            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-brand-gold">Type</th>
            <th className="p-6 text-[10px] font-black uppercase tracking-widest text-brand-gold">Validité</th>
            <th className="p-6 text-center text-brand-gold"><AlertTriangle className="w-4 h-4 mx-auto" /></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-white/5 hover:bg-white/[0.02] transition-colors">
              <td className="p-6 text-sm font-black text-white uppercase">{r.name}</td>
              <td className="p-6 text-sm font-bold text-white/60">{r.valid}</td>
              <td className="p-6 text-center">
                {r.alert ? <span className="inline-block h-2 w-2 rounded-full bg-red-500 animate-pulse" /> : <Check className="w-4 h-4 text-emerald-500 mx-auto" />}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function BlockMandats() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
        {["Simple", "Semi-Ex", "Exclusif"].map((t, i) => (
            <div key={t} className="rounded-3xl border border-white/10 bg-white/5 p-8 text-center group hover:border-brand-gold/40 transition-colors">
                <div className="mb-6 mx-auto h-12 w-12 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold font-black">
                    {i + 1}
                </div>
                <h3 className="text-lg font-black text-white uppercase tracking-widest">{t}</h3>
                <p className="mt-4 text-[10px] font-bold text-white/75 uppercase tracking-widest italic">Performance {70 + i*10}%</p>
            </div>
        ))}
    </div>
  );
}

function BlockReseaux() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {["Lundi : Éducatif", "Mardi : Coulisses", "Mercredi : Reel", "Jeudi : Preuve", "Vendredi : Sondage", "Samedi : Bien"].map(d => (
            <div key={d} className="rounded-2xl bg-[#030712] border border-white/10 p-6 flex flex-col gap-2">
                <p className="text-brand-gold font-black uppercase tracking-widest text-[10px]">{d.split(':')[0]}</p>
                <p className="text-white font-bold uppercase tracking-tight">{d.split(':')[1]}</p>
            </div>
        ))}
    </div>
  );
}

function BlockNetVendeur() {
  return (
    <div className="rounded-[2rem] border border-brand-gold/20 bg-brand-gold/5 p-12 text-center shadow-2xl">
        <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-gold mb-4">Focus métier</p>
        <h3 className="text-3xl font-black text-white uppercase tracking-tight italic">&laquo; Vendre au juste prix, <br /> c&apos;est d&apos;abord rassurer &raquo;</h3>
    </div>
  );
}
