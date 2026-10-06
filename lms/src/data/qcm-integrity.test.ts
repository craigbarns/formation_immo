import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import path from "node:path";
import { COURSE, STANDALONE_MODULE_SLUGS } from "@/data/course";
import {
  MODULE_EXAMS,
  getFinalExam,
  getCertificationExamModuleSlugs,
  FINAL_EXAM_QUESTION_COUNT,
} from "./exam-questions";
import { getQuizCheckpoints } from "./quiz-checkpoints";
import { PLACEMENT_QUESTIONS } from "./placement-test";
import { reorder } from "@/lib/qcm-shuffle";

/**
 * Retours clients (octobre 2026) :
 *  1. l'examen final « 42h » posait des questions sur les formations vendues à
 *     part (59 €) que les clients du pack n'ont jamais achetées ;
 *  2. la bonne réponse était presque toujours « B » (80 % des 273 questions).
 */

const questionModule = new Map<string, string>();
for (const exam of MODULE_EXAMS) for (const q of exam.questions) questionModule.set(q.id, exam.moduleSlug);

describe("examen final de certification", () => {
  it("ne pioche QUE dans les modules certifiants (jamais les formations autonomes)", () => {
    const certif = new Set(getCertificationExamModuleSlugs());
    for (const slug of STANDALONE_MODULE_SLUGS) expect(certif.has(slug)).toBe(false);
    expect(certif.has("deontologie")).toBe(false); // module bonus, hors certification 42h

    for (let run = 0; run < 25; run++) {
      for (const q of getFinalExam().questions) {
        expect(certif.has(questionModule.get(q.id)!), `question ${q.id} hors parcours certifiant`).toBe(true);
      }
    }
  });

  it("contient exactement le nombre de questions annoncé, sans doublon", () => {
    const exam = getFinalExam();
    expect(exam.questions).toHaveLength(FINAL_EXAM_QUESTION_COUNT);
    expect(new Set(exam.questions.map((q) => q.id)).size).toBe(FINAL_EXAM_QUESTION_COUNT);
  });

  it("couvre chaque module certifiant", () => {
    const covered = new Set(getFinalExam().questions.map((q) => questionModule.get(q.id)));
    for (const slug of getCertificationExamModuleSlugs()) expect(covered.has(slug)).toBe(true);
  });
});

describe("mélange des réponses (anti « tout en B »)", () => {
  it("reorder conserve les options et suit la bonne réponse", () => {
    const opts = ["vrai", "faux 1", "faux 2", "faux 3"];
    for (const seed of ["a", "b", "q42", "tr7"]) {
      const { items, index } = reorder(seed, opts, 0);
      expect([...items].sort()).toEqual([...opts].sort());
      expect(items[index]).toBe("vrai");
    }
  });

  it("est déterministe (même ordre serveur/client, pas de décalage d'affichage)", () => {
    expect(reorder("q1", ["a", "b", "c", "d"], 1)).toEqual(reorder("q1", ["a", "b", "c", "d"], 1));
  });

  it("répartit les bonnes réponses sur A/B/C/D (chaque lettre entre 15 % et 35 %)", () => {
    const positions: number[] = [];
    for (const exam of MODULE_EXAMS) {
      for (const q of exam.questions) if (q.options && q.correctIndex != null) positions.push(q.correctIndex);
    }
    for (const mod of COURSE) {
      for (const l of mod.lessons) {
        for (const c of getQuizCheckpoints(mod.slug, l.slug)) positions.push(c.options.findIndex((o) => o.isCorrect));
      }
    }
    for (const q of PLACEMENT_QUESTIONS) positions.push(q.correctIndex);

    const n = positions.length;
    expect(n).toBeGreaterThan(200);
    for (let letter = 0; letter < 4; letter++) {
      const share = positions.filter((p) => p === letter).length / n;
      expect(share, `lettre ${"ABCD"[letter]} : ${Math.round(share * 100)} %`).toBeGreaterThanOrEqual(0.15);
      expect(share, `lettre ${"ABCD"[letter]} : ${Math.round(share * 100)} %`).toBeLessThanOrEqual(0.35);
    }
  });

  it("chaque question garde exactement une bonne réponse valide", () => {
    for (const exam of MODULE_EXAMS) {
      for (const q of exam.questions) {
        if (!q.options) continue;
        expect(q.correctIndex).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex).toBeLessThan(q.options.length);
      }
    }
    for (const mod of COURSE) {
      for (const l of mod.lessons) {
        for (const c of getQuizCheckpoints(mod.slug, l.slug)) {
          expect(c.options.filter((o) => o.isCorrect), c.id).toHaveLength(1);
        }
      }
    }
  });
});

