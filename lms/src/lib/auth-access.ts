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
  const admin = createAdminClient();
  const subscription = {
    ...payload,
    email: payload.email.toLowerCase(),
  };

  const { error } = await admin
    .from("user_subscriptions")
    .upsert(subscription, { onConflict: "email,formation_id" });

  if (!error) return;

  // Older databases may be missing the unique constraint required by PostgREST
  // upsert. Keep access creation working while the migration is applied.
  if (error.code !== "42P10") {
    throw new Error(error.message);
  }

  const { data: existing, error: selectError } = await admin
    .from("user_subscriptions")
    .select("id")
    .eq("email", subscription.email)
    .eq("formation_id", subscription.formation_id)
    .maybeSingle();

  if (selectError) throw new Error(selectError.message);

  if (existing?.id) {
    const { error: updateError } = await admin
      .from("user_subscriptions")
      .update(subscription)
      .eq("id", existing.id);

    if (updateError) throw new Error(updateError.message);
    return;
  }

  const { error: insertError } = await admin
    .from("user_subscriptions")
    .insert(subscription);

  if (insertError) throw new Error(insertError.message);
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
