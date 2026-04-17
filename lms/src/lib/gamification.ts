/**
 * Gamification engine — XP, badges, streaks, levels.
 * All state persisted in localStorage under a single key.
 */

import { PRO_CHECKLISTS } from "@/data/pro-checklists";

const STORAGE_KEY = "formation-immobilier-gamification";

// ── XP rewards ──────────────────────────────────────────────
export const XP_REWARDS = {
  LESSON_COMPLETE: 100,
  QUIZ_CORRECT: 25,
  QUIZ_PERFECT_SCENARIO: 150, // all QCMs correct in a scenario
  EXAM_PASS: 300,
  EXAM_PERFECT: 500,
  MODULE_COMPLETE: 500,
  ALL_MODULES_COMPLETE: 2000,
  DAILY_LOGIN: 10,
  STREAK_BONUS_3: 50,
  STREAK_BONUS_7: 150,
  STREAK_BONUS_14: 400,
  STREAK_BONUS_30: 1000,
  SIMULATOR_USED: 50,
  CHECKLIST_COMPLETE: 75,
  ALL_CHECKLISTS: 300,
  FLASHCARD_REVIEW: 5,
  HALF_COURSE: 200,
  THREE_QUARTERS: 400,
} as const;

// ── Levels ──────────────────────────────────────────────────
export const LEVELS = [
  { level: 1, title: "Stagiaire", xpRequired: 0, icon: "📋" },
  { level: 2, title: "Assistant", xpRequired: 200, icon: "📝" },
  { level: 3, title: "Negociateur Junior", xpRequired: 500, icon: "🤝" },
  { level: 4, title: "Negociateur", xpRequired: 1000, icon: "💼" },
  { level: 5, title: "Agent Confirme", xpRequired: 2000, icon: "🏠" },
  { level: 6, title: "Agent Senior", xpRequired: 3500, icon: "🏢" },
  { level: 7, title: "Expert Immobilier", xpRequired: 5500, icon: "🏆" },
  { level: 8, title: "Directeur d'Agence", xpRequired: 8000, icon: "⭐" },
  { level: 9, title: "Maitre de l'Immobilier", xpRequired: 12000, icon: "👑" },
] as const;

// ── Badges ──────────────────────────────────────────────────
export type BadgeId =
  | "first-lesson"
  | "module-juridique"
  | "module-transaction"
  | "module-financement"
  | "module-marketing"
  | "module-terrain"
  | "all-modules"
  | "first-exam"
  | "exam-perfect"
  | "streak-3"
  | "streak-7"
  | "streak-14"
  | "streak-30"
  | "simulator-credit"
  | "simulator-rentabilite"
  | "simulator-negotiation"
  | "speed-demon"
  | "quiz-master"
  | "checklist-complete"
  | "all-checklists"
  | "flashcard-master"
  | "half-course"
  | "three-quarters";

export type Badge = {
  id: BadgeId;
  name: string;
  description: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
};

