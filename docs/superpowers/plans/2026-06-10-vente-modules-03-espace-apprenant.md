# Plan 3/5 — Espace apprenant (verrouillage par module) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Dans l'espace apprenant, chaque module est **ouvert** (possédé via pack ou à l'unité) ou **verrouillé 🔒 avec CTA d'achat** — garde **serveur** sur leçons, examens et flashcards. Page de confirmation d'achat qui attend l'octroi du droit (course webhook).

**Architecture :** L'état des lieux (exploré) : le **layout** `/formation` vérifie « a au moins une ligne active » (un acheteur de module entre donc ✅) ; **aucune** page leçon/examen/flashcards ne vérifie le module → on ajoute `verifyModuleAccess` (Plan 1) en tête de ces pages (redirect vers la page module, qui affiche une **vue verrouillée** avec achat). Le tableau de bord affiche les badges 🔒. Une route `GET /api/entitlements` (résumé des droits) sert le poller de la page `/achat/confirmation` (et le panier du Plan 5).

**Tech Stack :** Next.js 16 App Router (pages serveur existantes), `verifyModuleAccess`/`getEntitlements` (Plans 1–2), `StripeButton` étendu (`products[]`).

**Référence spec :** §5.6 (espace apprenant), §4 (garde serveur), §5.4 (flux post-achat).

---

## Décisions de conception

1. **Verrouillé ⇒ redirect vers la page module** (`/formation/[moduleSlug]`), qui rend une **vue verrouillée** (pitch + prix + boutons « Débloquer ce module » / « Pack complet ») au lieu du contenu. Une seule destination pour tous les CTA.
2. **Admin = hasPack** dans le résumé d'accès (simplifie tous les consommateurs).
3. **`/achat/confirmation`** (hors layout `/formation` pour éviter sa garde) : poll `GET /api/entitlements` toutes les 2 s ; dès qu'un droit existe → `/formation`. Au-delà de 30 s : message rassurant + bouton réessayer. *Limite assumée :* un client qui possédait déjà un accès est redirigé immédiatement (son nouveau module apparaît quelques secondes plus tard).
4. **`ModuleLessonsToggle` reste visible** sur les cartes verrouillées (titres de leçons = vitrine du module).
5. Pas de tests unitaires nouveaux : tout est I/O + JSX (pas de harnais de test composant installé) ; la logique pure est déjà testée (31 tests). Vérification : `tsc`, eslint, `next build`, puis les 4 scénarios sur aperçu Vercel (Plan 5).

## File Structure

| Fichier | Action |
|---|---|
| `lms/src/lib/access.ts` — `getAccessSummary()` | Modifier |
| `lms/src/app/api/entitlements/route.ts` — GET résumé des droits | Créer |
| `lms/src/app/formation/[moduleSlug]/[lessonSlug]/page.tsx` — garde | Modifier |
| `lms/src/app/formation/examen/[moduleSlug]/page.tsx` — garde | Modifier |
| `lms/src/app/formation/flashcards/[moduleSlug]/page.tsx` — garde | Modifier |
| `lms/src/components/StripeButton.tsx` — prop `products[]` + 401→login | Modifier |
| `lms/src/components/modules/ModuleLockedView.tsx` — vue verrouillée | Créer |
| `lms/src/app/formation/[moduleSlug]/page.tsx` — branch verrouillé | Modifier |
| `lms/src/app/formation/page.tsx` — badges 🔒 + CTA | Modifier |
| `lms/src/app/achat/confirmation/page.tsx` + `PurchasePoller.tsx` | Créer |
| `lms/src/app/api/checkout/route.ts` — `success_url` → `/achat/confirmation` | Modifier |

---

## Task 1 : `getAccessSummary()` + `GET /api/entitlements`

