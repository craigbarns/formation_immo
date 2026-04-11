"use client";

import { useState } from "react";
import { StickyNote } from "lucide-react";
import { NotesPanel } from "@/components/user-content/NotesPanel";

interface NotesPanelButtonProps {
  moduleSlug: string;
  lessonSlug: string;
}

export function NotesPanelButton({ moduleSlug, lessonSlug }: NotesPanelButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-brand-navy bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors border border-blue-200"
      >
        <StickyNote className="w-4 h-4" />
        Mes notes
      </button>

      <NotesPanel
        moduleSlug={moduleSlug}
        lessonSlug={lessonSlug}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </>
  );
}
