"use client";

import { useState, useRef, useEffect } from "react";
import { Loader2, Volume2, Mic } from "lucide-react";
import { cn } from "@/lib/utils";

interface SadTalkerAvatarProps {
  imageUrl: string;
  audioUrl: string;
  videoUrl?: string;
  transcript?: string;
  mode?: "video" | "canvas" | "split";
  className?: string;
  onReady?: () => void;
  onError?: (error: string) => void;
}

/**
 * Composant SadTalker Avatar
 * Affiche un avatar parlant synchronisé avec l'audio.
 */
export function SadTalkerAvatar({
  imageUrl,
  audioUrl,
  videoUrl,
  transcript,
  mode = "split",
  className,
  onReady,
  onError
}: SadTalkerAvatarProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentWord, setCurrentWord] = useState(0);
  const [imageError, setImageError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const words = transcript?.split(/\s+/) || [];

  // Synchronisation audio
  useEffect(() => {
    if (!audioRef.current) return;
    
    const audio = audioRef.current;
    
    const handleTimeUpdate = () => {
      const progress = audio.currentTime / (audio.duration || 1);
      setProgress(progress);
      setCurrentWord(Math.floor(progress * words.length));
    };
    
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);
    
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("ended", handleEnded);
    
    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [words.length]);

  // Chargement
  useEffect(() => {
    if (videoUrl && mode === "video") {
      const video = videoRef.current;
      if (video) {
        video.onloadeddata = () => {
          setIsLoading(false);
          onReady?.();
        };
        video.onerror = () => {
          onError?.("Erreur de chargement de la vidéo");
          setIsLoading(false);
        };
      }
    } else {
      // Simuler le chargement pour l'image
      const timer = setTimeout(() => {
        setIsLoading(false);
        onReady?.();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [videoUrl, imageUrl, mode, onReady, onError]);

  const togglePlay = () => {
    if (mode === "video" && videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    } else if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
    }
  };

  // Mode Vidéo
  if (mode === "video" && videoUrl) {
    return (
      <div className={cn("relative rounded-xl overflow-hidden bg-black", className)}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-navy-900 z-10">
            <div className="text-center">
              <Loader2 className="w-8 h-8 text-gold-400 animate-spin mx-auto mb-2" />
              <p className="text-white/70 text-sm">Chargement de l'avatar...</p>
            </div>
          </div>
        )}
        
        <video
          ref={videoRef}
          src={videoUrl}
          poster={imageUrl}
          className="w-full h-full object-cover"
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          playsInline
          controls
        />

        {transcript && (
          <div className="absolute bottom-16 left-4 right-4">
            <div className="bg-black/60 backdrop-blur px-4 py-2 rounded-lg">
              <p className="text-white text-sm">
                {words.map((word, i) => (
                  <span 
                    key={i}
                    className={cn(
                      "transition-colors",
                      i === currentWord ? "text-gold-400 font-medium" : "text-white/70"
                    )}
                  >
                    {word}{" "}
                  </span>
                ))}
              </p>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Mode Split/Canvas avec image statique + animation bouche CSS
  return (
    <div className={cn("relative rounded-xl overflow-hidden bg-navy-900", className)}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Loader2 className="w-8 h-8 text-gold-400 animate-spin" />
        </div>
      )}

      {/* Avatar Container */}
      <div className="relative aspect-square bg-gradient-to-br from-navy-800 to-navy-900 overflow-hidden rounded-t-xl">
        {/* Image de l'avatar */}
        <img
          src={imageUrl}
          alt="Marie - Coach immobilier"
          className="w-full h-full object-cover"
          crossOrigin="anonymous"
          onError={() => {
            console.error('Erreur chargement image:', imageUrl);
            setImageError(true);
          }}
        />
        
        {/* Fallback si image en erreur */}
        {imageError && (
          <div className="absolute inset-0 flex items-center justify-center bg-navy-800">
            <div className="text-center">
              <div className="text-6xl mb-2">👩‍🏫</div>
              <p className="text-white/50 text-sm">Marie</p>
            </div>
          </div>
        )}
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent pointer-events-none" />

        {/* Animation bouche superposée */}
        {isPlaying && (
          <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2">
            <div 
              className="w-12 h-6 bg-amber-700/60 rounded-full animate-pulse"
              style={{
                animation: 'mouthMove 0.15s ease-in-out infinite alternate'
              }}
            />
          </div>
        )}

        {/* Indicateur de parole */}
        {isPlaying && (
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-1 bg-black/50 rounded-full px-2 py-1">
              <div className="w-1 h-4 bg-gold-400 rounded-full animate-pulse" />
              <div className="w-1 h-6 bg-gold-400 rounded-full animate-pulse delay-75" />
              <div className="w-1 h-3 bg-gold-400 rounded-full animate-pulse delay-150" />
            </div>
          </div>
        )}
      </div>

      {/* Audio player */}
      <div className="p-4 bg-navy-800">
        <audio
          ref={audioRef}
          src={audioUrl}
          className="w-full"
          controls
          onError={(e) => {
            console.error('Erreur chargement audio:', audioUrl);
            onError?.("Erreur de chargement de l'audio");
          }}
          onCanPlay={() => {
            console.log('Audio prêt:', audioUrl);
          }}
        />
      </div>

      {/* Transcription */}
      {transcript && (
        <div className="mt-4 p-4 bg-navy-800/50 rounded-lg">
          <div className="flex items-center gap-2 mb-2 text-gold-400">
            <Mic className="w-4 h-4" />
            <span className="text-xs uppercase tracking-wider">Transcription</span>
          </div>
          <p className="text-white/90 text-sm leading-relaxed">
            {words.map((word, i) => (
              <span 
                key={i}
                className={cn(
                  "transition-colors duration-200",
                  i === currentWord ? "text-gold-400 font-medium bg-gold-400/10 px-1 rounded" : ""
                )}
              >
                {word}{" "}
              </span>
            ))}
          </p>
        </div>
      )}

      {/* Info mode */}
      <div className="mt-4 p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg">
        <p className="text-amber-200 text-xs">
          <strong>Mode {mode}:</strong> {mode === "canvas" 
            ? "Animation canvas avec synchronisation basique." 
            : "Audio + image séparés. Générez une vidéo SadTalker pour une synchronisation labiale réaliste."}
        </p>
      </div>

      <style jsx>{`
        @keyframes mouthMove {
          from { transform: scaleY(0.3); }
          to { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
}

// Hook pour générer des vidéos SadTalker
export function useSadTalkerGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<{ videoUrl: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generate = async (imageUrl: string, audioUrl: string, options?: {
    expressionScale?: number;
    headMotion?: boolean;
  }) => {
    setIsGenerating(true);
    setProgress(0);
    setError(null);

    try {
      // Simulation
      const steps = 10;
      for (let i = 0; i <= steps; i++) {
        await new Promise(r => setTimeout(r, 500));
        setProgress((i / steps) * 100);
      }

      setResult({
        videoUrl: `/generated/avatar-${Date.now()}.mp4`
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de génération");
    } finally {
      setIsGenerating(false);
    }
  };

  return { generate, isGenerating, progress, result, error };
}
