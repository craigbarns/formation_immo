import Link from "next/link";
import { Calculator, Map, Megaphone, Scale, TrendingUp } from "lucide-react";
import { CHEAT_SHEETS, type CheatSheet, type CheatSheetRow } from "@/data/cheat-sheets";
import { COURSE } from "@/data/course";
import { PrintButton } from "./PrintButton";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

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
  warning: "bg-rose-50 border-rose-200 text-rose-900",
  deadline: "bg-amber-50 border-amber-200 text-amber-900",
  positive: "bg-emerald-50 border-emerald-200 text-emerald-900",
  neutral: "bg-white border-zinc-200 text-zinc-900",
};

const TONE_VALUE: Record<NonNullable<CheatSheetRow["tone"]>, string> = {
  warning: "text-rose-700",
  deadline: "text-amber-700",
  positive: "text-emerald-700",
  neutral: "text-brand-navy",
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
    <div className="space-y-12">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-navy via-[var(--brand-navy-mid)] to-[var(--brand-navy-hero)] px-6 py-10 text-white shadow-2xl md:px-10 md:py-12 print:hidden">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
          aria-hidden
        />
        <nav className="mb-6 flex items-center gap-2 text-sm text-white/80">
          <Link href="/formation" className="transition hover:text-white">
            Parcours
          </Link>
          <span>/</span>
          <span className="text-white">Aide-mémoire</span>
        </nav>
        <div className="flex items-start gap-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-3xl shadow-inner ring-1 ring-white/20">
            <EmojiIcon emoji="📑" className="h-8 w-8" />
          </div>
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
              Fiches de référence rapide
            </p>
            <h1 className="mt-1 text-3xl font-black leading-tight tracking-tight md:text-4xl">
              Aide-mémoire pro
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/85">
              Les chiffres, deadlines, sanctions et seuils que vous devez connaître par
              cœur — concentrés en {CHEAT_SHEETS.length} fiches imprimables. À plastifier,
              à garder en visite ou en RDV.
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 font-medium">
                {CHEAT_SHEETS.length} fiches
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 font-medium">
                {grouped.length} modules couverts
              </span>
              <PrintButton />
            </div>
          </div>
        </div>
      </section>

      {/* Sheets grouped by module */}
      {grouped.map((group) => (
        <section key={group.moduleSlug} className="space-y-6">
          <div className="flex items-baseline justify-between gap-4 border-b border-zinc-200 pb-3 print:hidden">
            <h2 className="text-2xl font-bold text-brand-navy">{group.moduleTitle}</h2>
            <Link
              href={`/formation/${group.moduleSlug}`}
              className="text-sm font-medium text-brand-navy/70 hover:text-brand-navy"
            >
              Voir le module →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {group.sheets.map((sheet) => (
              <CheatSheetCard key={sheet.id} sheet={sheet} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function CheatSheetCard({ sheet }: { sheet: CheatSheet }) {
  const Icon = ICON_MAP[sheet.icon];
  return (
    <article
      className="cheat-card overflow-hidden card-elevated"
      style={{ borderTopWidth: 4, borderTopColor: sheet.color }}
    >
      {/* Card header */}
      <header className="flex items-start gap-3 border-b border-zinc-100 px-5 py-4">
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${sheet.color}15`, color: sheet.color }}
        >
          <Icon className="h-5 w-5" aria-hidden />
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-bold leading-tight text-brand-navy">
            {sheet.title}
          </h3>
          <p className="mt-0.5 text-xs leading-relaxed text-zinc-600">{sheet.subtitle}</p>
        </div>
      </header>

      {/* Sections */}
      <div className="space-y-4 px-5 py-4">
        {sheet.sections.map((section) => (
          <div key={section.title}>
            <h4 className="mb-2 text-3xs font-bold uppercase tracking-wider text-zinc-500">
              {section.title}
            </h4>
            <ul className="space-y-1.5">
              {section.rows.map((row, idx) => {
                const tone = row.tone ?? "neutral";
                return (
                  <li
                    key={`${section.title}-${idx}`}
                    className={`grid grid-cols-[1fr_auto] items-start gap-3 rounded-lg border px-3 py-2 text-sm ${TONE_STYLES[tone]}`}
                  >
                    <div className="min-w-0">
                      <p className="font-medium leading-snug">{row.label}</p>
                      {row.detail && (
                        <p className="mt-0.5 text-xs leading-snug opacity-80">
                          {row.detail}
                        </p>
                      )}
                    </div>
                    <span
                      className={`shrink-0 whitespace-nowrap text-right text-sm font-bold tabular-nums ${TONE_VALUE[tone]}`}
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
        <footer className="border-t border-zinc-100 bg-zinc-50 px-5 py-3 text-3xs italic leading-relaxed text-zinc-500">
          {sheet.disclaimer}
        </footer>
      )}
    </article>
  );
}
