"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Pencil, Trash2, Clock, Tag } from "lucide-react";
import { Note, NOTE_COLORS, deleteNote, updateNote } from "@/lib/user-content";
import { formatDistanceToNow } from "@/lib/utils/date";

interface NoteCardProps {
  note: Note;
  onUpdate: () => void;
  lessonTitle?: string;
}

export function NoteCard({ note, onUpdate, lessonTitle }: NoteCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(note.content);
  const colors = NOTE_COLORS[note.color || "yellow"];

  const handleSave = () => {
    if (editContent.trim()) {
      updateNote(note.id, { content: editContent.trim() });
      setIsEditing(false);
      onUpdate();
    }
  };

  const handleDelete = () => {
    if (confirm("Supprimer cette note ?")) {
      deleteNote(note.id);
      onUpdate();
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`rounded-xl border ${colors.border} ${colors.bg} p-4 group`}
    >
      {isEditing ? (
        <div className="space-y-3">
          <textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-200 resize-none focus:ring-2 focus:ring-brand-gold/50 focus:border-transparent"
            rows={3}
            autoFocus
          />
          <div className="flex gap-2 justify-end">
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800"
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-1.5 text-sm bg-brand-navy text-white rounded-lg hover:bg-brand-navy-deep"
            >
              Enregistrer
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              {lessonTitle && (
                <p className="text-xs text-gray-500 mb-1">{lessonTitle}</p>
              )}
              <p className={`${colors.text} whitespace-pre-wrap`}>{note.content}</p>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => setIsEditing(true)}
                className="p-1.5 text-gray-400 hover:text-brand-navy rounded-lg hover:bg-white/50"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                onClick={handleDelete}
                className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-white/50"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-black/5">
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="w-3 h-3" />
              {formatDistanceToNow(note.updatedAt)}
            </div>
            {note.tags.length > 0 && (
              <div className="flex items-center gap-1">
                <Tag className="w-3 h-3 text-gray-400" />
                <div className="flex gap-1">
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2 py-0.5 bg-white/50 rounded-full text-gray-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </motion.div>
  );
}
