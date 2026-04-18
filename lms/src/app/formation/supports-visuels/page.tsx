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
import { CoachChat } from "@/components/supports-visuels/CoachChat";
import { SUPPORTS_VISUELS } from "@/data/supports-visuels";

type Theme = (typeof SUPPORTS_VISUELS)[number]["theme"];

const THEME_LABEL: Record<Theme, string> = {
  investissement: "Investissement",
  negociation: "Négociation",
  credit: "Crédit",
  juridique: "Juridique",
  fiscalite: "Fiscalité",
};

// Couleurs sémantiques cohérentes pour chaque thème
const THEME_PALETTE: Record<
  Theme,
  { chip: string; chipHover: string; ring: string; dot: string; soft: string; text: string; accent: string }
> = {
  investissement: {
    chip: "bg-emerald-50 text-emerald-900 border-emerald-200",
    chipHover: "hover:bg-emerald-100 hover:border-emerald-400",
    ring: "ring-emerald-400/40",
    dot: "bg-emerald-500",
    soft: "bg-emerald-50/60",
    text: "text-emerald-700",
    accent: "#10b981",
  },
  negociation: {
    chip: "bg-amber-50 text-amber-900 border-amber-200",
    chipHover: "hover:bg-amber-100 hover:border-amber-400",
    ring: "ring-amber-400/40",
    dot: "bg-amber-500",
    soft: "bg-amber-50/60",
    text: "text-amber-700",
    accent: "#f59e0b",
  },
  credit: {
    chip: "bg-sky-50 text-sky-900 border-sky-200",
    chipHover: "hover:bg-sky-100 hover:border-sky-400",
    ring: "ring-sky-400/40",
    dot: "bg-sky-500",
    soft: "bg-sky-50/60",
    text: "text-sky-700",
    accent: "#0ea5e9",
  },
  juridique: {
    chip: "bg-indigo-50 text-indigo-900 border-indigo-200",
    chipHover: "hover:bg-indigo-100 hover:border-indigo-400",
    ring: "ring-indigo-400/40",
    dot: "bg-indigo-500",
    soft: "bg-indigo-50/60",
    text: "text-indigo-700",
    accent: "#6366f1",
  },
  fiscalite: {
    chip: "bg-violet-50 text-violet-900 border-violet-200",
    chipHover: "hover:bg-violet-100 hover:border-violet-400",
    ring: "ring-violet-400/40",
    dot: "bg-violet-500",
    soft: "bg-violet-50/60",
    text: "text-violet-700",
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

  // Barre de progression sticky
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

  // Regroupement par thème pour le sommaire
  const byTheme = (Object.keys(THEME_LABEL) as Theme[])
    .map((theme) => ({
      theme,
      sheets: SUPPORTS_VISUELS.filter((s) => s.theme === theme),
    }))
    .filter((g) => g.sheets.length > 0);

  return (
    <div className="space-y-12">
      {/* Barre de progression sticky */}
      <div className="fixed left-0 right-0 top-0 z-50 h-1 bg-transparent">
        <motion.div
          className="h-full bg-gradient-to-r from-brand-gold to-amber-400"
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />
      </div>

      {/* Breadcrumb */}
      <Link
        href="/formation"
        className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-brand-navy"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden /> Retour au parcours
      </Link>

      {/* Hero premium */}
      <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-navy via-[#244b75] to-[#0f2540] px-6 py-10 text-white shadow-2xl md:px-10 md:py-12">
        {/* Pattern décoratif */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-gold/15 blur-3xl"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -bottom-32 -left-16 h-72 w-72 rounded-full bg-sky-300/10 blur-3xl"
          aria-hidden
        />

        <div className="relative">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-gold/40 bg-brand-gold/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-brand-gold">
            <Sparkles className="h-3.5 w-3.5" aria-hidden /> Ressources élèves
          </p>
          <h1 className="mt-4 text-3xl font-black leading-[1.1] tracking-tight md:text-4xl">
            Supports visuels & fiches opérationnelles
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80">
            Chaque fiche existe en <strong className="font-semibold text-white">version web interactive</strong>{" "}
            (cocher, relire, zoomer) et en <strong className="font-semibold text-white">image HD téléchargeable</strong>{" "}
            pour vos prises de notes ou présentations. Les formules ont été revues pour éviter les
            ambiguïtés — par exemple la rentabilité brute.
          </p>

          {/* Stats */}
          <div className="mt-6 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">
            <StatCell value={SUPPORTS_VISUELS.length} label="fiches" />
            <StatCell value={byTheme.length} label="thématiques" />
            <StatCell value="100%" label="interactives" />
            <StatCell value="HD" label="téléchargeables" />
          </div>
        </div>
      </header>

      {/* Filtres / sommaire par thème */}
      <nav
        aria-label="Sommaire par thème"
        className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:p-7"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-navy/10">
              <Filter className="h-5 w-5 text-brand-navy" />
            </div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-brand-gold">
                Filtrer par thème
              </p>
              <h2 className="mt-0.5 text-lg font-bold text-brand-navy">
                Naviguez par thématique
              </h2>
            </div>
          </div>
          {activeTheme && (
            <button
              onClick={() => setActiveTheme(null)}
              className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-600 transition-colors hover:bg-zinc-100"
            >
              <X className="h-3 w-3" /> Réinitialiser
            </button>
          )}
        </div>

        <div className="mt-6 flex flex-wrap gap-2.5">
          {byTheme.map((group) => {
            const palette = THEME_PALETTE[group.theme];
            const Icon = THEME_ICON[group.theme];
            const isActive = activeTheme === group.theme;
            return (
              <button
                key={group.theme}
                onClick={() => setActiveTheme(isActive ? null : group.theme)}
                className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all ${
                  isActive
                    ? `${palette.chip} ring-2 ${palette.ring} shadow-md`
                    : `bg-white text-zinc-600 border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50`
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? palette.text : "text-zinc-400"}`} />
                {THEME_LABEL[group.theme]}
                <span className={`ml-1 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                  isActive ? "bg-white/60" : "bg-zinc-100 text-zinc-500"
                }`}>
                  {group.sheets.length}
                </span>
              </button>
            );
          })}
        </div>

        {activeTheme && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-sm text-zinc-500"
          >
            Affichage de {filteredSheets.length} fiche{filteredSheets.length > 1 ? "s" : ""} sur {SUPPORTS_VISUELS.length}
          </motion.p>
        )}
      </nav>

      {/* Liste des fiches */}
      <AnimatePresence mode="wait">
        <motion.ol
          key={activeTheme ?? "all"}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35 }}
          className="space-y-12"
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
                <div className="mb-5 flex flex-wrap items-center gap-3">
                  <span
                    className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-black text-white shadow-lg"
                    style={{ backgroundColor: palette.accent }}
                    aria-label={`Fiche numéro ${globalIndex + 1}`}
                  >
                    {String(globalIndex + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider ${palette.chip}`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {THEME_LABEL[meta.theme]}
                  </span>
                  <span className="text-[11px] text-zinc-400">
                    Fiche {globalIndex + 1} sur {SUPPORTS_VISUELS.length}
                  </span>
                  <button className="ml-auto inline-flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-500 transition-all hover:border-zinc-300 hover:text-brand-navy hover:shadow-sm">
                    <Download className="h-3.5 w-3.5" />
                    Télécharger HD
                  </button>
                </div>
                <InfographieBlocks id={meta.id} meta={meta} themeColor={palette.accent} />
              </motion.li>
            );
          })}
        </motion.ol>
      </AnimatePresence>

      {/* Footer + cross-links */}
      <section className="grid gap-4 md:grid-cols-3">
        <Link
          href="/formation/aide-memoire"
          className="group flex items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-navy/30 hover:shadow-md"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-navy/10 text-brand-navy">
            <FileSpreadsheet className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-brand-navy">Aide-mémoire</p>
            <p className="mt-0.5 text-xs leading-relaxed text-zinc-600">
              9 fiches imprimables : textes, deadlines, sanctions.
            </p>
            <p className="mt-2 text-xs font-semibold text-brand-navy/70 group-hover:text-brand-navy">
              Consulter →
            </p>
          </div>
        </Link>

        <Link
          href="/formation/outils"
          className="group flex items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-navy/30 hover:shadow-md"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-gold/15 text-brand-gold">
            <Wrench className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-brand-navy">Simulateurs</p>
            <p className="mt-0.5 text-xs leading-relaxed text-zinc-600">
              Crédit, rentabilité, capacité, net vendeur.
            </p>
            <p className="mt-2 text-xs font-semibold text-brand-navy/70 group-hover:text-brand-navy">
              Lancer un simulateur →
            </p>
          </div>
        </Link>

        <Link
          href="/formation/flashcards/juridique"
          className="group flex items-start gap-4 rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-0.5 hover:border-brand-navy/30 hover:shadow-md"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-brand-navy">Flashcards</p>
            <p className="mt-0.5 text-xs leading-relaxed text-zinc-600">
              360 cartes, révision espacée par leçon.
            </p>
            <p className="mt-2 text-xs font-semibold text-brand-navy/70 group-hover:text-brand-navy">
              Réviser →
            </p>
          </div>
        </Link>
      </section>

      {/* Disclaimer */}
      <div className="rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/80 p-5 text-center text-sm leading-relaxed text-zinc-600">
        Ces contenus sont pédagogiques et ne remplacent pas un conseil personnalisé
        (notaire, expert-comptable, banque).
      </div>

      <CoachChat moduleSlug="supports-visuels" lessonSlug="fiches" lessonTitle="Supports visuels & fiches opérationnelles" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

function StatCell({ value, label }: { value: string | number; label: string }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/8 px-3 py-3 text-center backdrop-blur-sm">
      <p className="text-2xl font-black leading-none tracking-tight text-white">
        {value}
      </p>
      <p className="mt-1.5 text-[10px] font-medium uppercase tracking-wider text-white/65">
        {label}
      </p>
    </div>
  );
}
