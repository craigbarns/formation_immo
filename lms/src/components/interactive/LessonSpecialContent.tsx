"use client";

import dynamic from "next/dynamic";

// Lazy-load heavy components to avoid SSR crashes (leaflet) and large bundles
const MapPrixImmo = dynamic(
  () => import("@/components/maps/MapPrixImmo").then((m) => ({ default: m.MapPrixImmo })),
  { ssr: false, loading: () => <div className="h-[500px] animate-pulse rounded-[2.5rem] bg-white/5 border border-white/10" /> }
);

const MarcheImmoChart = dynamic(
  () => import("@/components/charts/MarcheImmoChart").then((m) => ({ default: m.MarcheImmoChart })),
  { ssr: false, loading: () => <div className="h-[400px] animate-pulse rounded-[2.5rem] bg-white/5 border border-white/10" /> }
);

type Props = { moduleSlug: string; lessonSlug: string };

export function LessonSpecialContent({ moduleSlug, lessonSlug }: Props) {
  // Estimation lesson (transaction/estimation) — show map + charts
  if (moduleSlug === "transaction" && lessonSlug === "estimation") {
    return (
      <div className="space-y-12">
        <section>
          <h2 className="lesson-block-title text-white">
            <span className="lesson-block-title-line bg-brand-gold/30" aria-hidden />
            Carte des prix immobiliers France 2026
          </h2>
          <p className="mb-6 text-base text-white/50 font-medium italic">
            Explorez les prix au m² dans les principales villes françaises. Cliquez sur une ville pour voir ses indicateurs détaillés : prix appartement / maison, loyer moyen et tension locative.
          </p>
          <div className="rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
            <MapPrixImmo />
          </div>
        </section>

        <section>
          <h2 className="lesson-block-title text-white">
            <span className="lesson-block-title-line bg-brand-gold/50" aria-hidden />
            Tendances du marché immobilier
          </h2>
          <p className="mb-6 text-base text-white/50 font-medium italic">
            Évolution nationale des prix (2020–2026) et comparatif des rendements locatifs par ville.
          </p>
          <div className="rounded-[2.5rem] border border-white/10 bg-[#070d18] p-8 shadow-2xl">
            <MarcheImmoChart />
          </div>
        </section>
      </div>
    );
  }

  // Rentabilite lesson (financement/rentabilite) — charts only
  if (moduleSlug === "financement" && lessonSlug === "rentabilite") {
    return (
      <section>
        <h2 className="lesson-block-title text-white">
          <span className="lesson-block-title-line bg-brand-gold/50" aria-hidden />
          Rendements locatifs par ville
        </h2>
        <p className="mb-6 text-base text-white/50 font-medium italic">
          Comparez les rendements bruts et nets dans 18 grandes villes françaises pour affiner votre conseil en investissement.
        </p>
        <div className="rounded-[2.5rem] border border-white/10 bg-[#070d18] p-8 shadow-2xl">
          <MarcheImmoChart />
        </div>
      </section>
    );
  }

  return null;
}
