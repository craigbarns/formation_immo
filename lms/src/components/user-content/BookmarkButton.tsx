"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { toggleBookmark, isBookmarked } from "@/lib/user-content";
import { useToast } from "@/components/toast";

interface BookmarkButtonProps {
  moduleSlug: string;
  lessonSlug: string;
  lessonTitle: string;
  moduleTitle: string;
  variant?: "icon" | "button";
}

export function BookmarkButton({
  moduleSlug,
  lessonSlug,
  lessonTitle,
  moduleTitle,
  variant = "icon",
}: BookmarkButtonProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { success, info } = useToast();

  useEffect(() => {
    setMounted(true);
    setBookmarked(isBookmarked(moduleSlug, lessonSlug));
  }, [moduleSlug, lessonSlug]);

  const handleToggle = () => {
    const result = toggleBookmark(moduleSlug, lessonSlug, lessonTitle, moduleTitle);
    setBookmarked(result.bookmarked);

    if (result.bookmarked) {
      success("Ajouté aux favoris", `"${lessonTitle}" a été sauvegardé`);
    } else {
      info("Retiré des favoris");
    }
  };

  if (!mounted) {
    return variant === "icon" ? (
      <div className="w-10 h-10" />
    ) : (
      <div className="h-10 w-32" />
    );
  }

  if (variant === "icon") {
    return (
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleToggle}
        className={`p-2.5 rounded-xl transition-colors ${
          bookmarked
            ? "bg-brand-gold/20 text-brand-gold"
            : "bg-gray-100 text-gray-400 hover:text-gray-600"
        }`}
      >
        <AnimatePresence mode="wait">
          {bookmarked ? (
            <motion.div
              key="check"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <BookmarkCheck className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="bookmark"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <Bookmark className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleToggle}
      className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${
        bookmarked
          ? "bg-brand-gold/20 text-brand-gold border border-brand-gold/30"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
      }`}
    >
      {bookmarked ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
      {bookmarked ? "Favori" : "Ajouter aux favoris"}
    </motion.button>
  );
}
