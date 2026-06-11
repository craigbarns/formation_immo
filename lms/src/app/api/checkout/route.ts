import { toErrorMessage } from "@/lib/utils/error";
import { createClient } from "@/lib/supabase/server";
import { fetchActiveEntitlementRows } from "@/lib/auth-access";
import { getEntitlements } from "@/lib/entitlements";
import { buildPurchaseMetadata, filterPurchasable, toLineItems } from "@/lib/purchase";
import { PACK_PRODUCT_ID } from "@/data/catalog";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";

export const dynamic = "force-dynamic";

// Initialisation sécurisée pour éviter les crashs au build
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

const VERCEL_APP_URL =
  process.env.NEXT_PUBLIC_APP_URL ?? "https://app.monpassformation.com";

const BodySchema = z.object({
  /** Nouveau panier : ids produits ("pack" ou slugs de modules). */
  products: z.array(z.string().max(64)).max(20).optional(),
  /** Compat ancien front : { formationId: "immobilier" } = achat du pack. */
  formationId: z.string().max(64).optional(),
});

export async function POST(request: Request) {
  try {
    // 1. Connexion FACULTATIVE (paiement d'abord, comme le pack 299 € historique) :
    //    - connecté  ⇒ user_id rattaché, email pré-rempli, retour /achat/confirmation
    //    - visiteur  ⇒ Stripe collecte l'email, retour /register?session_id (compte après paiement)
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!stripe) {
      return NextResponse.json({ error: "Stripe is not configured" }, { status: 500 });
    }

    const json = await request.json().catch(() => ({}));
    const parsed = BodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
    }
    const requested =
      parsed.data.products ?? (parsed.data.formationId ? [PACK_PRODUCT_ID] : []);

    // 2. Règle d'or (spec §4) : recalcul des droits CÔTÉ SERVEUR — retire tout
    //    produit déjà possédé ou couvert par le pack. Le front n'est jamais cru.
    //    (Visiteur non connecté : aucun droit connu — panier filtré tel quel.)
    const owned = user?.email
      ? getEntitlements(
          await fetchActiveEntitlementRows({ email: user.email, userId: user.id })
        )
      : { hasPack: false, modules: new Set<string>() };
    const { allowed } = filterPurchasable(requested, owned);

    if (allowed.length === 0) {
      return NextResponse.json(
        { error: "Rien à acheter : produit(s) inconnus ou déjà acquis.", code: "NOTHING_TO_BUY" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: toLineItems(allowed, VERCEL_APP_URL),
      mode: "payment",
      ...(user?.email ? { customer_email: user.email } : {}),
      success_url: user?.email
        ? `${VERCEL_APP_URL}/achat/confirmation?session_id={CHECKOUT_SESSION_ID}`
        : `${VERCEL_APP_URL}/register?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.passformation.com"}#formation-immobiliere`,
      metadata: buildPurchaseMetadata(allowed, user?.id ?? null),
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe Error:", err);
    return NextResponse.json({ error: toErrorMessage(err) }, { status: 500 });
  }
}
