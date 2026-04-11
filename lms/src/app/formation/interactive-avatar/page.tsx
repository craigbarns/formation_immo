import { FormationShell } from "@/components/FormationShell";
import { LessonDidCoachSection } from "@/components/did/LessonDidCoachSection";
import { Info, Sparkles } from "lucide-react";

export default function InteractiveAvatarPage() {
  return (
    <FormationShell>
      <div className="mx-auto mt-6 max-w-6xl space-y-8">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-navy to-sky-900 px-8 py-10 text-white shadow-xl">
          <div className="absolute -right-10 -top-10 text-white/10">
            <Sparkles size={200} />
          </div>

          <div className="relative z-10 max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-widest text-brand-gold">
              Avatars D-ID
            </p>
            <h1 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              Scripts vocaux, TTS et vidéos présentateur
            </h1>
            <p className="mt-4 text-sky-100">
              Même logique que pour les leçons outillées : beats à lire au micro (TTS puis D-ID), plus des
              idées de questions pour le coach texte intégré au parcours.
            </p>
          </div>
        </div>

        <LessonDidCoachSection
          moduleSlug="juridique"
          lessonSlug="loi-alur"
          moduleTitle="Module 1 — Juridique & conformité"
          lessonTitle="Loi ALUR — panorama 2026"
        />

        <div className="flex items-start gap-4 rounded-xl border border-sky-100 bg-sky-50 px-6 py-5">
          <Info className="mt-1 shrink-0 text-sky-600" />
          <p className="text-sm leading-relaxed text-sky-900">
            <strong>Astuce :</strong> ajoutez des entrées dans{" "}
            <code className="rounded bg-white/80 px-1">lesson-avatar-scripts.ts</code> pour d’autres
            couples module/leçon — le bloc pourra ensuite être réutilisé sur les pages leçon si vous
            l’importez côté <code className="rounded bg-white/80 px-1">[lessonSlug]/page.tsx</code>.
          </p>
        </div>
      </div>
    </FormationShell>
  );
}
