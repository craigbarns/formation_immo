import Link from "next/link";
import { Calculator, Map, Megaphone, Scale, TrendingUp, ArrowLeft, Sparkles } from "lucide-react";
import { CHEAT_SHEETS, type CheatSheet, type CheatSheetRow } from "@/data/cheat-sheets";
import { COURSE } from "@/data/course";
import { PrintButton } from "./PrintButton";

export const metadata = {
  title: "Aide-mémoire — Fiches de référence | Formation immobilier",
  description:
    "Tables de référence rapides : textes juridiques, deadlines, sanctions, HCSF, fiscalité, portails, BANT/CRAC. Imprimables, à garder en visite.",
};

const ICON_MAP = {
  scale: Scale,
  "trending-up": TrendingUp,
  calculator: Calculator,
  megaphone: Megaphone,
  "map-pin": Map,
} as const;

const TONE_STYLES: Record<NonNullable<CheatSheetRow["tone"]>, string> = {
  warning: "bg-red-500/10 border-red-500/20 text-red-100",
  deadline: "bg-amber-500/10 border-amber-500/20 text-amber-100",
  positive: "bg-emerald-500/10 border-emerald-500/20 text-emerald-100",
  neutral: "bg-white/5 border-white/10 text-white/90",
};

const TONE_VALUE: Record<NonNullable<CheatSheetRow["tone"]>, string> = {
  warning: "text-red-400",
  deadline: "text-amber-400",
  positive: "text-emerald-400",
  neutral: "text-brand-gold",
};

function moduleTitle(moduleSlug: string): string {
  const m = COURSE.find((c) => c.slug === moduleSlug);
  return m?.title.replace(/^Module\s+\d+\s+—\s+/, "") ?? moduleSlug;
}

export default function AideMemoirePage() {
  const grouped = COURSE.map((mod) => ({
    moduleSlug: mod.slug,
    moduleTitle: moduleTitle(mod.slug),
    sheets: CHEAT_SHEETS.filter((s) => s.moduleSlug === mod.slug),
  })).filter((g) => g.sheets.length > 0);

  return (
    <div className="space-y-12 pb-20">
      <Link
        href="/formation"
        className="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-white/40 transition-colors hover:text-brand-gold print:hidden"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Retour au parcours
      </Link>

      {/* Hero */}
      <header className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#070d18] px-8 py-16 shadow-2xl print:hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.1),transparent_70%)] pointer-events-none" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
          aria-hidden
        />
        
        <div className="relative flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-5 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold mb-8">
            <Sparkles className="h-4 w-4 animate-pulse" /> RÉFÉRENTIEL EXPERT
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl uppercase leading-none">
            Aide-mémoire <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-white to-brand-gold">professionnel</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-white/50 leading-relaxed italic font-medium">
            Toutes les deadlines, sanctions et seuils stratégiques concentrés en fiches de terrain. Un arsenal prêt pour l&apos;action.
          </p>

          <div className="mt-12 flex flex-wrap justify-center gap-4">
             <div className="rounded-2xl border border-white/5 bg-white/5 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-white/60 backdrop-blur-xl shadow-xl">
                {CHEAT_SHEETS.length} fiches opérationnelles
             </div>
             <div className="rounded-2xl border border-white/5 bg-white/5 px-6 py-3 text-[10px] font-black uppercase tracking-widest text-white/60 backdrop-blur-xl shadow-xl">
                {grouped.length} thématiques expertes
             </div>
             <PrintButton />
          </div>
        </div>
      </header>

      {/* Sheets grouped by module */}
      <div className="space-y-20">
        {grouped.map((group) => (
          <section key={group.moduleSlug} className="space-y-10 scroll-mt-24">
            <div className="flex items-end justify-between gap-6 border-b border-slate-200 dark:border-white/10 pb-8 print:hidden">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 dark:text-white/20 mb-3">CURRICULUM</p>
                <h2 className="text-3xl font-black text-slate-900 dark:text-white uppercase tracking-tight">{group.moduleTitle}</h2>
              </div>
              <Link
                href={`/formation/${group.moduleSlug}`}
                className="text-[10px] font-black uppercase tracking-widest text-brand-gold hover:text-white transition-colors"
              >
                Accéder au module &rarr;
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              {group.sheets.map((sheet) => (
                <CheatSheetCard key={sheet.id} sheet={sheet} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

function CheatSheetCard({ sheet }: { sheet: CheatSheet }) {
  const Icon = ICON_MAP[sheet.icon];
  return (
    <article
      className="group relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#070d18] shadow-2xl transition-all duration-500 hover:border-brand-gold/20"
    >
      <div 
        className="absolute top-0 left-0 right-0 h-1.5 opacity-60 group-hover:opacity-100 transition-opacity"
        style={{ background: sheet.color }}
      />

      {/* Card header */}
      <header className="flex items-start gap-5 border-b border-white/5 bg-[#030712] px-8 py-8">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border shadow-xl"
          style={{ backgroundColor: `${sheet.color}15`, borderColor: `${sheet.color}40`, color: sheet.color }}
        >
          <Icon className="h-6 w-6" aria-hidden />
        </div>
        <div className="min-w-0 pt-1">
          <h3 className="text-xl font-black uppercase tracking-tight text-white leading-none">
            {sheet.title}
          </h3>
          <p className="mt-3 text-sm font-medium italic text-white/40">&laquo; {sheet.subtitle} &raquo;</p>
        </div>
      </header>

      {/* Sections */}
      <div className="space-y-8 p-8">
        {sheet.sections.map((section) => (
          <div key={section.title}>
            <div className="flex items-center gap-4 mb-6">
                <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 text-center">
                {section.title}
                </h4>
                <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
            <ul className="grid gap-3">
              {section.rows.map((row, idx) => {
                const tone = row.tone ?? "neutral";
                return (
                  <li
                    key={`${section.title}-${idx}`}
                    className={`grid grid-cols-[1fr_auto] items-center gap-6 rounded-2xl border-2 p-5 text-sm transition-all duration-300 ${TONE_STYLES[tone]}`}
                  >
                    <div className="min-w-0">
                      <p className="font-bold leading-snug uppercase tracking-tight">{row.label}</p>
                      {row.detail && (
                        <p className="mt-2 text-xs leading-relaxed font-medium opacity-60 italic">
                          {row.detail}
                        </p>
                      )}
                    </div>
                    <span
                      className={`shrink-0 whitespace-nowrap text-right text-base font-black tabular-nums tracking-tighter ${TONE_VALUE[tone]}`}
                    >
                      {row.value}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      {/* Disclaimer */}
      {sheet.disclaimer && (
        <footer className="border-t border-white/5 bg-black/20 p-6 text-[10px] font-black uppercase tracking-widest text-white/20 italic leading-relaxed">
           Nota : {sheet.disclaimer}
        </footer>
      )}
    </article>
  );
}
