import type { Metadata } from "next";
import Link from "next/link";
import { Clock } from "lucide-react";
import { notFound } from "next/navigation";
import { getLesson, getPrevNext, lessonId, COURSE, type Lesson } from "@/data/course";
import { getInteractiveScenario } from "@/data/interactive-scenarios";
import { getAvatarForModule } from "@/data/module-avatars";
import { getVisuals, type LessonVisuals } from "@/data/lesson-keyconcepts";
import { getLessonAudioPlaybackSrc, getLessonAlignmentUrl } from "@/lib/lesson-audio";
import { getCaseStudies } from "@/data/case-studies";
import { getChatRoleplay } from "@/data/chat-roleplay";
import { getDragDropExercises } from "@/data/drag-drop-exercises";
import { getProChecklists } from "@/data/pro-checklists";
import { getQuizCheckpoints, type QuizCheckpoint } from "@/data/quiz-checkpoints";
import { getTimelines } from "@/data/timeline-data";
import { getTrainerCallouts } from "@/data/trainer-callouts";
import { getDataTables } from "@/data/data-tables";
import { getGuidedCalculations } from "@/data/guided-calculations";
import { VideoEmbed } from "@/components/VideoEmbed";
import { LessonProgress } from "@/components/LessonProgress";
import { LessonTimer } from "@/components/gamification/LessonTimer";
import { ModuleTimeTracker } from "@/components/gamification/ModuleTimeTracker";
import { LessonPresenterPanel } from "@/components/avatars/LessonPresenterPanel";
import { LessonNotes } from "@/components/interactive/LessonNotes";
import { QuizCheckpointsSection } from "@/components/interactive/QuizCheckpointsSection";
import { TrainerCalloutBlock } from "@/components/interactive/TrainerCallout";
import { LessonMap } from "@/components/interactive/LessonMap";
import { PrintableRecap } from "@/components/interactive/PrintableRecap";
import { LessonSpecialContent } from "@/components/interactive/LessonSpecialContent";
import { ScrollReveal } from "@/components/animations";
import {
  InteractiveScenario,
  CaseStudyBlock,
  ChatRoleplay,
  DragDropExerciseBlock,
  InteractiveTimelineBlock,
  ProChecklistBlock,
  DataTableBlock,
  GuidedCalculationBlock,
} from "./LessonDynamicComponents";
import { BookmarkButton } from "@/components/user-content/BookmarkButton";
import { NotesPanelButton } from "./NotesPanelButton";
import { LessonJourneyBadge } from "@/components/LessonJourneyBadge";
import { AICoachButton } from "@/components/ai-coach";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { ScrollProgress } from "@/components/ScrollProgress";
import { getResolvedAudioQuizSchedule, type ResolvedAudioQuizItem } from "@/data/audio-quiz-schedule";
import { buildVisualsFromScript, buildRecapFromScript } from "@/lib/lesson-script-parser";
import { CinematicPlayer } from "@/components/audio/CinematicPlayerLazy";
/* ------------------------------------------------------------------ */
/*  Fallbacks interactifs — rend le CinematicPlayer utile pour       */
/*  TOUTES les leçons, même celles sans visuals ni audioQuiz manuel   */
/* ------------------------------------------------------------------ */

function buildFallbackVisuals(lesson: Lesson): LessonVisuals {
  // Essaie d'abord de parser le script markdown pour des visuals riches
  const fromScript = lesson.scriptFile ? buildVisualsFromScript(lesson.scriptFile) : null;
  if (fromScript && fromScript.keyConcepts.length >= 3) {
    return fromScript;
  }
  // Fallback minimal avec les objectifs
  const icons = ["target", "zap", "shield", "star", "check-circle", "heart", "map-pin"];
  return {
    keyConcepts: lesson.objectives.slice(0, 5).map((obj, i) => ({
      icon: icons[i % icons.length],
      title: `Objectif ${i + 1}`,
      description: obj,
      type: "tip" as const,
    })),
    takeaways: lesson.objectives,
  };
}

