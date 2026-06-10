import Link from "next/link";
import { ArrowLeft, Lock, Sparkles } from "lucide-react";
import { StripeButton } from "@/components/StripeButton";
import { getModulePriceCents, getPackPriceCents, PACK_PRODUCT_ID } from "@/data/catalog";
import { formatDuration } from "@/data/course";

function euros(cents: number): string {
  return (cents / 100).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });
}

export function ModuleLockedView({
  moduleSlug,
  moduleTitle,
  moduleSummary,
  lessonsCount,
  durationMin,
  headline,
}: {
  moduleSlug: string;
  moduleTitle: string;
  moduleSummary: string;
  lessonsCount: number;
  durationMin: number;
  headline?: string | null;
}) {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <Link
        href="/formation"
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-brand-gold dark:text-white/60"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Retour au parcours
      </Link>

      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#070d18] p-8 text-white shadow-2xl md:p-12">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.12),transparent_50%)]"
          aria-hidden
        />
        <div className="relative space-y-6">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-400/30 bg-amber-400/10">
              <Lock className="h-6 w-6 text-amber-300" aria-hidden />
            </span>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-300">
              Module verrouillé
            </p>
          </div>

          <h1 className="text-3xl font-black leading-tight md:text-4xl">{moduleTitle}</h1>
          {headline && <p className="text-lg font-bold text-white/90">{headline}</p>}
          <p className="text-base leading-relaxed text-white/60">{moduleSummary}</p>

          <div className="flex flex-wrap gap-2.5 text-2xs font-bold uppercase tracking-wider">
            <span className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-white/80">
              {lessonsCount} leçons
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-white/80">
              {formatDuration(durationMin)}
            </span>
            <span className="rounded-full border border-brand-gold/30 bg-brand-gold/10 px-3.5 py-1 text-brand-gold">
              QCM + attestation
            </span>
          </div>

          <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm font-bold uppercase tracking-wider text-white/60">
              Débloquer ce module
            </p>
            <p className="text-4xl font-black text-brand-gold">{euros(getModulePriceCents())}</p>
            <StripeButton
              products={[moduleSlug]}
              label={`Débloquer ce module — ${euros(getModulePriceCents())}`}
            />
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-brand-gold/20 bg-brand-gold/5 p-5">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" aria-hidden />
            <div className="w-full space-y-2">
              <p className="text-sm font-bold text-white/90">
                Meilleur choix : le pack complet — {euros(getPackPriceCents())}
              </p>
              <p className="text-sm leading-6 text-white/60">
                Tous les modules, actuels et futurs, la certification finale et l&apos;espace
                apprenant complet.
              </p>
              <StripeButton
                products={[PACK_PRODUCT_ID]}
                label={`Tout débloquer — ${euros(getPackPriceCents())}`}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
