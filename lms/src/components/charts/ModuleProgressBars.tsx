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
    <div className="space-y-4">
      <h3 className="font-bold text-gray-900">Progression par module</h3>
      
      <div className="space-y-4">
        {COURSE.map((module, index) => {
          const moduleProgress = progress.find((p) => p.slug === module.slug);
          const completed = moduleProgress?.completed || 0;
          const total = moduleProgress?.total || module.lessons.length;
          const percentage = total > 0 ? (completed / total) * 100 : 0;
          const avatar = getAvatarForModule(module.slug);
          const accentColor = avatar?.accentColor || "#1a3a5c";

          return (
            <motion.div
              key={module.slug}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/formation/${module.slug}`} className="block">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
                      style={{ backgroundColor: accentColor }}
                    >
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        {module.title.replace("Module ", "M")}
                      </p>
                      <p className="text-xs text-gray-500">
                        {completed}/{total} leçons
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-bold" style={{ color: accentColor }}>
                    {Math.round(percentage)}%
                  </span>
                </div>
                
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentage}%` }}
                    transition={{ duration: 1, delay: 0.2 + index * 0.1 }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, ${accentColor}, ${accentColor}88)`,
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
