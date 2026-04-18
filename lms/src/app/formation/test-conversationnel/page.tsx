"use client";

import { useState } from "react";
import { MessageCircle, BarChart3, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AICoachChat } from "@/components/ai-coach/AICoachChat";

export default function PlacementConversationalPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="rounded-2xl border border-brand-navy/15 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy/10">
            <BarChart3 className="h-6 w-6 text-brand-navy" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-brand-navy">Test de niveau conversationnel</h1>
            <p className="text-sm text-zinc-500">Marie adapte les questions à tes réponses en temps réel</p>
          </div>
        </div>

        <div className="mt-6 space-y-4 text-sm text-zinc-600 leading-relaxed">
          <p>
            Oublie les QCM classiques. Ici, tu discutes avec Marie comme avec une vraie personne.
            Elle pose une question, tu réponds, et elle ajuste la difficulté de la suivante selon ta réponse.
          </p>
          <div className="rounded-xl bg-brand-navy/5 p-4">
            <p className="flex items-center gap-2 font-semibold text-brand-navy">
              <Sparkles className="h-4 w-4" /> Pourquoi c&apos;est mieux ?
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-xs text-zinc-600">
              <li>5 à 7 questions au lieu de 15 — plus rapide</li>
              <li>Adaptatif : pas de questions trop faciles ou trop dures</li>
              <li>Évalue ta compréhension profonde, pas ta mémoire</li>
              <li>Bilan personnalisé avec modules recommandés</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-navy px-8 py-4 text-base font-bold text-white shadow-lg transition hover:bg-brand-navy-deep hover:shadow-xl"
          >
            <MessageCircle className="h-5 w-5" />
            Démarrer le test
          </button>
        </div>

        <p className="mt-4 text-center text-xs text-zinc-400">
          Durée estimée : 5 à 8 minutes · Aucune bonne ou mauvaise réponse
        </p>
      </div>

      <AnimatePresence>
        {isOpen && (
          <AICoachChat
            mode="placement"
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
