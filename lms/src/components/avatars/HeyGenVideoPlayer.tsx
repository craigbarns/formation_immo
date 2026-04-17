"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, Maximize2, Volume2, VolumeX } from "lucide-react";

interface HeyGenVideoPlayerProps {
  videoUrl: string;
  moduleSlug: string;
  lessonTitle: string;
  presenterName: string;
  presenterRole: string;
  accentColor?: string;
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function HeyGenVideoPlayer({
  videoUrl,
  moduleSlug,
  lessonTitle,
  presenterName,
  presenterRole,
  accentColor = "#1a3a5c",
}: HeyGenVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [started, setStarted] = useState(false);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play();
      setPlaying(true);
      setStarted(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    setProgress((v.currentTime / v.duration) * 100);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    v.currentTime = pct * v.duration;
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) setDuration(videoRef.current.duration);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const currentTime = videoRef.current ? videoRef.current.currentTime : 0;

  return (
    <div
      className="overflow-hidden rounded-2xl border shadow-xl"
      style={{ borderColor: `${accentColor}30` }}
    >
      {/* Video container */}
      <div className="relative bg-zinc-900 aspect-video">
        <video
          ref={videoRef}
          src={videoUrl}
          className="h-full w-full object-cover"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={() => setPlaying(false)}
          playsInline
        />

        {/* Play overlay (avant démarrage) */}
        <AnimatePresence>
          {!started && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/55 backdrop-blur-sm"
            >
              {/* Avatar preview */}
              <div
                className="mb-4 flex h-16 w-16 items-center justify-center rounded-full text-lg font-bold text-white shadow-lg opacity-90"
                style={{ backgroundColor: accentColor }}
              >
                {getInitials(presenterName)}
              </div>
              <p className="text-white font-bold text-lg mb-1">{presenterName}</p>
              <p
                className="text-xs font-semibold uppercase tracking-wider mb-6"
                style={{ color: accentColor === "#1a3a5c" ? "#d4af37" : accentColor }}
              >
                {presenterRole}
              </p>
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.96 }}
                onClick={togglePlay}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-zinc-900 shadow-2xl transition"
              >
                <Play className="h-7 w-7 translate-x-0.5" />
              </motion.button>
              <p className="mt-4 text-sm text-white/60">{lessonTitle}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Click to toggle when playing */}
        {started && (
          <div className="absolute inset-0 cursor-pointer" onClick={togglePlay}>
            <AnimatePresence>
              {!playing && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm">
                    <Play className="h-6 w-6 text-white translate-x-0.5" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Controls bar */}
      <div
        className="px-4 py-3"
        style={{ background: `linear-gradient(135deg, ${accentColor}15, white)` }}
      >
        {/* Progress bar */}
        <div
          className="mb-3 h-1.5 cursor-pointer overflow-hidden rounded-full bg-zinc-200"
          onClick={handleSeek}
        >
          <motion.div
            className="h-full rounded-full"
            style={{
              width: `${progress}%`,
              background: `linear-gradient(90deg, ${accentColor}, ${accentColor}99)`,
            }}
            transition={{ duration: 0.1 }}
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          {/* Left: play + time */}
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:opacity-80"
              style={{ backgroundColor: accentColor }}
            >
              {playing
                ? <Pause className="h-3.5 w-3.5" />
                : <Play className="h-3.5 w-3.5 translate-x-px" />
              }
            </button>
            <span className="text-xs font-mono tabular-nums text-zinc-500">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          {/* Right: mute + fullscreen */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleMute}
              className="rounded-lg p-1.5 text-zinc-500 transition hover:text-zinc-700"
            >
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <button
              onClick={() => videoRef.current?.requestFullscreen()}
              className="rounded-lg p-1.5 text-zinc-500 transition hover:text-zinc-700"
            >
              <Maximize2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
