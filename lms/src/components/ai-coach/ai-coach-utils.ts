export function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const w = window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext };
  const AC = w.AudioContext || w.webkitAudioContext;
  return AC ? new AC() : null;
}

export function cleanForTTS(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1") // **gras** → gras
    .replace(/\*(.*?)\*/g, "$1") // *italique* → italique
    .replace(/\n\d+\.\s*/g, ". ") // "1. " "2. " → pause
    .replace(/\n-\s*/g, ". ") // "- " → pause
    .replace(/\n#/g, ". ") // titres markdown
    .replace(/\n\n/g, ". ") // paragraphes
    .replace(/\n/g, " ") // retours ligne simples
    .replace(/:\s*/g, ", ") // deux-points → virgule
    .replace(/;\s*/g, ", ") // point-virgule → virgule
    .replace(/\s+/g, " ") // espaces multiples
    .trim();
}

export function cleanForDisplay(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/_(.*?)_/g, "$1");
}
