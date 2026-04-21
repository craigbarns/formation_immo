"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HelpCircle, CheckCircle, Play, Film } from "lucide-react";

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
      <div className="relative aspect-video w-full flex items-center justify-center rounded-[2rem] border border-white/5 bg-[#030712] text-center overflow-hidden shadow-2xl group">
        <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
        <div className="relative z-10 flex flex-col items-center gap-6">
            <div className="relative">
                <div className="absolute inset-0 rounded-full blur-2xl bg-brand-gold/10 animate-pulse" />
                <div className="relative h-16 w-16 flex items-center justify-center rounded-2xl bg-white/5 border border-white/10 group-hover:border-brand-gold/40 transition-colors">
                    <Film className="w-8 h-8 text-white/20 group-hover:text-brand-gold transition-colors" />
                </div>
            </div>
            <div>
                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Visualisation</p>
                <h3 className="mt-2 text-lg font-black text-white/60 uppercase tracking-widest italic">Contenu vidéo en production</h3>
            </div>
        </div>
      </div>
    );
  }

  if (isDirectMp4(url) || url.startsWith("/videos/")) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-[2rem] bg-[#030712] shadow-2xl border border-white/10">
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
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#030712]/90 backdrop-blur-xl p-8"
            >
              <motion.div 
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                className="bg-[#070d18] border border-white/10 rounded-[2.5rem] p-8 md:p-10 max-w-lg w-full shadow-2xl text-center space-y-8"
              >
                <div className="w-16 h-16 rounded-2xl bg-brand-gold/10 flex items-center justify-center mx-auto text-brand-gold border border-brand-gold/20 shadow-lg">
                  <HelpCircle size={32} />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-tight">Question Interactive</h3>
                  <p className="text-white/60 mt-4 text-base leading-relaxed italic">
                    &laquo; Quel est le délai légal de rétractation après la signature d&apos;un compromis ? &raquo;
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
                        else alert("Pas tout à fait. Réessayez !");
                      }}
                      className="w-full group relative flex items-center justify-between px-6 py-4 bg-white/5 border border-white/10 rounded-2xl hover:border-brand-gold transition-all"
                    >
                      <span className="font-bold text-white/80 group-hover:text-white">{opt.label}</span>
                      {opt.isCorrect && interactiveAnswered ? <CheckCircle size={20} className="text-emerald-400" /> : <div className="w-5 h-5 rounded-full border border-white/20 group-hover:border-brand-gold"></div>}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] font-black uppercase tracking-widest text-white/20">Validation requise pour débloquer la suite</p>
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
    <div className="aspect-video w-full overflow-hidden rounded-[2rem] bg-black shadow-2xl border border-white/10">
      <iframe
        title={title}
        src={embed}
        className="h-full w-full opacity-90 transition-opacity hover:opacity-100"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