/**
 * Retours clients (octobre 2026, suite) : la bonne réponse était aussi presque
 * toujours la plus longue, et deux paires de QCM de leçon partageaient le même id.
 */
type Qcm = { id: string; options: string[]; correct: number };

function qcmGroups(): Record<string, Qcm[]> {
  const groups: Record<string, Qcm[]> = {};
  const add = (key: string, q: Qcm) => (groups[key] ??= []).push(q);
  for (const exam of MODULE_EXAMS) {
    for (const q of exam.questions) {
      if (q.options && q.correctIndex != null) {
        add(`examen:${exam.moduleSlug}`, { id: q.id, options: q.options, correct: q.correctIndex });
      }
    }
  }
  for (const mod of COURSE) {
    for (const l of mod.lessons) {
      for (const c of getQuizCheckpoints(mod.slug, l.slug)) {
        add(`qcm-lecon:${mod.slug}`, {
          id: c.id,
          options: c.options.map((o) => o.label),
          correct: c.options.findIndex((o) => o.isCorrect),
        });
      }
    }
  }
  for (const q of PLACEMENT_QUESTIONS) {
    add("positionnement", { id: q.id, options: q.options, correct: q.correctIndex });
  }
  return groups;
}

describe("qualité des QCM, série par série", () => {
  const groups = qcmGroups();

  it("rattache chaque QCM de leçon à une leçon existante (aucun QCM orphelin, jamais affiché)", () => {
    const source = readFileSync(path.join(__dirname, "quiz-checkpoints.ts"), "utf8");
    const declared = [...source.matchAll(/\bid: "(qc-[^"]+)"/g)].map((m) => m[1]);
    const shown = new Set(
      Object.entries(groups)
        .filter(([key]) => key.startsWith("qcm-lecon:"))
        .flatMap(([, qs]) => qs.map((q) => q.id)),
    );
    expect(declared.filter((id) => !shown.has(id))).toEqual([]);
  });

  it("donne un identifiant unique à chaque QCM de leçon", () => {
    const ids = Object.entries(groups)
      .filter(([key]) => key.startsWith("qcm-lecon:"))
      .flatMap(([, qs]) => qs.map((q) => q.id));
    const dup = ids.filter((id, i) => ids.indexOf(id) !== i);
    expect(dup, `doublons : ${dup.join(", ")}`).toEqual([]);
  });

  it("équilibre la position de la bonne réponse dans chaque examen et chaque module (écart ≤ 1)", () => {
    for (const [key, qs] of Object.entries(groups)) {
      const counts = [0, 1, 2, 3].map((p) => qs.filter((q) => q.correct === p).length);
      expect(Math.max(...counts) - Math.min(...counts), `${key} : A/B/C/D = ${counts.join("/")}`).toBeLessThanOrEqual(1);
    }
  });

  it("ne trahit pas la bonne réponse par sa longueur (≤ 45 % de « la plus longue » par série)", () => {
    for (const [key, qs] of Object.entries(groups)) {
      const longest = qs.filter((q) => {
        const others = q.options.filter((_, i) => i !== q.correct).map((o) => o.length);
        return q.options[q.correct].length > Math.max(...others);
      }).length;
      expect(longest / qs.length, `${key} : ${longest}/${qs.length}`).toBeLessThanOrEqual(0.45);
    }
  });
});
