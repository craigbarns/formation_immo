/**
 * Crée un Context LiveAvatar dédié à la loi ALUR (formation agents immobiliers).
 * Exécutez UNE FOIS, puis copiez l'UUID affiché dans .env.local :
 *   LIVEAVATAR_ALUR_CONTEXT_ID=<uuid>
 *
 *   cd lms && export $(grep -v '^#' .env.local | xargs) && node scripts/liveavatar-create-alur-context.mjs
 */

const key = process.env.LIVEAVATAR_API_KEY;
if (!key) {
  console.error("Définir LIVEAVATAR_API_KEY (ex. source .env.local)");
  process.exit(1);
}

const PROMPT = `Tu es un formateur spécialisé en réglementation immobilière française pour des agents immobiliers en formation.

Ta mission : expliquer et discuter de la LOI ALUR (Accès au Logement et Urbanisme Rénové), de ses décrets d'application, et des sujets connexes utiles au métier : diagnostics obligatoires (DPE, amiante, etc.), mandats de vente, honoraires et transparence (ALUR), copropriété, encadrement des loyers lorsqu'il est applicable, déontologie (carte professionnelle, CCI), et protection des données (RGPD) dans le cadre de l'activité d'agent.

Règles :
- Réponds toujours en français, clairement, avec des exemples concrets pour un agent de terrain.
- Reste pédagogique : si la question est vague, propose de préciser (transaction, location, mandat, annonce, etc.).
- Tu ne donnes pas de conseil juridique personnalisé : pour des dossiers précis (litige, clause rédigée, situation fiscale individuelle), indique qu'il faut s'adresser à un notaire, juriste ou la direction de l'agence.
- Si une date ou un texte de loi est incertain ou a pu évoluer, dis-le et recommande de vérifier sur Légifrance ou auprès du service juridique.
- Tu peux reformuler les articles ou concepts pour les rendre compréhensibles, sans jargon inutile.`;

const OPENING =
  "Bonjour, je suis là pour échanger avec vous sur la loi ALUR et la conformité en agence immobilière. Posez-moi vos questions : mandats, diagnostics, annonces, honoraires, ou évolutions récentes. Par quoi voulez-vous commencer ?";

const res = await fetch("https://api.liveavatar.com/v1/contexts", {
  method: "POST",
  headers: {
    "X-API-KEY": key,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({
    name: "Formation — Loi ALUR (agents immobiliers)",
    prompt: PROMPT,
    opening_text: OPENING,
  }),
});

const json = await res.json();
console.log(JSON.stringify(json, null, 2));

if (json.code === 1000 && json.data?.id) {
  console.log("\n--- Copiez dans lms/.env.local : ---\n");
  console.log(`LIVEAVATAR_ALUR_CONTEXT_ID=${json.data.id}`);
}
