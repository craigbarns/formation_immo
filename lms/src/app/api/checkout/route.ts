import { NextResponse } from "next/server";
import Stripe from "stripe";

export const dynamic = "force-dynamic";

const stripe = process.env.STRIPE_SECRET_KEY 
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: "2025-01-27" as any })
  : null;

const VERCEL_APP_URL = "https://app.monpassformation.com";

export async function POST(request: Request) {
  if (!stripe) {
    return NextResponse.json({ error: "Stripe is not configured" }, { status: 500 });
  }
  try {
    const { formationId } = await request.json();

    // Configuration du produit par défaut (Immobilier)
    const lineItems = [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: "Formation Agent Immobilier - Loi ALUR 2026",
            description: "Accès complet aux 5 modules (42h) et certification MasterClass.",
            images: [`${VERCEL_APP_URL}/generated/fal/transaction/cover-immobilier.jpg`],
          },
          unit_amount: 29900, // 299.00 €
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${VERCEL_APP_URL}/register?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.passformation.com"}#formation-immobiliere`,
      metadata: {
        formationId: formationId || "immobilier",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
