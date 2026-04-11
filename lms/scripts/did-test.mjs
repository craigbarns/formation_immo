/**
 * Test D-ID API : crée une vidéo "talk" courte (avatar + TTS).
 *
 * Dans le studio D-ID, la clé est souvent au format « username:secret ».
 * Le username peut ressembler à une chaîne base64 (ex. dGVzdEBleGFtcGxlLmNvbQ==),
 * pas forcément votre email en clair — utilisez exactement la valeur affichée.
 *
 * Usage :
 *   export DID_API_USER="colonne_username_D-ID"
 *   export DID_API_SECRET="colonne_secret_D-ID"
 *   node scripts/did-test.mjs
 *
 * Réponses fréquentes :
 *   401 → mauvais couple user/secret
 *   402 → crédits insuffisants (recharger le compte D-ID)
 *
 * Ne commitez jamais ces variables.
 */

const API = "https://api.d-id.com";

function authHeader() {
  const user = process.env.DID_API_USER;
  const secret = process.env.DID_API_SECRET;
  if (!user || !secret) {
    console.error("Définir DID_API_USER et DID_API_SECRET.");
    process.exit(1);
  }
  const token = Buffer.from(`${user}:${secret}`, "utf8").toString("base64");
  return `Basic ${token}`;
}

async function createTalk() {
  const body = {
    source_url:
      "https://d-id-public-bucket.s3.us-west-2.amazonaws.com/alice.jpg",
    script: {
      type: "text",
      input:
        "Bonjour. Ceci est un test audio pour la formation immobilière. Merci de votre attention.",
      provider: {
        type: "microsoft",
        voice_id: "fr-FR-DeniseNeural",
      },
    },
  };

  const res = await fetch(`${API}/talks`, {
    method: "POST",
    headers: {
      Authorization: authHeader(),
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  const text = await res.text();
  if (!res.ok) {
    console.error("Erreur création:", res.status, text);
    process.exit(1);
  }
  return JSON.parse(text);
}

async function getTalk(id) {
  const res = await fetch(`${API}/talks/${id}`, {
    headers: { Authorization: authHeader(), accept: "application/json" },
  });
  const text = await res.text();
  if (!res.ok) {
    console.error("Erreur lecture:", res.status, text);
    process.exit(1);
  }
  return JSON.parse(text);
}

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  console.log("Création du talk…");
  const created = await createTalk();
  console.log("ID:", created.id, "| statut:", created.status);

  let talk = created;
  for (let i = 0; i < 60; i++) {
    if (talk.status === "done" && talk.result_url) break;
    if (talk.status === "error" || talk.status === "rejected") {
      console.error("Échec:", JSON.stringify(talk, null, 2));
      process.exit(1);
    }
    await sleep(2000);
    talk = await getTalk(created.id);
    console.log("…", talk.status);
  }

  if (talk.result_url) {
    console.log("\nVidéo prête :");
    console.log(talk.result_url);
  } else {
    console.log("Réponse finale:", JSON.stringify(talk, null, 2));
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
