"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, CheckCircle2, AlertTriangle, Scale, Target, TrendingUp, ShieldCheck, HelpCircle } from "lucide-react";
import type { SupportVisuelMeta } from "@/data/supports-visuels";

const navy = "#1a3a5c";
const gold = "#c9a227";

function LessonLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#1a3a5c]/8 px-4 py-2 text-sm font-semibold text-[#1a3a5c] hover:bg-[#1a3a5c]/12 transition-colors"
    >
      {label} →
    </Link>
  );
}

export function InfographieBlocks({ id, meta }: { id: string; meta: SupportVisuelMeta }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-xl shadow-[#1a3a5c]/[0.03] md:p-10 mb-8 overflow-hidden"
    >
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-zinc-100 pb-8">
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-[#c9a227] flex items-center gap-2">
            <Scale size={14} /> {meta.moduleLabel}
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#1a3a5c] md:text-3xl">{meta.title}</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-600">{meta.summary}</p>
        </div>
      </div>

      <div className="mt-10 mb-8 relative z-10">{renderInteractive(id)}</div>

      <div className="pt-6 border-t border-zinc-100 flex items-center justify-between">
        <LessonLink href={meta.hrefLesson} label="Aller à la Leçon associée" />
      </div>
    </motion.div>
  );
}

function renderInteractive(id: string) {
  switch (id) {
    case "checklist-investisseur":
      return <BlockChecklist />;
    case "matrice-risques":
      return <BlockMatrice />;
    case "cadre-negociation":
      return <BlockNegociation />;
    case "calcul-rentabilite":
      return <BlockRentabilite />;
    case "timeline-juridique":
      return <BlockTimeline />;
    case "structure-financement":
      return <BlockFinancement />;
    case "regimes-fiscaux":
      return <BlockFiscal />;
    default:
      return null;
  }
}

function BlockChecklist() {
  const phases = [
    {
      title: "Avant la visite",
      border: "border-sky-300",
      bg: "bg-sky-50/80",
      items: [
        "Définir budget max",
        "Étudier le quartier",
        "Analyser comparables",
        "Vérifier zonage PLU",
        "Calculer rentabilité",
        "Préparer questions",
      ],
    },
    {
      title: "Pendant la visite",
      border: "border-sky-300",
      bg: "bg-sky-50/80",
      items: [
        "Photos détaillées",
        "Orientation / ensoleillement",
        "Bruits environnants",
        "État des communs",
        "Stationnement",
        "Commerces à proximité",
      ],
    },
    {
      title: "Après la visite",
      border: "border-emerald-300",
      bg: "bg-emerald-50/80",
      items: [
        "Réviser calculs",
        "Estimation travaux",
        "Vérifier diagnostics",
        "Négocier offre",
        "Constituer dossier",
        "Contacter notaire",
      ],
    },
  ];
  return (
    <div className="space-y-10">
      <div className="grid gap-5 md:grid-cols-3">
        {phases.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            className={`rounded-2xl border-2 ${p.border} ${p.bg} p-5 shadow-sm hover:shadow-md transition-shadow`}
          >
            <h3 className="text-center flex flex-col items-center gap-2 text-sm font-bold uppercase tracking-wider text-[#1a3a5c]">
              <CheckCircle2 className={p.title === "Après la visite" ? "text-emerald-500" : "text-sky-500"} />
              {p.title}
            </h3>
            <ul className="mt-4 space-y-3 text-sm font-medium text-zinc-800">
              {p.items.map((t) => (
                <li key={t} className="flex items-start gap-2.5">
                  <input type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 rounded border-zinc-300 text-[#1a3a5c] focus:ring-[#1a3a5c]" />
                  <span className="leading-tight">{t}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
      <div>
        <h3 className="text-center text-sm font-bold uppercase text-[#c9a227]">
          Questions clés à poser
        </h3>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {[
            { who: "Au vendeur", q: ["Motif de la vente ?", "Durée de possession ?", "Travaux récents ?"] },
            { who: "À l’agent", q: ["Délai souhaité ?", "Autres offres ?", "Charges détaillées ?"] },
            { who: "Au syndic", q: ["Travaux prévus ?", "Procès en cours ?", "Budget prévisionnel ?"] },
          ].map((col) => (
            <div key={col.who} className="rounded-lg border border-zinc-200 bg-zinc-50/50 p-4">
              <p className="text-xs font-bold uppercase text-[#1a3a5c]">{col.who}</p>
              <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-zinc-700">
                {col.q.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-xl border border-red-200 bg-red-50/60 p-4">
        <h3 className="text-sm font-bold uppercase text-red-800">Erreurs à éviter</h3>
        <ul className="mt-2 grid gap-2 text-sm text-red-900 sm:grid-cols-2">
          {[
            "Sauter les diagnostics",
            "Sous-estimer les travaux",
            "Négliger les charges de copro",
            "Ignorer le contexte local",
          ].map((t) => (
            <li key={t} className="flex gap-2">
              <span className="text-red-500">✕</span> {t}
            </li>
          ))}
        </ul>
      </div>
      <p className="rounded-lg bg-amber-50 px-4 py-3 text-center text-sm italic text-amber-950">
        Prenez le temps. Un bon investissement ne se précipite pas.
      </p>
    </div>
  );
}

const riskCell = {
  low: "bg-emerald-100/90 text-emerald-950 border-emerald-200",
  mid: "bg-amber-100/90 text-amber-950 border-amber-200",
  high: "bg-red-100/90 text-red-950 border-red-200",
};

function BlockMatrice() {
  const grid: { text: string; note?: string; tone: keyof typeof riskCell }[][] = [
    [
      { text: "Vacance locative", tone: "low" },
      { text: "Défaut de paiement", tone: "mid" },
      { text: "Catastrophe naturelle", note: "[1] [2]", tone: "high" },
    ],
    [
      { text: "Dégradations", tone: "low" },
      { text: "Hausse des charges", tone: "mid" },
      { text: "Marché en baisse", note: "[3] [4] [5]", tone: "high" },
    ],
    [
      { text: "Travaux importants", tone: "mid" },
      { text: "Changement de zone", tone: "high" },
      { text: "Illiquidité", tone: "high" },
    ],
  ];
  const rowLabels = ["Impact faible", "Impact moyen", "Impact élevé"];
  return (
    <div className="grid gap-8 lg:grid-cols-3">
      <div className="lg:col-span-2">
        <p className="mb-2 text-center text-[10px] font-bold uppercase tracking-wide text-zinc-500">
          Probabilité →
        </p>
        <div className="overflow-x-auto rounded-2xl shadow-sm border border-zinc-200">
          <table className="w-full min-w-[320px] border-collapse text-center text-xs">
            <thead>
              <tr className="bg-zinc-100">
                <th className="border border-zinc-200 p-3 text-zinc-500" scope="col" />
                <th className="border border-zinc-200 p-3 font-semibold text-[#1a3a5c]" scope="col">
                  Faible
                </th>
                <th className="border border-zinc-200 p-3 font-semibold text-[#1a3a5c]" scope="col">
                  Moyen
                </th>
                <th className="border border-zinc-200 p-3 font-semibold text-[#1a3a5c]" scope="col">
                  Élevé
                </th>
              </tr>
            </thead>
            <tbody>
              {grid.map((row, ri) => (
                <tr key={rowLabels[ri]}>
                  <th
                    className="border border-zinc-200 bg-zinc-50/80 p-3 text-[10px] font-bold uppercase leading-tight text-zinc-600"
                    scope="row"
                  >
                    {rowLabels[ri]}
                  </th>
                  {row.map((cell) => (
                    <td
                      key={cell.text}
                      className={`border border-zinc-200 p-3 align-middle transition-colors hover:opacity-80 ${riskCell[cell.tone]}`}
                    >
                      <span className="font-medium">{cell.text}</span>
                      {cell.note && (
                        <span className="mt-1 block text-[10px] opacity-80">{cell.note}</span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-bold uppercase text-[#1a3a5c]">Stratégies de mitigation</h3>
          <ol className="mt-2 space-y-2 text-sm text-zinc-700">
            <li>
              <strong className="text-[#1a3a5c]">[1]</strong> Assurance loyers impayés
            </li>
            <li>
              <strong className="text-[#1a3a5c]">[2]</strong> Diagnostic complet
            </li>
            <li>
              <strong className="text-[#1a3a5c]">[3]</strong> Zone tendue privilégiée
            </li>
            <li>
              <strong className="text-[#1a3a5c]">[4]</strong> Fonds de précaution
            </li>
            <li>
              <strong className="text-[#1a3a5c]">[5]</strong> Caution bancaire
            </li>
          </ol>
        </div>
        <div>
          <h3 className="text-sm font-bold uppercase text-[#1a3a5c]">Due diligence</h3>
          <ul className="mt-2 space-y-1.5 text-sm text-zinc-700">
            {[
              "DPE (performance énergétique)",
              "Diagnostic amiante",
              "État parasitaire",
              "Risques naturels",
              "Surface Carrez",
              "Charges de copropriété",
            ].map((t) => (
              <li key={t} className="flex gap-2">
                <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-zinc-300" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function BlockNegociation() {
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div className="flex flex-col items-center gap-6">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="rounded-[2rem] border-4 border-[#1a3a5c] bg-white px-10 py-6 text-center shadow-xl"
        >
          <p className="text-3xl font-black tracking-widest text-[#1a3a5c]">WIN-WIN</p>
          <p className="mt-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">Objectif : valeur bilatérale</p>
        </motion.div>
        <div className="grid w-full max-w-md grid-cols-2 gap-4">
          <motion.div whileHover={{ y: -4 }} className="rounded-2xl border border-sky-400 bg-sky-50 px-4 py-5 text-center text-xs shadow-sm hover:shadow-md transition-shadow">
            <p className="font-bold text-[#1a3a5c] text-sm">DÉLAIS</p>
            <p className="mt-1.5 text-[11px] text-zinc-600">Flexibilité calendaire</p>
          </motion.div>
          <motion.div whileHover={{ y: -4 }} className="rounded-2xl border border-[#1a3a5c] bg-[#1a3a5c]/5 px-4 py-5 text-center text-xs shadow-sm hover:shadow-md transition-shadow">
            <p className="font-bold text-[#1a3a5c] text-sm">PRIX</p>
            <p className="mt-1.5 text-[11px] text-zinc-600">Analyser les comparables</p>
          </motion.div>
          <motion.div whileHover={{ y: -4 }} className="rounded-2xl border border-amber-500 bg-amber-50 px-4 py-5 text-center text-xs shadow-sm hover:shadow-md transition-shadow">
            <p className="font-bold text-[#1a3a5c] text-sm">CONDITIONS</p>
            <p className="mt-1.5 text-[11px] text-zinc-600">Clauses suspensives</p>
          </motion.div>
          <motion.div whileHover={{ y: -4 }} className="rounded-2xl border border-emerald-500 bg-emerald-50 px-4 py-5 text-center text-xs shadow-sm hover:shadow-md transition-shadow">
            <p className="font-bold text-[#1a3a5c] text-sm">GARANTIES</p>
            <p className="mt-1.5 text-[11px] text-zinc-600">Financement assuré</p>
          </motion.div>
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-bold uppercase text-[#1a3a5c]">Techniques clés</h3>
          <ul className="mt-2 space-y-2 text-sm text-zinc-700">
            <li>
              <strong>[1] Ancrage</strong> — premier chiffre mentionné
            </li>
            <li>
              <strong>[2] BATNA</strong> — meilleure alternative à la négociation
            </li>
            <li>
              <strong>[3] Silence</strong> — laissez parler l’autre
            </li>
            <li>
              <strong>[4] Concession</strong> — donnez pour recevoir
            </li>
          </ul>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-red-200 bg-red-50/50 p-3">
            <p className="text-xs font-bold uppercase text-red-800">À éviter</p>
            <ul className="mt-2 space-y-1 text-xs text-red-900">
              <li>« C’est mon dernier prix »</li>
              <li>« Je ne peux pas plus »</li>
              <li>« Prenez ou laissez »</li>
            </ul>
          </div>
          <div className="rounded-lg border border-emerald-200 bg-emerald-50/50 p-3">
            <p className="text-xs font-bold uppercase text-emerald-800">À utiliser</p>
            <ul className="mt-2 space-y-1 text-xs text-emerald-900">
              <li>« Comment pouvons-nous… ? »</li>
              <li>« Qu’est-ce qui compte pour vous ? »</li>
              <li>« Voyons ensemble… »</li>
            </ul>
          </div>
        </div>
        <div className="rounded-lg border border-amber-200 bg-amber-50/80 px-4 py-3 text-sm text-amber-950">
          <strong>Règle d’or :</strong> préparez 3 scénarios — optimal, réaliste, plan B.
        </div>
      </div>
    </div>
  );
}

function BlockRentabilite() {
  return (
    <div className="space-y-8">
      <motion.div 
        whileHover={{ scale: 1.02 }}
        className="rounded-2xl border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-amber-100 p-8 text-center shadow-sm"
      >
        <p className="text-sm font-black tracking-widest flex justify-center items-center gap-2 uppercase text-[#1a3a5c]"><TrendingUp size={18} /> Rentabilité brute</p>
        <p className="mt-4 font-mono text-xl font-bold text-zinc-900 md:text-2xl">
          (Loyer mensuel × 12) ÷ Prix d’achat total × 100
        </p>
        <p className="mt-2 text-sm text-zinc-600">
          Équivalent : loyer annuel ÷ total investi × 100 (ne pas multiplier deux fois par 12).
        </p>
      </motion.div>
      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-zinc-200 bg-zinc-50/50 p-4">
          <h3 className="text-sm font-bold text-[#1a3a5c]">Données (exemple)</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex justify-between">
              <span>Prix d’achat</span>
              <span className="font-medium">200 000 €</span>
            </li>
            <li className="flex justify-between">
              <span>Travaux</span>
              <span className="font-medium">20 000 €</span>
            </li>
            <li className="flex justify-between">
              <span>Frais de notaire</span>
              <span className="font-medium">16 000 €</span>
            </li>
            <li className="flex justify-between">
              <span>Loyer mensuel</span>
              <span className="font-medium">900 €</span>
            </li>
          </ul>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
          <h3 className="text-sm font-bold text-[#1a3a5c]">Calcul</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li className="flex justify-between">
              <span>Total investi</span>
              <span className="font-medium">236 000 €</span>
            </li>
            <li className="flex justify-between">
              <span>Loyer annuel</span>
              <span className="font-medium">10 800 €</span>
            </li>
            <li className="flex justify-between border-t border-emerald-200 pt-2 text-lg font-bold text-emerald-800">
              <span>Rentabilité brute</span>
              <span>4,58 %</span>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <h3 className="text-center text-sm font-bold uppercase text-[#1a3a5c]">
          Ordres de grandeur selon le type
        </h3>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {[
            { l: "Résidence principale", v: "~0 %", c: "bg-zinc-200 text-zinc-800" },
            { l: "Location nue", v: "3–5 %", c: "bg-amber-200 text-amber-950" },
            { l: "Location meublée", v: "5–8 %", c: "bg-emerald-200 text-emerald-950" },
            { l: "Pinel", v: "2–4 %", c: "bg-sky-200 text-sky-950" },
          ].map((x) => (
            <span key={x.l} className={`rounded-full px-3 py-1.5 text-xs font-semibold ${x.c}`}>
              {x.l} : {x.v}
            </span>
          ))}
        </div>
      </div>
      <div className="rounded-lg border border-emerald-300 bg-white p-4 text-sm">
        <p className="font-semibold text-[#1a3a5c]">Rentabilité nette (charges déduites)</p>
        <p className="mt-2 font-mono text-zinc-800">
          Rentabilité brute − (Charges annuelles ÷ Total investi × 100)
        </p>
        <p className="mt-2 text-emerald-800">
          Objectif courant : viser au moins ~3–4 % net pour un investissement locatif viable (selon
          risque et marché).
        </p>
      </div>
    </div>
  );
}

function BlockTimeline() {
  const steps = [
    { day: "J", title: "Offre", sub: "Proposition d’achat" },
    { day: "J+7", title: "Compromis", sub: "Signature chez le notaire" },
    { day: "J+45", title: "Prêt", sub: "Obtention du crédit" },
    { day: "J+60", title: "Acte", sub: "Signature définitive" },
    { day: "J+90", title: "Livraison", sub: "Remise des clés" },
  ];
  return (
    <div className="space-y-8">
      <div className="overflow-x-auto pb-4">
        <div className="relative flex min-w-[640px] items-start justify-between px-4">
          <div className="absolute left-8 right-8 top-5 h-0.5 bg-[#1a3a5c]/30" aria-hidden />
          {steps.map((s) => (
            <div key={s.day} className="relative z-10 flex w-28 flex-col items-center text-center">
              <span className="text-xs font-bold text-[#c9a227]">{s.day}</span>
              <div className="mt-2 h-4 w-4 rounded-full border-4 border-[#c9a227] bg-white shadow" />
              <p className="mt-3 text-sm font-bold text-[#1a3a5c]">{s.title}</p>
              <p className="mt-1 text-[11px] text-zinc-500">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
      <div>
        <h3 className="text-sm font-bold uppercase text-[#1a3a5c]">Documents requis (dossier type)</h3>
        <ul className="mt-3 grid gap-2 sm:grid-cols-2 md:grid-cols-3">
          {[
            "Pièce d’identité",
            "Justificatif de domicile",
            "Avis d’imposition",
            "Bulletins de salaire",
            "Relevés bancaires",
            "Contrat de travail",
          ].map((t) => (
            <li key={t} className="flex gap-2 text-sm text-zinc-700">
              <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-zinc-300" />
              {t}
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm">
        <p className="font-bold text-red-900">Délai de rétractation : 10 jours calendaires</p>
        <p className="mt-1 text-red-800/90">
          À compter de la réception de l’offre ou de l’acte selon le cas — vérifiez toujours le texte
          exact du compromis / de la loi applicable.
        </p>
      </div>
    </div>
  );
}

function BlockFinancement() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center gap-8 md:flex-row md:items-start md:justify-center">
        <div
          className="relative h-48 w-48 shrink-0 rounded-full shadow-inner"
          style={{
            background: `conic-gradient(${gold} 0 90deg, ${navy} 90deg 360deg)`,
          }}
          role="img"
          aria-label="Répartition indicative : 25 % apport, 75 % crédit"
        >
          <div className="absolute inset-8 flex items-center justify-center rounded-full bg-white text-center shadow">
            <span className="text-sm font-bold text-[#1a3a5c]">100 %</span>
          </div>
        </div>
        <div className="grid max-w-lg flex-1 gap-6 sm:grid-cols-2">
          <div>
            <h3 className="text-xs font-bold uppercase text-[#c9a227]">Apport personnel</h3>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-zinc-700">
              <li>Épargne disponible</li>
              <li>Pas de taxation à l’apport</li>
              <li>Réduction des intérêts</li>
              <li>Meilleur taux d’endettement</li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase text-[#1a3a5c]">Crédit immobilier</h3>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-zinc-700">
              <li>Taux négociables</li>
              <li>Durée : souvent 15–25 ans</li>
              <li>Effet de levier</li>
              <li>Charges déductibles (foncier)</li>
            </ul>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-center text-sm font-bold uppercase text-[#1a3a5c]">Indicateurs clés</h3>
        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { k: "Taux d’endettement", v: "≈ 33 %", c: "bg-emerald-100 text-emerald-900" },
            { k: "Reste à vivre", v: "1 500 € min", c: "bg-emerald-100 text-emerald-900" },
            { k: "Durée max", v: "25 ans", c: "bg-amber-100 text-amber-950" },
            { k: "Assurance emprunteur", v: "0,3–0,5 %", c: "bg-zinc-100 text-zinc-800" },
          ].map((x) => (
            <div key={x.k} className={`rounded-xl px-3 py-3 text-center ${x.c}`}>
              <p className="text-[10px] font-semibold uppercase opacity-80">{x.k}</p>
              <p className="mt-1 text-lg font-bold">{x.v}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function BlockFiscal() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            title: "Micro-BIC",
            sub: "Location meublée",
            border: "border-[#1a3a5c]",
            items: [
              "Abattement 50 %",
              "Plafond 77 700 €",
              "Déclaration simplifiée",
              "Pas d’amortissement du bien",
              "Ordre de grandeur fiscal variable",
            ],
          },
          {
            title: "Réel BIC",
            sub: "Location meublée pro",
            border: "border-[#1a3a5c]",
            items: [
              "Charges réelles déductibles",
              "Amortissements possibles",
              "Déficit reportable (règles strictes)",
              "Comptabilité complète",
              "Souvent pour volumes ou travaux importants",
            ],
          },
          {
            title: "Foncier",
            sub: "Location nue",
            border: "border-emerald-500",
            items: [
              "Micro-foncier 30 % ou réel",
              "Charges et travaux selon règles",
              "Déficit foncier selon plafonds",
              "Régime distinct du meublé",
              "Accompagnement conseillé",
            ],
          },
        ].map((b) => (
          <div
            key={b.title}
            className={`flex flex-col rounded-xl border-2 ${b.border} bg-white p-4 shadow-sm`}
          >
            <h3 className="text-lg font-bold text-[#1a3a5c]">{b.title}</h3>
            <p className="text-xs uppercase text-zinc-500">{b.sub}</p>
            <ul className="mt-3 flex-1 list-disc space-y-1.5 pl-4 text-sm text-zinc-700">
              {b.items.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="rounded-lg border border-amber-200 bg-amber-50/80 p-4">
        <h3 className="text-sm font-bold uppercase text-amber-900">Quand choisir quoi ?</h3>
        <ul className="mt-3 space-y-2 text-sm text-amber-950">
          <li>
            <strong>Micro-BIC :</strong> petits revenus locatifs, simplicité — souvent premiers pas.
          </li>
          <li>
            <strong>Réel BIC :</strong> charges et amortissements significatifs — suivi comptable.
          </li>
          <li>
            <strong>Foncier :</strong> location nue, logique patrimoniale long terme.
          </li>
        </ul>
      </div>
      <p className="text-center text-sm italic text-red-800">
        Le choix de régime peut être engagé sur plusieurs années — validez avec un expert-comptable
        avant toute option définitive.
      </p>
    </div>
  );
}
