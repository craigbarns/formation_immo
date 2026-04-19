"use client";

import dynamic from "next/dynamic";

// Lazy-load heavy components to avoid SSR crashes (leaflet) and large bundles
const MapPrixImmo = dynamic(
  () => import("@/components/maps/MapPrixImmo").then((m) => ({ default: m.MapPrixImmo })),
  { ssr: false, loading: () => <div className="h-[500px] animate-pulse rounded-2xl bg-zinc-100" /> }
);

const MarcheImmoChart = dynamic(
  () => import("@/components/charts/MarcheImmoChart").then((m) => ({ default: m.MarcheImmoChart })),
  { ssr: false, loading: () => <div className="h-[400px] animate-pulse rounded-2xl bg-zinc-100" /> }
);

type Props = { moduleSlug: string; lessonSlug: string };

export function LessonSpecialContent({ moduleSlug, lessonSlug }: Props) {
  // Estimation lesson (transaction/estimation) — show map + charts
  if (moduleSlug === "transaction" && lessonSlug === "estimation") {
    return (
      <div className="space-y-10">
        <section>
          <h2 className="lesson-block-title lesson-block-title--navy">
            <span className="lesson-block-title-line bg-brand-navy/25" aria-hidden />
            Carte des prix immobiliers France 2026
          </h2>
          <p className="mb-4 text-sm text-zinc-600">
            Explorez les prix au m² dans les principales villes françaises. Cliquez sur une ville pour voir ses indicateurs détaillés : prix appartement / maison, loyer moyen et tension locative.
          </p>
          <MapPrixImmo />
        </section>

        <section>
          <h2 className="lesson-block-title lesson-block-title--gold">
            <span className="lesson-block-title-line bg-brand-gold/70" aria-hidden />
            Tendances du marché immobilier
          </h2>
          <p className="mb-4 text-sm text-zinc-600">
            Évolution nationale des prix (2020–2026) et comparatif des rendements locatifs par ville.
          </p>
          <div className="card-elevated p-5">
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
        <h2 className="lesson-block-title lesson-block-title--gold">
          <span className="lesson-block-title-line bg-brand-gold/70" aria-hidden />
          Rendements locatifs par ville
        </h2>
        <p className="mb-4 text-sm text-zinc-600">
          Comparez les rendements bruts et nets dans 18 grandes villes françaises pour affiner votre conseil en investissement.
        </p>
        <div className="card-elevated p-5">
          <MarcheImmoChart />
        </div>
      </section>
    );
  }

  return null;
}
