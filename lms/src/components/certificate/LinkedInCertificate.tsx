"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Download, Linkedin, Share2, Award } from "lucide-react";
import { motion } from "framer-motion";
import { getGamificationState, getLevelForXP, LEVELS } from "@/lib/gamification";

interface LinkedInCertificateProps {
  userName?: string;
  completionDate?: string;
}

export function LinkedInCertificate({ userName = "Apprenant", completionDate }: LinkedInCertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const gamification = getGamificationState();
  const levelInfo = getLevelForXP(gamification.xp);
  const currentLevel = levelInfo.current;
  
  const date = completionDate || new Date().toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  const handleDownload = async () => {
    if (!certificateRef.current) return;
    setIsGenerating(true);
    
    try {
      const dataUrl = await toPng(certificateRef.current, {
        quality: 1,
        pixelRatio: 2,
      });
      
      const link = document.createElement("a");
      link.download = `certificat-formation-immobilier-${userName.replace(/\s+/g, "-")}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error generating certificate:", error);
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleLinkedInShare = () => {
    const text = encodeURIComponent(
      `J'ai obtenu le niveau "${currentLevel.title}" en Formation Immobilière ! 🏆\n\n` +
      `✅ ${gamification.xp} points d'expérience\n` +
      `📚 ${Object.keys(gamification.examScores).length} modules complétés\n` +
      `🔥 ${gamification.streak} jours de série\n\n` +
      `#Formation #Immobilier #AgentImmobilier #Certification`
    );
    window.open(`https://www.linkedin.com/sharing/share-offsite/?summary=${text}`, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Certificate Preview */}
      <div className="overflow-hidden rounded-2xl border border-[#d4af37]/30 bg-gradient-to-br from-[#1a3a5c] to-[#0f1f33] p-1">
        <div 
          ref={certificateRef}
          className="relative aspect-[1.4/1] overflow-hidden rounded-xl bg-gradient-to-br from-[#0f1f33] via-[#1a3a5c] to-[#0f1f33] p-8 text-center"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(212,175,55,0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, rgba(212,175,55,0.1) 0%, transparent 50%)
            `,
          }}
        >
          {/* Decorative borders */}
          <div className="absolute inset-4 rounded-lg border-2 border-[#d4af37]/30" />
          <div className="absolute inset-6 rounded border border-[#d4af37]/20" />
          
          {/* Corner ornaments */}
          <div className="absolute left-4 top-4 h-16 w-16 border-l-2 border-t-2 border-[#d4af37] rounded-tl-lg" />
          <div className="absolute right-4 top-4 h-16 w-16 border-r-2 border-t-2 border-[#d4af37] rounded-tr-lg" />
          <div className="absolute left-4 bottom-4 h-16 w-16 border-l-2 border-b-2 border-[#d4af37] rounded-bl-lg" />
          <div className="absolute right-4 bottom-4 h-16 w-16 border-r-2 border-b-2 border-[#d4af37] rounded-br-lg" />
          
          {/* Content */}
          <div className="relative flex h-full flex-col items-center justify-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#d4af37] to-[#f0c040] text-4xl shadow-lg shadow-[#d4af37]/30">
              {currentLevel.icon}
            </div>
            
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#d4af37]">
              Certificat de Formation
            </p>
            
            <h2 className="mt-4 text-3xl font-black text-white">
              {userName}
            </h2>
            
            <p className="mt-2 text-sm text-white/70">
              a atteint le niveau
            </p>
            
            <h3 className="mt-2 text-2xl font-bold text-[#d4af37]">
              {currentLevel.title}
            </h3>
            
            <div className="mt-6 flex items-center gap-6 text-sm">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{gamification.xp}</p>
                <p className="text-xs text-white/50">XP</p>
              </div>
              <div className="h-10 w-px bg-white/20" />
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{gamification.earnedBadges.length}</p>
                <p className="text-xs text-white/50">Badges</p>
              </div>
              <div className="h-10 w-px bg-white/20" />
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{gamification.streak}</p>
                <p className="text-xs text-white/50">Jours</p>
              </div>
            </div>
            
            <p className="mt-6 text-xs text-white/40">
              Formation Agent Immobilier — 42h certifiantes
            </p>
            <p className="text-xs text-white/30">
              {date}
            </p>
          </div>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleDownload}
          disabled={isGenerating}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#d4af37] px-6 py-3 font-semibold text-[#1a3a5c] transition hover:bg-[#e0bf4d] disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#1a3a5c] border-t-transparent" />
              Génération...
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Télécharger
            </>
          )}
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleLinkedInShare}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0077b5] px-6 py-3 font-semibold text-white transition hover:bg-[#006396]"
        >
          <Linkedin className="h-4 w-4" />
          Partager
        </motion.button>
      </div>
      
      <p className="text-center text-xs text-white/40">
        Téléchargez votre certificat et partagez-le sur LinkedIn pour valoriser vos compétences
      </p>
    </div>
  );
}

export function CertificatePreview() {
  const [name, setName] = useState("");
  
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Award className="h-5 w-5 text-[#d4af37]" />
        <h3 className="font-bold text-white">Votre certificat</h3>
      </div>
      
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Votre nom complet"
        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/30 focus:border-[#d4af37]/50 focus:outline-none"
      />
      
      <LinkedInCertificate userName={name || "Apprenant"} />
    </div>
  );
}
