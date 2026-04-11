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
      <div className="text-center py-8 text-gray-500">
        <Award className="w-12 h-12 mx-auto mb-3 text-gray-300" />
        <p>Pas encore d&apos;examens passés</p>
        <p className="text-sm">Les scores apparaîtront ici</p>
      </div>
    );
  }

  const maxScore = Math.max(...scores.map((s) => s.total));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-900">Scores aux examens</h3>
        <div className="flex items-center gap-2 text-sm">
          <span className="text-gray-500">Moyenne:</span>
          <span className="font-bold text-brand-navy">
            {Math.round(
              scores.reduce((acc, s) => acc + (s.score / s.total) * 100, 0) / scores.length
            )}%
          </span>
        </div>
      </div>

      <div className="space-y-3">
        {scores.map((exam, index) => {
          const percentage = (exam.score / exam.total) * 100;
          let trendIcon = <Minus className="w-4 h-4 text-gray-400" />;
          
          if (index > 0) {
            const prevPercentage = (scores[index - 1].score / scores[index - 1].total) * 100;
            if (percentage > prevPercentage) {
              trendIcon = <TrendingUp className="w-4 h-4 text-emerald-500" />;
            } else if (percentage < prevPercentage) {
              trendIcon = <TrendingDown className="w-4 h-4 text-red-500" />;
            }
          }

          const getColor = (pct: number) => {
            if (pct >= 80) return "bg-emerald-500";
            if (pct >= 60) return "bg-yellow-500";
            return "bg-red-500";
          };

          return (
            <motion.div
              key={`${exam.module}-${exam.date}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 rounded-xl p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-gray-900">{exam.module}</span>
                  {trendIcon}
                </div>
                <span className="text-sm font-bold text-gray-900">
                  {exam.score}/{exam.total}
                </span>
              </div>
              
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.1 }}
                  className={`h-full rounded-full ${getColor(percentage)}`}
                />
              </div>
              
              <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
                <span>{Math.round(percentage)}%</span>
                <span>{new Date(exam.date).toLocaleDateString("fr-FR")}</span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