- [ ] **Step 1** — Append à `lms/src/lib/access.ts` :
```ts
/**
 * Résumé des droits de l'utilisateur courant, pour l'affichage
 * (badges verrouillé/déverrouillé) et le panier. Admin ⇒ hasPack.
 */
export async function getAccessSummary() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || !user.email) {
    throw new Error("Non authentifié");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role === "admin") {
    return { user, isAdmin: true as const, hasPack: true, modules: [] as string[] };
  }

  const rows = await fetchActiveEntitlementRows({
    email: user.email,
    userId: user.id,
  });
  const { hasPack, modules } = getEntitlements(rows);
  return { user, isAdmin: false as const, hasPack, modules: [...modules] };
}
```
- [ ] **Step 2** — Create `lms/src/app/api/entitlements/route.ts` :
```ts
import { NextResponse } from "next/server";
import { getAccessSummary } from "@/lib/access";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { isAdmin, hasPack, modules } = await getAccessSummary();
    return NextResponse.json({ isAdmin, hasPack, modules });
  } catch {
    return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
  }
}
```
- [ ] **Step 3** — `npx eslint src/lib/access.ts src/app/api/entitlements/route.ts && npx tsc --noEmit` → OK.
- [ ] **Step 4** — Commit : `feat(acces): getAccessSummary + GET /api/entitlements`

## Task 2 : Gardes serveur (leçon, examen, flashcards)

Dans chacune des 3 pages, après la résolution du slug et le `notFound()` :
```ts
const access = await verifyModuleAccess(moduleSlug);
if (!access.hasAccess) redirect(`/formation/${moduleSlug}`);
```
avec les imports : `import { verifyModuleAccess } from "@/lib/access";` et `redirect` depuis `next/navigation`.

- [ ] **Step 1** — Leçon `[lessonSlug]/page.tsx` (dans `LessonPage`, après `if (!result) notFound();`).
- [ ] **Step 2** — Examen `examen/[moduleSlug]/page.tsx` (après résolution du module).
- [ ] **Step 3** — Flashcards `flashcards/[moduleSlug]/page.tsx` (idem).
- [ ] **Step 4** — Vérifier qu'aucune de ces pages n'exporte `generateStaticParams` incompatible (si présent, la lecture des cookies bascule la page en dynamique — comportement attendu).
- [ ] **Step 5** — eslint + tsc → OK. Commit : `feat(acces): garde par module sur lecons, examens, flashcards`

## Task 3 : `StripeButton` products + vue module verrouillée

