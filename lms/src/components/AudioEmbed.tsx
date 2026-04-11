"use client";

import { AudioWithAvatar } from "@/components/AudioWithAvatar";

type Props = {
  url: string | null;
  title: string;
};

/** Lecteur audio + avatar narrateur (Mistral / narration) */
export function AudioEmbed({ url, title }: Props) {
  if (!url) return null;

  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 p-4 shadow-inner">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-zinc-500">Narration</p>
      <AudioWithAvatar audioUrl={url} title={title} size="md" />
    </div>
  );
}
