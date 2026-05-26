"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Play, Pause, Volume2 } from "lucide-react";

interface Props {
  moduleSlug: string;
  moduleTitle: string;
  avatarName: string;
  avatarInitials: string;
  accentColor: string;
}

export function ModuleIntroPlayer({
  moduleSlug,
  moduleTitle,
  avatarName,
  avatarInitials,
  accentColor,
}: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const audioUrl = `/audio/intros/${moduleSlug}.mp3`;

  const togglePlay = useCallback(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    const onEnded = () => {
      setIsPlaying(false);
      setProgress(0);
    };
    const onTimeUpdate = () => {
      if (audio.duration) {
        setProgress(audio.currentTime / audio.duration);
      }
    };
    const onLoadedMetadata = () => setDuration(audio.duration);

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);
    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("loadedmetadata", onLoadedMetadata);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("loadedmetadata", onLoadedMetadata);
    };
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
      {/* Avatar + Formateur */}
      <div className="flex items-start gap-4">
        <div
          className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-xl font-bold text-white shadow-lg"
          style={{ backgroundColor: accentColor }}
        >
          {avatarInitials}
          {isPlaying && (
            <span
              className="absolute -right-1 -top-1 flex h-4 w-4 rounded-full bg-brand-gold"
              style={{
                animation: "pulse-ring 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              }}
            />
          )}
        </div>
        <div className="min-w-0">
          <p className="text-lg font-bold leading-tight">{avatarName}</p>
          <p className="mt-1 text-sm font-medium text-brand-gold">
            Votre formateur
          </p>
        </div>
      </div>

      {/* Intro audio */}
      <div className="mt-5 rounded-xl bg-black/20 p-4">
        <p className="text-2xs font-bold uppercase tracking-wide text-white/60">
          Introduction du module
        </p>
        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={togglePlay}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-gold text-brand-navy shadow-lg transition hover:scale-105 active:scale-95"
            aria-label={isPlaying ? "Pause" : "Lire l'introduction"}
          >
            {isPlaying ? (
              <Pause className="h-4 w-4 fill-current" />
            ) : (
              <Play className="h-4 w-4 fill-current" />
            )}
          </button>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">
              {moduleTitle.replace(/^Module \d+ — /, "")}
            </p>
            <div className="mt-1.5 flex items-center gap-2">
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full rounded-full bg-brand-gold transition-all"
                  style={{ width: `${progress * 100}%` }}
                />
              </div>
              <span className="text-2xs tabular-nums text-white/60">
                {formatTime(progress * duration)} / {formatTime(duration)}
              </span>
            </div>
          </div>
          <Volume2 className="h-4 w-4 shrink-0 text-white/75" />
        </div>
      </div>

      <audio ref={audioRef} src={audioUrl} preload="metadata" />
    </div>
  );
}
