"use server";

import { createClient } from "@/lib/supabase/server";

export type ExamResultInput = {
  moduleSlug: string;
  score: number;
  passed: boolean;
  answers: Array<{ questionId: string; selected: number; correct: boolean }>;
  durationSeconds: number;
};

const MAX_ATTEMPTS = 3;
const COOLDOWN_DAYS = 15;

export async function submitExamResult(input: ExamResultInput) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Non authentifié" };

  // Count previous attempts
  const { data: previousAttempts } = await supabase
    .from("exam_results")
    .select("created_at")
    .eq("user_id", user.id)
    .eq("module_slug", input.moduleSlug)
    .order("created_at", { ascending: false });

  const attemptCount = previousAttempts?.length ?? 0;

  // Limite de tentatives
  if (attemptCount >= MAX_ATTEMPTS) {
    return { error: `Limite de ${MAX_ATTEMPTS} tentatives atteinte pour ce module.` };
  }

  // Délai de carence (15 jours)
  if (previousAttempts && previousAttempts.length > 0) {
    const lastAttempt = new Date(previousAttempts[0].created_at);
    const now = new Date();
    const daysSinceLastAttempt = (now.getTime() - lastAttempt.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceLastAttempt < COOLDOWN_DAYS) {
      const daysLeft = Math.ceil(COOLDOWN_DAYS - daysSinceLastAttempt);
      return { error: `Délai de carence : ${daysLeft} jour(s) restant(s) avant la prochaine tentative.` };
    }
  }

  const attemptNumber = attemptCount + 1;

  const { data, error } = await supabase
    .from("exam_results")
    .insert({
      user_id: user.id,
      module_slug: input.moduleSlug,
      score: input.score,
      passed: input.passed,
      answers: input.answers,
      duration_seconds: input.durationSeconds,
      attempt_number: attemptNumber,
    })
    .select()
    .single();

  if (error) return { error: error.message };
  return { success: true, result: data };
}

export async function getExamResults(moduleSlug?: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Non authentifié" };

  let query = supabase
    .from("exam_results")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (moduleSlug) query = query.eq("module_slug", moduleSlug);

  const { data, error } = await query;
  if (error) return { error: error.message };
  return { results: data ?? [] };
}

export async function getMyCertificate() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Non authentifié" };

  const { data, error } = await supabase
    .from("certificates")
    .select("*")
    .eq("user_id", user.id)
    .order("issued_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) return { error: error.message };
  return { certificate: data };
}

function generateCertNumber(): string {
  const year = new Date().getFullYear();
  const rand = Math.floor(10000 + Math.random() * 90000);
  return `ATC-${year}-${rand}`;
}

export async function issueCertificate(studentName: string, modules: string[], finalScore: number) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Non authentifié" };

  // Check lesson completion ≥ 80%
  const { data: progressRows } = await supabase
    .from("lesson_progress")
    .select("lesson_key")
    .eq("user_id", user.id)
    .eq("completed", true);

  const completedLessons = progressRows?.length ?? 0;
  // Total lessons = 36 (hardcoded from course structure)
  const totalLessons = 36;
  const completionPct = Math.round((completedLessons / totalLessons) * 100);

  if (completionPct < 80) {
    return { error: `Complétion insuffisante (${completionPct}%). Minimum requis : 80%.` };
  }

  // Check if all modules passed (score >= 70)
  const { data: results } = await supabase
    .from("exam_results")
    .select("module_slug, score")
    .eq("user_id", user.id)
    .eq("passed", true)
    .order("created_at", { ascending: false });

  const passedModules = new Set(results?.map((r) => r.module_slug) ?? []);
  const allPassed = modules.every((m) => passedModules.has(m));

  if (!allPassed) return { error: "Tous les modules doivent être validés (score ≥ 70%)" };
  if (finalScore < 70) return { error: "Score final insuffisant (minimum 70%)" };

  const certNumber = generateCertNumber();

  const { data, error } = await supabase
    .from("certificates")
    .insert({
      user_id: user.id,
      cert_number: certNumber,
      student_name: studentName,
      modules,
      final_score: finalScore,
      passed: true,
    })
    .select()
    .single();

  if (error) return { error: error.message };
  return { success: true, certificate: data };
}

export async function verifyCertificate(certNumber: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("certificates")
    .select("cert_number, student_name, modules, final_score, passed, issued_at")
    .eq("cert_number", certNumber)
    .maybeSingle();

  if (error) return { error: error.message };
  if (!data) return { error: "Certificat non trouvé" };

  // Update verified_at
  await supabase
    .from("certificates")
    .update({ verified_at: new Date().toISOString() })
    .eq("cert_number", certNumber);

  return { certificate: data };
}
