"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import Stripe from "stripe";
import { getAppUrl } from "@/lib/app-url";
import {
  grantEntitlement,
  hasActiveSubscription,
  linkExistingSubscriptionToUser,
  upsertStudentProfile,
} from "@/lib/auth-access";
import { grantsFromProducts, parsePurchaseMetadata } from "@/lib/purchase";
import { getAuthErrorMessage } from "@/lib/auth-errors";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

function getValidNext(value: FormDataEntryValue | null, fallback = "/formation") {
  if (typeof value !== "string") return fallback;
  return value.startsWith("/") && !value.startsWith("//") ? value : fallback;
}

function getString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function buildRedirect(path: string, params: Record<string, string | null | undefined>) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value) searchParams.set(key, value);
  });

  const query = searchParams.toString();
  return query ? `${path}?${query}` : path;
}

function isAlreadyRegisteredError(message: string) {
  const normalized = message.toLowerCase();
  return (
    normalized.includes("user already registered") ||
    normalized.includes("already been registered") ||
    (normalized.includes("already") && normalized.includes("registered"))
  );
}

async function findAuthUserByEmail(email: string): Promise<User | null> {
  const admin = createAdminClient();
  const normalizedEmail = email.toLowerCase();
  const perPage = 1000;

  for (let page = 1; page <= 20; page += 1) {
    const { data, error } = await admin.auth.admin.listUsers({ page, perPage });
    if (error) throw new Error(error.message);

    const match = data.users.find((user) => user.email?.toLowerCase() === normalizedEmail);
    if (match) return match;
    if (data.users.length < perPage) return null;
  }

  throw new Error("Compte existant introuvable dans Supabase Auth.");
}

async function createPaidCheckoutUser({
  email,
  password,
  fullName,
  firstName,
  lastName,
}: {
  email: string;
  password: string;
  fullName: string;
  firstName: string;
  lastName: string;
}) {
  const admin = createAdminClient();
  const metadata = {
    full_name: fullName,
    first_name: firstName,
    last_name: lastName,
  };

  const { data, error } = await admin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: metadata,
  });

  if (!error) {
    return { user: data.user, alreadyExisted: false };
  }

  if (!isAlreadyRegisteredError(error.message)) {
    throw new Error(error.message);
  }

  const existingUser = await findAuthUserByEmail(email);
  if (!existingUser) {
    throw new Error("Compte existant introuvable dans Supabase Auth.");
  }

  // Ne change jamais le mot de passe d'un compte existant. On confirme juste
  // l'email si besoin pour débloquer un premier signup interrompu.
  const { error: updateError } = await admin.auth.admin.updateUserById(existingUser.id, {
    email_confirm: true,
  });

  if (updateError) throw new Error(updateError.message);

  return { user: existingUser, alreadyExisted: true };
}

async function upsertSignupProfile({
  id,
  fullName,
  firstName,
  lastName,
  preserveExistingRole,
}: {
  id: string;
  fullName: string;
  firstName: string;
  lastName: string;
  preserveExistingRole: boolean;
}) {
  if (!preserveExistingRole) {
    await upsertStudentProfile({
      id,
      full_name: fullName,
      first_name: firstName,
      last_name: lastName,
    });
    return;
  }

  const admin = createAdminClient();
  const { data: profile, error: selectError } = await admin
    .from("profiles")
    .select("id")
    .eq("id", id)
    .maybeSingle();

  if (selectError) throw new Error(selectError.message);

  if (!profile) {
    await upsertStudentProfile({
      id,
      full_name: fullName,
      first_name: firstName,
      last_name: lastName,
    });
    return;
  }

  const { error: updateError } = await admin
    .from("profiles")
    .update({
      full_name: fullName,
      first_name: firstName,
      last_name: lastName,
    })
    .eq("id", id);

  if (updateError) throw new Error(updateError.message);
}

async function retrievePaidCheckout(sessionId: string) {
  const stripeKey = process.env.STRIPE_SECRET_KEY;

  if (!stripeKey) {
    throw new Error("Configuration Stripe manquante pour valider le paiement.");
  }

  const stripe = new Stripe(stripeKey);
  const session = await stripe.checkout.sessions.retrieve(sessionId);

  if (session.payment_status !== "paid") {
    throw new Error("Paiement Stripe non validé.");
  }

  return session;
}

export async function login(formData: FormData) {
  const supabase = await createClient();
  const next = getValidNext(formData.get("next"));
  const email = getString(formData.get("email")).toLowerCase();
  const password = getString(formData.get("password"));

  if (!email || !password) {
    redirect(buildRedirect("/login", {
      next,
      error: "Email et mot de passe sont requis.",
    }));
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(buildRedirect("/login", {
      next,
      error: getAuthErrorMessage(error.message),
    }));
  }

  revalidatePath("/", "layout");
  redirect(next);
}

