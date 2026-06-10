import { toErrorMessage } from "@/lib/utils/error";
import { sendWelcomeEmail } from "@/lib/email/resend";
import { grantEntitlement } from "@/lib/auth-access";
import { grantsFromProducts, parsePurchaseMetadata } from "@/lib/purchase";
import { FORMATION_ID } from "@/data/catalog";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

// Initialisation sécurisée pour éviter les crashs au build
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

const isSupabaseAdminConfigured =
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
  Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY);

export async function POST(request: Request) {
  if (!stripe || !isSupabaseAdminConfigured || !webhookSecret) {
    console.error("Webhook configuration missing");
    return NextResponse.json({ error: "Configuration missing" }, { status: 500 });
  }
  const body = await request.text();
  const signature = (await headers()).get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed: ${toErrorMessage(err)}`);
    return NextResponse.json({ error: `Webhook Error: ${toErrorMessage(err)}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const customerEmail = session.customer_details?.email;
    const purchase = parsePurchaseMetadata(session.metadata);

    // Cette app ne gère que la formation immobilier.
    // Les autres produits (Digiformat, etc.) sont traités par leur propre système.
    if (purchase.formationId !== FORMATION_ID) {
      console.log(
        `Stripe webhook ignored — formation "${purchase.formationId ?? "(none)"}" n'est pas immobilier (session: ${session.id})`
      );
      return NextResponse.json({ received: true, ignored: true });
    }

    if (!customerEmail) {
      console.error(`Webhook sans email client (session: ${session.id})`);
      return NextResponse.json({ received: true, ignored: true });
    }

    // Un droit par produit : pack ⇒ module_slug NULL (accès total),
    // module ⇒ son slug. Sessions legacy (ancien checkout) ⇒ pack.
    const grants = grantsFromProducts(purchase.productIds);
    if (grants.length === 0) {
      console.error(
        `Webhook sans produit reconnu (session: ${session.id}, product_ids: ${JSON.stringify(purchase.productIds)})`
      );
      return NextResponse.json({ received: true, ignored: true });
    }

    console.log(
      `Payment successful for ${customerEmail} — produits: ${purchase.productIds.join(", ")} (session: ${session.id})`
    );

    try {
      for (const moduleSlug of grants) {
        await grantEntitlement({
          email: customerEmail,
          formation_id: FORMATION_ID,
          module_slug: moduleSlug,
          status: "active",
          stripe_session_id: session.id,
          user_id: purchase.userId,
        });
      }
    } catch (subError) {
      // 500 ⇒ Stripe rejouera le webhook ; grantEntitlement est idempotent
      // (upsert manuel), donc le retry est sans danger.
      console.error("Error saving entitlements:", subError);
      return NextResponse.json({ error: "Error saving entitlements" }, { status: 500 });
    }

    // Email de bienvenue : achats PACK uniquement (comportement historique).
    // Un client existant qui ajoute un module ne reçoit pas de "bienvenue".
    if (purchase.purchaseType === "pack") {
      const customerName = session.customer_details?.name ?? undefined;
      try {
        await sendWelcomeEmail(customerEmail, customerName);
      } catch (emailError) {
        console.error("Error sending welcome email:", emailError);
      }
    }
  }

  return NextResponse.json({ received: true });
}
