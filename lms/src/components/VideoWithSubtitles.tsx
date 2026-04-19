"use client";

import { useState, useRef, useEffect } from "react";
import { Subtitles, Maximize, Volume2, VolumeX, Play, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

interface SubtitleCue {
  id: number;
  start: number;
  end: number;
  text: string;
}

interface VideoWithSubtitlesProps {
  src: string;
  poster?: string;
  srtUrl?: string;
  vttUrl?: string;
  autoPlay?: boolean;
  className?: string;
  onProgress?: (currentTime: number, duration: number) => void;
  onEnded?: () => void;
}

function timeToSeconds(time: string): number {
  const parts = time.replace(",", ".").split(":");
  if (parts.length !== 3) return 0;
  return parseInt(parts[0]) * 3600 + parseInt(parts[1]) * 60 + parseFloat(parts[2]);
}

function parseSRT(srt: string): SubtitleCue[] {
  const cues: SubtitleCue[] = [];
  const blocks = srt.trim().split(/\n\s*\n/);
  for (const block of blocks) {
    const lines = block.trim().split("\n");
    if (lines.length < 3) continue;
    const id = parseInt(lines[0]);
    const times = lines[1].split(" --> ");
    if (times.length !== 2) continue;
    const start = timeToSeconds(times[0].trim());
    const end = timeToSeconds(times[1].trim());
    const text = lines.slice(2).join("\n").replace(/<[^>]+>/g, "");
    cues.push({ id, start, end, text });
  }
  return cues;
}

export function VideoWithSubtitles({
  src,
  poster,
  srtUrl,
  vttUrl,
  autoPlay = false,
  className,
  onProgress,
  onEnded
}: VideoWithSubtitlesProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showSubtitles, setShowSubtitles] = useState(true);
  const [cues, setCues] = useState<SubtitleCue[]>([]);
  const currentCue = cues.find(c => currentTime >= c.start && currentTime <= c.end) || null;
  const [showControls, setShowControls] = useState(true);
  const controlsTimeout = useRef<NodeJS.Timeout | null>(null);

  // Load subtitles
  useEffect(() => {
    if (srtUrl) {
      fetch(srtUrl)
        .then(r => r.text())
        .then(parseSRT)
        .then(setCues)
        .catch(() => { /* ignore */ });
    }
  }, [srtUrl]);



  // Progress tracking
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setDuration(video.duration);
      onProgress?.(video.currentTime, video.duration);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      onEnded?.();
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("loadedmetadata", handleLoadedMetadata);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
    };
  }, [onProgress, onEnded]);

  // Hide controls after inactivity
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeout.current) clearTimeout(controlsTimeout.current);
    controlsTimeout.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3000);
  };

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (seconds: number): string => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div 
      className={cn("relative group rounded-xl overflow-hidden bg-black", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        className="w-full aspect-video"
        onClick={togglePlay}
        playsInline
      >
        {vttUrl && (
          <track kind="subtitles" src={vttUrl} srcLang="fr" label="Français" default />
        )}
      </video>

      {/* Subtitle Overlay */}
      {showSubtitles && currentCue && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 max-w-[90%] text-center">
          <div className="bg-black/70 px-4 py-2 rounded-lg backdrop-blur-sm">
            <p className="text-white text-lg font-medium drop-shadow-lg">
              {currentCue.text}
            </p>
          </div>
        </div>
      )}

      {/* Play Overlay (when paused) */}
      {!isPlaying && (
        <button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-colors"
        >
          <div className="w-20 h-20 bg-white/20 backdrop-blur rounded-full flex items-center justify-center hover:scale-110 transition-transform">
            <Play className="w-10 h-10 text-white fill-white ml-1" />
          </div>
        </button>
      )}

      {/* Controls Bar */}
      <div className={cn(
        "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4 transition-opacity duration-300",
        showControls ? "opacity-100" : "opacity-0"
      )}>
        {/* Progress Bar */}
        <input
          type="range"
          min={0}
          max={duration || 100}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1 bg-white/30 rounded-full appearance-none cursor-pointer accent-white hover:accent-gold-400"
          style={{
            background: `linear-gradient(to right, white ${(currentTime / duration) * 100}%, rgba(255,255,255,0.3) ${(currentTime / duration) * 100}%)`
          }}
        />

        {/* Control Buttons */}
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-3">
            {/* Play/Pause */}
            <button 
              onClick={togglePlay}
              className="text-white hover:text-gold-400 transition-colors"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>

            {/* Volume */}
            <div className="flex items-center gap-2 group/volume">
              <button 
                onClick={toggleMute}
                className="text-white hover:text-gold-400 transition-colors"
              >
                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={volume}
                onChange={(e) => {
                  const v = parseFloat(e.target.value);
                  setVolume(v);
                  if (videoRef.current) videoRef.current.volume = v;
                }}
                className="w-0 group-hover/volume:w-20 transition-all duration-200 h-1 bg-white/30 rounded-full accent-white"
              />
            </div>

            {/* Time */}
            <span className="text-white/80 text-sm font-mono">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {/* Subtitles Toggle */}
            <button
              onClick={() => setShowSubtitles(!showSubtitles)}
              className={cn(
                "transition-colors",
                showSubtitles ? "text-gold-400" : "text-white hover:text-gold-400"
              )}
              title={showSubtitles ? "Masquer les sous-titres" : "Afficher les sous-titres"}
            >
              <Subtitles className="w-5 h-5" />
            </button>

            {/* Fullscreen */}
            <button 
              onClick={() => {
                const el = videoRef.current?.parentElement;
                if (el) {
                  if (document.fullscreenElement) {
                    document.exitFullscreen();
                  } else {
                    el.requestFullscreen();
                  }
                }
              }}
              className="text-white hover:text-gold-400 transition-colors"
            >
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
