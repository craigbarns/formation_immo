"use client";

import { useEffect, useRef, useState } from "react";
import { ZONES_PRIX, type ZonePrix } from "@/data/prix-immo";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

// Color by price range
function getPriceColor(prix: number): string {
  if (prix >= 8000) return "#dc2626";   // rouge foncé — très cher
  if (prix >= 5000) return "#ea580c";   // orange foncé
  if (prix >= 4000) return "#d97706";   // orange
  if (prix >= 3500) return "#ca8a04";   // ambre
  if (prix >= 3000) return "#65a30d";   // vert clair
  if (prix >= 2500) return "#16a34a";   // vert
  return "#15803d";                      // vert foncé — abordable
}

function getPriceLabel(prix: number): string {
  if (prix >= 8000) return "Très élevé";
  if (prix >= 5000) return "Élevé";
  if (prix >= 4000) return "Haut";
  if (prix >= 3500) return "Moyen+";
  if (prix >= 3000) return "Moyen";
  if (prix >= 2500) return "Abordable";
  return "Accessible";
}

export function MapPrixImmo() {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<unknown>(null);
  const [selected, setSelected] = useState<ZonePrix | null>(null);
  const [filter, setFilter] = useState<"all" | "haute" | "moyenne" | "basse">("all");
  const selectedRef = useRef(selected);
  selectedRef.current = selected;

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Dynamic import to avoid SSR issues
    import("leaflet").then((L) => {
      // Fix default marker icons
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current!, {
        center: [46.8, 2.3],
        zoom: 6,
        zoomControl: true,
        scrollWheelZoom: false,
      });

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
        maxZoom: 18,
      }).addTo(map);

      ZONES_PRIX.forEach((zone) => {
        const color = getPriceColor(zone.prixMoyen);
        const circle = L.circleMarker([zone.lat, zone.lng], {
          radius: Math.max(8, Math.min(22, zone.prixMoyen / 500)),
          fillColor: color,
          color: "#fff",
          weight: 2,
          opacity: 1,
          fillOpacity: 0.85,
        });

        circle.bindTooltip(
          `<strong>${zone.ville}</strong><br/>${zone.prixMoyen.toLocaleString("fr")} €/m²`,
          { permanent: false, className: "leaflet-tooltip-immo" }
        );

        circle.on("click", () => {
          setSelected(zone);
        });

        circle.addTo(map);
      });

      mapInstanceRef.current = map;
    });

    return () => {
      if (mapInstanceRef.current) {
        (mapInstanceRef.current as { remove: () => void }).remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const filtered = filter === "all" ? ZONES_PRIX : ZONES_PRIX.filter(z => z.tension === filter);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-brand-navy">Carte des prix immobiliers 2026</h3>
          <p className="text-sm text-zinc-500">Cliquez sur une ville pour voir les détails</p>
        </div>
        <div className="flex gap-2">
          {(["all", "haute", "moyenne", "basse"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                filter === t
                  ? "bg-brand-navy text-white"
                  : "border border-zinc-200 bg-white text-zinc-600 hover:border-brand-navy/30"
              }`}
            >
              {t === "all" ? "Toutes" : t === "haute" ? (
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  Forte tension
                </span>
              ) : t === "moyenne" ? (
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                  Moyenne
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  Détendue
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_300px]">
        {/* Map */}
        <div className="relative overflow-hidden rounded-2xl border border-zinc-200 shadow-sm">
          <style>{`
            .leaflet-tooltip-immo {
              background: #1a3a5c;
              color: white;
              border: none;
              border-radius: 8px;
              font-size: 13px;
              font-weight: 600;
              padding: 6px 10px;
              box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            }
            .leaflet-tooltip-immo::before { border-top-color: #1a3a5c; }
          `}</style>
          <div ref={mapRef} style={{ height: 420 }} />
          {/* Legend */}
          <div className="absolute bottom-4 left-4 z-[400] rounded-xl border border-white/80 bg-white/95 p-3 shadow-md backdrop-blur">
            <p className="mb-2 text-2xs font-bold uppercase tracking-wide text-zinc-500">Prix/m²</p>
            {[
              { label: "> 8000€", color: "#dc2626" },
              { label: "5000-8000€", color: "#ea580c" },
              { label: "4000-5000€", color: "#d97706" },
              { label: "3500-4000€", color: "#ca8a04" },
              { label: "3000-3500€", color: "#65a30d" },
              { label: "< 3000€", color: "#16a34a" },
            ].map(({ label, color }) => (
              <div key={label} className="flex items-center gap-2 text-xs text-zinc-700">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: color }} />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        <div className="space-y-3">
          {selected ? (
            <div className="card-elevated p-5">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-xl font-bold text-brand-navy">{selected.ville}</h4>
                  <p className="text-sm text-zinc-500">Dép. {selected.departement} · Zone {selected.zone.replace("_", "")}</p>
                </div>
                <span
                  className="rounded-full px-2.5 py-0.5 text-xs font-bold text-white"
                  style={{ backgroundColor: getPriceColor(selected.prixMoyen) }}
                >
                  {getPriceLabel(selected.prixMoyen)}
                </span>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {[
                  { label: "Appart.", value: `${selected.prixMoyen.toLocaleString("fr")} €/m²` },
                  { label: "Maison", value: `${selected.prixMaison.toLocaleString("fr")} €/m²` },
                  { label: "Loyer", value: `${selected.loyer} €/m²/mois` },
                  {
                    label: "Évol. 1 an",
                    value: `${selected.evolution1an > 0 ? "+" : ""}${selected.evolution1an}%`,
                    color: selected.evolution1an > 0 ? "text-emerald-600" : "text-red-600",
                  },
                ].map(({ label, value, color }) => (
                  <div key={label} className="rounded-xl bg-zinc-50 p-3">
                    <p className="text-2xs font-bold uppercase tracking-wide text-zinc-400">{label}</p>
                    <p className={`mt-0.5 text-base font-bold text-brand-navy ${color ?? ""}`}>{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-3 rounded-xl border border-brand-gold/30 bg-amber-50/60 p-3">
                <p className="text-xs font-bold text-brand-navy">Tension locative</p>
                <p className={`mt-0.5 text-sm font-semibold ${
                  selected.tension === "haute" ? "text-red-600" :
                  selected.tension === "moyenne" ? "text-amber-600" : "text-emerald-600"
                }`}>
                  {selected.tension === "haute" ? (
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-red-500" />
                      Forte — forte demande
                    </span>
                  ) : selected.tension === "moyenne" ? (
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-amber-400" />
                      Modérée — marché équilibré
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      Faible — marché détendu
                    </span>
                  )}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/50 p-8 text-center">
              <EmojiIcon emoji="🗺️" className="h-10 w-10 text-zinc-400" />
              <p className="mt-3 text-sm font-medium text-zinc-500">Cliquez sur une ville pour voir ses statistiques détaillées</p>
            </div>
          )}

          {/* Top 5 rendement */}
          <div className="card-elevated p-4">
            <p className="mb-3 text-xs font-bold uppercase tracking-wide text-zinc-400">Top rendement brut</p>
            {filtered.slice(0, 5).sort((a, b) => b.loyer / b.prixMoyen - a.loyer / a.prixMoyen).map((z) => (
              <button
                key={z.ville}
                onClick={() => setSelected(z)}
                className="flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-sm transition hover:bg-zinc-50"
              >
                <span className="font-medium text-zinc-800">{z.ville}</span>
                <span className="font-bold text-emerald-600">
                  {((z.loyer * 12 / z.prixMoyen) * 100).toFixed(1)}%
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
