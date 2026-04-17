"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { MODULE_AVATARS } from "@/data/module-avatars";

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
      className="mb-8 overflow-hidden rounded-2xl border shadow-lg"
      style={{
        borderColor: `${avatar.accentColor}30`,
        background: `linear-gradient(135deg, ${avatar.accentColor}0e 0%, white 60%, ${avatar.accentColor}06 100%)`,
      }}
    >
      <div className="flex items-center gap-5 p-4 md:p-5">
        {/* Avatar */}
        <div className="shrink-0">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full text-base font-bold text-white shadow-md"
            style={{ backgroundColor: avatar.accentColor }}
          >
            {avatar.initials}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span
              className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white"
              style={{ backgroundColor: avatar.accentColor }}
            >
              {avatar.role}
            </span>
            {isAudioPlaying && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                En direct
              </motion.span>
            )}
          </div>
          <p className="font-bold text-zinc-800">{avatar.name}</p>
          <p className="text-xs text-zinc-500 mt-0.5 line-clamp-1">
            Votre formatrice pour : <span className="font-medium text-zinc-700">{lessonTitle}</span>
          </p>
        </div>

        {/* Toggle speech */}
        <button
          onClick={() => setExpanded((v) => !v)}
          className="shrink-0 rounded-xl border px-3 py-1.5 text-xs font-semibold transition hover:opacity-80"
          style={{ borderColor: `${avatar.accentColor}40`, color: avatar.accentColor }}
        >
          {expanded ? "Fermer" : "Message"}
        </button>
      </div>

      {/* Expandable speech */}
      <AnimatePresence>
        {expanded && messages.length > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="border-t px-5 py-4" style={{ borderColor: `${avatar.accentColor}20` }}>
              <AnimatePresence mode="wait">
                <motion.p
                  key={msgIndex}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="text-sm leading-relaxed text-zinc-700 italic"
                >
                  &laquo; {messages[msgIndex]} &raquo;
                </motion.p>
              </AnimatePresence>
              {messages.length > 1 && (
                <div className="mt-3 flex items-center gap-3">
                  <button
                    onClick={() => setMsgIndex((i) => (i + 1) % messages.length)}
                    className="text-xs font-semibold underline-offset-2 hover:underline"
                    style={{ color: avatar.accentColor }}
                  >
                    Message suivant &rarr;
                  </button>
                  <span className="text-xs text-zinc-400">{msgIndex + 1}/{messages.length}</span>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
