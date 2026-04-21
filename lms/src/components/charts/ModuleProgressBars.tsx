"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { COURSE } from "@/data/course";
import { getAvatarForModule } from "@/data/module-avatars";

interface ModuleProgress {
  slug: string;
  completed: number;
  total: number;
}

interface ModuleProgressBarsProps {
  progress: ModuleProgress[];
}

export function ModuleProgressBars({ progress }: ModuleProgressBarsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-6">
        {COURSE.map((module, index) => {
          const moduleProgress = progress.find((p) => p.slug === module.slug);
          const completed = moduleProgress?.completed || 0;
          const total = moduleProgress?.total || module.lessons.length;
          const percentage = total > 0 ? (completed / total) * 100 : 0;
          const avatar = getAvatarForModule(module.slug);
          const accentColor = avatar?.accentColor || "#d4af37";

          return (
            <motion.div
              key={module.slug}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/formation/${module.slug}`} className="block">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-4">
                    <span
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-base font-black shadow-lg border border-white/10"
                      style={{ backgroundColor: accentColor }}
                    >
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-black text-white text-sm uppercase tracking-tight">
                        {module.title.replace(/^Module (\d+) — /, "")}
                      </p>
                      <p className="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mt-1">
                        {completed} / {total} ÉTAPES
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-black tabular-nums text-white/80">
                    {Math.round(percentage)}<span className="text-[10px] opacity-40 ml-0.5">%</span>
                  </span>
                </div>
                
                <div className="h-1.5 bg-white/5 rounded-full overflow-hidden ring-1 ring-white/5 shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1.2, delay: 0.3 + index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${accentColor}, ${accentColor}cc)`,
                      boxShadow: `0 0 10px ${accentColor}44`,
                    }}
                  />
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