function buildFallbackAudioQuiz(
  moduleSlug: string,
  lessonSlug: string,
  checkpoints: QuizCheckpoint[]
): ResolvedAudioQuizItem[] {
  const manual = getResolvedAudioQuizSchedule(moduleSlug, lessonSlug);
  if (manual.length > 0) return manual;
  if (checkpoints.length === 0) return [];
  // Distribution équilibrée sur la piste audio (évite 0.0 et 1.0)
  const ratios =
    checkpoints.length === 1
      ? [0.5]
      : checkpoints.length === 2
      ? [0.35, 0.7]
      : checkpoints.length === 3
      ? [0.25, 0.55, 0.8]
      : [0.2, 0.4, 0.6, 0.8];
  return checkpoints.slice(0, ratios.length).map((cp, i) => ({
    pauseAtRatio: ratios[i],
    checkpoint: cp,
  }));
}

type Props = { params: Promise<{ moduleSlug: string; lessonSlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { moduleSlug, lessonSlug } = await params;
  const result = getLesson(moduleSlug, lessonSlug);
  if (!result) return { title: "Leçon non trouvée" };
  const { module: mod, lesson } = result;
  return {
    title: `${lesson.title} — ${mod.title} | Formation Agent Immobilier`,
    description: `${lesson.objectives.join(" ").slice(0, 150)} — Leçon ${lesson.duration}min du module ${mod.title}.`,
    openGraph: {
      title: lesson.title,
      description: lesson.objectives.join(" "),
      type: "article",
      locale: "fr_FR",
    },
  };
}

export const dynamic = "force-dynamic";

export default async function LessonPage({ params }: Props) {
  const { moduleSlug, lessonSlug } = await params;
  const result = getLesson(moduleSlug, lessonSlug);
  if (!result) notFound();

  const { module: mod, lesson } = result;
  const key = lessonId(moduleSlug, lessonSlug);
  const nav = getPrevNext(moduleSlug, lessonSlug);
  const moduleIndex = COURSE.findIndex((m) => m.slug === moduleSlug);
  const moduleInfo = {
    slug: moduleSlug,
    title: mod.title,
    number: moduleIndex + 1,
    lessonKeys: mod.lessons.map((l) => lessonId(moduleSlug, l.slug)),
    isLast: moduleIndex === COURSE.length - 1,
  };
  const interactive =
    lesson.interactiveScenarioId != null
      ? getInteractiveScenario(lesson.interactiveScenarioId)
      : null;
  const audioSrc = getLessonAudioPlaybackSrc(lesson);
  const alignmentUrl = getLessonAlignmentUrl(lesson);
  const avatar = getAvatarForModule(moduleSlug);
  const lessonVisuals = getVisuals(moduleSlug, lessonSlug);
  const visualsForPlayer = lessonVisuals ?? buildFallbackVisuals(lesson);
  const caseStudies = getCaseStudies(moduleSlug, lessonSlug);
  const dragDropExercises = getDragDropExercises(moduleSlug, lessonSlug);
  const timelines = getTimelines(moduleSlug, lessonSlug);
  const proChecklists = getProChecklists(moduleSlug, lessonSlug);
  const chatRoleplay = getChatRoleplay(moduleSlug, lessonSlug);
  const quizCheckpoints = getQuizCheckpoints(moduleSlug, lessonSlug);
  const audioQuizSchedule = buildFallbackAudioQuiz(moduleSlug, lessonSlug, quizCheckpoints);
  const trainerCallouts = getTrainerCallouts(moduleSlug, lessonSlug);
  const dataTables = getDataTables(moduleSlug, lessonSlug);
  const guidedCalculations = getGuidedCalculations(moduleSlug, lessonSlug);
  const recapData = lesson.scriptFile ? buildRecapFromScript(lesson.scriptFile) : null;
  const hasInteractiveWorkshop =
    dragDropExercises.length > 0 ||
    caseStudies.length > 0 ||
    timelines.length > 0 ||
    proChecklists.length > 0 ||
    chatRoleplay != null;

  return (
    <div>
      <ReadingProgressBar />
      <ScrollProgress />
      {/* Avatar banner - now part of the premium flow */}
      {avatar && (
        <div className="mb-4">
          <LessonPresenterPanel
            moduleSlug={moduleSlug}
            lessonTitle={lesson.title}
            isAudioPlaying={false}
          />
        </div>
      )}

      {/* Hero Section Masterclass - Refonte Incroyable */}
      <div className="relative mb-12 overflow-hidden rounded-3xl bg-brand-navy shadow-2xl ring-1 ring-brand-gold/20">
        {/* Gradients pour la profondeur */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1a2b] via-brand-navy to-brand-navy-deep opacity-90" aria-hidden="true" />
        <div className="absolute right-0 top-0 -mr-32 -mt-32 h-96 w-96 rounded-full bg-brand-gold/15 blur-[120px] pointer-events-none" aria-hidden="true" />
        <div className="absolute left-0 bottom-0 -ml-32 -mb-32 h-80 w-80 rounded-full bg-blue-500/10 blur-[100px] pointer-events-none" aria-hidden="true" />
        
        <div className="relative flex flex-col lg:flex-row lg:items-stretch justify-between">
          <div className="flex-1 p-6 md:p-10 lg:p-12 flex flex-col justify-between">
            <div>
              {/* Breadcrumb premium */}
              <nav className="mb-6 flex items-center gap-2 text-[11px] font-bold tracking-[0.15em] text-white/50 uppercase" aria-label="Fil d'Ariane">
                <Link href="/formation" className="transition hover:text-brand-gold">Parcours</Link>
                <span>/</span>
                <Link href={`/formation/${mod.slug}`} className="transition hover:text-brand-gold">{mod.title.replace(/^Module (\d+) — /, "M$1 · ")}</Link>
              </nav>

              <p className="mb-3 text-sm font-bold uppercase tracking-[0.2em] text-brand-gold drop-shadow-sm">{mod.title}</p>
              <h1 className="mb-8 text-3xl font-extrabold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl lg:leading-[1.1]">
                {lesson.title}
              </h1>

              {/* Badges fusionnés (Gamification & Data) */}
              <div className="flex flex-wrap items-center gap-3 text-sm text-white/90">
                {/* Timer lié à Supabase */}
                <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md font-medium ring-1 ring-white/5">
                  <LessonTimer lessonKey={key} moduleSlug={moduleSlug} />
                </div>
                {lesson.duration && (
                  <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md font-medium ring-1 ring-white/5">
                    <Clock className="w-4 h-4 text-brand-gold" />
                    <span>{Math.floor(lesson.duration / 60) > 0 ? `${Math.floor(lesson.duration / 60)}h ` : ""}{lesson.duration % 60 > 0 ? `${lesson.duration % 60}min` : ""}</span>
                  </div>
                )}
                {lesson.difficulty && (
                  <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-md flex items-center gap-2 ring-1 ring-white/5">
                    <span className="flex h-2 w-2 rounded-full bg-brand-gold shadow-[0_0_8px_rgba(212,175,55,0.8)]"></span>
                    <span className="font-semibold">{lesson.difficulty === "avance" ? "Avancé" : lesson.difficulty === "intermediaire" ? "Intermédiaire" : "Débutant"}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions toolbar (Boutons revus) */}
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <BookmarkButton
                moduleSlug={moduleSlug}
                lessonSlug={lessonSlug}
                lessonTitle={lesson.title}
                moduleTitle={mod.title}
                variant="button"
              />
              <NotesPanelButton moduleSlug={moduleSlug} lessonSlug={lessonSlug} />
              <PrintableRecap
                moduleTitle={mod.title}
                lessonTitle={lesson.title}
                avatarName={avatar?.name}
                objectives={lesson.objectives}
                introduction={recapData?.introduction}
                sections={recapData?.sections}
                keyTerms={recapData?.keyTerms}
              />
              <div className="ml-auto lg:ml-4">
                <AICoachButton 
                  moduleSlug={moduleSlug}
                  lessonSlug={lessonSlug}
                  lessonTitle={lesson.title}
                  variant="inline"
                />
              </div>
            </div>
          </div>

          {/* Objectifs card inside hero (right side) */}
          {lesson.objectives && lesson.objectives.length > 0 && (
            <div className="w-full lg:max-w-sm p-6 md:p-10 bg-black/20 backdrop-blur-xl border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col justify-center">
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.1em] text-brand-gold/90">
                Dans cette leçon, maîtrisez :
              </p>
              <ul className="space-y-4">
                {lesson.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-white/90">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-gold/20 text-[10px] text-brand-gold ring-1 ring-brand-gold/40 mt-0.5">✓</span>
                    <span className="leading-snug">{obj}</span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 pt-6 border-t border-white/10">
                <LessonJourneyBadge moduleSlug={moduleSlug} lessonSlug={lessonSlug} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lesson navigation map */}
      <div className="mt-6">
        <LessonMap
          hasVideo={!!lesson.videoUrl}
          hasScenario={!!interactive}
          hasQuiz={quizCheckpoints.length > 0}
          hasExercises={dragDropExercises.length > 0}
          hasTimeline={timelines.length > 0}
          hasChecklist={proChecklists.length > 0}
          hasRoleplay={chatRoleplay != null}
          hasCalculation={guidedCalculations.length > 0}
          hasTable={dataTables.length > 0}
        />
      </div>

      <div className="mt-10 space-y-10">
        {interactive ? (
          <ScrollReveal>
          <section id="section-scenario">
            <h2 className="lesson-block-title lesson-block-title--navy text-white">
              <span className="lesson-block-title-line bg-brand-gold/30" aria-hidden />
              Parcours interactif
            </h2>
            <p className="mb-6 max-w-2xl text-base leading-relaxed text-white/50">
              {interactive.description}
            </p>
            <InteractiveScenario scenario={interactive} />
          </section>
          </ScrollReveal>
        ) : null}

        {lesson.videoUrl ? (
          <ScrollReveal>
          <section id="section-video">
            <h2 className="lesson-block-title lesson-block-title--muted text-white">
              <span className="lesson-block-title-line bg-white/20" aria-hidden />
              Vidéo
            </h2>
            <VideoEmbed url={lesson.videoUrl} title={lesson.title} />
          </section>
          </ScrollReveal>
        ) : null}

        {audioSrc ? (
          <ScrollReveal>
          <section id="section-audio">
            <h2 className="lesson-block-title lesson-block-title--gold text-white">
              <span className="lesson-block-title-line bg-brand-gold/50" aria-hidden />
              Vidéo de formation
            </h2>
            <CinematicPlayer
              audioUrl={audioSrc}
              alignmentUrl={alignmentUrl}
              title={lesson.title}
              avatar={avatar}
              visuals={visualsForPlayer}
              moduleTitle={mod.title}
              moduleSlug={moduleSlug}
              lessonSlug={lessonSlug}
              audioQuizSchedule={audioQuizSchedule}
            />
          </section>
          </ScrollReveal>
        ) : null}

        {trainerCallouts.length > 0 && (
          <ScrollReveal>
          <section id="section-callouts">
            <h2 className="lesson-block-title lesson-block-title--gold text-white">
              <span className="lesson-block-title-line bg-brand-gold/50" aria-hidden />
              Notes du formateur
            </h2>
            <TrainerCalloutBlock callouts={trainerCallouts} />
          </section>
          </ScrollReveal>
        )}

        {dataTables.length > 0 && (
          <ScrollReveal>
          <section id="section-table">
            <h2 className="lesson-block-title lesson-block-title--navy text-white">
              <span className="lesson-block-title-line bg-white/20" aria-hidden />
              Tableaux de référence
            </h2>
            <DataTableBlock tables={dataTables} />
          </section>
          </ScrollReveal>
        )}

        {guidedCalculations.length > 0 && (
          <ScrollReveal>
          <section id="section-calc">
            <h2 className="lesson-block-title lesson-block-title--navy text-white">
              <span className="lesson-block-title-line bg-white/20" aria-hidden />
              Calcul guidé
            </h2>
            <GuidedCalculationBlock calculations={guidedCalculations} />
          </section>
          </ScrollReveal>
        )}

        {hasInteractiveWorkshop ? (
          <ScrollReveal>
          <section id="section-exercises" className="space-y-10">
            <h2 className="lesson-block-title lesson-block-title--navy mb-2 text-white">
              <span className="lesson-block-title-line bg-brand-gold/30" aria-hidden />
              Ateliers interactifs
            </h2>
            <p className="max-w-2xl text-base text-white/50">
              Exercices pratiques : glisser-déposer, cas chiffrés, frises, checklists et mises en
              situation — complémentaires à la narration audio.
            </p>
            {dragDropExercises.length > 0 && (
              <DragDropExerciseBlock exercises={dragDropExercises} />
            )}
            {caseStudies.length > 0 && <CaseStudyBlock studies={caseStudies} />}
            {timelines.length > 0 && <InteractiveTimelineBlock timelines={timelines} />}
            {proChecklists.length > 0 && <ProChecklistBlock checklists={proChecklists} />}
            {chatRoleplay && <ChatRoleplay scenario={chatRoleplay} />}
          </section>
          </ScrollReveal>
        ) : null}

        {quizCheckpoints.length > 0 && (
          <ScrollReveal>
          <section id="section-quiz" className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-12 shadow-2xl backdrop-blur-md">
            <QuizCheckpointsSection checkpoints={quizCheckpoints} moduleSlug={moduleSlug} lessonSlug={lessonSlug} />
          </section>
          </ScrollReveal>
        )}

        <ScrollReveal>
          <LessonSpecialContent moduleSlug={moduleSlug} lessonSlug={lessonSlug} />
        </ScrollReveal>

        <section id="section-notes">
          <LessonNotes lessonKey={key} />
        </section>
      </div>

      {/* Progress & module time */}
      <div className="mt-12 flex flex-wrap items-start gap-6">
        <div className="flex-1 min-w-[280px]">
          <LessonProgress lessonKey={key} moduleInfo={moduleInfo} />
        </div>
        <div className="flex-1 min-w-[280px]">
          <ModuleTimeTracker moduleSlug={moduleSlug} />
        </div>
      </div>

      {/* Navigation */}
      <nav
        className="mt-16 flex flex-wrap justify-between gap-6 border-t border-white/10 pt-12"
        aria-label="Leçon précédente ou suivante"
      >
        {nav?.prev ? (
          <Link href={nav.prev.href} className="group flex flex-col items-start gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-brand-gold transition-colors">Précédent</span>
            <div className="flex items-center gap-3 text-lg font-bold text-white group-hover:text-brand-gold transition-all">
              <span className="transition-transform group-hover:-translate-x-1">←</span>
              {nav.prev.label.replace(/^←\s*/, "")}
            </div>
          </Link>
        ) : (
          <span />
        )}
        {nav?.next ? (
          <Link href={nav.next.href} className="group flex flex-col items-end gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-brand-gold transition-colors">Suivant</span>
            <div className="flex items-center gap-3 text-lg font-bold text-white group-hover:text-brand-gold transition-all">
              {nav.next.label.replace(/\s*→$/, "")}
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </Link>
        ) : (
          <Link href="/formation" className="group flex flex-col items-end gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40 group-hover:text-brand-gold transition-colors">Finalisé</span>
            <div className="flex items-center gap-3 text-lg font-bold text-white group-hover:text-brand-gold transition-all">
              Retour au parcours
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </div>
          </Link>
        )}
      </nav>
    </div>
  );
}
