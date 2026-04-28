"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Banknote,
  Briefcase,
  Download,
  FileSpreadsheet,
  Filter,
  Gavel,
  HandCoins,
  Sparkles,
  Wrench,
  X,
} from "lucide-react";
import { InfographieBlocks } from "@/components/supports-visuels/InfographieBlocks";

import { SUPPORTS_VISUELS } from "@/data/supports-visuels";

type Theme = (typeof SUPPORTS_VISUELS)[number]["theme"];

const THEME_LABEL: Record<Theme, string> = {
  investissement: "Investissement",
  negociation: "Négociation",
  credit: "Crédit",
  juridique: "Juridique",
  fiscalite: "Fiscalité",
};

// Couleurs sémantiques cohérentes pour chaque thème (Dark Mode Optimized)
const THEME_PALETTE: Record<
  Theme,
  { chip: string; chipHover: string; ring: string; dot: string; soft: string; text: string; accent: string }
> = {
  investissement: {
    chip: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    chipHover: "hover:bg-emerald-500/20 hover:border-emerald-500/40",
    ring: "ring-emerald-500/30",
    dot: "bg-emerald-400",
    soft: "bg-emerald-900/10",
    text: "text-emerald-300",
    accent: "#10b981",
  },
  negociation: {
    chip: "bg-amber-500/10 text-brand-gold border-brand-gold/20",
    chipHover: "hover:bg-amber-500/20 hover:border-brand-gold/40",
    ring: "ring-amber-500/30",
    dot: "bg-brand-gold",
    soft: "bg-amber-900/10",
    text: "text-brand-gold",
    accent: "#f59e0b",
  },
  credit: {
    chip: "bg-sky-500/10 text-sky-300 border-sky-500/20",
    chipHover: "hover:bg-sky-500/20 hover:border-sky-500/40",
    ring: "ring-sky-500/30",
    dot: "bg-sky-400",
    soft: "bg-sky-900/10",
    text: "text-sky-300",
    accent: "#0ea5e9",
  },
  juridique: {
    chip: "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
    chipHover: "hover:bg-indigo-500/20 hover:border-indigo-500/40",
    ring: "ring-indigo-500/30",
    dot: "bg-indigo-400",
    soft: "bg-indigo-900/10",
    text: "text-indigo-300",
    accent: "#6366f1",
  },
  fiscalite: {
    chip: "bg-violet-500/10 text-violet-300 border-violet-500/20",
    chipHover: "hover:bg-violet-500/20 hover:border-violet-500/40",
    ring: "ring-violet-500/30",
    dot: "bg-violet-400",
    soft: "bg-violet-900/10",
    text: "text-violet-300",
    accent: "#8b5cf6",
  },
};

const THEME_ICON: Record<Theme, React.ComponentType<{ className?: string }>> = {
  investissement: Briefcase,
  negociation: HandCoins,
  credit: Banknote,
  juridique: Gavel,
  fiscalite: FileSpreadsheet,
};

