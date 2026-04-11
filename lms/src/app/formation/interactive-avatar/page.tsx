import { FormationShell } from "@/components/FormationShell";
import { HeyGenCoachSection } from "@/components/heygen/HeyGenCoachSection";
import { getHeyGenInteractive } from "@/data/heygen-interactive";
import { Info, Sparkles } from "lucide-react";

export default async function InteractiveAvatarPage() {
  const config = getHeyGenInteractive("juridique", "loi-alur");

  return (
    <FormationShell>
      <div className="mx-auto mt-6 max-w-6xl space-y-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#1a3a5c] to-sky-900 px-8 py-10 text-white shadow-xl">
          <div className="absolute -right-10 -top-10 text-white/10">
            <Sparkles size={200} />
          </div>

          <div className="relative z-10 max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-[#d4af37]">
              HeyGen intégré
            </p>
            <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              Coach interactif — même expérience que sur les leçons
            </h1>
            <p className="mt-4 text-sky-100">
              Même bloc que sur les leçons configurées : conversation avec l&apos;avatar dans
              l&apos;embed LiveAvatar (voix ou texte).
            </p>
          </div>
        </div>

        {config ? (
          <HeyGenCoachSection
            moduleSlug="juridique"
            lessonSlug="loi-alur"
            moduleTitle="Module 1 — Juridique & conformité"
            lessonTitle="Loi ALUR — panorama 2026"
            config={config}
          />
        ) : (
          <p className="text-sm text-zinc-600">Configuration HeyGen indisponible.</p>
        )}

        <div className="flex items-start gap-4 rounded-xl border border-sky-100 bg-sky-50 px-6 py-5">
          <Info className="mt-1 shrink-0 text-sky-600" />
          <p className="text-sm leading-relaxed text-sky-900">
            <strong>Idées pédagogiques :</strong> contextes différents par leçon via{" "}
            <code className="rounded bg-white/80 px-1">LIVEAVATAR_LESSON_CONTEXTS</code>, ou
            enchaînement « dialogue avatar → quiz » sur la même page leçon.
          </p>
        </div>
      </div>
    </FormationShell>
  );
}
