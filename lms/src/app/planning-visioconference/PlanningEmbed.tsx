"use client";

import { useEffect, useRef, useState } from "react";
import { ExternalLink, Maximize2, Minimize2 } from "lucide-react";

const ZOOM_LEVELS = [1, 0.9, 0.8] as const;

type PlanningEmbedProps = {
  src: string;
};

export function PlanningEmbed({ src }: PlanningEmbedProps) {
  const [zoom, setZoom] = useState<(typeof ZOOM_LEVELS)[number]>(1);
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLElement>(null);
  const expandButtonRef = useRef<HTMLButtonElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const ownsNativeFullscreenRef = useRef(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      if (document.fullscreenElement === containerRef.current) {
        ownsNativeFullscreenRef.current = true;
        return;
      }

      if (!document.fullscreenElement && ownsNativeFullscreenRef.current) {
        ownsNativeFullscreenRef.current = false;
        setIsExpanded(false);
        requestAnimationFrame(() => expandButtonRef.current?.focus());
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    if (!isExpanded) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !document.fullscreenElement) {
        setIsExpanded(false);
        requestAnimationFrame(() => expandButtonRef.current?.focus());
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isExpanded]);

  const openExpandedView = async () => {
    setIsExpanded(true);

    try {
      await containerRef.current?.requestFullscreen?.();
    } catch {
      // Le mode fixe reste disponible si le navigateur refuse l'API Fullscreen.
    }
  };

  const closeExpandedView = async () => {
    try {
      if (document.fullscreenElement === containerRef.current) {
        await document.exitFullscreen();
      }
    } catch {
      // La vue agrandie locale doit pouvoir se fermer même si l'API Fullscreen échoue.
    } finally {
      ownsNativeFullscreenRef.current = false;
      setIsExpanded(false);
      requestAnimationFrame(() => expandButtonRef.current?.focus());
    }
  };

  const scaledSize = `${100 / zoom}%`;

  return (
    <section
      ref={containerRef}
      aria-labelledby="planning-table-title"
      className={
        isExpanded
          ? "fixed inset-0 z-[100] flex h-dvh w-screen flex-col bg-white p-2 text-zinc-950 sm:p-4"
          : "mt-4 min-w-0 rounded-xl border border-zinc-200 bg-white p-2 shadow-sm sm:p-3"
      }
    >
      <div className="flex shrink-0 flex-col gap-3 px-1 pb-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 id="planning-table-title" className="text-lg font-black text-brand-navy sm:text-xl">
            Tableau des sessions
          </h2>
          <p className="text-xs leading-5 text-zinc-600 sm:text-sm">
            <span className="hidden sm:inline">
              Réduisez le zoom pour afficher davantage de colonnes.
            </span>
            <span className="sm:hidden">
              Passez en plein écran, gardez 100 % et tournez le téléphone en mode paysage.
            </span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div
            className="inline-flex items-center rounded-lg border border-zinc-200 bg-zinc-50 p-1"
            role="group"
            aria-label="Zoom du planning"
          >
            {ZOOM_LEVELS.map((level) => {
              const label = `${Math.round(level * 100)} %`;

              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => setZoom(level)}
                  aria-label={`Afficher le planning à ${label}`}
                  aria-pressed={zoom === level}
                  className={`min-h-11 rounded-md px-3 py-2 text-xs font-black transition focus-ring-brand sm:text-sm ${
                    zoom === level
                      ? "bg-brand-navy text-white shadow-sm"
                      : "text-zinc-600 hover:bg-white hover:text-brand-navy"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {isExpanded ? (
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeExpandedView}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-brand-navy px-4 py-2.5 text-sm font-black text-white transition hover:bg-brand-navy-mid focus-ring-brand"
            >
              <Minimize2 className="h-4 w-4" aria-hidden />
              Réduire
            </button>
          ) : (
            <button
              ref={expandButtonRef}
              type="button"
              onClick={openExpandedView}
              aria-expanded={isExpanded}
              aria-controls="planning-frame"
              className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-brand-navy px-4 py-2.5 text-sm font-black text-white transition hover:bg-brand-navy-mid focus-ring-brand"
            >
              <Maximize2 className="h-4 w-4" aria-hidden />
              Plein écran
            </button>
          )}

          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-brand-navy px-4 py-2.5 text-sm font-black text-brand-navy transition hover:bg-brand-navy hover:text-white focus-ring-brand"
          >
            Ouvrir Monday
            <ExternalLink className="h-4 w-4" aria-hidden />
          </a>
        </div>
      </div>

      <div
        id="planning-frame"
        className={
          isExpanded
            ? "relative min-h-0 flex-1 overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50"
            : "relative h-[calc(100dvh-13rem)] min-h-[600px] overflow-hidden rounded-lg border border-zinc-200 bg-zinc-50"
        }
      >
        <iframe
          src={src}
          title="Planning des formations en visioconférence"
          width="100%"
          height="100%"
          loading="eager"
          allow="fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          className="absolute inset-0 block max-w-none border-0"
          style={{
            width: scaledSize,
            height: scaledSize,
            transform: `scale(${zoom})`,
            transformOrigin: "top left",
          }}
        />
      </div>
    </section>
  );
}