export default function SupportsVisuelsPage() {
  const [activeTheme, setActiveTheme] = useState<Theme | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const filteredSheets = activeTheme
    ? SUPPORTS_VISUELS.filter((s) => s.theme === activeTheme)
    : SUPPORTS_VISUELS;

  const byTheme = (Object.keys(THEME_LABEL) as Theme[])
    .map((theme) => ({
      theme,
      sheets: SUPPORTS_VISUELS.filter((s) => s.theme === theme),
    }))
    .filter((g) => g.sheets.length > 0);

  return (
    <div className="space-y-12">
      <div className="fixed left-0 right-0 top-0 z-[60] h-1 bg-transparent">
        <motion.div
          className="h-full bg-gradient-to-r from-brand-gold via-white to-brand-gold shadow-[0_0_10px_rgba(212,175,55,0.5)]"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      <Link
        href="/formation"
        className="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-brand-gold"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden /> Retour au parcours
      </Link>

      <header className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#070d18] px-8 py-12 text-white shadow-2xl md:px-12 md:py-16">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-brand-gold/10 blur-[100px]"
          aria-hidden
        />

        <div className="relative">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold">
            <Sparkles className="h-4 w-4 animate-pulse" aria-hidden /> Ressources d&apos;excellence
          </p>
          <h1 className="mt-8 text-4xl font-black leading-tight tracking-tight md:text-5xl lg:text-6xl uppercase">
            Supports <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-white to-brand-gold">visuels</span>
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/60 md:text-xl">
            Retrouvez ici l&apos;intégralité de vos <strong className="text-white">fiches opérationnelles</strong>. 
            Optimisées pour la consultation web et le téléchargement HD, elles constituent votre arsenal de terrain.
          </p>

          <div className="mt-10 grid max-w-3xl grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCell value={SUPPORTS_VISUELS.length} label="fiches" />
            <StatCell value={byTheme.length} label="thématiques" />
            <StatCell value="100%" label="interactives" />
            <StatCell value="HD" label="téléchargeables" />
          </div>
        </div>
      </header>

      <nav
        aria-label="Sommaire par thème"
        className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl shadow-2xl"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-gold/20 border border-brand-gold/30 shadow-lg">
              <Filter className="h-6 w-6 text-brand-gold" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">
                Organisation
              </p>
              <h2 className="text-xl font-black text-white uppercase tracking-tight">
                Filtrer par thématique
              </h2>
            </div>
          </div>
          {activeTheme && (
            <button
              onClick={() => setActiveTheme(null)}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-widest text-white transition hover:bg-white/10 hover:border-white/20"
            >
              <X className="h-3 w-3" /> Réinitialiser
            </button>
          )}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {byTheme.map((group) => {
            const palette = THEME_PALETTE[group.theme];
            const Icon = THEME_ICON[group.theme];
            const isActive = activeTheme === group.theme;
            return (
              <button
                key={group.theme}
                onClick={() => setActiveTheme(isActive ? null : group.theme)}
                className={`inline-flex items-center gap-3 rounded-2xl border px-5 py-3 text-sm font-black uppercase tracking-widest transition-all ${
                  isActive
                    ? `${palette.chip} ring-2 ${palette.ring} shadow-xl scale-105`
                    : `bg-white/5 text-white/60 border-white/10 hover:border-white/30 hover:bg-white/10`
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? palette.text : "text-white/30"}`} />
                {THEME_LABEL[group.theme]}
                <span className={`ml-2 rounded-full px-2 py-0.5 text-[10px] font-black ${
                  isActive ? "bg-white/20 text-white" : "bg-black/20 text-white/40"
                }`}>
                  {group.sheets.length}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      <AnimatePresence mode="wait">
        <motion.ol
          key={activeTheme ?? "all"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35 }}
          className="space-y-16"
        >
          {filteredSheets.map((meta, i) => {
            const palette = THEME_PALETTE[meta.theme];
            const Icon = THEME_ICON[meta.theme];
            const globalIndex = SUPPORTS_VISUELS.findIndex((s) => s.id === meta.id);
            return (
              <motion.li
                key={meta.id}
                id={meta.id}
                className="scroll-mt-24"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <div className="mb-6 flex flex-wrap items-center gap-4">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-black text-white shadow-2xl border border-white/10"
                    style={{ backgroundColor: palette.accent }}
                    aria-label={`Fiche numéro ${globalIndex + 1}`}
                  >
                    {globalIndex + 1}
                  </span>
                  <div>
                      <div className="flex items-center gap-3">
                        <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-widest ${palette.chip}`}>
                            <Icon className="h-3 w-3" />
                            {THEME_LABEL[meta.theme]}
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/20">
                            Ressource {globalIndex + 1} / {SUPPORTS_VISUELS.length}
                        </span>
                      </div>
                  </div>
                  <button
                    onClick={async () => {
                      const url = `/formation-infographies/${meta.imageFile}`;
                      const res = await fetch(url);
                      const blob = await res.blob();
                      const a = document.createElement("a");
                      a.href = URL.createObjectURL(blob);
                      a.download = meta.imageFile;
                      a.click();
                      URL.revokeObjectURL(a.href);
                    }}
                    className="ml-auto group inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-white/80 transition hover:bg-white hover:text-brand-navy hover:scale-105 shadow-xl"
                  >
                    <Download className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                    Télécharger HD
                  </button>
                </div>
                <InfographieBlocks id={meta.id} meta={meta} themeColor={palette.accent} />
              </motion.li>
            );
          })}
        </motion.ol>
      </AnimatePresence>

      <section className="grid gap-6 md:grid-cols-3">
        <Link
          href="/formation/aide-memoire"
          className="group flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-[#070d18] p-8 shadow-2xl transition-all duration-500 hover:border-brand-gold/30 hover:-translate-y-1"
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white shadow-xl group-hover:bg-brand-gold/10 group-hover:text-brand-gold transition-colors">
            <FileSpreadsheet className="h-7 w-7" />
          </div>
          <div>
            <p className="text-lg font-black text-white uppercase tracking-tight">Aide-mémoire</p>
            <p className="mt-2 text-sm leading-relaxed text-white/50">
              9 fiches imprimables synthétisant textes de loi, deadlines et sanctions ALUR.
            </p>
            <p className="mt-6 text-[10px] font-black uppercase tracking-widest text-brand-gold transition-transform group-hover:translate-x-1">
              Consulter la base →
            </p>
          </div>
        </Link>

        <Link
          href="/formation/outils"
          className="group flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-[#070d18] p-8 shadow-2xl transition-all duration-500 hover:border-brand-gold/30 hover:-translate-y-1"
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white shadow-xl group-hover:bg-brand-gold/10 group-hover:text-brand-gold transition-colors">
            <Wrench className="h-7 w-7" />
          </div>
          <div>
            <p className="text-lg font-black text-white uppercase tracking-tight">Simulateurs</p>
            <p className="mt-2 text-sm leading-relaxed text-white/50">
              Calculez rentabilité, capacité d&apos;emprunt et frais de notaire en temps réel.
            </p>
            <p className="mt-6 text-[10px] font-black uppercase tracking-widest text-brand-gold transition-transform group-hover:translate-x-1">
              Lancer un outil →
            </p>
          </div>
        </Link>

        <Link
          href="/formation/flashcards/juridique"
          className="group flex flex-col gap-6 rounded-[2rem] border border-white/10 bg-[#070d18] p-8 shadow-2xl transition-all duration-500 hover:border-brand-gold/30 hover:-translate-y-1"
        >
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/5 border border-white/10 text-white shadow-xl group-hover:bg-brand-gold/10 group-hover:text-brand-gold transition-colors">
            <Sparkles className="h-7 w-7" />
          </div>
          <div>
            <p className="text-lg font-black text-white uppercase tracking-tight">Flashcards</p>
            <p className="mt-2 text-sm leading-relaxed text-white/50">
              Maîtrisez les concepts clés grâce à notre système de révision par répétition espacée.
            </p>
            <p className="mt-6 text-[10px] font-black uppercase tracking-widest text-brand-gold transition-transform group-hover:translate-x-1">
              Commencer la session →
            </p>
          </div>
        </Link>
      </section>

      <div className="rounded-[2rem] border border-dashed border-white/20 bg-white/5 p-8 text-center text-sm leading-relaxed text-white/40 italic">
        Nota : Ces supports constituent une base pédagogique d&apos;excellence mais ne se substituent pas à une consultation juridique ou notariale personnalisée.
      </div>
    </div>
  );
}

function StatCell({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-5 text-center backdrop-blur-xl shadow-xl">
      <p className="text-3xl font-black leading-none tracking-tighter text-white">
        {value}
      </p>
      <p className="mt-2 text-[10px] font-black uppercase tracking-widest text-white/30">
        {label}
      </p>
    </div>
  );
}
