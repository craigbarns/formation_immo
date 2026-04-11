"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X } from "lucide-react";
import { addNote, NOTE_COLORS, type Note } from "@/lib/user-content";

interface NoteCreatorProps {
  moduleSlug: string;
  lessonSlug: string;
  onCreated: () => void;
}

export function NoteCreator({ moduleSlug, lessonSlug, onCreated }: NoteCreatorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState("");
  const [selectedColor, setSelectedColor] = useState<keyof typeof NOTE_COLORS>("yellow");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      addNote(moduleSlug, lessonSlug, content.trim(), { color: selectedColor });
      setContent("");
      setIsOpen(false);
      onCreated();
    }
  };

  const colorOptions = ["yellow", "blue", "green", "pink", "purple"] as const;

  return (
    <div>
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand-navy bg-brand-gold/10 hover:bg-brand-gold/20 rounded-xl transition-colors"
          >
            <Plus className="w-4 h-4" />
            Ajouter une note
          </motion.button>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-xl border border-gray-200 p-4 shadow-lg"
          >
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Écrivez votre note..."
              className="w-full p-3 text-sm border border-gray-200 rounded-lg resize-none focus:ring-2 focus:ring-brand-gold/50 focus:border-transparent"
              rows={3}
              autoFocus
            />

            <div className="flex items-center justify-between mt-3">
              <div className="flex gap-2">
                {colorOptions.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`w-6 h-6 rounded-full border-2 transition-transform ${
                      NOTE_COLORS[color].bg
                    } ${selectedColor === color ? "border-gray-600 scale-110" : "border-transparent"}`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
                <button
                  type="submit"
                  disabled={!content.trim()}
                  className="px-4 py-2 text-sm font-medium bg-brand-navy text-white rounded-lg hover:bg-brand-navy-deep disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Enregistrer
                </button>
              </div>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
