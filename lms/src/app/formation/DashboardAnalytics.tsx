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
        // Fetch from Supabase
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
        // Fallback to localStorage
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

      const totalTime = Object.values(gameState.lessonTimes).reduce(
        (acc, time) => acc + time,
        0,
      );

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
            <div key={i} className="h-24 bg-gray-100 rounded-2xl animate-pulse" />
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="h-64 bg-gray-100 rounded-2xl animate-pulse" />
          <div className="h-64 bg-gray-100 rounded-2xl animate-pulse" />
        </div>
      </div>
    );
  }

  const nextLevel = LEVELS.find((l) => l.level === stats.level + 1);
  const xpToNextLevel = nextLevel ? nextLevel.xpRequired - stats.xp : 0;

  // Skills radar data — dynamically derived from COURSE modules
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
    { icon: Trophy, label: "Niveau", value: stats.level, color: "bg-amber-100 text-amber-700", suffix: `/${LEVELS.length}` },
    { icon: Zap, label: "Points XP", value: stats.xp, color: "bg-purple-100 text-purple-700", suffix: "" },
    { icon: Flame, label: "Série", value: stats.streak, color: "bg-orange-100 text-orange-700", suffix: " jours" },
    { icon: BookOpen, label: "Leçons", value: stats.lessonsCompleted, color: "bg-blue-100 text-blue-700", suffix: `/${stats.totalLessons}` },
    { icon: Clock, label: "Temps total", value: formatDuration(stats.timeSpent), color: "bg-emerald-100 text-emerald-700", isText: true },
    { icon: Award, label: "Badges", value: stats.badgesEarned, color: "bg-pink-100 text-pink-700", suffix: `/${stats.totalBadges}` },
    { icon: Target, label: "Examens", value: stats.examsTaken, color: "bg-red-100 text-red-700", suffix: "" },
    { icon: TrendingUp, label: "QCM corrects", value: stats.quizCorrect, color: "bg-cyan-100 text-cyan-700", suffix: "" },
  ];

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-navy rounded-xl">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Tableau de bord</h2>
            <p className="text-sm text-gray-500">Votre progression en temps réel</p>
          </div>
        </div>
        {xpToNextLevel > 0 && (
          <div className="flex items-center gap-2 px-4 py-2 bg-purple-50 rounded-xl">
            <Activity className="w-4 h-4 text-purple-600" />
            <span className="text-sm text-purple-700">
              {xpToNextLevel} XP jusqu&apos;au niveau {stats.level + 1}
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
            whileHover={{ scale: 1.02, y: -2 }}
            className="card-elevated p-4 rounded-2xl bg-gradient-to-br from-white to-gray-50"
          >
            <div className={`w-10 h-10 rounded-xl ${card.color} flex items-center justify-center mb-3`}>
              <card.icon className="w-5 h-5" />
            </div>
            <p className="text-xs text-gray-500 uppercase tracking-wide">{card.label}</p>
            <p className="text-2xl font-bold text-gray-900">
              {card.isText ? card.value : <AnimatedCounter value={card.value as number} />}
              <span className="text-sm font-normal text-gray-400">{card.suffix}</span>
            </p>
          </motion.div>
        ))}
      </div>

      {/* Visual charts row */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Circular Progress */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card-elevated p-6 rounded-2xl flex flex-col items-center"
        >
          <h3 className="font-bold text-gray-900 mb-4 w-full">Progression globale</h3>
          <CircularProgress
            value={stats.lessonsCompleted}
            max={stats.totalLessons}
            size={140}
            color="#1a3a5c"
            label={`${stats.lessonsCompleted} leçons`}
            sublabel={`sur ${stats.totalLessons}`}
          />
        </motion.div>

        {/* Radar Skills */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="card-elevated p-6 rounded-2xl"
        >
          <h3 className="font-bold text-gray-900 mb-4">Compétences par module</h3>
          <RadarSkills skills={skillsData} size={200} />
        </motion.div>

        {/* Streak Flame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="card-elevated p-6 rounded-2xl"
        >
          <StreakFlame streak={stats.streak} />
        </motion.div>
      </div>

      {/* Heatmap & Modules */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card-elevated p-6 rounded-2xl"
        >
          <HeatmapCalendar data={stats.dailyActivity} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card-elevated p-6 rounded-2xl"
        >
          <ModuleProgressBars progress={stats.moduleProgress} />
        </motion.div>
      </div>

      {/* Exam Scores */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-elevated p-6 rounded-2xl"
      >
        <ExamScoresChart scores={stats.examScores} />
      </motion.div>

      {/* XP Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-elevated p-6 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-900">Progression niveau</h3>
          <span className="text-sm font-medium text-gray-600">
            Niveau {stats.level} → {stats.level + 1}
          </span>
        </div>
        <div className="h-4 bg-white rounded-full overflow-hidden shadow-inner">
          {nextLevel && (
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${((stats.xp - LEVELS[stats.level - 1].xpRequired) /
                  (nextLevel.xpRequired - LEVELS[stats.level - 1].xpRequired)) * 100}%`,
              }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-full"
            />
          )}
        </div>
        {nextLevel && (
          <p className="text-sm text-gray-600 mt-3 text-center">
            Encore <span className="font-bold text-purple-600">{xpToNextLevel} XP</span> pour passer au niveau {stats.level + 1}
          </p>
        )}
      </motion.div>
    </section>
  );
}