export const BADGES: Badge[] = [
  { id: "first-lesson", name: "Premier Pas", description: "Completez votre premiere lecon", icon: "🎯", rarity: "common" },
  { id: "module-juridique", name: "Juriste Immobilier", description: "Completez le module Juridique", icon: "⚖️", rarity: "rare" },
  { id: "module-transaction", name: "Negociateur", description: "Completez le module Transaction", icon: "🤝", rarity: "rare" },
  { id: "module-financement", name: "Financier", description: "Completez le module Financement", icon: "💰", rarity: "rare" },
  { id: "module-marketing", name: "Marketeur Digital", description: "Completez le module Marketing", icon: "📱", rarity: "rare" },
  { id: "module-terrain", name: "Expert Terrain", description: "Completez le module Terrain", icon: "🏡", rarity: "rare" },
  { id: "all-modules", name: "Agent Complet", description: "Completez tous les modules", icon: "🎓", rarity: "legendary" },
  { id: "first-exam", name: "Premiere Epreuve", description: "Passez votre premier examen", icon: "📝", rarity: "common" },
  { id: "exam-perfect", name: "Score Parfait", description: "Obtenez 100% a un examen", icon: "💎", rarity: "epic" },
  { id: "streak-3", name: "Regulier", description: "3 jours consecutifs de connexion", icon: "🔥", rarity: "common" },
  { id: "streak-7", name: "Semaine Complete", description: "7 jours consecutifs", icon: "🔥", rarity: "rare" },
  { id: "streak-14", name: "Deux Semaines", description: "14 jours consecutifs", icon: "🔥", rarity: "epic" },
  { id: "streak-30", name: "Marathonien", description: "30 jours consecutifs", icon: "🔥", rarity: "legendary" },
  { id: "simulator-credit", name: "Banquier", description: "Utilisez le simulateur de credit", icon: "🏦", rarity: "common" },
  { id: "simulator-rentabilite", name: "Investisseur", description: "Utilisez le simulateur de rentabilite", icon: "📊", rarity: "common" },
  { id: "simulator-negotiation", name: "Tacticien", description: "Utilisez le simulateur de negociation", icon: "⚔️", rarity: "common" },
  { id: "speed-demon", name: "Rapide", description: "Terminez une lecon en moins de 5 minutes", icon: "⚡", rarity: "rare" },
  { id: "quiz-master", name: "Quiz Master", description: "Repondez correctement a 50 QCM", icon: "🧠", rarity: "epic" },
  { id: "checklist-complete", name: "Checklist Pro", description: "Completez votre premiere checklist professionnelle", icon: "✅", rarity: "common" },
  { id: "all-checklists", name: "Expert Checklists", description: "Completez toutes les checklists professionnelles", icon: "📋", rarity: "epic" },
  { id: "flashcard-master", name: "Memoire d'elephant", description: "Revisez 100 flashcards avec succes", icon: "🐘", rarity: "rare" },
  { id: "half-course", name: "A mi-parcours", description: "Completez 50% de la formation", icon: "🛤️", rarity: "rare" },
  { id: "three-quarters", name: "Presque la", description: "Completez 75% de la formation", icon: "🏁", rarity: "epic" },
];

// ── State types ─────────────────────────────────────────────
export type GamificationState = {
  xp: number;
  earnedBadges: BadgeId[];
  streak: number;
  lastLoginDate: string; // YYYY-MM-DD
  totalQuizCorrect: number;
  totalExamsTaken: number;
  totalExamsPerfect: number;
  simulatorsUsed: string[];
  lessonTimes: Record<string, number>; // lessonKey -> seconds spent
  examScores: Record<string, { score: number; total: number; date: string }>;
  xpHistory: { amount: number; reason: string; date: string }[];
  moduleTimers: Record<string, number>; // moduleSlug -> total seconds
  dailyActivity: Record<string, number>; // YYYY-MM-DD -> activity count
  completedChecklists: string[]; // checklist IDs completed
  flashcardsReviewed: number;
};

const DEFAULT_STATE: GamificationState = {
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

// ── Helpers ─────────────────────────────────────────────────
function today(): string {
  return new Date().toISOString().slice(0, 10);
}

function bumpDailyActivity(state: GamificationState, count: number) {
  const d = today();
  state.dailyActivity[d] = (state.dailyActivity[d] || 0) + count;
}

function yesterday(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

export function getGamificationState(): GamificationState {
  if (typeof window === "undefined") return { ...DEFAULT_STATE };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE };
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

function save(state: GamificationState) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent("gamification-state-changed", { detail: state }));
  }
}

export type Level = (typeof LEVELS)[number];

export function getLevelForXP(xp: number) {
  let current: Level = LEVELS[0];
  for (const lvl of LEVELS) {
    if (xp >= lvl.xpRequired) current = lvl;
    else break;
  }
  const nextIdx = LEVELS.findIndex((l) => l.level === current.level) + 1;
  const next: Level | null = nextIdx < LEVELS.length ? LEVELS[nextIdx] : null;
  const progressToNext = next
    ? ((xp - current.xpRequired) / (next.xpRequired - current.xpRequired)) * 100
    : 100;
  return { current, next, progressToNext: Math.min(100, Math.max(0, progressToNext)) };
}

export function getBadge(id: BadgeId): Badge | undefined {
  return BADGES.find((b) => b.id === id);
}

// ── Actions ─────────────────────────────────────────────────
export function addXP(amount: number, reason: string): GamificationState {
  const state = getGamificationState();
  state.xp += amount;
  state.xpHistory.push({ amount, reason, date: new Date().toISOString() });
  // Keep last 100 entries
  if (state.xpHistory.length > 100) state.xpHistory = state.xpHistory.slice(-100);
  save(state);
  return state;
}

