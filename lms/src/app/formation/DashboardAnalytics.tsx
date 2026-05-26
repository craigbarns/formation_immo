"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Clock,
  Target,
  Flame,
  BookOpen,
  Zap,
  TrendingUp,
  Award,
  BarChart3,
  Activity,
  ChevronDown,
} from "lucide-react";
import {
  getGamificationState,
  getLevelForXP,
  LEVELS,
  BADGES,
} from "@/lib/gamification";
import { COURSE, lessonId } from "@/data/course";
import {
  FORMATION_PROGRESS_CHANGED_EVENT,
  FORMATION_PROGRESS_STORAGE_KEY,
} from "@/constants/formation-storage";
import { AnimatedCounter } from "@/components/animations";
import { formatDuration } from "@/lib/utils/date";
import { getAllBookmarks, getAllNotes } from "@/lib/user-content";
import { createClient } from "@/lib/supabase/client";
import {
  CircularProgress,
  HeatmapCalendar,
  RadarSkills,
  ModuleProgressBars,
  ExamScoresChart,
  StreakFlame,
} from "@/components/charts";

interface Stats {
  xp: number;
  level: number;
  streak: number;
  lessonsCompleted: number;
  totalLessons: number;
  timeSpent: number;
  badgesEarned: number;
  totalBadges: number;
  examsTaken: number;
  bookmarksCount: number;
  notesCount: number;
  quizCorrect: number;
  moduleProgress: { slug: string; completed: number; total: number }[];
  examScores: { module: string; score: number; total: number; date: string }[];
  dailyActivity: Record<string, number>;
}

