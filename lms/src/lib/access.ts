import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { getEntitlements } from "@/lib/entitlements";

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

/**
 * Vérifie l'accès à UN module précis.
 * Renvoie { user, isAdmin, hasAccess }. Ne lève PAS si l'accès est refusé —
 * l'appelant (page/leçon) décide quoi afficher (contenu vs CTA d'achat).
 */
export async function verifyModuleAccess(moduleSlug: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || !user.email) {
    throw new Error("Non authentifié");
  }

  // 1. Admin → accès total
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role === "admin") {
    return { user, isAdmin: true, hasAccess: true };
  }

  // 2. Sinon, lire les droits actifs (pack + modules) via service role
  const admin = createAdminClient();
  const { data: rows } = await admin
    .from("user_subscriptions")
    .select("module_slug, status")
    .eq("formation_id", "immobilier")
    .or(`email.eq.${user.email},user_id.eq.${user.id}`)
    .eq("status", "active");

  const { hasPack, modules } = getEntitlements(rows ?? []);
  const hasAccess = hasPack || modules.has(moduleSlug);

  return { user, isAdmin: false, hasAccess };
}