export async function signup(formData: FormData) {
  const supabase = await createClient();
  const next = getValidNext(formData.get("next"));
  const sessionId = getString(formData.get("session_id"));
  const email = getString(formData.get("email")).toLowerCase();
  const password = getString(formData.get("password"));
  const firstName = getString(formData.get("first_name"));
  const lastName = getString(formData.get("last_name"));
  const fullName = `${firstName} ${lastName}`.trim();

  if (!email || !password || !firstName || !lastName) {
    redirect(buildRedirect("/register", {
      next,
      session_id: sessionId,
      error: "Tous les champs sont requis.",
    }));
  }

  // ── Étape A — ÉLIGIBILITÉ vérifiée AVANT toute création de compte ──
  // Empêche les comptes orphelins + la cascade de rate-limit Supabase :
  // un email sans accès qui s'inscrit puis réessaie déclenchait "you can only
  // request this after N seconds". On ne crée le compte que si l'achat est valide.
  let grants: (string | null)[] | null = null;
  let paidSessionId: string | null = null;
  try {
    if (sessionId) {
      const session = await retrievePaidCheckout(sessionId);
      const paidEmail = session.customer_details?.email?.toLowerCase();
      if (paidEmail && paidEmail !== email) {
        throw new Error("Utilisez l'email indiqué lors du paiement (chez Stripe).");
      }
      const purchase = parsePurchaseMetadata(
        session.metadata as Record<string, string> | null
      );
      if (purchase.formationId && purchase.formationId !== "immobilier") {
        throw new Error("Ce paiement ne correspond pas à la formation immobilière.");
      }
      // Sessions historiques sans metadata lisible : comportement d'origine = pack.
      grants = purchase.productIds.length > 0 ? grantsFromProducts(purchase.productIds) : [null];
      paidSessionId = session.id;
    } else if (!(await hasActiveSubscription(email))) {
      throw new Error("NO_ACCESS");
    }
  } catch (eligibilityError) {
    const raw = eligibilityError instanceof Error ? eligibilityError.message : "";
    const friendly =
      raw === "NO_ACCESS"
        ? "Aucune formation n'est associée à cet email. Achetez d'abord votre formation : votre compte se créera juste après le paiement."
        : raw || "Impossible de vérifier votre achat. Réessayez ou contactez-nous.";
    redirect(buildRedirect("/register", { next, session_id: sessionId, error: friendly }));
  }

  // ── Étape B — création du compte (éligibilité confirmée) ──
  let authUser: User | null = null;
  let paidAccountAlreadyExisted = false;

  if (sessionId) {
    try {
      const result = await createPaidCheckoutUser({
        email,
        password,
        fullName,
        firstName,
        lastName,
      });
      authUser = result.user;
      paidAccountAlreadyExisted = result.alreadyExisted;
    } catch (createUserError) {
      console.error("signup: création admin post-paiement échouée, fallback signup public:", createUserError);

      const { data: authData, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            first_name: firstName,
            last_name: lastName,
          },
          emailRedirectTo: `${getAppUrl()}/auth/callback?next=${encodeURIComponent(next)}`,
        },
      });

      if (error) {
        redirect(buildRedirect("/register", {
          next,
          session_id: sessionId,
          error: getAuthErrorMessage(error.message),
        }));
      }

      authUser = authData.user;
    }
  } else {
    const { data: authData, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          first_name: firstName,
          last_name: lastName,
        },
        emailRedirectTo: `${getAppUrl()}/auth/callback?next=${encodeURIComponent(next)}`,
      },
    });

    if (error) {
      redirect(buildRedirect("/register", {
        next,
        session_id: sessionId,
        error: getAuthErrorMessage(error.message),
      }));
    }

    authUser = authData.user;
  }

  // ── Étape C — profil + octroi/rattachement (best-effort) ──
  // L'éligibilité est déjà validée. En cas d'erreur transitoire ici, on NE
  // renvoie PAS vers /register (sinon nouveau signUp → rate-limit) : l'accès est
  // de toute façon rattaché par email (webhook + verifyModuleAccess matchent l'email).
  if (authUser) {
    try {
      await upsertSignupProfile({
        id: authUser.id,
        fullName,
        firstName,
        lastName,
        preserveExistingRole: paidAccountAlreadyExisted,
      });

      if (grants) {
        for (const moduleSlug of grants) {
          await grantEntitlement({
            email,
            user_id: authUser.id,
            formation_id: "immobilier",
            module_slug: moduleSlug,
            stripe_session_id: paidSessionId,
            status: "active",
          });
        }
      } else {
        await linkExistingSubscriptionToUser({ email, userId: authUser.id });
      }
    } catch (postSignupError) {
      console.error("signup: octroi/rattachement post-création échoué:", postSignupError);
    }
  }

  revalidatePath("/", "layout");
  
  // Message personnalisé si c'est un retour de paiement
  const message = paidAccountAlreadyExisted
    ? "Votre paiement est bien rattaché. Un compte existe déjà avec cet email : connectez-vous, ou réinitialisez votre mot de passe."
    : sessionId
      ? "Compte créé ! Connectez-vous avec le mot de passe choisi pour accéder à votre formation."
      : "Vérifiez votre email pour confirmer votre compte.";

  redirect(`/login?next=${encodeURIComponent(next)}&message=${encodeURIComponent(message)}`);
}

export async function logout() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient();
  const email = getString(formData.get("email")).toLowerCase();

  if (!email) {
    redirect("/login?reset=1&error=Email requis.");
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${getAppUrl()}/auth/callback?next=/settings/reset-password`,
  });

  if (error) {
    redirect("/login?reset=1&error=" + encodeURIComponent(getAuthErrorMessage(error.message)));
  }

  redirect("/login?message=Un email de réinitialisation a été envoyé.");
}
