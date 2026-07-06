"use client";

import { useEffect, useRef, useState } from "react";
import { Building2, Lock } from "lucide-react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";
import { getGamificationState, type GamificationState } from "@/lib/gamification";
import { FORMATION_MODULES } from "@/data/course";
import { FORMATION_PROGRESS_STORAGE_KEY } from "@/constants/formation-storage";
import { createClient } from "@/lib/supabase/client";

const supabase = createClient();

export function CertificateGenerator({ forceUnlock }: { forceUnlock?: boolean } = {}) {
  const [name, setName] = useState("");
  const [generated, setGenerated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [completedLessons, setCompletedLessons] = useState(0);
  const [examsPassed, setExamsPassed] = useState(0);
  const [gameState, setGameState] = useState<GamificationState | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [pdfLoading, setPdfLoading] = useState(false);
  const [pdfError, setPdfError] = useState<string | null>(null);

  // Parcours principal uniquement : les add-ons autonomes (ex. TRACFIN) ne
  // comptent pas dans le taux de complétion certifiant.
  const totalLessons = FORMATION_MODULES.reduce((a, m) => a + m.lessons.length, 0);

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

        // Charger le nom depuis profiles
        const { data: profileRow } = await supabase
          .from("profiles")
          .select("first_name, last_name, full_name")
          .eq("id", user.id)
          .single();

        if (profileRow) {
          const fn = profileRow.first_name ?? "";
          const ln = profileRow.last_name ?? "";
          setName(fn && ln ? `${fn} ${ln}` : (profileRow.full_name ?? ""));
        }

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
              (e) => e.score / e.total >= 0.7,
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
            (e) => e.score / e.total >= 0.7,
          ).length
        );
      }

      setLoading(false);
    }
    load();
  }, []);

  const completionPct = Math.min(100, Math.round((completedLessons / totalLessons) * 100));
  const totalTrackedSeconds = gameState
    ? Object.values(gameState.moduleTimers).reduce((a, b) => a + b, 0)
    : 0;
  const totalTrackedHours = totalTrackedSeconds / 3600;
  const hasEnoughHours = totalTrackedHours >= 42;
  const canGenerate = forceUnlock || (completionPct >= 80 && examsPassed >= 3 && hasEnoughHours);

  function generateCertificate() {
    if (!canvasRef.current || !name.trim()) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = 1200;
    const h = 850;
    canvas.width = w;
    canvas.height = h;

    // Background gradient for a soft paper/parchment feel
    const bgGrad = ctx.createLinearGradient(0, 0, w, h);
    bgGrad.addColorStop(0, "#ffffff");
    bgGrad.addColorStop(0.5, "#fffcf0");
    bgGrad.addColorStop(1, "#fdfbf7");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // Subtle background pattern (geometric)
    ctx.globalAlpha = 0.03;
    ctx.strokeStyle = "#1a3a5c";
    ctx.lineWidth = 1;
    for (let i = 0; i < w; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, h);
      ctx.stroke();
    }
    for (let i = 0; i < h; i += 40) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(w, i);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // --- Main Borders ---
    // Outer border (Sleek Navy)
    ctx.strokeStyle = "#1a3a5c";
    ctx.lineWidth = 40;
    ctx.strokeRect(20, 20, w - 40, h - 40);

    // Inner Gold line
    const goldGrad = ctx.createLinearGradient(0, 0, w, 0);
    goldGrad.addColorStop(0, "#d4af37");
    goldGrad.addColorStop(0.5, "#f9e5a2");
    goldGrad.addColorStop(1, "#d4af37");
    
    ctx.strokeStyle = goldGrad;
    ctx.lineWidth = 4;
    ctx.strokeRect(50, 50, w - 100, h - 100);

    // Double delicate gold line
    ctx.strokeStyle = "rgba(212,175,55,0.4)";
    ctx.lineWidth = 1;
    ctx.strokeRect(60, 60, w - 120, h - 120);

    // --- Header ---
    ctx.textAlign = "center";
    
    // Icon badge (Seal circle)
    const sealX = w / 2;
    const sealY = 120;
    const sealRadius = 45;
    
    // Outer seal glow
    ctx.shadowBlur = 20;
    ctx.shadowColor = "rgba(212,175,55,0.4)";
    ctx.beginPath();
    ctx.arc(sealX, sealY, sealRadius + 5, 0, Math.PI * 2);
    ctx.fillStyle = goldGrad;
    ctx.fill();
    ctx.shadowBlur = 0;

    // Inner seal
    ctx.beginPath();
    ctx.arc(sealX, sealY, sealRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#1a3a5c";
    ctx.fill();

    // Seal icon
    ctx.font = "40px serif";
    ctx.fillText("🏆", sealX, sealY + 15);

    // Institution Name
    ctx.fillStyle = "#1a3a5c";
    ctx.font = "800 14px Montserrat, Arial, sans-serif";
    ctx.letterSpacing = "6px";
    ctx.fillText("IMMOBILIER HAUTE PERFORMANCE", w / 2, 210);
    ctx.letterSpacing = "0px";

    // Subtitle
    ctx.fillStyle = "#d4af37";
    ctx.font = "italic 400 12px Georgia, serif";
    ctx.fillText("L'excellence opérationnelle au service de la transaction", w / 2, 235);

    // --- Title ---
    ctx.fillStyle = "#1a3a5c";
    ctx.font = "900 64px Playfair Display, Georgia, serif";
    ctx.fillText("CERTIFICAT", w / 2, 330);
    ctx.font = "400 32px Playfair Display, Georgia, serif";
    ctx.fillText("DE RÉUSSITE", w / 2, 375);

    // Decorative separator
    ctx.beginPath();
    ctx.moveTo(w / 2 - 150, 400);
    ctx.lineTo(w / 2 + 150, 400);
    ctx.lineWidth = 1;
    ctx.strokeStyle = "rgba(26,58,92,0.2)";
    ctx.stroke();

    // Body text
    ctx.fillStyle = "#555555";
    ctx.font = "400 18px Georgia, serif";
    ctx.fillText("Ce diplôme est fièrement décerné à", w / 2, 440);

    // Participant Name (Big & Bold)
    const nameGrad = ctx.createLinearGradient(w / 2 - 200, 0, w / 2 + 200, 0);
    nameGrad.addColorStop(0, "#1a3a5c");
    nameGrad.addColorStop(0.5, "#2c527a");
    nameGrad.addColorStop(1, "#1a3a5c");
    ctx.fillStyle = nameGrad;
    ctx.font = "bold 52px Playfair Display, Georgia, serif";
    ctx.fillText(name.trim().toUpperCase(), w / 2, 510);

    // Border line under name
    ctx.beginPath();
    ctx.moveTo(w / 2 - 300, 530);
    ctx.lineTo(w / 2 + 300, 530);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#d4af37";
    ctx.stroke();

    // Context
    ctx.fillStyle = "#555555";
    ctx.font = "400 16px Georgia, serif";
    ctx.fillText("pour la validation complète du cursus de formation", w / 2, 570);

    const trackedH = Math.floor(totalTrackedHours);
    const trackedMin = Math.floor((totalTrackedHours - trackedH) * 60);
    const trackedLabel = trackedMin > 0 ? `${trackedH}H${String(trackedMin).padStart(2, "0")}` : `${trackedH}H`;

    ctx.fillStyle = "#1a3a5c";
    ctx.font = "bold 24px Georgia, serif";
    ctx.fillText(`AGENT IMMOBILIER EXPERT — ${trackedLabel} DE FORMATION`, w / 2, 605);

    // Bottom Stats
    const statsY = 680;
    ctx.fillStyle = "#777777";
    ctx.font = "bold 12px Montserrat, Arial, sans-serif";
    ctx.letterSpacing = "1px";

    const statsText = [
      `XP ACQUISE : ${gameState?.xp || 0}`,
      `MODULES VALIDÉS : 5/5`,
      `CRÉDITS FORMATION : ${trackedLabel} (LOI ALUR — MIN. 42H)`
    ].join("   •   ");
    
    ctx.fillText(statsText, w / 2, statsY);
    ctx.letterSpacing = "0px";

    // Date
    const dateStr = new Date().toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
    ctx.fillStyle = "#999999";
    ctx.font = "italic 13px Georgia, serif";
    ctx.fillText(`Délivré le ${dateStr}`, w / 2, statsY + 35);

    // Signatures
    const sigBaseY = 760;
    
    // Director Signature (Simulated)
    ctx.font = "italic 28px script, 'Brush Script MT', cursive";
    ctx.fillStyle = "#1a3a5c";
    ctx.fillText("Sarah Benali", 340, sigBaseY - 20);
    
    ctx.strokeStyle = "#d4af37";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(220, sigBaseY);
    ctx.lineTo(460, sigBaseY);
    ctx.stroke();
    ctx.font = "bold 10px Montserrat, Arial, sans-serif";
    ctx.fillStyle = "#999999";
    ctx.fillText("DIRECTION PÉDAGOGIQUE", 340, sigBaseY + 15);

    // Student Signature
    ctx.strokeStyle = "#d4af37";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w - 460, sigBaseY);
    ctx.lineTo(w - 220, sigBaseY);
    ctx.stroke();
    ctx.fillText("STAGIAIRE RÉCIPIENDAIRE", w - 340, sigBaseY + 15);

    // Final ALUR badge
    ctx.font = "italic 700 11px Georgia, serif";
    ctx.fillStyle = "#d4af37";
    ctx.fillText("CERTIFICATION CONFORME DÉCRET N° 2016-173 (LOI ALUR)", w / 2, h - 60);

    setGenerated(true);
  }

  function downloadPDF() {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `CERTIFICAT_ALUR_EXPERT_${name.replace(/\s+/g, "_").toUpperCase()}.png`;
    link.href = canvasRef.current.toDataURL("image/png", 1.0);
    link.click();
  }

  const downloadAttestation = async () => {
    setPdfLoading(true);
    setPdfError(null);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;
      if (!token) throw new Error("Non connecté");

      const res = await fetch("/api/certificates/generate", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Erreur");

      window.open(json.pdfUrl, "_blank");
    } catch (err) {
      setPdfError(err instanceof Error ? err.message : "Erreur");
    } finally {
      setPdfLoading(false);
    }
  };

  // Unified return to avoid Turbopack parsing issues with early returns in some contexts
  return (
    <div className="rounded-2xl border-2 border-brand-navy/15 bg-white shadow-lg">
      <div className="border-b border-zinc-100 bg-gradient-to-br from-brand-navy via-[var(--brand-navy-light)] to-brand-navy-soft px-6 py-5 text-white rounded-t-2xl">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15"><Building2 className="h-5 w-5 text-white" /></span>
          <div>
            <h3 className="text-lg font-bold">Certificat de formation</h3>
            <p className="text-xs text-white/80">
              {loading ? "Chargement…" : "Générez votre attestation de réussite"}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="h-32 animate-pulse rounded-xl bg-zinc-100" />
        ) : !canGenerate ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-center">
            <div className="flex justify-center"><Lock className="h-8 w-8 text-amber-500" /></div>
            <h4 className="mt-2 text-lg font-bold text-amber-800">Certificat verrouillé</h4>
            <p className="mt-2 text-sm text-amber-700">
              Pour générer votre certificat, vous devez :
            </p>
            <ul className="mt-3 space-y-2 text-sm text-amber-700">
              <li className="flex items-center justify-center gap-2">
                <span className={completionPct >= 80 ? "text-emerald-600" : "text-amber-600"}>
                  <EmojiIcon emoji={completionPct >= 80 ? "✓" : "○"} className="h-4 w-4" />
                </span>
                Compléter au moins 80% des leçons ({completionPct}%/80%)
              </li>
              <li className="flex items-center justify-center gap-2">
                <span className={examsPassed >= 3 ? "text-emerald-600" : "text-amber-600"}>
                  <EmojiIcon emoji={examsPassed >= 3 ? "✓" : "○"} className="h-4 w-4" />
                </span>
                Réussir au moins 3 examens ({examsPassed}/3)
              </li>
              <li className="flex items-center justify-center gap-2">
                <span className={hasEnoughHours ? "text-emerald-600" : "text-amber-600"}>
                  <EmojiIcon emoji={hasEnoughHours ? "✓" : "○"} className="h-4 w-4" />
                </span>
                Valider 42h de formation — Loi ALUR ({Math.floor(totalTrackedHours)}h{Math.floor((totalTrackedHours % 1) * 60) > 0 ? Math.floor((totalTrackedHours % 1) * 60) + "min" : ""} / 42h)
              </li>
            </ul>
          </div>
        ) : (
          <>
            <div className="flex flex-col gap-4 sm:flex-row">
              <div className="flex-1 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700">
                {name || "Chargement du nom…"}
              </div>
              <button
                onClick={generateCertificate}
                disabled={!name.trim()}
                className="rounded-xl bg-brand-gold px-6 py-3 text-sm font-bold text-brand-navy shadow transition hover:bg-[var(--brand-gold-hover)] disabled:opacity-50"
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
                <button
                  onClick={downloadAttestation}
                  disabled={pdfLoading}
                  className="mt-3 px-5 py-2.5 bg-blue-900 hover:bg-blue-800 text-white text-sm font-semibold rounded-lg flex items-center gap-2 mx-auto disabled:opacity-60"
                >
                  {pdfLoading ? (
                    <span className="animate-spin">⏳</span>
                  ) : (
                    <span>📄</span>
                  )}
                  {pdfLoading ? "Génération en cours..." : "Télécharger l'attestation officielle (PDF)"}
                </button>
                {pdfError && <p className="text-red-400 text-xs mt-2 text-center">{pdfError}</p>}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
