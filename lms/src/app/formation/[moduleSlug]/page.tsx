import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { verifyModuleAccess } from "@/lib/access";
import { getModuleCompletion } from "@/lib/module-completion";
import { ModuleLanding } from "@/components/modules/ModuleLanding";
import { ModuleLockedView } from "@/components/modules/ModuleLockedView";
import { ModuleAttestationButton } from "@/components/modules/ModuleAttestationButton";
import { COURSE, getModuleDurationMin } from "@/data/course";
import { getModuleShowcase } from "@/data/module-showcase";
import { getAvatarForModule } from "@/data/module-avatars";
import {
  getLessonModuleListAudioSrc,
  isLessonAudioFilePresent,
} from "@/lib/lesson-audio";

type Props = { params: Promise<{ moduleSlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { moduleSlug } = await params;
  const mod = COURSE.find((m) => m.slug === moduleSlug);
  const showcase = getModuleShowcase(moduleSlug);
  if (!mod || !showcase) return { title: "Module" };
  const shortTitle = mod.title.replace(/^Module \d+ — /, "");
  return {
    title: `${shortTitle} — Formation Agent Immobilier`,
    description: `${showcase.subhead.slice(0, 120)}. ${mod.lessons.length} leçons, QCM certifiant et outils pratiques.`,
    openGraph: {
      title: shortTitle,
      description: showcase.subhead,
      type: "website",
      locale: "fr_FR",
    },
  };
}

export default async function ModulePage({ params }: Props) {
  const { moduleSlug } = await params;
  const mod = COURSE.find((m) => m.slug === moduleSlug);
  if (!mod) notFound();

  const showcase = getModuleShowcase(mod.slug);
  if (!showcase) notFound();

  // Garde serveur (spec §4) : non possédé ⇒ vue verrouillée avec CTA d'achat.
  const access = await verifyModuleAccess(mod.slug);
  if (!access.hasAccess) {
    return (
      <ModuleLockedView
        moduleSlug={mod.slug}
        moduleTitle={mod.title}
        moduleSummary={mod.summary}
        lessonsCount={mod.lessons.length}
        durationMin={getModuleDurationMin(mod.slug)}
        headline={showcase.headline ?? null}
      />
    );
  }

  const modIndex = COURSE.findIndex((m) => m.slug === mod.slug);
  const prevMod = modIndex > 0 ? COURSE[modIndex - 1] : null;
  const nextMod = modIndex < COURSE.length - 1 ? COURSE[modIndex + 1] : null;

  const avatar = getAvatarForModule(mod.slug);
  const firstLesson = mod.lessons[0];
  const completion = await getModuleCompletion(access.user.id, mod.slug);

  const lessons = mod.lessons.map((lesson) => {
    const audioSrc = getLessonModuleListAudioSrc(lesson);
    return {
      slug: lesson.slug,
      title: lesson.title,
      interactive: Boolean(lesson.interactiveScenarioId),
      audioSrc,
      audioFileOk: audioSrc ? isLessonAudioFilePresent(audioSrc) : false,
      duration: lesson.duration,
      difficulty: lesson.difficulty,
      objectives: lesson.objectives,
    };
  });

  return (
    <>
      {completion.completed && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-brand-gold/30 bg-brand-gold/10 px-6 py-4">
          <p className="text-sm font-black uppercase tracking-wider text-brand-gold">
            🎓 Module terminé — votre attestation de suivi est disponible
          </p>
          <ModuleAttestationButton moduleSlug={mod.slug} />
        </div>
      )}
      <ModuleLanding
      moduleSlug={mod.slug}
      moduleTitle={mod.title}
      moduleDescription={mod.description}
      moduleDurationMin={getModuleDurationMin(mod.slug)}
      lessons={lessons}
      showcase={showcase}
      avatar={
        avatar
          ? {
              name: avatar.name,
              role: avatar.role,
              description: avatar.description,
              initials: avatar.initials,
              accentColor: avatar.accentColor,
            }
          : null
      }
      firstLessonHref={`/formation/${mod.slug}/${firstLesson.slug}`}
      flashcardsHref={`/formation/flashcards/${mod.slug}`}
      examenHref={`/formation/examen/${mod.slug}`}
      prevModule={
        prevMod
          ? { href: `/formation/${prevMod.slug}`, title: prevMod.title.replace(/^Module \d+ — /, "") }
          : null
      }
      nextModule={
        nextMod
          ? { href: `/formation/${nextMod.slug}`, title: nextMod.title.replace(/^Module \d+ — /, "") }
          : null
      }
      />
    </>
  );
}
