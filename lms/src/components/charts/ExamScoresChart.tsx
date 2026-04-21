"use client";

import { motion } from "framer-motion";
import { Award, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface ExamScore {
  module: string;
  score: number;
  total: number;
  date: string;
}

interface ExamScoresChartProps {
  scores: ExamScore[];
}

export function ExamScoresChart({ scores }: ExamScoresChartProps) {
  if (scores.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="relative mx-auto w-16 h-16 mb-6">
            <div className="absolute inset-0 rounded-full bg-brand-gold/10 blur-2xl animate-pulse" />
            <Award className="relative w-16 h-16 mx-auto text-white/10" />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Zéro évaluation</p>
        <p className="text-sm text-white/20 mt-2 font-medium italic">Les scores d&apos;examens apparaîtront après vos premiers QCM.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Performance académique</p>
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-1.5 rounded-xl">
          <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Moyenne :</span>
          <span className="text-lg font-black text-brand-gold tabular-nums">
            {Math.round(
              scores.reduce((acc, s) => acc + (s.score / s.total) * 100, 0) / scores.length
            )}<span className="text-xs opacity-50 ml-0.5">%</span>
          </span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        {scores.map((exam, index) => {
          const percentage = (exam.score / exam.total) * 100;
          let trendIcon = <Minus className="w-4 h-4 text-white/20" />;
          
          if (index > 0) {
            const prevPercentage = (scores[index - 1].score / scores[index - 1].total) * 100;
            if (percentage > prevPercentage) {
              trendIcon = <TrendingUp className="w-4 h-4 text-emerald-400" />;
            } else if (percentage < prevPercentage) {
              trendIcon = <TrendingDown className="w-4 h-4 text-red-400" />;
            }
          }

          const getColor = (pct: number) => {
            if (pct >= 80) return "bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]";
            if (pct >= 60) return "bg-brand-gold shadow-[0_0_15px_rgba(212,175,55,0.3)]";
            return "bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]";
          };

          return (
            <motion.div
              key={`${exam.module}-${exam.date}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 transition-all hover:bg-white/10 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-black text-white uppercase tracking-tight">{exam.module}</span>
                  {trendIcon}
                </div>
                <div className="text-right">
                    <span className="text-lg font-black text-white tabular-nums">
                        {exam.score} <span className="text-xs text-white/20">/ {exam.total}</span>
                    </span>
                </div>
              </div>
              
              <div className="h-1.5 bg-white/5 rounded-full overflow-hidden ring-1 ring-white/5">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`h-full rounded-full ${getColor(percentage)}`}
                />
              </div>
              
              <div className="flex items-center justify-between mt-4">
                <span className="text-[10px] font-black uppercase tracking-widest text-white/30">{Math.round(percentage)}% réussite</span>
                <span className="text-[10px] font-black uppercase tracking-widest text-white/20">{new Date(exam.date).toLocaleDateString("fr-FR")}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
