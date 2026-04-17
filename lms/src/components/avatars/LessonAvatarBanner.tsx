"use client";

import type { ModuleAvatar } from "@/data/module-avatars";

export function LessonAvatarBanner({ avatar }: { avatar: ModuleAvatar }) {
  return (
    <div
      className="card-elevated mb-6 flex items-center gap-4 rounded-2xl px-4 py-3.5 md:px-5"
      style={{
        borderColor: `${avatar.accentColor}35`,
        background: `linear-gradient(135deg, ${avatar.accentColor}0d 0%, white 55%)`,
        boxShadow: `0 8px 28px ${avatar.accentColor}12`,
      }}
    >
      <div
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-sm font-bold text-white shadow-md"
        style={{ backgroundColor: avatar.accentColor }}
      >
        {avatar.initials}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-bold" style={{ color: avatar.accentColor }}>
          {avatar.name}
        </p>
        <p className="text-xs leading-snug text-zinc-600">
          {avatar.role} — {avatar.mistralVoiceLabel}
        </p>
      </div>
    </div>
  );
}
