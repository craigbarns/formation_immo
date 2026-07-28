import Link from "next/link";
import { ArrowLeft, BookOpen, CheckCircle2, Mail, Phone } from "lucide-react";
import { createPublicPageMetadata } from "@/lib/seo";

export const metadata = createPublicPageMetadata({
  title: "Livret d'accueil",
  description:
    "Livret d'accueil synthétique pour les apprenants MonPassFormation et PASS Formation.",
  path: "/livret-accueil",
});

const items = [
  "Présentation de l'organisme de formation et de son espace digital",
  "Modalités d'inscription, d'accès et de suivi de la formation",
  "Ressources pédagogiques disponibles dans l'espace apprenant",
  "Contacts utiles pour le support pédagogique, administratif et accessibilité",
];

export default function LivretAccueilPage() {
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
          <BookOpen className="h-8 w-8 text-brand-gold" aria-hidden />
          <p className="mt-5 text-sm font-black uppercase text-brand-gold">Accueil apprenant</p>
          <h1 className="mt-3 text-3xl font-black text-brand-navy sm:text-4xl">
            Livret d&apos;accueil
          </h1>
          <p className="mt-4 text-base leading-7 text-zinc-600">
            Ce livret présente les informations essentielles pour démarrer une formation avec PASS
            Formation via l&apos;espace digital MonPassFormation.
          </p>
        </section>

        <section className="mt-8 rounded-lg border border-zinc-200 bg-white p-6">
          <h2 className="text-xl font-black text-brand-navy">Informations essentielles</h2>
          <ul className="mt-5 space-y-3">
            {items.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-zinc-600">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8 rounded-lg border border-zinc-200 bg-white p-6">
          <h2 className="text-xl font-black text-brand-navy">Contact administratif</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="tel:0954467773"
              className="inline-flex items-center gap-2 rounded-lg bg-brand-navy px-5 py-3 text-sm font-black text-white transition hover:bg-brand-navy-mid"
            >
              <Phone className="h-4 w-4" aria-hidden />
              09 54 46 77 73
            </a>
            <a
              href="mailto:contact@passformation.com"
              className="inline-flex items-center gap-2 rounded-lg border border-brand-navy px-5 py-3 text-sm font-black text-brand-navy transition hover:bg-brand-navy hover:text-white"
            >
              <Mail className="h-4 w-4" aria-hidden />
              contact@passformation.com
            </a>
          </div>
        </section>
      </div>
    </main>
  );
}
