"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { StickyNote, X } from "lucide-react";
import { getNotesForLesson, Note } from "@/lib/user-content";
import { NoteCard } from "./NoteCard";
import { NoteCreator } from "./NoteCreator";

interface NotesPanelProps {
  moduleSlug: string;
  lessonSlug: string;
  isOpen: boolean;
  onClose: () => void;
}

export function NotesPanel({ moduleSlug, lessonSlug, isOpen, onClose }: NotesPanelProps) {
  const [notes, setNotes] = useState<Note[]>([]);
  const [mounted, setMounted] = useState(false);

  const loadNotes = useCallback(() => {
    setNotes(getNotesForLesson(moduleSlug, lessonSlug));
  }, [moduleSlug, lessonSlug]);

  useEffect(() => {
    // Différé via microtask pour éviter setState synchrone dans l'effet
    queueMicrotask(() => {
      setMounted(true);
      setNotes(getNotesForLesson(moduleSlug, lessonSlug));
    });
  }, [moduleSlug, lessonSlug]);

  if (!mounted) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 z-40"
          />

          {/* Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-brand-gold/10 rounded-xl">
                  <StickyNote className="w-5 h-5 text-brand-gold" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">Mes notes</h2>
                  <p className="text-sm text-gray-500">{notes.length} note{notes.length !== 1 ? "s" : ""}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="mb-6">
                <NoteCreator
                  moduleSlug={moduleSlug}
                  lessonSlug={lessonSlug}
                  onCreated={loadNotes}
                />
              </div>

              <AnimatePresence mode="popLayout">
                {notes.length === 0 ? (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <StickyNote className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-gray-900 font-medium mb-1">Pas encore de notes</h3>
                    <p className="text-sm text-gray-500">
                      Créez votre première note pour cette leçon
                    </p>
                  </motion.div>
                ) : (
                  <div className="space-y-3">
                    {notes.map((note) => (
                      <NoteCard
                        key={note.id}
                        note={note}
                        onUpdate={loadNotes}
                      />
                    ))}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
