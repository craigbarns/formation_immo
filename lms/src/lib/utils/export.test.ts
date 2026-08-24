import { describe, expect, it } from "vitest";
import { buildAttendanceCSV } from "./export";

describe("buildAttendanceCSV", () => {
  it("exporte le temps exact, la progression et le niveau de preuve", () => {
    const csv = buildAttendanceCSV({
      learnerName: "Jean Dupont",
      learnerEmail: "jean.dupont@example.com",
      learnerId: "11111111-1111-4111-8111-111111111111",
      pedagogicalProgressPct: 50,
      completedLessons: 12,
      totalLessons: 24,
      examsTaken: 2,
      sessions: [
        {
          started_at: "2026-08-24T10:00:00.000Z",
          ended_at: "2026-08-24T11:01:01.000Z",
          active_seconds: 3_661,
          module_slugs: ["juridique"],
          lesson_slugs: ["loi-alur"],
          evidence_events: 183,
          evidence_quality: "verified-active",
        },
      ],
    });

    expect(csv).toContain("Temps actif constaté;01:01:01");
    expect(csv).toContain("Taux de réalisation pédagogique;50%");
    expect(csv).toContain("Email du compte authentifié;jean.dupont@example.com");
    expect(csv).toContain("Actif vérifié v2");
    expect(csv).toContain("TOTAL TEMPS ACTIF;01:01:01");
  });

  it("échappe les cellules compatibles Excel", () => {
    const csv = buildAttendanceCSV({
      learnerName: 'Dupont; "Jean"',
      learnerEmail: "",
      learnerId: "22222222-2222-4222-8222-222222222222",
      pedagogicalProgressPct: 0,
      completedLessons: 0,
      totalLessons: 1,
      examsTaken: 0,
      sessions: [],
    });
    expect(csv).toContain('Apprenant;"Dupont; ""Jean"""');
  });
});
