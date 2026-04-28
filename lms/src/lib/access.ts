import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Vérifie si un utilisateur authentifié possède un accès payant actif.
 * @returns { email: string, userId: string } ou lance une redirection/erreur
 */
export async function verifySubscription() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || !user.email) {
    throw new Error("Non authentifié");
  }

  // 1. Vérifier si l'utilisateur est ADMIN
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role === "admin") {
    return { user, isAdmin: true };
  }

  // 2. Sinon, vérification dans la table des abonnements via service role
  // pour éviter les blocages RLS/PostgREST sur auth.users.
  const admin = createAdminClient();
  const { data: subscription } = await admin
    .from("user_subscriptions")
    .select("status")
    .eq("formation_id", "immobilier")
    .or(`email.eq.${user.email},user_id.eq.${user.id}`)
    .eq("status", "active")
    .limit(1)
    .maybeSingle();

  if (!subscription) {
    throw new Error("Accès refusé : Aucun abonnement actif trouvé");
  }

  return { user, isAdmin: false };
}
