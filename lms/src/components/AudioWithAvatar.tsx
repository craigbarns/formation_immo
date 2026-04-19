"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

const AVATAR_SRC = "/images/narration-avatar.svg";

type Props = {
  audioUrl: string;
  title: string;
  size?: "sm" | "md";
  className?: string;
};

/**
 * Audio + avatar : bouche animée selon le signal (AnalyserNode + RMS).
 */
export function AudioWithAvatar({ audioUrl, title, size = "md", className = "" }: Props) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);
  const [mouth, setMouth] = useState(0);

  const ctxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const wiredRef = useRef(false);
  const rafRef = useRef(0);
  const smoothRef = useRef(0);

  const imgClass =
    size === "sm"
      ? "h-10 w-10 min-h-10 min-w-10 shrink-0 rounded-full object-cover"
      : "h-14 w-14 min-h-14 min-w-14 shrink-0 rounded-full object-cover";
  const audioClass =
    size === "sm"
      ? "h-9 w-full max-w-[min(100%,280px)] min-w-[180px]"
      : "w-full min-w-0 flex-1";

  const wireIfNeeded = useCallback(async (audio: HTMLAudioElement) => {
    const AC =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!ctxRef.current) ctxRef.current = new AC();
    const ctx = ctxRef.current;
    if (ctx.state === "suspended") await ctx.resume();
    if (wiredRef.current) return;
    try {
      const source = ctx.createMediaElementSource(audio);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 2048;
      analyser.smoothingTimeConstant = 0.55;
      source.connect(analyser);
      analyser.connect(ctx.destination);
      analyserRef.current = analyser;
      wiredRef.current = true;
    } catch {
      /* MediaElementSource déjà créé sur cet élément */
    }
  }, []);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const sync = () => setPlaying(!el.paused);
    el.addEventListener("play", sync);
    el.addEventListener("pause", sync);
    el.addEventListener("ended", sync);
    return () => {
      el.removeEventListener("play", sync);
      el.removeEventListener("pause", sync);
      el.removeEventListener("ended", sync);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const tick = () => {
      const analyser = analyserRef.current;
      if (!audio.paused) {
        if (analyser) {
          const buf = new Uint8Array(analyser.fftSize);
          analyser.getByteTimeDomainData(buf);
          let sum = 0;
          for (let i = 0; i < buf.length; i++) {
            const v = (buf[i] - 128) / 128;
            sum += v * v;
          }
          const rms = Math.sqrt(sum / buf.length);
          const target = Math.min(1, rms * 5.5);
          smoothRef.current += (target - smoothRef.current) * 0.38;
        }
        /* sinon : branchement Web Audio en cours — on garde la bouche stable */
      } else {
        smoothRef.current += (0 - smoothRef.current) * 0.22;
      }
      setMouth(smoothRef.current);

      const keepGoing = !audio.paused || smoothRef.current > 0.04;
      if (keepGoing) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setMouth(0);
        smoothRef.current = 0;
      }
    };

    const onPlay = () => {
      void wireIfNeeded(audio);
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };

    const onPauseOrEnd = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };

    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPauseOrEnd);
    audio.addEventListener("ended", onPauseOrEnd);

    return () => {
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPauseOrEnd);
      audio.removeEventListener("ended", onPauseOrEnd);
      cancelAnimationFrame(rafRef.current);
    };
  }, [audioUrl, wireIfNeeded]);

  const mouthScaleY = 0.35 + mouth * 1.15;
  const mouthH = size === "sm" ? 3 + mouth * 7 : 4 + mouth * 10;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className={`relative shrink-0 rounded-full bg-brand-navy/5 p-0.5 transition-shadow duration-300 ${
          playing ? "shadow-[0_0_0_3px_rgba(212,175,55,0.45)] ring-2 ring-brand-gold/70" : ""
        }`}
      >
        <span className="sr-only">Avatar dont la bouche suit la narration</span>
        <div className="relative overflow-hidden rounded-full">
          <Image
            src={AVATAR_SRC}
            alt=""
            className={imgClass}
            width={size === "sm" ? 40 : 56}
            height={size === "sm" ? 40 : 56}
            decoding="async"
          />
          <div
            className="pointer-events-none absolute left-1/2 rounded-b-full border border-rose-900/20 bg-gradient-to-b from-rose-300 to-rose-500 shadow-inner"
            style={{
              bottom: size === "sm" ? "18%" : "20%",
              width: size === "sm" ? "26%" : "24%",
              height: `${mouthH}px`,
              transform: `translateX(-50%) scaleY(${mouthScaleY})`,
              transformOrigin: "center top",
              opacity: 0.85 + mouth * 0.15,
            }}
            aria-hidden
          />
        </div>
      </div>
      <audio ref={audioRef} controls className={audioClass} preload="metadata" title={title}>
        <source src={audioUrl} type="audio/mpeg" />
      </audio>
    </div>
  );
}
