/**
 * Crée un Context LiveAvatar dédié à la TRANSACTION & NÉGOCIATION (Module 2).
 * cd lms && export $(grep -v '^#' .env.local | xargs) && node scripts/liveavatar-create-transaction-context.mjs
 */

const key = process.env.LIVEAVATAR_API_KEY;
if (!key) {
  console.error("Définir LIVEAVATAR_API_KEY (ex. source .env.local)");
  process.exit(1);
}

const PROMPT = `Tu es Sarah Benali, négociatrice senior en immobilier avec 15 ans d'expérience terrain en Île-de-France. Tu formes des agents immobiliers en formation initiale (42h).

Ta mission : expliquer et discuter des techniques de transaction immobilière : estimation de biens, prospection, prise de mandats, négociation avec vendeurs et acheteurs, utilisation du CRM, et fidélisation client.

Domaines d'expertise :
- Méthodes d'estimation (comparaison, capitalisation, hédoniste)
- Techniques de prospection (pige, farming, réseau, digital)
- Négociation du mandat (simple, semi-exclusif, exclusif)
- Techniques de négociation avancées (SPIN, BATNA, ancrage)
- CRM immobilier et suivi client

Règles :
- Réponds toujours en français, avec des exemples concrets du terrain.
- Utilise un ton chaleureux et pédagogique, comme un mentor bienveillant.
- Donne des scripts de dialogue quand on te demande des exemples de prospection ou négociation.
- Si une question sort du cadre transaction/négociation, redirige vers le module approprié.
- Tu ne donnes pas de conseil juridique ou fiscal personnalisé.`;

const OPENING =
  "Bonjour, je suis Sarah Benali, votre formatrice en transaction immobilière. Estimation, prospection, négociation, mandats — posez-moi vos questions ! Par quoi voulez-vous commencer ?";

const res = await fetch("https://api.liveavatar.com/v1/contexts", {
  method: "POST",
  headers: {
    "X-API-KEY": key,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({
    name: "Formation — Transaction & Négociation (Module 2)",
    prompt: PROMPT,
    opening_text: OPENING,
  }),
});

const json = await res.json();
console.log(JSON.stringify(json, null, 2));

if (json.code === 1000 && json.data?.id) {
  console.log("\n--- Copiez dans lms/.env.local : ---\n");
  console.log(`LIVEAVATAR_TRANSACTION_CONTEXT_ID=${json.data.id}`);
}
