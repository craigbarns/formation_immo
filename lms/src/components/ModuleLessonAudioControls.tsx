"use client";

import { AudioWithAvatar } from "@/components/AudioWithAvatar";

type Props = {
  url: string;
  title: string;
};

/** Liste module : lecteur compact + avatar */
export function ModuleLessonAudioControls({ url, title }: Props) {
  return <AudioWithAvatar audioUrl={url} title={title} size="sm" />;
}
