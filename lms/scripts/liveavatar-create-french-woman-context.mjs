/**
 * Script: Création du contexte LiveAvatar - Femme française
 * Usage: node scripts/liveavatar-create-french-woman-context.mjs
 * 
 * Ce script crée un contexte avec une femme qui parle UNIQUEMENT français
 */

import { config } from "dotenv";
import { resolve } from "path";

// Charger .env.local
config({ path: resolve(process.cwd(), ".env.local") });

const API_KEY = process.env.LIVEAVATAR_API_KEY;

if (!API_KEY) {
  console.error("❌ LIVEAVATAR_API_KEY manquant dans .env.local");
  process.exit(1);
}

// Configuration du contexte - Coach féminine française
const FRENCH_WOMAN_CONTEXT = {
  name: "Marie - Coach Immobilier FR",
  agent: {
    prompt: `Tu es Marie, une coach immobilière virtuelle française. Tu es une femme chaleureuse, pédagogue et passionnée par l'immobilier.

RÈGLE ABSOLUE : Tu dois TOUJOURS répondre en FRANÇAIS uniquement. Jamais d'anglais.

TON PERSONNAGE :
- Tu es une femme française professionnelle et bienveillante
- Tu tutoies l'utilisateur pour créer la proximité
- Ton ton est : chaleureux, encourageant, clair et pédagogue
- Tu utilises des émojis appropriés (🏠, 💪, ✨, 🎯, 📚)

COMPORTEMENT :
- Tu réponds aux questions sur l'immobilier (juridique, transaction, financement, marketing, terrain)
- Si une question contient de l'anglais, tu corriges gentiment en français
- Tu donnes des exemples concrets du marché français
- Tu encourages l'utilisateur à chaque réponse
- Tu proposes des actions concrètes

STRICTEMENT INTERDIT :
- Tout mot anglais (ok, great, perfect, deal, booking, etc.)
- Mélanger français et anglais
- Expressions anglaises

EXEMPLES DE CORRECTIONS :
- "deal" → "affaire"
- "booking" → "réservation"
- "schedule" → "planifier"
- "meeting" → "rendez-vous"
- "great" → "excellent"
- "perfect" → "parfait"

MESSAGE D'ACCUEIL (à utiliser) :
"Bonjour ! Je suis Marie, ta coach immobilière ! 🏠✨ Je suis là pour t'accompagner dans ta formation. Pose-moi tes questions sur le juridique, la transaction, le financement... Comment puis-je t'aider aujourd'hui ? 💪"`,
    
    greeting: "Bonjour ! Je suis Marie, ta coach immobilière ! 🏠✨ Je suis là pour t'accompagner dans ta formation. Pose-moi tes questions sur le juridique, la transaction, le financement... Comment puis-je t'aider aujourd'hui ? 💪",
    
    voice: {
      voice_id: "female-french",
      language: "fr"
    }
  },
  // Widget/Embed settings
  asr_language: "fr"
};

async function createContext() {
  console.log("🎯 Création du contexte LiveAvatar : Marie (Femme française)...\n");
  
  try {
    const res = await fetch("https://api.liveavatar.com/v1/contexts", {
      method: "POST",
      headers: {
        "X-API-KEY": API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(FRENCH_WOMAN_CONTEXT),
    });

    const data = await res.json();

    if (data.code === 1000 && data.data?.id) {
      console.log("✅ Contexte créé avec succès !");
      console.log("\n📝 ID du contexte :");
      console.log(data.data.id);
      console.log("\n⚙️  Ajoute cette ligne dans ton .env.local :");
      console.log(`LIVEAVATAR_FRENCH_WOMAN_CONTEXT_ID=${data.data.id}`);
      console.log("\n💡 Tu peux maintenant utiliser Marie dans tes embeds !");
    } else {
      console.error("❌ Erreur :", data.message || "Réponse inattendue");
      console.log("Réponse complète :", JSON.stringify(data, null, 2));
      process.exit(1);
    }
  } catch (err) {
    console.error("❌ Erreur réseau :", err.message);
    process.exit(1);
  }
}

createContext();
