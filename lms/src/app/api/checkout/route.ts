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
  if (!stripe) {
    return NextResponse.json({ error: "Stripe is not configured" }, { status: 500 });
  }
  try {
    // 1. Connexion obligatoire avant paiement (spec §5.4) : le user_id est
    //    rattaché à l'achat et l'email Stripe est pré-rempli.
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.email) {
      return NextResponse.json(
        { error: "Connexion requise avant le paiement", code: "AUTH_REQUIRED" },
        { status: 401 }
      );
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
    const rows = await fetchActiveEntitlementRows({
      email: user.email,
      userId: user.id,
    });
    const { allowed } = filterPurchasable(requested, getEntitlements(rows));

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
      customer_email: user.email,
      success_url: `${VERCEL_APP_URL}/achat/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.passformation.com"}#formation-immobiliere`,
      metadata: buildPurchaseMetadata(allowed, user.id),
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe Error:", err);
    return NextResponse.json({ error: toErrorMessage(err) }, { status: 500 });
  }
}
