"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { upsertStudentProfile, upsertSubscription } from "@/lib/auth-access";
import { sendAdminCreatedAccountEmail } from "@/lib/email/resend";

type ExamScores = Record<string, { score: number; total: number; date: string }>;

interface ProfileRow {
  id: string;
  full_name: string | null;
  created_at: string | null;
  role: string | null;
}

interface GamificationRow {
  user_id: string;
  xp: number | null;
  streak: number | null;
  last_login_date: string | null;
  total_quiz_correct: number | null;
  total_exams_taken: number | null;
  exam_scores: ExamScores | null;
}

interface LessonProgressRow {
  user_id: string;
  lesson_key: string;
  completed: boolean | null;
}

export interface LearnerStatsPayload {
  id: string;
  full_name: string;
  xp: number;
  lessons_completed: number;
  last_activity: string;
  streak: number;
  quiz_correct: number;
  exams_taken: number;
  exam_scores: ExamScores;
  completed_keys: string[];
}

export interface ConnectionLogPayload {
  id: string;
  user_id: string;
  started_at: string;
  ended_at: string | null;
  duration_seconds: number | null;
  module_slug: string | null;
  lesson_slug: string | null;
}

export interface AdminAccessResult {
  success?: string;
  error?: string;
}

async function requireAdmin() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: "Non authentifié" as const };

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (error) return { error: error.message };
  if (profile?.role !== "admin") return { error: "Accès refusé" as const };

  return { user };
}

function getSiteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL ?? "https://app.monpassformation.com").replace(/\/$/, "");
}

function getString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function isAlreadyRegistered(message: string) {
  const normalized = message.toLowerCase();
  return normalized.includes("already") || normalized.includes("registered");
}

export async function listLearners(): Promise<{ learners?: LearnerStatsPayload[]; error?: string }> {
  const adminCheck = await requireAdmin();
  if ("error" in adminCheck) return { error: adminCheck.error };

  try {
    const admin = createAdminClient();

    const { data: profiles, error: profilesError } = await admin
      .from("profiles")
      .select("id, full_name, created_at, role")
      .eq("role", "student")
      .order("created_at", { ascending: false });

    if (profilesError) return { error: profilesError.message };

    const profileRows = (profiles || []) as ProfileRow[];
    const userIds = profileRows.map((profile) => profile.id);

    if (userIds.length === 0) return { learners: [] };

    const [{ data: gamification, error: gamificationError }, { data: progress, error: progressError }] =
      await Promise.all([
        admin
          .from("gamification_state")
          .select("user_id, xp, streak, last_login_date, total_quiz_correct, total_exams_taken, exam_scores")
          .in("user_id", userIds),
        admin
          .from("lesson_progress")
          .select("user_id, lesson_key, completed")
          .in("user_id", userIds),
      ]);

    if (gamificationError) return { error: gamificationError.message };
    if (progressError) return { error: progressError.message };

    const gamificationByUser = new Map<string, GamificationRow>();
    ((gamification || []) as GamificationRow[]).forEach((row) => {
      gamificationByUser.set(row.user_id, row);
    });

    const completedKeysByUser = new Map<string, string[]>();
    ((progress || []) as LessonProgressRow[]).forEach((row) => {
      if (!row.completed) return;
      const keys = completedKeysByUser.get(row.user_id) || [];
      keys.push(row.lesson_key);
      completedKeysByUser.set(row.user_id, keys);
    });

    return {
      learners: profileRows.map((profile) => {
        const state = gamificationByUser.get(profile.id);
        const completedKeys = completedKeysByUser.get(profile.id) || [];

        return {
          id: profile.id,
          full_name: profile.full_name || "Apprenant anonyme",
          xp: state?.xp || 0,
          streak: state?.streak || 0,
          last_activity: state?.last_login_date || "Jamais",
          quiz_correct: state?.total_quiz_correct || 0,
          exams_taken: state?.total_exams_taken || 0,
          exam_scores: state?.exam_scores || {},
          lessons_completed: completedKeys.length,
          completed_keys: completedKeys,
        };
      }),
    };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Erreur inconnue" };
  }
}

export async function listLearnerConnectionLogs(
  learnerId: string,
): Promise<{ logs?: ConnectionLogPayload[]; error?: string }> {
  const adminCheck = await requireAdmin();
  if ("error" in adminCheck) return { error: adminCheck.error };

  if (!learnerId) return { error: "Apprenant introuvable" };

  try {
    const admin = createAdminClient();
    const { data, error } = await admin
      .from("connection_logs")
      .select("id, user_id, started_at, ended_at, duration_seconds, module_slug, lesson_slug")
      .eq("user_id", learnerId)
      .order("started_at", { ascending: false });

    if (error) return { error: error.message };

    return { logs: (data || []) as ConnectionLogPayload[] };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Erreur inconnue" };
  }
}

