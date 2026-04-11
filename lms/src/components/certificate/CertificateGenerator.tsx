"use client";

import { useEffect, useRef, useState } from "react";
import { getGamificationState, getLevelForXP, BADGES } from "@/lib/gamification";
import { COURSE } from "@/data/course";

export function CertificateGenerator() {
  const [name, setName] = useState("");
  const [generated, setGenerated] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const state = typeof window !== "undefined" ? getGamificationState() : null;

  const totalLessons = COURSE.reduce((a, m) => a + m.lessons.length, 0);

  // Determine completion from progress storage
  const [completedLessons, setCompletedLessons] = useState(0);
  const [examsPassed, setExamsPassed] = useState(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("formation-immobilier-progress");
      const progress = raw ? JSON.parse(raw) : {};
      setCompletedLessons(Object.keys(progress).length);
    } catch { /* empty */ }

    if (state) {
      const passed = Object.values(state.examScores).filter(
        (e) => e.score / e.total >= 0.8,
      ).length;
      setExamsPassed(passed);
    }
  }, [state]);

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

    // Background
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);

    // Border
    ctx.strokeStyle = "#1a3a5c";
    ctx.lineWidth = 3;
    ctx.strokeRect(30, 30, w - 60, h - 60);

    // Inner border
    ctx.strokeStyle = "#d4af37";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(40, 40, w - 80, h - 80);

    // Gold corner accents
    const cornerSize = 30;
    ctx.fillStyle = "#d4af37";
    [[50, 50], [w - 50 - cornerSize, 50], [50, h - 50 - cornerSize], [w - 50 - cornerSize, h - 50 - cornerSize]].forEach(([x, y]) => {
      ctx.fillRect(x, y, cornerSize, 2);
      ctx.fillRect(x, y, 2, cornerSize);
    });

    // Header
    ctx.fillStyle = "#d4af37";
    ctx.font = "bold 14px Arial";
    ctx.textAlign = "center";
    ctx.fillText("FORMATION PROFESSIONNELLE IMMOBILIERE", w / 2, 100);

    // Title
    ctx.fillStyle = "#1a3a5c";
    ctx.font = "bold 42px Georgia";
    ctx.fillText("CERTIFICAT DE FORMATION", w / 2, 170);

    // Line
    ctx.strokeStyle = "#d4af37";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(w / 2 - 200, 195);
    ctx.lineTo(w / 2 + 200, 195);
    ctx.stroke();

    // Body
    ctx.fillStyle = "#333333";
    ctx.font = "18px Arial";
    ctx.fillText("Ce certificat atteste que", w / 2, 260);

    // Name
    ctx.fillStyle = "#1a3a5c";
    ctx.font = "bold 36px Georgia";
    ctx.fillText(name.trim(), w / 2, 320);

    // Underline name
    ctx.strokeStyle = "#d4af37";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(w / 2 - 250, 335);
    ctx.lineTo(w / 2 + 250, 335);
    ctx.stroke();

    // Description
    ctx.fillStyle = "#555555";
    ctx.font = "16px Arial";
    ctx.fillText("a suivi avec succes la formation", w / 2, 380);

    ctx.fillStyle = "#1a3a5c";
    ctx.font = "bold 24px Georgia";
    ctx.fillText("Agent Immobilier — Formation Complete 42 Heures", w / 2, 420);

    // Modules
    ctx.font = "14px Arial";
    ctx.fillStyle = "#666666";
    const modules = [
      "Module 1 : Juridique & conformite",
      "Module 2 : Transaction & negociation",
      "Module 3 : Financement & fiscalite",
      "Module 4 : Marketing digital",
      "Module 5 : Visite, closing & fidelisation",
    ];
    modules.forEach((mod, i) => {
      ctx.fillText(mod, w / 2, 470 + i * 24);
    });

    // Stats
    const level = state ? getLevelForXP(state.xp) : null;
    ctx.font = "bold 14px Arial";
    ctx.fillStyle = "#1a3a5c";
    ctx.fillText(
      `Niveau atteint : ${level?.current.title || "N/A"} | XP : ${state?.xp || 0} | Examens reussis : ${examsPassed}/5`,
      w / 2,
      620,
    );

    // Badges earned
    if (state && state.earnedBadges.length > 0) {
      ctx.font = "12px Arial";
      ctx.fillStyle = "#888888";
      const badgeNames = state.earnedBadges
        .map((id) => BADGES.find((b) => b.id === id)?.name)
        .filter(Boolean)
        .slice(0, 8)
        .join(" • ");
      ctx.fillText(`Badges : ${badgeNames}`, w / 2, 650);
    }

    // Date
    ctx.font = "14px Arial";
    ctx.fillStyle = "#888888";
    const dateStr = new Date().toLocaleDateString("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    ctx.fillText(`Delivre le ${dateStr}`, w / 2, 700);

    // Signature line
    ctx.strokeStyle = "#cccccc";
    ctx.beginPath();
    ctx.moveTo(w / 2 - 120, 760);
    ctx.lineTo(w / 2 + 120, 760);
    ctx.stroke();
    ctx.fillStyle = "#999999";
    ctx.font = "12px Arial";
    ctx.fillText("Signature du formateur", w / 2, 780);

    setGenerated(true);
  }

  function downloadPDF() {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `certificat-formation-immobiliere-${name.replace(/\s+/g, "-").toLowerCase()}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="rounded-2xl border-2 border-[#1a3a5c]/15 bg-white shadow-lg">
      <div className="border-b border-zinc-100 bg-gradient-to-r from-[#1a3a5c] to-[#2d5a7c] px-6 py-4 text-white rounded-t-2xl">
        <h3 className="text-lg font-bold">Certificat de formation</h3>
        <p className="mt-1 text-xs text-white/70">Generez votre attestation de reussite</p>
      </div>

      <div className="p-6">
        {!canGenerate ? (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-center">
            <div className="text-3xl">🔒</div>
            <h4 className="mt-2 text-lg font-bold text-amber-800">Certificat verrouille</h4>
            <p className="mt-2 text-sm text-amber-700">
              Pour generer votre certificat, vous devez :
            </p>
            <ul className="mt-3 space-y-2 text-sm text-amber-700">
              <li className="flex items-center justify-center gap-2">
                <span className={completionPct >= 80 ? "text-emerald-600" : "text-amber-600"}>
                  {completionPct >= 80 ? "✓" : "○"}
                </span>
                Completer au moins 80% des lecons ({completionPct}%/80%)
              </li>
              <li className="flex items-center justify-center gap-2">
                <span className={examsPassed >= 3 ? "text-emerald-600" : "text-amber-600"}>
                  {examsPassed >= 3 ? "✓" : "○"}
                </span>
                Reussir au moins 3 examens ({examsPassed}/3)
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
                className="flex-1 rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:border-[#1a3a5c] focus:outline-none focus:ring-2 focus:ring-[#1a3a5c]/20"
              />
              <button
                onClick={generateCertificate}
                disabled={!name.trim()}
                className="rounded-xl bg-[#d4af37] px-6 py-3 text-sm font-bold text-[#1a3a5c] shadow transition hover:bg-[#c4a030] disabled:opacity-50"
              >
                Generer le certificat
              </button>
            </div>

            <canvas ref={canvasRef} className="mt-6 w-full rounded-lg border border-zinc-200 shadow-md" style={{ display: generated ? "block" : "none" }} />

            {generated && (
              <div className="mt-4 text-center">
                <button
                  onClick={downloadPDF}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#1a3a5c] px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:bg-[#142d45]"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Telecharger le certificat
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
