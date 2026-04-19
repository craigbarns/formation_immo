"use client";

import { useMemo } from "react";

interface CertificateViewProps {
  studentName: string;
  completedAt: string;
  score: number;
  moduleSlug?: string;
}

function generateCertNumber(completedAt: string): string {
  const date = new Date(completedAt);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const random = Math.floor(1000 + Math.random() * 9000);
  return `FIM-${year}${month}${day}-${random}`;
}

function getMention(score: number): string {
  if (score >= 90) return "Excellent";
  if (score >= 85) return "Très Bien";
  if (score >= 75) return "Bien";
  if (score >= 70) return "Réussite";
  return "Non validé";
}

export function CertificateView({ studentName, completedAt, score }: CertificateViewProps) {
  const certNumber = useMemo(() => generateCertNumber(completedAt), [completedAt]);
  const mention = getMention(score);
  const passed = score >= 70;

  return (
    <div className="relative mx-auto max-w-2xl overflow-hidden rounded-2xl border border-brand-gold/30 bg-gradient-to-br from-[#0a1628] via-[#1a3a5c] to-[#0d1f33] p-8 shadow-2xl">
      {/* Background watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none">
        <span className="text-[16rem]">🏠</span>
      </div>

      {/* Gold corner ornaments */}
      <div className="absolute top-0 left-0 h-12 w-12 border-l-2 border-t-2 border-brand-gold/60 rounded-tl-xl" />
      <div className="absolute top-0 right-0 h-12 w-12 border-r-2 border-t-2 border-brand-gold/60 rounded-tr-xl" />
      <div className="absolute bottom-0 left-0 h-12 w-12 border-l-2 border-b-2 border-brand-gold/60 rounded-bl-xl" />
      <div className="absolute bottom-0 right-0 h-12 w-12 border-r-2 border-b-2 border-brand-gold/60 rounded-br-xl" />

      <div className="relative text-center">
        {/* Header */}
        <div className="mx-auto mb-4 flex items-center justify-center gap-2">
          <div className="h-px w-12 bg-gradient-to-r from-transparent to-brand-gold/50" />
          <span className="text-3xs font-bold uppercase tracking-[0.3em] text-brand-gold">Attestation de formation</span>
          <div className="h-px w-12 bg-gradient-to-l from-transparent to-brand-gold/50" />
        </div>

        <h2 className="text-2xl font-black text-white sm:text-3xl">
          Agent Immobilier
        </h2>
        <p className="mt-1 text-sm text-white/70">Certification Professionnelle — 42 heures</p>

        {/* Student name */}
        <div className="my-6">
          <p className="text-2xs uppercase tracking-widest text-white/50">Décernée à</p>
          <p className="mt-1 text-xl font-bold text-brand-gold sm:text-2xl">{studentName}</p>
        </div>

        {/* Details */}
        <div className="mx-auto grid max-w-sm grid-cols-2 gap-3 text-left">
          <div className="rounded-lg bg-white/5 px-3 py-2">
            <p className="text-3xs uppercase text-white/40">Date</p>
            <p className="text-xs font-semibold text-white">{completedAt}</p>
          </div>
          <div className="rounded-lg bg-white/5 px-3 py-2">
            <p className="text-3xs uppercase text-white/40">Score</p>
            <p className="text-xs font-semibold text-white">{score}%</p>
          </div>
          <div className="rounded-lg bg-white/5 px-3 py-2">
            <p className="text-3xs uppercase text-white/40">Mention</p>
            <p className={`text-xs font-semibold ${passed ? "text-brand-gold" : "text-red-400"}`}>{mention}</p>
          </div>
          <div className="rounded-lg bg-white/5 px-3 py-2">
            <p className="text-3xs uppercase text-white/40">N° attestation</p>
            <p className="text-xs font-semibold text-white/80 font-mono">{certNumber}</p>
          </div>
        </div>

        {/* QR placeholder */}
        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="h-16 w-16 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center">
            <svg className="h-8 w-8 text-white/30" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm8-2h6v6h-6V3zm2 2v2h2V5h-2zM3 15h6v6H3v-6zm2 2v2h2v-2H5zm13-2h3v3h-3v-3zm-2 2h3v3h-3v-3zm2 2h3v3h-3v-3zM13 3h2v2h-2V3zm-2 2h2v2h-2V5zm2 2h2v2h-2V7zm-2 2h2v2h-2V9zm2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm2 2h2v2h-2v-2zm-2 2h2v2h-2v-2zm2 2h2v2h-2v-2z"/>
            </svg>
          </div>
          <p className="text-3xs text-white/40 max-w-[120px]">
            Scannez pour vérifier l&apos;authenticité
          </p>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-center gap-2">
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-brand-gold/30" />
          <p className="text-3xs text-white/30">Formation Immo Local — Conformité 2026</p>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-brand-gold/30" />
        </div>
      </div>
    </div>
  );
}
