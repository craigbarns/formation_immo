import { describe, expect, it } from "vitest";
import { COURSE, FORMATION_MODULES, getPrevNext, lessonId } from "@/data/course";
import { generateRecommendations } from "@/components/learning-path/AdaptiveLearningPath";
import { getAccessibleModuleSlugs, getEntitlements, type EntitlementRow } from "./entitlements";
import { findNextLesson } from "./formation-journey";
import { getGamificationState } from "./gamification";

const gift: EntitlementRow = { module_slug: "deontologie", status: "active" };
const deontologie = COURSE.find((mod) => mod.slug === "deontologie")!;

function slugsFor(rows: EntitlementRow[], isAdmin = false) {
  return getAccessibleModuleSlugs(getEntitlements(rows), isAdmin);
}

function completeModule(moduleSlug: string): Record<string, boolean> {
  const mod = COURSE.find((item) => item.slug === moduleSlug)!;
  return Object.fromEntries(mod.lessons.map((lesson) => [lessonId(mod.slug, lesson.slug), true]));
}

describe("navigation d'un module offert", () => {
  it("Reprendre ouvre Déontologie dès la première connexion, sans envoyer vers Juridique", () => {
    const slugs = slugsFor([gift]);
    expect(slugs).toEqual(["deontologie"]);
    expect(findNextLesson({}, slugs)).toMatchObject({
      moduleSlug: "deontologie",
      href: `/formation/deontologie/${deontologie.lessons[0].slug}`,
      stepNumber: 1,
      totalSteps: deontologie.lessons.length,
    });
  });

  it("reprend la prochaine leçon du module offert, même avec un ancien historique sur un autre module", () => {
    const progress = {
      ...completeModule("juridique"),
      [lessonId("deontologie", deontologie.lessons[0].slug)]: true,
    };
    expect(findNextLesson(progress, slugsFor([gift]))).toMatchObject({
      moduleSlug: "deontologie",
      lessonSlug: deontologie.lessons[1].slug,
      stepNumber: 2,
      totalSteps: deontologie.lessons.length,
    });
  });

  it("termine le parcours après le cadeau sans proposer un module payant", () => {
    expect(findNextLesson(completeModule("deontologie"), slugsFor([gift]))).toBeNull();
  });

  it("les liens précédent/suivant restent dans le module offert", () => {
    const slugs = slugsFor([gift]);
    const first = getPrevNext("deontologie", deontologie.lessons[0].slug, slugs);
    const last = getPrevNext("deontologie", deontologie.lessons.at(-1)!.slug, slugs);
    expect(first?.prev).toBeNull();
    expect(first?.next?.href).toBe(`/formation/deontologie/${deontologie.lessons[1].slug}`);
    expect(last?.prev?.href).toContain("/formation/deontologie/");
    expect(last?.next).toBeNull();
    expect(getPrevNext("juridique", COURSE[0].lessons[0].slug, slugs)).toBeNull();
  });

  it("les recommandations ignorent les modules verrouillés, y compris les anciens scores faibles", () => {
    const state = {
      ...getGamificationState(),
      examScores: {
        juridique: { score: 1, total: 10, date: "2026-01-01" },
        deontologie: { score: 3, total: 10, date: "2026-01-01" },
      },
    };
    const recommendations = generateRecommendations(state, {}, slugsFor([gift]));
    expect(recommendations.length).toBeGreaterThan(0);
    expect(recommendations.every((item) => item.moduleSlug === "deontologie")).toBe(true);
    expect(recommendations.some((item) => item.type === "review")).toBe(true);
  });

  it("un cadeau inactif n'ouvre aucun parcours ni recommandation", () => {
    const slugs = slugsFor([{ ...gift, status: "inactive" }]);
    expect(slugs).toEqual([]);
    expect(findNextLesson({}, slugs)).toBeNull();
    expect(generateRecommendations(getGamificationState(), {}, slugs)).toEqual([]);
  });
});

describe("navigation avec plusieurs droits", () => {
  it("saute les modules non possédés entre deux modules ouverts", () => {
    const slugs = slugsFor([
      { module_slug: "juridique", status: "active" },
      gift,
    ]);
    expect(findNextLesson(completeModule("juridique"), slugs)?.moduleSlug).toBe("deontologie");
    const juridique = COURSE.find((mod) => mod.slug === "juridique")!;
    expect(getPrevNext("juridique", juridique.lessons.at(-1)!.slug, slugs)?.next?.href)
      .toBe(`/formation/deontologie/${deontologie.lessons[0].slug}`);
  });

  it("conserve le parcours du pack et exclut les formations autonomes non acquises", () => {
    const slugs = slugsFor([{ module_slug: null, status: "active" }]);
    expect(slugs).toEqual(FORMATION_MODULES.map((mod) => mod.slug));
    expect(findNextLesson({}, slugs)).toEqual(findNextLesson({}));
    const last = FORMATION_MODULES.at(-1)!;
    expect(getPrevNext(last.slug, last.lessons.at(-1)!.slug, slugs)?.next).toBeNull();
  });

  it("inclut une formation autonome acquise à l'unité dans la reprise et les recommandations", () => {
    const slugs = slugsFor([{ module_slug: "immobilier-ia", status: "active" }]);
    expect(findNextLesson({}, slugs)?.moduleSlug).toBe("immobilier-ia");
    const recommendations = generateRecommendations(getGamificationState(), {}, slugs);
    expect(recommendations.length).toBeGreaterThan(0);
    expect(recommendations.every((item) => item.moduleSlug === "immobilier-ia")).toBe(true);
  });

  it("préserve les droits additionnels du pack et l'accès administrateur", () => {
    expect(slugsFor([
      { module_slug: null, status: "active" },
      { module_slug: "immobilier-ia", status: "active" },
    ])).toContain("immobilier-ia");
    expect(slugsFor([], true)).toEqual(COURSE.map((mod) => mod.slug));
  });
});
