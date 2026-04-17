"use client";

import { useState } from "react";
import type { ModuleAvatar } from "@/data/module-avatars";

export function AvatarCard({ avatar }: { avatar: ModuleAvatar }) {
  const [showPrompt, setShowPrompt] = useState(false);
  const [copied, setCopied] = useState(false);

  function copyPrompt() {
    navigator.clipboard.writeText(avatar.portraitPrompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-4">
        {/* Avatar placeholder */}
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-xl font-bold text-white"
          style={{ backgroundColor: avatar.accentColor }}
        >
          {avatar.initials}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-brand-navy">{avatar.name}</h3>
          <p className="text-sm font-medium" style={{ color: avatar.accentColor }}>
            {avatar.role}
          </p>
          <p className="mt-1 text-xs text-zinc-600">{avatar.description}</p>
        </div>
      </div>

      {/* Voice info */}
      <div className="mt-3 flex flex-wrap gap-2">
        <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-[10px] font-medium text-zinc-600">
          {avatar.mistralVoiceLabel}
        </span>
      </div>

      {/* Midjourney prompt */}
      <button
        onClick={() => setShowPrompt(!showPrompt)}
        className="mt-3 text-xs font-medium text-brand-navy hover:underline"
      >
        {showPrompt ? "Masquer le prompt" : "Voir le prompt Midjourney"}
      </button>
      {showPrompt && (
        <div className="mt-2 rounded-lg bg-zinc-50 p-3">
          <p className="text-xs leading-relaxed text-zinc-700 font-mono">{avatar.portraitPrompt}</p>
          <button
            onClick={copyPrompt}
            className="mt-2 rounded bg-brand-navy px-3 py-1 text-[10px] font-bold text-white hover:bg-brand-navy-deep"
          >
            {copied ? "Copie !" : "Copier le prompt"}
          </button>
        </div>
      )}
    </div>
  );
}
