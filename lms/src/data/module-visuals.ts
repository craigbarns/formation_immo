/**
 * Galerie de visuels par module — prompts Midjourney prêts à copier
 * + emplacements pour les images générées.
 */

export type VisualPrompt = {
  id: string;
  lessonSlug: string;
  title: string;
  description: string;
  prompt: string;
  /** URL de l'image générée (null = pas encore produit) */
  imageUrl: string | null;
  category: "intro" | "concept" | "infographic" | "scenario" | "closing";
};

export type ModuleVisuals = {
  moduleSlug: string;
  prompts: VisualPrompt[];
};

export const ALL_MODULE_VISUALS: ModuleVisuals[] = [
  {
    moduleSlug: "juridique",
    prompts: [
      {
        id: "j1-alur",
        lessonSlug: "loi-alur",
        title: "Balance de la Justice ALUR",
        description: "Balance de la justice avec documents holographiques — loi ALUR 2026",
        prompt:
          "Cinematic wide shot, golden scale of justice on marble pedestal, holographic legal documents floating around, French tricolor ribbon, navy blue and gold color palette, volumetric lighting, ultra-detailed, photorealistic --ar 16:9 --style raw --s 250 --q 2",
        imageUrl: null,
        category: "intro",
      },
      {
        id: "j2-compromis",
        lessonSlug: "compromis",
        title: "Signature du compromis",
        description: "Mains signant un contrat avec un stylo plume, ambiance notariale",
        prompt:
          "Close-up cinematic shot, elegant hands signing a contract with a premium fountain pen, notary office ambient, warm wood desk, golden seal stamp, bokeh background with legal books, navy and gold tones --ar 16:9 --style raw --s 250 --q 2",
        imageUrl: null,
        category: "concept",
      },
      {
        id: "j3-diagnostics",
        lessonSlug: "diagnostics",
        title: "Expert diagnostics",
        description: "Expert avec caméra thermique inspectant un bien immobilier",
        prompt:
          "Professional real estate inspector using thermal imaging camera on a French apartment wall, diagnostic equipment on table, DPE chart visible, technical precision, cinematic lighting, navy blue uniform, photorealistic --ar 16:9 --style raw --s 250 --q 2",
        imageUrl: null,
        category: "concept",
      },
      {
        id: "j4-mandats",
        lessonSlug: "mandats",
        title: "Poignée de main — mandat",
        description: "Poignée de main professionnelle symbolisant la signature du mandat",
        prompt:
          "Iconic professional handshake between real estate agent and client, French agency office, mandate document on table, confident business atmosphere, golden warm light, navy suits, photorealistic --ar 16:9 --style raw --s 250 --q 2",
        imageUrl: null,
        category: "scenario",
      },
      {
        id: "j5-copro",
        lessonSlug: "copropriete",
        title: "Immeuble haussmannien",
        description: "Façade haussmannienne éclairée à l'heure dorée — copropriété parisienne",
        prompt:
          "Stunning Haussmann building facade in Paris, golden hour lighting, ornate balconies with wrought iron, French limestone, blue sky, classic Parisian atmosphere, architectural photography, ultra-detailed --ar 16:9 --style raw --s 250 --q 2",
        imageUrl: null,
        category: "intro",
      },
    ],
  },
  {
    moduleSlug: "transaction",
    prompts: [
      {
        id: "t1-estimation",
        lessonSlug: "estimation",
        title: "Estimation d'un bien",
        description: "Agent analysant un bien avec tablette et données comparatives",
        prompt:
          "Real estate agent analyzing property value on tablet with comparative data charts, standing in elegant French living room, professional attire, data overlay graphics, warm natural light, photorealistic --ar 16:9 --style raw --s 250 --q 2",
        imageUrl: null,
        category: "concept",
      },
      {
        id: "t2-prospection",
        lessonSlug: "prospection",
        title: "Prospection terrain",
        description: "Agent en prospection dans un quartier résidentiel français",
        prompt:
          "Real estate agent prospecting in an upscale French residential neighborhood, tablet in hand, looking at properties, tree-lined street, professional confident posture, cinematic morning light, photorealistic --ar 16:9 --style raw --s 250 --q 2",
        imageUrl: null,
        category: "scenario",
      },
      {
        id: "t3-negociation",
        lessonSlug: "negociation-mandat",
        title: "Table de négociation",
        description: "Scène de négociation en salle de réunion moderne",
        prompt:
          "Intense real estate negotiation scene, modern meeting room, two professionals facing each other across glass table, documents and laptop visible, dramatic side lighting, business tension, photorealistic --ar 16:9 --style raw --s 250 --q 2",
        imageUrl: null,
        category: "scenario",
      },
      {
        id: "t4-crm",
        lessonSlug: "crm",
        title: "Dashboard CRM immobilier",
        description: "Écran CRM avec pipeline de ventes et données clients",
        prompt:
          "Modern CRM dashboard on large monitor, real estate sales pipeline visible, client cards, revenue charts, agent desk with dual screens, contemporary office, soft blue and gold interface colors, photorealistic --ar 16:9 --style raw --s 250 --q 2",
        imageUrl: null,
        category: "infographic",
      },
    ],
  },
  {
    moduleSlug: "financement",
    prompts: [
      {
        id: "f1-credit",
        lessonSlug: "credit",
        title: "Simulation de crédit",
        description: "Dashboard financier avec calcul de mensualités et taux",
        prompt:
          "Financial dashboard showing mortgage simulation, monthly payment calculator, interest rate graph, French bank office background, clean modern UI on screen, navy blue and gold accents, professional atmosphere --ar 16:9 --style raw --s 250 --q 2",
        imageUrl: null,
        category: "infographic",
      },
      {
        id: "f2-fiscalite",
        lessonSlug: "fiscalite",
        title: "Fiscalité immobilière",
        description: "Visualisation des dispositifs fiscaux et déductions",
        prompt:
          "Tax optimization visualization, French property tax documents, calculator, pie chart showing tax deductions, magnifying glass over fiscal code, warm office desk, institutional atmosphere, photorealistic --ar 16:9 --style raw --s 250 --q 2",
        imageUrl: null,
        category: "concept",
      },
      {
        id: "f3-rentabilite",
        lessonSlug: "rentabilite",
        title: "Analyse de rentabilité",
        description: "Graphique ROI avec cash flow et rendement locatif",
        prompt:
          "Investment analysis dashboard, ROI graph trending upward, cash flow visualization, rental yield percentage prominently displayed, modern investor desk, financial newspaper, gold and navy color scheme --ar 16:9 --style raw --s 250 --q 2",
        imageUrl: null,
        category: "infographic",
      },
      {
        id: "f4-dispositifs",
        lessonSlug: "dispositifs",
        title: "Dispositifs Pinel/Denormandie",
        description: "Immeuble neuf avec pictogrammes d'avantages fiscaux",
        prompt:
          "Modern French apartment building with tax benefit icons floating around it, Pinel law visual, reduction percentage badges, blue sky, clean architectural photography, infographic style overlay --ar 16:9 --style raw --s 250 --q 2",
        imageUrl: null,
        category: "concept",
      },
    ],
  },
  {
    moduleSlug: "marketing",
    prompts: [
      {
        id: "m1-photos",
        lessonSlug: "photos",
        title: "Photo immobilière pro",
        description: "Photographe professionnel en action dans un intérieur soigné",
        prompt:
          "Professional real estate photographer shooting a beautifully staged French living room, wide-angle lens on tripod, natural light flooding through tall windows, magazine-quality interior, warm inviting atmosphere --ar 16:9 --style raw --s 250 --q 2",
        imageUrl: null,
        category: "scenario",
      },
      {
        id: "m2-annonces",
        lessonSlug: "annonces",
        title: "Annonce immobilière parfaite",
        description: "Écran montrant une annonce optimisée avec photos et description",
        prompt:
          "Perfect real estate listing on laptop screen, professional photos of French property, compelling headline visible, SeLoger-style interface, modern desk setup, warm ambient lighting, marketing excellence --ar 16:9 --style raw --s 250 --q 2",
        imageUrl: null,
        category: "concept",
      },
      {
        id: "m3-reseaux",
        lessonSlug: "reseaux",
        title: "Stratégie réseaux sociaux",
        description: "Smartphone avec feed Instagram immobilier et engagement",
        prompt:
          "Smartphone displaying Instagram real estate feed, property photos with high engagement, likes and comments visible, social media strategy desk with content calendar, modern creative workspace, vibrant colors --ar 16:9 --style raw --s 250 --q 2",
        imageUrl: null,
        category: "infographic",
      },
      {
        id: "m4-seo",
        lessonSlug: "seo",
        title: "SEO immobilier",
        description: "Écran Google avec résultats SEO optimisés pour l'immobilier",
        prompt:
          "Google search results page showing top-ranking real estate listing, SEO analytics dashboard in background, keyword research visible, modern marketer workspace, blue and gold accents, digital marketing atmosphere --ar 16:9 --style raw --s 250 --q 2",
        imageUrl: null,
        category: "concept",
      },
    ],
  },
  {
    moduleSlug: "terrain",
    prompts: [
      {
        id: "v1-visite",
        lessonSlug: "visite",
        title: "Visite d'un bien",
        description: "Agent guidant des acheteurs lors d'une visite de propriété",
        prompt:
          "Real estate agent guiding young couple through a bright French apartment, open floor plan, large windows, agent gesturing towards features, natural golden light, welcoming atmosphere, cinematic wide shot --ar 16:9 --style raw --s 250 --q 2",
        imageUrl: null,
        category: "scenario",
      },
      {
        id: "v2-argumentaire",
        lessonSlug: "argumentaire",
        title: "Argumentaire de vente",
        description: "Présentation convaincante avec support visuel et émotion",
        prompt:
          "Dynamic sales presentation, real estate agent presenting property benefits on large screen to clients, modern meeting room, confidence body language, compelling visuals on screen, professional atmosphere --ar 16:9 --style raw --s 250 --q 2",
        imageUrl: null,
        category: "concept",
      },
      {
        id: "v3-closing",
        lessonSlug: "closing",
        title: "Closing réussi",
        description: "Moment de conclusion de vente — accord final et satisfaction",
        prompt:
          "Successful real estate closing moment, smiling clients and agent shaking hands, signed documents on table, champagne glasses, keys handover, warm celebratory atmosphere, golden light, emotional satisfaction --ar 16:9 --style raw --s 250 --q 2",
        imageUrl: null,
        category: "closing",
      },
      {
        id: "v4-signature",
        lessonSlug: "promesse",
        title: "Signature chez le notaire",
        description: "Cérémonie de signature de l'acte authentique",
        prompt:
          "Formal notary office signing ceremony, French notaire with clients, authentic deed document, official stamps, elegant office with wood paneling, chandelier, institutional solemnity, photorealistic --ar 16:9 --style raw --s 250 --q 2",
        imageUrl: null,
        category: "closing",
      },
      {
        id: "v5-fidelisation",
        lessonSlug: "fidelisation",
        title: "Fidélisation client",
        description: "Agent remettant un cadeau de bienvenue aux nouveaux propriétaires",
        prompt:
          "Real estate agent giving welcome gift to new homeowners at their door, house keys with ribbon, warm neighborhood background, genuine smiles, community feeling, soft afternoon light, heartwarming moment --ar 16:9 --style raw --s 250 --q 2",
        imageUrl: null,
        category: "closing",
      },
    ],
  },
];

export function getVisualsForModule(moduleSlug: string): VisualPrompt[] {
  return ALL_MODULE_VISUALS.find((m) => m.moduleSlug === moduleSlug)?.prompts ?? [];
}

export function getVisualsForLesson(moduleSlug: string, lessonSlug: string): VisualPrompt[] {
  return getVisualsForModule(moduleSlug).filter((p) => p.lessonSlug === lessonSlug);
}

/** Stats de production globales */
export function getProductionStats() {
  const all = ALL_MODULE_VISUALS.flatMap((m) => m.prompts);
  return {
    total: all.length,
    generated: all.filter((p) => p.imageUrl !== null).length,
    pending: all.filter((p) => p.imageUrl === null).length,
  };
}
