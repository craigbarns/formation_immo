"use client";

import { useMemo } from "react";
import { parseSrt, findActiveSubtitle, type SrtEntry } from "@/lib/srt-parser";

interface SubtitleOverlayProps {
  srtContent: string | null;
  currentTime: number;
  visible: boolean;
}

export function SubtitleOverlay({ srtContent, currentTime, visible }: SubtitleOverlayProps) {
  const entries = useMemo(() => {
    if (!srtContent) return [];
    return parseSrt(srtContent);
  }, [srtContent]);

  const active = useMemo(() => {
    if (!visible || !entries.length) return null;
    return findActiveSubtitle(entries, currentTime);
  }, [entries, currentTime, visible]);

  if (!active) return null;

  return (
    <div className="absolute bottom-16 left-0 right-0 z-30 flex justify-center pointer-events-none">
      <div
        className="max-w-[85%] px-5 py-2.5 rounded-lg text-center"
        style={{
          background: "rgba(0,0,0,0.7)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <p className="text-sm font-medium text-white leading-snug drop-shadow-md">
          {active.text}
        </p>
      </div>
    </div>
  );
}
