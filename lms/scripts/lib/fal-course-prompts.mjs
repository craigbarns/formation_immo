/**
 * Prompts séparés : image (miniature / cover) et vidéo (bumper) par module.
 * Style cohérent formation immobilière FR, sans texte lisible à l’écran.
 */

export const FAL_MODULE_PROMPTS = {
  juridique: {
    title: "Module 1 — Juridique & conformité",
    imagePrompt:
      "Professional French real estate compliance scene, modern agency office in Paris, hands signing documents on wooden desk, stamp and pen, soft natural window light, navy and beige color palette, shallow depth of field, editorial photography, no readable text, no logos, 4k, photorealistic",
    videoPrompt:
      "Slow cinematic dolly-in toward hands signing papers on a desk, calm professional atmosphere, modern office blurred background, natural lighting, steady camera, film look, French real estate context, no subtitles, no readable text on documents",
  },
  transaction: {
    title: "Module 2 — Transaction & négociation",
    imagePrompt:
      "French real estate agent on city street with tablet, appraising classic bourgeois building facade, blue sky, professional dynamic mood, wide angle architecture, documentary style, muted colors, no text, no brand logos, 4k",
    videoPrompt:
      "Handheld walk toward elegant apartment building, subtle handshake at round table with open notebook, warm daylight, professional negotiation mood, gentle camera movement, cinematic, no on-screen text",
  },
  financement: {
    title: "Module 3 — Financement & fiscalité",
    imagePrompt:
      "Finance desk scene, calculator, eyeglasses, coffee cup, blurred spreadsheet on monitor, house keys and coins, morning light through blinds, serious trustworthy mood, macro details, no readable numbers, 4k photorealistic",
    videoPrompt:
      "Slow pan across desk with calculator and house keys, fingers typing on keyboard, soft bokeh chart in background, calm focused atmosphere, tripod with gentle pan, no legible UI, cinematic",
  },
  marketing: {
    title: "Module 4 — Marketing digital",
    imagePrompt:
      "Real estate photography setup in bright empty living room, DSLR on tripod, softbox light, wide angle interior, HDR natural light, architectural lines, professional creative workspace, no watermarks, no text, 4k",
    videoPrompt:
      "Smooth gimbal shot revealing renovated living room, photographer adjusts tripod, bright airy modern space, minimalist decor, cinematic color grade, no captions or overlays",
  },
  terrain: {
    title: "Module 5 — Visite, closing & fidélisation",
    imagePrompt:
      "Elegant French apartment entrance, real estate agent opens door for couple seen from behind, warm sunlight through tall windows, luxury realistic interior, wide welcoming shot, faces not in focus, no text, 4k",
    videoPrompt:
      "Follow shot couple entering bright apartment, agent leads the way, transition to soft bokeh balcony view, positive emotional pacing, steady gimbal, golden hour light, no dialogue text on screen, cinematic",
  },
};

export const MODULE_SLUGS = Object.keys(FAL_MODULE_PROMPTS);
