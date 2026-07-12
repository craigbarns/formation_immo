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
    moduleSlug: "deontologie",
    name: v.deontologie.name,
    role: "Juriste spécialisée déontologie immobilière",
    description:
      "Avocate au barreau de Paris, ancienne membre de la CNTGI. Spécialiste du Code de déontologie et de la non-discrimination dans l'immobilier.",
    mistralVoiceId: v.deontologie.mistralVoiceId,
    mistralVoiceLabel: v.deontologie.mistralVoiceLabel,
    portraitPrompt:
      "Professional headshot, French woman 45 years old, elegant dark suit, silver jewelry, authoritative yet warm expression, law library background with books, soft focused lighting, photorealistic --ar 1:1 --style raw --s 250 --q 2",
    accentColor: "#4338ca",
    initials: "CD",
    photoUrl: "/avatars/deontologie.png",
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
  {
    moduleSlug: "tracfin",
    name: v.tracfin.name,
    role: "Expert conformité LCB-FT",
    description:
      "Juriste spécialisé en lutte anti-blanchiment. Ancien référent TRACFIN, il forme les professionnels de l'immobilier à la vigilance et à la déclaration de soupçon.",
    mistralVoiceId: v.tracfin.mistralVoiceId,
    mistralVoiceLabel: v.tracfin.mistralVoiceLabel,
    portraitPrompt:
      "Professional headshot, French man 52 years old, dark navy suit, rimless glasses, serious trustworthy expression, compliance office with secure documents background, soft focused lighting, photorealistic --ar 1:1 --style raw --s 250 --q 2",
    accentColor: "#0f766e",
    initials: "AR",
  },
  {
    moduleSlug: "murs-fonds-commerce",
    name: v["murs-fonds-commerce"].name,
    role: "Avocate en droit immobilier commercial",
    description:
      "Avocate d'affaires spécialisée dans les baux commerciaux et les cessions de fonds de commerce. Quinze ans de pratique aux côtés de commerçants, bailleurs et investisseurs en murs de boutique.",
    mistralVoiceId: v["murs-fonds-commerce"].mistralVoiceId,
    mistralVoiceLabel: v["murs-fonds-commerce"].mistralVoiceLabel,
    portraitPrompt:
      "Professional headshot, French woman 40 years old, sharp navy business suit, confident expression, background of a Parisian commercial street with elegant storefronts, soft golden light, photorealistic --ar 1:1 --style raw --s 250 --q 2",
    accentColor: "#b45309",
    initials: "CP",
  },
  {
    moduleSlug: "renovation-energetique",
    name: v["renovation-energetique"].name,
    role: "Conseillère en rénovation énergétique",
    description:
      "Ingénieure thermicienne, ancienne conseillère France Rénov'. Dix ans d'audits énergétiques et de plans de financement aux côtés des particuliers et des professionnels de l'immobilier.",
    mistralVoiceId: v["renovation-energetique"].mistralVoiceId,
    mistralVoiceLabel: v["renovation-energetique"].mistralVoiceLabel,
    portraitPrompt:
      "Professional headshot, French woman 38 years old, smart casual blazer over green top, warm confident smile, background of a renovated bright home interior with insulation materials and a tablet showing energy charts, natural light, photorealistic --ar 1:1 --style raw --s 250 --q 2",
    accentColor: "#15803d",
    initials: "EF",
  },
  {
    moduleSlug: "immobilier-ia",
    name: v["immobilier-ia"].name,
    role: "Consultante IA & immobilier",
    description:
      "Consultante en transformation digitale des métiers de l'immobilier. Forme les réseaux d'agences aux usages concrets de l'IA générative depuis ses débuts — avec un principe : la technologie au service du conseil, jamais l'inverse.",
    mistralVoiceId: v["immobilier-ia"].mistralVoiceId,
    mistralVoiceLabel: v["immobilier-ia"].mistralVoiceLabel,
    portraitPrompt:
      "Professional headshot, French woman 35 years old, modern tech-forward style, violet blazer, bright engaging smile, background of a sleek real estate agency with screens showing dashboards, soft neon accents, photorealistic --ar 1:1 --style raw --s 250 --q 2",
    accentColor: "#6d28d9",
    initials: "CM",
  },
];

export function getAvatarForModule(moduleSlug: string): ModuleAvatar | undefined {
  return MODULE_AVATARS.find((a) => a.moduleSlug === moduleSlug);
}