export function DashboardAnalytics() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [showCharts, setShowCharts] = useState(false);
  const mounted = stats !== null;

  useEffect(() => {
    const supabase = createClient();

    async function loadStats() {
      const { data: { user } } = await supabase.auth.getUser();

      let gameState: ReturnType<typeof getGamificationState>;
      let progressObj: Record<string, boolean> = {};
      let bookmarksCount: number;
      let notesCount: number;

      if (user) {
        const { data: gamificationData } = await supabase
          .from("gamification_state")
          .select("*")
          .eq("user_id", user.id)
          .single();

        gameState = {
          xp: gamificationData?.xp ?? 0,
          earnedBadges: gamificationData?.earned_badges || [],
          streak: gamificationData?.streak ?? 0,
          lastLoginDate: gamificationData?.last_login_date ?? "",
          totalQuizCorrect: gamificationData?.total_quiz_correct ?? 0,
          totalExamsTaken: gamificationData?.total_exams_taken ?? 0,
          totalExamsPerfect: gamificationData?.total_exams_perfect ?? 0,
          simulatorsUsed: gamificationData?.simulators_used || [],
          lessonTimes: gamificationData?.lesson_times || {},
          examScores: gamificationData?.exam_scores || {},
          xpHistory: gamificationData?.xp_history || [],
          moduleTimers: gamificationData?.module_timers || {},
          dailyActivity: gamificationData?.daily_activity || {},
          completedChecklists: gamificationData?.completed_checklists || [],
          flashcardsReviewed: gamificationData?.flashcards_reviewed ?? 0,
        };

        const { data: progressData } = await supabase
          .from("lesson_progress")
          .select("lesson_key, completed")
          .eq("user_id", user.id);

        progressData?.forEach((row) => {
          progressObj[row.lesson_key] = row.completed;
        });

        const { data: bookmarksData } = await supabase
          .from("bookmarks")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id);

        bookmarksCount = bookmarksData?.length ?? 0;

        const { data: notesData } = await supabase
          .from("notes")
          .select("id", { count: "exact", head: true })
          .eq("user_id", user.id);

        notesCount = notesData?.length ?? 0;
      } else {
        gameState = getGamificationState();
        try {
          const raw = localStorage.getItem(FORMATION_PROGRESS_STORAGE_KEY);
          progressObj = raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
        } catch {
          progressObj = {};
        }
        bookmarksCount = getAllBookmarks().length;
        notesCount = getAllNotes().length;
      }

      const levelInfo = getLevelForXP(gameState.xp);
      const moduleProgress = COURSE.map((module) => ({
        slug: module.slug,
        completed: module.lessons.filter(
          (l) => progressObj[lessonId(module.slug, l.slug)],
        ).length,
        total: module.lessons.length,
      }));
      const lessonsCompleted = Object.entries(progressObj).filter(([, v]) => v).length;
      const totalTime = Object.values(gameState.lessonTimes).reduce((acc, time) => acc + time, 0);
      const examScores = Object.entries(gameState.examScores).map(([module, data]) => ({
        module: COURSE.find((m) => m.slug === module)?.title || module,
        score: data.score,
        total: data.total,
        date: data.date,
      }));

      setStats({
        xp: gameState.xp,
        level: levelInfo.current.level,
        streak: gameState.streak,
        lessonsCompleted,
        totalLessons: COURSE.reduce((acc, m) => acc + m.lessons.length, 0),
        timeSpent: totalTime,
        badgesEarned: gameState.earnedBadges.length,
        totalBadges: BADGES.length,
        examsTaken: gameState.totalExamsTaken,
        bookmarksCount,
        notesCount,
        quizCorrect: gameState.totalQuizCorrect,
        moduleProgress,
        examScores,
        dailyActivity: gameState.dailyActivity,
      });
    }

    loadStats();
    const onProgress = () => { loadStats(); };
    window.addEventListener(FORMATION_PROGRESS_CHANGED_EVENT, onProgress);
    return () => window.removeEventListener(FORMATION_PROGRESS_CHANGED_EVENT, onProgress);
  }, []);

  if (!mounted || !stats) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-24 bg-slate-200 dark:bg-white/5 rounded-2xl animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  const nextLevel = LEVELS.find((l) => l.level === stats.level + 1);
  const xpToNextLevel = nextLevel ? nextLevel.xpRequired - stats.xp : 0;

  const skillsData = COURSE.map((mod, i) => {
    const prog = stats.moduleProgress[i];
    const pct = prog && prog.total > 0 ? Math.round((prog.completed / prog.total) * 100) : 0;
    return {
      name: mod.title.replace(/^Module \d+ — /, ""),
      value: pct,
      max: 100,
    };
  });

  const statCards = [
    { icon: Trophy, label: "Niveau", value: stats.level, color: "bg-amber-500/20 text-brand-gold", border: "border-amber-500/20", suffix: `/${LEVELS.length}` },
    { icon: Zap, label: "Points XP", value: stats.xp, color: "bg-purple-500/20 text-purple-300", border: "border-purple-500/20", suffix: "" },
    { icon: Flame, label: "Série", value: stats.streak, color: "bg-orange-500/20 text-orange-400", border: "border-orange-500/20", suffix: " j" },
    { icon: BookOpen, label: "Leçons", value: stats.lessonsCompleted, color: "bg-blue-500/20 text-blue-300", border: "border-blue-500/20", suffix: `/${stats.totalLessons}` },
    { icon: Clock, label: "Temps", value: formatDuration(stats.timeSpent), color: "bg-emerald-500/20 text-emerald-400", border: "border-emerald-500/20", isText: true },
    { icon: Award, label: "Badges", value: stats.badgesEarned, color: "bg-rose-500/20 text-rose-300", border: "border-rose-500/20", suffix: `/${stats.totalBadges}` },
    { icon: Target, label: "Examens", value: stats.examsTaken, color: "bg-red-500/20 text-red-300", border: "border-red-500/20", suffix: "" },
    { icon: TrendingUp, label: "QCM", value: stats.quizCorrect, color: "bg-cyan-500/20 text-cyan-300", border: "border-cyan-500/20", suffix: "" },
  ];

  return (
    <section className="space-y-10 p-6 md:p-10">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-6 border-b border-slate-100 dark:border-white/5 pb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-brand-gold/10 border border-brand-gold/20 rounded-2xl shadow-lg">
            <BarChart3 className="w-8 h-8 text-brand-gold" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Tableau de bord</h2>
            <p className="text-sm text-slate-500 dark:text-white/75 font-medium">Analyse de performance & progression</p>
          </div>
        </div>
        {xpToNextLevel > 0 && (
          <div className="flex items-center gap-3 px-5 py-2.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl backdrop-blur-md">
            <Activity className="w-4 h-4 text-brand-gold" />
            <span className="text-xs font-black uppercase tracking-widest text-slate-700 dark:text-white/80">
              {xpToNextLevel} XP pour le niveau {stats.level + 1}
            </span>
          </div>
        )}
      </div>

      {/* Main stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {statCards.map((card, index) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`relative overflow-hidden rounded-3xl border ${card.border} bg-slate-50 dark:bg-white/5 p-6 transition-all duration-300 hover:border-slate-300 dark:hover:border-white/30 group`}
          >
            <div className={`w-12 h-12 rounded-2xl ${card.color} flex items-center justify-center mb-4 border border-slate-100 dark:border-white/5 shadow-xl`}>
              <card.icon className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-black text-slate-500 dark:text-white/75 uppercase tracking-[0.2em] mb-1">{card.label}</p>
            <p className="text-2xl font-black text-slate-900 dark:text-white tracking-tight tabular-nums">
              {card.isText ? card.value : <AnimatedCounter value={card.value as number} />}
              <span className="text-xs font-bold text-slate-400 dark:text-white/75 ml-1 uppercase">{card.suffix}</span>
            </p>
          </motion.div>
        ))}
      </div>

      {/* Toggle stats détaillées */}
      <button
        onClick={() => setShowCharts(!showCharts)}
        className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-500 dark:text-white/75 hover:text-slate-700 dark:hover:text-white/70 transition-colors"
      >
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${showCharts ? "rotate-180" : ""}`}
        />
        {showCharts ? "Masquer les graphiques" : "Voir les stats détaillées"}
      </button>

      {showCharts && <>
      {/* Visual charts row */}
      <div className="grid md:grid-cols-3 gap-8">
        <div className="rounded-[2rem] border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-8 flex flex-col items-center text-center shadow-sm dark:shadow-2xl backdrop-blur-xl transition-all hover:border-brand-gold/20">
          <h3 className="text-[10px] font-black text-slate-500 dark:text-white/75 uppercase tracking-[0.3em] mb-8 w-full">Progression globale</h3>
          <CircularProgress
            value={stats.lessonsCompleted}
            max={stats.totalLessons}
            size={160}
            color="var(--brand-gold)"
            label={`${stats.lessonsCompleted}`}
            sublabel="LEÇONS"
          />
        </div>

        <div className="rounded-[2rem] border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-8 shadow-sm dark:shadow-2xl backdrop-blur-xl transition-all hover:border-brand-gold/20">
          <h3 className="text-[10px] font-black text-slate-500 dark:text-white/75 uppercase tracking-[0.3em] mb-8">Compétences / Module</h3>
          <RadarSkills skills={skillsData} size={220} />
        </div>

        <div className="rounded-[2rem] border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-8 shadow-sm dark:shadow-2xl backdrop-blur-xl flex flex-col justify-center transition-all hover:border-brand-gold/20">
          <StreakFlame streak={stats.streak} />
        </div>
      </div>

      {/* Heatmap & Modules */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="rounded-[2.5rem] border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-8 shadow-sm dark:shadow-2xl">
          <h3 className="text-[10px] font-black text-slate-500 dark:text-white/75 uppercase tracking-[0.3em] mb-8 italic">Activité d&apos;apprentissage</h3>
          <HeatmapCalendar data={stats.dailyActivity} />
        </div>

        <div className="rounded-[2.5rem] border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-8 shadow-sm dark:shadow-2xl">
          <h3 className="text-[10px] font-black text-slate-500 dark:text-white/75 uppercase tracking-[0.3em] mb-8 italic">Progression par thématique</h3>
          <ModuleProgressBars progress={stats.moduleProgress} />
        </div>
      </div>

      {/* Exam Scores */}
      <div className="rounded-[2.5rem] border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-white/5 p-8 shadow-sm dark:shadow-2xl">
        <h3 className="text-[10px] font-black text-slate-500 dark:text-white/75 uppercase tracking-[0.3em] mb-8 italic">Historique des examens</h3>
        <ExamScoresChart scores={stats.examScores} />
      </div>

      {/* XP Progress */}
      <div className="relative overflow-hidden rounded-[2.5rem] border border-brand-gold/30 bg-gradient-to-br from-[#0a1224] to-[#030712] p-10 shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-gold/5 to-transparent pointer-events-none" />
        <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <p className="text-[10px] font-black text-brand-gold uppercase tracking-[0.3em] mb-2">Statut de l&apos;agent</p>
                    <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Niveau {stats.level}</h3>
                </div>
                <span className="text-xs font-black text-white/75 uppercase tracking-widest">
                    Expertise {Math.round((stats.level / LEVELS.length) * 100)}%
                </span>
            </div>
            <div className="h-4 bg-white/5 rounded-full overflow-hidden shadow-inner ring-1 ring-white/10">
            {nextLevel && (
                <motion.div
                initial={{ width: 0 }}
                animate={{
                    width: `${((stats.xp - LEVELS[stats.level - 1].xpRequired) /
                    (nextLevel.xpRequired - LEVELS[stats.level - 1].xpRequired)) * 100}%`,
                }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="h-full bg-gradient-to-r from-brand-gold via-white to-brand-gold shadow-[0_0_15px_rgba(212,175,55,0.4)]"
                />
            )}
            </div>
            {nextLevel && (
            <p className="text-sm text-white/75 mt-6 text-center font-medium italic">
                Encore <span className="text-brand-gold font-black">{xpToNextLevel} XP</span> avant d&apos;atteindre le palier <span className="text-white font-black">{stats.level + 1}</span>
            </p>
            )}
        </div>
      </div>
      </>}
    </section>
  );
}
