/**
 * Test LiveAvatar : POST /v2/embeddings (sandbox)
 *
 *   export LIVEAVATAR_API_KEY="votre-cle"
 *   node scripts/liveavatar-embed-test.mjs
 */

const key = process.env.LIVEAVATAR_API_KEY;
if (!key) {
  console.error("Définir LIVEAVATAR_API_KEY");
  process.exit(1);
}

const res = await fetch("https://api.liveavatar.com/v2/embeddings", {
  method: "POST",
  headers: {
    "X-API-KEY": key,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  body: JSON.stringify({
    avatar_id: "65f9e3c9-d48b-4118-b73a-4ae2e3cbb8f0",
    context_id: "158f5d55-2d4f-11f1-8d28-066a7fa2e369",
    is_sandbox: true,
  }),
});

const json = await res.json();
console.log(JSON.stringify(json, null, 2));
if (json.code === 1000 && json.data?.url) {
  console.log("\n→ Ouvrez dans le navigateur :", json.data.url);
}
