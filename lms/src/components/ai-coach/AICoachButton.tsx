"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Bot, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AICoachChat } from "./AICoachChat";
import { COURSE } from "@/data/course";

interface AICoachButtonProps {
  moduleSlug?: string;
  lessonSlug?: string;
  lessonTitle?: string;
  variant?: "floating" | "inline";
}

const HIDE_ON_PAGES = ["/formation/oral", "/formation/roleplay", "/formation/test-conversationnel"];

export function AICoachButton({ moduleSlug: propModule, lessonSlug: propLesson, lessonTitle: propTitle, variant = "floating" }: AICoachButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => { const t = setTimeout(() => setMounted(true), 0); return () => clearTimeout(t); }, []);

  // Auto-detect context from URL if not provided
  let moduleSlug = propModule;
  let lessonSlug = propLesson;
  let lessonTitle = propTitle;

  if (pathname && !moduleSlug) {
    const parts = pathname.split("/");
    if (parts[1] === "formation" && parts[2]) {
      moduleSlug = parts[2];
      if (parts[3]) {
        lessonSlug = parts[3];
        // Try to find title in COURSE data
        const mod = COURSE.find(m => m.slug === moduleSlug);
        const lesson = mod?.lessons.find(l => l.slug === lessonSlug);
        if (lesson) lessonTitle = lesson.title;
      }
    }
  }

  const hidden = pathname ? HIDE_ON_PAGES.some(p => pathname.startsWith(p)) : false;

  // Don't render at all during SSR / initial hydration to avoid flash on hide-pages
  if (!mounted || hidden) return null;

  if (variant === "inline") {
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 rounded-xl border border-brand-gold/30 bg-brand-gold/10 px-4 py-2 text-sm font-black text-brand-gold transition hover:bg-brand-gold/20"
        >
          <Bot className="h-4 w-4" />
          Discuter avec Marie
        </button>
        <AnimatePresence>
          {isOpen && (
            <AICoachChat
              moduleSlug={moduleSlug}
              lessonSlug={lessonSlug}
              lessonTitle={lessonTitle}
              isOpen={isOpen}
              onClose={() => setIsOpen(false)}
            />
          )}
        </AnimatePresence>
      </>
    );
  }

  return (
    <>
      <motion.button
        data-coach-trigger
        initial={{ scale: 0, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-gold to-yellow-600 text-brand-navy shadow-[0_10px_40px_rgba(212,175,55,0.4)] md:bottom-8 lg:h-16 lg:w-16"
        title="Discuter avec Marie, votre coach IA"
        aria-label="Ouvrir le chat avec Marie, votre coach IA"
      >
        <div className="absolute inset-0 rounded-full bg-brand-gold animate-ping opacity-20" />
        <MessageCircle className="relative z-10 h-6 w-6 lg:h-7 lg:w-7" aria-hidden="true" />
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <AICoachChat
            moduleSlug={moduleSlug}
            lessonSlug={lessonSlug}
            lessonTitle={lessonTitle}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
