import { createAdminClient } from "@/lib/supabase/admin";

export async function upsertStudentProfile(payload: {
  id: string;
  full_name: string;
  first_name: string;
  last_name: string;
}) {
  const admin = createAdminClient();
  const { error } = await admin
    .from("profiles")
    .upsert({ ...payload, role: "student" }, { onConflict: "id" });

  if (error) throw new Error(error.message);
}

export async function upsertSubscription(payload: {
  email: string;
  formation_id: string;
  status: string;
  stripe_session_id?: string | null;
  user_id?: string | null;
}) {
  // Le pack = accès complet = module_slug NULL. On délègue à grantEntitlement
  // (upsert manuel) pour rester compatible avec les index uniques PARTIELS
  // (migration 010) : l'ancien onConflict s'appuyait sur un index supprimé.
  await grantEntitlement({
    email: payload.email,
    formation_id: payload.formation_id,
    module_slug: null,
    status: payload.status,
    stripe_session_id: payload.stripe_session_id ?? null,
    user_id: payload.user_id ?? null,
  });
}

/**
 * Octroie un droit d'accès. module_slug === null ⇒ pack (tous les modules).
 * Upsert MANUEL (select puis insert/update) : les index uniques PARTIELS
 * (migration 010) ne se prêtent pas à l'onConflict de PostgREST.
 */
export async function grantEntitlement(payload: {
  email: string;
  formation_id: string;
  module_slug: string | null;
  status?: string;
  stripe_session_id?: string | null;
  user_id?: string | null;
}) {
  const admin = createAdminClient();
  const email = payload.email.toLowerCase();

  let lookup = admin
    .from("user_subscriptions")
    .select("id")
    .eq("email", email)
    .eq("formation_id", payload.formation_id);
  lookup =
    payload.module_slug === null
      ? lookup.is("module_slug", null)
      : lookup.eq("module_slug", payload.module_slug);

  const { data: existing, error: selectError } = await lookup.maybeSingle();
  if (selectError) throw new Error(selectError.message);

  const row = {
    email,
    formation_id: payload.formation_id,
    module_slug: payload.module_slug,
    status: payload.status ?? "active",
    stripe_session_id: payload.stripe_session_id ?? null,
    user_id: payload.user_id ?? null,
  };

  if (existing?.id) {
    const { error } = await admin
      .from("user_subscriptions")
      .update(row)
      .eq("id", existing.id);
    if (error) throw new Error(error.message);
    return;
  }

  const { error } = await admin.from("user_subscriptions").insert(row);
  if (error) throw new Error(error.message);
}

export async function linkExistingSubscriptionToUser({
  email,
  formationId = "immobilier",
  userId,
}: {
  email: string;
  formationId?: string;
  userId: string;
}) {
  const admin = createAdminClient();
  const normalizedEmail = email.toLowerCase();
  const { data: subscription, error: selectError } = await admin
    .from("user_subscriptions")
    .select("id")
    .eq("email", normalizedEmail)
    .eq("formation_id", formationId)
    .eq("status", "active")
    .maybeSingle();

  if (selectError) throw new Error(selectError.message);
  if (!subscription?.id) return false;

  const { error: updateError } = await admin
    .from("user_subscriptions")
    .update({ user_id: userId })
    .eq("id", subscription.id);

  if (updateError) throw new Error(updateError.message);
  return true;
}
