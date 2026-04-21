"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import { MODULE_AVATARS } from "@/data/module-avatars";
import { ChevronDown, MessageSquare } from "lucide-react";

interface LessonPresenterPanelProps {
  moduleSlug: string;
  lessonTitle: string;
  isAudioPlaying?: boolean;
}

const INTRO_MESSAGES: Record<string, string[]> = {
  juridique: [
    "Bienvenue dans ce module juridique. Nous allons ensemble maîtriser les fondamentaux qui font la différence sur le terrain.",
    "Chaque leçon est construite autour de cas concrets. Lisez attentivement — ces informations vous protègent et protègent vos clients.",
  ],
  transaction: [
    "Prête à découvrir les techniques des meilleures négociatrices ? Dans ce module, chaque outil que vous apprenez vous rapproche du closing.",
    "La négociation, ça s'entraîne. Suivez les étapes et mettez en pratique dès votre prochaine visite.",
  ],
  financement: [
    "Les chiffres ne mentent pas. Dans ce module, vous allez comprendre les mécanismes du crédit et de la fiscalité pour mieux conseiller vos clients.",
    "Une bonne agente immobilière maîtrise les aspects financiers. C'est ce qui vous donne de la crédibilité face aux acheteurs et investisseurs.",
  ],
  marketing: [
    "Dans l'immobilier d'aujourd'hui, votre visibilité digitale est aussi importante que votre réseau. On va construire ça ensemble.",
    "Photos, annonces, réseaux sociaux, SEO — chaque leçon vous donne un outil concret à appliquer dès cette semaine.",
  ],
  terrain: [
    "Le terrain, c'est là où tout se concrétise. Ce module vous donne les techniques des meilleures directrices d'agence.",
    "30 ans d'expérience condensés en quelques leçons. Allez, on y va — votre prochain mandat exclusif commence ici.",
  ],
};

export function LessonPresenterPanel({
  moduleSlug,
  lessonTitle,
  isAudioPlaying = false,
}: LessonPresenterPanelProps) {
  const avatar = MODULE_AVATARS.find((a) => a.moduleSlug === moduleSlug);
  const messages = INTRO_MESSAGES[moduleSlug] || [];
  const [msgIndex, setMsgIndex] = useState(0);
  const [expanded, setExpanded] = useState(false);

  if (!avatar) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-10 overflow-hidden rounded-[2rem] border border-white/10 bg-[#070d18] shadow-2xl"
    >
      <div className="flex items-center gap-6 p-5 md:p-6 lg:p-8">
        {/* Avatar */}
        <div className="shrink-0 relative group">
          {avatar.photoUrl ? (
            <div
              className="relative h-20 w-20 overflow-hidden rounded-full shadow-2xl ring-4 ring-white/5 transition-transform duration-500 group-hover:scale-105"
              style={{ padding: "3px", background: `linear-gradient(135deg, ${avatar.accentColor}, #d4af37)` }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-full bg-[#030712]">
                <Image src={avatar.photoUrl} alt={avatar.name} fill className="object-cover" sizes="80px" />
              </div>
            </div>
          ) : (
            <div
              className="flex h-16 w-16 items-center justify-center rounded-full text-xl font-black text-white shadow-2xl ring-4 ring-white/5"
              style={{ backgroundColor: avatar.accentColor }}
            >
              {avatar.initials}
            </div>
          )}
          {isAudioPlaying && (
              <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 shadow-lg border-2 border-[#070d18]">
                   <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
              </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span
              className="rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-lg"
              style={{ backgroundColor: avatar.accentColor }}
            >
              {avatar.role}
            </span>
            {isAudioPlaying && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-400"
              >
                Audio actif
              </motion.span>
            )}
          </div>
          <p className="text-xl font-black text-white tracking-tight uppercase">{avatar.name}</p>
          <p className="text-sm text-white/50 mt-1 line-clamp-1">
            Votre experte référente pour : <span className="text-brand-gold font-bold italic">{lessonTitle}</span>
          </p>
        </div>

        {/* Toggle speech */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="group shrink-0 flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-[10px] font-black uppercase tracking-widest text-white transition hover:bg-white/10 hover:border-white/20 active:scale-95"
        >
          <MessageSquare className="w-4 h-4 text-brand-gold" />
          <span className="hidden sm:inline">{expanded ? "Masquer" : "Message"}</span>
          <ChevronDown className={`w-4 h-4 transition-transform duration-500 ${expanded ? "rotate-180" : ""}`} />
        </button>
      </div>

      {/* Expandable speech */}
      <AnimatePresence>
        {expanded && messages.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-[#030712]/50"
          >
            <div className="border-t border-white/5 px-8 py-8 md:px-12">
              <AnimatePresence mode="wait">
                <motion.p
                  key={msgIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-lg leading-relaxed text-white/80 italic font-medium"
                >
                  &laquo; {messages[msgIndex]} &raquo;
                </motion.p>
              </AnimatePresence>
              {messages.length > 1 && (
                <div className="mt-8 flex items-center justify-between">
                  <button
                    onClick={() => setMsgIndex((i) => (i + 1) % messages.length)}
                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-brand-gold hover:text-white transition-colors"
                  >
                    Lire la suite <span className="text-lg">→</span>
                  </button>
                  <span className="text-[10px] font-black text-white/20 tracking-widest">{msgIndex + 1} / {messages.length}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
