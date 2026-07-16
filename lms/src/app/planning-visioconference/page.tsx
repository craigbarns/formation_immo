import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, CalendarDays, Video } from "lucide-react";
import { PlanningEmbed } from "./PlanningEmbed";

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
    <main className="min-h-screen overflow-x-hidden bg-zinc-50 px-3 py-3 text-zinc-950 sm:px-5 sm:py-5">
      <div className="mx-auto max-w-[1800px]">
        <header className="overflow-hidden rounded-xl bg-brand-navy text-white shadow-sm">
          <div className="flex flex-col gap-4 px-5 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-xs font-bold text-white/75 transition hover:text-white sm:text-sm"
              >
                <ArrowLeft className="h-4 w-4" aria-hidden />
                Retour à l&apos;accueil
              </Link>
              <div className="mt-3 flex items-center gap-3 text-xs font-black uppercase tracking-wide text-brand-gold sm:text-sm">
                <Video className="h-5 w-5" aria-hidden />
                Sessions en direct
              </div>
              <h1 className="mt-1 text-2xl font-black sm:text-3xl">
                Planning des formations en visioconférence
              </h1>
            </div>
            <div className="flex items-center gap-4 lg:max-w-xl">
              <CalendarDays className="hidden h-12 w-12 shrink-0 text-brand-gold/70 sm:block" aria-hidden />
              <p className="text-sm leading-6 text-white/75">
                Utilisez le zoom ou le plein écran pour consulter plus facilement les programmes,
                tarifs et dates des prochaines sessions.
              </p>
            </div>
          </div>
        </header>

        <PlanningEmbed src={PLANNING_URL} />
      </div>
    </main>
  );
}
