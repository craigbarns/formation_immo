import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarDays, ExternalLink, Video } from "lucide-react";

const PLANNING_URL =
  "https://view.monday.com/embed/1732532920-6e2f86790be067a6b92fe3e71b08641c?r=euc1";

export const metadata: Metadata = {
  title: "Planning des formations en visioconférence",
  description:
    "Consultez le planning des prochaines formations en visioconférence proposées par PASS Formation.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PlanningVisioconferencePage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-zinc-50 px-5 py-8 text-zinc-950 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-navy transition hover:text-brand-navy-mid"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden />
            Retour à l&apos;accueil
          </Link>

          <a
            href={PLANNING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-brand-navy px-4 py-2.5 text-center text-sm font-black text-brand-navy transition hover:bg-brand-navy hover:text-white sm:w-auto"
          >
            <span className="sm:hidden">Ouvrir le planning</span>
            <span className="hidden sm:inline">Ouvrir dans un nouvel onglet</span>
            <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
        </div>

        <section className="mt-8 overflow-hidden rounded-xl bg-brand-navy text-white shadow-sm">
          <div className="grid gap-6 px-6 py-8 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <div className="flex items-center gap-3 text-sm font-black uppercase tracking-wide text-brand-gold">
                <Video className="h-5 w-5" aria-hidden />
                Sessions en direct
              </div>
              <h1 className="mt-4 text-3xl font-black sm:text-4xl lg:text-5xl">
                Planning des formations en visioconférence
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-7 text-white/80 sm:text-lg">
                Consultez les prochaines dates de formation et retrouvez les informations des
                sessions proposées par PASS Formation.
              </p>
            </div>
            <CalendarDays className="hidden h-20 w-20 text-brand-gold/70 lg:block" aria-hidden />
          </div>
        </section>

        <section
          className="mt-8 min-w-0 rounded-xl border border-zinc-200 bg-white p-3 shadow-sm sm:p-5"
          aria-labelledby="planning-embed-title"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 px-1">
            <div>
              <h2 id="planning-embed-title" className="text-xl font-black text-brand-navy">
                Calendrier des sessions
              </h2>
              <p className="mt-1 text-sm leading-6 text-zinc-600">
                Le planning ci-dessous est mis à jour directement depuis Monday.
              </p>
            </div>
          </div>

          <div className="min-w-0 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50">
            <iframe
              src={PLANNING_URL}
              title="Planning des formations en visioconférence"
              width="100%"
              height="720"
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              className="block h-[70vh] min-h-[500px] max-h-[900px] w-full max-w-full"
            />
          </div>

          <p className="px-1 pt-4 text-sm leading-6 text-zinc-600">
            Si le calendrier ne s&apos;affiche pas, utilisez le lien{" "}
            <a
              href={PLANNING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-brand-navy underline decoration-brand-gold decoration-2 underline-offset-4"
            >
              ouvrir le planning dans un nouvel onglet
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
