"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Bot, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AICoachChat } from "./AICoachChat";

interface AICoachButtonProps {
  moduleSlug?: string;
  lessonSlug?: string;
  lessonTitle?: string;
  variant?: "floating" | "inline";
}

const HIDE_ON_PAGES = ["/formation/oral", "/formation/roleplay", "/formation/test-conversationnel"];

export function AICoachButton({ moduleSlug, lessonSlug, lessonTitle, variant = "floating" }: AICoachButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const hidden = pathname ? HIDE_ON_PAGES.some(p => pathname.startsWith(p)) : false;

  if (hidden) return null;

  if (variant === "inline") {
    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 rounded-xl border border-brand-gold/30 bg-brand-gold/10 px-4 py-2 text-sm font-medium text-brand-gold transition hover:bg-brand-gold/20"
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
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-brand-gold to-[#f0c040] text-brand-navy shadow-lg shadow-brand-gold/30 transition hover:shadow-xl hover:shadow-brand-gold/40"
        title="Discuter avec Marie, votre coach IA"
      >
        <MessageCircle className="h-6 w-6" />
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
