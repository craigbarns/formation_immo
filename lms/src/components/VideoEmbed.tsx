"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, CheckCircle } from "lucide-react";

type Props = {
  url: string | null;
  title: string;
};

function isDirectMp4(url: string) {
  const u = url.split("?")[0].toLowerCase();
  return u.endsWith(".mp4") || u.endsWith(".webm") || u.endsWith(".ogg");
}

export function VideoEmbed({ url, title }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showInteractivePause, setShowInteractivePause] = useState(false);
  const [interactiveAnswered, setInteractiveAnswered] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      // Show an interactive prompt at 10 seconds if not already answered
      if (video.currentTime > 10 && !interactiveAnswered && !showInteractivePause) {
        video.pause();
        setShowInteractivePause(true);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    return () => video.removeEventListener("timeupdate", handleTimeUpdate);
  }, [interactiveAnswered, showInteractivePause]);

  const handleContinue = () => {
    setInteractiveAnswered(true);
    setShowInteractivePause(false);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  if (!url) {
    return (
      <div className="flex aspect-video w-full items-center justify-center rounded-lg border border-dashed border-zinc-300 bg-zinc-100 text-center text-sm text-zinc-500">
        <div>
          <p className="font-medium text-zinc-700">Vidéo à produire</p>
          <p className="mt-1 max-w-md">
            Ajoutez l’URL dans <code className="rounded bg-white px-1">src/data/course.ts</code>{" "}
            (champ <code className="rounded bg-white px-1">videoUrl</code>) — ou déposez un fichier
            dans <code className="rounded bg-white px-1">public/videos/</code>.
          </p>
        </div>
      </div>
    );
  }

  if (isDirectMp4(url) || url.startsWith("/videos/")) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black shadow-xl border border-zinc-200">
        <video
          ref={videoRef}
          className="h-full w-full object-contain"
          controls
          playsInline
          preload="metadata"
          src={url}
          title={title}
        />
        
        {/* Interactive Overlay */}
        <AnimatePresence>
          {showInteractivePause && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/70 backdrop-blur-sm p-6"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-white rounded-2xl p-6 sm:p-8 max-w-lg w-full shadow-2xl text-center space-y-6"
              >
                <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center mx-auto text-brand-gold">
                  <HelpCircle size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-brand-navy">Question interactive</h3>
                  <p className="text-zinc-600 mt-2 text-sm leading-relaxed">
                    Avant de continuer, vérifions votre compréhension : quel est le délai légal de rétractation après la signature d&apos;un compromis selon la loi SRU ?
                  </p>
                </div>
                
                <div className="space-y-3">
                  {[
                    { label: "7 jours", isCorrect: false },
                    { label: "10 jours", isCorrect: true },
                    { label: "14 jours", isCorrect: false }
                  ].map((opt, i) => (
                    <button 
                      key={i}
                      onClick={() => {
                        if(opt.isCorrect) handleContinue();
                        else alert("Pas tout à fait. Réessayez !"); // In a real app we'd show nice UI feedback
                      }}
                      className="w-full relative flex items-center justify-between px-4 py-3 border border-zinc-200 rounded-xl hover:border-brand-navy hover:bg-slate-50 transition-colors group"
                    >
                      <span className="font-semibold text-zinc-700 group-hover:text-brand-navy">{opt.label}</span>
                      {opt.isCorrect && interactiveAnswered ? <CheckCircle size={18} className="text-green-500" /> : <div className="w-4 h-4 rounded-full border border-zinc-300 group-hover:border-brand-navy"></div>}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-zinc-400 italic">Trouvez la bonne réponse pour reprendre la vidéo.</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  let embed = url;
  if (url.includes("youtube.com/watch")) {
    const id = new URL(url).searchParams.get("v");
    if (id) embed = `https://www.youtube.com/embed/${id}`;
  } else if (url.includes("youtu.be/")) {
    const id = url.split("youtu.be/")[1]?.split("?")[0];
    if (id) embed = `https://www.youtube.com/embed/${id}`;
  } else if (url.includes("vimeo.com")) {
    const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
    if (m) embed = `https://player.vimeo.com/video/${m[1]}`;
  }

  return (
    <div className="aspect-video w-full overflow-hidden rounded-lg shadow-lg">
      <iframe
        title={title}
        src={embed}
        className="h-full w-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
