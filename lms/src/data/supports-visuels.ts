/**
 * Fiches & infographies — chemins dans `public/formation-infographies/`
 */
export type SupportVisuelMeta = {
  id: string;
  title: string;
  summary: string;
  /** Thème pour filtre / badge */
  theme: "investissement" | "negociation" | "credit" | "juridique" | "fiscalite";
  moduleLabel: string;
  /** Lien vers une leçon pertinente */
  hrefLesson: string;
  imageFile: string;
};

export const SUPPORTS_VISUELS: SupportVisuelMeta[] = [
  {
    id: "checklist-investisseur",
    title: "Checklist investisseur",
    summary:
      "Avant, pendant et après la visite : critères, questions clés et erreurs à éviter pour décider sereinement.",
    theme: "investissement",
    moduleLabel: "Terrain & investissement",
    hrefLesson: "/formation/terrain/visite",
    imageFile: "checklist-investisseur.png",
  },
  {
    id: "matrice-risques",
    title: "Matrice des risques immobiliers",
    summary:
      "Impact × probabilité, stratégies de mitigation et due diligence avant achat.",
    theme: "investissement",
    moduleLabel: "Financement",
    hrefLesson: "/formation/financement/rentabilite",
    imageFile: "matrice-risques.png",
  },
  {
    id: "cadre-negociation",
    title: "Cadre de négociation (WIN-WIN)",
    summary:
      "Variables de la négociation, techniques clés et formulations à privilégier.",
    theme: "negociation",
    moduleLabel: "Transaction",
    hrefLesson: "/formation/transaction/negociation-avancee",
    imageFile: "cadre-negociation.png",
  },
  {
    id: "calcul-rentabilite",
    title: "Calcul de rentabilité immobilière",
    summary:
      "Formules brute et nette, exemple chiffré et repères selon le type de bien.",
    theme: "investissement",
    moduleLabel: "Financement",
    hrefLesson: "/formation/financement/rentabilite",
    imageFile: "calcul-rentabilite.png",
  },
  {
    id: "timeline-juridique",
    title: "Timeline juridique d'une acquisition",
    summary:
      "Jalons types, documents à constituer et rappel sur le délai de rétractation.",
    theme: "juridique",
    moduleLabel: "Juridique",
    hrefLesson: "/formation/juridique/compromis",
    imageFile: "timeline-juridique.png",
  },
  {
    id: "structure-financement",
    title: "Structure de financement optimale",
    summary:
      "Apport vs crédit, indicateurs bancaires et assurance emprunteur.",
    theme: "credit",
    moduleLabel: "Financement",
    hrefLesson: "/formation/financement/credit",
    imageFile: "structure-financement.png",
  },
  {
    id: "regimes-fiscaux",
    title: "Régimes fiscaux comparés",
    summary:
      "Micro-BIC, réel BIC et foncier : points de vigilance et critères de choix.",
    theme: "fiscalite",
    moduleLabel: "Financement",
    hrefLesson: "/formation/financement/fiscalite",
    imageFile: "regimes-fiscaux.png",
  },
];

export function supportImageUrl(file: string) {
  return `/formation-infographies/${file}`;
}
