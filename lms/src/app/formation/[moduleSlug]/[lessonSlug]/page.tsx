import Link from "next/link";
import { notFound } from "next/navigation";
import { getLesson, getPrevNext, lessonId } from "@/data/course";
import { getInteractiveScenario } from "@/data/interactive-scenarios";
import { getAvatarForModule } from "@/data/module-avatars";
import { getVisuals } from "@/data/lesson-keyconcepts";
import { getLessonAudioPlaybackSrc } from "@/lib/lesson-audio";
import { getCaseStudies } from "@/data/case-studies";
import { getChatRoleplay } from "@/data/chat-roleplay";
import { getDragDropExercises } from "@/data/drag-drop-exercises";
import { getProChecklists } from "@/data/pro-checklists";
import { getQuizCheckpoints } from "@/data/quiz-checkpoints";
import { getTimelines } from "@/data/timeline-data";
import { getTrainerCallouts } from "@/data/trainer-callouts";
import { getDataTables } from "@/data/data-tables";
import { getGuidedCalculations } from "@/data/guided-calculations";
import { VideoEmbed } from "@/components/VideoEmbed";
import { LessonProgress } from "@/components/LessonProgress";
import { InteractiveScenario } from "@/components/interactive/InteractiveScenario";
import { LessonTimer } from "@/components/gamification/LessonTimer";
import { ModuleTimeTracker } from "@/components/gamification/ModuleTimeTracker";
import { CinematicPlayer } from "@/components/audio/CinematicPlayer";
import { LessonPresenterPanel } from "@/components/avatars/LessonPresenterPanel";
import { CaseStudyBlock } from "@/components/interactive/CaseStudyBlock";
import { ChatRoleplay } from "@/components/interactive/ChatRoleplay";
import { DragDropExerciseBlock } from "@/components/interactive/DragDropExercise";
import { InteractiveTimelineBlock } from "@/components/interactive/InteractiveTimelineBlock";
import { LessonNotes } from "@/components/interactive/LessonNotes";
import { ProChecklistBlock } from "@/components/interactive/ProChecklistBlock";
import { QuizCheckpointsSection } from "@/components/interactive/QuizCheckpointsSection";
import { TrainerCalloutBlock } from "@/components/interactive/TrainerCallout";
import { DataTableBlock } from "@/components/interactive/DataTableBlock";
import { GuidedCalculationBlock } from "@/components/interactive/GuidedCalculationBlock";
import { LessonMap } from "@/components/interactive/LessonMap";
import { PrintableRecap } from "@/components/interactive/PrintableRecap";
import { BookmarkButton } from "@/components/user-content/BookmarkButton";
import { NotesPanelButton } from "./NotesPanelButton";
import { LessonJourneyBadge } from "@/components/LessonJourneyBadge";
import { AICoachButton } from "@/components/ai-coach";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { HeyGenVideoPlayer } from "@/components/avatars/HeyGenVideoPlayer";
import { getHeyGenVideoUrl } from "@/lib/heygen-videos";

type Props = { params: Promise<{ moduleSlug: string; lessonSlug: string }> };

export const dynamic = "force-dynamic";