- [ ] **Step 1** — Réécrire `lms/src/components/StripeButton.tsx` :
```tsx
"use client";

import { useState } from "react";
import { ArrowRight, Loader2, CreditCard } from "lucide-react";

export function StripeButton({
  formationId,
  products,
  label = "Acheter la formation",
}: {
  /** Compat : achat du pack via l'ancien paramètre. */
  formationId?: string;
  /** Panier : ids produits ("pack" ou slugs de modules). Prioritaire sur formationId. */
  products?: string[];
  label?: string;
}) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(products?.length ? { products } : { formationId }),
      });

      if (response.status === 401) {
        // Connexion obligatoire avant paiement : on revient ici après login.
        window.location.href = `/login?next=${encodeURIComponent(window.location.pathname)}`;
        return;
      }

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Erreur lors de l'initialisation du paiement : " + (data.error || "Inconnue"));
      }
    } catch (err) {
      console.error(err);
      alert("Une erreur est survenue lors de la redirection vers Stripe.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-brand-navy px-8 py-5 text-lg font-black text-white shadow-xl shadow-brand-navy/20 transition hover:bg-brand-navy-mid hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70"
    >
      {loading ? (
        <>
          <Loader2 className="h-6 w-6 animate-spin" aria-hidden />
          Préparation du paiement…
        </>
      ) : (
        <>
          <CreditCard className="h-6 w-6" aria-hidden />
          {label}
          <ArrowRight className="h-6 w-6" aria-hidden />
        </>
      )}
    </button>
  );
}
```
- [ ] **Step 2** — Create `lms/src/components/modules/ModuleLockedView.tsx` (vue verrouillée, style espace formation) :
```tsx
import Link from "next/link";
import { ArrowLeft, Lock, Sparkles } from "lucide-react";
import { StripeButton } from "@/components/StripeButton";
import { getModulePriceCents, getPackPriceCents, PACK_PRODUCT_ID } from "@/data/catalog";
import { formatDuration } from "@/data/course";

function euros(cents: number): string {
  return (cents / 100).toLocaleString("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  });
}

export function ModuleLockedView({
  moduleSlug,
  moduleTitle,
  moduleSummary,
  lessonsCount,
  durationMin,
  headline,
}: {
  moduleSlug: string;
  moduleTitle: string;
  moduleSummary: string;
  lessonsCount: number;
  durationMin: number;
  headline?: string | null;
}) {
  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <Link
        href="/formation"
        className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-brand-gold dark:text-white/60"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Retour au parcours
      </Link>

      <section className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#070d18] p-8 text-white shadow-2xl md:p-12">
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.12),transparent_50%)]"
          aria-hidden
        />
        <div className="relative space-y-6">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-400/30 bg-amber-400/10">
              <Lock className="h-6 w-6 text-amber-300" aria-hidden />
            </span>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-amber-300">
              Module verrouillé
            </p>
          </div>

          <h1 className="text-3xl font-black leading-tight md:text-4xl">{moduleTitle}</h1>
          {headline && <p className="text-lg font-bold text-white/90">{headline}</p>}
          <p className="text-base leading-relaxed text-white/60">{moduleSummary}</p>

          <div className="flex flex-wrap gap-2.5 text-2xs font-bold uppercase tracking-wider">
            <span className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-white/80">
              {lessonsCount} leçons
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-white/80">
              {formatDuration(durationMin)}
            </span>
            <span className="rounded-full border border-brand-gold/30 bg-brand-gold/10 px-3.5 py-1 text-brand-gold">
              QCM + attestation
            </span>
          </div>

          <div className="space-y-3 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-sm font-bold uppercase tracking-wider text-white/60">
              Débloquer ce module
            </p>
            <p className="text-4xl font-black text-brand-gold">{euros(getModulePriceCents())}</p>
            <StripeButton
              products={[moduleSlug]}
              label={`Débloquer ce module — ${euros(getModulePriceCents())}`}
            />
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-brand-gold/20 bg-brand-gold/5 p-5">
            <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-brand-gold" aria-hidden />
            <div className="space-y-2">
              <p className="text-sm font-bold text-white/90">
                Meilleur choix : le pack complet — {euros(getPackPriceCents())}
              </p>
              <p className="text-sm leading-6 text-white/60">
                Tous les modules, actuels et futurs, la certification finale et l&apos;espace
                apprenant complet.
              </p>
              <StripeButton
                products={[PACK_PRODUCT_ID]}
                label={`Tout débloquer — ${euros(getPackPriceCents())}`}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
```
- [ ] **Step 3** — Brancher dans `lms/src/app/formation/[moduleSlug]/page.tsx` (après les `notFound()`) :
```ts
const access = await verifyModuleAccess(mod.slug);
if (!access.hasAccess) {
  return (
    <ModuleLockedView
      moduleSlug={mod.slug}
      moduleTitle={mod.title}
      moduleSummary={mod.summary}
      lessonsCount={mod.lessons.length}
      durationMin={getModuleDurationMin(mod.slug)}
      headline={showcase?.headline ?? null}
    />
  );
}
```
avec les imports `verifyModuleAccess` et `ModuleLockedView`.
- [ ] **Step 4** — eslint + tsc → OK. Commit : `feat(acces): vue module verrouillee + StripeButton multi-produits`

## Task 4 : Badges 🔒 sur le tableau de bord

Dans `lms/src/app/formation/page.tsx` :
- [ ] **Step 1** — En tête de `FormationHomePage` (après `checkPlacementTest`) :
```ts
const access = await getAccessSummary();
const canAccess = (slug: string) =>
  access.hasPack || access.modules.includes(slug);
```
(import `getAccessSummary` depuis `@/lib/access`.)
- [ ] **Step 2** — Dans `COURSE.map((mod, i) => {` ajouter `const locked = !canAccess(mod.slug);` puis :
  - après le span durée, badge : `{locked && (<span className="rounded-full border border-amber-400/30 bg-amber-400/10 px-3 py-1 text-2xs font-bold uppercase tracking-wider text-amber-300">🔒 Verrouillé</span>)}`
  - boutons : Flashcards/Examen rendus **seulement si `!locked`** ; le bouton « Ouvrir → » devient « 🔒 Débloquer → » quand `locked` (même href : la page module rend la vue verrouillée).
