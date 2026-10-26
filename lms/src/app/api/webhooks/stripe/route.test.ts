import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  constructEvent: vi.fn(),
  grantEntitlement: vi.fn(),
  sendWelcomeEmail: vi.fn(),
  sendModulePurchaseEmail: vi.fn(),
}));

vi.mock("stripe", () => ({
  default: class {
    webhooks = { constructEvent: mocks.constructEvent };
  },
}));
vi.mock("next/headers", () => ({
  headers: async () => new Headers({ "stripe-signature": "sig" }),
}));
vi.mock("@/lib/auth-access", () => ({ grantEntitlement: mocks.grantEntitlement }));
vi.mock("@/lib/email/resend", () => ({
  sendWelcomeEmail: mocks.sendWelcomeEmail,
  sendModulePurchaseEmail: mocks.sendModulePurchaseEmail,
}));

process.env.STRIPE_SECRET_KEY = "sk_test";
process.env.STRIPE_WEBHOOK_SECRET = "whsec_test";
process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
process.env.SUPABASE_SERVICE_ROLE_KEY = "service";
process.env.NEXT_PUBLIC_APP_URL = "https://app.test";

const { POST } = await import("./route");

function completedSession(metadata: Record<string, string>) {
  return {
    type: "checkout.session.completed",
    data: {
      object: {
        id: "cs_test_123",
        customer_details: { email: "client@example.com", name: "Marie Dupont" },
        metadata,
      },
    },
  };
}

async function deliver(metadata: Record<string, string>) {
  mocks.constructEvent.mockReturnValue(completedSession(metadata));
  return POST(new Request("https://app.test/api/webhooks/stripe", { method: "POST", body: "{}" }));
}

describe("webhook Stripe — emails après paiement", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("achat invité de 2 modules : octroie les 2 et envoie le lien de création de compte", async () => {
    const res = await deliver({
      formation_id: "immobilier",
      product_ids: JSON.stringify(["juridique", "renovation-energetique"]),
      purchase_type: "module_bundle",
    });

    expect(res.status).toBe(200);
    expect(mocks.grantEntitlement).toHaveBeenCalledTimes(2);
    expect(mocks.sendWelcomeEmail).not.toHaveBeenCalled();
    expect(mocks.sendModulePurchaseEmail).toHaveBeenCalledTimes(1);
    const args = mocks.sendModulePurchaseEmail.mock.calls[0][0];
    expect(args.email).toBe("client@example.com");
    expect(args.needsAccount).toBe(true);
    expect(args.accessUrl).toBe("https://app.test/register?session_id=cs_test_123");
    expect(args.moduleTitles).toHaveLength(2);
    expect(args.moduleTitles[0]).toMatch(/Juridique/);
  });

  it("achat de module par un client connecté : lien direct vers la formation", async () => {
    await deliver({
      formation_id: "immobilier",
      product_ids: JSON.stringify(["juridique"]),
      purchase_type: "module_bundle",
      user_id: "user-1",
    });

    const args = mocks.sendModulePurchaseEmail.mock.calls[0][0];
    expect(args.needsAccount).toBe(false);
    expect(args.accessUrl).toBe("https://app.test/formation");
  });

  it("achat du pack : email de bienvenue uniquement", async () => {
    await deliver({
      formation_id: "immobilier",
      product_ids: JSON.stringify(["pack"]),
      purchase_type: "pack",
    });

    expect(mocks.sendWelcomeEmail).toHaveBeenCalledWith("client@example.com", "Marie Dupont");
    expect(mocks.sendModulePurchaseEmail).not.toHaveBeenCalled();
  });
});
