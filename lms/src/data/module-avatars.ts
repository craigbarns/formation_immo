/**
 * Avatars pédagogiques — un personnage expert par module.
 * Voix ElevenLabs + Mistral Voxtral : référence unique `formateur-voices.json`.
 */

import formateurVoices from "./formateur-voices.json";

export type ModuleAvatar = {
  moduleSlug: keyof typeof formateurVoices;
  name: string;
  role: string;
  description: string;
  /** ElevenLabs — vidéos / avatar */
  voiceId: string;
  voiceProvider: "elevenlabs";
  voiceStyle: string;
  /** Mistral Voxtral — narration MP3 (`npm run audio:generate`) */
  mistralVoiceId: string;
  mistralVoiceLabel: string;
  /** Prompt Midjourney pour générer le portrait de l'avatar */
  portraitPrompt: string;
  /** Couleur d'accent pour le badge avatar */
  accentColor: string;
  /** Initiales pour le placeholder */
  initials: string;
};

const v = formateurVoices;

export const MODULE_AVATARS: ModuleAvatar[] = [
  {
    moduleSlug: "juridique",
    name: v.juridique.name,
    role: "Juriste immobilier",
    description:
      "Expert en droit immobilier et conformité ALUR. 20 ans d'expérience en transactions et contentieux.",
    voiceId: v.juridique.elevenLabsVoiceId,
    voiceProvider: "elevenlabs",
    voiceStyle: "Narrateur posé, ton d'autorité",
    mistralVoiceId: v.juridique.mistralVoiceId,
    mistralVoiceLabel: v.juridique.mistralVoiceLabel,
    portraitPrompt:
      "Professional headshot, French male lawyer 50 years old, silver temples, navy suit, gold tie pin, warm confident smile, law office background with legal books, soft studio lighting, photorealistic --ar 1:1 --style raw --s 250 --q 2",
    accentColor: "#1a3a5c",
    initials: "AV",
  },
  {
    moduleSlug: "transaction",
    name: v.transaction.name,
    role: "Négociatrice senior",
    description:
      "Top négociatrice, 15 ans de terrain. Spécialiste estimation et closing en Île-de-France.",
    voiceId: v.transaction.elevenLabsVoiceId,
    voiceProvider: "elevenlabs",
    voiceStyle: "Chaleureuse, pédagogue",
    mistralVoiceId: v.transaction.mistralVoiceId,
    mistralVoiceLabel: v.transaction.mistralVoiceLabel,
    portraitPrompt:
      "Professional headshot, French-Algerian woman 38 years old, stylish business attire navy blazer, confident welcoming expression, modern real estate agency background, natural light, photorealistic --ar 1:1 --style raw --s 250 --q 2",
    accentColor: "#2563eb",
    initials: "SB",
  },
  {
    moduleSlug: "financement",
    name: v.financement.name,
    role: "Courtier & analyste financier",
    description:
      "Ancien banquier reconverti courtier. Expert crédit, fiscalité et montages financiers immobiliers.",
    voiceId: v.financement.elevenLabsVoiceId,
    voiceProvider: "elevenlabs",
    voiceStyle: "Mature, professionnel bancaire",
    mistralVoiceId: v.financement.mistralVoiceId,
    mistralVoiceLabel: v.financement.mistralVoiceLabel,
    portraitPrompt:
      "Professional headshot, French man 42 years old, well-groomed beard, charcoal suit white shirt, analytical confident expression, financial office with screens showing charts, warm lighting, photorealistic --ar 1:1 --style raw --s 250 --q 2",
    accentColor: "#059669",
    initials: "TM",
  },
  {
    moduleSlug: "marketing",
    name: v.marketing.name,
    role: "Directrice marketing digital",
    description:
      "Experte marketing digital immobilier, ex-SeLoger. Maîtrise photo, SEO, réseaux sociaux et portails.",
    voiceId: v.marketing.elevenLabsVoiceId,
    voiceProvider: "elevenlabs",
    voiceStyle: "Moderne, dynamique",
    mistralVoiceId: v.marketing.mistralVoiceId,
    mistralVoiceLabel: v.marketing.mistralVoiceLabel,
    portraitPrompt:
      "Professional headshot, French woman 34 years old, modern creative look, teal blazer over white top, bright energetic smile, contemporary marketing agency with screens and mood boards, natural light, photorealistic --ar 1:1 --style raw --s 250 --q 2",
    accentColor: "#7c3aed",
    initials: "LF",
  },
  {
    moduleSlug: "terrain",
    name: v.terrain.name,
    role: "Directeur d'agence",
    description:
      "30 ans d'expérience terrain. Expert visites, closing et fidélisation client. Formateur certifié.",
    voiceId: v.terrain.elevenLabsVoiceId,
    voiceProvider: "elevenlabs",
    voiceStyle: "Autorité rassurante, charisme",
    mistralVoiceId: v.terrain.mistralVoiceId,
    mistralVoiceLabel: v.terrain.mistralVoiceLabel,
    portraitPrompt:
      "Professional headshot, French man 52 years old, distinguished salt-and-pepper hair, premium navy overcoat, commanding warm presence, upscale property entrance background, golden hour light, photorealistic --ar 1:1 --style raw --s 250 --q 2",
    accentColor: "#dc2626",
    initials: "NA",
  },
];

export function getAvatarForModule(moduleSlug: string): ModuleAvatar | undefined {
  return MODULE_AVATARS.find((a) => a.moduleSlug === moduleSlug);
}
