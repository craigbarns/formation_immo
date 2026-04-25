import type { Metadata } from "next";
import Link from "next/link";
import { getFinalExam } from "@/data/exam-questions";
import { ExamMode } from "@/components/exam/ExamMode";
import { Trophy, ShieldCheck, GraduationCap, Clock, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Examen Final de Certification | Formation Agent Immobilier",
  description: "Examen final pour l'obtention du certificat de formation professionnelle 42h (Loi ALUR).",
};

export default function CertificationPage() {
  const finalExam = getFinalExam();

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">
      <div className="mb-8">
        <Link 
          href="/formation" 
          className="inline-flex items-center text-sm font-medium text-brand-navy/60 hover:text-brand-navy transition-colors mb-6"
        >
          <span className="mr-2">←</span> Retour au parcours
        </Link>
        
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-gold/10 text-brand-gold text-xs font-bold uppercase tracking-wider mb-4 border border-brand-gold/20">
              <Award className="w-3.5 h-3.5" />
              Étape Finale
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-brand-navy leading-tight">
              Certification <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-brand-gold-pale italic">MasterClass</span>
            </h1>
            <p className="mt-4 text-lg text-zinc-600 max-w-2xl leading-relaxed">
              Validation officielle des compétences acquises durant les 42 heures de formation.
              Cet examen final synthétise les 5 modules indispensables à l&apos;exercice de la profession.
            </p>
          </div>
          
          <div className="flex -space-x-3">
             {[1,2,3,4,5].map(i => (
               <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-brand-navy-soft flex items-center justify-center text-white font-bold text-xs shadow-lg">
                 M{i}
               </div>
             ))}
          </div>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
            <Clock className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-bold text-brand-navy">Durée</h3>
            <p className="text-sm text-zinc-500">45 minutes</p>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-brand-gold/10 flex items-center justify-center shrink-0">
            <GraduationCap className="w-6 h-6 text-brand-gold" />
          </div>
          <div>
            <h3 className="font-bold text-brand-navy">Questions</h3>
            <p className="text-sm text-zinc-500">30 questions (QCM)</p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border border-zinc-100 shadow-sm flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
          </div>
          <div>
            <h3 className="font-bold text-brand-navy">Seuil de réussite</h3>
            <p className="text-sm text-zinc-500">21/30 (70%)</p>
          </div>
        </div>
      </div>

      <div className="relative">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-brand-gold via-brand-gold-pale to-brand-gold rounded-3xl blur opacity-20"></div>
        
        <div className="relative bg-white rounded-3xl border-2 border-brand-gold/20 shadow-2xl overflow-hidden min-h-[600px]">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-brand-gold via-brand-gold-pale to-brand-gold"></div>
          
          <div className="p-8 sm:p-12">
            <ExamMode exam={finalExam} showCertificate />
          </div>
        </div>
      </div>

      <div className="mt-12 p-8 rounded-3xl bg-brand-navy text-white flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex gap-4 items-center">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                <Trophy className="w-8 h-8 text-brand-gold" />
            </div>
            <div>
                <h3 className="text-xl font-bold">Certificat Nominatif</h3>
                <p className="text-white/60 text-sm max-w-sm">Une fois l&apos;examen réussi, téléchargez votre certificat nominatif certifié Loi ALUR directement depuis cette page.</p>
            </div>
        </div>
        <div className="text-center md:text-right">
            <p className="text-sm text-white/40 mb-2 italic">Format Premium MasterClass</p>
            <div className="flex gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
                <span className="w-2 h-2 rounded-full bg-brand-gold/60"></span>
                <span className="w-2 h-2 rounded-full bg-brand-gold/30"></span>
            </div>
        </div>
      </div>
    </div>
  );
}
