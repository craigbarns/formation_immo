# Plan 4/5 — Attestation de suivi par module — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans. Steps use checkbox (`- [ ]`) syntax.

**Goal:** Un client qui **possède** un module et l'a **terminé** (toutes les leçons cochées) télécharge une **attestation de suivi PDF pour CE module** (option A — pas d'examen requis). La **certification finale** (examen global ≥ 70 %) reste inchangée.

**Architecture (issue de l'exploration) :** la complétion serveur existe déjà — table `lesson_progress (user_id, lesson_key='module/lesson', completed)`. `formation-data.ts` contient déjà les **6 modules** (durées par module). La route `POST /api/certificates/generate` (auth Bearer) gagne un **scope module** (`body { moduleSlug }`) ; sans body = certification finale (comportement intact). PDF **dédié 1-module** (`ModuleAttestationPDF`) pour ne pas toucher l'existant. Numéros `ATM-…` (module) vs `ATC-…` (certification). Idempotent par (user, module).

**Garde serveur (Règle d'or §4) :** possédé (`fetchActiveEntitlementRows` + `getEntitlements`) **ET** terminé (`lesson_progress`) sinon 403.

**Décisions :** `certificates.final_score` est NOT NULL → on stocke `100` pour une attestation de suivi (le PDF module n'affiche **pas** de score). Période = `created_at` du droit (module ou pack) → date de la dernière leçon complétée.

## File Structure

| Fichier | Action |
|---|---|
| `lms/src/lib/module-completion.ts` — complétion serveur d'un module | Créer |
| `lms/src/lib/pdf/ModuleAttestationPDF.tsx` — PDF attestation 1 module | Créer |
| `lms/src/app/api/certificates/generate/route.ts` — scope `{ moduleSlug }` | Modifier |
| `lms/src/components/modules/ModuleAttestationButton.tsx` — bouton téléchargement | Créer |
| `lms/src/app/formation/[moduleSlug]/page.tsx` — bannière « module terminé » | Modifier |
| `lms/src/app/api/email/module-complete/route.ts` — `max(5)` → `COURSE.length` | Modifier |

## Task 1 : `module-completion.ts`
- [ ] Créer le helper (admin client, clés depuis `COURSE` + `lessonId`) ; retourne `{ completed, completedAt }`.
- [ ] eslint + tsc → OK. Commit.

## Task 2 : `ModuleAttestationPDF.tsx`
- [ ] Document @react-pdf autonome : organisme (`ORGANIZATION`/`REPRESENTATIVE`), apprenant (M./Mme), module (titre + heures depuis `FORMATION.modules`), période, n° `ATM-…`, signature. **Pas de score.**
- [ ] eslint + tsc → OK. Commit.

## Task 3 : Route `generate` — scope module
- [ ] Parser `body { moduleSlug? }` (JSON optionnel). Si absent → flux certification finale **inchangé**.
- [ ] Si présent : module connu (sinon 404) → **possédé** (sinon 403) → **terminé** (sinon 403) → certificat idempotent (`modules == [slug]`, n° `ATM-`) → PDF module → upload bucket `attestations` → `{ pdfUrl, certNumber }`.
- [ ] eslint + tsc + `npm test` → OK. Commit.

## Task 4 : Bouton + bannière sur la page module
- [ ] `ModuleAttestationButton` (client) : token session → `POST /api/certificates/generate` avec `{ moduleSlug }` → `window.open(pdfUrl)`. Pattern copié de `CertificateGenerator`.
- [ ] Page module (possédé) : si `completed` → bannière « 🎓 Module terminé » + bouton, au-dessus de `ModuleLanding`.
- [ ] eslint + tsc → OK. Commit.

## Task 5 : `module-complete` à 6 modules
- [ ] `moduleNumber: z.number().int().min(1).max(5)` → `.max(COURSE.length)` (import `COURSE`).
- [ ] eslint + tsc + `npm run build` → OK. Commit.

## Self-Review
- §5.8 : attestation par module (possédé+terminé), certification finale inchangée, réutilise `certificates` (`modules=[slug]`), n° + QR payload, idempotent. ✅
- §4 : garde serveur dans la route (jamais le front). ✅
- Nettoyage « 5 modules » : `module-complete` corrigé ; `formation-data.ts` avait déjà 6 modules. ✅
