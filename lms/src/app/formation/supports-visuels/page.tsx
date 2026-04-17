import type { Metadata } from "next";
import Link from "next/link";
import { InfographieBlocks } from "@/components/supports-visuels/InfographieBlocks";
import { SUPPORTS_VISUELS } from "@/data/supports-visuels";

export const metadata: Metadata = {
  title: "Supports visuels & fiches",
  description:
    "Infographies interactives : investissement, négociation, financement, fiscalité et parcours juridique.",
};

const themeStyles: Record<(typeof SUPPORTS_VISUELS)[number]["theme"], string> = {
  investissement: "bg-emerald-100 text-emerald-900",
  negociation: "bg-amber-100 text-amber-900",
  credit: "bg-sky-100 text-sky-900",
  juridique: "bg-indigo-100 text-indigo-900",
  fiscalite: "bg-violet-100 text-violet-900",
};

const themeLabel: Record<(typeof SUPPORTS_VISUELS)[number]["theme"], string> = {
  investissement: "Investissement",
  negociation: "Négociation",
  credit: "Crédit",
  juridique: "Juridique",
  fiscalite: "Fiscalité",
};

export default function SupportsVisuelsPage() {
  return (
    <div>
      <Link href="/formation" className="text-sm text-zinc-500 hover:text-brand-navy">
        ← Retour au parcours
      </Link>

      <header className="mt-6 rounded-2xl border border-zinc-200 bg-gradient-to-br from-brand-navy to-[#0f2438] p-8 text-white shadow-lg">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-gold">
          Ressources élèves
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">
          Supports visuels & fiches opérationnelles
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/85">
          Chaque fiche existe en <strong>version web interactive</strong> (cocher, relire, zoomer)
          et en <strong>image HD téléchargeable</strong> pour vos prises de notes ou présentations.
          Les formules ont été revues pour éviter les ambiguïtés (ex. rentabilité brute).
        </p>
      </header>

      <nav
        className="mt-8 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm"
        aria-label="Accès rapide aux fiches"
      >
        <p className="text-xs font-bold uppercase text-zinc-500">Accès rapide</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {SUPPORTS_VISUELS.map((s) => (
            <li key={s.id}>
              <a
                href={`#${s.id}`}
                className="inline-block rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-brand-navy transition hover:border-brand-navy/40 hover:bg-brand-navy/5"
              >
                {s.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <ol className="mt-12 space-y-16">
        {SUPPORTS_VISUELS.map((meta, i) => (
          <li key={meta.id} id={meta.id} className="scroll-mt-24">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-navy text-sm font-bold text-white">
                {i + 1}
              </span>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${themeStyles[meta.theme]}`}
              >
                {themeLabel[meta.theme]}
              </span>
            </div>
            <InfographieBlocks id={meta.id} meta={meta} />
          </li>
        ))}
      </ol>

      <div className="mt-16 rounded-xl border border-dashed border-zinc-300 bg-zinc-50 p-6 text-center text-sm text-zinc-600">
        Ces contenus sont pédagogiques et ne remplacent pas un conseil personnalisé (notaire,
        expert-comptable, banque).
        <div className="mt-4">
          <Link href="/formation/outils" className="font-semibold text-brand-navy hover:underline">
            Voir aussi les simulateurs interactifs →
          </Link>
        </div>
      </div>
    </div>
  );
}
