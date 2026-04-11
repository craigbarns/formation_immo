"use client";

import { useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Brain, ArrowRight, TrendingUp, AlertCircle, Sparkles } from "lucide-react";
import { getGamificationState } from "@/lib/gamification";
import { getStoredProgress } from "@/components/LessonProgress";
import { getCourseModules } from "@/data/course";

interface Recommendation {
  type: "continue" | "review" | "explore" | "practice";
  moduleSlug: string;
  lessonSlug?: string;
  title: string;
  reason: string;
  priority: number;
}

function generateRecommendations(): Recommendation[] {
  const recommendations: Recommendation[] = [];
  const gamification = getGamificationState();
  const progress = getStoredProgress();
  const modules = getCourseModules();
  
  // Find weak areas from exam scores
  const weakModules: string[] = [];
  for (const [moduleSlug, score] of Object.entries(gamification.examScores)) {
    const percentage = (score.score / score.total) * 100;
    if (percentage < 80) {
      weakModules.push(moduleSlug);
    }
  }
  
  // Find incomplete lessons
  const incompleteLessons: { moduleSlug: string; lessonSlug: string; title: string }[] = [];
  for (const mod of modules) {
    for (const lesson of mod.lessons) {
      const key = `${mod.slug}/${lesson.slug}`;
      if (!progress[key]) {
        incompleteLessons.push({
          moduleSlug: mod.slug,
          lessonSlug: lesson.slug,
          title: lesson.title,
        });
      }
    }
  }
  
  // Find next lesson in sequence
  if (incompleteLessons.length > 0) {
    const nextLesson = incompleteLessons[0];
    recommendations.push({
      type: "continue",
      moduleSlug: nextLesson.moduleSlug,
      lessonSlug: nextLesson.lessonSlug,
      title: nextLesson.title,
      reason: "Continuer là où vous vous êtes arrêté",
      priority: 10,
    });
  }
  
  // Recommend review for weak modules
  for (const weakModule of weakModules.slice(0, 1)) {
    const mod = modules.find(m => m.slug === weakModule);
    if (mod) {
      recommendations.push({
        type: "review",
        moduleSlug: weakModule,
        title: mod.title,
        reason: "Vos scores QCM suggèrent de réviser ce module",
        priority: 8,
      });
    }
  }
  
  // Recommend practice if many lessons completed
  const completedCount = Object.values(progress).filter(Boolean).length;
  if (completedCount >= 5) {
    const unattemptedModule = modules.find(m => !gamification.examScores[m.slug]);
    if (unattemptedModule) {
      recommendations.push({
        type: "practice",
        moduleSlug: unattemptedModule.slug,
        title: unattemptedModule.title,
        reason: "Testez vos connaissances avec un QCM",
        priority: 6,
      });
    }
  }
  
  // Recommend new module if current one is complete
  const currentModule = modules.find(m => {
    const moduleLessons = m.lessons.map(l => `${m.slug}/${l.slug}`);
    const completedInModule = moduleLessons.filter(k => progress[k]).length;
    return completedInModule > 0 && completedInModule < m.lessons.length;
  });
  
  if (!currentModule && incompleteLessons.length > 0) {
    const nextModuleSlug = incompleteLessons[0].moduleSlug;
    const nextModule = modules.find(m => m.slug === nextModuleSlug);
    if (nextModule) {
      recommendations.push({
        type: "explore",
        moduleSlug: nextModuleSlug,
        title: nextModule.title,
        reason: "Nouveau module à découvrir",
        priority: 7,
      });
    }
  }
  
  // Sort by priority
  return recommendations.sort((a, b) => b.priority - a.priority).slice(0, 3);
}

export function AdaptiveLearningPath() {
  const recommendations = useMemo(() => generateRecommendations(), []);
  
  if (recommendations.length === 0) {
    return (
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-6 text-center">
        <Sparkles className="mx-auto h-8 w-8 text-emerald-400" />
        <h3 className="mt-3 font-bold text-white">Félicitations !</h3>
        <p className="mt-1 text-sm text-white/70">
          Vous avez terminé tous les modules. Passez aux examens pour valider vos compétences !
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 text-sm text-white/50">
        <Brain className="h-4 w-4" />
        <span>Parcours personnalisé selon votre progression</span>
      </div>
      
      {recommendations.map((rec, index) => (
        <motion.div
          key={`${rec.type}-${rec.moduleSlug}`}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Link
            href={rec.lessonSlug 
              ? `/formation/${rec.moduleSlug}/${rec.lessonSlug}` 
              : `/formation/${rec.moduleSlug}`
            }
            className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-[#d4af37]/30 hover:bg-white/10"
          >
            <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${
              rec.type === "continue" ? "bg-blue-500/20 text-blue-400" :
              rec.type === "review" ? "bg-amber-500/20 text-amber-400" :
              rec.type === "practice" ? "bg-purple-500/20 text-purple-400" :
              "bg-emerald-500/20 text-emerald-400"
            }`}>
              {rec.type === "continue" ? <TrendingUp className="h-6 w-6" /> :
               rec.type === "review" ? <AlertCircle className="h-6 w-6" /> :
               rec.type === "practice" ? <Brain className="h-6 w-6" /> :
               <Sparkles className="h-6 w-6" />}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold uppercase tracking-wider ${
                  rec.type === "continue" ? "text-blue-400" :
                  rec.type === "review" ? "text-amber-400" :
                  rec.type === "practice" ? "text-purple-400" :
                  "text-emerald-400"
                }`}>
                  {rec.type === "continue" ? "Continuer" :
                   rec.type === "review" ? "Réviser" :
                   rec.type === "practice" ? "Pratiquer" :
                   "Explorer"}
                </span>
              </div>
              <h4 className="truncate font-semibold text-white group-hover:text-[#d4af37] transition">
                {rec.title}
              </h4>
              <p className="text-xs text-white/50">{rec.reason}</p>
            </div>
            
            <ArrowRight className="h-5 w-5 text-white/30 transition group-hover:text-[#d4af37] group-hover:translate-x-1" />
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
