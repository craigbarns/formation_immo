"use client";

import { useState } from "react";
import { Mic, GraduationCap } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { AICoachChat } from "@/components/ai-coach/AICoachChat";

export default function OralExamPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="rounded-2xl border border-brand-navy/15 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy/10">
            <GraduationCap className="h-6 w-6 text-brand-navy" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-brand-navy">Oral blanc ALUR</h1>
            <p className="text-sm text-zinc-500">Simulateur d&apos;examen oral avec Marie</p>
          </div>
        </div>

        <div className="mt-6 space-y-4 text-sm text-zinc-600 leading-relaxed">
          <p>
            Prépare-toi à l&apos;oral de certification ALUR avec un simulateur réaliste.
            Marie te posera <strong>5 questions juridiques et professionnelles</strong>,
            une par une, comme une vraie examinatrice.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Réponds à voix haute avec ton micro (ou écris si tu préfères)</li>
            <li>Marie t&apos;écoute et passe à la question suivante</li>
            <li>À la fin, tu reçois un <strong>score sur 100</strong> + un feedback détaillé</li>
            <li>Tu peux repasser l&apos;oral autant de fois que tu veux</li>
          </ul>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-navy px-8 py-4 text-base font-bold text-white shadow-lg transition hover:bg-brand-navy-deep hover:shadow-xl"
          >
            <Mic className="h-5 w-5" />
            Démarrer l&apos;oral blanc
          </button>
        </div>

        <p className="mt-4 text-center text-xs text-zinc-400">
          Conseil : active le micro et parle naturellement, comme en vrai oral.
        </p>
      </div>

      <AnimatePresence>
        {isOpen && (
          <AICoachChat
            mode="oral-exam"
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
