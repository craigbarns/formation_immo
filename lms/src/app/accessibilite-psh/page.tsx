import Link from "next/link";
import { ArrowLeft, CheckCircle2, Mail, Phone, ShieldCheck } from "lucide-react";
import { createPublicPageMetadata } from "@/lib/seo";

export const metadata = createPublicPageMetadata({
  title: "Accessibilité des formations aux personnes handicapées",
  description:
    "Conditions d'accès et accompagnement des personnes en situation de handicap pour les formations MonPassFormation.",
  path: "/accessibilite-psh",
});

const commitments = [
  "Étude des besoins spécifiques avant ou au démarrage de la formation",
  "Adaptation possible du parcours, des supports et des modalités de suivi",
  "Échange avec un référent afin d'identifier les aménagements raisonnables",
  "Orientation vers les interlocuteurs compétents lorsque la situation le nécessite",
];

export default function AccessibilitePshPage() {
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
          <ShieldCheck className="h-8 w-8 text-brand-gold" aria-hidden />
          <p className="mt-5 text-sm font-black uppercase text-brand-gold">Accessibilité</p>
          <h1 className="mt-3 text-3xl font-black text-brand-navy sm:text-4xl">
            Conditions d&apos;accès aux personnes en situation de handicap
          </h1>
          <p className="mt-4 text-base leading-7 text-zinc-600">
            PASS Formation s&apos;engage à favoriser l&apos;accès à ses formations aux personnes en
            situation de handicap et à étudier les adaptations nécessaires selon chaque situation.
          </p>
        </section>

        <section className="mt-8 rounded-lg border border-zinc-200 bg-white p-6">
          <h2 className="text-xl font-black text-brand-navy">Engagements</h2>
          <ul className="mt-5 space-y-3">
            {commitments.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-6 text-zinc-600">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8 rounded-lg border border-zinc-200 bg-white p-6">
          <h2 className="text-xl font-black text-brand-navy">Contact référent handicap</h2>
          <p className="mt-3 text-sm leading-6 text-zinc-600">
            Pour signaler un besoin spécifique, contactez l&apos;équipe PASS Formation avant le
            démarrage de la formation.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
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
