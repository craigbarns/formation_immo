"use client";

import { COURSE } from "@/data/course";
import { attendanceDurationClock } from "@/lib/attendance";
import { FORMATION, ORGANIZATION } from "@/lib/pdf/formation-data";

export interface AttendanceSessionExport {
  started_at: string;
  ended_at: string;
  active_seconds: number;
  module_slugs: string[];
  lesson_slugs: string[];
  evidence_events: number;
  evidence_quality: "verified-active" | "historical-normalized" | "mixed";
}

export interface AttendanceExportOptions {
  learnerName: string;
  sessions: AttendanceSessionExport[];
  pedagogicalProgressPct: number;
  completedLessons: number;
  totalLessons: number;
  examsTaken: number;
}

const moduleTitles = new Map(COURSE.map((module) => [module.slug, module.title]));
const lessonTitles = new Map(
  COURSE.flatMap((module) =>
    module.lessons.map((lesson) => [`${module.slug}/${lesson.slug}`, lesson.title] as const),
  ),
);

function csvCell(value: string | number): string {
  const text = String(value);
  return /[;"\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function csvRow(values: Array<string | number>): string {
  return values.map(csvCell).join(";");
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    timeZone: "Europe/Paris",
    dateStyle: "short",
    timeStyle: "medium",
  }).format(new Date(value));
}

function evidenceLabel(value: AttendanceSessionExport["evidence_quality"]) {
  if (value === "verified-active") return "Actif vérifié v2";
  if (value === "mixed") return "Mixte v2 + historique normalisé";
  return "Historique normalisé";
}

function readableModules(slugs: string[]) {
  return slugs.map((slug) => moduleTitles.get(slug) || slug).join(" | ") || "Navigation LMS";
}

function readableLessons(moduleSlugs: string[], lessonSlugs: string[]) {
  if (moduleSlugs.length === 1) {
    return (
      lessonSlugs
        .map((slug) => lessonTitles.get(`${moduleSlugs[0]}/${slug}`) || slug)
        .join(" | ") || "Navigation"
    );
  }
  return lessonSlugs.join(" | ") || "Navigation";
}

export function buildAttendanceCSV({
  learnerName,
  sessions,
  pedagogicalProgressPct,
  completedLessons,
  totalLessons,
  examsTaken,
}: AttendanceExportOptions): string {
  const totalSeconds = sessions.reduce(
    (total, session) => total + Math.max(0, Number(session.active_seconds) || 0),
    0,
  );
  const chronological = [...sessions].sort(
    (left, right) => Date.parse(left.started_at) - Date.parse(right.started_at),
  );
  const generatedAt = formatDateTime(new Date().toISOString());
  const periodStart = chronological[0]?.started_at;
  const periodEnd = chronological.at(-1)?.ended_at;

  const rows: Array<Array<string | number>> = [
    ["RELEVÉ D'ASSIDUITÉ ET DE RÉALISATION PÉDAGOGIQUE"],
    ["Organisme", ORGANIZATION.name],
    ["SIRET", ORGANIZATION.siret],
    ["N° de déclaration d'activité", ORGANIZATION.activityDeclarationNumber],
    ["Formation", FORMATION.title],
    ["Modalité", FORMATION.modality],
    ["Durée contractuelle", `${FORMATION.durationHours} heures`],
    ["Apprenant", learnerName],
    ["Période constatée", periodStart ? `${formatDateTime(periodStart)} — ${formatDateTime(periodEnd!)}` : "Aucune connexion"],
    ["Document généré le", `${generatedAt} (Europe/Paris)`],
    [],
    ["SYNTHÈSE"],
    ["Temps actif constaté", attendanceDurationClock(totalSeconds)],
    ["Taux de réalisation pédagogique", `${pedagogicalProgressPct}%`],
    ["Jalons pédagogiques réalisés", `${completedLessons}/${totalLessons} leçons`],
    ["Évaluations finales passées", examsTaken],
    [],
    [
      "Début (Europe/Paris)",
      "Fin (Europe/Paris)",
      "Temps actif (HH:MM:SS)",
      "Module(s)",
      "Leçon(s)",
      "Preuves techniques",
      "Niveau de preuve",
    ],
  ];

  for (const session of chronological) {
    rows.push([
      formatDateTime(session.started_at),
      formatDateTime(session.ended_at),
      attendanceDurationClock(session.active_seconds),
      readableModules(session.module_slugs),
      readableLessons(session.module_slugs, session.lesson_slugs),
      session.evidence_events,
      evidenceLabel(session.evidence_quality),
    ]);
  }

  rows.push(
    [],
    ["TOTAL TEMPS ACTIF", attendanceDurationClock(totalSeconds)],
    [],
    ["MÉTHODE DE CALCUL"],
    [
      "Depuis la version v2",
      "Intervalles actifs au premier plan, fenêtre focalisée, inactivité exclue, doublons et onglets simultanés fusionnés.",
    ],
    [
      "Historique v1",
      "Données brutes conservées ; chaque intervalle est plafonné à 60 secondes et les chevauchements sont fusionnés.",
    ],
    [
      "Important",
      "Le taux pédagogique repose sur les jalons réalisés ; le temps de connexion constitue une preuve complémentaire distincte.",
    ],
  );

  return `\uFEFF${rows.map(csvRow).join("\r\n")}`;
}

export function exportAttendanceToCSV(options: AttendanceExportOptions) {
  const blob = new Blob([buildAttendanceCSV(options)], {
    type: "text/csv;charset=utf-8;",
  });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.href = url;
  link.download = `releve_assiduite_${options.learnerName
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_|_$/g, "")
    .toLowerCase()}.csv`;
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