export function awardBadge(badgeId: BadgeId): { state: GamificationState; isNew: boolean } {
  const state = getGamificationState();
  if (state.earnedBadges.includes(badgeId)) return { state, isNew: false };
  state.earnedBadges.push(badgeId);
  save(state);
  return { state, isNew: true };
}

export function updateStreak(): { state: GamificationState; newBadges: BadgeId[] } {
  const state = getGamificationState();
  const newBadges: BadgeId[] = [];
  const t = today();

  if (state.lastLoginDate === t) {
    return { state, newBadges };
  }

  if (state.lastLoginDate === yesterday()) {
    state.streak += 1;
  } else if (state.lastLoginDate !== t) {
    state.streak = 1;
  }

  state.lastLoginDate = t;

  // Streak bonuses
  if (state.streak >= 3 && !state.earnedBadges.includes("streak-3")) {
    state.earnedBadges.push("streak-3");
    state.xp += XP_REWARDS.STREAK_BONUS_3;
    newBadges.push("streak-3");
  }
  if (state.streak >= 7 && !state.earnedBadges.includes("streak-7")) {
    state.earnedBadges.push("streak-7");
    state.xp += XP_REWARDS.STREAK_BONUS_7;
    newBadges.push("streak-7");
  }
  if (state.streak >= 14 && !state.earnedBadges.includes("streak-14")) {
    state.earnedBadges.push("streak-14");
    state.xp += XP_REWARDS.STREAK_BONUS_14;
    newBadges.push("streak-14");
  }
  if (state.streak >= 30 && !state.earnedBadges.includes("streak-30")) {
    state.earnedBadges.push("streak-30");
    state.xp += XP_REWARDS.STREAK_BONUS_30;
    newBadges.push("streak-30");
  }

  // Daily XP
  state.xp += XP_REWARDS.DAILY_LOGIN;
  bumpDailyActivity(state, 1);

  save(state);
  return { state, newBadges };
}

export function recordQuizCorrect(): GamificationState {
  const state = getGamificationState();
  state.totalQuizCorrect += 1;
  state.xp += XP_REWARDS.QUIZ_CORRECT;
  bumpDailyActivity(state, 1);

  if (state.totalQuizCorrect >= 50 && !state.earnedBadges.includes("quiz-master")) {
    state.earnedBadges.push("quiz-master");
  }

  save(state);
  return state;
}

export function recordExamScore(
  moduleSlug: string,
  score: number,
  total: number,
): GamificationState {
  const state = getGamificationState();
  state.examScores[moduleSlug] = { score, total, date: new Date().toISOString() };
  state.totalExamsTaken += 1;
  state.xp += XP_REWARDS.EXAM_PASS;
  bumpDailyActivity(state, 1);

  if (!state.earnedBadges.includes("first-exam")) {
    state.earnedBadges.push("first-exam");
  }

  if (score === total) {
    state.totalExamsPerfect += 1;
    state.xp += XP_REWARDS.EXAM_PERFECT - XP_REWARDS.EXAM_PASS;
    if (!state.earnedBadges.includes("exam-perfect")) {
      state.earnedBadges.push("exam-perfect");
    }
  }

  save(state);
  return state;
}

export function recordSimulatorUsed(simulatorId: string): GamificationState {
  const state = getGamificationState();
  if (!state.simulatorsUsed.includes(simulatorId)) {
    state.simulatorsUsed.push(simulatorId);
    state.xp += XP_REWARDS.SIMULATOR_USED;
    bumpDailyActivity(state, 1);

    const badgeMap: Record<string, BadgeId> = {
      credit: "simulator-credit",
      rentabilite: "simulator-rentabilite",
      negociation: "simulator-negotiation",
    };
    const badge = badgeMap[simulatorId];
    if (badge && !state.earnedBadges.includes(badge)) {
      state.earnedBadges.push(badge);
    }
  }
  save(state);
  return state;
}

