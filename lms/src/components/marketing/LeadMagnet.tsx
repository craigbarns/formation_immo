"use client";

import { useState } from "react";
import { Download, Mail, CheckCircle2 } from "lucide-react";

export function LeadMagnet() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    // Ici, nous pourrons connecter à Supabase, Mailchimp ou autre.
    console.log("Email capturé :", email);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="my-10 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center shadow-lg">
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
        <h3 className="mt-4 text-2xl font-black text-emerald-900">
          Checklist envoyée !
        </h3>
        <p className="mt-2 text-emerald-700">
          Vérifiez votre boîte mail ({email}). Le PDF vous attend pour préparer votre dossier CCI sereinement.
        </p>
      </div>
    );
  }

  return (
    <div className="my-10 overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a3a5c] to-[#1a3a5c]/90 p-1">
      <div className="rounded-[23px] border border-white/10 bg-[#1a3a5c] px-6 py-10 text-center sm:px-12 sm:py-16">
        <div className="mx-auto flex max-w-2xl flex-col items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#ffd700] shadow-2xl">
            <Download className="h-8 w-8 text-[#1a3a5c]" />
          </div>
          <h3 className="mt-6 text-3xl font-black text-white sm:text-4xl">
            Ne perdez pas votre Carte T pour un document manquant.
          </h3>
          <p className="mt-4 text-lg text-white/80">
            Téléchargez notre <strong>Checklist Officielle CCI (PDF)</strong> et cochez un par un les documents requis pour votre renouvellement.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 flex w-full max-w-md flex-col gap-3 sm:flex-row">
            <div className="relative flex-grow">
              <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Votre adresse email"
                className="w-full rounded-xl border-0 bg-white/10 py-4 pl-12 pr-4 text-white placeholder-white/50 focus:bg-white focus:text-[#1a3a5c] focus:outline-none focus:ring-2 focus:ring-[#ffd700] transition-all"
              />
            </div>
            <button
              type="submit"
              className="inline-flex shrink-0 items-center justify-center rounded-xl bg-[#ffd700] px-6 py-4 font-black text-[#1a3a5c] transition hover:scale-105 shadow-lg"
            >
              Recevoir le PDF
            </button>
          </form>
          <p className="mt-4 text-xs text-white/40">
            100% gratuit. Garanti sans spam. Désinscription en un clic.
          </p>
        </div>
      </div>
    </div>
  );
}
