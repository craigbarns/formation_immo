"use server";

import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function inviteUser(formData: FormData): Promise<{ success?: string; error?: string }> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return { error: "Non authentifié" };

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") return { error: "Accès refusé" };

  const email = (formData.get("email") as string).trim().toLowerCase();
  const firstName = (formData.get("first_name") as string).trim();
  const lastName = (formData.get("last_name") as string).trim();
  const fullName = `${firstName} ${lastName}`.trim();

  if (!email || !firstName || !lastName) return { error: "Tous les champs sont requis" };

  const admin = createAdminClient();

  const { data: inviteData, error: inviteError } = await admin.auth.admin.inviteUserByEmail(email, {
    data: { full_name: fullName, first_name: firstName, last_name: lastName },
  });

  if (inviteError) return { error: inviteError.message };

  const userId = inviteData.user.id;

  await admin.from("user_subscriptions").upsert(
    { user_id: userId, email, formation_id: "immobilier", status: "active" },
    { onConflict: "email,formation_id" }
  );

  await admin.from("profiles").upsert(
    { id: userId, full_name: fullName, first_name: firstName, last_name: lastName },
    { onConflict: "id" }
  );

  return { success: `Invitation envoyée à ${email}` };
}
