/**
 * Nettoie le Markdown pour TTS (Text-to-Speech)
 * Supprime toutes les balises Markdown, ne garde que le texte lisible
 */

export function cleanMarkdownForTTS(text) {
  let t = text;
  
  // Supprime les liens [texte](url) → garde juste le texte
  t = t.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  
  // Supprime les images ![alt](url)
  t = t.replace(/!\[([^\]]*)\]\([^)]+\)/g, "$1");
  
  // Supprime le gras et italique ** * __ _
  t = t.replace(/\*\*([^*]+)\*\*/g, "$1");
  t = t.replace(/\*([^*]+)\*/g, "$1");
  t = t.replace(/__([^_]+)__/g, "$1");
  t = t.replace(/_([^_]+)_/g, "$1");
  
  // Supprime le code inline `texte`
  t = t.replace(/`([^`]+)`/g, "$1");
  
  // Supprime les blocs de code ```...```
  t = t.replace(/```[\s\S]*?```/g, " ");
  
  // Supprime les citations >
  t = t.replace(/^>\s?/gm, "");
  
  // Supprime les listes - * + au début de ligne
  t = t.replace(/^\s*[-*+]\s+/gm, "");
  
  // Supprime les numéros de liste 1. 2. etc
  t = t.replace(/^\s*\d+\.\s+/gm, "");
  
  // Supprime les séparateurs --- ***
  t = t.replace(/^\s*[-*]{3,}\s*$/gm, " ");
  
  // Supprime les headings # ## ### etc
  t = t.replace(/^#{1,6}\s+/gm, "");
  
  // Supprime les espaces multiples
  t = t.replace(/\s+/g, " ").trim();
  
  return t;
}

// Test
if (import.meta.main) {
  const test = `
## Titre
**Bonjour**, voici un [lien](url) et du *texte*.
> Une citation
\`code\`
- Item 1
- Item 2
`;
  console.log("AVANT:", test);
  console.log("APRÈS:", cleanMarkdownForTTS(test));
}
