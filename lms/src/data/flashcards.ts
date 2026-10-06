/**
 * Flashcards interactives — révision visuelle par module ET par leçon.
 *
 * Deux niveaux de granularité :
 *  - `ALL_FLASHCARDS`         : 6 decks "module complet" (rétrocompat)
 *  - `LESSON_FLASHCARDS`      : 40 decks leçon-par-leçon (révision ciblée)
 *
 * Chaque carte a une face question et une face réponse.
 */

export type Flashcard = {
  id: string;
  question: string;
  answer: string;
  /** Catégorie pour filtrage */
  category: string;
  /** Indice de difficulté 1-3 */
  difficulty: 1 | 2 | 3;
};

export type ModuleFlashcards = {
  moduleSlug: string;
  cards: Flashcard[];
};

export type LessonFlashcardDeck = {
  moduleSlug: string;
  lessonSlug: string;
  title: string;
  cards: Flashcard[];
};

// ─────────────────────────────────────────────────────────────────────────────
// LESSON DECKS — 40 decks (4-10 cartes chacun)
// ─────────────────────────────────────────────────────────────────────────────

export const LESSON_FLASHCARDS: LessonFlashcardDeck[] = [
  // ══════════════════════════════════════════════════════════════════════════
  // MODULE JURIDIQUE — 9 leçons
  // ══════════════════════════════════════════════════════════════════════════
  {
    moduleSlug: "juridique",
    lessonSlug: "loi-alur",
    title: "Loi ALUR",
    cards: [
      {
        id: "ju-alur-01",
        question: "Que signifie l'acronyme ALUR ?",
        answer:
          "Accès au Logement et un Urbanisme Rénové. Loi n°2014-366 du 24 mars 2014 portée par Cécile Duflot.",
        category: "Loi ALUR",
        difficulty: 1,
      },
      {
        id: "ju-alur-02",
        question: "Combien d'heures de formation continue ALUR impose-t-elle par an ?",
        answer:
          "14 heures par an ou 42 heures cumulées sur 3 ans, conditions du renouvellement de la carte T.",
        category: "Loi ALUR",
        difficulty: 2,
      },
      {
        id: "ju-alur-03",
        question: "Où les honoraires d'agence doivent-ils être affichés ?",
        answer:
          "Barème TTC en vitrine et sur le site de l'agence ; sur chaque annonce, la partie qui paie. Si c'est l'acquéreur : prix honoraires inclus, prix hors honoraires et taux TTC calculé sur le prix hors honoraires (arrêté du 10 janvier 2017).",
        category: "Loi ALUR",
        difficulty: 1,
      },
      {
        id: "ju-alur-04",
        question: "Quelle est la durée de validité de la carte T ?",
        answer:
          "3 ans renouvelables, sous condition d'avoir suivi 42h de formation continue.",
        category: "Loi ALUR",
        difficulty: 1,
      },
      {
        id: "ju-alur-05",
        question: "Que doit contenir une fiche d'information précontractuelle ALUR ?",
        answer:
          "Identité du mandataire, numéro RCP, prix affiché + honoraires détaillés, charges de copro, DPE, mode de commercialisation.",
        category: "Loi ALUR",
        difficulty: 2,
      },
      {
        id: "ju-alur-06",
        question: "Piège : un agent peut-il encaisser des fonds sans garantie financière ?",
        answer:
          "Non. Obligation de RCP ET de garantie financière (minimum 110 000€ depuis ALUR) si l'agent manie des fonds pour le compte de clients.",
        category: "Loi ALUR",
        difficulty: 3,
      },
      {
        id: "ju-alur-07",
        question: "Sanction en cas d'exercice sans carte T ?",
        answer:
          "Délit : 6 mois d'emprisonnement et 7 500 € d'amende (loi Hoguet, art. 14).",
        category: "Loi ALUR",
        difficulty: 3,
      },
      {
        id: "ju-alur-08",
        question: "Quel est l'objectif social principal de la loi ALUR ?",
        answer:
          "Améliorer l'accès au logement, encadrer les professionnels, lutter contre l'habitat indigne et réguler les rapports locatifs.",
        category: "Loi ALUR",
        difficulty: 2,
      },
      {
        id: "ju-alur-09",
        question: "Mandat : depuis ALUR, quelles mentions sont obligatoires ?",
        answer:
          "Numéro unique dans le registre des mandats, durée, honoraires, qui paye, conditions de résiliation, identité du titulaire de la carte T.",
        category: "Loi ALUR",
        difficulty: 2,
      },
      {
        id: "ju-alur-10",
        question: "Le registre des mandats est-il un simple cahier libre ?",
        answer:
          "Non : registre à numérotation continue, coté sans discontinuité et relié, ou tenu sous forme électronique sécurisée. Chaque mandat y est inscrit et son numéro reporté sur l'exemplaire remis au client.",
        category: "Loi ALUR",
        difficulty: 3,
      },
    ],
  },
  {
    moduleSlug: "juridique",
    lessonSlug: "compromis",
    title: "Compromis de vente",
    cards: [
      {
        id: "ju-comp-01",
        question: "Quel est le délai légal de rétractation après signature du compromis ?",
        answer:
          "10 jours calendaires pour l'acquéreur non professionnel (art. L271-1 CCH), sans justification ni pénalité.",
        category: "Compromis",
        difficulty: 1,
      },
      {
        id: "ju-comp-02",
        question: "À partir de quand court le délai de rétractation ?",
        answer:
          "Le lendemain de la première présentation de la notification (LRAR ou remise en main propre avec attestation).",
        category: "Compromis",
        difficulty: 2,
      },
      {
        id: "ju-comp-03",
        question: "Quelle est la différence entre compromis et promesse de vente ?",
        answer:
          "Compromis = engagement bilatéral ferme. Promesse unilatérale = seul le vendeur s'engage, l'acheteur lève une option (indemnité d'immobilisation ~10%).",
        category: "Compromis",
        difficulty: 2,
      },
      {
        id: "ju-comp-04",
        question: "Quelles conditions suspensives sont les plus courantes ?",
        answer:
          "Obtention du prêt (45-60 jours), absence de servitude, absence de préemption communale, situation urbanistique conforme.",
        category: "Compromis",
        difficulty: 1,
      },
      {
        id: "ju-comp-05",
        question: "Montant typique du dépôt de garantie ?",
        answer:
          "5 à 10% du prix de vente, séquestré chez le notaire ou l'agence. Non obligatoire mais quasi systématique.",
        category: "Compromis",
        difficulty: 2,
      },
      {
        id: "ju-comp-06",
        question: "Que se passe-t-il si la condition suspensive de prêt n'est pas levée ?",
        answer:
          "Le compromis est caduc et l'acquéreur récupère son dépôt, à condition d'avoir demandé un prêt conforme aux caractéristiques prévues au compromis (montant, durée, taux). S'il n'a rien demandé, la condition est réputée accomplie (art. 1304-3 C. civ.).",
        category: "Compromis",
        difficulty: 3,
      },
      {
        id: "ju-comp-07",
        question: "Piège : le vendeur peut-il se rétracter pendant les 10 jours ?",
        answer:
          "Non. Le délai de rétractation profite uniquement à l'acquéreur non professionnel. Le vendeur est engagé dès signature.",
        category: "Compromis",
        difficulty: 3,
      },
      {
        id: "ju-comp-08",
        question: "Quels documents annexer au compromis ?",
        answer:
          "Le dossier de diagnostic technique et, pour un lot de copropriété, les documents de l'article L.721-2 du CCH : règlement de copropriété, fiche synthétique, PV des 3 dernières AG, informations financières (charges, impayés, fonds de travaux), carnet d'entretien, plan pluriannuel de travaux s'il existe.",
        category: "Compromis",
        difficulty: 2,
      },
      {
        id: "ju-comp-09",
        question: "Délai moyen entre compromis et acte authentique ?",
        answer:
          "2 à 4 mois. Ce délai couvre rétractation, demande de prêt, purges urbanistiques et préparation notariale.",
        category: "Compromis",
        difficulty: 1,
      },
      {
        id: "ju-comp-10",
        question: "Clause pénale : que prévoit-elle en général ?",
        answer:
          "10% du prix de vente dus par la partie défaillante (hors conditions suspensives non réalisées). Incitation à tenir l'engagement.",
        category: "Compromis",
        difficulty: 2,
      },
    ],
  },
  {
    moduleSlug: "juridique",
    lessonSlug: "diagnostics",
    title: "Diagnostics obligatoires",
    cards: [
      {
        id: "ju-diag-01",
        question: "Durée de validité d'un DPE réalisé après juillet 2021 ?",
        answer: "10 ans.",
        category: "Diagnostics",
        difficulty: 1,
      },
      {
        id: "ju-diag-02",
        question: "Sur quels biens l'ERP est-il obligatoire ?",
        answer:
          "Pour presque tous les biens : zones couvertes par un plan de prévention des risques, zones de sismicité 2 à 5, potentiel radon de niveau 3, recul du trait de côte, secteurs d'information sur les sols… Il s'établit gratuitement sur Géorisques et doit dater de moins de 6 mois.",
        category: "Diagnostics",
        difficulty: 2,
      },
      {
        id: "ju-diag-03",
        question: "Quel diagnostic est obligatoire uniquement pour les biens construits avant 1949 ?",
        answer:
          "Le CREP (Constat de Risque d'Exposition au Plomb). Validité : 1 an si positif, illimitée si négatif.",
        category: "Diagnostics",
        difficulty: 2,
      },
      {
        id: "ju-diag-04",
        question: "Diagnostic amiante : quels biens concernés ?",
        answer:
          "Tout bien dont le permis de construire est antérieur au 1er juillet 1997. Validité illimitée si absence, 3 ans si présence.",
        category: "Diagnostics",
        difficulty: 2,
      },
      {
        id: "ju-diag-05",
        question: "Quand le diagnostic électricité/gaz est-il obligatoire ?",
        answer:
          "Pour les installations de plus de 15 ans, en vente comme en location. Validité : 3 ans (vente), 6 ans (location).",
        category: "Diagnostics",
        difficulty: 1,
      },
      {
        id: "ju-diag-06",
        question: "Quelle classe énergétique est visée par la loi Climat 2021 comme passoire ?",
        answer: "Les classes F et G (consommation > 330 kWh/m²/an).",
        category: "Diagnostics",
        difficulty: 1,
      },
      {
        id: "ju-diag-07",
        question: "Piège fréquent : peut-on louer un logement classé G après 2025 ?",
        answer:
          "Non. Depuis le 1er janvier 2025 les logements G sont interdits à la location. F interdits dès 2028, E dès 2034.",
        category: "Diagnostics",
        difficulty: 3,
      },
      {
        id: "ju-diag-08",
        question: "Qu'est-ce que l'audit énergétique réglementaire ?",
        answer:
          "Obligatoire à la vente d'une maison ou d'un immeuble en monopropriété classé F ou G depuis 2023, E depuis le 1er janvier 2025, D à partir de 2034. Il propose des scénarios de travaux chiffrés.",
        category: "Diagnostics",
        difficulty: 2,
      },
      {
        id: "ju-diag-09",
        question: "Qui paye les diagnostics : vendeur ou acquéreur ?",
        answer:
          "Le vendeur. Ils font partie du Dossier de Diagnostic Technique (DDT) annexé au compromis.",
        category: "Diagnostics",
        difficulty: 1,
      },
      {
        id: "ju-diag-10",
        question: "Qui peut réaliser les diagnostics immobiliers ?",
        answer:
          "Uniquement un diagnostiqueur certifié par un organisme accrédité COFRAC, indépendant du vendeur et de l'agent.",
        category: "Diagnostics",
        difficulty: 2,
      },
    ],
  },
  {
    moduleSlug: "juridique",
    lessonSlug: "mandats",
    title: "Mandats de vente",
    cards: [
      {
        id: "ju-mand-01",
        question: "Quels sont les 3 types de mandats immobiliers ?",
        answer:
          "Simple (plusieurs agences + PAP), semi-exclusif (plusieurs agences, pas de PAP) et exclusif (une seule agence).",
        category: "Mandats",
        difficulty: 1,
      },
      {
        id: "ju-mand-02",
        question: "Durée maximale légale d'un mandat ?",
        answer:
          "Pas de durée plafond légal mais usage 3 mois irrévocables puis reconduction tacite trimestrielle, dénoncée sous 15 jours par LRAR.",
        category: "Mandats",
        difficulty: 2,
      },
      {
        id: "ju-mand-03",
        question: "Taux de transformation moyen : mandat exclusif vs simple ?",
        answer:
          "Il n'existe pas de statistique officielle fiable. L'exclusivité permet un prix unique, une diffusion maîtrisée et un suivi des visites, ce qui accélère souvent la vente ; mesurez-le sur vos propres mandats.",
        category: "Mandats",
        difficulty: 2,
      },
      {
        id: "ju-mand-04",
        question: "Qu'est-ce qu'une clause pénale dans un mandat exclusif ?",
        answer:
          "Une indemnité, souvent égale au montant des honoraires, due si le vendeur vend sans l'agent pendant l'exclusivité, ou traite directement avec un acquéreur présenté par l'agence (pendant le mandat ou une période fixée après). Elle doit figurer en caractères très apparents (art. 78 du décret 72-678).",
        category: "Mandats",
        difficulty: 3,
      },
      {
        id: "ju-mand-05",
        question: "Le numéro de mandat dans le registre est-il obligatoire ?",
        answer:
          "Oui. Depuis la loi Hoguet + ALUR, numéro unique, continu, inscrit dans un registre coté-paraphé ou électronique sécurisé.",
        category: "Mandats",
        difficulty: 2,
      },
      {
        id: "ju-mand-06",
        question: "Piège : un agent peut-il signer un mandat sans carte T ?",
        answer:
          "Non. Le titulaire du mandat doit être la personne physique/morale détentrice de la carte T, avec RCP et garantie financière valides.",
        category: "Mandats",
        difficulty: 3,
      },
      {
        id: "ju-mand-07",
        question: "Quelle est la durée typique d'irrévocabilité d'un mandat exclusif ?",
        answer:
          "3 mois (consensus du marché). Au-delà, reconduction tacite avec possibilité de dénoncer sous 15 jours.",
        category: "Mandats",
        difficulty: 1,
      },
      {
        id: "ju-mand-08",
        question: "Dans quels cas un mandat est-il nul de plein droit ?",
        answer:
          "Absence du numéro de registre, absence de durée, absence des honoraires, absence de signature, ou carte T expirée.",
        category: "Mandats",
        difficulty: 3,
      },
      {
        id: "ju-mand-09",
        question: "Qui peut signer un mandat pour un bien indivis ?",
        answer:
          "Tous les indivisaires, ou un mandataire désigné par eux. À défaut, les titulaires d'au moins deux tiers des droits peuvent demander au tribunal l'autorisation de vendre (art. 815-5-1 C. civ.), ou un partage judiciaire est engagé.",
        category: "Mandats",
        difficulty: 2,
      },
      {
        id: "ju-mand-10",
        question: "Mandat exclusif : obligation de moyens ou de résultat ?",
        answer:
          "Obligation de moyens renforcée : diffusion multi-portails, reporting mensuel, visites qualifiées. Mais pas de garantie de vente.",
        category: "Mandats",
        difficulty: 2,
      },
    ],
  },
  {
    moduleSlug: "juridique",
    lessonSlug: "copropriete",
    title: "Copropriété",
    cards: [
      {
        id: "ju-copr-01",
        question: "Qu'est-ce que la loi Carrez ?",
        answer:
          "Loi du 18 décembre 1996 imposant la mention de la superficie privative dans tout acte de vente en copropriété. Tolérance : 5%.",
        category: "Copropriété",
        difficulty: 1,
      },
      {
        id: "ju-copr-02",
        question: "Quelles surfaces sont exclues du métrage Carrez ?",
        answer:
          "Murs, cloisons, marches et cages d'escalier, gaines, embrasures, et toute pièce de hauteur sous plafond < 1,80 m.",
        category: "Copropriété",
        difficulty: 2,
      },
      {
        id: "ju-copr-03",
        question: "Sanction si l'écart Carrez dépasse 5% ?",
        answer:
          "L'acheteur peut demander une diminution du prix proportionnelle à l'écart, dans un délai d'un an à compter de l'acte authentique.",
        category: "Copropriété",
        difficulty: 2,
      },
      {
        id: "ju-copr-04",
        question: "Qu'est-ce qu'un état daté ?",
        answer:
          "Document du syndic listant les dettes du copropriétaire vendeur, les travaux votés, le fonds de roulement. Obligatoire à la vente.",
        category: "Copropriété",
        difficulty: 2,
      },
      {
        id: "ju-copr-05",
        question: "Depuis la loi ALUR, quelle est l'obligation du fonds travaux ?",
        answer:
          "Une cotisation annuelle au moins égale à 5 % du budget prévisionnel (et à 2,5 % des travaux du plan pluriannuel s'il existe). Elle est attachée au lot : le vendeur ne la récupère pas à la vente.",
        category: "Copropriété",
        difficulty: 3,
      },
      {
        id: "ju-copr-06",
        question: "Combien de PV d'AG doivent être remis à l'acquéreur ?",
        answer:
          "Les 3 derniers procès-verbaux d'assemblée générale, annexés au compromis.",
        category: "Copropriété",
        difficulty: 1,
      },
      {
        id: "ju-copr-07",
        question: "Le carnet d'entretien de l'immeuble est-il obligatoire ?",
        answer:
          "Oui. Tenu par le syndic depuis la loi SRU 2000, remis à l'acquéreur sur demande. Liste travaux, contrats et diagnostics communs.",
        category: "Copropriété",
        difficulty: 2,
      },
      {
        id: "ju-copr-08",
        question: "Piège : l'acquéreur hérite-t-il des dettes de charges du vendeur ?",
        answer:
          "Non : les sommes exigibles avant la vente restent dues par le vendeur, et le syndic peut se payer sur le prix grâce à son opposition. Un prorata des provisions du trimestre en cours peut être convenu entre les parties dans l'acte.",
        category: "Copropriété",
        difficulty: 3,
      },
      {
        id: "ju-copr-09",
        question: "Qu'est-ce que le DTG ?",
        answer:
          "Diagnostic Technique Global : état du bâti et des équipements communs, avec une évaluation des travaux. Il est obligatoire dans certains cas (mise en copropriété d'un immeuble de plus de 10 ans, procédure d'insalubrité) ; sinon l'AG décide de le faire. À ne pas confondre avec le plan pluriannuel de travaux, obligatoire pour les copropriétés de plus de 15 ans.",
        category: "Copropriété",
        difficulty: 2,
      },
      {
        id: "ju-copr-10",
        question: "Règle des majorités : travaux d'amélioration = quelle majorité ?",
        answer:
          "Majorité absolue (art. 25 loi 1965) : plus de 50% des voix de tous les copropriétaires présents, représentés ou absents.",
        category: "Copropriété",
        difficulty: 3,
      },
    ],
  },
  {
    moduleSlug: "juridique",
    lessonSlug: "parcours-interactif",
    title: "Parcours interactif juridique",
    cards: [
      {
        id: "ju-parc-01",
        question: "Mise en situation : un client veut signer sans rétractation. Que faites-vous ?",
        answer:
          "Vous l'informez que le délai de 10 jours est d'ordre public (art. L271-1 CCH). Aucune renonciation anticipée n'est valable.",
        category: "Cas pratique",
        difficulty: 2,
      },
      {
        id: "ju-parc-02",
        question: "Le vendeur vous dit « Pas besoin de DPE, je vends à un pro ». Vrai ou faux ?",
        answer:
          "Faux. Le DPE est obligatoire pour la vente d'un logement, y compris à un professionnel. Les exceptions sont rares : terrain nu, constructions provisoires, certains bâtiments non chauffés ou indépendants de petite surface.",
        category: "Cas pratique",
        difficulty: 2,
      },
      {
        id: "ju-parc-03",
        question: "Un acquéreur demande à visiter seul. Pouvez-vous lui prêter les clés ?",
        answer:
          "Non. Responsabilité professionnelle : vous devez accompagner chaque visite ou mandater un collaborateur identifié.",
        category: "Cas pratique",
        difficulty: 1,
      },
      {
        id: "ju-parc-04",
        question: "Le vendeur découvre un vice caché après signature. Quel délai pour agir ?",
        answer:
          "L'acheteur dispose de 2 ans à compter de la découverte du vice (art. 1648 Code civil) pour engager une action.",
        category: "Cas pratique",
        difficulty: 3,
      },
      {
        id: "ju-parc-05",
        question: "Votre client refuse la clause Tracfin. Comment réagissez-vous ?",
        answer:
          "L'identification LCB-FT est une obligation légale non négociable. Sans justificatifs d'identité et origine des fonds, la transaction est bloquée.",
        category: "Cas pratique",
        difficulty: 2,
      },
      {
        id: "ju-parc-06",
        question: "Un héritier veut vendre sans l'accord des autres. Possible ?",
        answer:
          "Non : en indivision, la vente requiert l'unanimité. À défaut, il faut un partage judiciaire ou une autorisation du tribunal.",
        category: "Cas pratique",
        difficulty: 3,
      },
      {
        id: "ju-parc-07",
        question: "Piège : l'agent peut-il refuser de diffuser certains types d'acquéreurs ?",
        answer:
          "Non. Toute discrimination (origine, religion, handicap, orientation) est un délit (art. 225-1 Code pénal).",
        category: "Cas pratique",
        difficulty: 3,
      },
      {
        id: "ju-parc-08",
        question: "Mandat oublié au registre : conséquence ?",
        answer:
          "Mandat nul, honoraires irrécupérables. Risque de sanction disciplinaire (suspension de la carte T).",
        category: "Cas pratique",
        difficulty: 2,
      },
    ],
  },
  {
    moduleSlug: "juridique",
    lessonSlug: "tracfin",
    title: "Tracfin & LCB-FT",
    cards: [
      {
        id: "ju-trac-01",
        question: "Que signifie Tracfin ?",
        answer:
          "Traitement du Renseignement et Action contre les Circuits FINanciers clandestins. Service du Ministère de l'Économie.",
        category: "Tracfin",
        difficulty: 1,
      },
      {
        id: "ju-trac-02",
        question: "Les agents immobiliers sont-ils soumis à Tracfin ?",
        answer:
          "Oui. Les intermédiaires en transaction immobilière figurent parmi les professions assujetties (art. L.561-2, 8° CMF) : identification du client et du bénéficiaire effectif, vigilance, déclaration de soupçon.",
        category: "Tracfin",
        difficulty: 1,
      },
      {
        id: "ju-trac-03",
        question: "Seuil de déclenchement des obligations de vigilance renforcée ?",
        answer:
          "Il n'y a pas de seuil unique mais tout client classé « à risque élevé » (PPE, pays tiers, espèces, structure opaque).",
        category: "Tracfin",
        difficulty: 2,
      },
      {
        id: "ju-trac-04",
        question: "Qu'est-ce qu'une PPE ?",
        answer:
          "Personne Politiquement Exposée : exerce ou a exercé une fonction publique importante, elle-même ou via son entourage.",
        category: "Tracfin",
        difficulty: 2,
      },
      {
        id: "ju-trac-05",
        question: "Combien de temps conserver les dossiers LCB-FT ?",
        answer: "5 ans après la fin de la relation d'affaires.",
        category: "Tracfin",
        difficulty: 2,
      },
      {
        id: "ju-trac-06",
        question: "Comment se fait une déclaration de soupçon ?",
        answer:
          "Via la plateforme ERMES de Tracfin (en ligne). Confidentielle, non opposable au client, protégée par le secret professionnel.",
        category: "Tracfin",
        difficulty: 3,
      },
      {
        id: "ju-trac-07",
        question: "Sanction en cas de défaut de vigilance Tracfin ?",
        answer:
          "Sanctions de la Commission nationale des sanctions : avertissement, blâme, interdiction temporaire d'exercer, retrait de la carte, et sanction pécuniaire jusqu'à 5 M€.",
        category: "Tracfin",
        difficulty: 3,
      },
      {
        id: "ju-trac-08",
        question: "Piège : peut-on prévenir le client qu'une déclaration de soupçon a été faite ?",
        answer:
          "Non, interdit formellement. Le « tipping off » est un délit (art. L574-1 CMF).",
        category: "Tracfin",
        difficulty: 3,
      },
      {
        id: "ju-trac-09",
        question: "Documents types d'identification d'une personne physique ?",
        answer:
          "Pièce d'identité en cours de validité, justificatif de domicile < 3 mois, justificatif d'origine des fonds.",
        category: "Tracfin",
        difficulty: 1,
      },
      {
        id: "ju-trac-10",
        question: "Pour une personne morale, que vérifier en plus ?",
        answer:
          "Extrait Kbis <3 mois, statuts à jour, identité du bénéficiaire effectif (>25% du capital ou droits de vote).",
        category: "Tracfin",
        difficulty: 2,
      },
    ],
  },
  {
    moduleSlug: "juridique",
    lessonSlug: "non-discrimination",
    title: "Non-discrimination",
    cards: [
      {
        id: "ju-disc-01",
        question: "Combien de critères de discrimination sont aujourd'hui sanctionnés par la loi ?",
        answer:
          "Plus de vingt critères (art. 225-1 du Code pénal), dont l'origine, le sexe, la situation de famille, l'orientation sexuelle, le handicap, la religion, la particulière vulnérabilité résultant de la situation économique et la perte d'autonomie.",
        category: "Non-discrimination",
        difficulty: 2,
      },
      {
        id: "ju-disc-02",
        question: "Peine maximale en cas de discrimination locative ?",
        answer:
          "3 ans d'emprisonnement et 45 000€ d'amende pour une personne physique (art. 225-2 Code pénal).",
        category: "Non-discrimination",
        difficulty: 2,
      },
      {
        id: "ju-disc-03",
        question: "Qu'est-ce qu'un testing ?",
        answer:
          "Contrôle par candidatures fictives comparables, qui ne diffèrent que sur un critère. Admis comme preuve par la Cour de cassation (2002), puis consacré par la loi du 31 mars 2006 (art. 225-3-1 du Code pénal). Associations et pouvoirs publics en organisent régulièrement.",
        category: "Non-discrimination",
        difficulty: 3,
      },
      {
        id: "ju-disc-04",
        question: "Quelles pièces l'agent peut-il légalement demander à un candidat locataire ?",
        answer:
          "Liste limitative du décret de novembre 2015 : pièce d'identité, 3 dernières fiches de paie, avis d'imposition, justificatifs de domicile.",
        category: "Non-discrimination",
        difficulty: 2,
      },
      {
        id: "ju-disc-05",
        question: "Peut-on demander une copie de carte Vitale ou un RIB ?",
        answer:
          "La carte Vitale et les relevés de compte bancaire, non : ils figurent dans la liste des pièces interdites (art. 22-2 de la loi de 1989, décret 2015-1437). Sanction : amende administrative jusqu'à 3 000 € (personne physique) ou 15 000 € (personne morale).",
        category: "Non-discrimination",
        difficulty: 3,
      },
      {
        id: "ju-disc-06",
        question: "Piège : refuser un locataire sans garant est-il discriminatoire ?",
        answer:
          "Exiger un garant n'est pas discriminatoire en soi. Mais un bailleur qui a souscrit une assurance loyers impayés ne peut pas cumuler avec un cautionnement (sauf locataire étudiant ou apprenti, art. 22-1 de la loi de 1989). Et la garantie Visale vaut un garant : la refuser par principe prive de bons dossiers.",
        category: "Non-discrimination",
        difficulty: 3,
      },
      {
        id: "ju-disc-07",
        question: "Comment formuler une annonce non-discriminatoire ?",
        answer:
          "Décrire le bien, pas le profil idéal du locataire. Jamais « préférence couple sans enfants » ou « jeune actif CDI ».",
        category: "Non-discrimination",
        difficulty: 1,
      },
      {
        id: "ju-disc-08",
        question: "Quelles autorités peuvent-elles saisir en cas de discrimination ?",
        answer:
          "Le Défenseur des droits (saisine gratuite), le procureur de la République (plainte pénale), ou le juge civil pour obtenir réparation. Des associations peuvent accompagner la victime.",
        category: "Non-discrimination",
        difficulty: 2,
      },
      {
        id: "ju-disc-09",
        question: "Le bailleur peut-il refuser un animal de compagnie ?",
        answer:
          "Dans un bail d'habitation, la clause interdisant tout animal familier est réputée non écrite (loi du 9 juillet 1970, art. 10), sauf pour les chiens d'attaque de 1re catégorie. Le locataire reste responsable des dégâts et des nuisances.",
        category: "Non-discrimination",
        difficulty: 2,
      },
    ],
  },
  {
    moduleSlug: "juridique",
    lessonSlug: "baux-habitation",
    title: "Baux d'habitation",
    cards: [
      {
        id: "ju-baux-01",
        question: "Durée minimale d'un bail nu (résidence principale) ?",
        answer:
          "3 ans si le bailleur est personne physique, 6 ans si personne morale. Reconduction tacite à l'identique.",
        category: "Baux",
        difficulty: 1,
      },
      {
        id: "ju-baux-02",
        question: "Durée minimale d'un bail meublé ?",
        answer:
          "1 an (ou 9 mois pour un étudiant, sans reconduction tacite).",
        category: "Baux",
        difficulty: 1,
      },
      {
        id: "ju-baux-03",
        question: "Délai de préavis locataire en bail nu ?",
        answer:
          "3 mois, réduit à 1 mois en zone tendue ou sur motif légitime (mutation, perte d'emploi, RSA, santé).",
        category: "Baux",
        difficulty: 1,
      },
      {
        id: "ju-baux-04",
        question: "Quelles sont les 3 seules raisons valides pour donner congé au locataire ?",
        answer:
          "Reprise pour habiter (soi/proches), vente du logement, motif légitime et sérieux (impayés, troubles, défaut d'entretien).",
        category: "Baux",
        difficulty: 2,
      },
      {
        id: "ju-baux-05",
        question: "Plafond du dépôt de garantie en location nue ?",
        answer:
          "1 mois de loyer hors charges (art. 22 loi de 1989). 2 mois maximum en meublé.",
        category: "Baux",
        difficulty: 1,
      },
      {
        id: "ju-baux-06",
        question: "Quelle durée pour restituer le dépôt de garantie ?",
        answer:
          "1 mois si état des lieux de sortie conforme, 2 mois sinon. Au-delà : majoration de 10% du loyer mensuel par mois de retard.",
        category: "Baux",
        difficulty: 2,
      },
      {
        id: "ju-baux-07",
        question: "Piège : une clause interdisant les animaux est-elle valable ?",
        answer:
          "Non, nulle de plein droit (art. 10 loi du 9 juillet 1970), sauf pour les chiens de catégorie 1.",
        category: "Baux",
        difficulty: 3,
      },
      {
        id: "ju-baux-08",
        question: "Qu'est-ce que l'encadrement des loyers ?",
        answer:
          "Dans certains territoires (Paris, Lille, Lyon, Bordeaux, Montpellier…), le loyer ne peut pas dépasser le loyer de référence majoré (+20 %), sauf complément de loyer justifié ; si le loyer est inférieur au loyer de référence minoré (-30 %), le bailleur peut demander une réévaluation au renouvellement du bail.",
        category: "Baux",
        difficulty: 2,
      },
      {
        id: "ju-baux-09",
        question: "Révision annuelle du loyer : sur quel indice ?",
        answer:
          "L'IRL (Indice de référence des loyers) publié chaque trimestre par l'INSEE. La clause de révision est facultative : sans elle, le loyer ne peut pas être révisé. Depuis août 2022, le loyer des logements F et G ne peut plus augmenter.",
        category: "Baux",
        difficulty: 2,
      },
      {
        id: "ju-baux-10",
        question: "Le locataire peut-il sous-louer sans autorisation ?",
        answer:
          "Non. Autorisation écrite du bailleur obligatoire, et le loyer de sous-location ne doit pas excéder celui du bail principal.",
        category: "Baux",
        difficulty: 3,
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // MODULE TRANSACTION — 7 leçons
  // ══════════════════════════════════════════════════════════════════════════
  {
    moduleSlug: "transaction",
    lessonSlug: "estimation",
    title: "Estimation d'un bien",
    cards: [
      {
        id: "tr-esti-01",
        question: "Quelles sont les 3 méthodes d'estimation immobilière ?",
        answer:
          "Comparaison (prix/m² du secteur), capitalisation (rendement locatif), hédoniste (pondération de critères).",
        category: "Estimation",
        difficulty: 1,
      },
      {
        id: "tr-esti-02",
        question: "Combien de comparables minimum pour une estimation solide ?",
        answer:
          "Plusieurs ventes récentes et vraiment comparables (même secteur, surface proche, étage, état, DPE), complétées par les biens en vente concurrents. La base DVF a quelques mois de décalage : vos propres ventes récentes la complètent utilement.",
        category: "Estimation",
        difficulty: 2,
      },
      {
        id: "tr-esti-03",
        question: "Quelle est la base de données officielle des ventes en France ?",
        answer:
          "DVF (Demandes de Valeurs Foncières) publiée par la DGFiP sur data.gouv.fr, mise à jour semestrielle.",
        category: "Estimation",
        difficulty: 2,
      },
      {
        id: "tr-esti-04",
        question: "Fourchette haute/basse typique d'une estimation pro ?",
        answer: "±5 à 8% autour du prix médian. Au-delà, l'avis est peu crédible.",
        category: "Estimation",
        difficulty: 2,
      },
      {
        id: "tr-esti-05",
        question: "Piège : un vendeur surestime de 15%. Que lui dire ?",
        answer:
          "« À ce prix, le bien risque de rester longtemps en vitrine : les acquéreurs comparent, et un bien qui stagne finit souvent par se vendre moins cher qu'au juste prix. » Appuyez-vous sur des ventes comparables, chiffres DVF à l'appui.",
        category: "Estimation",
        difficulty: 3,
      },
      {
        id: "tr-esti-06",
        question: "Impact d'un DPE F/G sur la valeur d'un bien en 2026 ?",
        answer:
          "Les études notariales sur la « valeur verte » montrent une décote des logements F et G par rapport aux D, variable selon les régions (souvent de quelques pourcents à plus de 15 %). S'y ajoute le coût des travaux à prévoir, surtout pour louer.",
        category: "Estimation",
        difficulty: 2,
      },
      {
        id: "tr-esti-07",
        question: "Méthode hédoniste : quels critères pondérer ?",
        answer:
          "Étage, exposition, vue, état (neuf/rénové/à rafraîchir), annexes (parking, cave, balcon), environnement sonore et commodités.",
        category: "Estimation",
        difficulty: 3,
      },
      {
        id: "tr-esti-08",
        question: "Valeur vénale vs valeur d'usage ?",
        answer:
          "Vénale = prix de marché en libre négociation, entre un vendeur et un acquéreur informés. Usage = utilité du bien pour un occupant précis. L'écart peut être important pour les biens atypiques ou professionnels.",
        category: "Estimation",
        difficulty: 3,
      },
      {
        id: "tr-esti-09",
        question: "Délai moyen de vente en France en 2026 ?",
        answer:
          "Il varie fortement selon le marché local, le prix et l'état du bien : de quelques semaines en zone tendue à plusieurs mois ailleurs. Suivez votre propre délai moyen, c'est un argument précieux face aux vendeurs.",
        category: "Estimation",
        difficulty: 1,
      },
      {
        id: "tr-esti-10",
        question: "Avis de valeur vs expertise : différence juridique ?",
        answer:
          "Avis de valeur = agent, gratuit, non opposable. Expertise = expert agréé, facturée, opposable (succession, divorce, fiscalité).",
        category: "Estimation",
        difficulty: 3,
      },
    ],
  },
  {
    moduleSlug: "transaction",
    lessonSlug: "prospection",
    title: "Prospection",
    cards: [
      {
        id: "tr-pros-01",
        question: "Quels sont les 5 canaux de prospection principaux ?",
        answer:
          "Pige PAP (par courrier ou en personne), farming quartier, réseau personnel, partenaires (notaires/banques), digital (SEO, réseaux sociaux, estimation en ligne).",
        category: "Prospection",
        difficulty: 1,
      },
      {
        id: "tr-pros-02",
        question: "Qu'est-ce que le farming immobilier ?",
        answer:
          "Fidélisation d'un quartier cible (200 à 500 logements) via présence régulière : boîtage, porte-à-porte, événements, vitrines.",
        category: "Prospection",
        difficulty: 2,
      },
      {
        id: "tr-pros-03",
        question: "Peut-on appeler un vendeur PAP repéré sur Leboncoin ?",
        answer:
          "Non, sauf consentement préalable : depuis le 11 août 2026, démarcher un particulier par téléphone sans son accord est interdit (art. L.223-1 C. conso.). Courrier, visite ou estimation en ligne avec case de consentement.",
        category: "Prospection",
        difficulty: 2,
      },
      {
        id: "tr-pros-04",
        question: "Quelle est la « règle des 3 P » en prospection ?",
        answer:
          "Persévérance (rappels espacés), Personnalisation (message adapté au bien), Posture (conseil expert, pas vente).",
        category: "Prospection",
        difficulty: 2,
      },
      {
        id: "tr-pros-05",
        question: "Quand peut-on appeler un particulier qui a consenti ?",
        answer:
          "En semaine hors jours fériés, de 10h à 13h et de 14h à 20h, 4 tentatives maximum par 30 jours. Consentement valable 1 an au plus, preuve gardée 3 ans.",
        category: "Prospection",
        difficulty: 1,
      },
      {
        id: "tr-pros-06",
        question: "Combien de contacts moyens pour qu'un prospect signe un mandat ?",
        answer:
          "7 contacts environ, selon une règle empirique du marketing. Mix de canaux : courriers, boîtage, rencontres, événements, réseaux sociaux — et appels seulement avec l'accord de la personne.",
        category: "Prospection",
        difficulty: 3,
      },
      {
        id: "tr-pros-07",
        question: "Piège : un vendeur PAP refuse toute agence. Approche ?",
        answer:
          "Reconnaître sa liberté, proposer un diagnostic gratuit du prix/de la diffusion. Objectif : gagner la confiance en 60 jours.",
        category: "Prospection",
        difficulty: 3,
      },
      {
        id: "tr-pros-08",
        question: "Comment qualifier rapidement un lead entrant ?",
        answer:
          "Méthode BANT : Budget, Authority (décisionnaire), Need (motivation), Timing (délai). 4 questions en 2 minutes.",
        category: "Prospection",
        difficulty: 2,
      },
      {
        id: "tr-pros-09",
        question: "Nombre de mandats cibles par mois pour un négociateur ?",
        answer:
          "Objectif sain : 3 à 5 mandats/mois, dont 2 exclusifs minimum. Moins = réseau à reconstruire.",
        category: "Prospection",
        difficulty: 2,
      },
    ],
  },
  {
    moduleSlug: "transaction",
    lessonSlug: "negociation-mandat",
    title: "Négociation du mandat",
    cards: [
      {
        id: "tr-nemd-01",
        question: "Quelle est l'objection n°1 à l'exclusivité ?",
        answer:
          "« Plusieurs agences = plus de chances. » Réponse : un prix unique, une diffusion coordonnée et un suivi des visites valent mieux qu'un bien affiché partout à des prix différents. Appuyez-vous sur vos propres résultats, pas sur des statistiques invérifiables.",
        category: "Négociation mandat",
        difficulty: 1,
      },
      {
        id: "tr-nemd-02",
        question: "Que proposer pour sécuriser un exclusif ?",
        answer:
          "Clause de restitution du mandat si aucune visite sous 30 j, rapport hebdo, stratégie marketing chiffrée (photos pro, portails premium).",
        category: "Négociation mandat",
        difficulty: 2,
      },
      {
        id: "tr-nemd-03",
        question: "Taux d'honoraires moyen en France (2026) ?",
        answer:
          "Les honoraires sont libres. En pratique, ils sont souvent de l'ordre de 4 à 6 % TTC pour les biens les moins chers, avec un barème dégressif au-delà. Le barème affiché ne peut pas être dépassé.",
        category: "Négociation mandat",
        difficulty: 1,
      },
      {
        id: "tr-nemd-04",
        question: "Argument fort face au mandat simple ?",
        answer:
          "Les visites désordonnées, les écarts de prix entre agences et l'image d'un bien « vu partout » qui affaiblit la négociation. Racontez des cas que vous avez vécus, sans chiffres invérifiables.",
        category: "Négociation mandat",
        difficulty: 2,
      },
      {
        id: "tr-nemd-05",
        question: "Technique SONCAS : à quoi sert-elle ?",
        answer:
          "Identifier les motivations : Sécurité, Orgueil, Nouveauté, Confort, Argent, Sympathie. Adapter l'argumentation en 2-3 minutes.",
        category: "Négociation mandat",
        difficulty: 2,
      },
      {
        id: "tr-nemd-06",
        question: "Piège : accepter un mandat surestimé pour « rentrer l'affaire » ?",
        answer:
          "Mauvaise pratique. Le bien stagnera, vous perdrez 3 mois et votre crédibilité. Mieux : refuser ou signer avec baisse programmée.",
        category: "Négociation mandat",
        difficulty: 3,
      },
      {
        id: "tr-nemd-07",
        question: "Quel document remettre systématiquement en entretien d'estimation ?",
        answer:
          "Un avis de valeur écrit et argumenté (ventes comparables), un plan de commercialisation et des exemples d'annonces professionnelles. Ils rendent votre engagement concret au moment de la décision.",
        category: "Négociation mandat",
        difficulty: 2,
      },
      {
        id: "tr-nemd-08",
        question: "Combien de temps dure un rendez-vous d'estimation efficace ?",
        answer:
          "45 à 75 minutes. <30 min = superficiel, >90 min = le client décroche. Sortir avec engagement (mandat ou 2e RDV).",
        category: "Négociation mandat",
        difficulty: 2,
      },
    ],
  },
  {
    moduleSlug: "transaction",
    lessonSlug: "negociation-avancee",
    title: "Négociation avancée",
    cards: [
      {
        id: "tr-neav-01",
        question: "Technique SPIN : à quoi correspond chaque lettre ?",
        answer:
          "S = Situation, P = Problème, I = Implication, N = Need-payoff (bénéfice de la solution).",
        category: "Négociation avancée",
        difficulty: 1,
      },
      {
        id: "tr-neav-02",
        question: "Qu'est-ce que l'ancrage en négociation ?",
        answer:
          "Premier chiffre annoncé qui devient référence mentale. Ex : annoncer 500k€ plutôt que 480k€ pour ouvrir un cadre plus haut.",
        category: "Négociation avancée",
        difficulty: 2,
      },
      {
        id: "tr-neav-03",
        question: "Stratégie gagnant-gagnant vs gagnant-perdant ?",
        answer:
          "G-G : on cherche un accord qui sert les intérêts des deux parties, pour une relation durable. G-P : une partie gagne au détriment de l'autre. En immobilier, l'agent cherche un accord que vendeur et acquéreur pourront signer sereinement.",
        category: "Négociation avancée",
        difficulty: 2,
      },
      {
        id: "tr-neav-04",
        question: "Principe de la BATNA ?",
        answer:
          "Best Alternative To a Negotiated Agreement : meilleure option hors négociation. Celui qui a la meilleure BATNA négocie le moins.",
        category: "Négociation avancée",
        difficulty: 3,
      },
      {
        id: "tr-neav-05",
        question: "Comment traiter l'objection « C'est trop cher » ?",
        answer:
          "1) Accuser réception, 2) Questionner (par rapport à quoi ?), 3) Recadrer sur la valeur, 4) Proposer un plan d'action.",
        category: "Négociation avancée",
        difficulty: 1,
      },
      {
        id: "tr-neav-06",
        question: "Piège : céder sur un point sans contrepartie ?",
        answer:
          "Toujours demander contrepartie (délai, dépôt, conditions). Une concession gratuite signale faiblesse et ouvre d'autres demandes.",
        category: "Négociation avancée",
        difficulty: 3,
      },
      {
        id: "tr-neav-07",
        question: "Quelle est la règle du silence en négociation ?",
        answer:
          "Après avoir énoncé votre position ferme, se taire 3-5 secondes. Pression psychologique, l'autre partie meuble, souvent en concédant.",
        category: "Négociation avancée",
        difficulty: 2,
      },
      {
        id: "tr-neav-08",
        question: "Combien de fois faut-il formuler le prix sur une visite ?",
        answer:
          "Minimum 3 fois avec un renforcement différent : prix m², comparables, valeur future. Ancrer sans martyriser.",
        category: "Négociation avancée",
        difficulty: 2,
      },
      {
        id: "tr-neav-09",
        question: "Comment gérer une offre très basse (-15% du prix affiché) ?",
        answer:
          "Jamais insulter l'acquéreur. Remercier, demander justification chiffrée (DPE ? travaux ? comparables). Contre-offre réaliste.",
        category: "Négociation avancée",
        difficulty: 3,
      },
      {
        id: "tr-neav-10",
        question: "Règle d'or : quand quitter la table de négociation ?",
        answer:
          "Quand la BATNA est meilleure que l'offre, ou quand la confiance est rompue. Mieux un no-deal qu'un bad-deal.",
        category: "Négociation avancée",
        difficulty: 2,
      },
    ],
  },
  {
    moduleSlug: "transaction",
    lessonSlug: "crm",
    title: "CRM & pipeline",
    cards: [
      {
        id: "tr-crm-01",
        question: "Que signifie CRM ?",
        answer:
          "Customer Relationship Management : logiciel de gestion de la relation client et du pipeline commercial.",
        category: "CRM",
        difficulty: 1,
      },
      {
        id: "tr-crm-02",
        question: "Quels KPIs suivre dans un CRM immobilier ?",
        answer:
          "Taux transformation mandats, visites/semaine, délai moyen de vente, taux satisfaction, CA par agent, pipeline mandats actifs.",
        category: "CRM",
        difficulty: 2,
      },
      {
        id: "tr-crm-03",
        question: "Règle des 72h après visite ?",
        answer:
          "Recontacter le visiteur rapidement, idéalement le lendemain, avec une information utile. Plus on attend, plus l'émotion de la visite retombe et d'autres biens prennent sa place.",
        category: "CRM",
        difficulty: 1,
      },
      {
        id: "tr-crm-04",
        question: "Quelles étapes du pipeline immobilier ?",
        answer:
          "Lead → Contact qualifié → RDV estimation → Mandat → Visite → Offre → Compromis → Acte.",
        category: "CRM",
        difficulty: 1,
      },
      {
        id: "tr-crm-05",
        question: "CRM immobiliers leaders en France (2026) ?",
        answer:
          "De nombreux logiciels métier existent (Netty, Hektor, Apimo…). Critères de choix : diffusion vers les portails, signature électronique, gestion des consentements RGPD, registre des mandats.",
        category: "CRM",
        difficulty: 2,
      },
      {
        id: "tr-crm-06",
        question: "Taux moyen de fiches clients non retouchées après 6 mois ?",
        answer:
          "Une fiche non mise à jour fausse le pipeline. Instaurez un nettoyage régulier : mise à jour des statuts, suppression des prospects inactifs depuis plus de 3 ans (recommandation CNIL).",
        category: "CRM",
        difficulty: 3,
      },
      {
        id: "tr-crm-07",
        question: "Piège : ne pas rappeler un prospect « pas prêt » ?",
        answer:
          "Un prospect « pas prêt » aujourd'hui peut l'être dans quelques mois — mais avec un autre agent si vous disparaissez. Gardez un contact espacé et utile (dans le respect de ses consentements).",
        category: "CRM",
        difficulty: 3,
      },
      {
        id: "tr-crm-08",
        question: "Quel workflow d'automation mettre en place post-visite ?",
        answer:
          "J0 mail remerciement, J+1 appel à chaud, J+7 relance mail, J+30 newsletter, J+90 appel « où en êtes-vous ? ».",
        category: "CRM",
        difficulty: 2,
      },
      {
        id: "tr-crm-09",
        question: "RGPD : quelle durée de conservation d'un lead inactif ?",
        answer:
          "3 ans après le dernier contact (recommandation CNIL). Au-delà, suppression ou archivage sécurisé.",
        category: "CRM",
        difficulty: 2,
      },
    ],
  },
  {
    moduleSlug: "transaction",
    lessonSlug: "offre-achat-avant-contrats",
    title: "Offre d'achat & avant-contrats",
    cards: [
      {
        id: "tr-oa-01",
        question: "Une offre d'achat écrite engage-t-elle l'acheteur ?",
        answer:
          "Oui : pendant son délai de validité, l'acquéreur ne peut pas la retirer (art. 1116 C. civ.). Si le vendeur l'accepte, l'accord sur la chose et le prix est formé (art. 1583) ; le compromis en précise ensuite les conditions. Le prix proposé n'oblige pas le vendeur à accepter.",
        category: "Offre & avant-contrats",
        difficulty: 2,
      },
      {
        id: "tr-oa-02",
        question: "Durée de validité courante d'une offre d'achat ?",
        answer:
          "Le plus souvent 5 à 10 jours. Sans acceptation à l'échéance, elle devient caduque. Indiquez une date butoir précise.",
        category: "Offre & avant-contrats",
        difficulty: 1,
      },
      {
        id: "tr-oa-03",
        question: "Peut-on faire plusieurs offres sur plusieurs biens en parallèle ?",
        answer:
          "Oui, tant qu'aucune n'est acceptée. À l'acceptation d'une, les autres doivent être retirées (risque de compromis multiples).",
        category: "Offre & avant-contrats",
        difficulty: 3,
      },
      {
        id: "tr-oa-04",
        question: "Que doit contenir une offre d'achat ?",
        answer:
          "Identité, bien visé, prix ferme, durée de validité, conditions suspensives envisagées, mode de financement.",
        category: "Offre & avant-contrats",
        difficulty: 2,
      },
      {
        id: "tr-oa-05",
        question: "Piège : le vendeur peut-il accepter deux offres au même prix ?",
        answer:
          "Non. La première offre acceptée forme le contrat. Un double engagement expose à une action en dommages-intérêts.",
        category: "Offre & avant-contrats",
        difficulty: 3,
      },
      {
        id: "tr-oa-06",
        question: "Différence entre offre orale et offre écrite ?",
        answer:
          "Orale = preuve difficile, juridiquement fragile. Écrite = force probante, base du compromis. Toujours exiger l'écrit.",
        category: "Offre & avant-contrats",
        difficulty: 2,
      },
      {
        id: "tr-oa-07",
        question: "Le vendeur peut-il refuser une offre au prix affiché ?",
        answer:
          "Oui : une offre au prix demandé n'oblige pas le vendeur à vendre, sauf si le mandat donnait expressément à l'agent le pouvoir de l'engager. La commission n'est due que si la vente est conclue ; le mandat peut toutefois prévoir une indemnité en cas de refus abusif d'une offre conforme.",
        category: "Offre & avant-contrats",
        difficulty: 3,
      },
      {
        id: "tr-oa-08",
        question: "Qu'est-ce qu'une contre-offre ?",
        answer:
          "Réponse modifiée du vendeur à l'offre de l'acheteur. Elle annule la première offre et ouvre un nouveau cycle de négociation.",
        category: "Offre & avant-contrats",
        difficulty: 2,
      },
      {
        id: "tr-oa-09",
        question: "Combien de temps entre offre acceptée et signature compromis ?",
        answer:
          "10 à 15 jours habituellement, le temps de réunir les documents (diagnostics, pré-contrat notaire, état civil).",
        category: "Offre & avant-contrats",
        difficulty: 1,
      },
    ],
  },
  {
    moduleSlug: "transaction",
    lessonSlug: "acte-authentique",
    title: "Acte authentique",
    cards: [
      {
        id: "tr-aa-01",
        question: "Qui peut rédiger un acte authentique de vente immobilière ?",
        answer:
          "Seul un notaire peut établir l'acte authentique de vente, indispensable à la publicité foncière qui rend la vente opposable aux tiers.",
        category: "Acte authentique",
        difficulty: 1,
      },
      {
        id: "tr-aa-02",
        question: "Délai moyen entre compromis et acte authentique ?",
        answer:
          "2 à 4 mois. Intègre rétractation, conditions suspensives, purges urbanistiques, préparation notariale.",
        category: "Acte authentique",
        difficulty: 1,
      },
      {
        id: "tr-aa-03",
        question: "Composition des frais de notaire dans l'ancien ?",
        answer:
          "7 à 8 % du prix : environ 80 % de droits de mutation reversés aux collectivités (relevés dans la plupart des départements depuis 2025, sauf primo-accédants), environ 10 % d'émoluments du notaire, le reste en débours et frais. Seulement 2 à 3 % dans le neuf.",
        category: "Acte authentique",
        difficulty: 2,
      },
      {
        id: "tr-aa-04",
        question: "Que contrôle le notaire avant la signature ?",
        answer:
          "Origine de propriété, hypothèques, urbanisme, purge DPU, identité et capacité des parties, certificat de non-gage, financement.",
        category: "Acte authentique",
        difficulty: 2,
      },
      {
        id: "tr-aa-05",
        question: "À quel moment l'acquéreur devient-il propriétaire ?",
        answer:
          "Au moment de la signature de l'acte authentique — transfert de propriété et de risques (sauf clause de report).",
        category: "Acte authentique",
        difficulty: 1,
      },
      {
        id: "tr-aa-06",
        question: "Piège : peut-on signer l'acte sans avoir fait un pré-état des lieux ?",
        answer:
          "Risqué. Prévoir une visite J-1 pour constater l'état réel du bien. Toute dégradation post-compromis = réclamation.",
        category: "Acte authentique",
        difficulty: 3,
      },
      {
        id: "tr-aa-07",
        question: "Qu'est-ce que la publication au SPF ?",
        answer:
          "Le notaire fait publier l'acte au Service de la publicité foncière : c'est ce qui rend la vente opposable aux tiers.",
        category: "Acte authentique",
        difficulty: 3,
      },
      {
        id: "tr-aa-08",
        question: "Quand l'agent reçoit-il ses honoraires ?",
        answer:
          "À la signature de l'acte authentique, par chèque de banque ou virement notaire, sur présentation du mandat et de la facture.",
        category: "Acte authentique",
        difficulty: 1,
      },
      {
        id: "tr-aa-09",
        question: "Peut-on signer à distance ?",
        answer:
          "Oui depuis 2020 : acte authentique électronique (AAE) via vidéo-conférence avec signature électronique qualifiée.",
        category: "Acte authentique",
        difficulty: 2,
      },
      {
        id: "tr-aa-10",
        question: "Que faire si l'acheteur ne se présente pas à la signature ?",
        answer:
          "Mise en demeure par notaire (LRAR). Si silence 8-15 j, vendeur peut actionner la clause pénale ou refuser la vente (après tribunal).",
        category: "Acte authentique",
        difficulty: 3,
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // MODULE FINANCEMENT — 6 leçons
  // ══════════════════════════════════════════════════════════════════════════
  {
    moduleSlug: "financement",
    lessonSlug: "credit",
    title: "Crédit immobilier",
    cards: [
      {
        id: "fi-cr-01",
        question: "Taux d'endettement maximum selon le HCSF ?",
        answer:
          "35% des revenus nets (assurance emprunteur incluse), recommandation contraignante depuis janvier 2022.",
        category: "Crédit",
        difficulty: 1,
      },
      {
        id: "fi-cr-02",
        question: "Durée maximale d'un prêt immobilier résidentiel ?",
        answer:
          "25 ans (27 ans dans le neuf avec différé de 2 ans). Règle HCSF contraignante depuis 2022.",
        category: "Crédit",
        difficulty: 1,
      },
      {
        id: "fi-cr-03",
        question: "Quelle part de dossiers les banques peuvent-elles déroger aux règles HCSF ?",
        answer:
          "20 % de leur production trimestrielle, dont au moins 70 % pour l'achat de la résidence principale, avec une priorité aux primo-accédants.",
        category: "Crédit",
        difficulty: 2,
      },
      {
        id: "fi-cr-04",
        question: "Qu'est-ce que le TAEG ?",
        answer:
          "Taux Annuel Effectif Global : taux tout inclus (intérêts + assurance + frais dossier + garantie). Seule base de comparaison.",
        category: "Crédit",
        difficulty: 2,
      },
      {
        id: "fi-cr-05",
        question: "Qu'est-ce que le PTZ (Prêt à Taux Zéro) ?",
        answer:
          "Prêt sans intérêts pour les primo-accédants sous conditions de ressources, pour une résidence principale. Le montant et le différé de remboursement dépendent des revenus, de la zone et du type d'opération.",
        category: "Crédit",
        difficulty: 1,
      },
      {
        id: "fi-cr-06",
        question: "Taux d'intérêt moyen prêt 20 ans avril 2026 ?",
        answer:
          "Consultez chaque mois l'Observatoire Crédit Logement/CSA ou les baromètres des courtiers : les taux évoluent vite, et un chiffre mémorisé devient faux en quelques mois.",
        category: "Crédit",
        difficulty: 1,
      },
      {
        id: "fi-cr-07",
        question: "Différence entre hypothèque et caution bancaire ?",
        answer:
          "Hypothèque : garantie réelle sur le bien, coûte ~1,5% + mainlevée. Caution (Crédit Logement) : organisme se porte garant, coût ~1,2% partiellement restituable.",
        category: "Crédit",
        difficulty: 3,
      },
      {
        id: "fi-cr-08",
        question: "Piège : un emprunteur peut-il négocier son taux après signature ?",
        answer:
          "Pas directement, mais peut demander un rachat de crédit ou une renégociation interne. Gain significatif si écart taux >0,7 point.",
        category: "Crédit",
        difficulty: 3,
      },
      {
        id: "fi-cr-09",
        question: "Quels 4 justificatifs indispensables pour une demande de prêt ?",
        answer:
          "3 derniers bulletins de salaire, 2 derniers avis d'imposition, 3 derniers relevés bancaires, justificatif d'apport.",
        category: "Crédit",
        difficulty: 1,
      },
      {
        id: "fi-cr-10",
        question: "Apport minimum recommandé en 2026 ?",
        answer:
          "10% du prix pour couvrir frais de notaire + garantie. 20% pour obtenir les meilleurs taux. Sans apport : dossiers rares.",
        category: "Crédit",
        difficulty: 1,
      },
    ],
  },
  {
    moduleSlug: "financement",
    lessonSlug: "fiscalite",
    title: "Fiscalité immobilière",
    cards: [
      {
        id: "fi-fi-01",
        question: "Quelle est la fiscalité des revenus fonciers au-delà de 15 000€/an ?",
        answer:
          "Régime réel obligatoire : revenus bruts - charges réelles (intérêts, travaux, taxe foncière, gestion, assurance).",
        category: "Fiscalité",
        difficulty: 2,
      },
      {
        id: "fi-fi-02",
        question: "Plafond du micro-foncier ?",
        answer:
          "15 000€ de recettes brutes annuelles. Abattement forfaitaire de 30%, pas de charges déductibles.",
        category: "Fiscalité",
        difficulty: 1,
      },
      {
        id: "fi-fi-03",
        question: "Abattement forfaitaire en micro-BIC (LMNP) ?",
        answer:
          "50 % (plafond 77 700 €) pour la location meublée classique, les meublés de tourisme classés et les chambres d'hôtes. 30 % (plafond 15 000 €) pour les meublés de tourisme non classés (loi Le Meur, 2024).",
        category: "Fiscalité",
        difficulty: 2,
      },
      {
        id: "fi-fi-04",
        question: "Qu'est-ce que le déficit foncier ?",
        answer:
          "Lorsque les charges (hors intérêts d'emprunt) excèdent les loyers : imputable sur le revenu global dans la limite de 10 700 €/an. Le plafond relevé à 21 400 € pour les travaux de sortie de passoire concernait les dépenses payées jusqu'au 31 décembre 2025.",
        category: "Fiscalité",
        difficulty: 3,
      },
      {
        id: "fi-fi-05",
        question: "Plus-value immobilière : exonération après combien d'années ?",
        answer:
          "22 ans pour l'IR, 30 ans pour les prélèvements sociaux. Abattement linéaire progressif.",
        category: "Fiscalité",
        difficulty: 2,
      },
      {
        id: "fi-fi-06",
        question: "Piège : la résidence principale est-elle taxée à la plus-value ?",
        answer:
          "Non, exonération totale (art. 150 U CGI). Condition : avoir occupé le logement en tant que résidence principale jusqu'à la vente.",
        category: "Fiscalité",
        difficulty: 2,
      },
      {
        id: "fi-fi-07",
        question: "Qu'est-ce que l'IFI ?",
        answer:
          "Impôt sur la Fortune Immobilière, remplaçant l'ISF depuis 2018. Seuil : 1,3 M€ de patrimoine net immobilier.",
        category: "Fiscalité",
        difficulty: 2,
      },
      {
        id: "fi-fi-08",
        question: "Taux d'imposition de la plus-value immobilière ?",
        answer:
          "36,2% au total : 19% IR + 17,2% prélèvements sociaux. Surtaxe de 2 à 6% si plus-value >50 000€.",
        category: "Fiscalité",
        difficulty: 3,
      },
      {
        id: "fi-fi-09",
        question: "Avantage fiscal majeur du LMNP ?",
        answer:
          "L'amortissement du bâti (sur 25 à 40 ans) et du mobilier (5 à 10 ans), qui neutralise souvent les loyers imposables pendant de longues années. Depuis 2025, ces amortissements sont réintégrés dans le calcul de la plus-value à la revente.",
        category: "Fiscalité",
        difficulty: 3,
      },
      {
        id: "fi-fi-10",
        question: "Taxe foncière : qui la paye l'année de la vente ?",
        answer:
          "Le propriétaire au 1er janvier. Usage fréquent : répartition pro rata temporis dans le compromis.",
        category: "Fiscalité",
        difficulty: 2,
      },
    ],
  },
  {
    moduleSlug: "financement",
    lessonSlug: "rentabilite",
    title: "Rentabilité locative",
    cards: [
      {
        id: "fi-re-01",
        question: "Comment calculer un rendement locatif brut ?",
        answer:
          "(Loyer annuel / Prix d'achat) × 100. Ex : 800€×12 / 200 000€ = 4,8%.",
        category: "Rentabilité",
        difficulty: 1,
      },
      {
        id: "fi-re-02",
        question: "Différence entre rendement brut et net ?",
        answer:
          "Brut = loyer/prix. Net = (loyer - charges - taxe - vacance - gestion) / (prix + frais notaire + travaux). Écart : 1,5 à 2,5 pts.",
        category: "Rentabilité",
        difficulty: 2,
      },
      {
        id: "fi-re-03",
        question: "Qu'est-ce que le cash-flow ?",
        answer:
          "Trésorerie résiduelle après paiement de toutes les charges + remboursement du crédit. Positif = investissement qui s'autofinance.",
        category: "Rentabilité",
        difficulty: 2,
      },
      {
        id: "fi-re-04",
        question: "Rendement moyen locatif à Paris en 2026 ?",
        answer:
          "En ordre de grandeur, autour de 3 % brut à Paris, davantage dans de nombreuses villes moyennes. Vérifiez toujours avec des loyers et des prix réels du secteur.",
        category: "Rentabilité",
        difficulty: 2,
      },
      {
        id: "fi-re-05",
        question: "Taux de vacance locative à anticiper ?",
        answer:
          "5 à 8% (équivalent à ~1 mois par an). Plus élevé dans petites villes ou logements atypiques.",
        category: "Rentabilité",
        difficulty: 2,
      },
      {
        id: "fi-re-06",
        question: "Piège : ne pas intégrer les frais annexes ?",
        answer:
          "Frais de notaire (7-8%), travaux, taxe foncière, assurance PNO, gestion (7-9%) doivent tous entrer dans le calcul net.",
        category: "Rentabilité",
        difficulty: 3,
      },
      {
        id: "fi-re-07",
        question: "TRI (Taux de Rendement Interne) : utilité ?",
        answer:
          "Mesure la rentabilité sur toute la durée d'investissement, incluant plus-value et flux actualisés. Standard du pro.",
        category: "Rentabilité",
        difficulty: 3,
      },
      {
        id: "fi-re-08",
        question: "Seuil de rentabilité minimum pour investir ?",
        answer:
          "Rendement net ≥ taux du crédit + 1 point. Sinon, l'investissement repose uniquement sur la plus-value espérée.",
        category: "Rentabilité",
        difficulty: 2,
      },
      {
        id: "fi-re-09",
        question: "Location nue vs meublée : écart de rendement net ?",
        answer:
          "Le meublé se loue plus cher et bénéficie de l'amortissement en LMNP, mais avec plus de rotation, d'équipement et de gestion. Depuis 2025, les amortissements sont réintégrés dans la plus-value à la revente : comparez sur toute la durée de détention.",
        category: "Rentabilité",
        difficulty: 2,
      },
    ],
  },
  {
    moduleSlug: "financement",
    lessonSlug: "dispositifs",
    title: "Dispositifs de financement",
    cards: [
      {
        id: "fi-di-01",
        question: "Qu'est-ce que le prêt Action Logement ?",
        answer:
          "Prêt complémentaire d'Action Logement, à taux réduit, pour certains salariés d'entreprises du secteur privé qui achètent leur résidence principale. Montant plafonné et conditions à vérifier auprès d'Action Logement.",
        category: "Dispositifs",
        difficulty: 2,
      },
      {
        id: "fi-di-02",
        question: "Qu'est-ce que le prêt conventionné ?",
        answer:
          "Prêt délivré par une banque ayant signé une convention avec l'État, sans condition de ressources, pour financer la résidence principale. Ses taux sont plafonnés.",
        category: "Dispositifs",
        difficulty: 2,
      },
      {
        id: "fi-di-03",
        question: "Qu'est-ce que le PAS (Prêt Accession Sociale) ?",
        answer:
          "Prêt conventionné réservé aux ménages sous conditions de ressources, pour la résidence principale. Taux et frais de dossier sont encadrés par l'État.",
        category: "Dispositifs",
        difficulty: 2,
      },
      {
        id: "fi-di-04",
        question: "Éco-PTZ : montant maximum ?",
        answer:
          "50 000€ depuis 2022 pour rénovation énergétique globale. 0% d'intérêts, remboursement sur 15-20 ans.",
        category: "Dispositifs",
        difficulty: 2,
      },
      {
        id: "fi-di-05",
        question: "Qu'est-ce que le PEL ?",
        answer:
          "Plan Épargne Logement : produit d'épargne 4-15 ans, donne droit à un prêt plafonné à 92 000€ à taux fixé à l'ouverture.",
        category: "Dispositifs",
        difficulty: 1,
      },
      {
        id: "fi-di-06",
        question: "MaPrimeRénov' : critère principal en 2026 ?",
        answer:
          "Selon les revenus et le gain de classes. Rénovation d'ampleur (logements E, F ou G) : 10 à 80 % d'un plafond de 30 000 € HT (2 classes gagnées) ou 40 000 € HT (3 classes et plus). Par geste : chauffage décarboné, revenus très modestes à intermédiaires.",
        category: "Dispositifs",
        difficulty: 2,
      },
      {
        id: "fi-di-07",
        question: "Piège : cumuler PTZ et PAS est-il possible ?",
        answer:
          "Oui, sous conditions de ressources. Dans l'ancien, l'éco-PTZ et MaPrimeRénov' (logement de plus de 15 ans) peuvent financer en plus les travaux de rénovation énergétique.",
        category: "Dispositifs",
        difficulty: 3,
      },
      {
        id: "fi-di-08",
        question: "Qu'est-ce que le bail réel solidaire (BRS) ?",
        answer:
          "Dissociation du foncier et du bâti. L'acheteur acquiert le logement, loue le terrain à un OFS. Prix -25 à -40% du marché.",
        category: "Dispositifs",
        difficulty: 3,
      },
      {
        id: "fi-di-09",
        question: "Garantie Visale : à quoi ça sert ?",
        answer:
          "Caution locative gratuite Action Logement pour jeunes <30 ans ou salariés précaires. Couvre 36 mois d'impayés.",
        category: "Dispositifs",
        difficulty: 2,
      },
    ],
  },
  {
    moduleSlug: "financement",
    lessonSlug: "assurances",
    title: "Assurances",
    cards: [
      {
        id: "fi-as-01",
        question: "Que couvre l'assurance emprunteur ?",
        answer:
          "Décès, PTIA (Perte Totale et Irréversible d'Autonomie), ITT (Incapacité Temporaire de Travail), IPT/IPP (Invalidité).",
        category: "Assurances",
        difficulty: 2,
      },
      {
        id: "fi-as-02",
        question: "Qu'est-ce que la loi Lemoine ?",
        answer:
          "Loi 2022 permettant la résiliation à tout moment de l'assurance emprunteur. Supprime le questionnaire médical pour prêts <200k€ remboursés avant 60 ans.",
        category: "Assurances",
        difficulty: 2,
      },
      {
        id: "fi-as-03",
        question: "Coût moyen de l'assurance emprunteur ?",
        answer:
          "0,30 à 0,60% du capital/an en délégation, 0,40 à 0,90% en banque. Économie possible : 10 à 30k€ sur un prêt 300k€/20 ans.",
        category: "Assurances",
        difficulty: 2,
      },
      {
        id: "fi-as-04",
        question: "Que couvre l'assurance PNO ?",
        answer:
          "Propriétaire Non Occupant : dégâts des eaux, incendie, responsabilité civile. Obligatoire en copro depuis ALUR (2014).",
        category: "Assurances",
        difficulty: 2,
      },
      {
        id: "fi-as-05",
        question: "Multirisque habitation : obligations locataire ?",
        answer:
          "Souscription obligatoire en location nue (art. 7g loi 1989). Attestation annuelle à fournir au bailleur.",
        category: "Assurances",
        difficulty: 1,
      },
      {
        id: "fi-as-06",
        question: "Piège : l'assurance emprunteur est-elle obligatoire ?",
        answer:
          "Elle n'est pas imposée par la loi, mais les banques l'exigent presque toujours. La quotité totale doit couvrir au moins 100 % du prêt : en couple, 50/50 au minimum, 100/100 pour une protection maximale.",
        category: "Assurances",
        difficulty: 3,
      },
      {
        id: "fi-as-07",
        question: "Qu'est-ce que la GLI (Garantie Loyers Impayés) ?",
        answer:
          "Assurance du bailleur couvrant impayés de loyer, dégradations, frais de procédure. Coût : 2 à 4% du loyer annuel.",
        category: "Assurances",
        difficulty: 2,
      },
      {
        id: "fi-as-08",
        question: "Dommages-ouvrage : pour quel type de travaux ?",
        answer:
          "Obligatoire pour gros travaux (extension, rénovation lourde). Préfinance les réparations en cas de désordre pendant 10 ans.",
        category: "Assurances",
        difficulty: 3,
      },
    ],
  },
  {
    moduleSlug: "financement",
    lessonSlug: "defiscalisation",
    title: "Défiscalisation",
    cards: [
      {
        id: "fi-de-01",
        question: "Dispositif Pinel : est-il encore en vigueur en 2026 ?",
        answer:
          "Non. Le Pinel a pris fin au 31 décembre 2024. Les alternatives pour un particulier : Denormandie (ancien avec travaux), Loc'Avantages, Malraux, location meublée en LMNP…",
        category: "Défiscalisation",
        difficulty: 1,
      },
      {
        id: "fi-de-02",
        question: "Qu'est-ce que le dispositif Denormandie ?",
        answer:
          "Réduction d'impôt pour l'achat d'un logement ancien avec travaux représentant au moins 25 % du coût total, dans les communes éligibles (programme Action Cœur de Ville, opérations de revitalisation du territoire). Prolongé jusqu'au 31 décembre 2027.",
        category: "Défiscalisation",
        difficulty: 2,
      },
      {
        id: "fi-de-03",
        question: "Dispositif Malraux : avantage principal ?",
        answer:
          "Réduction d'impôt jusqu'à 30% des travaux de restauration en secteur sauvegardé (plafond 400k€/4 ans).",
        category: "Défiscalisation",
        difficulty: 2,
      },
      {
        id: "fi-de-04",
        question: "Monuments historiques : particularité fiscale ?",
        answer:
          "Déduction illimitée des travaux et intérêts d'emprunt du revenu global. Engagement de conservation 15 ans.",
        category: "Défiscalisation",
        difficulty: 3,
      },
      {
        id: "fi-de-05",
        question: "LMNP : régime fiscal optimal pour investisseur ?",
        answer:
          "Micro-BIC (recettes jusqu'à 77 700 €, abattement de 50 %) ou réel (amortissements qui neutralisent souvent les loyers imposables). Depuis 2025, les amortissements sont réintégrés dans la plus-value à la revente.",
        category: "Défiscalisation",
        difficulty: 2,
      },
      {
        id: "fi-de-06",
        question: "Loi Censi-Bouvard : toujours en vigueur ?",
        answer:
          "Non, supprimée fin 2022. Remplacée par les dispositifs LMNP classiques sur résidences services.",
        category: "Défiscalisation",
        difficulty: 3,
      },
      {
        id: "fi-de-07",
        question: "Qu'est-ce que le déficit foncier maximum sur revenu global ?",
        answer:
          "10 700 €/an, l'excédent étant reportable sur les revenus fonciers des 10 années suivantes. Le plafond de 21 400 € pour les travaux de sortie de passoire concernait les dépenses payées jusqu'au 31 décembre 2025.",
        category: "Défiscalisation",
        difficulty: 2,
      },
      {
        id: "fi-de-08",
        question: "Piège : défiscaliser sans rendement ?",
        answer:
          "Stratégie perdante. Un dispositif doit produire du rendement ET un avantage fiscal. Un logement acheté trop cher pour défiscaliser peut se revendre en dessous de son prix d'achat.",
        category: "Défiscalisation",
        difficulty: 3,
      },
      {
        id: "fi-de-09",
        question: "Plafond global des niches fiscales en France ?",
        answer:
          "10 000 €/an (art. 200-0 A CGI), porté à 18 000 € pour les investissements outre-mer et les SOFICA. Le Malraux et les monuments historiques sont hors plafond.",
        category: "Défiscalisation",
        difficulty: 2,
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // MODULE MARKETING — 7 leçons
  // ══════════════════════════════════════════════════════════════════════════
  {
    moduleSlug: "marketing",
    lessonSlug: "photos",
    title: "Photographie immobilière",
    cards: [
      {
        id: "ma-ph-01",
        question: "Quelles sont les 5 règles d'or de la photo immobilière ?",
        answer:
          "Lumière naturelle, grand-angle (pas fisheye), hauteur poitrine, 3 photos min/pièce, rangement et home staging avant.",
        category: "Photos",
        difficulty: 1,
      },
      {
        id: "ma-ph-02",
        question: "Focale idéale pour photographier un intérieur ?",
        answer:
          "16-24 mm équivalent plein format (ultra-grand-angle). Évite le fisheye qui déforme.",
        category: "Photos",
        difficulty: 2,
      },
      {
        id: "ma-ph-03",
        question: "Combien de photos minimum dans une annonce performante ?",
        answer:
          "Une série complète de 10 à 15 photos de qualité. La photo principale décide de l'essentiel du clic dans la liste de résultats : choisissez la plus forte.",
        category: "Photos",
        difficulty: 1,
      },
      {
        id: "ma-ph-04",
        question: "Ordre recommandé des photos dans une annonce ?",
        answer:
          "Extérieur → séjour → cuisine → chambres → salle de bain → extras (terrasse, parking, cave). Toujours commencer par le meilleur atout.",
        category: "Photos",
        difficulty: 2,
      },
      {
        id: "ma-ph-05",
        question: "Quelle heure photographier pour un intérieur baigné de lumière ?",
        answer:
          "Juste avant midi (10h-13h). Éviter contre-jour direct. Utiliser le HDR pour équilibrer fenêtres surexposées.",
        category: "Photos",
        difficulty: 2,
      },
      {
        id: "ma-ph-06",
        question: "Piège fréquent : photo avec fisheye 8 mm ?",
        answer:
          "Distorsion des angles, pièces artificiellement rallongées. Effet « miroir de surveillance » décrédibilise. Préférer 16-24 mm.",
        category: "Photos",
        difficulty: 3,
      },
      {
        id: "ma-ph-07",
        question: "Retouche photo acceptable : jusqu'où ?",
        answer:
          "Exposition, balance des blancs, redressement verticales, nettoyage éléments amovibles. Pas de modification structurelle (déplacer murs, effacer voisins).",
        category: "Photos",
        difficulty: 3,
      },
      {
        id: "ma-ph-08",
        question: "Home staging : impact moyen sur délai de vente ?",
        answer:
          "Le home staging aide l'acquéreur à se projeter et réduit souvent le délai de vente. Ses effets varient selon le bien : mesurez-les sur vos propres mandats plutôt que de promettre un chiffre.",
        category: "Photos",
        difficulty: 2,
      },
      {
        id: "ma-ph-09",
        question: "Format photo pour portails SeLoger / Leboncoin ?",
        answer:
          "Minimum 1600 x 1200 px, JPEG ≥80% qualité, orientation paysage. Privilégier 4/3 ou 3/2.",
        category: "Photos",
        difficulty: 2,
      },
      {
        id: "ma-ph-10",
        question: "Coût moyen d'un shooting pro en France ?",
        answer:
          "Quelques centaines d'euros pour une série de photos professionnelles retouchées, parfois avec plan. Un investissement vite rentabilisé si la photo principale améliore le taux de clic de l'annonce.",
        category: "Photos",
        difficulty: 1,
      },
    ],
  },
  {
    moduleSlug: "marketing",
    lessonSlug: "annonces",
    title: "Rédaction d'annonces",
    cards: [
      {
        id: "ma-an-01",
        question: "Comment structurer un titre d'annonce efficace ?",
        answer:
          "Type + Atout + Localisation. Ex : « T3 lumineux — Terrasse 20m² — Lyon 6e ». Éviter MAJUSCULES et superlatifs.",
        category: "Annonces",
        difficulty: 1,
      },
      {
        id: "ma-an-02",
        question: "Longueur idéale d'une description d'annonce ?",
        answer:
          "150 à 250 mots. Structure : accroche émotionnelle → caractéristiques clés → environnement → appel à l'action.",
        category: "Annonces",
        difficulty: 1,
      },
      {
        id: "ma-an-03",
        question: "Mentions obligatoires sur une annonce (loi ALUR + DPE) ?",
        answer:
          "Classes énergie et climat du DPE et estimation des dépenses d'énergie ; partie qui paie les honoraires (et, si c'est l'acquéreur, prix honoraires inclus, prix hors honoraires et taux) ; pour un lot de copropriété : nombre de lots, quote-part annuelle moyenne de charges et procédures en cours.",
        category: "Annonces",
        difficulty: 2,
      },
      {
        id: "ma-an-04",
        question: "Quels mots booster le taux de clic d'un titre ?",
        answer:
          "Des termes concrets et vérifiables : « lumineux », « rénové », « avec terrasse », « exposé sud », « dernier étage ». Évitez les superlatifs vagues (« exceptionnel », « rare ») et les codes (« charme », « potentiel » pour « travaux »).",
        category: "Annonces",
        difficulty: 2,
      },
      {
        id: "ma-an-05",
        question: "Piège : description trop générique ?",
        answer:
          "« Bel appartement idéal famille » ne convertit pas. Préférer concret : « Séjour 32m² exposé sud, cuisine équipée Bosch, école publique 200m ».",
        category: "Annonces",
        difficulty: 3,
      },
      {
        id: "ma-an-06",
        question: "Référencement : quels mots-clés inclure ?",
        answer:
          "Ville + quartier + arrondissement + type bien + surface + caractéristique rare (terrasse, étage élevé, parking, balcon).",
        category: "Annonces",
        difficulty: 2,
      },
      {
        id: "ma-an-07",
        question: "Quelle erreur légale fréquente dans les annonces ?",
        answer:
          "Omettre le DPE ou écrire « DPE vierge » alors que le diagnostic est obligatoire. C'est une annonce non conforme, sanctionnable par une amende administrative de la DGCCRF.",
        category: "Annonces",
        difficulty: 3,
      },
      {
        id: "ma-an-08",
        question: "Différence entre annonce vitrine et annonce portail ?",
        answer:
          "Vitrine : visuel fort, titre court, prix visible. Portail : description SEO optimisée, mots-clés, mentions légales complètes.",
        category: "Annonces",
        difficulty: 2,
      },
      {
        id: "ma-an-09",
        question: "Call-to-action efficace en fin de description ?",
        answer:
          "« Visite sur RDV — Appelez au 06 XX XX XX XX ou demandez le dossier complet » : crée urgence et valeur.",
        category: "Annonces",
        difficulty: 1,
      },
    ],
  },
  {
    moduleSlug: "marketing",
    lessonSlug: "portails",
    title: "Portails immobiliers",
    cards: [
      {
        id: "ma-po-01",
        question: "Principaux portails immobiliers en France (2026) ?",
        answer:
          "SeLoger, Leboncoin, Bien'ici, Figaro Immobilier, Logic-Immo, ainsi que les sites des réseaux et des agences. Choisissez selon le type de bien et la cible.",
        category: "Portails",
        difficulty: 1,
      },
      {
        id: "ma-po-02",
        question: "SeLoger vs Leboncoin : quelle stratégie ?",
        answer:
          "SeLoger : audience qualifiée, enchères visibilité, boost payant. Leboncoin : volume, audience large, remontée régulière. Publier sur les deux.",
        category: "Portails",
        difficulty: 2,
      },
      {
        id: "ma-po-03",
        question: "Nombre moyen de leads générés par annonce SeLoger ?",
        answer:
          "Il varie fortement selon le prix, le secteur et la qualité de l'annonce. Suivez dans vos statistiques le nombre de contacts par annonce et par portail, avec et sans option payante.",
        category: "Portails",
        difficulty: 2,
      },
      {
        id: "ma-po-04",
        question: "Qu'est-ce que le Bien'ici ?",
        answer:
          "Portail lancé en 2017 à l'initiative de professionnels de l'immobilier, qui n'accepte que les annonces de professionnels. Il se distingue par sa recherche cartographique.",
        category: "Portails",
        difficulty: 2,
      },
      {
        id: "ma-po-05",
        question: "Combien de fois rafraîchir une annonce pour maintenir visibilité ?",
        answer:
          "Tous les 5-10 jours sur Leboncoin. Chaque rafraîchissement remonte en tête dans sa catégorie géographique.",
        category: "Portails",
        difficulty: 3,
      },
      {
        id: "ma-po-06",
        question: "Coût moyen d'abonnement SeLoger par agence ?",
        answer:
          "Il dépend de la zone, du volume d'annonces et des options. Demandez des devis et comparez le coût par contact obtenu, portail par portail.",
        category: "Portails",
        difficulty: 2,
      },
      {
        id: "ma-po-07",
        question: "Piège : publier la même annonce sur 10 portails ?",
        answer:
          "Mauvais pour SEO (duplicate content) et image (annonce perçue comme « brûlée »). Prioriser 2-3 portails + réseaux propres.",
        category: "Portails",
        difficulty: 3,
      },
      {
        id: "ma-po-08",
        question: "Quelle fonctionnalité distingue Meilleurs Agents ?",
        answer:
          "Estimation en ligne (gratuite) + note d'agence + portail de prospection vendeur. Racheté par Axel Springer (groupe SeLoger).",
        category: "Portails",
        difficulty: 2,
      },
    ],
  },
  {
    moduleSlug: "marketing",
    lessonSlug: "reseaux",
    title: "Réseaux sociaux",
    cards: [
      {
        id: "ma-re-01",
        question: "Réseaux prioritaires pour un agent immobilier en 2026 ?",
        answer:
          "Instagram (visuels/reels), LinkedIn (pro B2B), TikTok (jeunes primo-accédants), Facebook (communautés locales).",
        category: "Réseaux",
        difficulty: 1,
      },
      {
        id: "ma-re-02",
        question: "Ratio contenu recommandé sur Instagram immobilier ?",
        answer:
          "Environ 80 % de contenu utile (conseils, coulisses, marché) et 20 % d'annonces. Quand vous publiez un bien, les mentions obligatoires d'une annonce s'appliquent, prix compris.",
        category: "Réseaux",
        difficulty: 2,
      },
      {
        id: "ma-re-03",
        question: "Formats Instagram les plus performants en 2026 ?",
        answer:
          "Les vidéos courtes (Reels), les carrousels avant/après et les stories interactives. Le format vertical, sous-titré, retient le mieux l'attention.",
        category: "Réseaux",
        difficulty: 2,
      },
      {
        id: "ma-re-04",
        question: "Fréquence de publication idéale ?",
        answer:
          "Instagram : 3-5 posts/semaine + 5-10 stories/jour. LinkedIn : 2-3 posts/semaine. TikTok : 1/jour.",
        category: "Réseaux",
        difficulty: 2,
      },
      {
        id: "ma-re-05",
        question: "Quel hashtag type utiliser sur une annonce Lyon ?",
        answer:
          "Quelques hashtags ciblés, surtout locaux (#lyon6, #immobilierlyon), plutôt qu'une longue liste générique. Les hashtags trop généraux noient la publication.",
        category: "Réseaux",
        difficulty: 2,
      },
      {
        id: "ma-re-06",
        question: "Piège : diffuser des prix dans chaque post ?",
        answer:
          "Les publications 100 % commerciales lassent l'audience. Mais quand vous présentez un bien à vendre, c'est une annonce : le prix et les mentions obligatoires (honoraires, DPE) doivent y figurer, pas seulement en message privé.",
        category: "Réseaux",
        difficulty: 3,
      },
      {
        id: "ma-re-07",
        question: "LinkedIn : quel contenu convertit le mieux ?",
        answer:
          "Analyses marché avec graphiques, témoignages clients, posts personnels (parcours, erreurs), études de cas chiffrées.",
        category: "Réseaux",
        difficulty: 2,
      },
      {
        id: "ma-re-08",
        question: "Durée de vie moyenne d'un post Instagram vs LinkedIn ?",
        answer:
          "Une publication Instagram vit surtout dans les premières heures ou jours ; un post LinkedIn circule souvent plus longtemps. Observez vos propres statistiques pour planifier.",
        category: "Réseaux",
        difficulty: 3,
      },
    ],
  },
  {
    moduleSlug: "marketing",
    lessonSlug: "seo",
    title: "SEO local immobilier",
    cards: [
      {
        id: "ma-se-01",
        question: "Qu'est-ce que le SEO local pour l'immobilier ?",
        answer:
          "Optimiser la visibilité sur Google pour recherches géolocalisées : fiche Google Business, mots-clés locaux, avis, contenu local.",
        category: "SEO",
        difficulty: 1,
      },
      {
        id: "ma-se-02",
        question: "Élément n°1 pour apparaître dans le pack local de Google ?",
        answer:
          "Une fiche Google Business Profile complète et à jour avec photos, horaires, réponses aux avis, posts réguliers.",
        category: "SEO",
        difficulty: 1,
      },
      {
        id: "ma-se-03",
        question: "Quel est le minimum d'avis Google recommandé ?",
        answer:
          "Il n'y a pas de seuil officiel : visez un flux régulier d'avis récents et authentiques, avec une réponse à chacun. La fraîcheur des avis compte autant que leur nombre.",
        category: "SEO",
        difficulty: 2,
      },
      {
        id: "ma-se-04",
        question: "Mots-clés prioritaires pour une agence Lyon 6 ?",
        answer:
          "« agence immobilière Lyon 6 », « appartement à vendre Lyon 6 », « estimation Lyon Foch », « T3 Masséna ». Longue traîne +++.",
        category: "SEO",
        difficulty: 2,
      },
      {
        id: "ma-se-05",
        question: "Quel type de contenu booste le SEO d'une agence ?",
        answer:
          "Articles de blog locaux (marché du quartier, comparatifs), guides acheteur/vendeur, études de cas clients, FAQ structurées.",
        category: "SEO",
        difficulty: 2,
      },
      {
        id: "ma-se-06",
        question: "Qu'est-ce que les citations NAP ?",
        answer:
          "Name, Address, Phone. Des coordonnées identiques sur votre fiche Google, votre site et les annuaires (Pages Jaunes, annuaires professionnels…) renforcent votre crédibilité auprès de Google.",
        category: "SEO",
        difficulty: 3,
      },
      {
        id: "ma-se-07",
        question: "Piège : acheter des avis Google ?",
        answer:
          "Risque de suppression des avis ou de suspension de la fiche par Google. Et c'est une pratique commerciale trompeuse : délit puni de 2 ans d'emprisonnement et 300 000 € d'amende (art. L.132-2 C. conso.).",
        category: "SEO",
        difficulty: 3,
      },
      {
        id: "ma-se-08",
        question: "Vitesse idéale d'un site immobilier ?",
        answer:
          "Moins de 2,5s de chargement mobile (Core Web Vitals). Impact direct sur classement et taux de rebond.",
        category: "SEO",
        difficulty: 3,
      },
      {
        id: "ma-se-09",
        question: "Quelle balise essentielle optimiser sur une page annonce ?",
        answer:
          "Balise title de moins de 60 caractères, meta description de 155 caractères environ, un H1 unique, et des données structurées schema.org (par exemple RealEstateListing) pour enrichir l'affichage.",
        category: "SEO",
        difficulty: 3,
      },
    ],
  },
  {
    moduleSlug: "marketing",
    lessonSlug: "video-visite-virtuelle",
    title: "Vidéo & visite virtuelle",
    cards: [
      {
        id: "ma-vi-01",
        question: "Qu'est-ce qu'une visite virtuelle 360° ?",
        answer:
          "Captation immersive (Matterport, caméras 360°) permettant une pré-visite à distance. Les visiteurs qui se déplacent ensuite sont mieux informés.",
        category: "Vidéo",
        difficulty: 1,
      },
      {
        id: "ma-vi-02",
        question: "Coût moyen d'une visite Matterport ?",
        answer:
          "150 à 500€ par bien selon surface. Licence plateforme 70-300€/mois pour l'agence.",
        category: "Vidéo",
        difficulty: 2,
      },
      {
        id: "ma-vi-03",
        question: "Durée idéale d'une vidéo de présentation d'un bien ?",
        answer:
          "60 à 90 secondes pour Reels / TikTok. 2-3 min pour YouTube avec storytelling complet.",
        category: "Vidéo",
        difficulty: 1,
      },
      {
        id: "ma-vi-04",
        question: "Structure type d'une vidéo immobilière qui convertit ?",
        answer:
          "Accroche de 3 secondes → extérieur → pièce principale → cuisine → chambres → atouts → quartier → appel à l'action. Le prix et les mentions obligatoires figurent dans la publication.",
        category: "Vidéo",
        difficulty: 2,
      },
      {
        id: "ma-vi-05",
        question: "Impact d'une vidéo vs photos seules ?",
        answer:
          "La vidéo montre les volumes et l'enchaînement des pièces, et retient l'attention sur les réseaux. Son effet varie selon le bien : mesurez-le sur vos annonces, sans vous fier aux statistiques qui circulent sans source.",
        category: "Vidéo",
        difficulty: 2,
      },
      {
        id: "ma-vi-06",
        question: "Matériel minimum pour tourner une visite vidéo pro ?",
        answer:
          "Smartphone récent + stabilisateur DJI Osmo + micro-cravate + lumière LED portable. Budget total <500€.",
        category: "Vidéo",
        difficulty: 2,
      },
      {
        id: "ma-vi-07",
        question: "Piège : visite virtuelle sans nettoyage préalable ?",
        answer:
          "Chaque objet oublié est figé pour des mois. Nettoyer, désencombrer, aérer avant la captation (10x plus difficile à corriger après).",
        category: "Vidéo",
        difficulty: 3,
      },
      {
        id: "ma-vi-08",
        question: "Drone : quelle réglementation en France ?",
        answer:
          "Enregistrement des drones de plus de 250 g équipés d'une caméra, formation du télépilote, et en ville, des règles strictes (déclaration ou autorisation selon le scénario de vol). Le plus sûr : un prestataire déclaré.",
        category: "Vidéo",
        difficulty: 3,
      },
      {
        id: "ma-vi-09",
        question: "Format optimal pour une vidéo Reels Instagram ?",
        answer:
          "Vertical 9/16, 1080 × 1920 px, sous-titres incrustés (beaucoup de vidéos sont regardées sans le son), musique libre de droits.",
        category: "Vidéo",
        difficulty: 2,
      },
    ],
  },
  {
    moduleSlug: "marketing",
    lessonSlug: "personal-branding",
    title: "Personal branding",
    cards: [
      {
        id: "ma-pb-01",
        question: "Qu'est-ce que le personal branding ?",
        answer:
          "La construction d'une marque personnelle cohérente et reconnaissable qui vous différencie. Dans un métier de confiance, la recommandation et la réputation pèsent lourd dans l'obtention des mandats.",
        category: "Personal Branding",
        difficulty: 1,
      },
      {
        id: "ma-pb-02",
        question: "3 piliers d'un personal branding immobilier réussi ?",
        answer:
          "1) Expertise (niche, spécialité), 2) Personnalité (ton, valeurs), 3) Constance (fréquence, visuel homogène).",
        category: "Personal Branding",
        difficulty: 2,
      },
      {
        id: "ma-pb-03",
        question: "Qu'est-ce que le « pourquoi » en branding (Simon Sinek) ?",
        answer:
          "La raison d'être au-delà du métier. Ex : « J'aide les familles à sécuriser leur plus gros investissement de vie ». Moteur d'adhésion.",
        category: "Personal Branding",
        difficulty: 3,
      },
      {
        id: "ma-pb-04",
        question: "Combien de temps pour construire un personal brand solide ?",
        answer:
          "12 à 24 mois de publication régulière pour atteindre une reconnaissance sur une zone géographique. Pas de raccourci.",
        category: "Personal Branding",
        difficulty: 2,
      },
      {
        id: "ma-pb-05",
        question: "Quel contenu partager en priorité ?",
        answer:
          "Témoignages clients filmés, analyses marché du quartier, anecdotes de terrain, coulisses d'une visite, erreurs à éviter.",
        category: "Personal Branding",
        difficulty: 2,
      },
      {
        id: "ma-pb-06",
        question: "Piège : copier un collègue qui a du succès ?",
        answer:
          "Le public détecte l'inauthenticité. Mieux vaut s'inspirer sur la forme et rester soi-même sur le fond.",
        category: "Personal Branding",
        difficulty: 3,
      },
      {
        id: "ma-pb-07",
        question: "Quelle est la photo de profil idéale pour un agent ?",
        answer:
          "Format portrait épaules, éclairage naturel, regard caméra, sourire authentique, arrière-plan flou, tenue professionnelle cohérente.",
        category: "Personal Branding",
        difficulty: 1,
      },
      {
        id: "ma-pb-08",
        question: "Signature visuelle : quels éléments unifier ?",
        answer:
          "Palette 2-3 couleurs, police unique, filtre photo constant, logo/monogramme, ton verbal (tutoiement/vouvoiement).",
        category: "Personal Branding",
        difficulty: 2,
      },
      {
        id: "ma-pb-09",
        question: "Impact mesurable d'un personal brand fort ?",
        answer:
          "Plus de contacts entrants, des honoraires mieux défendus et des clients plus fidèles. Mesurez-le dans votre CRM : part des mandats issus de vos contenus et recommandations.",
        category: "Personal Branding",
        difficulty: 2,
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // MODULE TERRAIN — 7 leçons
  // ══════════════════════════════════════════════════════════════════════════
  {
    moduleSlug: "terrain",
    lessonSlug: "visite",
    title: "Conduire une visite",
    cards: [
      {
        id: "te-vi-01",
        question: "Quelles sont les 3 phases d'une visite réussie ?",
        answer:
          "Accueil (5 min) : créer le lien. Découverte (20 min) : parcours logique, storytelling. Conclusion (5 min) : synthèse, prochain pas.",
        category: "Visite",
        difficulty: 1,
      },
      {
        id: "te-vi-02",
        question: "Parcours de visite idéal d'un appartement ?",
        answer:
          "Entrée → pièce de vie → cuisine → chambre principale → SdB → autres chambres → rangements → extérieur. Finir par le meilleur atout.",
        category: "Visite",
        difficulty: 2,
      },
      {
        id: "te-vi-03",
        question: "Que faire avant d'ouvrir la porte aux visiteurs ?",
        answer:
          "Arriver 15 min avant : aérer, allumer lumières, ranger, ouvrir les volets, mettre musique douce, poser le DDT bien visible.",
        category: "Visite",
        difficulty: 1,
      },
      {
        id: "te-vi-04",
        question: "Combien de visites rentables pour une vente ?",
        answer:
          "Il n'y a pas de norme : de nombreuses visites sans offre signalent souvent un prix trop élevé ou une présentation à revoir ; peu de visites, un problème de diffusion ou d'attractivité.",
        category: "Visite",
        difficulty: 2,
      },
      {
        id: "te-vi-05",
        question: "Piège : parler trop pendant la visite ?",
        answer:
          "Règle des 20/80 : parler 20%, laisser 80% aux visiteurs (questions, projections). Ils doivent se « voir » vivre dans le bien.",
        category: "Visite",
        difficulty: 3,
      },
      {
        id: "te-vi-06",
        question: "Comment gérer 2 couples simultanément en visite ?",
        answer:
          "Accueil groupé mais parcours décalé. Éviter que les couples se parlent en présence mutuelle (biais, négociation publique).",
        category: "Visite",
        difficulty: 3,
      },
      {
        id: "te-vi-07",
        question: "Que faire si le bien ne correspond pas au client ?",
        answer:
          "Ne jamais forcer. Reconnaître honnêtement, proposer des alternatives, noter les critères affinés. La confiance gagnée vaut plus qu'une vente forcée.",
        category: "Visite",
        difficulty: 2,
      },
      {
        id: "te-vi-08",
        question: "Combien de biens visiter par jour maximum ?",
        answer:
          "3 à 4 biens maximum. Au-delà, fatigue, confusion, baisse de la qualité du pitch. Idéal : 2 visites/matinée.",
        category: "Visite",
        difficulty: 2,
      },
      {
        id: "te-vi-09",
        question: "Quel accessoire indispensable en visite ?",
        answer:
          "Mètre laser + bloc-notes/tablette + plans du bien + fiche récap'. Professionnalisme visible = confiance renforcée.",
        category: "Visite",
        difficulty: 1,
      },
      {
        id: "te-vi-10",
        question: "Comment terminer la visite ?",
        answer:
          "Résumer les 3 points forts, demander l'impression à chaud, proposer 2e visite ou rappel sous 48h, remettre fiche + carte.",
        category: "Visite",
        difficulty: 2,
      },
    ],
  },
  {
    moduleSlug: "terrain",
    lessonSlug: "argumentaire",
    title: "Argumentaire",
    cards: [
      {
        id: "te-ar-01",
        question: "Méthode CAB : à quoi ça correspond ?",
        answer:
          "Caractéristique → Avantage → Bénéfice. Ex : « Double vitrage (C) → isole du bruit (A) → vous dormez mieux (B) ».",
        category: "Argumentaire",
        difficulty: 1,
      },
      {
        id: "te-ar-02",
        question: "Quelle technique utiliser pour un client indécis ?",
        answer:
          "Écoute active + reformulation : « Si je vous comprends bien, vous cherchez X ». Isole les vrais critères de décision.",
        category: "Argumentaire",
        difficulty: 2,
      },
      {
        id: "te-ar-03",
        question: "Qu'est-ce que la vente émotionnelle ?",
        answer:
          "La décision d'achat est largement émotionnelle, puis justifiée par des critères rationnels. Décrivez les ambiances et la vie quotidienne, pas seulement les mètres carrés.",
        category: "Argumentaire",
        difficulty: 2,
      },
      {
        id: "te-ar-04",
        question: "Storytelling : comment l'utiliser dans une visite ?",
        answer:
          "Raconter l'histoire du bien (époque, rénovations, vie du quartier) active l'émotion et le différencie. Mais sans dévoiler la situation personnelle du vendeur : elle relève de la confidentialité.",
        category: "Argumentaire",
        difficulty: 2,
      },
      {
        id: "te-ar-05",
        question: "Piège : argumenter sur tous les points forts ?",
        answer:
          "Dilution du message. Prioriser 3-5 arguments massue qui correspondent aux priorités détectées du client (famille, rendement, prestige).",
        category: "Argumentaire",
        difficulty: 3,
      },
      {
        id: "te-ar-06",
        question: "Comment défendre le prix affiché ?",
        answer:
          "Argument chiffré : prix m² quartier, comparables récents, impôts fonciers bas, qualité construction, rendement. Jamais subjectif seul.",
        category: "Argumentaire",
        difficulty: 2,
      },
      {
        id: "te-ar-07",
        question: "Objection « c'est trop petit » : comment répondre ?",
        answer:
          "1) Accuser réception, 2) Questionner sur usage réel, 3) Montrer potentiel (aménagements, rangements), 4) Comparer avec surface utile vs brute.",
        category: "Argumentaire",
        difficulty: 2,
      },
      {
        id: "te-ar-08",
        question: "Règle du « OUI x3 » en argumentation ?",
        answer:
          "Obtenir 3 accords successifs sur points secondaires avant la question clé. Crée un momentum psychologique favorable à la décision finale.",
        category: "Argumentaire",
        difficulty: 3,
      },
      {
        id: "te-ar-09",
        question: "Transformer un défaut en atout : exemple ?",
        answer:
          "« Petit jardin » → « Facile à entretenir, pas de corvée le week-end ». Recadrage positif (reframing) systématique.",
        category: "Argumentaire",
        difficulty: 2,
      },
    ],
  },
  {
    moduleSlug: "terrain",
    lessonSlug: "closing",
    title: "Closing",
    cards: [
      {
        id: "te-cl-01",
        question: "Qu'est-ce que la technique du closing alternatif ?",
        answer:
          "Proposer deux options positives : « Vous préférez signer jeudi ou vendredi ? » Présuppose l'accord et facilite la décision.",
        category: "Closing",
        difficulty: 1,
      },
      {
        id: "te-cl-02",
        question: "Signaux d'achat à observer chez un visiteur ?",
        answer:
          "Questions voisinage/délai, mesure mentale, discussion d'aménagement (« on mettrait le canapé ici »), retour dans une pièce, questions financières.",
        category: "Closing",
        difficulty: 2,
      },
      {
        id: "te-cl-03",
        question: "Comment gérer « Je dois réfléchir » ?",
        answer:
          "1) Normaliser, 2) identifier le frein réel (« qu'est-ce qui vous fait hésiter ? »), 3) traiter l'objection précise, 4) convenir d'un prochain contact daté. L'urgence ne s'invoque que si elle est réelle.",
        category: "Closing",
        difficulty: 2,
      },
      {
        id: "te-cl-04",
        question: "Qu'est-ce que le closing de Ben Franklin ?",
        answer:
          "Lister à 2 colonnes : pour/contre. Si le pour l'emporte nettement, proposer de passer à l'action immédiatement.",
        category: "Closing",
        difficulty: 3,
      },
      {
        id: "te-cl-05",
        question: "Technique de l'urgence : comment l'utiliser avec éthique ?",
        answer:
          "Urgence réelle uniquement : « 3 autres visites programmées cette semaine ». Jamais inventer de concurrents fictifs.",
        category: "Closing",
        difficulty: 3,
      },
      {
        id: "te-cl-06",
        question: "Question clé pour fermer une vente ?",
        answer:
          "« Si on s'entend sur le prix, êtes-vous prêt à signer l'offre aujourd'hui ? » Engage l'acheteur et teste sa volonté réelle.",
        category: "Closing",
        difficulty: 2,
      },
      {
        id: "te-cl-07",
        question: "Piège : closer trop tôt ?",
        answer:
          "Avant d'avoir traité toutes les objections = refus quasi garanti. Signal : client qui dit « il faut que je revoie » = objection cachée.",
        category: "Closing",
        difficulty: 3,
      },
      {
        id: "te-cl-08",
        question: "Que faire après un refus explicite ?",
        answer:
          "Remercier, laisser passer quelques jours, envoyer une synthèse et des alternatives. Un refus aujourd'hui n'est pas un refus définitif : la relation compte pour la suite.",
        category: "Closing",
        difficulty: 2,
      },
      {
        id: "te-cl-09",
        question: "Offre verbale vs écrite : laquelle valide ?",
        answer:
          "L'écrite. Systématiser la rédaction de l'offre sur place (papier ou tablette) : transforme l'intention en engagement formel.",
        category: "Closing",
        difficulty: 1,
      },
    ],
  },
  {
    moduleSlug: "terrain",
    lessonSlug: "promesse",
    title: "Promesse de vente",
    cards: [
      {
        id: "te-pr-01",
        question: "Différence entre compromis et promesse unilatérale ?",
        answer:
          "Compromis = bilatéral (vendeur + acheteur engagés). Promesse unilatérale = seul vendeur s'engage, acheteur a option d'achat.",
        category: "Promesse",
        difficulty: 1,
      },
      {
        id: "te-pr-02",
        question: "Indemnité d'immobilisation type dans une promesse unilatérale ?",
        answer:
          "5 à 10% du prix de vente, versée par l'acheteur. Perdue si option non levée, sauf conditions suspensives non réalisées.",
        category: "Promesse",
        difficulty: 2,
      },
      {
        id: "te-pr-03",
        question: "Durée classique d'une promesse unilatérale ?",
        answer:
          "Le plus souvent 2 à 4 mois, calés sur les conditions suspensives (prêt, urbanisme). Elle est fréquemment établie par acte notarié.",
        category: "Promesse",
        difficulty: 2,
      },
      {
        id: "te-pr-04",
        question: "Piège : la promesse unilatérale doit-elle être enregistrée ?",
        answer:
          "Oui si elle est signée sous seing privé : enregistrement dans les 10 jours suivant son acceptation par le bénéficiaire, à peine de nullité (art. 1589-2 C. civ.). Établie par un notaire, elle est enregistrée par lui.",
        category: "Promesse",
        difficulty: 3,
      },
      {
        id: "te-pr-05",
        question: "Quand préférer la promesse au compromis ?",
        answer:
          "Quand l'acquéreur veut « réserver » le bien le temps de vérifier un point (financement, projet) contre une indemnité d'immobilisation, ou quand le notaire du vendeur la préconise. Le compromis reste le plus courant.",
        category: "Promesse",
        difficulty: 3,
      },
      {
        id: "te-pr-06",
        question: "Délai de rétractation sur une promesse unilatérale ?",
        answer:
          "Identique au compromis : 10 jours calendaires pour l'acquéreur non professionnel (art. L271-1 CCH).",
        category: "Promesse",
        difficulty: 2,
      },
      {
        id: "te-pr-07",
        question: "Conditions suspensives dans une promesse ?",
        answer:
          "Identiques au compromis : obtention prêt, absence préemption, absence servitude, urbanisme conforme. Même régime juridique.",
        category: "Promesse",
        difficulty: 2,
      },
      {
        id: "te-pr-08",
        question: "Que se passe-t-il si l'acheteur lève l'option ?",
        answer:
          "La vente est parfaite (art. 1589 Code civil). Signature de l'acte authentique dans les délais prévus par la promesse.",
        category: "Promesse",
        difficulty: 3,
      },
    ],
  },
  {
    moduleSlug: "terrain",
    lessonSlug: "fidelisation",
    title: "Fidélisation client",
    cards: [
      {
        id: "te-fi-01",
        question: "Temps moyen entre deux achats immobiliers d'un même client ?",
        answer:
          "Souvent plusieurs années (au gré des évolutions familiales et professionnelles). C'est un horizon de suivi réaliste pour une relation client.",
        category: "Fidélisation",
        difficulty: 1,
      },
      {
        id: "te-fi-02",
        question: "Combien de recommandations moyennes génère un client fidélisé sur 5 ans ?",
        answer:
          "Il n'existe pas de chiffre fiable : mesurez-le vous-même dans votre CRM (part des mandats issus d'une recommandation).",
        category: "Fidélisation",
        difficulty: 2,
      },
      {
        id: "te-fi-03",
        question: "Quand demander un parrainage idéalement ?",
        answer:
          "Au moment de la remise des clés (pic émotionnel) et J+30 post-emménagement (confirmation de la satisfaction).",
        category: "Fidélisation",
        difficulty: 2,
      },
      {
        id: "te-fi-04",
        question: "Coût d'acquisition nouveau client vs fidélisation ?",
        answer:
          "Conquérir un client coûte en général bien plus cher que d'en garder un (adage marketing souvent cité). Un programme de suivi structuré est donc l'un des investissements les plus rentables.",
        category: "Fidélisation",
        difficulty: 2,
      },
      {
        id: "te-fi-05",
        question: "Points de contact minimum avec un client post-vente ?",
        answer:
          "J+7 SMS de prise de nouvelles, J+30 appel, J+90 visite si besoin, carte anniversaire emménagement, newsletter trimestrielle.",
        category: "Fidélisation",
        difficulty: 2,
      },
      {
        id: "te-fi-06",
        question: "Piège : disparaître après la signature ?",
        answer:
          "Beaucoup d'agents ne recontactent jamais leurs clients après la vente. C'est un manque à gagner : recommandations, revente future, réseau du client.",
        category: "Fidélisation",
        difficulty: 3,
      },
      {
        id: "te-fi-07",
        question: "Cadeau pertinent à la remise des clés ?",
        answer:
          "Budget 50-150€. Bouteille artisanale, carte cadeau déco locale, plan de proximité (restos, écoles). Toucher et utile.",
        category: "Fidélisation",
        difficulty: 1,
      },
      {
        id: "te-fi-08",
        question: "Net Promoter Score (NPS) : à quoi ça sert ?",
        answer:
          "Mesure la recommandation client (0-10). NPS = % promoteurs (9-10) - % détracteurs (0-6). Cible agence : >50.",
        category: "Fidélisation",
        difficulty: 3,
      },
      {
        id: "te-fi-09",
        question: "Avis Google : quand le demander ?",
        answer:
          "Dans la semaine qui suit la remise des clés, avec un lien direct, sans contrepartie ni exigence de note. Le taux de réponse est bien meilleur quand la demande arrive au pic de satisfaction.",
        category: "Fidélisation",
        difficulty: 2,
      },
    ],
  },
  {
    moduleSlug: "terrain",
    lessonSlug: "r0-r1-r2",
    title: "R0, R1, R2 — étapes du contact",
    cards: [
      {
        id: "te-rn-01",
        question: "Que signifie R1/R2 en prospection ?",
        answer:
          "Dans le parcours de prise de mandat : R0 = premier échange (souvent téléphonique) de qualification ; R1 = visite du bien et découverte du vendeur ; R2 = présentation de l'estimation et du plan d'action, avec signature du mandat.",
        category: "R0/R1/R2",
        difficulty: 1,
      },
      {
        id: "te-rn-02",
        question: "Qu'est-ce que le R0 ?",
        answer:
          "Le premier échange, souvent téléphonique, avec un vendeur qui vous a contacté ou a accepté d'être rappelé. Objectif : qualifier (motivation, délai, agences consultées, idée du prix) et décider d'un R1.",
        category: "R0/R1/R2",
        difficulty: 2,
      },
      {
        id: "te-rn-03",
        question: "Ratio R1→R2 attendu pour un bon négociateur ?",
        answer:
          "Il dépend de la qualité des contacts. Suivez votre propre ratio R0 → R1 dans le CRM : s'il baisse, revoyez votre accroche ou la source de vos contacts.",
        category: "R0/R1/R2",
        difficulty: 2,
      },
      {
        id: "te-rn-04",
        question: "Ratio R2→mandat signé typique ?",
        answer:
          "Il dépend de la préparation : comparables solides, plan de commercialisation, écoute du projet du vendeur. Mesurez votre propre ratio R2 → mandat et améliorez-le étape par étape.",
        category: "R0/R1/R2",
        difficulty: 2,
      },
      {
        id: "te-rn-05",
        question: "Durée idéale d'un appel R1 ?",
        answer:
          "5 à 8 minutes pour le R0. Objectif unique : qualifier et obtenir le rendez-vous sur place. Pas d'estimation au téléphone, pas de négociation d'honoraires.",
        category: "R0/R1/R2",
        difficulty: 1,
      },
      {
        id: "te-rn-06",
        question: "Piège : donner une estimation au téléphone ?",
        answer:
          "Sans visite du bien = valeur fausse + perte du R2. Si pression, donner une fourchette géographique large (« entre 250 et 320k€ »).",
        category: "R0/R1/R2",
        difficulty: 3,
      },
      {
        id: "te-rn-07",
        question: "Documents à apporter en R2 ?",
        answer:
          "Dossier d'estimation avec 5-10 comparables, plan de commercialisation, exemples de photos pro, contrat de mandat pré-rempli.",
        category: "R0/R1/R2",
        difficulty: 2,
      },
      {
        id: "te-rn-08",
        question: "Structure type d'un R2 réussi ?",
        answer:
          "Accueil (5 min) → visite guidée par le vendeur (15 min) → diagnostic marché (15 min) → proposition et signature (20 min).",
        category: "R0/R1/R2",
        difficulty: 2,
      },
      {
        id: "te-rn-09",
        question: "Combien d'appels de prospection par jour ?",
        answer:
          "Depuis le 11 août 2026, uniquement vers des contacts qui ont donné leur accord (ou des clients sous mandat). La prospection repose d'abord sur le terrain, les courriers, le digital et les recommandations.",
        category: "R0/R1/R2",
        difficulty: 2,
      },
    ],
  },
  {
    moduleSlug: "terrain",
    lessonSlug: "decouverte-client",
    title: "Découverte client",
    cards: [
      {
        id: "te-dc-01",
        question: "Combien de questions poser en découverte acquéreur ?",
        answer:
          "15 à 25 questions structurées. Budget, composition famille, motivation, délai, zones, critères rédhibitoires, financement.",
        category: "Découverte",
        difficulty: 2,
      },
      {
        id: "te-dc-02",
        question: "Méthode QQOQCP : à quoi ça sert ?",
        answer:
          "Qui, Quoi, Où, Quand, Comment, Pourquoi. Cadre systématique pour qualifier un projet sans rien oublier.",
        category: "Découverte",
        difficulty: 2,
      },
      {
        id: "te-dc-03",
        question: "Pourquoi poser la question « Pourquoi vendez-vous ? »",
        answer:
          "Révèle la motivation profonde (divorce, mutation, succession). Permet d'adapter stratégie de commercialisation et urgence.",
        category: "Découverte",
        difficulty: 1,
      },
      {
        id: "te-dc-04",
        question: "Technique de l'entonnoir : comment l'appliquer ?",
        answer:
          "Questions larges (contexte) → moyennes (critères) → précises (non-négociables). Narrowing progressif pour identifier vraie demande.",
        category: "Découverte",
        difficulty: 3,
      },
      {
        id: "te-dc-05",
        question: "Piège : croire le client sur parole à 100% ?",
        answer:
          "Beaucoup d'acquéreurs n'ont pas de budget validé : demandez systématiquement une simulation ou un accord de principe bancaire avant de multiplier les visites.",
        category: "Découverte",
        difficulty: 3,
      },
      {
        id: "te-dc-06",
        question: "Durée recommandée d'un entretien de découverte ?",
        answer:
          "45 à 75 minutes. En dessous : superficiel. Au-dessus : saturation. Viser 60 min en agence ou chez le client.",
        category: "Découverte",
        difficulty: 2,
      },
      {
        id: "te-dc-07",
        question: "Quelles 3 questions clés poser à un acquéreur en premier ?",
        answer:
          "1) Quel est votre horizon de décision ? 2) Votre financement est-il validé ? 3) Avez-vous déjà visité ? Qualifie en 2 min.",
        category: "Découverte",
        difficulty: 1,
      },
      {
        id: "te-dc-08",
        question: "Comment reformuler pour vérifier la compréhension ?",
        answer:
          "« Si je résume, vous cherchez X pour Y, avec un budget Z, dans un délai de W. C'est bien ça ? » Sécurise et crée engagement.",
        category: "Découverte",
        difficulty: 2,
      },
      {
        id: "te-dc-09",
        question: "Pourquoi écrire en temps réel les réponses du client ?",
        answer:
          "Valorise le client (« on m'écoute ») + évite oubli + trace pour le CRM. Demander d'abord l'autorisation par courtoisie.",
        category: "Découverte",
        difficulty: 2,
      },
      {
        id: "te-dc-10",
        question: "Signe d'un client peu qualifié ?",
        answer:
          "Évitement des questions financières, délai flou, critères contradictoires, refus du RDV agence. Passer en nurturing longue durée.",
        category: "Découverte",
        difficulty: 3,
      },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // MODULE DÉONTOLOGIE — 4 leçons
  // ══════════════════════════════════════════════════════════════════════════
  {
    moduleSlug: "deontologie",
    lessonSlug: "non-discrimination",
    title: "Non-discrimination — Cadre légal",
    cards: [
      {
        id: "de-nd-01",
        question: "Combien de critères de discrimination sont définis par l'art. 225-1 du Code pénal ?",
        answer:
          "Plus de vingt critères, dont l'origine, le sexe, la situation de famille, l'état de santé, le handicap, l'orientation sexuelle et la particulière vulnérabilité résultant de la situation économique.",
        category: "Cadre légal",
        difficulty: 1,
      },
      {
        id: "de-nd-02",
        question: "Quelle est la peine maximale pour discrimination dans l'accès au logement ?",
        answer: "3 ans d'emprisonnement et 45 000 € d'amende (art. 225-2 Code pénal).",
        category: "Cadre légal",
        difficulty: 2,
      },
      {
        id: "de-nd-03",
        question: "Différence entre discrimination directe et indirecte ?",
        answer: "Directe : refus explicite fondé sur un critère. Indirecte : règle neutre en apparence mais qui désavantage un groupe (ex. : exiger un CDI exclut systématiquement certains profils).",
        category: "Cadre légal",
        difficulty: 2,
      },
      {
        id: "de-nd-04",
        question: "Qu'est-ce que le testing en matière de discrimination ?",
        answer: "Technique de preuve : deux candidats au profil identique sauf un critère protégé envoient le même dossier. L'écart de traitement constitue une preuve de discrimination.",
        category: "Cadre légal",
        difficulty: 2,
      },
      {
        id: "de-nd-05",
        question: "Refuser un candidat parce qu'il perçoit l'APL est-il discriminatoire ?",
        answer:
          "Oui. La loi du 24 juin 2016 a ajouté à l'article 225-1 du Code pénal le critère de « particulière vulnérabilité résultant de la situation économique ». L'APL fait partie des ressources du candidat.",
        category: "Cadre légal",
        difficulty: 1,
      },
    ],
  },
  {
    moduleSlug: "deontologie",
    lessonSlug: "non-discrimination-pratique",
    title: "Non-discrimination — Pratique",
    cards: [
      {
        id: "de-ndp-01",
        question: "Comment rédiger une annonce non-discriminante ?",
        answer: "Décrire uniquement les caractéristiques objectives du bien (surface, étage, équipements). Bannir toute mention de profil de locataire souhaité.",
        category: "Pratique",
        difficulty: 1,
      },
      {
        id: "de-ndp-02",
        question: "Quels critères sont légaux pour sélectionner un locataire ?",
        answer: "Solvabilité financière (revenus, garant, assurance loyer), adéquation du logement à la taille du foyer. Tout critère lié aux 25 critères protégés est interdit.",
        category: "Pratique",
        difficulty: 2,
      },
      {
        id: "de-ndp-03",
        question: "Que faire si un propriétaire vous demande de refuser les bénéficiaires d'APL ?",
        answer:
          "Refus catégorique : c'est une discrimination liée à la situation économique (loi du 24 juin 2016). Informer le propriétaire, et refuser le mandat s'il maintient sa demande.",
        category: "Pratique",
        difficulty: 2,
      },
      {
        id: "de-ndp-04",
        question: "Quel organisme peut accompagner une victime de discrimination au logement ?",
        answer: "Le Défenseur des droits (saisine gratuite en ligne). Aussi : associations comme SOS Racisme, GISTI, ou les ADIL.",
        category: "Pratique",
        difficulty: 3,
      },
    ],
  },
  {
    moduleSlug: "deontologie",
    lessonSlug: "code-deontologie",
    title: "Code de déontologie",
    cards: [
      {
        id: "de-cd-01",
        question: "Quel texte institue le code de déontologie des agents immobiliers ?",
        answer: "Le décret n°2015-1090 du 28 août 2015, pris en application de la loi ALUR.",
        category: "Déontologie",
        difficulty: 1,
      },
      {
        id: "de-cd-02",
        question: "Quel est le rôle du CNTGI ?",
        answer:
          "Conseil national de la transaction et de la gestion immobilières : instance consultative créée par la loi ALUR, qui veille à la moralité et à la compétence de la profession et participe à l'élaboration de ses règles (code de déontologie, formation continue).",
        category: "Déontologie",
        difficulty: 2,
      },
      {
        id: "de-cd-03",
        question: "Citez les grandes règles du code de déontologie immobilier.",
        answer:
          "Éthique professionnelle, respect des lois (dont non-discrimination et LCB-FT), compétence, organisation de l'entreprise, transparence, confidentialité, défense des intérêts en présence, prévention des conflits d'intérêts, confraternité, règlement amiable des litiges.",
        category: "Déontologie",
        difficulty: 2,
      },
      {
        id: "de-cd-04",
        question: "Quelle obligation de formation le code de déontologie impose-t-il ?",
        answer:
          "Le code impose de respecter les obligations de formation (art. 4), fixées par la loi Hoguet et le décret 2016-173 : 42 heures sur 3 ans (ou 14 h par an), dont 2 h de déontologie et 2 h de non-discrimination, pour renouveler la carte.",
        category: "Déontologie",
        difficulty: 1,
      },
      {
        id: "de-cd-05",
        question: "Que recouvre la prévention des conflits d'intérêts (art. 9) ?",
        answer:
          "Ne pas favoriser ses intérêts au détriment du client : informer le mandant avant d'acheter, ou de faire acheter par un proche, un bien sous mandat ; déclarer ses liens avec les prestataires recommandés et toute rémunération qu'on en tire.",
        category: "Déontologie",
        difficulty: 2,
      },
    ],
  },
  {
    moduleSlug: "deontologie",
    lessonSlug: "ethique-pratique",
    title: "Éthique pratique",
    cards: [
      {
        id: "de-ep-01",
        question: "Qu'est-ce que le double mandant et quelles sont les obligations ?",
        answer: "Représenter à la fois vendeur et acheteur. Obligations : informer les deux parties par écrit, ne pas divulguer le prix plancher du vendeur à l'acheteur, facturer de façon transparente.",
        category: "Éthique",
        difficulty: 2,
      },
      {
        id: "de-ep-02",
        question: "Quelles sont les durées de conservation RGPD en immobilier ?",
        answer: "Candidats locataires non retenus : 3 mois (référentiel CNIL). Prospects : 3 ans après le dernier contact. Pièces LCB-FT : 5 ans après la fin de la relation. Données comptables : 10 ans.",
        category: "RGPD",
        difficulty: 2,
      },
      {
        id: "de-ep-03",
        question: "Délai de notification à la CNIL en cas de violation de données ?",
        answer: "72 heures après avoir eu connaissance de la violation (art. 33 RGPD).",
        category: "RGPD",
        difficulty: 2,
      },
      {
        id: "de-ep-04",
        question: "Un vendeur vous demande de taire l'humidité de la cave aux acheteurs. Que faire ?",
        answer: "Refus. L'art. 1112-1 du Code civil impose de révéler les informations déterminantes pour le consentement. Dissimuler expose à annulation de vente et dommages-intérêts.",
        category: "Éthique",
        difficulty: 2,
      },
      {
        id: "de-ep-05",
        question: "Un acheteur vous propose 2 000 € pour faire accepter son offre sous le prix. Que faire ?",
        answer:
          "Refus catégorique. C'est une corruption passive privée (art. 445-2 du Code pénal) et une violation du devoir de loyauté envers le mandant vendeur.",
        category: "Éthique",
        difficulty: 1,
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// MODULE-LEVEL DECKS — agrégation des decks leçon pour rétrocompatibilité
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Agrégation automatique : un deck "révision module complet" par module,
 * composé de toutes les cartes des leçons correspondantes.
 */
export const ALL_FLASHCARDS: ModuleFlashcards[] = (() => {
  const moduleSlugs = ["juridique", "transaction", "financement", "marketing", "terrain", "deontologie"];
  return moduleSlugs.map((moduleSlug) => ({
    moduleSlug,
    cards: LESSON_FLASHCARDS
      .filter((deck) => deck.moduleSlug === moduleSlug)
      .flatMap((deck) => deck.cards),
  }));
})();

/** Alias rétrocompatible (certains composants legacy peuvent encore l'utiliser). */
export const FLASHCARDS_BY_MODULE = ALL_FLASHCARDS;

// ─────────────────────────────────────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────────────────────────────────────

export function getFlashcardsForModule(moduleSlug: string): Flashcard[] {
  return ALL_FLASHCARDS.find((m) => m.moduleSlug === moduleSlug)?.cards ?? [];
}

/** Récupère un deck module complet (rétrocompatible avec `getFlashcardDeck`). */
export function getFlashcardDeck(moduleSlug: string): ModuleFlashcards | undefined {
  return ALL_FLASHCARDS.find((m) => m.moduleSlug === moduleSlug);
}

/** Cartes d'une leçon précise. */
export function getLessonFlashcards(moduleSlug: string, lessonSlug: string): Flashcard[] {
  return (
    LESSON_FLASHCARDS.find(
      (deck) => deck.moduleSlug === moduleSlug && deck.lessonSlug === lessonSlug
    )?.cards ?? []
  );
}

/** Deck complet d'une leçon (inclut titre). */
export function getLessonDeck(
  moduleSlug: string,
  lessonSlug: string
): LessonFlashcardDeck | undefined {
  return LESSON_FLASHCARDS.find(
    (deck) => deck.moduleSlug === moduleSlug && deck.lessonSlug === lessonSlug
  );
}

/** Tous les decks leçon, utile pour index ou statistiques. */
export function getAllLessonDecks(): LessonFlashcardDeck[] {
  return LESSON_FLASHCARDS;
}

/** Decks leçon d'un module donné. */
export function getLessonDecksForModule(moduleSlug: string): LessonFlashcardDeck[] {
  return LESSON_FLASHCARDS.filter((deck) => deck.moduleSlug === moduleSlug);
}
