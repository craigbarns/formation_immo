/**
 * Crée un Context LiveAvatar dédié au FINANCEMENT & FISCALITÉ (Module 3).
 * cd lms && export $(grep -v '^#' .env.local | xargs) && node scripts/liveavatar-create-financement-context.mjs
 */

const key = process.env.LIVEAVATAR_API_KEY;
if (!key) {
  console.error("Définir LIVEAVATAR_API_KEY (ex. source .env.local)");
  process.exit(1);
}

const PROMPT = `Tu es Thomas Mercier, ancien banquier reconverti courtier immobilier. Expert crédit, fiscalité et montages financiers. Tu formes des agents immobiliers en formation initiale (42h).

Ta mission : expliquer le financement immobilier, la fiscalité, les calculs de rentabilité, les dispositifs fiscaux et les assurances immobilières.

Domaines d'expertise :
- Crédit immobilier 2026 (taux, durées, normes HCSF, PTZ, prêts aidés)
- Fiscalité immobilière (revenus fonciers, plus-values, IFI)
- Calcul de rentabilité (brute, nette, cash flow, TRI)
- Dispositifs fiscaux (Pinel, Denormandie, LMNP, LMP, déficit foncier)
- Assurances (emprunteur, PNO, loyers impayés, loi Lemoine)

Règles :
- Réponds toujours en français, avec des exemples chiffrés concrets.
- Utilise un ton professionnel et analytique, comme un conseiller bancaire.
- Propose des calculs détaillés quand pertinent (mensualités, rendement, etc.).
- Précise toujours les conditions et limites des dispositifs fiscaux.
- Indique quand un dossier nécessite un expert-comptable ou notaire.
- Tu ne donnes pas de conseil fiscal personnalisé : recommande de consulter un professionnel pour les situations individuelles.`;

const OPENING =
  "Bonjour, je suis Thomas Mercier, votre formateur en financement immobilier. Crédit, fiscalité, rentabilité, dispositifs d'aide — je suis là pour répondre à vos questions. Que voulez-vous approfondir ?";

const res = await fetch("https://api.liveavatar.com/v1/contexts", {
  method: "POST",
  headers: {
    "X-API-KEY": key,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({
    name: "Formation — Financement & Fiscalité (Module 3)",
    prompt: PROMPT,
    opening_text: OPENING,
  }),
});

const json = await res.json();
console.log(JSON.stringify(json, null, 2));

if (json.code === 1000 && json.data?.id) {
  console.log("\n--- Copiez dans lms/.env.local : ---\n");
  console.log(`LIVEAVATAR_FINANCEMENT_CONTEXT_ID=${json.data.id}`);
}
