"use client";

import { useState } from "react";
import { MessageCircle, Theater } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import { AICoachChat } from "@/components/ai-coach/AICoachChat";

export default function RoleplayPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div className="rounded-2xl border border-brand-navy/15 bg-white p-8 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-navy/10">
            <Theater className="h-6 w-6 text-brand-navy" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-brand-navy">Simulateur de prospection</h1>
            <p className="text-sm text-zinc-500">Entraîne-toi avec Marie en mode prospect réaliste</p>
          </div>
        </div>

        <div className="mt-6 space-y-4 text-sm text-zinc-600 leading-relaxed">
          <p>
            Marie incarne un client immobilier typique : primo-accédant anxieux, vendeur sceptique,
            investisseur froid… À toi de gérer les objections, de poser les bonnes questions et de
            construire la confiance.
          </p>
          <ul className="list-disc space-y-1 pl-5">
            <li>Utilise ton micro pour parler comme en vrai</li>
            <li>Marie réagit comme un vrai prospect (objections, hésitations, négociation)</li>
            <li>En fin de session, demande-lui un feedback sur ta technique</li>
          </ul>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={() => setIsOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-brand-navy px-8 py-4 text-base font-bold text-white shadow-lg transition hover:bg-brand-navy-deep hover:shadow-xl"
          >
            <MessageCircle className="h-5 w-5" />
            Lancer la simulation
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <AICoachChat
            mode="roleplay"
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
