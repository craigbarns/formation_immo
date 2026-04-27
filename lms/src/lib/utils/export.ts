"use client";

export interface ConnectionLog {
  started_at: string;
  duration_seconds: number;
  module_slug?: string;
  lesson_slug?: string;
}

export function exportAttendanceToCSV(learnerName: string, logs: ConnectionLog[]) {
  const headers = ["Date", "Heure début", "Module", "Leçon", "Durée (min)"];
  const rows = logs.map(log => {
    const date = new Date(log.started_at);
    return [
      date.toLocaleDateString('fr-FR'),
      date.toLocaleTimeString('fr-FR'),
      log.module_slug || "N/A",
      log.lesson_slug || "N/A",
      Math.round((log.duration_seconds ?? 0) / 60)
    ];
  });

  const csvContent = [
    ["RELEVE D'ASSIDUITE - " + learnerName.toUpperCase()],
    [],
    headers,
    ...rows,
    [],
    ["TOTAL GENERAL", "", "", "", Math.round(logs.reduce((acc, log) => acc + (log.duration_seconds ?? 0), 0) / 60) + " minutes"]
  ].map(e => e.join(",")).join("\n");

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", `assiduite_${learnerName.replace(/\s+/g, '_').toLowerCase()}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
