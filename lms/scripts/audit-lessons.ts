import { COURSE } from "../src/data/course";
import { LESSON_VISUALS } from "../src/data/lesson-keyconcepts";
import { getQuizCheckpoints } from "../src/data/quiz-checkpoints";
import { getCaseStudies } from "../src/data/case-studies";
import { getDragDropExercises } from "../src/data/drag-drop-exercises";
import { getTrainerCallouts } from "../src/data/trainer-callouts";
import { getTimelines } from "../src/data/timeline-data";
import { getDataTables } from "../src/data/data-tables";
import { getGuidedCalculations } from "../src/data/guided-calculations";
import { getChatRoleplay } from "../src/data/chat-roleplay";

type ReportItem = { key: string; title: string; mod: string; score: number; visuals: number; quizzes: number; cases: number; dds: number; calls: number; tls: number; tables: number; calcs: number; chats: number; scenario: number };
const report: ReportItem[] = [];
for (const mod of COURSE) {
  for (const les of mod.lessons) {
    const key = `${mod.slug}/${les.slug}`;
    const visuals = LESSON_VISUALS[key];
    const quizzes = getQuizCheckpoints(mod.slug, les.slug);
    const cases = getCaseStudies(mod.slug, les.slug);
    const dds = getDragDropExercises(mod.slug, les.slug);
    const calls = getTrainerCallouts(mod.slug, les.slug);
    const tls = getTimelines(mod.slug, les.slug);
    const tables = getDataTables(mod.slug, les.slug);
    const calcs = getGuidedCalculations(mod.slug, les.slug);
    const chats = getChatRoleplay(mod.slug, les.slug);
    const hasScenario = !!les.interactiveScenarioId;
    const score = (visuals?1:0) + (quizzes.length?1:0) + (cases.length?1:0) + (dds.length?1:0) + (calls.length?1:0) + (tls.length?1:0) + (tables.length?1:0) + (calcs.length?1:0) + (chats?1:0) + (hasScenario?1:0);
    report.push({ key, title: les.title, mod: mod.slug, score, visuals: visuals?1:0, quizzes: quizzes.length, cases: cases.length, dds: dds.length, calls: calls.length, tls: tls.length, tables: tables.length, calcs: calcs.length, chats: chats?1:0, scenario: hasScenario?1:0 });
  }
}
report.sort((a,b) => a.score - b.score);
console.table(report.map(r => ({ lecon: r.key, score: r.score, q: r.quizzes, cs: r.cases, dd: r.dds, cl: r.calls, tl: r.tls, tb: r.tables, ca: r.calcs, ch: r.chats, sc: r.scenario })));
console.log('---');
console.log('Lecons avec score 0-1 (faible):', report.filter(r => r.score <= 1).map(r => r.key).join(', '));
console.log('Lecons avec score 2-3 (moyen):', report.filter(r => r.score >= 2 && r.score <= 3).map(r => r.key).join(', '));
console.log('Lecons avec score >= 5 (riche):', report.filter(r => r.score >= 5).map(r => r.key).join(', '));
