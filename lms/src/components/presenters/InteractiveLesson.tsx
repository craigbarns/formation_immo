"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { AnimatedAvatar } from "./AnimatedAvatar";
import { Play, Pause, SkipForward, RotateCcw } from "lucide-react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";

interface LessonStep {
  id: string;
  title: string;
  content: string;
  tip?: string;
  action?: string;
}

interface InteractiveLessonProps {
  title: string;
  presenter: {
    name: string;
    role: string;
    color: string;
    emoji: string;
  };
  steps: LessonStep[];
}

export function InteractiveLesson({ title, presenter, steps }: InteractiveLessonProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const step = steps[currentStep];
  const progress = ((currentStep + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCompletedSteps((prev) => [...prev, step.id]);
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setCompletedSteps([]);
    setIsPlaying(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>Étape {currentStep + 1}/{steps.length}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-brand-navy to-brand-gold"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Main content */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Left: Presenter */}
        <div className="md:col-span-1">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="sticky top-4"
          >
            <AnimatedAvatar
              name={presenter.name}
              role={presenter.role}
              color={presenter.color}
              emoji={presenter.emoji}
              isSpeaking={isPlaying}
              expression={currentStep % 2 === 0 ? "happy" : "focused"}
              size="lg"
            />

            {/* Quick stats */}
            <div className="mt-6 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Progression</span>
                <span className="font-semibold">{Math.round(progress)}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Complété</span>
                <span className="font-semibold">{completedSteps.length}</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right: Content */}
        <div className="md:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
              
              <div className="prose prose-sm max-w-none">
                <p className="text-gray-700 leading-relaxed">{step.content}</p>
              </div>

              {step.tip && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 p-4 bg-amber-50 rounded-xl border border-amber-200"
                >
                  <p className="text-sm text-amber-800">
                    <span className="font-semibold inline-flex items-center gap-1"><EmojiIcon emoji="💡" className="h-4 w-4" /> Astuce :</span> {step.tip}
                  </p>
                </motion.div>
              )}

              {step.action && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200"
                >
                  <p className="text-sm text-blue-800">
                    <span className="font-semibold inline-flex items-center gap-1"><EmojiIcon emoji="🎯" className="h-4 w-4" /> Action :</span> {step.action}
                  </p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation controls */}
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={handlePrevious}
              disabled={currentStep === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 disabled:opacity-50 transition"
            >
              ← Précédent
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-3 rounded-xl bg-brand-navy text-white hover:bg-brand-navy-deep transition"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>

              {currentStep < steps.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-gold text-brand-navy font-semibold hover:bg-brand-gold/80 transition"
                >
                  Suivant <SkipForward className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition"
                >
                  <RotateCcw className="w-4 h-4" /> Recommencer
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Step indicators */}
      <div className="flex gap-2 justify-center">
        {steps.map((s, index) => (
          <button
            key={s.id}
            onClick={() => setCurrentStep(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentStep
                ? "bg-brand-navy w-8"
                : completedSteps.includes(s.id)
                ? "bg-brand-gold"
                : "bg-gray-200"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
