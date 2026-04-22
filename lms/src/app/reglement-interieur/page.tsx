import Link from "next/link";
import { AlertTriangle, ArrowLeft, CheckCircle2, FileCheck2, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Règlement intérieur | MonPassFormation",
  description:
    "Règlement intérieur synthétique applicable aux apprenants des formations MonPassFormation.",
};

const rules = [
  "Respecter les consignes pédagogiques, les horaires et les modalités de formation communiquées",
  "Ne pas diffuser, revendre ou modifier les supports pédagogiques sans autorisation",
  "Utiliser l'espace apprenant et les outils mis à disposition uniquement dans le cadre de la formation",
  "Respecter les échanges avec les formateurs, l'équipe administrative et les autres apprenants",
];

export default function ReglementInterieurPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-5 py-12 text-zinc-950 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-navy transition hover:text-brand-navy-mid"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Retour à l&apos;accueil
        </Link>

        <section className="mt-8 rounded-lg bg-white p-6 shadow-sm sm:p-8">
          <FileCheck2 className="h-8 w-8 text-brand-gold" aria-hidden />
          <p className="mt-5 text-sm font-black uppercase text-brand-gold">Cadre apprenant</p>
          <h1 className="mt-3 text-3xl font-black text-brand-navy sm:text-4xl">
            Règlement intérieur
          </h1>
          <p className="mt-4 text-base leading-7 text-zinc-600">
            Ce règlement synthétise les règles essentielles applicables aux apprenants inscrits à
            une formation via MonPassFormation.
          </p>
        </section>

        <section className="mt-8 rounded-lg border border-zinc-200 bg-white p-6">
          <h2 className="flex items-center gap-2 text-xl font-black text-brand-navy">
            <ShieldCheck className="h-5 w-5 text-brand-gold" aria-hidden />
            Règles principales
          </h2>
          <ul className="mt-5 space-y-3">
            {rules.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-zinc-600">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-6">
          <h2 className="flex items-center gap-2 text-xl font-black text-amber-900">
            <AlertTriangle className="h-5 w-5" aria-hidden />
            Sanctions possibles
          </h2>
          <p className="mt-3 text-sm leading-6 text-amber-900/80">
            Tout comportement contraire au bon déroulement de la formation peut entraîner un rappel,
            un avertissement ou une suspension d&apos;accès selon la gravité des faits.
          </p>
        </section>
      </div>
    </main>
  );
}
