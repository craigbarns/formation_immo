/**
 * Avatars pédagogiques — un personnage expert par module.
 * Voix Mistral Voxtral : référence unique `formateur-voices.json`.
 */

import formateurVoices from "./formateur-voices.json";

export type ModuleAvatar = {
  moduleSlug: keyof typeof formateurVoices;
  name: string;
  role: string;
  description: string;
  /** Mistral Voxtral — narration MP3 (`npm run audio:generate`) */
  mistralVoiceId: string;
  mistralVoiceLabel: string;
  /** Prompt Midjourney pour générer le portrait de l'avatar */
  portraitPrompt: string;
  /** Couleur d'accent pour le badge avatar */
  accentColor: string;
  /** Initiales pour le placeholder */
  initials: string;
  /** URL de l'image photo générée */
  photoUrl?: string;
};

const v = formateurVoices;

export const MODULE_AVATARS: ModuleAvatar[] = [
  {
    moduleSlug: "juridique",
    name: v.juridique.name,
    role: "Juriste & experte conformité",
    description:
      "Experte en droit immobilier et conformité ALUR. 20 ans d'expérience en transactions et contentieux.",
    mistralVoiceId: v.juridique.mistralVoiceId,
    mistralVoiceLabel: v.juridique.mistralVoiceLabel,
    portraitPrompt:
      "Professional headshot, French female lawyer 48 years old, elegant dark suit, pearl earrings, warm authoritative smile, law office with legal books background, soft studio lighting, photorealistic --ar 1:1 --style raw --s 250 --q 2",
    accentColor: "#1a3a5c",
    initials: "AV",
    photoUrl: "/avatars/juridique.png",
  },
  {
    moduleSlug: "transaction",
    name: v.transaction.name,
    role: "Négociatrice senior",
    description:
      "Top négociatrice, 15 ans de terrain. Spécialiste estimation et closing en Île-de-France.",
    mistralVoiceId: v.transaction.mistralVoiceId,
    mistralVoiceLabel: v.transaction.mistralVoiceLabel,
    portraitPrompt:
      "Professional headshot, French-Algerian woman 38 years old, stylish business attire navy blazer, confident welcoming expression, modern real estate agency background, natural light, photorealistic --ar 1:1 --style raw --s 250 --q 2",
    accentColor: "#2563eb",
    initials: "SB",
    photoUrl: "/avatars/transaction.png",
  },
  {
    moduleSlug: "financement",
    name: v.financement.name,
    role: "Courtière & analyste financière",
    description:
      "Ancienne banquière reconvertie courtière. Experte crédit, fiscalité et montages financiers immobiliers.",
    mistralVoiceId: v.financement.mistralVoiceId,
    mistralVoiceLabel: v.financement.mistralVoiceLabel,
    portraitPrompt:
      "Professional headshot, French woman 40 years old, sharp analytical expression, tailored charcoal blazer, confident professional smile, financial office with charts on screens background, warm lighting, photorealistic --ar 1:1 --style raw --s 250 --q 2",
    accentColor: "#059669",
    initials: "SM",
    photoUrl: "/avatars/financement.png",
  },
  {
    moduleSlug: "marketing",
    name: v.marketing.name,
    role: "Directrice marketing digital",
    description:
      "Experte marketing digital immobilier, ex-SeLoger. Maîtrise photo, SEO, réseaux sociaux et portails.",
    mistralVoiceId: v.marketing.mistralVoiceId,
    mistralVoiceLabel: v.marketing.mistralVoiceLabel,
    portraitPrompt:
      "Professional headshot, French woman 34 years old, modern creative look, teal blazer over white top, bright energetic smile, contemporary marketing agency with screens and mood boards, natural light, photorealistic --ar 1:1 --style raw --s 250 --q 2",
    accentColor: "#7c3aed",
    initials: "LF",
    photoUrl: "/avatars/marketing.png",
  },
  {
    moduleSlug: "terrain",
    name: v.terrain.name,
    role: "Directrice d'agence",
    description:
      "30 ans d'expérience terrain. Experte visites, closing et fidélisation client. Formatrice certifiée.",
    mistralVoiceId: v.terrain.mistralVoiceId,
    mistralVoiceLabel: v.terrain.mistralVoiceLabel,
    portraitPrompt:
      "Professional headshot, French woman 50 years old, distinguished silver highlights in dark hair, premium navy coat, commanding warm smile, upscale property entrance background, golden hour light, photorealistic --ar 1:1 --style raw --s 250 --q 2",
    accentColor: "#dc2626",
    initials: "NA",
    photoUrl: "/avatars/terrain.png",
  },
];

export function getAvatarForModule(moduleSlug: string): ModuleAvatar | undefined {
  return MODULE_AVATARS.find((a) => a.moduleSlug === moduleSlug);
}