function generatePassword(): string {
  const upper = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  const lower = "abcdefghjkmnpqrstuvwxyz";
  const digits = "23456789";
  const special = "@#!$";
  const all = upper + lower + digits + special;
  const rand = (set: string) => set[Math.floor(Math.random() * set.length)];
  const base = Array.from({ length: 8 }, () => rand(all)).join("");
  return rand(upper) + rand(digits) + rand(special) + base;
}

export async function createFullAccessUser(formData: FormData): Promise<AdminAccessResult> {
  const adminCheck = await requireAdmin();
  if ("error" in adminCheck) return { error: adminCheck.error };

  const email = getString(formData.get("email")).toLowerCase();
  const firstName = getString(formData.get("first_name"));
  const lastName = getString(formData.get("last_name"));
  const fullName = `${firstName} ${lastName}`.trim();

  if (!email || !firstName || !lastName) {
    return { error: "Prénom, nom et email sont requis" };
  }

  const password = generatePassword();

  const admin = createAdminClient();
  let userId: string | null = null;
  let wasCreated = false;

  const { data: createdUser, error: createError } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName, first_name: firstName, last_name: lastName },
  });

  if (createError) {
    if (!isAlreadyRegistered(createError.message)) {
      return { error: createError.message };
    }

    const { data: users, error: usersError } = await admin.auth.admin.listUsers({
      page: 1,
      perPage: 1000,
    });

    if (usersError) return { error: usersError.message };

    const existingUser = users.users.find((user) => user.email?.toLowerCase() === email);

    if (!existingUser) {
      return { error: "Compte existant introuvable dans Supabase Auth" };
    }

    userId = existingUser.id;
    const { error: updateError } = await admin.auth.admin.updateUserById(userId, {
      password,
      email_confirm: true,
      user_metadata: { full_name: fullName, first_name: firstName, last_name: lastName },
    });

    if (updateError) return { error: updateError.message };
  } else {
    userId = createdUser.user.id;
    wasCreated = true;
  }

  if (!userId) {
    return { error: "Création du compte impossible" };
  }

  try {
    await upsertSubscription({
      user_id: userId,
      email,
      formation_id: "immobilier",
      status: "active",
    });

    await upsertStudentProfile({
      id: userId,
      full_name: fullName,
      first_name: firstName,
      last_name: lastName,
    });
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Accès formation impossible à créer",
    };
  }

  await sendAdminCreatedAccountEmail(email, firstName || fullName, password);

  const action = wasCreated ? "Compte créé" : "Compte existant mis à jour";
  return { success: `${action}. Accès complet activé pour ${email}. Email envoyé avec les identifiants.` };
}

export async function deleteUser(userId: string): Promise<AdminAccessResult> {
  const adminCheck = await requireAdmin();
  if ("error" in adminCheck) return { error: adminCheck.error };

  if (!userId) return { error: "ID utilisateur manquant" };

  const admin = createAdminClient();

  // Supprimer subscriptions, profil, gamification, progression
  await Promise.all([
    admin.from("user_subscriptions").delete().eq("user_id", userId),
    admin.from("profiles").delete().eq("id", userId),
    admin.from("gamification_state").delete().eq("user_id", userId),
    admin.from("lesson_progress").delete().eq("user_id", userId),
  ]);

  const { error } = await admin.auth.admin.deleteUser(userId);
  if (error) return { error: error.message };

  return { success: "Apprenant supprimé." };
}

export async function inviteUser(formData: FormData): Promise<AdminAccessResult> {
  const adminCheck = await requireAdmin();
  if ("error" in adminCheck) return { error: adminCheck.error };

  const email = getString(formData.get("email")).toLowerCase();
  const firstName = getString(formData.get("first_name"));
  const lastName = getString(formData.get("last_name"));
  const fullName = `${firstName} ${lastName}`.trim();

  if (!email || !firstName || !lastName) return { error: "Tous les champs sont requis" };

  const admin = createAdminClient();

  const { data: inviteData, error: inviteError } = await admin.auth.admin.inviteUserByEmail(email, {
    data: { full_name: fullName, first_name: firstName, last_name: lastName },
    redirectTo: `${getSiteUrl()}/settings/reset-password`,
  });

  if (inviteError) return { error: inviteError.message };

  try {
    await upsertSubscription({
      user_id: inviteData.user.id,
      email,
      formation_id: "immobilier",
      status: "active",
    });

    await upsertStudentProfile({
      id: inviteData.user.id,
      full_name: fullName,
      first_name: firstName,
      last_name: lastName,
    });
  } catch (error) {
    return {
      error: error instanceof Error ? error.message : "Accès formation impossible à créer",
    };
  }

  return { success: `Invitation envoyée à ${email}. Accès complet activé.` };
}