- [ ] **Step 3** — eslint + tsc → OK. Commit : `feat(acces): badges verrouille/deverrouille sur le tableau de bord`

## Task 5 : Page `/achat/confirmation` + `success_url`

- [ ] **Step 1** — Create `lms/src/app/achat/confirmation/PurchasePoller.tsx` :
```tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2, RefreshCw } from "lucide-react";

const POLL_MS = 2000;
const TIMEOUT_MS = 30000;

export function PurchasePoller() {
  const router = useRouter();
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const startedAt = Date.now();

    async function poll() {
      if (cancelled) return;
      try {
        const res = await fetch("/api/entitlements", { cache: "no-store" });
        if (res.ok) {
          const data: { hasPack: boolean; modules: string[] } = await res.json();
          if (data.hasPack || data.modules.length > 0) {
            router.replace("/formation");
            return;
          }
        }
      } catch {
        // réseau instable : on retentera au prochain tick
      }
      if (Date.now() - startedAt >= TIMEOUT_MS) {
        if (!cancelled) setTimedOut(true);
        return;
      }
      setTimeout(poll, POLL_MS);
    }

    poll();
    return () => {
      cancelled = true;
    };
  }, [router]);

  if (timedOut) {
    return (
      <div className="space-y-4 text-center">
        <p className="text-lg font-bold text-slate-900">
          Paiement reçu — l&apos;activation prend un peu plus de temps que prévu.
        </p>
        <p className="text-sm text-slate-600">
          Votre accès s&apos;ouvre automatiquement d&apos;ici quelques minutes. Vous pouvez
          réessayer, ou nous écrire à contact@passformation.com si besoin.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="inline-flex items-center gap-2 rounded-lg bg-brand-navy px-5 py-3 text-sm font-black text-white transition hover:bg-brand-navy-mid"
        >
          <RefreshCw className="h-4 w-4" aria-hidden />
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4 text-center">
      <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" aria-hidden />
      <p className="text-lg font-bold text-slate-900">Paiement confirmé !</p>
      <p className="inline-flex items-center gap-2 text-sm text-slate-600">
        <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        Activation de votre accès en cours…
      </p>
    </div>
  );
}
```
- [ ] **Step 2** — Create `lms/src/app/achat/confirmation/page.tsx` :
```tsx
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { PurchasePoller } from "./PurchasePoller";

export const metadata: Metadata = {
  title: "Confirmation d'achat",
  robots: { index: false },
};

export const dynamic = "force-dynamic";

export default async function PurchaseConfirmationPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    redirect("/login?next=/achat/confirmation");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-5">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-8 shadow-xl">
        <PurchasePoller />
      </div>
    </main>
  );
}
```
- [ ] **Step 3** — Dans `lms/src/app/api/checkout/route.ts`, remplacer la `success_url` par :
```ts
      success_url: `${VERCEL_APP_URL}/achat/confirmation?session_id={CHECKOUT_SESSION_ID}`,
```
- [ ] **Step 4** — eslint + tsc + `npm test` + `npm run build` → tout OK.
- [ ] **Step 5** — Commit : `feat(acces): page /achat/confirmation (attente octroi webhook) + success_url`

---

## Self-Review (couverture spec)
- §5.6 : tous les modules visibles, non-possédés verrouillés avec CTA (dashboard T4, page module T3), garde **leçon** (T2 — étendue à examen/flashcards qui exposent aussi le contenu). ✅
- §4 : gardes côté serveur (redirect avant rendu du contenu). ✅
- §5.4 : flux post-achat (confirmation + attente webhook, T5). ✅
- Clients pack : `hasPack` ⇒ aucun badge, aucun changement visible. ✅
