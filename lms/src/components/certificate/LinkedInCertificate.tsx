"use client";

import { useEffect, useRef, useState } from "react";
import { Download, Award, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { EmojiIcon } from "@/components/ui/EmojiIcon";
import { getGamificationState, getLevelForXP, type GamificationState } from "@/lib/gamification";
import { createClient } from "@/lib/supabase/client";

interface LinkedInCertificateProps {
  userName?: string;
  completionDate?: string;
}

const DEFAULT_GAMIFICATION: GamificationState = {
  xp: 0,
  earnedBadges: [],
  streak: 0,
  lastLoginDate: "",
  totalQuizCorrect: 0,
  totalExamsTaken: 0,
  totalExamsPerfect: 0,
  simulatorsUsed: [],
  lessonTimes: {},
  examScores: {},
  xpHistory: [],
  moduleTimers: {},
  dailyActivity: {},
  completedChecklists: [],
  flashcardsReviewed: 0,
};

export function LinkedInCertificate({ userName = "Apprenant", completionDate }: LinkedInCertificateProps) {
  const certificateRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [gamification, setGamification] = useState<GamificationState>(DEFAULT_GAMIFICATION);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data } = await supabase
          .from("gamification_state")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (data) {
          setGamification({
            xp: data.xp ?? 0,
            earnedBadges: data.earned_badges || [],
            streak: data.streak ?? 0,
            lastLoginDate: data.last_login_date ?? "",
            totalQuizCorrect: data.total_quiz_correct ?? 0,
            totalExamsTaken: data.total_exams_taken ?? 0,
            totalExamsPerfect: data.total_exams_perfect ?? 0,
            simulatorsUsed: data.simulators_used || [],
            lessonTimes: data.lesson_times || {},
            examScores: data.exam_scores || {},
            xpHistory: data.xp_history || [],
            moduleTimers: data.module_timers || {},
            dailyActivity: data.daily_activity || {},
            completedChecklists: data.completed_checklists || [],
            flashcardsReviewed: data.flashcards_reviewed ?? 0,
          });
        }
      } else {
        setGamification(getGamificationState());
      }
    }
    load();
  }, []);

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
      // Dynamic import to avoid SSR issues
      const { toPng } = await import("html-to-image");
      const dataUrl = await toPng(certificateRef.current, {
        quality: 1,
        pixelRatio: 2,
      });

      const link = document.createElement("a");
      link.download = `certificat-formation-immobilier-${userName.replace(/\s+/g, "-")}.png`;
      link.href = dataUrl;
      link.click();
    } catch {
      // Erreur de génération silencieusement ignorée
    } finally {
      setIsGenerating(false);
    }
  };

  const handleLinkedInShare = () => {
    const text = encodeURIComponent(
      `J'ai obtenu le niveau "${currentLevel.title}" en Formation Immobilière !\n\n` +
      `${gamification.xp} points d'expérience\n` +
      `${Object.keys(gamification.examScores).length} modules complétés\n` +
      `${gamification.streak} jours de série\n\n` +
      `#Formation #Immobilier #AgentImmobilier #Certification`
    );
    window.open(`https://www.linkedin.com/sharing/share-offsite/?summary=${text}`, "_blank");
  };

  return (
    <div className="space-y-6">
      {/* Certificate Preview */}
      <div className="overflow-hidden rounded-2xl border border-brand-gold/30 bg-gradient-to-br from-brand-navy to-[var(--surface-dark)] p-1">
        <div
          ref={certificateRef}
          className="relative aspect-[1.4/1] overflow-hidden rounded-xl bg-gradient-to-br from-[var(--surface-dark)] via-brand-navy to-[var(--surface-dark)] p-8 text-center"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 50%, rgba(212,175,55,0.1) 0%, transparent 50%),
              radial-gradient(circle at 80% 50%, rgba(212,175,55,0.1) 0%, transparent 50%)
            `,
          }}
        >
          {/* Decorative borders */}
          <div className="absolute inset-4 rounded-lg border-2 border-brand-gold/30" />
          <div className="absolute inset-6 rounded border border-brand-gold/20" />

          {/* Corner ornaments */}
          <div className="absolute left-4 top-4 h-16 w-16 border-l-2 border-t-2 border-brand-gold rounded-tl-lg" />
          <div className="absolute right-4 top-4 h-16 w-16 border-r-2 border-t-2 border-brand-gold rounded-tr-lg" />
          <div className="absolute left-4 bottom-4 h-16 w-16 border-l-2 border-b-2 border-brand-gold rounded-bl-lg" />
          <div className="absolute right-4 bottom-4 h-16 w-16 border-r-2 border-b-2 border-brand-gold rounded-br-lg" />

          {/* Content */}
          <div className="relative flex h-full flex-col items-center justify-center">
            <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-gold to-[var(--brand-gold-light)] text-4xl shadow-lg shadow-brand-gold/30">
              <EmojiIcon emoji={currentLevel.icon} className="h-10 w-10 text-white" />
            </div>

            <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-gold">
              Certificat de Formation
            </p>

            <h2 className="mt-4 text-3xl font-black text-white">
              {userName}
            </h2>

            <p className="mt-2 text-sm text-white/80">
              a atteint le niveau
            </p>

            <h3 className="mt-2 text-2xl font-bold text-brand-gold">
              {currentLevel.title}
            </h3>

            <div className="mt-6 flex items-center gap-6 text-sm">
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{gamification.xp}</p>
                <p className="text-xs text-white/80">XP</p>
              </div>
              <div className="h-10 w-px bg-white/20" />
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{gamification.earnedBadges.length}</p>
                <p className="text-xs text-white/80">Badges</p>
              </div>
              <div className="h-10 w-px bg-white/20" />
              <div className="text-center">
                <p className="text-2xl font-bold text-white">{gamification.streak}</p>
                <p className="text-xs text-white/80">Jours</p>
              </div>
            </div>

            <p className="mt-6 text-xs text-on-dark-muted">
              Formation Agent Immobilier — 42h certifiantes
            </p>
            <p className="text-xs text-white/80">
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
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-gold px-6 py-3 font-semibold text-brand-navy transition hover:bg-[var(--brand-gold-hover)] disabled:opacity-50"
        >
          {isGenerating ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-brand-navy border-t-transparent" />
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
          <ExternalLink className="h-4 w-4" />
          Partager
        </motion.button>
      </div>

      <p className="text-center text-xs text-on-dark-muted">
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
        <Award className="h-5 w-5 text-brand-gold" />
        <h3 className="font-bold text-slate-900 dark:text-white">Votre certificat</h3>
      </div>

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Votre nom complet"
        className="w-full rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-3 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/30 focus:border-brand-gold/50 focus:outline-none"
      />

      <LinkedInCertificate userName={name || "Apprenant"} />
    </div>
  );
}
