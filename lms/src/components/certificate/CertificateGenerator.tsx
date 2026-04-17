"use client";

import { useEffect, useRef, useState } from "react";
import { getGamificationState, getLevelForXP, BADGES, type GamificationState } from "@/lib/gamification";
import { COURSE } from "@/data/course";
import { FORMATION_PROGRESS_STORAGE_KEY } from "@/constants/formation-storage";
import { createClient } from "@/lib/supabase/client";

export function CertificateGenerator() {
  const [name, setName] = useState("");
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState(0);
  const [examsPassed, setExamsPassed] = useState(0);
  const [gameState, setGameState] = useState<GamificationState | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const totalLessons = COURSE.reduce((a, m) => a + m.lessons.length, 0);

  useEffect(() => {
    async function load() {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data: progressRows } = await supabase
          .from("lesson_progress")
          .select("lesson_key")
          .eq("user_id", user.id)
          .eq("completed", true);

        setCompletedLessons(progressRows?.length ?? 0);

        const { data: gameRow } = await supabase
          .from("gamification_state")
          .select("*")
          .eq("user_id", user.id)
          .single();

        if (gameRow) {
          const state: GamificationState = {
            xp: gameRow.xp ?? 0,
            earnedBadges: gameRow.earned_badges || [],
            streak: gameRow.streak ?? 0,
            lastLoginDate: gameRow.last_login_date ?? "",
            totalQuizCorrect: gameRow.total_quiz_correct ?? 0,
            totalExamsTaken: gameRow.total_exams_taken ?? 0,
            totalExamsPerfect: gameRow.total_exams_perfect ?? 0,
            simulatorsUsed: gameRow.simulators_used || [],
            lessonTimes: gameRow.lesson_times || {},
            examScores: gameRow.exam_scores || {},
            xpHistory: gameRow.xp_history || [],
            moduleTimers: gameRow.module_timers || {},
            dailyActivity: gameRow.daily_activity || {},
            completedChecklists: gameRow.completed_checklists || [],
            flashcardsReviewed: gameRow.flashcards_reviewed ?? 0,
          };
          setGameState(state);
          setExamsPassed(
            Object.values(state.examScores).filter(
              (e) => e.score / e.total >= 0.8,
            ).length
          );
        } else {
          setGameState(null);
          setExamsPassed(0);
        }
      } else {
        // Fallback localStorage
        try {
          const raw = localStorage.getItem(FORMATION_PROGRESS_STORAGE_KEY);
          const progress = raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
          setCompletedLessons(Object.values(progress).filter(Boolean).length);
        } catch {
          setCompletedLessons(0);
        }

        const state = getGamificationState();
        setGameState(state);
        setExamsPassed(
          Object.values(state.examScores).filter(
            (e) => e.score / e.total >= 0.8,
          ).length
        );
      }

      setLoading(false);
    }
    load();
  }, []);

  const completionPct = Math.round((completedLessons / totalLessons) * 100);
  const canGenerate = completionPct >= 80 && examsPassed >= 3;

  function generateCertificate() {
    if (!canvasRef.current || !name.trim()) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d")!;
    const w = 1200;
    const h = 850;
    canvas.width = w;
    canvas.height = h;

    // Background gradient
    const bgGrad = ctx.createLinearGradient(0, 0, w, h);
    bgGrad.addColorStop(0, "#fffef9");
    bgGrad.addColorStop(1, "#f9f7f0");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Outer border — navy
    ctx.strokeStyle = "#1a3a5c";
    ctx.lineWidth = 5;
    ctx.strokeRect(20, 20, w - 40, h - 40);

    // Inner border — gold
    ctx.strokeStyle = "#d4af37";
    ctx.lineWidth = 2;
    ctx.strokeRect(32, 32, w - 64, h - 64);

    // Thin gold line inside
    ctx.strokeStyle = "rgba(212,175,55,0.4)";
    ctx.lineWidth = 1;
    ctx.strokeRect(42, 42, w - 84, h - 84);

    // Gold corner ornaments
    const cs = 40;
    ctx.fillStyle = "#d4af37";
    const corners = [[42, 42], [w - 42 - cs, 42], [42, h - 42 - cs], [w - 42 - cs, h - 42 - cs]] as [number,number][];
    corners.forEach(([x, y]) => {
      ctx.fillRect(x, y, cs, 3);
      ctx.fillRect(x, y, 3, cs);
    });

    // Logo / icon placeholder (text-based)
    ctx.font = "42px serif";
    ctx.textAlign = "center";
    ctx.fillText("🏛", w / 2, 115);

    // Institution line
    ctx.fillStyle = "#d4af37";
    ctx.font = "bold 13px Arial";
    ctx.letterSpacing = "3px";
    ctx.fillText("FORMATION PROFESSIONNELLE IMMOBILIÈRE", w / 2, 155);
    ctx.letterSpacing = "0px";

    // Separator line
    ctx.strokeStyle = "#d4af37";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(w / 2 - 260, 168);
    ctx.lineTo(w / 2 + 260, 168);
    ctx.stroke();

    // Title
    ctx.fillStyle = "#1a3a5c";
    ctx.font = "bold 46px Georgia";
    ctx.fillText("CERTIFICAT DE RÉUSSITE", w / 2, 230);

    // Subtitle separator
    ctx.strokeStyle = "#d4af37";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(w / 2 - 220, 252);
    ctx.lineTo(w / 2 + 220, 252);
    ctx.stroke();

    // Body text
    ctx.fillStyle = "#555555";
    ctx.font = "italic 18px Georgia";
    ctx.fillText("Ce certificat atteste que", w / 2, 300);

    // Name
    ctx.fillStyle = "#1a3a5c";
    ctx.font = "bold 40px Georgia";
    ctx.fillText(name.trim(), w / 2, 360);

    // Underline name
    ctx.strokeStyle = "#d4af37";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(w / 2 - 280, 378);
    ctx.lineTo(w / 2 + 280, 378);
    ctx.stroke();

    // Description
    ctx.fillStyle = "#555555";
    ctx.font = "italic 17px Georgia";
    ctx.fillText("a suivi et validé avec succès la formation complète", w / 2, 420);

    ctx.fillStyle = "#1a3a5c";
    ctx.font = "bold 26px Georgia";
    ctx.fillText("Agent Immobilier — Formation Complète 42 Heures", w / 2, 462);

    // Modules list
    ctx.font = "13px Arial";
    ctx.fillStyle = "#666666";
    const modules = [
      "Module 1 : Juridique & conformité  ·  Module 2 : Transaction & négociation",
      "Module 3 : Financement & fiscalité  ·  Module 4 : Marketing digital",
      "Module 5 : Visite, closing & fidélisation",
    ];
    modules.forEach((mod, i) => {
      ctx.fillText(mod, w / 2, 505 + i * 22);
    });

    // Gold separator
    ctx.strokeStyle = "rgba(212,175,55,0.35)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w / 2 - 350, 570);
    ctx.lineTo(w / 2 + 350, 570);
    ctx.stroke();

    // Stats
    const level = gameState ? getLevelForXP(gameState.xp) : null;
    ctx.font = "bold 13px Arial";
    ctx.fillStyle = "#1a3a5c";
    ctx.fillText(
      `Niveau : ${level?.current.title || "N/A"}  ·  XP : ${gameState?.xp || 0}  ·  Examens réussis : ${examsPassed}/5`,
      w / 2,
      600,
    );

    // Badges earned
    if (gameState && gameState.earnedBadges.length > 0) {
      ctx.font = "11px Arial";
      ctx.fillStyle = "#999999";
      const badgeNames = gameState.earnedBadges
        .map((id) => BADGES.find((b) => b.id === id)?.name)
        .filter(Boolean)
        .slice(0, 8)
        .join("  ·  ");
      ctx.fillText(`Badges obtenus : ${badgeNames}`, w / 2, 628);
    }

    // Date
    ctx.font = "13px Arial";
    ctx.fillStyle = "#888888";
    const dateStr = new Date().toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    ctx.fillText(`Délivré le ${dateStr}`, w / 2, 670);

    // Signature lines
    const sigY = 750;
    // Left
    ctx.strokeStyle = "#cccccc";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(200, sigY);
    ctx.lineTo(480, sigY);
    ctx.stroke();
    ctx.fillStyle = "#999999";
    ctx.font = "11px Arial";
    ctx.fillText("Organisme de formation", 340, sigY + 18);
    // Right
    ctx.beginPath();
    ctx.moveTo(w - 480, sigY);
    ctx.lineTo(w - 200, sigY);
    ctx.stroke();
    ctx.fillText("Le/La stagiaire", w - 340, sigY + 18);

    // ALUR compliance badge at bottom
    ctx.font = "bold 10px Arial";
    ctx.fillStyle = "#d4af37";
    ctx.fillText("CONFORME LOI ALUR — RGPD", w / 2, h - 50);

    setGenerated(true);
  }

  function downloadPDF() {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `certificat-formation-immobiliere-${name.replace(/\s+/g, "-").toLowerCase()}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  }

  if (loading) {
    return (
      <div className="rounded-2xl border-2 border-brand-navy/15 bg-white shadow-lg">
        <div className="border-b border-zinc-100 bg-gradient-to-br from-brand-navy via-[#1e4a73] to-brand-navy-soft px-6 py-5 text-white rounded-t-2xl">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-xl">🏛️</span>
            <div>
              <h3 className="text-lg font-bold">Certificat de formation</h3>
              <p className="text-xs text-white/70">Chargement…</p>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="h-32 animate-pulse rounded-xl bg-zinc-100" />
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border-2 border-brand-navy/15 bg-white shadow-lg">
      <div className="border-b border-zinc-100 bg-gradient-to-br from-brand-navy via-[#1e4a73] to-brand-navy-soft px-6 py-5 text-white rounded-t-2xl">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15 text-xl">🏛️</span>
          <div>
            <h3 className="text-lg font-bold">Certificat de formation</h3>
            <p className="text-xs text-white/70">Générez votre attestation de réussite</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {!canGenerate ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-center">
            <div className="text-3xl">🔒</div>
            <h4 className="mt-2 text-lg font-bold text-amber-800">Certificat verrouillé</h4>
            <p className="mt-2 text-sm text-amber-700">
              Pour générer votre certificat, vous devez :
            </p>
            <ul className="mt-3 space-y-2 text-sm text-amber-700">
              <li className="flex items-center justify-center gap-2">
                <span className={completionPct >= 80 ? "text-emerald-600" : "text-amber-600"}>
                  {completionPct >= 80 ? "✓" : "○"}
                </span>
                Compléter au moins 80% des leçons ({completionPct}%/80%)
              </li>
              <li className="flex items-center justify-center gap-2">
                <span className={examsPassed >= 3 ? "text-emerald-600" : "text-amber-600"}>
                  {examsPassed >= 3 ? "✓" : "○"}
                </span>
                Réussir au moins 3 examens ({examsPassed}/3)
              </li>
            </ul>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4 sm:flex-row">
              <input
                type="text"
                placeholder="Votre nom complet"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setGenerated(false);
                }}
                className="flex-1 rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:border-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-navy/20"
              />
              <button
                onClick={generateCertificate}
                disabled={!name.trim()}
                className="rounded-xl bg-brand-gold px-6 py-3 text-sm font-bold text-brand-navy shadow transition hover:bg-[#c4a030] disabled:opacity-50"
              >
                Générer le certificat
              </button>
            </div>

            <canvas ref={canvasRef} className="mt-6 w-full rounded-lg border border-zinc-200 shadow-md" style={{ display: generated ? "block" : "none" }} />

            {generated && (
              <div className="mt-4 text-center">
                <button
                  onClick={downloadPDF}
                  className="inline-flex items-center gap-2 rounded-xl bg-brand-navy px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-brand-navy-deep"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Télécharger le certificat (PNG)
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
