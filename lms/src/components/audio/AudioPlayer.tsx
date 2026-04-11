"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import type { ModuleAvatar } from "@/data/module-avatars";

type Props = {
  src: string;
  title: string;
  avatar?: ModuleAvatar;
};

function fmt(s: number): string {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

const SPEEDS = [0.75, 1, 1.25, 1.5, 2] as const;

export function AudioPlayer({ src, title, avatar }: Props) {
  const ref = useRef<HTMLAudioElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMeta = () => { setDuration(el.duration); setLoaded(true); };
    const onTime = () => setCurrent(el.currentTime);
    const onEnd = () => setPlaying(false);
    el.addEventListener("loadedmetadata", onMeta);
    el.addEventListener("timeupdate", onTime);
    el.addEventListener("ended", onEnd);
    return () => {
      el.removeEventListener("loadedmetadata", onMeta);
      el.removeEventListener("timeupdate", onTime);
      el.removeEventListener("ended", onEnd);
    };
  }, []);

  const toggle = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (playing) { el.pause(); setPlaying(false); }
    else { el.play(); setPlaying(true); }
  }, [playing]);

  const skip = useCallback((delta: number) => {
    const el = ref.current;
    if (!el) return;
    el.currentTime = Math.max(0, Math.min(el.duration, el.currentTime + delta));
  }, []);

  const seek = useCallback((e: React.MouseEvent) => {
    const el = ref.current;
    const bar = barRef.current;
    if (!el || !bar) return;
    const rect = bar.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    el.currentTime = ratio * el.duration;
  }, []);

  const cycleSpeed = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const idx = SPEEDS.indexOf(speed as typeof SPEEDS[number]);
    const next = SPEEDS[(idx + 1) % SPEEDS.length];
    el.playbackRate = next;
    setSpeed(next);
  }, [speed]);

  const pct = duration > 0 ? (current / duration) * 100 : 0;

  return (
    <div className="rounded-2xl border-2 border-[#1a3a5c]/15 bg-gradient-to-br from-[#1a3a5c] to-[#0f2a42] p-5 shadow-xl">
      <audio ref={ref} src={src} preload="metadata" />

      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        {avatar ? (
          <div
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ring-2 ring-[#d4af37]/50"
            style={{ backgroundColor: avatar.accentColor }}
          >
            {avatar.initials}
          </div>
        ) : (
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#d4af37]/20 text-[#d4af37]">
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
            </svg>
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-white truncate">{title}</p>
          {avatar && (
            <p className="text-xs text-white/60">{avatar.name} — {avatar.role}</p>
          )}
        </div>
        <div className="flex items-center gap-1 text-[10px] text-white/50">
          {loaded && <span>{fmt(duration)}</span>}
        </div>
      </div>

      {/* Waveform-style progress bar */}
      <div
        ref={barRef}
        onClick={seek}
        className="relative h-12 cursor-pointer rounded-xl bg-white/5 overflow-hidden group"
      >
        {/* Fake waveform bars */}
        <div className="absolute inset-0 flex items-end gap-[2px] px-1 py-1">
          {Array.from({ length: 80 }, (_, i) => {
            const barPct = (i / 80) * 100;
            const h = 20 + Math.sin(i * 0.7) * 15 + Math.cos(i * 1.3) * 12 + Math.sin(i * 0.3) * 8;
            const isPlayed = barPct <= pct;
            return (
              <div
                key={i}
                className={`flex-1 rounded-sm transition-colors duration-150 ${
                  isPlayed
                    ? "bg-[#d4af37]"
                    : "bg-white/15 group-hover:bg-white/25"
                }`}
                style={{ height: `${Math.round(Math.min(95, Math.max(15, h)))}%` }}
              />
            );
          })}
        </div>
        {/* Playhead */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_6px_rgba(255,255,255,0.5)] transition-[left] duration-100"
          style={{ left: `${pct}%` }}
        />
      </div>

      {/* Time display */}
      <div className="mt-2 flex items-center justify-between text-[11px] text-white/50 tabular-nums px-1">
        <span>{fmt(current)}</span>
        <span>{loaded ? `-${fmt(Math.max(0, duration - current))}` : "--:--"}</span>
      </div>

      {/* Controls */}
      <div className="mt-3 flex items-center justify-center gap-3">
        <button
          onClick={() => skip(-15)}
          className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white transition"
          title="Reculer 15s"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0019 16V8a1 1 0 00-1.6-.8l-5.334 4zM4.066 11.2a1 1 0 000 1.6l5.334 4A1 1 0 0011 16V8a1 1 0 00-1.6-.8l-5.334 4z" />
          </svg>
          <span className="sr-only">-15s</span>
        </button>

        <button
          onClick={toggle}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-[#d4af37] text-[#1a3a5c] shadow-lg shadow-[#d4af37]/30 hover:bg-[#e0bf4d] transition-all hover:scale-105 active:scale-95"
        >
          {playing ? (
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="h-6 w-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <button
          onClick={() => skip(15)}
          className="flex h-9 w-9 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white transition"
          title="Avancer 15s"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.933 12.8a1 1 0 000-1.6L6.6 7.2A1 1 0 005 8v8a1 1 0 001.6.8l5.333-4zM19.933 12.8a1 1 0 000-1.6l-5.333-4A1 1 0 0013 8v8a1 1 0 001.6.8l5.333-4z" />
          </svg>
          <span className="sr-only">+15s</span>
        </button>
      </div>

      {/* Speed control */}
      <div className="mt-3 flex justify-center">
        <button
          onClick={cycleSpeed}
          className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-[11px] font-bold text-white/80 hover:bg-white/10 transition tabular-nums"
        >
          {speed}x
        </button>
      </div>
    </div>
  );
}