export default async function LessonPage({ params }: Props) {
  const { moduleSlug, lessonSlug } = await params;
  const result = getLesson(moduleSlug, lessonSlug);
  if (!result) notFound();

  const { module: mod, lesson } = result;
  const key = lessonId(moduleSlug, lessonSlug);
  const nav = getPrevNext(moduleSlug, lessonSlug);
  const interactive =
    lesson.interactiveScenarioId != null
      ? getInteractiveScenario(lesson.interactiveScenarioId)
      : null;
  const audioSrc = getLessonAudioPlaybackSrc(lesson);
  const avatar = getAvatarForModule(moduleSlug);
  const heygenVideoUrl = getHeyGenVideoUrl(moduleSlug, lessonSlug);
  const lessonVisuals = getVisuals(moduleSlug, lessonSlug);
  const caseStudies = getCaseStudies(moduleSlug, lessonSlug);
  const dragDropExercises = getDragDropExercises(moduleSlug, lessonSlug);
  const timelines = getTimelines(moduleSlug, lessonSlug);
  const proChecklists = getProChecklists(moduleSlug, lessonSlug);
  const chatRoleplay = getChatRoleplay(moduleSlug, lessonSlug);
  const quizCheckpoints = getQuizCheckpoints(moduleSlug, lessonSlug);
  const trainerCallouts = getTrainerCallouts(moduleSlug, lessonSlug);
  const dataTables = getDataTables(moduleSlug, lessonSlug);
  const guidedCalculations = getGuidedCalculations(moduleSlug, lessonSlug);
  const hasInteractiveWorkshop =
    dragDropExercises.length > 0 ||
    caseStudies.length > 0 ||
    timelines.length > 0 ||
    proChecklists.length > 0 ||
    chatRoleplay != null;

  return (
    <div>
      <ReadingProgressBar />
      {/* Avatar banner */}
      {avatar && (
        <LessonPresenterPanel
          moduleSlug={moduleSlug}
          lessonTitle={lesson.title}
          isAudioPlaying={false}
        />
      )}

      <div className="card-elevated mb-8 overflow-hidden">
        {/* Breadcrumb + Timer */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-100 bg-gradient-to-r from-white via-brand-gold-soft/25 to-white px-5 py-4 md:px-7">
          <nav className="flex flex-wrap items-center gap-2 text-sm" aria-label="Fil d'Ariane">
            <Link href="/formation" className="breadcrumb-pill link-focus">
              Parcours
            </Link>
            <span className="breadcrumb-sep" aria-hidden>
              /
            </span>
            <Link href={`/formation/${mod.slug}`} className="breadcrumb-pill link-focus">
              {mod.title.replace(/^Module \d+ — /, "M")}
            </Link>
          </nav>
          <LessonTimer lessonKey={key} moduleSlug={moduleSlug} />
        </div>

        <header className="px-5 py-6 md:px-8 md:py-8">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-gold">{mod.title}</p>
          <div className="mt-2 flex flex-wrap items-start gap-3">
            <h1 className="text-3xl font-bold leading-[1.15] tracking-tight text-brand-navy md:text-[2rem]">
              {lesson.title}
            </h1>
            <div className="flex items-center gap-2 mt-1">
              {lesson.duration && (
                <span className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-0.5 text-[11px] font-semibold text-zinc-500">
                  ⏱ {Math.floor(lesson.duration / 60) > 0 ? `${Math.floor(lesson.duration / 60)}h` : ""}{lesson.duration % 60 > 0 ? `${lesson.duration % 60}min` : ""}
                </span>
              )}
              {lesson.difficulty && (
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-bold ${
                  lesson.difficulty === "avance" ? "bg-amber-50 text-amber-700" :
                  lesson.difficulty === "intermediaire" ? "bg-blue-50 text-blue-700" :
                  "bg-emerald-50 text-emerald-700"
                }`}>
                  {lesson.difficulty === "avance" ? "Avancé" : lesson.difficulty === "intermediaire" ? "Intermédiaire" : "Débutant"}
                </span>
              )}
            </div>
          </div>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 md:text-base">
            Écoutez la narration, parcourez la fiche, puis cochez la leçon lorsque le contenu est
            assimilé — vous gardez le contrôle sur votre rythme.
          </p>

          {/* Objectifs pédagogiques */}
          {lesson.objectives && lesson.objectives.length > 0 && (
            <div className="mt-4 rounded-2xl border border-brand-gold/25 bg-gradient-to-br from-amber-50/60 to-white p-4">
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-brand-gold">
                Ce que vous allez maîtriser
              </p>
              <ul className="space-y-1.5">
                {lesson.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-zinc-700">
                    <span className="mt-0.5 text-brand-gold" aria-hidden>✓</span>
                    {obj}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <LessonJourneyBadge moduleSlug={moduleSlug} lessonSlug={lessonSlug} />

          {/* Actions: Bookmark + Notes + Recap + AI Coach */}
          <div className="flex flex-wrap items-center gap-3 mt-5">
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
            />
            <AICoachButton 
              moduleSlug={moduleSlug}
              lessonSlug={lessonSlug}
              lessonTitle={lesson.title}
              variant="inline"
            />
          </div>
        </header>
      </div>

      {/* Lesson navigation map */}
      <div className="mt-6">
        <LessonMap
          lessonTitle={lesson.title}
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
          <section id="section-scenario">
            <h2 className="lesson-block-title lesson-block-title--navy">
              <span className="lesson-block-title-line bg-brand-navy/25" aria-hidden />
              Parcours interactif
            </h2>
            <p className="mb-4 max-w-2xl text-sm leading-relaxed text-zinc-600">
              {interactive.description}
            </p>
            <InteractiveScenario scenario={interactive} />
          </section>
        ) : null}

        {lesson.videoUrl ? (
          <section id="section-video">
            <h2 className="lesson-block-title lesson-block-title--muted">
              <span className="lesson-block-title-line bg-zinc-300" aria-hidden />
              Vidéo
            </h2>
            <VideoEmbed url={lesson.videoUrl} title={lesson.title} />
          </section>
        ) : null}

        {heygenVideoUrl && avatar ? (
          <section id="section-presenter">
            <h2 className="lesson-block-title lesson-block-title--gold">
              <span className="lesson-block-title-line bg-brand-gold/70" aria-hidden />
              Présentation
            </h2>
            <HeyGenVideoPlayer
              videoUrl={heygenVideoUrl}
              moduleSlug={moduleSlug}
              lessonTitle={lesson.title}
              presenterName={avatar.name}
              presenterRole={avatar.role}
              accentColor={avatar.accentColor}
            />
          </section>
        ) : null}

        {audioSrc ? (
          <section id="section-video">
            <h2 className="lesson-block-title lesson-block-title--gold">
              <span className="lesson-block-title-line bg-brand-gold/70" aria-hidden />
              Vidéo de formation
            </h2>
            <CinematicPlayer
              audioUrl={audioSrc}
              title={lesson.title}
              avatar={avatar}
              visuals={lessonVisuals}
            />
          </section>
        ) : null}

        {trainerCallouts.length > 0 && (
          <section id="section-callouts">
            <h2 className="lesson-block-title lesson-block-title--gold">
              <span className="lesson-block-title-line bg-brand-gold/70" aria-hidden />
              Notes du formateur
            </h2>
            <TrainerCalloutBlock callouts={trainerCallouts} />
          </section>
        )}

        {dataTables.length > 0 && (
          <section id="section-table">
            <h2 className="lesson-block-title lesson-block-title--navy">
              <span className="lesson-block-title-line bg-brand-navy/25" aria-hidden />
              Tableaux de référence
            </h2>
            <DataTableBlock tables={dataTables} />
          </section>
        )}

        {guidedCalculations.length > 0 && (
          <section id="section-calc">
            <h2 className="lesson-block-title lesson-block-title--navy">
              <span className="lesson-block-title-line bg-brand-navy/25" aria-hidden />
              Calcul guidé
            </h2>
            <GuidedCalculationBlock calculations={guidedCalculations} />
          </section>
        )}

        {hasInteractiveWorkshop ? (
          <section id="section-exercises" className="space-y-10">
            <h2 className="lesson-block-title lesson-block-title--navy mb-2">
              <span className="lesson-block-title-line bg-brand-navy/30" aria-hidden />
              Ateliers interactifs
            </h2>
            <p className="max-w-2xl text-sm text-zinc-600">
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
        ) : null}

        {quizCheckpoints.length > 0 && (
          <section id="section-quiz" className="card-elevated rounded-2xl border-brand-navy/8 bg-gradient-to-br from-white to-zinc-50/80 p-6 md:p-8">
            <QuizCheckpointsSection checkpoints={quizCheckpoints} />
          </section>
        )}

        <section id="section-notes">
          <LessonNotes lessonKey={key} />
        </section>
      </div>

      {/* Progress & module time */}
      <div className="mt-6 flex flex-wrap items-start gap-4">
        <LessonProgress lessonKey={key} />
        <div className="flex-1 min-w-[200px]">
          <ModuleTimeTracker moduleSlug={moduleSlug} />
        </div>
      </div>

      {/* Navigation */}
      <nav
        className="mt-12 flex flex-wrap justify-between gap-4 border-t border-zinc-200/90 bg-gradient-to-b from-transparent to-brand-gold-soft/30 pt-10"
        aria-label="Leçon précédente ou suivante"
      >
        {nav?.prev ? (
          <Link href={nav.prev.href} className="group lesson-nav-prev link-focus">
            <span className="text-zinc-400 transition group-hover:-translate-x-0.5">←</span>
            {nav.prev.label.replace(/^←\s*/, "")}
          </Link>
        ) : (
          <span />
        )}
        {nav?.next ? (
          <Link href={nav.next.href} className="group lesson-nav-next link-focus">
            {nav.next.label.replace(/\s*→$/, "")}
            <span className="transition group-hover:translate-x-0.5">→</span>
          </Link>
        ) : (
          <Link href="/formation" className="lesson-nav-finish link-focus">
            Parcours terminé — Retour au sommaire
          </Link>
        )}
      </nav>
    </div>
  );
}