export function recordChecklistComplete(clId: string): { state: GamificationState; isNew: boolean; newBadges: BadgeId[] } {
  const state = getGamificationState();
  const newBadges: BadgeId[] = [];
  let isNew = false;

  if (!state.completedChecklists.includes(clId)) {
    state.completedChecklists.push(clId);
    state.xp += XP_REWARDS.CHECKLIST_COMPLETE;
    bumpDailyActivity(state, 1);
    isNew = true;

    if (!state.earnedBadges.includes("checklist-complete")) {
      state.earnedBadges.push("checklist-complete");
      newBadges.push("checklist-complete");
    }

    if (state.completedChecklists.length >= PRO_CHECKLISTS.length && !state.earnedBadges.includes("all-checklists")) {
      state.earnedBadges.push("all-checklists");
      state.xp += XP_REWARDS.ALL_CHECKLISTS;
      newBadges.push("all-checklists");
    }
  }

  save(state);
  return { state, isNew, newBadges };
}

export function recordFlashcardReviewed(count = 1): GamificationState {
  const state = getGamificationState();
  state.flashcardsReviewed += count;
  bumpDailyActivity(state, count);

  if (state.flashcardsReviewed >= 100 && !state.earnedBadges.includes("flashcard-master")) {
    state.earnedBadges.push("flashcard-master");
  }

  save(state);
  return state;
}

export function recordLessonTime(lessonKey: string, seconds: number): GamificationState {
  const state = getGamificationState();
  state.lessonTimes[lessonKey] = (state.lessonTimes[lessonKey] || 0) + seconds;
  save(state);
  return state;
}

export function recordModuleTime(moduleSlug: string, seconds: number): GamificationState {
  const state = getGamificationState();
  state.moduleTimers[moduleSlug] = (state.moduleTimers[moduleSlug] || 0) + seconds;
  save(state);
  return state;
}

function countCompletedLessons(): number {
  if (typeof window === 'undefined') return 0;
  try {
    const raw = localStorage.getItem("formation-immobilier-progress");
    if (!raw) return 0;
    const obj = JSON.parse(raw) as Record<string, boolean>;
    return Object.values(obj).filter(Boolean).length;
  } catch {
    return 0;
  }
}

export function completeLesson(lessonKey: string): { state: GamificationState; newBadges: BadgeId[] } {
  const state = getGamificationState();
  const newBadges: BadgeId[] = [];
  state.xp += XP_REWARDS.LESSON_COMPLETE;
  bumpDailyActivity(state, 1);

  if (!state.earnedBadges.includes("first-lesson")) {
    state.earnedBadges.push("first-lesson");
    newBadges.push("first-lesson");
  }

  // Check speed badge
  const time = state.lessonTimes[lessonKey] || 0;
  if (time > 0 && time < 300 && !state.earnedBadges.includes("speed-demon")) {
    state.earnedBadges.push("speed-demon");
    newBadges.push("speed-demon");
  }

  // Check course progression badges
  const completedCount = countCompletedLessons();
  if (completedCount >= 18 && !state.earnedBadges.includes("half-course")) {
    state.earnedBadges.push("half-course");
    state.xp += XP_REWARDS.HALF_COURSE;
    newBadges.push("half-course");
  }
  if (completedCount >= 27 && !state.earnedBadges.includes("three-quarters")) {
    state.earnedBadges.push("three-quarters");
    state.xp += XP_REWARDS.THREE_QUARTERS;
    newBadges.push("three-quarters");
  }

  save(state);
  return { state, newBadges };
}

export function completeModule(moduleSlug: string): { state: GamificationState; newBadges: BadgeId[] } {
  const state = getGamificationState();
  const newBadges: BadgeId[] = [];
  state.xp += XP_REWARDS.MODULE_COMPLETE;

  const badgeMap: Record<string, BadgeId> = {
    juridique: "module-juridique",
    transaction: "module-transaction",
    financement: "module-financement",
    marketing: "module-marketing",
    terrain: "module-terrain",
  };
  const badge = badgeMap[moduleSlug];
  if (badge && !state.earnedBadges.includes(badge)) {
    state.earnedBadges.push(badge);
    newBadges.push(badge);
  }

  // Check all modules
  const allModuleBadges: BadgeId[] = [
    "module-juridique",
    "module-transaction",
    "module-financement",
    "module-marketing",
    "module-terrain",
  ];
  if (allModuleBadges.every((b) => state.earnedBadges.includes(b))) {
    if (!state.earnedBadges.includes("all-modules")) {
      state.earnedBadges.push("all-modules");
      state.xp += XP_REWARDS.ALL_MODULES_COMPLETE;
      newBadges.push("all-modules");
    }
  }

  save(state);
  return { state, newBadges };
}
