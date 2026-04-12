import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ModuleLanding } from "@/components/modules/ModuleLanding";
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
    title: shortTitle,
    description: showcase.subhead.slice(0, 160),
  };
}

export default async function ModulePage({ params }: Props) {
  const { moduleSlug } = await params;
  const mod = COURSE.find((m) => m.slug === moduleSlug);
  if (!mod) notFound();

  const showcase = getModuleShowcase(mod.slug);
  if (!showcase) notFound();

  const modIndex = COURSE.findIndex((m) => m.slug === mod.slug);
  const prevMod = modIndex > 0 ? COURSE[modIndex - 1] : null;
  const nextMod = modIndex < COURSE.length - 1 ? COURSE[modIndex + 1] : null;

  const avatar = getAvatarForModule(mod.slug);
  const firstLesson = mod.lessons[0];

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
  );
}
