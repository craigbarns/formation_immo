/**
 * Questions d'examen par module — mode chronométré avec scoring persistant.
 */

import { FORMATION_MODULES } from "@/data/course";
import { BONUS_MODULE_SLUGS } from "@/lib/formation-journey";
import { balancedPositions, placeAt } from "@/lib/qcm-shuffle";

export type ExamQuestion = {
  id: string;
  question: string;
  type?: "qcm" | "open";
  options?: string[];
  correctIndex?: number;
  modelAnswer?: string;
  explanation: string;
};

export type ModuleExam = {
  moduleSlug: string;
  title: string;
  duration: number; // minutes
  questions: ExamQuestion[];
};

const RAW_MODULE_EXAMS: ModuleExam[] = [
  {
    moduleSlug: "juridique",
    title: "Examen — Juridique & conformité",
    duration: 20,
    questions: [
      {
        id: "j1",
        question:
          "Une agence affiche son barème d'honoraires dans sa vitrine, mais pas sur son site internet. Au regard de l'arrêté du 10 janvier 2017, quelle est sa situation ?",
        options: [
          "En infraction : le barème doit aussi figurer sur le site internet de l'agence",
          "En règle : la réglementation n'impose l'affichage du barème qu'à l'entrée de l'agence",
          "En règle, tant que chaque mandat signé reprend le barème complet de l'agence",
          "En infraction seulement si ses honoraires dépassent 5 % TTC du prix de vente",
        ],
        correctIndex: 0,
        explanation:
          "L'arrêté du 10 janvier 2017 impose l'affichage du barème TTC de façon visible et lisible à l'entrée de l'agence ET sur son site internet. Il n'existe aucun plafond légal d'honoraires en transaction : le seuil de 5 % est une erreur fréquente.",
      },
      {
        id: "j2",
        question:
          "Trois semaines après la signature d'un compromis sans clause de dédit, le vendeur reçoit une offre supérieure de 20 000 €. Que peut-il faire ?",
        options: [
          "Rien : le compromis vaut vente et l'acquéreur peut en exiger l'exécution forcée",
          "Se rétracter librement, puisque le délai de 10 jours s'applique aussi au vendeur",
          "Se désengager en restituant à l'acquéreur le double du dépôt de garantie versé",
          "Accepter la nouvelle offre, s'il prévient l'acquéreur par lettre recommandée",
        ],
        correctIndex: 0,
        explanation:
          "Le compromis est une promesse synallagmatique qui vaut vente (art. 1589 C. civ.) dès l'accord sur la chose et le prix, sous réserve des conditions suspensives. Le délai de rétractation de 10 jours ne profite qu'à l'acquéreur non professionnel ; la restitution du double ne joue que si les parties ont convenu d'arrhes ou d'une faculté de dédit.",
      },
      {
        id: "j3",
        question:
          "Vente d'un appartement en copropriété construit en 1960, dont l'installation électrique a 20 ans. Quels documents le vendeur doit-il fournir, au minimum ?",
        options: [
          "DPE, amiante, électricité, état des risques et mesurage Loi Carrez",
          "DPE, plomb, amiante, électricité et mesurage Loi Carrez du lot vendu",
          "DPE et état des risques ; les autres diagnostics restent facultatifs",
          "DPE, plomb, termites et électricité, quelle que soit la commune du bien",
        ],
        correctIndex: 0,
        explanation:
          "Amiante : permis de construire antérieur au 1er juillet 1997. Électricité : installation de plus de 15 ans. DPE et état des risques : toujours. Mesurage Carrez : lot de copropriété. Le constat plomb (CREP) ne concerne que les logements construits avant le 1er janvier 1949, et le termites uniquement les zones délimitées par arrêté.",
      },
      {
        id: "j4",
        question:
          "Pendant la durée d'un mandat exclusif, le vendeur cède lui-même son bien à un voisin, sans l'agence. À quoi s'expose-t-il ?",
        options: [
          "À la clause pénale du mandat, si elle y figure en caractères très apparents",
          "À rien : un vendeur reste toujours libre de vendre seul, même sous mandat exclusif",
          "À l'annulation de la vente, l'agence pouvant se substituer à l'acquéreur choisi",
          "Au versement automatique du double de la commission prévue au mandat exclusif",
        ],
        correctIndex: 0,
        explanation:
          "Le mandat exclusif interdit au vendeur de vendre par lui-même ou par un tiers pendant sa durée. La sanction est la clause pénale, opposable seulement si elle est stipulée en caractères très apparents dans un mandat dont le vendeur a reçu un exemplaire (décret n° 72-678, art. 78) ; le juge peut la modérer. La vente au voisin reste valable.",
      },
      {
        id: "j5",
        question:
          "Un agent demande le renouvellement de sa carte professionnelle à la CCI. Que doit-il justifier au titre de la formation continue ?",
        options: [
          "42 heures sur trois ans, dont des heures de déontologie et de non-discrimination",
          "14 heures suivies durant la dernière année, le reste n'étant pas contrôlé par la CCI",
          "Aucune heure : seuls les négociateurs salariés sont tenus à la formation continue",
          "Un diplôme de niveau bac + 3 en immobilier obtenu depuis moins de cinq ans",
        ],
        correctIndex: 0,
        explanation:
          "Décret n° 2016-173 : 14 heures par an ou 42 heures sur trois années consécutives, contrôlées au renouvellement triennal de la carte, avec des heures obligatoires de déontologie et de non-discrimination (décret n° 2020-1259). L'obligation vise les titulaires de carte, les directeurs d'établissement et les collaborateurs.",
      },
      {
        id: "j6",
        question:
          "Un compromis est remis en main propre contre récépissé à l'acquéreur, particulier, le 3 mars. Jusqu'à quand peut-il se rétracter ?",
        options: [
          "Jusqu'au 13 mars à minuit, le délai courant à partir du lendemain de la remise",
          "Jusqu'au 12 mars à minuit, le délai courant dès le jour même de la remise",
          "Jusqu'au 17 mars à minuit, le délai légal étant de quatorze jours calendaires",
          "Il ne peut plus se rétracter : la remise en main propre vaut acceptation définitive",
        ],
        correctIndex: 0,
        explanation:
          "Article L.271-1 du CCH : 10 jours à compter du lendemain de la première présentation de la lettre recommandée ou de la remise en main propre. Remise le 3 mars : le délai court du 4 au 13 mars inclus. Le délai de 14 jours relève du droit de la consommation (contrats hors établissement), pas de l'achat immobilier.",
      },
      {
        id: "j7",
        question:
          "Pour la vente d'un lot de copropriété, que faut-il annexer à la promesse de vente (art. L.721-2 CCH) ?",
        options: [
          "Les PV des trois dernières AG, le règlement de copropriété et les données financières du lot",
          "Le seul état daté, que le syndic établit après la signature de l'acte authentique de vente",
          "Le dernier appel de charges et le carnet d'entretien ; le reste est remis chez le notaire",
          "Aucun document : le notaire les obtient directement auprès du syndic avant l'acte définitif",
        ],
        correctIndex: 0,
        explanation:
          "L'article L.721-2 du CCH impose d'annexer à la promesse les documents d'organisation de l'immeuble (règlement, fiche synthétique, PV des AG des trois dernières années), les informations financières (charges, impayés, fonds de travaux) et le carnet d'entretien. L'état daté intervient plus tard, pour l'acte authentique.",
      },
      {
        id: "j8",
        question:
          "Un vendeur particulier insère dans l'acte une clause excluant la garantie des vices cachés. Que vaut cette clause ?",
        options: [
          "Elle le protège, sauf s'il connaissait le vice : sa mauvaise foi l'écarte",
          "Elle est toujours réputée non écrite, même entre deux particuliers de bonne foi",
          "Elle le protège totalement, même s'il connaissait le vice et l'a dissimulé",
          "Elle ne vaut que si l'acquéreur est lui-même un professionnel de l'immobilier",
        ],
        correctIndex: 0,
        explanation:
          "Article 1643 du Code civil : le vendeur peut stipuler qu'il ne sera tenu d'aucune garantie. La clause est valable pour un vendeur non professionnel de bonne foi, mais inopérante s'il connaissait le vice. Le vendeur professionnel, lui, est présumé connaître les vices : la clause lui est inopposable.",
      },
      {
        id: "j9",
        question:
          "Un prospect acquéreur n'a plus donné signe de vie depuis sa dernière visite. Combien de temps l'agence peut-elle conserver ses données pour le prospecter ?",
        options: [
          "Trois ans après son dernier contact, puis suppression ou anonymisation des données",
          "Indéfiniment, tant que l'agence reste en activité et que le fichier reste confidentiel",
          "Cinq ans, durée de prescription de droit commun imposée par le RGPD à tout professionnel",
          "Un mois après la dernière visite, faute de consentement écrit renouvelé du prospect",
        ],
        correctIndex: 0,
        explanation:
          "Pour la prospection, la CNIL retient trois ans à compter de la collecte ou du dernier contact émanant du prospect ; chaque nouveau contact relance le délai. Ensuite, les données sont supprimées ou anonymisées. Le RGPD n'impose aucune durée fixe de cinq ans : il exige une durée proportionnée à la finalité.",
      },
      {
        id: "j10",
        question:
          "L'exemplaire du mandat de vente remis au vendeur ne porte pas son numéro d'inscription au registre des mandats. Quelle est la conséquence ?",
        options: [
          "Le vendeur peut en obtenir l'annulation et priver ainsi l'agent de sa commission",
          "Aucune : le numéro peut être reporté sur le mandat après la signature de la vente",
          "L'acquéreur peut invoquer la nullité du mandat pour faire baisser le prix de vente",
          "Le mandat reste valable, mais la commission est réduite de moitié par la loi Hoguet",
        ],
        correctIndex: 0,
        explanation:
          "Le numéro d'inscription au registre est une mention obligatoire (loi Hoguet, décret n° 72-678). Depuis l'arrêt de chambre mixte du 24 février 2017 (n° 15-20.411), la violation des règles de forme du mandat, qui protègent le mandant, est sanctionnée par une nullité relative : seul le mandant peut l'invoquer — et l'agent perd alors son droit à commission (loi Hoguet, art. 6).",
      },
      {
        id: "j11",
        question:
          "Depuis le 1er janvier 2025, quel logement ne peut plus faire l'objet d'un nouveau bail en métropole ?",
        options: [
          "Un logement classé G au DPE, désormais jugé non décent",
          "Un logement classé F au DPE, désormais jugé non décent",
          "Tout logement classé F, mais uniquement en zone tendue",
          "Tout logement dont le DPE a été établi il y a plus de 5 ans",
        ],
        correctIndex: 0,
        explanation:
          "Décence énergétique (loi Climat & Résilience) : logements G non décents depuis le 1er janvier 2025, F à compter du 1er janvier 2028, E en 2034, dans toute la France. Un logement F reste donc louable jusqu'au 31 décembre 2027, loyer gelé. Un DPE est valable 10 ans ; ceux établis avant juillet 2021 ont tous expiré.",
      },
      {
        id: "j12",
        question:
          "Un acquéreur veut payer comptant via une société étrangère, mais refuse d'en identifier les associés. Que doit faire l'agent ?",
        options: [
          "Ne rien signer sans identifier le bénéficiaire effectif ; envisager une déclaration",
          "Poursuivre : sans paiement en espèces, la vigilance anti-blanchiment ne s'applique pas",
          "Prévenir l'acquéreur qu'une déclaration de soupçon va être transmise à TRACFIN",
          "Poursuivre, puis déclarer à TRACFIN uniquement si le prix dépasse un million d'euros",
        ],
        correctIndex: 0,
        explanation:
          "Faute de pouvoir identifier le client et son bénéficiaire effectif, le professionnel ne doit pas exécuter l'opération (art. L.561-8 CMF) et apprécie une déclaration de soupçon. Il n'existe aucun seuil de montant, et révéler l'existence d'une déclaration au client est interdit (interdiction de divulgation).",
      },
      {
        id: "j13",
        question:
          "Dans lequel de ces cas l'acquéreur bénéficie-t-il du délai de rétractation de 10 jours de l'article L.271-1 du CCH ?",
        options: [
          "Un particulier qui achète un appartement pour le mettre en location",
          "Un particulier qui achète un local commercial pour y installer un bureau",
          "Un marchand de biens qui achète un logement pour le revendre ensuite",
          "Toute acquisition immobilière, quels que soient l'acquéreur et le bien",
        ],
        correctIndex: 0,
        explanation:
          "Le délai protège l'acquéreur non professionnel d'un immeuble à usage d'habitation, y compris pour un investissement locatif. Il ne s'applique ni à un local commercial ni à un acquéreur professionnel de l'immobilier comme le marchand de biens.",
      },
    ],
  },
  {
    moduleSlug: "transaction",
    title: "Examen — Transaction & négociation",
    duration: 20,
    questions: [
      {
        id: "t1",
        question:
          "Pour estimer un T3, vous disposez de quatre sources. Laquelle doit primer dans votre avis de valeur ?",
        options: [
          "Les ventes récentes de biens comparables du secteur (DVF, notaires)",
          "Les prix affichés par les annonces concurrentes actuellement en ligne",
          "Le prix payé par le vendeur à l'achat, revalorisé de l'inflation depuis",
          "Le coût de reconstruction à neuf, diminué d'un abattement pour vétusté",
        ],
        correctIndex: 0,
        explanation:
          "La méthode par comparaison repose sur des prix de vente réellement signés (base DVF, bases notariales), ajustés selon les écarts (étage, état, extérieur…). Les prix affichés sont des prix demandés, souvent surévalués ; le prix d'achat historique et le coût de reconstruction ne disent rien du marché actuel.",
      },
      {
        id: "t2",
        question:
          "Octobre 2026. Un particulier vend sa maison sur Leboncoin. Pouvez-vous l'appeler pour lui proposer un mandat ?",
        options: [
          "Non, sauf s'il a accepté au préalable d'être démarché par téléphone",
          "Oui, à condition que son numéro ne soit pas inscrit sur la liste Bloctel",
          "Oui : en publiant son numéro dans l'annonce, il accepte d'être sollicité",
          "Oui, si vous l'appelez en semaine entre 10 h et 13 h ou entre 14 h et 20 h",
        ],
        correctIndex: 0,
        explanation:
          "Depuis le 11 août 2026 (loi du 30 juin 2025, art. L.223-1 C. conso.), le démarchage téléphonique d'un particulier exige son consentement préalable, spécifique au téléphone, valable un an au plus et dont le professionnel doit garder la preuve. Bloctel a disparu ; une annonce publique ne vaut pas consentement. Les plages horaires restent applicables, mais en plus du consentement.",
      },
      {
        id: "t3",
        question:
          "Un vendeur exige un prix 20 % au-dessus de vos comparables. Quelle approche limite le risque d'un mandat invendable ?",
        options: [
          "Montrer les comparables et convenir d'un réajustement daté si les visites manquent",
          "Accepter son prix sans discuter : le marché le convaincra seul de baisser plus tard",
          "Publier un prix inférieur au sien sans le prévenir, pour générer des premières visites",
          "Lui garantir par écrit la vente à son prix pour obtenir à coup sûr l'exclusivité",
        ],
        correctIndex: 0,
        explanation:
          "Le prix doit rester celui du mandat : le modifier sans accord est une faute. Accepter un prix irréaliste produit un bien « brûlé » sur les portails. La bonne pratique : objectiver avec des ventes comparables, fixer avec le vendeur un point d'étape daté (nombre de visites, retours) et un réajustement convenu à l'avance.",
      },
      {
        id: "t4",
        question:
          "Dans la méthode SPIN, à quoi sert une question d'« implication » ?",
        options: [
          "À faire mesurer au client les conséquences de son problème s'il n'agit pas",
          "À recueillir les faits de base : budget, délai, composition du foyer",
          "À faire formuler par le client les bénéfices de la solution proposée",
          "À identifier les difficultés ou les insatisfactions actuelles du client",
        ],
        correctIndex: 0,
        explanation:
          "SPIN : Situation (les faits), Problème (les difficultés), Implication (les conséquences si rien ne change — c'est elle qui crée l'urgence), Need-payoff ou bénéfice (le client formule lui-même la valeur de la solution).",
      },
      {
        id: "t5",
        question:
          "Dans votre CRM, quel indicateur mesure le mieux la qualité de votre travail de prise de mandat ?",
        options: [
          "Le taux de transformation des estimations en mandats signés",
          "Le nombre total de contacts enregistrés dans la base de l'agence",
          "Le nombre d'appels sortants passés chaque jour par le négociateur",
          "Le nombre de biens publiés ce mois-ci sur les portails immobiliers",
        ],
        correctIndex: 0,
        explanation:
          "Le volume (contacts, appels, annonces) mesure l'activité, pas son efficacité. Le ratio estimations → mandats montre la capacité à convaincre un vendeur ; complété par le ratio mandats → ventes, il révèle aussi la justesse des prix rentrés.",
      },
      {
        id: "t6",
        question:
          "« 5 % de commission, c'est trop : l'agence d'en face prend 4 %. » Quelle réponse est la plus professionnelle ?",
        options: [
          "Détailler votre plan de commercialisation et ce qu'il rapporte au vendeur en net",
          "Aligner tout de suite votre taux sur le concurrent pour ne pas perdre ce mandat",
          "Critiquer les méthodes de l'agence concurrente pour justifier l'écart de prix",
          "Accepter 4 % à l'oral et laisser 5 % au mandat, pour garder de la souplesse",
        ],
        correctIndex: 0,
        explanation:
          "On répond à une objection de prix par la valeur : diffusion, qualification des acquéreurs, sécurisation du dossier, prix net obtenu. Dénigrer un confrère est contraire au code de déontologie, et les honoraires doivent figurer exactement au mandat : un accord oral différent est inopposable et source de litige.",
      },
      {
        id: "t7",
        question:
          "Un négociateur rentre 10 mandats par mois mais n'en vend qu'un seul. Que révèle d'abord ce ratio ?",
        options: [
          "Des prix sans doute surévalués : la qualité des mandats pose problème",
          "Une très bonne performance, puisque seul le volume de mandats rentrés compte",
          "Un manque de prospection : il faut doubler le nombre d'appels chaque semaine",
          "Un défaut de diffusion : il faut multiplier les options payantes des portails",
        ],
        correctIndex: 0,
        explanation:
          "Un taux de vente de 10 % signale presque toujours des mandats rentrés au-dessus du marché (souvent en mandat simple, pour « faire du stock »). Davantage de prospection ou de diffusion ne corrige pas un prix irréaliste.",
      },
      {
        id: "t8",
        question:
          "Un acquéreur propose 6 % sous le prix ; le vendeur refuse de baisser. Quelle piste explorer en priorité ?",
        options: [
          "Des contreparties hors prix : date de libération, mobilier, délais",
          "Ne plus transmettre au vendeur que les offres qui atteignent le prix du mandat",
          "Baisser votre commission sans en informer le vendeur pour combler l'écart",
          "Conseiller à l'acquéreur de signer au prix et de renégocier après le compromis",
        ],
        correctIndex: 0,
        explanation:
          "Une négociation gagnant-gagnant élargit le champ des variables au-delà du prix. L'agent doit informer loyalement son mandant de toutes les offres ; toute modification de ses honoraires passe par un avenant ; et pousser à signer avec l'intention de renégocier est déloyal.",
      },
      {
        id: "t9",
        question:
          "Un acquéreur signe une offre d'achat et veut y joindre un chèque de 5 000 € « pour montrer son sérieux ». Que faites-vous ?",
        options: [
          "Vous refusez le chèque : tout versement rendrait l'offre d'achat nulle",
          "Vous le déposez sur le compte séquestre de l'agence jusqu'au compromis",
          "Vous l'acceptez, à condition qu'il soit libellé à l'ordre du vendeur",
          "Vous l'acceptez si son montant reste inférieur à 10 % du prix proposé",
        ],
        correctIndex: 0,
        explanation:
          "Article 1589-1 du Code civil : est nul tout engagement unilatéral d'acquérir un bien immobilier pour lequel un versement est exigé ou reçu, quelle qu'en soit la forme. L'offre d'achat ne s'accompagne d'aucun versement ; le dépôt de garantie n'intervient qu'à l'avant-contrat.",
      },
      {
        id: "t10",
        question:
          "Lequel de ces envois commerciaux par e-mail ou SMS est autorisé sans consentement préalable ?",
        options: [
          "Une newsletter immobilière à un ancien client vendeur, avec lien de désinscription",
          "Une newsletter adressée à un fichier de particuliers acheté à un courtier en données",
          "Un SMS proposant une estimation à tous les numéros relevés sur des annonces de particuliers",
          "Un e-mail personnalisé à un prospect qui s'est déjà désinscrit de votre liste de diffusion",
        ],
        correctIndex: 0,
        explanation:
          "La prospection électronique d'un particulier exige son consentement préalable (art. L.34-5 CPCE), sauf s'il est déjà client et que l'offre porte sur des services analogues, avec une possibilité simple de s'opposer à chaque envoi. Une désinscription est définitive ; un fichier acheté ou des numéros relevés sur des annonces ne valent pas consentement.",
      },
      {
        id: "t11",
        question:
          "Un emprunteur a pris en 2024 l'assurance de sa banque. Peut-il en changer aujourd'hui ?",
        options: [
          "Oui, à tout moment et sans frais, à garanties équivalentes",
          "Seulement à la date anniversaire, avec un préavis de deux mois",
          "Seulement dans les douze mois suivant la signature de l'offre",
          "Non : l'assurance est figée pour toute la durée du prêt signé",
        ],
        correctIndex: 0,
        explanation:
          "Depuis la loi Lemoine (2022), l'assurance emprunteur peut être résiliée à tout moment, sans frais, pour tous les contrats, sous réserve d'une équivalence de garanties. Les deux autres délais correspondent aux anciens régimes (loi Hamon : 12 mois ; amendement Bourquin : date anniversaire).",
      },
      {
        id: "t12",
        question:
          "Dans une promesse unilatérale de vente, le bénéficiaire laisse expirer le délai d'option sans la lever. Conséquence ?",
        options: [
          "Le vendeur garde l'indemnité d'immobilisation, sauf condition suspensive défaillie",
          "Le vendeur peut exiger en justice qu'il achète le bien au prix fixé dans la promesse",
          "La vente se forme automatiquement à l'expiration du délai, faute de refus exprès",
          "Le bénéficiaire doit verser au vendeur le double de l'indemnité d'immobilisation",
        ],
        correctIndex: 0,
        explanation:
          "Dans la promesse unilatérale, seul le vendeur s'engage ; le bénéficiaire achète une option, rémunérée par l'indemnité d'immobilisation (souvent 10 %). S'il ne lève pas l'option, la vente ne se forme pas et l'indemnité reste acquise au vendeur, sauf si une condition suspensive (prêt…) a défailli. À l'inverse, le compromis engage les deux parties.",
      },
      {
        id: "t13",
        question:
          "À la signature d'un compromis négocié par une agence, l'acquéreur particulier verse un dépôt de garantie. Qui peut le recevoir ?",
        options: [
          "Le notaire, ou l'agence si elle a une garantie financière pour détenir des fonds",
          "Le vendeur directement, qui l'encaisse dès la signature pour sécuriser la vente",
          "L'agence dans tous les cas, sur son compte courant, jusqu'à l'acte authentique",
          "La banque de l'acquéreur, qui le bloque jusqu'à l'obtention définitive du prêt",
        ],
        correctIndex: 0,
        explanation:
          "Article L.271-2 du CCH : le versement ne peut être reçu que par un professionnel disposant d'une garantie financière affectée au remboursement des fonds (agent habilité à détenir des fonds, notaire). En cas de rétractation, il est restitué dans les 21 jours suivant le lendemain de la rétractation.",
      },
    ],
  },
  {
    moduleSlug: "financement",
    title: "Examen — Financement & fiscalité",
    duration: 20,
    questions: [
      {
        id: "f1",
        question:
          "Un couple gagne 5 000 € nets par mois et n'a aucun autre crédit. Selon la norme HCSF, quelle mensualité maximale peut-il supporter ?",
        options: [
          "1 750 €, assurance emprunteur comprise",
          "1 750 €, assurance emprunteur en plus",
          "1 650 €, soit le seuil historique de 33 %",
          "2 000 €, la banque pouvant aller à 40 %",
        ],
        correctIndex: 0,
        explanation:
          "La norme HCSF, juridiquement contraignante depuis 2022, plafonne le taux d'effort à 35 % des revenus nets, assurance emprunteur comprise, et la durée à 25 ans (27 ans avec différé). Les banques peuvent y déroger pour 20 % de leur production, en priorité pour la résidence principale : ce n'est pas un droit pour l'emprunteur.",
      },
      {
        id: "f2",
        question:
          "Studio acheté 150 000 € frais inclus, loué 650 €/mois. Charges non récupérables 600 €/an, taxe foncière 900 €/an, assurance PNO 150 €/an. Rentabilité nette avant impôt ?",
        options: ["4,1 %", "5,2 %", "4,7 %", "3,5 %"],
        correctIndex: 0,
        explanation:
          "Loyers annuels : 650 × 12 = 7 800 €. Charges : 600 + 900 + 150 = 1 650 €. Rentabilité nette : (7 800 − 1 650) / 150 000 = 4,1 %. 5,2 % est la rentabilité brute (7 800 / 150 000) ; 4,7 % oublie la taxe foncière.",
      },
      {
        id: "f3",
        question:
          "En 2026, un client veut acheter un appartement neuf « en Pinel » pour réduire ses impôts. Que lui répondez-vous ?",
        options: [
          "C'est impossible : le Pinel est fermé aux achats réalisés après 2024",
          "Il obtiendra 21 % de réduction d'impôt pour un engagement de 12 ans",
          "Il doit choisir un bien situé en zone C pour être éligible au Pinel",
          "Le Pinel ne vise plus que les logements anciens rénovés depuis 2025",
        ],
        correctIndex: 0,
        explanation:
          "Le dispositif Pinel a pris fin le 31 décembre 2024 : seuls les investisseurs entrés avant cette date conservent leur réduction d'impôt. Les taux de 21 % sur 12 ans correspondaient au Pinel « + » ou aux années antérieures, et la zone C n'a jamais été éligible.",
      },
      {
        id: "f4",
        question:
          "Un emprunteur en arrêt maladie de longue durée ne peut plus travailler. Quelle garantie de son assurance de prêt prend le relais des échéances ?",
        options: [
          "La garantie ITT (incapacité temporaire totale de travail)",
          "La garantie PTIA (perte totale et irréversible d'autonomie)",
          "La garantie perte d'emploi, incluse d'office dans le contrat",
          "La garantie décès, qui couvre aussi les arrêts de travail",
        ],
        correctIndex: 0,
        explanation:
          "L'ITT prend en charge les échéances pendant un arrêt de travail, après un délai de franchise (souvent 90 jours). La PTIA vise une dépendance totale et définitive ; la perte d'emploi est une option facultative, rarement souscrite.",
      },
      {
        id: "f5",
        question:
          "Un loueur en meublé (LMNP au réel) a déduit 40 000 € d'amortissements. Il revend son appartement en 2026. Quelle conséquence fiscale ?",
        options: [
          "Ces amortissements sont réintégrés dans le calcul de sa plus-value",
          "Aucune : les amortissements déduits restent définitivement acquis",
          "Il doit rembourser ces amortissements au Trésor dans l'année",
          "Il bascule automatiquement au statut LMP pour l'année de revente",
        ],
        correctIndex: 0,
        explanation:
          "Depuis la loi de finances 2025 (cessions à compter du 15 février 2025), les amortissements déduits par un LMNP au réel viennent minorer le prix d'acquisition, ce qui augmente la plus-value imposable. Les résidences services (étudiantes, seniors, EHPAD) sont exclues de cette réintégration.",
      },
      {
        id: "f6",
        question:
          "Lequel de ces acquéreurs peut prétendre au prêt à taux zéro (PTZ) ?",
        options: [
          "Un couple locataire depuis 10 ans, sous plafonds, pour sa résidence principale",
          "Un investisseur qui achète un studio neuf pour le louer en résidence étudiante",
          "Un propriétaire de sa résidence principale qui en achète une plus grande",
          "Un acquéreur aux revenus élevés, au-dessus des plafonds, en zone tendue",
        ],
        correctIndex: 0,
        explanation:
          "Le PTZ finance la résidence principale d'un primo-accédant — personne n'ayant pas été propriétaire de sa résidence principale au cours des deux dernières années — sous plafonds de ressources. L'investissement locatif en est exclu.",
      },
      {
        id: "f7",
        question:
          "Un particulier revend un appartement locatif détenu depuis 25 ans. Comment sa plus-value est-elle taxée ?",
        options: [
          "Exonérée d'impôt sur le revenu, encore taxée en partie aux prélèvements sociaux",
          "Totalement exonérée, puisque l'exonération complète intervient après 22 ans",
          "Imposée au barème progressif de l'impôt sur le revenu, sans aucun abattement",
          "Exonérée de prélèvements sociaux, mais encore taxée à l'impôt sur le revenu",
        ],
        correctIndex: 0,
        explanation:
          "Les abattements pour durée de détention exonèrent la plus-value d'impôt sur le revenu (19 %) après 22 ans, mais de prélèvements sociaux (17,2 %) seulement après 30 ans. À 25 ans, il reste donc des prélèvements sociaux sur une fraction de la plus-value. La résidence principale, elle, est exonérée sans condition de durée.",
      },
      {
        id: "f8",
        question:
          "Une banque refuse un prêt alors que le taux nominal proposé est inférieur au taux d'usure. Comment l'expliquer ?",
        options: [
          "Le TAEG, assurance et frais compris, dépassait le taux d'usure",
          "L'usure se compare au taux nominal majoré d'un point de sécurité",
          "Le taux d'usure ne vise que les prêts d'une durée supérieure à 25 ans",
          "La banque doit rester à un point sous l'usure par règle de prudence",
        ],
        correctIndex: 0,
        explanation:
          "Le taux d'usure est le taux maximal légal, fixé par la Banque de France. Il se compare au TAEG, qui inclut intérêts, assurance emprunteur, frais de dossier et de garantie : une assurance chère peut à elle seule faire franchir le seuil.",
      },
      {
        id: "f9",
        question:
          "Un bailleur en location nue perçoit 5 000 € de loyers, paie 3 000 € d'intérêts et 18 000 € de travaux d'entretien. Que peut-il imputer sur son revenu global ?",
        options: [
          "10 700 €, le solde de 5 300 € étant reportable sur ses revenus fonciers",
          "16 000 €, l'intégralité du déficit foncier, sans aucun plafonnement",
          "0 € : un déficit foncier ne s'impute que sur les revenus fonciers futurs",
          "10 700 €, le reste du déficit étant définitivement perdu pour le bailleur",
        ],
        correctIndex: 0,
        explanation:
          "Les intérêts s'imputent d'abord sur les loyers : 5 000 − 3 000 = 2 000 €. Les travaux créent ensuite un déficit de 16 000 €, imputable sur le revenu global dans la limite de 10 700 € par an. Les 5 300 € restants se reportent sur les revenus fonciers des dix années suivantes, à condition de louer le bien jusqu'au 31 décembre de la troisième année suivant l'imputation.",
      },
      {
        id: "f10",
        question:
          "Un emprunteur présente à sa banque une assurance externe pour remplacer la sienne. La banque peut-elle refuser ?",
        options: [
          "Seulement si les garanties ne sont pas équivalentes, par un refus motivé",
          "Oui, librement, sans avoir à motiver sa décision auprès de l'emprunteur",
          "Non, jamais, même si les garanties proposées sont nettement inférieures",
          "Oui, si l'assurance externe coûte moins cher que le contrat de la banque",
        ],
        correctIndex: 0,
        explanation:
          "La banque ne peut refuser la délégation d'assurance que pour défaut d'équivalence de garanties, par une décision écrite et motivée, dans les 10 jours ouvrés suivant la demande (Code de la consommation). Elle ne peut ni modifier le taux du prêt ni facturer de frais pour ce changement.",
      },
      {
        id: "f11",
        question:
          "Un investisseur loue nu via une SCI à l'impôt sur les sociétés. Quel est le principal point de vigilance à la revente ?",
        options: [
          "La plus-value se calcule sur la valeur nette comptable, après amortissements",
          "La plus-value est exonérée après 22 ans de détention, comme pour une SCI à l'IR",
          "Les loyers ont déjà supporté 17,2 % de prélèvements sociaux chaque année",
          "Une SCI à l'IS ne peut pas amortir le bâtiment qu'elle a acquis et loue",
        ],
        correctIndex: 0,
        explanation:
          "À l'IS, la SCI amortit le bâtiment, ce qui réduit l'impôt pendant la détention ; mais la plus-value professionnelle se calcule sur la valeur nette comptable, sans abattement pour durée de détention. Elle est souvent lourde après de longues années d'amortissement, et la distribution du prix aux associés est ensuite taxée comme un dividende.",
      },
      {
        id: "f12",
        question:
          "Un investisseur achète la nue-propriété d'un logement pour 15 ans, un bailleur institutionnel en ayant l'usufruit. Que se passe-t-il ?",
        options: [
          "Il ne perçoit aucun loyer, puis récupère la pleine propriété sans impôt au terme",
          "Il perçoit les loyers, l'usufruitier se limitant à gérer le bien à sa place",
          "Il paie l'IFI sur la pleine valeur du bien pendant toute la durée du démembrement",
          "Il déduit de ses revenus imposables les loyers encaissés par l'usufruitier",
        ],
        correctIndex: 0,
        explanation:
          "Le nu-propriétaire achète avec une décote (souvent 30 à 40 %) correspondant aux loyers abandonnés. Il n'a ni revenus fonciers à déclarer ni IFI (dû par l'usufruitier), et la réunion de l'usufruit à la nue-propriété au terme n'est pas taxée.",
      },
      {
        id: "f13",
        question:
          "Un bailleur perçoit 12 000 € de loyers nus par an. Peut-il relever du régime micro-foncier ?",
        options: [
          "Oui, avec un abattement forfaitaire de 30 % sur ses loyers",
          "Oui, avec un abattement forfaitaire de 50 % sur ses loyers",
          "Non : le micro-foncier s'arrête à 10 000 € de loyers par an",
          "Non : la location nue relève toujours du régime réel d'office",
        ],
        correctIndex: 0,
        explanation:
          "Le micro-foncier s'applique de droit sous 15 000 € de loyers nus annuels, avec un abattement forfaitaire de 30 % censé couvrir toutes les charges. Le bailleur peut opter pour le réel s'il a davantage de charges (travaux, intérêts). L'abattement de 50 % est celui du micro-BIC en location meublée de longue durée.",
      },
    ],
  },
  {
    moduleSlug: "marketing",
    title: "Examen — Marketing digital immobilier",
    duration: 20,
    questions: [
      {
        id: "m1",
        question:
          "Pour la photo principale d'un séjour, quelle pratique donne le rendu le plus fidèle et le plus vendeur ?",
        options: [
          "Lumière du jour, lampes allumées, appareil à hauteur de poitrine, verticales droites",
          "Flash direct en pleine face, pour éclaircir les coins sombres de la pièce photographiée",
          "Objectif fisheye, pour faire paraître la pièce nettement plus grande qu'en réalité",
          "Cadrage serré sur un détail de décoration, pour intriguer et pousser au clic",
        ],
        correctIndex: 0,
        explanation:
          "La photo de référence : lumière naturelle complétée par l'éclairage intérieur, grand angle raisonnable (16–24 mm équivalent), appareil vers 1,20–1,50 m et verticales redressées. Le flash direct écrase les volumes ; un fisheye déforme et déçoit à la visite.",
      },
      {
        id: "m2",
        question:
          "Dans une liste de résultats sur un portail, qu'est-ce qui décide d'abord du clic sur une annonce ?",
        options: [
          "La photo principale, avec le prix et la surface",
          "La longueur du texte de description du bien",
          "Le nom et le logo de l'agence qui diffuse le bien",
          "Le nombre total de photos publiées dans l'annonce",
        ],
        correctIndex: 0,
        explanation:
          "Dans la liste de résultats, l'internaute ne voit que la vignette : photo principale, prix, surface, localisation. Le texte et le nombre de photos jouent ensuite, une fois l'annonce ouverte.",
      },
      {
        id: "m3",
        question:
          "Annonce d'un bien vendu 300 000 € honoraires inclus, avec des honoraires à la charge de l'acquéreur. Quelles mentions de prix sont obligatoires ?",
        options: [
          "Le prix honoraires inclus, le prix hors honoraires et le taux d'honoraires",
          "Le seul prix honoraires inclus : le détail figure au barème de l'agence",
          "Le prix net vendeur seulement, les honoraires étant facturés à part",
          "Le prix hors honoraires et la mention « frais d'agence en sus »",
        ],
        correctIndex: 0,
        explanation:
          "L'arrêté du 10 janvier 2017 impose, lorsque les honoraires sont à la charge de l'acquéreur, d'afficher le prix honoraires inclus, le prix hors honoraires et le montant des honoraires TTC exprimé en pourcentage du prix hors honoraires.",
      },
      {
        id: "m4",
        question:
          "Vous publiez l'annonce de vente d'un appartement classé F. Que doit-elle mentionner au titre de l'énergie ?",
        options: [
          "Classes énergie et climat, dépenses estimées, mention « consommation excessive »",
          "La seule classe énergie, la classe climat restant facultative pour une vente",
          "La classe énergie, et le fait qu'un logement F ne peut plus être loué en 2026",
          "Rien avant le compromis : le DPE est uniquement remis à l'acquéreur chez le notaire",
        ],
        correctIndex: 0,
        explanation:
          "Toute annonce de vente ou de location doit afficher les classes énergie et climat du DPE et l'estimation des dépenses annuelles d'énergie. Pour les logements F et G, elle doit en plus porter la mention « logement à consommation énergétique excessive ». Un logement F reste louable jusqu'au 31 décembre 2027.",
      },
      {
        id: "m5",
        question:
          "Quel levier améliore le plus vite la visibilité d'une agence sur les recherches « agence immobilière + ville » ?",
        options: [
          "Une fiche Google Business Profile complète, active et riche en avis",
          "L'achat de centaines de liens sur des annuaires de sites étrangers",
          "La répétition du nom de la ville en texte caché dans le pied de page",
          "La copie des descriptions d'annonces des agences concurrentes du secteur",
        ],
        correctIndex: 0,
        explanation:
          "Les recherches locales affichent d'abord le « pack local » de Google Maps, alimenté par la fiche Google Business Profile : catégories, horaires, photos, publications et surtout avis récents. Liens achetés, texte caché et contenu dupliqué sont pénalisés par Google.",
      },
      {
        id: "m6",
        question:
          "Un agent offre 200 € de remise aux clients qui publient un avis 5 étoiles sur sa fiche Google. Est-ce permis ?",
        options: [
          "Non : récompenser un avis positif fausse les avis et constitue une pratique trompeuse",
          "Oui, si la remise est clairement mentionnée dans les conditions générales de l'agence",
          "Oui, tant que les clients ont réellement acheté ou vendu un bien avec l'agence",
          "Non, sauf si la remise accordée ne dépasse pas 10 % des honoraires de la transaction",
        ],
        correctIndex: 0,
        explanation:
          "Conditionner un avantage à un avis positif fausse l'information du consommateur : c'est une pratique commerciale trompeuse (Code de la consommation), également interdite par les règles de Google, qui peut supprimer les avis ou suspendre la fiche. On peut solliciter des avis, mais sans contrepartie ni exigence de note.",
      },
      {
        id: "m7",
        question:
          "Vous publiez les photos d'un séjour vide meublé virtuellement par IA. Que devez-vous faire ?",
        options: [
          "Le signaler clairement sur les visuels concernés et garder des photos réelles",
          "Rien : le home staging virtuel est une pratique courante, sans aucune obligation",
          "Le signaler uniquement si l'acquéreur pose la question au moment de la visite",
          "En profiter pour effacer aussi les fissures visibles, pour un rendu homogène",
        ],
        correctIndex: 0,
        explanation:
          "Le home staging virtuel aide l'acquéreur à se projeter, à condition de ne pas tromper : mention « aménagement virtuel » sur chaque visuel et photos réelles du même espace. Masquer un défaut (fissure, humidité) constitue une pratique commerciale trompeuse.",
      },
      {
        id: "m8",
        question:
          "Annonce A : 2 000 vues et 10 contacts. Annonce B : 800 vues et 12 contacts. Que concluez-vous ?",
        options: [
          "B convertit trois fois mieux : c'est A qu'il faut retravailler (photos, prix)",
          "A est la meilleure annonce, puisqu'elle génère plus de deux fois plus de vues",
          "Les deux se valent : l'écart n'est que de deux contacts sur toute la période",
          "B manque de visibilité : son prix est forcément trop élevé pour le marché",
        ],
        correctIndex: 0,
        explanation:
          "Taux de conversion = contacts / vues. A : 10 / 2 000 = 0,5 %. B : 12 / 800 = 1,5 %, soit trois fois plus. A attire des vues mais ne convainc pas une fois ouverte : il faut revoir ses photos, son texte ou son prix.",
      },
      {
        id: "m9",
        question:
          "Quel contenu a le plus de chances de bien positionner le site d'une agence sur Google, dans la durée ?",
        options: [
          "Des guides locaux originaux : prix par quartier, écoles, transports",
          "Les descriptions d'annonces reprises à l'identique depuis les portails",
          "Des pages générées en masse pour cent villes où l'agence n'intervient pas",
          "Un texte rempli de mots-clés répétés, écrit en blanc sur fond blanc",
        ],
        correctIndex: 0,
        explanation:
          "Google valorise le contenu original et utile à l'internaute local (critères E-E-A-T). Le contenu dupliqué n'apporte rien, les pages de masse sans valeur et le texte caché relèvent du spam et sont sanctionnés.",
      },
      {
        id: "m10",
        question:
          "Quelle campagne e-mail a le plus de chances de déclencher des demandes de visite ?",
        options: [
          "Les nouveaux biens, envoyés aux seuls acquéreurs dont ils correspondent aux critères",
          "Une newsletter générale envoyée chaque jour à l'ensemble des contacts de la base",
          "Un e-mail composé d'une seule grande image, sans texte ni lien vers l'annonce",
          "Un envoi massif à des adresses collectées automatiquement sur des sites d'annonces",
        ],
        correctIndex: 0,
        explanation:
          "La pertinence fait le taux d'ouverture et de clic : segmenter par projet (achat, vente), budget, secteur et typologie. Les envois quotidiens non ciblés font fuir et dégradent la délivrabilité ; les adresses collectées sans consentement sont illicites.",
      },
      {
        id: "m11",
        question:
          "Quel est le principal bénéfice d'une visite virtuelle 360° pour un mandat de vente ?",
        options: [
          "Filtrer les visites : les acquéreurs qui se déplacent sont mieux informés",
          "Remplacer la visite physique, qui devient inutile avant de signer le compromis",
          "Dispenser l'agence de publier les diagnostics et les informations du DPE",
          "Augmenter mécaniquement le prix de vente final d'environ 10 % en moyenne",
        ],
        correctIndex: 0,
        explanation:
          "La visite virtuelle sert de pré-visite : moins de déplacements inutiles, des visiteurs plus qualifiés, un argument fort en prise de mandat. Elle ne remplace ni la visite physique ni les informations obligatoires de l'annonce.",
      },
      {
        id: "m12",
        question:
          "Quelle ligne éditoriale construit le mieux la notoriété d'un agent sur LinkedIn ou Instagram ?",
        options: [
          "Analyses du marché local, cas clients et conseils pratiques, en alternance",
          "Uniquement les biens à vendre, publiés dès leur entrée dans le portefeuille",
          "Des partages quotidiens des publications nationales de son réseau d'agences",
          "L'achat d'abonnés, pour paraître plus influent aux yeux des futurs vendeurs",
        ],
        correctIndex: 0,
        explanation:
          "Le personal branding repose sur l'expertise visible et la preuve sociale : marché local, réussites clients (avec leur accord), pédagogie. Un fil 100 % annonces lasse ; les faux abonnés n'apportent aucun contact et décrédibilisent.",
      },
      {
        id: "m13",
        question:
          "Vous voulez publier sur Instagram une photo de la remise des clés avec vos clients. Que vous faut-il ?",
        options: [
          "Leur accord, de préférence écrit, précisant les supports et la durée",
          "Rien, s'ils sourient sur la photo : leur accord est alors présumé",
          "Rien, si leurs noms n'apparaissent pas dans le texte de la publication",
          "Un accord oral unique, valable pour toutes vos publications futures",
        ],
        correctIndex: 0,
        explanation:
          "Toute personne a droit au respect de son image (art. 9 C. civ.) et une photo identifiable est une donnée personnelle (RGPD). L'accord doit être spécifique (supports, durée) ; un écrit permet d'en apporter la preuve.",
      },
    ],
  },
  {
    moduleSlug: "terrain",
    title: "Examen — Visite, closing & fidélisation",
    duration: 30,
    questions: [
      {
        id: "te1",
        question: "Une heure avant une visite, quelle préparation a le plus d'impact sur l'acquéreur ?",
        options: [
          "Repasser sur place : aérer, allumer, ranger, fixer l'ordre des pièces",
          "Envoyer à l'acquéreur toutes les photos, pour qu'il ait déjà tout vu",
          "Demander au vendeur d'être présent pour répondre à chaque question",
          "Préparer un discours complet, pour parler pendant toute la visite",
        ],
        correctIndex: 0,
        explanation:
          "La première impression se joue sur la lumière, l'odeur et le rangement ; un parcours défini met en valeur les points forts. La présence du vendeur bride souvent l'acquéreur, et un monologue empêche d'écouter ses réactions.",
      },
      {
        id: "te2",
        question: "Pourquoi faire signer un bon de visite à chaque acquéreur ?",
        options: [
          "Pour prouver que l'agence a présenté le bien à cet acquéreur",
          "Parce qu'il est obligatoire pour que la visite soit légale et assurée",
          "Parce qu'il engage l'acquéreur à faire une offre si le bien lui plaît",
          "Pour autoriser l'agence à transmettre ses données à tous ses partenaires",
        ],
        correctIndex: 0,
        explanation:
          "Le bon de visite n'est pas imposé par la loi et n'engage pas à acheter : c'est une preuve. Si vendeur et acquéreur concluent ensuite sans l'agence, il établit qu'elle est à l'origine de la rencontre et fonde sa demande d'indemnisation.",
      },
      {
        id: "te3",
        question:
          "Un acquéreur dit chercher « un 3 pièces à 300 000 € ». Quelle question de découverte poser en premier ?",
        options: [
          "« Qu'est-ce qui motive votre projet, et pour quand ? »",
          "« Préférez-vous un parquet ou plutôt du carrelage ? »",
          "« Voulez-vous voir nos 4 pièces, un peu plus chers ? »",
          "« Pourriez-vous monter à 330 000 € pour un coup de cœur ? »",
        ],
        correctIndex: 0,
        explanation:
          "La motivation (naissance, mutation, investissement) et le délai hiérarchisent les critères et révèlent l'urgence réelle. Les détails de finition viennent après ; proposer d'emblée plus cher ou plus grand, c'est vendre avant d'avoir compris.",
      },
      {
        id: "te4",
        question: "Avant de faire visiter un bien à 400 000 €, que devez-vous vérifier chez l'acquéreur ?",
        options: [
          "Sa capacité de financement : apport, simulation ou accord de principe",
          "Son lieu de naissance, pour adapter votre argumentaire à son profil",
          "Son avis sur les autres agences qu'il a déjà consultées dans le secteur",
          "Sa religion et ses habitudes de vie, pour cibler les biens adaptés",
        ],
        correctIndex: 0,
        explanation:
          "Qualifier le financement évite les visites inutiles et protège le vendeur. L'origine, la religion ou les mœurs sont des critères de discrimination interdits (art. 225-1 du Code pénal) : ils ne doivent jamais orienter la sélection des biens.",
      },
      {
        id: "te5",
        question: "En fin de visite, l'acquéreur vous dit : « Je vais réfléchir. » Quelle réaction est la plus efficace ?",
        options: [
          "Chercher le frein restant, puis fixer un point à date précise",
          "Respecter son choix et attendre qu'il vous rappelle de lui-même",
          "Annoncer qu'une offre arrive ce soir, même si ce n'est pas le cas",
          "Proposer aussitôt une baisse de prix pour lever son hésitation",
        ],
        correctIndex: 0,
        explanation:
          "« Je vais réfléchir » cache souvent un frein précis (prix, travaux, financement, accord du conjoint). On l'identifie, on y répond, et on convient d'un rendez-vous. Inventer une offre est une pratique trompeuse ; baisser le prix sans mandat du vendeur est une faute.",
      },
      {
        id: "te6",
        question: "Quelle phrase crée une urgence légitime auprès d'un acquéreur intéressé ?",
        options: [
          "« D'autres visites sont prévues cette semaine ; je vous tiens informé. »",
          "« Un acheteur fait une offre ce soir », alors qu'aucune offre n'existe",
          "« Le prix augmente de 5 % lundi si vous ne signez pas aujourd'hui. »",
          "« Signez l'offre, vous pourrez de toute façon vous rétracter après. »",
        ],
        correctIndex: 0,
        explanation:
          "L'urgence doit reposer sur des faits vrais et vérifiables (visites programmées, intérêt d'autres acquéreurs). Une fausse offre ou une fausse hausse de prix sont des pratiques commerciales trompeuses ; minimiser la portée d'une offre d'achat est déloyal.",
      },
      {
        id: "te7",
        question:
          "Vous recevez deux offres : l'une au prix, avec prêt ; l'autre 3 % en dessous, au comptant. Que faites-vous ?",
        options: [
          "Vous transmettez les deux au vendeur, avec votre analyse",
          "Vous ne transmettez que l'offre au prix, la seule conforme au mandat",
          "Vous ne transmettez que l'offre au comptant, plus sûre pour le vendeur",
          "Vous mettez les acquéreurs en concurrence sans en parler au vendeur",
        ],
        correctIndex: 0,
        explanation:
          "Le mandataire doit loyauté et information à son mandant : toutes les offres lui sont transmises. Son rôle de conseil est d'éclairer le choix — une offre au comptant, même plus basse, peut être plus sûre qu'une offre au prix soumise à un prêt.",
      },
      {
        id: "te8",
        question:
          "Un compromis prévoit une condition suspensive de prêt, mais l'acquéreur ne dépose aucune demande de crédit. Conséquence ?",
        options: [
          "La condition est réputée accomplie : il risque de perdre son dépôt de garantie",
          "Il récupère son dépôt de garantie, puisque le prêt n'a pas été obtenu",
          "Le vendeur doit lui accorder d'office un délai supplémentaire de 30 jours",
          "La vente est caduque et l'agence conserve le dépôt de garantie à titre d'honoraires",
        ],
        correctIndex: 0,
        explanation:
          "Article 1304-3 du Code civil : la condition est réputée accomplie si la partie qui y avait intérêt en a empêché la réalisation. L'acquéreur qui ne sollicite aucun prêt, ou un prêt non conforme au compromis, ne peut s'en prévaloir : il doit acheter ou subir la clause pénale.",
      },
      {
        id: "te9",
        question: "Quelle est la durée minimale légale de la condition suspensive d'obtention de prêt ?",
        options: [
          "Un mois à compter de la signature de l'avant-contrat",
          "Dix jours, comme le délai de rétractation de l'acquéreur",
          "Quarante-cinq jours, quel que soit le montant emprunté",
          "Trois mois, durée de validité d'une offre de prêt",
        ],
        correctIndex: 0,
        explanation:
          "Article L.313-41 du Code de la consommation : la durée de validité de la condition suspensive de prêt ne peut être inférieure à un mois. En pratique, on prévoit souvent 45 à 60 jours pour laisser à la banque le temps d'émettre l'offre.",
      },
      {
        id: "te10",
        question: "Un acquéreur particulier achète sans recourir au crédit. Que doit contenir le compromis ?",
        options: [
          "Sa mention manuscrite indiquant qu'il n'a pas recours à un prêt",
          "Rien de particulier : la condition de prêt est simplement retirée",
          "Une attestation de sa banque prouvant qu'il dispose bien des fonds",
          "Une condition suspensive de prêt maintenue pour un montant de 0 €",
        ],
        correctIndex: 0,
        explanation:
          "Article L.313-42 du Code de la consommation : l'acte doit porter une mention écrite de la main de l'acquéreur, par laquelle il reconnaît qu'il ne pourra pas se prévaloir de la protection de la condition de prêt s'il en sollicite un ensuite. À défaut, la condition de prêt est présumée.",
      },
      {
        id: "te11",
        question: "Le jour de l'acte authentique, qui reçoit le prix de vente et le reverse au vendeur ?",
        options: [
          "Le notaire, via son compte à la Caisse des dépôts",
          "L'agence, qui reverse le prix net de sa commission",
          "La banque de l'acquéreur, directement au vendeur",
          "L'acquéreur lui-même, par virement le jour de l'acte",
        ],
        correctIndex: 0,
        explanation:
          "Le notaire reçoit les fonds (apport et prêt) sur son compte à la Caisse des dépôts et consignations, règle les éventuels créanciers (banque du vendeur, syndic…), prélève les droits, puis verse le solde au vendeur. Il verse aussi la commission due à l'agence.",
      },
      {
        id: "te12",
        question: "À partir de quand l'agent peut-il percevoir sa commission sur une vente ?",
        options: [
          "Quand la vente est définitivement conclue, en pratique à l'acte",
          "À la signature du compromis, puisque celui-ci vaut déjà vente parfaite",
          "Dès la signature du mandat, sous forme d'acompte sur ses frais engagés",
          "À l'acceptation de l'offre d'achat par le vendeur, par lettre recommandée",
        ],
        correctIndex: 0,
        explanation:
          "Loi Hoguet, art. 6 : aucune somme n'est due à l'agent ni ne peut être perçue avant que l'opération ait été effectivement conclue. Tant que les conditions suspensives du compromis ne sont pas réalisées, la vente n'est pas définitive : la commission est versée par le notaire à l'acte.",
      },
      {
        id: "te13",
        question: "À quel moment une demande de recommandation à un client vendeur a-t-elle le plus de chances d'aboutir ?",
        options: [
          "Juste après l'acte, quand sa satisfaction est à son plus haut niveau",
          "Au premier rendez-vous d'estimation, avant toute prestation réalisée",
          "Un an après la vente, quand il aura oublié les moments de tension",
          "Jamais : solliciter un client est contraire à la déontologie",
        ],
        correctIndex: 0,
        explanation:
          "La recommandation se demande au pic de satisfaction, juste après la réussite, idéalement avec une demande précise (un avis, un nom). Elle s'entretient ensuite par un suivi régulier (anniversaire d'achat, point marché).",
      },
      {
        id: "te14",
        question:
          "Un acquéreur visite avec vous, puis achète directement au vendeur pour éviter les honoraires. Quel recours pour l'agence ?",
        options: [
          "Des dommages-intérêts, avec le bon de visite et le mandat",
          "Obtenir l'annulation de la vente conclue sans son intervention",
          "Aucun : sans compromis signé à l'agence, elle n'a aucun droit",
          "Saisir la CCI, qui fixe elle-même la commission due à l'agence",
        ],
        correctIndex: 0,
        explanation:
          "La vente reste valable. L'agence peut réclamer une indemnité au vendeur sur le fondement de la clause du mandat, rédigée en caractères très apparents, qui lui interdit de traiter directement avec un acquéreur présenté par l'agence ; et à l'acquéreur s'il a agi de manière fautive. Le bon de visite prouve la présentation.",
      },
      {
        id: "te15",
        question: "Un époux veut confier seul la vente de la maison où vit la famille, qui lui appartient en propre. Que faire ?",
        options: [
          "Obtenir aussi l'accord de son conjoint : c'est le logement de la famille",
          "Faire signer le seul propriétaire, puisque le bien lui appartient en propre",
          "Demander l'accord écrit des enfants majeurs qui habitent encore le logement",
          "Attendre la signature chez le notaire, seul à vérifier qui doit consentir",
        ],
        correctIndex: 0,
        explanation:
          "Article 215 du Code civil : les époux ne peuvent l'un sans l'autre disposer des droits par lesquels est assuré le logement de la famille, même s'il appartient en propre à l'un d'eux. Sans l'accord du conjoint, la vente pourrait être annulée : on le fait intervenir dès le mandat.",
      },
      {
        id: "te16",
        question: "Trois frères et sœurs ont hérité d'une maison. L'un d'eux veut signer seul le mandat de vente. Est-ce suffisant ?",
        options: [
          "Non : il faut l'accord de tous, ou des 2/3 avec l'aval du juge",
          "Oui, dès lors qu'il détient au moins un tiers des droits sur la maison",
          "Oui, s'il a été désigné par ses cohéritiers comme interlocuteur principal",
          "Oui, à condition de prévenir les deux autres par lettre recommandée",
        ],
        correctIndex: 0,
        explanation:
          "La vente d'un bien indivis requiert l'unanimité (art. 815-3 C. civ.). Les indivisaires titulaires d'au moins deux tiers des droits peuvent toutefois demander au tribunal judiciaire l'autorisation de vendre (art. 815-5-1). Un mandat signé par un seul ne permet pas de vendre.",
      },
      {
        id: "te17",
        question: "En rendez-vous de prise de mandat, quelle information pèse le plus sur votre stratégie ?",
        options: [
          "Le motif et le délai de vente du propriétaire",
          "Le nom du notaire habituel de toute la famille",
          "La couleur qu'il envisage pour ses futurs volets",
          "Le prix qu'il espère, sans autre question",
        ],
        correctIndex: 0,
        explanation:
          "Un vendeur pressé (mutation, succession, achat en cours) n'a pas la même stratégie de prix ni de communication qu'un vendeur qui « teste le marché ». Le motif et le délai conditionnent le prix de présentation, le type de mandat et le plan d'action.",
      },
      {
        id: "te18",
        question: "Quel argument justifie honnêtement un mandat exclusif auprès d'un vendeur ?",
        options: [
          "Un plan d'action précis (diffusion, visites, comptes rendus) en retour",
          "L'exclusivité est obligatoire au-delà de 300 000 € de prix de vente",
          "L'exclusivité permet à l'agence de fixer seule le prix de vente du bien",
          "L'exclusivité dispense l'agence de rendre compte de ses actions au vendeur",
        ],
        correctIndex: 0,
        explanation:
          "L'exclusivité se justifie par un engagement de moyens supérieur : diffusion renforcée, visites qualifiées, reporting régulier. Elle n'est jamais obligatoire, le prix reste fixé avec le vendeur, et l'agent doit au contraire lui rendre compte de ses actions.",
      },
      {
        id: "te19",
        question: "Un mandat exclusif d'un an a été signé il y a quatre mois. Le vendeur veut y mettre fin. Le peut-il ?",
        options: [
          "Oui, par lettre recommandée, avec un préavis de quinze jours",
          "Non, il reste engagé jusqu'au terme d'un an prévu au mandat",
          "Oui, mais en versant la moitié de la commission prévue",
          "Seulement si l'agence n'a organisé aucune visite du bien",
        ],
        correctIndex: 0,
        explanation:
          "Article 78 du décret n° 72-678 : passé un délai de trois mois à compter de sa signature, le mandat exclusif peut être dénoncé à tout moment par chacune des parties, par lettre recommandée avec accusé de réception, moyennant un préavis de quinze jours.",
      },
      {
        id: "te20",
        question: "Depuis la loi ALUR, que doit obligatoirement préciser un mandat exclusif ?",
        options: [
          "Les actions promises par l'agent et comment il en rendra compte",
          "Le nom des acquéreurs déjà intéressés par le bien au jour du mandat",
          "Un prix plancher en dessous duquel l'agent peut vendre sans accord",
          "La garantie d'une vente dans les trois mois suivant la signature",
        ],
        correctIndex: 0,
        explanation:
          "Loi Hoguet, art. 6, modifiée par la loi ALUR : lorsqu'il comporte une clause d'exclusivité, le mandat précise les actions que le mandataire s'engage à réaliser et les modalités selon lesquelles il rend compte au mandant des actions effectuées.",
      },
      {
        id: "te21",
        question: "Un acquéreur hésite entre deux biens. Quelle technique l'aide à décider sans pression ?",
        options: [
          "Lister avec lui avantages et freins de chaque bien (méthode Ben Franklin)",
          "Lui annoncer qu'il perdra les deux biens s'il ne choisit pas dès ce soir",
          "Lui conseiller d'office le plus cher, qui rapporte davantage d'honoraires",
          "Le laisser décider seul, sans plus jamais le relancer sur le sujet",
        ],
        correctIndex: 0,
        explanation:
          "La balance avantages / freins structure la réflexion et rend la décision rationnelle, tout en faisant apparaître le vrai critère décisif. La fausse urgence et le conseil intéressé sont contraires à la déontologie ; l'abandon du suivi fait perdre la vente.",
      },
      {
        id: "te22",
        question: "« Préférez-vous signer l'offre mardi ou jeudi ? » Quelle technique est utilisée ?",
        options: [
          "Le closing par alternative : on choisit le quand, pas le si",
          "Une question ouverte de découverte, pour cerner les motivations",
          "Une reformulation d'objection, pour vérifier la compréhension",
          "Une question d'implication, au sens de la méthode SPIN",
        ],
        correctIndex: 0,
        explanation:
          "L'alternative propose deux options qui supposent toutes deux la décision prise. Elle n'est légitime qu'une fois les objections levées : utilisée trop tôt, elle est perçue comme une manipulation.",
      },
      {
        id: "te23",
        question:
          "Un vendeur vous demande de ne pas faire visiter son bien à des acquéreurs d'origine étrangère. Que faites-vous ?",
        options: [
          "Vous refusez : c'est une discrimination pénalement sanctionnée",
          "Vous acceptez : le vendeur reste libre de choisir son acquéreur",
          "Vous acceptez, à condition que rien ne soit écrit sur le sujet",
          "Vous acceptez si l'instruction figure noir sur blanc au mandat",
        ],
        correctIndex: 0,
        explanation:
          "Refuser une visite ou une vente en raison de l'origine est une discrimination (art. 225-1 et 225-2 du Code pénal : jusqu'à 3 ans d'emprisonnement et 45 000 € d'amende). L'agent qui exécute l'instruction engage sa propre responsabilité pénale : il doit refuser et le rappeler au vendeur.",
      },
      {
        id: "te24",
        question: "Vous devez faire visiter un logement en vente, occupé par un locataire. Quelle règle s'applique ?",
        options: [
          "Pas de visite les jours fériés, ni plus de deux heures par jour ouvrable",
          "Vous pouvez entrer avec le double des clés si le locataire est absent",
          "Le locataire doit accepter tous les créneaux que vous lui proposez",
          "Aucune visite n'est possible avant la fin du bail du locataire en place",
        ],
        correctIndex: 0,
        explanation:
          "Loi du 6 juillet 1989, art. 4 : est réputée non écrite la clause obligeant le locataire, en vue de la vente ou de la location, à laisser visiter les jours fériés ou plus de deux heures les jours ouvrables. Les visites s'organisent avec lui ; entrer sans son accord est une violation de domicile.",
      },
      {
        id: "te25",
        question:
          "Pendant la visite, l'acquéreur demande si le bien a déjà subi un dégât des eaux. Vous savez que oui. Que répondez-vous ?",
        options: [
          "La vérité : l'agent doit informer l'acquéreur",
          "Rien : seul le vendeur est tenu d'informer l'acquéreur",
          "Que vous l'ignorez, pour ne pas compromettre la vente",
          "Qu'il le verra dans les diagnostics remis chez le notaire",
        ],
        correctIndex: 0,
        explanation:
          "L'agent est tenu d'un devoir d'information et de conseil, y compris envers l'acquéreur, et ne peut dissimuler une information déterminante (art. 1112-1 C. civ.). Mentir l'expose, avec le vendeur, à une action pour dol et à des dommages-intérêts.",
      },
    ],
  },
  {
    moduleSlug: "tracfin",
    title: "Examen — TRACFIN & lutte anti-blanchiment",
    duration: 15,
    questions: [
      {
        id: "tr1",
        question: "Une agence ne fait que de la location. Est-elle soumise aux obligations anti-blanchiment (LCB-FT) ?",
        options: [
          "Oui, pour les locations à 10 000 € de loyer mensuel ou plus",
          "Non : la LCB-FT ne vise que les ventes de biens immobiliers",
          "Oui, pour toute location, quel que soit le montant du loyer",
          "Non : seuls les notaires et les banques y sont assujettis",
        ],
        correctIndex: 0,
        explanation:
          "Article L.561-2, 8° du Code monétaire et financier : sont assujettis les intermédiaires en transaction immobilière et, en location, ceux qui interviennent pour des biens dont le loyer mensuel est égal ou supérieur à 10 000 €.",
      },
      {
        id: "tr2",
        question: "À quel moment l'agent doit-il identifier son client et vérifier son identité ?",
        options: [
          "Avant toute relation d'affaires, dès le mandat ou l'offre",
          "Au compromis seulement, une fois l'accord sur le prix trouvé",
          "Jamais : c'est le rôle exclusif du notaire, le jour de l'acte",
          "Uniquement si le client prévoit de payer une partie en espèces",
        ],
        correctIndex: 0,
        explanation:
          "Article L.561-5 du CMF : l'identification du client et du bénéficiaire effectif, et la vérification sur document probant, interviennent avant d'entrer en relation d'affaires. L'agent identifie son mandant et la contrepartie (acquéreur ou vendeur), indépendamment des diligences du notaire.",
      },
      {
        id: "tr3",
        question:
          "Une SCI acheteuse a quatre associés, détenant 40 %, 30 %, 20 % et 10 % du capital. Qui sont ses bénéficiaires effectifs ?",
        options: [
          "Les associés à 40 % et à 30 %, qui détiennent plus de 25 %",
          "Le gérant inscrit au registre, quelle que soit sa part au capital",
          "Les quatre associés, puisque chacun détient une part du capital",
          "Le seul associé à 40 %, en tant qu'actionnaire le plus important",
        ],
        correctIndex: 0,
        explanation:
          "Article R.561-1 du CMF : est bénéficiaire effectif toute personne physique détenant, directement ou indirectement, plus de 25 % du capital ou des droits de vote, ou exerçant un contrôle sur la société. Ce n'est qu'à défaut que le représentant légal est retenu.",
      },
      {
        id: "tr4",
        question: "Lequel de ces comportements est le signal d'alerte le plus sérieux ?",
        options: [
          "Un acheteur pressé, indifférent au prix, financé par une société offshore",
          "Un acheteur qui négocie fermement le prix et obtient finalement 5 % de rabais",
          "Un vendeur qui refuse une offre que l'agent jugeait pourtant correcte",
          "Un acheteur qui demande une deuxième visite avec son artisan",
        ],
        correctIndex: 0,
        explanation:
          "Le faisceau d'indices typique : désintérêt pour le prix ou les caractéristiques du bien, urgence inexpliquée, montage financier opaque (société étrangère, tiers payeur). Négocier, refuser une offre ou revisiter sont des comportements normaux.",
      },
      {
        id: "tr5",
        question: "Un acquéreur propose de régler 40 000 € du prix « en liquide, hors acte ». Que faites-vous ?",
        options: [
          "Vous refusez et analysez une déclaration de soupçon",
          "Vous acceptez si le vendeur est d'accord et la somme < 50 000 €",
          "Vous acceptez, à condition que les espèces passent par le notaire",
          "Rien : un paiement hors acte ne concerne pas l'agent immobilier",
        ],
        correctIndex: 0,
        explanation:
          "Un paiement occulte en espèces cumule dissimulation de prix (fraude fiscale) et risque de blanchiment : c'est un signal d'alerte majeur, à documenter et à déclarer s'il est confirmé. Le prix d'une vente immobilière se règle par virement via le notaire, qui ne peut accepter d'espèces au-delà de quelques milliers d'euros.",
      },
      {
        id: "tr6",
        question: "Vous soupçonnez qu'une vente sert à blanchir des fonds. Quand devez-vous déclarer à TRACFIN ?",
        options: [
          "Avant de réaliser l'opération, dès que le soupçon existe",
          "Après l'acte authentique, une fois votre commission encaissée",
          "Seulement si vous détenez la preuve formelle d'une infraction",
          "En fin d'année, dans un rapport annuel regroupant vos soupçons",
        ],
        correctIndex: 0,
        explanation:
          "Articles L.561-15 et L.561-16 du CMF : la déclaration porte sur un soupçon, pas sur une preuve, et doit en principe précéder l'opération, pour permettre à TRACFIN d'exercer son droit d'opposition. Si le soupçon naît après, on déclare sans délai.",
      },
      {
        id: "tr7",
        question: "Après votre déclaration, le client vous demande si « tout est en ordre ». Que répondez-vous ?",
        options: [
          "Rien sur la déclaration : la révéler, même à demi-mot, est un délit",
          "La vérité, par transparence, puisqu'il pose lui-même la question",
          "Que TRACFIN examine son dossier, sans lui donner plus de détails",
          "Qu'il peut consulter la déclaration à la CCI qui a délivré la carte",
        ],
        correctIndex: 0,
        explanation:
          "Article L.561-18 du CMF : il est interdit de divulguer l'existence et le contenu d'une déclaration de soupçon, ou les suites qui lui sont données (amende de 22 500 €, art. L.574-1). Laisser entendre que TRACFIN examine le dossier est une divulgation.",
      },
      {
        id: "tr8",
        question: "Dans une agence, qui transmet les déclarations de soupçon à TRACFIN ?",
        options: [
          "Le déclarant désigné par l'agence auprès de TRACFIN",
          "Le négociateur qui a repéré l'anomalie, à titre personnel",
          "La CCI qui a délivré la carte professionnelle de l'agence",
          "Le notaire, auquel l'agent signale simplement le dossier",
        ],
        correctIndex: 0,
        explanation:
          "Chaque professionnel assujetti désigne auprès de TRACFIN un déclarant (et un correspondant), généralement le dirigeant. Les collaborateurs lui remontent leurs doutes via la procédure interne ; c'est lui qui déclare, via la plateforme ERMES.",
      },
      {
        id: "tr9",
        question: "Combien de temps l'agence doit-elle conserver les documents d'identification d'un client ?",
        options: [
          "Cinq ans après la fin de la relation d'affaires",
          "Un an après la signature de l'acte authentique",
          "Dix ans à compter du premier rendez-vous client",
          "Jusqu'à l'encaissement de la commission d'agence",
        ],
        correctIndex: 0,
        explanation:
          "Article L.561-12 du CMF : les documents relatifs à l'identité des clients et aux opérations sont conservés cinq ans à compter de la cessation de la relation d'affaires ou de l'exécution de l'opération.",
      },
      {
        id: "tr10",
        question: "Qui sanctionne une agence immobilière qui ne respecte pas ses obligations de vigilance ?",
        options: [
          "La Commission nationale des sanctions, jusqu'au retrait de la carte",
          "TRACFIN, qui peut retirer lui-même la carte professionnelle de l'agent",
          "La CCI, qui ne peut prononcer qu'un simple avertissement écrit",
          "Personne, tant que l'agence n'a pas elle-même blanchi des fonds",
        ],
        correctIndex: 0,
        explanation:
          "Les manquements des agents immobiliers, contrôlés par la DGCCRF, sont sanctionnés par la Commission nationale des sanctions (art. L.561-38 et s. CMF) : avertissement, blâme, interdiction temporaire d'exercer, retrait de la carte, amende jusqu'à 5 M€. La participation au blanchiment relève en plus du juge pénal.",
      },
    ],
  },
  {
    moduleSlug: "deontologie",
    title: "Examen — Déontologie & éthique professionnelle",
    duration: 15,
    questions: [
      {
        id: "d1",
        question: "Le Code de déontologie des professionnels de l'immobilier a été instauré par :",
        options: [
          "La loi Hoguet du 2 janvier 1970",
          "Le décret n°2015-1090 du 28 août 2015",
          "La loi ALUR du 24 mars 2014",
          "Le Code civil article 1240",
        ],
        correctIndex: 1,
        explanation: "Le Code de déontologie est issu du décret n°2015-1090 du 28 août 2015, pris en application de la loi ALUR.",
      },
      {
        id: "d2",
        question: "Combien de critères de discrimination sont listés à l'article 225-1 du Code pénal ?",
        options: ["12", "18", "25", "30"],
        correctIndex: 2,
        explanation: "L'article 225-1 du Code pénal liste 25 critères de discrimination prohibés, dont l'origine, le sexe, l'état de santé, l'orientation sexuelle, la domiciliation bancaire, etc.",
      },
      {
        id: "d3",
        question: "Quelle est la sanction pénale maximale pour discrimination dans l'accès au logement ?",
        options: [
          "1 an et 15 000 €",
          "2 ans et 30 000 €",
          "3 ans et 45 000 €",
          "5 ans et 75 000 €",
        ],
        correctIndex: 2,
        explanation: "L'article 225-2 du Code pénal prévoit 3 ans d'emprisonnement et 45 000 € d'amende pour discrimination dans l'accès au logement.",
      },
      {
        id: "d4",
        question: "Le testing immobilier consiste à :",
        options: [
          "Tester la solidité d'un bien avant achat",
          "Envoyer deux candidats similaires financièrement mais différents sur un critère protégé pour détecter une discrimination",
          "Faire visiter un bien à plusieurs acquéreurs simultanément",
          "Tester la performance énergétique d'un logement",
        ],
        correctIndex: 1,
        explanation: "Le testing envoie deux candidats comparables financièrement mais différents sur un critère protégé (origine, prénom…). Reconnu comme preuve depuis la loi du 27 janvier 2017.",
      },
      {
        id: "d5",
        question: "Lequel de ces principes NE fait PAS partie des 10 principes du Code de déontologie ?",
        options: ["Loyauté", "Désintéressement", "Rentabilité", "Confraternité"],
        correctIndex: 2,
        explanation: "La rentabilité n'est pas un principe du Code de déontologie. Les 10 principes sont : compétence, conscience professionnelle, loyauté, désintéressement, confraternité, délicatesse, modération, courtoisie, indépendance, secret professionnel.",
      },
      {
        id: "d6",
        question: "La CNTGI est :",
        options: [
          "La Commission Nationale des Transactions et Gestions Immobilières",
          "Le Centre National de Traitement des Garanties Immobilières",
          "La Commission Nationale de la Transaction et de la Gestion Immobilières",
          "Le Comité National de Transparence et de Gouvernance Immobilière",
        ],
        correctIndex: 2,
        explanation: "La CNTGI est la Commission Nationale de la Transaction et de la Gestion Immobilières, instance disciplinaire de la profession.",
      },
      {
        id: "d7",
        question: "En cas de double mandant (représenter vendeur ET acheteur), l'agent doit :",
        options: [
          "Refuser systématiquement — c'est interdit",
          "Informer les deux parties par écrit de son double rôle avant toute négociation",
          "Facturer uniquement le vendeur",
          "Obtenir l'accord du préfet",
        ],
        correctIndex: 1,
        explanation: "Le double mandant est légal mais nécessite une information écrite des deux parties avant toute négociation, conformément au Code de déontologie.",
      },
      {
        id: "d8",
        question: "Combien de temps maximum peut-on conserver un dossier locataire refusé selon le RGPD ?",
        options: ["6 mois", "1 an", "3 ans", "5 ans"],
        correctIndex: 1,
        explanation: "Un dossier locataire refusé ne doit pas être conservé plus d'1 an. Les mandats et actes se conservent 5 ans (prescription civile).",
      },
    ],
  },
  {
    moduleSlug: "murs-fonds-commerce",
    title: "Examen — Murs & fonds de commerce",
    duration: 20,
    questions: [
      {
        id: "mf1",
        question:
          "Selon l'article L.145-1 du Code de commerce, quel est le critère déterminant pour qualifier un contrat de « bail commercial » au sens strict ?",
        options: [
          "L'immatriculation du locataire au Registre du Commerce et des Sociétés (RCS)",
          "L'exploitation par le locataire d'un fonds de commerce ou d'un établissement artisanal dans le local loué",
          "La conclusion d'un contrat écrit obligatoirement devant notaire",
          "La présence d'une enseigne visible depuis la voie publique",
        ],
        correctIndex: 1,
        explanation:
          "La qualification repose sur l'exploitation effective d'un fonds de commerce ou artisanal dans le local loué : c'est l'articulation entre l'activité et le local qui fonde le statut protecteur. L'acte notarié et l'enseigne ne sont pas des critères (art. L.145-1 C. com.).",
      },
      {
        id: "mf2",
        question:
          "Un restaurateur signe un bail commercial. Quelle est la durée minimale légale du bail et comment fonctionne le congé ?",
        options: [
          "Durée minimale de 3 ans avec congé possible à tout moment moyennant un préavis de 3 mois",
          "Durée minimale de 6 ans avec congé possible tous les 3 ans",
          "Durée minimale de 9 ans, renouvelable, avec congé possible à l'expiration de chaque période triennale (3e, 6e et 9e année)",
          "Durée minimale de 12 ans avec congé possible uniquement à l'expiration de la 9e année",
        ],
        correctIndex: 2,
        explanation:
          "Le bail commercial a une durée minimale de 9 ans (art. L.145-4 C. com.). Le congé peut être donné à l'expiration de chaque période triennale, avec un préavis d'au moins 6 mois. À l'issue des 9 ans, le locataire bénéficie du droit au renouvellement.",
      },
      {
        id: "mf3",
        question:
          "En cas de désaccord sur le loyer lors du renouvellement du bail commercial, comment le nouveau loyer est-il déterminé ?",
        options: [
          "Le loyer est automatiquement indexé sur l'indice du coût de la construction (ICC)",
          "Le loyer est fixé par le juge en tenant compte de la valeur locative des locaux, des charges, des travaux et des conditions du bail",
          "Le loyer est imposé par la Chambre de commerce et d'industrie locale",
          "Le loyer ne peut pas changer et reste identique à celui du bail initial",
        ],
        correctIndex: 1,
        explanation:
          "À défaut d'accord, le juge fixe le loyer du bail renouvelé d'après la valeur locative : état des lieux, conditions de jouissance, charges du locataire, travaux effectués et usages de la profession (art. L.145-33 et L.145-34 C. com.).",
      },
      {
        id: "mf4",
        question:
          "Selon l'article L.141-1 du Code de commerce, lequel de ces éléments constitue un élément essentiel du fonds de commerce ?",
        options: [
          "Les stocks de marchandises seulement",
          "L'enseigne, le nom commercial et la clientèle",
          "Le mobilier de bureau personnel du commerçant",
          "Le véhicule personnel du commerçant",
        ],
        correctIndex: 1,
        explanation:
          "Le fonds de commerce est un ensemble d'éléments corporels et incorporels. Les éléments incorporels — clientèle (élément le plus précieux), enseigne, nom commercial, droit au bail — en constituent l'essence (art. L.141-1 C. com.).",
      },
      {
        id: "mf5",
        question:
          "Lors d'une cession de fonds de commerce, quel mécanisme protège les créanciers du cédant après la publicité de la cession ?",
        options: [
          "Aucun : les créanciers du cédant perdent tout recours dès la signature de l'acte",
          "Un délai d'opposition permettant aux créanciers du cédant de faire valoir leurs créances, le prix étant séquestré en cas d'opposition",
          "Un délai de 60 jours pendant lequel les créanciers du cessionnaire peuvent contester la cession",
          "Un délai de 90 jours pendant lequel le cessionnaire peut renoncer à la cession",
        ],
        correctIndex: 1,
        explanation:
          "Après publicité de la cession, les créanciers du cédant disposent d'un délai légal pour former opposition ; en cas d'opposition, le prix de cession est séquestré (généralement chez le notaire) jusqu'à résolution. Sans opposition dans le délai, le prix est libéré (art. L.141-14 et s. C. com.).",
      },
      {
        id: "mf6",
        question:
          "Un locataire commercial veut céder son droit au bail seul à un repreneur. Le bail réserve au bailleur une faculté de préemption. Comment s'exerce-t-elle ?",
        options: [
          "Le bailleur se substitue au cessionnaire dans le délai prévu, au même prix et aux mêmes conditions que l'offre du repreneur",
          "Le bailleur peut préempter à tout moment en proposant un prix inférieur au prix de cession",
          "Le bailleur n'a jamais aucun droit de regard sur la cession du bail commercial",
          "Le bailleur doit obligatoirement acheter le fonds de commerce entier pour exercer sa préemption",
        ],
        correctIndex: 0,
        explanation:
          "La préemption s'exerce aux mêmes prix et conditions que l'offre du cessionnaire proposé, dans le délai imparti — le bailleur ne peut pas imposer un prix inférieur. À noter : la cession du bail avec le fonds de commerce, elle, ne peut pas être interdite au locataire (art. L.145-16 C. com.).",
      },
      {
        id: "mf7",
        question:
          "Un boulanger conteste les conditions d'un congé avec offre de renouvellement. Dans quel délai peut-il faire valoir ses droits en justice ?",
        options: [
          "Il n'a aucun droit au renouvellement et doit quitter les lieux à l'expiration du bail",
          "Il dispose d'un délai de 2 ans à compter de la date à laquelle le bail a pris fin pour saisir le tribunal",
          "Il dispose d'un délai de 6 mois après l'expiration du bail, puis le droit est périmé",
          "Il peut exiger un renouvellement automatique de 12 ans sans conditions",
        ],
        correctIndex: 1,
        explanation:
          "Les actions relatives au bail commercial se prescrivent par 2 ans (art. L.145-60 C. com.). Le locataire dispose donc de ce délai pour contester le congé ou faire fixer les conditions du bail renouvelé devant le juge.",
      },
      {
        id: "mf8",
        question:
          "Un tribunal accorde une indemnité d'éviction de 3 ans de loyer (loyer mensuel : 2 500 €). Le commerçant a réalisé 45 000 € de travaux il y a 4 ans (amortissement d'usage sur 10 ans). Quel raisonnement de calcul est correct ?",
        options: [
          "90 000 € (3 ans de loyer uniquement)",
          "135 000 € (3 ans de loyer + remboursement intégral des travaux)",
          "90 000 € (3 ans de loyer) + la part non amortie des travaux : 45 000 − (45 000 × 4/10) = 27 000 €",
          "90 000 € (3 ans de loyer) + remboursement intégral des travaux, sans tenir compte de l'amortissement",
        ],
        correctIndex: 2,
        explanation:
          "L'indemnité d'éviction (art. L.145-14 C. com.) compense le préjudice : indemnité principale (ici 3 ans de loyer = 90 000 €) plus indemnités accessoires, dont la part non amortie des travaux (27 000 € après 4 ans sur 10), frais de déménagement et perte de clientèle le cas échéant.",
      },
      {
        id: "mf9",
        question:
          "Un propriétaire veut donner congé à l'expiration de la première période triennale. Quelles formalités doit-il respecter ?",
        options: [
          "Un simple courrier recommandé envoyé au moins 1 mois avant l'échéance suffit",
          "Un acte d'huissier ou une lettre recommandée avec AR, motivé, notifié au moins 6 mois avant la fin de la période triennale",
          "Une décision du tribunal de commerce autorisant le congé",
          "Une information verbale au locataire suivie d'un courriel de confirmation",
        ],
        correctIndex: 1,
        explanation:
          "Le congé doit être donné par acte extrajudiciaire (huissier) ou LRAR, préciser ses motifs, et être notifié au moins 6 mois avant l'échéance (art. L.145-9 C. com.). Un congé irrégulier en la forme ou hors délai est sans effet.",
      },
      {
        id: "mf10",
        question:
          "Un avocat exerce dans un local loué à Paris, sans vente de marchandises. Quel type de bail régit en principe sa location ?",
        options: [
          "Un bail commercial car l'avocat est un commerçant inscrit au RCS",
          "Un bail professionnel, car les activités libérales ne constituent pas une activité commerciale au sens du Code de commerce",
          "Un bail commercial car tout local loué à usage professionnel est automatiquement un bail commercial",
          "Un bail mixte commercial et professionnel",
        ],
        correctIndex: 1,
        explanation:
          "L'activité libérale relève en principe du bail professionnel (durée minimale 6 ans, pas de droit au renouvellement automatique ni d'indemnité d'éviction). Les parties peuvent toutefois se soumettre volontairement au statut des baux commerciaux (art. L.145-2 C. com.).",
      },
      {
        id: "mf11",
        question:
          "Le bail ne prévoit rien sur les travaux d'amélioration. Le bailleur rénove la façade et remplace les fenêtres par des baies vitrées (120 000 €). Quelle est la répartition applicable ?",
        options: [
          "Le bailleur supporte la totalité car ils relèvent de son obligation de mise en conformité",
          "Le locataire supporte la totalité car il bénéficie de l'amélioration des locaux",
          "Le bailleur supporte les deux tiers et le locataire un tiers, proportionnellement à la durée du bail restant à courir",
          "Le bailleur supporte les travaux lourds (façade, structure) ; le locataire peut participer à hauteur du bénéfice qu'il en retire, selon la nature des travaux et les usages",
        ],
        correctIndex: 3,
        explanation:
          "Sans stipulation, le locataire supporte l'entretien courant et les réparations locatives, le bailleur les gros travaux (structure, façade — art. 606 C. civ.). Pour les améliorations, la répartition dépend de leur nature et du bénéfice retiré par chaque partie ; le juge apprécie au cas par cas.",
      },
      {
        id: "mf12",
        question:
          "Un investisseur achète des murs de boutique via une société soumise à l'IS. Quel est le régime fiscal des loyers et de la future plus-value ?",
        options: [
          "Loyers imposés à l'IR en revenus fonciers, plus-value immobilière des particuliers avec abattement pour durée de détention",
          "Loyers imposés au résultat de la société (IS à 25 %), bien amortissable, et plus-value professionnelle soumise à l'IS sans abattement pour durée de détention",
          "Les loyers sont exonérés d'impôt car il s'agit de murs de boutique",
          "Les loyers sont obligatoirement soumis à la TVA au taux de 20 %",
        ],
        correctIndex: 1,
        explanation:
          "En société à l'IS, les loyers entrent dans le résultat imposable (taux normal 25 %), le bâtiment est amortissable, et la plus-value de cession est calculée sur la valeur nette comptable et imposée à l'IS — sans abattement pour durée de détention, contrairement au régime des particuliers.",
      },
      {
        id: "mf13",
        question:
          "Un promoteur veut louer un local 2 ans pour une agence de vente temporaire. Quel bail est adapté et quelles sont ses caractéristiques ?",
        options: [
          "Un bail commercial classique de 9 ans avec congé à la 3e année",
          "Un bail dérogatoire (précaire) de courte durée : 3 ans maximum au total, sans droit au renouvellement ni indemnité d'éviction",
          "Un bail professionnel de 6 ans",
          "Un bail emphytéotique de 18 à 99 ans",
        ],
        correctIndex: 1,
        explanation:
          "Le bail dérogatoire (art. L.145-5 C. com.) permet d'échapper au statut pour une durée totale maximale de 3 ans : pas de droit au renouvellement ni d'indemnité d'éviction. Idéal pour une activité temporaire. Au-delà de 3 ans d'occupation, un bail commercial de 9 ans s'opère de plein droit.",
      },
      {
        id: "mf14",
        question:
          "Deux ans après réception, des fissures structurelles compromettent la sécurité d'un bâtiment commercial loué à un restaurateur. Qui peut invoquer la garantie décennale ?",
        options: [
          "Seul le propriétaire-investisseur peut agir contre l'entrepreneur dans les 10 ans suivant la réception",
          "Le propriétaire et les acquéreurs successifs peuvent agir contre les constructeurs (entrepreneur, architecte, bureau d'études) dans les 10 ans suivant la réception",
          "Seul le locataire commercial peut agir car il subit le préjudice directement",
          "La garantie décennale ne s'applique pas aux locaux commerciaux",
        ],
        correctIndex: 1,
        explanation:
          "La garantie décennale (art. 1792 C. civ.) couvre 10 ans les dommages compromettant la solidité de l'ouvrage ou le rendant impropre à sa destination ; elle bénéficie au maître d'ouvrage et aux propriétaires successifs, contre tous les constructeurs. Elle s'applique pleinement aux locaux commerciaux.",
      },
      {
        id: "mf15",
        question:
          "Un fleuriste cède son fonds de commerce alors que son bail arrive à échéance avec un congé portant offre de renouvellement. Que peut faire le repreneur ?",
        options: [
          "Rien : seul le cédant pouvait former la demande de renouvellement avant la cession",
          "Le repreneur, substitué dans les droits du cédant, peut faire valoir le droit au renouvellement dans le délai de 2 ans ; la cession du fonds doit par ailleurs respecter la publicité et l'opposition des créanciers",
          "Le repreneur doit verser au bailleur une prime obligatoire prévue par la loi pour obtenir le renouvellement",
          "Le bailleur peut refuser le renouvellement sans aucune justification ni indemnité",
        ],
        correctIndex: 1,
        explanation:
          "La cession du fonds emporte transmission du droit au renouvellement au cessionnaire (art. L.145-16 C. com.), qui dispose du délai de prescription de 2 ans (art. L.145-60). Le refus de renouvellement sans motif grave et légitime ouvre droit à l'indemnité d'éviction (art. L.145-14).",
      },
    ],
  },
  {
    moduleSlug: "renovation-energetique",
    title: "Examen — Rénovation énergétique & photovoltaïque",
    duration: 20,
    questions: [
      {
        id: "re1",
        question:
          "Depuis la loi ELAN puis la loi Climat & Résilience, quelle est la portée juridique du DPE ?",
        options: [
          "Il reste purement informatif : l'acquéreur ne peut rien en tirer",
          "Il est opposable : l'acquéreur ou le locataire peut se retourner contre le vendeur ou le bailleur en cas d'écart significatif",
          "Il n'engage que le diagnostiqueur, jamais le vendeur",
          "Il n'est obligatoire que pour les logements construits avant 1975",
        ],
        correctIndex: 1,
        explanation:
          "Depuis le 1er juillet 2021, le DPE est opposable : ses résultats engagent le vendeur ou le bailleur, et un écart significatif peut fonder un recours. Seules les recommandations de travaux restent indicatives.",
      },
      {
        id: "re2",
        question: "Sur quoi se base le calcul du DPE depuis la réforme de 2021 ?",
        options: [
          "Sur les factures d'énergie des trois dernières années des occupants",
          "Sur les caractéristiques physiques du bâti : isolation, menuiseries, chauffage, ventilation (méthode 3CL)",
          "Sur une simple déclaration du propriétaire",
          "Sur la moyenne des consommations du quartier",
        ],
        correctIndex: 1,
        explanation:
          "La méthode 3CL évalue le logement lui-même, indépendamment du comportement des occupants : deux logements identiques obtiennent la même étiquette. Les factures ne servent plus de base de calcul.",
      },
      {
        id: "re3",
        question:
          "Selon le calendrier de la loi Climat & Résilience, quand la location des logements classés F devient-elle interdite (indécence énergétique) ?",
        options: [
          "Depuis le 1er janvier 2025",
          "Au 1er janvier 2028",
          "Au 1er janvier 2034",
          "Jamais : seuls les G sont concernés",
        ],
        correctIndex: 1,
        explanation:
          "Le calendrier : classe G interdite depuis le 1er janvier 2025, classe F au 1er janvier 2028, classe E au 1er janvier 2034. Les loyers des F et G sont par ailleurs gelés depuis 2022.",
      },
      {
        id: "re4",
        question:
          "Quelle mention est obligatoire dans une annonce immobilière pour un logement classé F ou G ?",
        options: [
          "« Logement à consommation énergétique excessive »",
          "« Passoire thermique certifiée »",
          "« Travaux obligatoires avant la vente »",
          "Aucune mention particulière n'est exigée",
        ],
        correctIndex: 0,
        explanation:
          "Les annonces doivent afficher la classe énergie, la classe climat, l'estimation des dépenses annuelles d'énergie, et pour les F/G la mention « logement à consommation énergétique excessive ». L'annonce non conforme expose à une amende.",
      },
      {
        id: "re5",
        question:
          "Dans une maison ancienne non isolée, quel poste représente en général la plus grande part des déperditions de chaleur ?",
        options: [
          "Les fenêtres",
          "Le toit (25 à 30 % des déperditions)",
          "Le plancher bas",
          "La porte d'entrée",
        ],
        correctIndex: 1,
        explanation:
          "Le toit concentre 25 à 30 % des déperditions, devant les murs (20-25 %), les fenêtres (10-15 %) et les planchers bas (7-10 %). D'où la règle : commencer par isoler les combles — le geste le plus rentable.",
      },
      {
        id: "re6",
        question:
          "Un client fait isoler sa maison et changer toutes ses fenêtres, sans autre intervention. Quel risque majeur doit-on lui signaler ?",
        options: [
          "Aucun : l'isolation n'a que des avantages",
          "Sans ventilation adaptée (VMC), l'humidité ne s'évacue plus : condensation, moisissures et air intérieur dégradé",
          "La maison deviendra trop chaude en hiver",
          "Le DPE sera automatiquement dégradé",
        ],
        correctIndex: 1,
        explanation:
          "Qui isole doit ventiler : en rendant le logement étanche, on supprime les fuites d'air qui « ventilaient » par défaut. Sans VMC adaptée, l'humidité stagne — moisissures et désordres. Un devis d'isolation sans poste ventilation est un signal d'alerte.",
      },
      {
        id: "re7",
        question:
          "Pourquoi recommande-t-on d'isoler AVANT de remplacer le système de chauffage ?",
        options: [
          "Parce que c'est imposé par la loi",
          "Parce qu'une fois l'enveloppe traitée, les besoins chutent : l'équipement est dimensionné plus petit, coûte moins cher et fonctionne mieux",
          "Parce que les aides n'existent que pour l'isolation",
          "Parce que les pompes à chaleur ne fonctionnent pas dans les maisons anciennes",
        ],
        correctIndex: 1,
        explanation:
          "Installer une pompe à chaleur dans une maison qui fuit conduit à un équipement surdimensionné, énergivore et inconfortable. L'ordre des travaux : enveloppe (toit, murs, planchers, fenêtres), ventilation, puis chauffage dimensionné sur les besoins réels.",
      },
      {
        id: "re8",
        question: "Qu'est-ce qui caractérise une « rénovation d'ampleur » au sens des aides ?",
        options: [
          "N'importe quel chantier de plus de 10 000 €",
          "Un bouquet de travaux cohérent (dont gestes d'isolation) permettant un saut d'au moins deux classes de DPE, avec accompagnement obligatoire",
          "Le remplacement d'une chaudière par une pompe à chaleur",
          "Une rénovation faite en moins de six mois",
        ],
        correctIndex: 1,
        explanation:
          "La rénovation d'ampleur combine plusieurs gestes coordonnés et vise au moins deux classes de DPE gagnées, validées par audit. C'est le parcours le mieux subventionné, avec Mon Accompagnateur Rénov' obligatoire.",
      },
      {
        id: "re9",
        question: "Comment le montant de MaPrimeRénov' est-il modulé ?",
        options: [
          "Selon l'âge du demandeur",
          "Selon les revenus du ménage : quatre profils, du plus modeste (aide maximale) au plus aisé",
          "Selon la région uniquement",
          "Il est identique pour tous les ménages",
        ],
        correctIndex: 1,
        explanation:
          "MaPrimeRénov' repose sur quatre profils de revenus (historiquement bleu, jaune, violet, rose) : plus les revenus sont modestes, plus le taux d'aide est élevé. Les barèmes évoluent chaque année — seule la simulation officielle sur france-renov.gouv.fr fait foi.",
      },
      {
        id: "re10",
        question:
          "Quelle condition est indispensable pour que des travaux ouvrent droit à MaPrimeRénov', aux CEE et à l'éco-PTZ ?",
        options: [
          "Que le logement soit vide pendant les travaux",
          "Que les travaux soient réalisés par une entreprise qualifiée RGE (Reconnu Garant de l'Environnement)",
          "Que le propriétaire ait plus de 10 ans d'ancienneté dans le logement",
          "Que le chantier dure moins de trois mois",
        ],
        correctIndex: 1,
        explanation:
          "Sans entreprise RGE, pas d'aides : c'est la condition transversale du système. La qualification se vérifie sur l'annuaire officiel de France Rénov', pour le bon domaine de travaux et à la date du devis.",
      },
      {
        id: "re11",
        question:
          "Un client reçoit un appel : « Bonjour, nous sommes mandatés par l'État pour vos aides à la rénovation à 1 € ». Que doit-il savoir ?",
        options: [
          "C'est une offre légitime s'il rappelle rapidement",
          "Le démarchage téléphonique en rénovation énergétique est interdit par la loi depuis 2020 : cet appel est illégal par définition",
          "Il doit donner son numéro fiscal pour vérifier son éligibilité",
          "Les offres à 1 € sont garanties par l'ANAH",
        ],
        correctIndex: 1,
        explanation:
          "La loi du 24 juillet 2020 interdit le démarchage téléphonique en rénovation énergétique. Personne n'est « mandaté par l'État » à domicile, les conseillers France Rénov' ne démarchent jamais, et les offres « à 1 € » ont été le terreau des grandes fraudes aux CEE.",
      },
      {
        id: "re12",
        question:
          "Un couple aux revenus intermédiaires engage 50 000 € de travaux d'ampleur (saut E→C). Comment se structure typiquement son plan de financement ?",
        options: [
          "Aucune aide : les revenus intermédiaires sont exclus",
          "MaPrimeRénov' d'ampleur (CEE intégrés) pour une part significative, TVA 5,5 % sur les devis, aides locales éventuelles, et le reste à charge via un éco-PTZ sans intérêts",
          "Uniquement un crédit à la consommation classique",
          "L'État avance 100 % puis se rembourse à la revente",
        ],
        correctIndex: 1,
        explanation:
          "Le montage type : subvention MaPrimeRénov' d'ampleur selon les revenus (ordre de grandeur 30 à 90 % d'un plafond de travaux), TVA réduite directement facturée, aides locales, et éco-PTZ jusqu'à 50 000 € pour le reste à charge. Les économies d'énergie compensent souvent la mensualité.",
      },
      {
        id: "re13",
        question:
          "Une installation photovoltaïque de 6 kWc à Aix-en-Provence, sans batterie, avec un bon pilotage des usages : quel ordre de grandeur de rentabilité annoncer honnêtement ?",
        options: [
          "Retour sur investissement en 2 à 3 ans, autonomie totale",
          "Temps de retour d'environ 8 à 12 ans, pour un matériel garanti 25 ans et plus",
          "Aucune rentabilité : le photovoltaïque est déficitaire en France",
          "Rentabilité uniquement si l'on revend la maison dans l'année",
        ],
        correctIndex: 1,
        explanation:
          "Avec ~10-15 k€ posés (ordre de grandeur début 2026) et 1 000 à 1 500 € de recettes annuelles (économies + vente du surplus) dans le sud, le retour se situe entre 8 et 12 ans. Toute promesse de retour en 2-3 ans ou d'« autonomie totale » sans batterie est un signal d'arnaque.",
      },
      {
        id: "re14",
        question:
          "Sans batterie, quelle part de sa production photovoltaïque un foyer autoconsomme-t-il typiquement ?",
        options: [
          "100 % : tout est consommé sur place",
          "30 à 50 % — le reste est injecté au réseau et vendu dans le cadre de l'obligation d'achat (contrat 20 ans)",
          "Moins de 5 %",
          "80 à 90 % dans tous les cas",
        ],
        correctIndex: 1,
        explanation:
          "L'autoconsommation spontanée se situe entre 30 et 50 % : la production a lieu en journée, la consommation plutôt le soir. Le pilotage des usages (chauffe-eau en journée, recharge du véhicule) augmente ce taux — et c'est lui qui fait la rentabilité réelle.",
      },
      {
        id: "re15",
        question:
          "Vous vendez une maison équipée de panneaux photovoltaïques. Quelles vérifications s'imposent ?",
        options: [
          "Aucune : les panneaux suivent la maison automatiquement et sans risque",
          "Statut de l'installation (propriété, crédit, location de toiture), contrat d'obligation d'achat transférable par avenant, conformité (Consuel, déclaration préalable, décennale) et impact DPE/valeur",
          "Il faut obligatoirement démonter les panneaux avant la vente",
          "Seule la facture d'électricité du vendeur est à vérifier",
        ],
        correctIndex: 1,
        explanation:
          "Quatre vérifications : qui possède l'installation (un crédit affecté doit être soldé ou repris, un bail de toiture s'impose à l'acquéreur) ; le contrat d'obligation d'achat, actif transférable par avenant ; la conformité administrative et les garanties ; et la valorisation (production documentée, impact DPE). Bien documentée, l'installation est un argument de vente.",
      },
    ],
  },
  {
    moduleSlug: "immobilier-ia",
    title: "Examen — Immobilier & intelligence artificielle",
    duration: 20,
    questions: [
      {
        id: "ia1",
        question:
          "Un agent demande à ChatGPT le prix moyen au m² d'un quartier et obtient un chiffre précis et convaincant. Quel réflexe professionnel s'impose ?",
        options: [
          "Le publier tel quel : les IA sont connectées aux données notariales",
          "Vérifier le chiffre à la source : une IA générative peut « halluciner » des données plausibles mais fausses",
          "Le majorer de 10 % par prudence",
          "Demander le même chiffre à une autre IA pour le confirmer",
        ],
        correctIndex: 1,
        explanation:
          "Un modèle de langage prédit du texte plausible : il peut inventer des chiffres avec aplomb (« hallucination »). Les données chiffrées se vérifient toujours à la source (DVF, notaires, bases professionnelles). Croiser deux IA ne constitue pas une vérification.",
      },
      {
        id: "ia2",
        question: "Qu'est-ce qu'une IA générative comme ChatGPT, Claude ou Gemini, fondamentalement ?",
        options: [
          "Une base de données immobilière connectée en temps réel",
          "Un modèle de langage entraîné à prédire la suite la plus probable d'un texte",
          "Un moteur de recherche amélioré qui cite toujours ses sources",
          "Un logiciel expert programmé règle par règle par des juristes",
        ],
        correctIndex: 1,
        explanation:
          "Une IA générative est un modèle de langage : elle a appris, sur d'immenses corpus de textes, à générer la suite la plus plausible d'un texte. C'est ce qui explique à la fois son excellence rédactionnelle et ses erreurs factuelles.",
      },
      {
        id: "ia3",
        question: "Quelle est la « règle d'or » de l'usage professionnel de l'IA présentée dans cette formation ?",
        options: [
          "L'IA décide, le professionnel exécute",
          "L'IA propose, le professionnel dispose : vérifier les faits, relire chaque texte, protéger les données",
          "Ne jamais utiliser l'IA pour des documents clients",
          "Utiliser au moins trois IA différentes pour chaque tâche",
        ],
        correctIndex: 1,
        explanation:
          "L'IA produit des propositions ; le professionnel garde la décision et la responsabilité. Les trois garde-fous : vérifier tout fait ou chiffre, relire tout texte avant envoi, ne jamais exposer de données personnelles de clients.",
      },
      {
        id: "ia4",
        question: "Parmi ces tâches, laquelle l'IA générative fait-elle le MIEUX aujourd'hui ?",
        options: [
          "Estimer précisément un bien atypique sans visite",
          "Rédiger, résumer, reformuler et traduire des textes",
          "Négocier un prix avec un acquéreur",
          "Détecter des fissures structurelles sur photos",
        ],
        correctIndex: 1,
        explanation:
          "La langue est le terrain naturel des modèles de langage : rédaction, synthèse, reformulation, traduction. L'estimation fiable exige la visite et le terrain ; la négociation et le conseil restent des compétences humaines.",
      },
      {
        id: "ia5",
        question:
          "Que signifient les quatre lettres de la méthode de prompt CRTE enseignée dans cette formation ?",
        options: [
          "Créativité, Rapidité, Technologie, Efficacité",
          "Contexte, Rôle, Tâche, Exemple",
          "Client, Résultat, Ton, Envoi",
          "Consigne, Relecture, Test, Évaluation",
        ],
        correctIndex: 1,
        explanation:
          "Un prompt efficace donne le Contexte (les faits que l'IA ne peut pas deviner), un Rôle (qui elle doit être), une Tâche précise (format, longueur, structure) et un Exemple de votre ton. Puis on itère sur la proposition.",
      },
      {
        id: "ia6",
        question:
          "Pourquoi joindre une de VOS meilleures annonces à un prompt de rédaction ?",
        options: [
          "Pour prouver à l'IA que vous savez écrire",
          "Parce que l'IA imite très bien un style qu'on lui montre : le texte produit garde VOTRE ton",
          "Pour que l'IA la republie telle quelle",
          "C'est inutile : toutes les IA écrivent pareil",
        ],
        correctIndex: 1,
        explanation:
          "L'exemple est le levier le plus puissant du prompt : le modèle calque le ton, la structure et le niveau de langue du texte fourni. C'est la parade principale contre la « bouillie IA » standardisée.",
      },
      {
        id: "ia7",
        question:
          "Quelle instruction réduit le plus le risque qu'une IA invente des informations dans une réponse à un prospect ?",
        options: [
          "« Sois créatif et convaincant »",
          "« Si une information manque, écris [À COMPLÉTER] au lieu de deviner »",
          "« Réponds le plus vite possible »",
          "« Utilise beaucoup de superlatifs »",
        ],
        correctIndex: 1,
        explanation:
          "Autoriser explicitement l'IA à signaler ce qu'elle ne sait pas — plutôt que de combler les trous — élimine une grande partie des inventions. Le professionnel complète ensuite les blancs avec les vraies informations.",
      },
      {
        id: "ia8",
        question:
          "Un vendeur arrive avec l'estimation d'un site en ligne, supérieure de 15 % à votre avis de valeur. Quelle est la meilleure réponse professionnelle ?",
        options: [
          "S'aligner sur le chiffre du site pour prendre le mandat",
          "Expliquer ce que l'algorithme ne peut pas savoir de SON bien (état, lumière, vis-à-vis, travaux) et étayer votre avis avec de vraies références de ventes",
          "Dénigrer les outils en ligne comme des gadgets",
          "Couper la poire en deux entre les deux chiffres",
        ],
        correctIndex: 1,
        explanation:
          "L'estimation automatisée croise des données passées mais n'a jamais visité. Montrer précisément ses angles morts sur ce bien, références réelles à l'appui, est la meilleure démonstration de la valeur ajoutée de l'agent — sans dénigrer l'outil que le client a utilisé.",
      },
      {
        id: "ia9",
        question:
          "Pour analyser un PV d'assemblée générale de 40 pages avec l'IA, quelle exigence rend l'analyse professionnellement fiable ?",
        options: [
          "Demander un résumé « le plus court possible »",
          "Exiger, pour chaque point relevé, la citation du passage exact et de la page — puis vérifier dans le document",
          "Faire analyser le document par deux IA et comparer",
          "Se contenter des 10 premières pages, l'essentiel y figure toujours",
        ],
        correctIndex: 1,
        explanation:
          "La citation source transforme l'IA de « boîte noire » en index intelligent : chaque alerte (travaux votés, contentieux, impayés) se vérifie en trente secondes dans le document. Jamais de confiance aveugle au résumé seul.",
      },
      {
        id: "ia10",
        question:
          "Un agent veut coller le dossier complet d'un candidat locataire (bulletins de salaire, pièce d'identité) dans un chatbot gratuit « pour vérifier la solvabilité ». Qu'en dites-vous ?",
        options: [
          "Bonne idée : c'est rapide et gratuit",
          "Double faute : transmission de données personnelles sensibles à un outil non maîtrisé (RGPD) ET délégation d'une évaluation de personne à l'IA",
          "Acceptable si le candidat n'est pas informé",
          "Acceptable si l'agent supprime la conversation après",
        ],
        correctIndex: 1,
        explanation:
          "Les documents sensibles (identité, revenus) ne transitent jamais par un outil grand public : c'est un traitement de données non conforme au RGPD. Et l'évaluation de candidats ne se délègue pas à une IA — risque discriminatoire en prime.",
      },
      {
        id: "ia11",
        question: "Quel réflexe RGPD s'applique AVANT de coller un texte concernant un client dans une IA ?",
        options: [
          "Vérifier que le client est bien solvable",
          "Anonymiser : retirer noms, coordonnées et données sensibles — l'IA n'en a pas besoin pour analyser",
          "Mettre le texte en majuscules",
          "Attendre 48h après la signature du mandat",
        ],
        correctIndex: 1,
        explanation:
          "L'anonymisation par défaut (« Monsieur D., cadre, revenus X ») permet presque tous les usages sans exposer de données personnelles. S'y ajoutent : désactiver l'entraînement sur vos conversations et préférer les offres professionnelles pour un usage d'équipe.",
      },
      {
        id: "ia12",
        question: "Selon l'AI Act européen, que doit savoir un client qui dialogue avec le chatbot de votre site ?",
        options: [
          "Le prénom de son conseiller virtuel",
          "Qu'il converse avec une machine et non un humain — la transparence est obligatoire",
          "Rien : le chatbot peut se présenter comme un conseiller humain",
          "Le modèle d'IA exact utilisé et son numéro de version",
        ],
        correctIndex: 1,
        explanation:
          "L'AI Act impose la transparence : l'utilisateur doit savoir qu'il interagit avec une IA. Un chatbot qui se fait passer pour « Julie, votre conseillère » humaine contrevient à cette exigence. Côté agence, l'autre vigilance concerne les outils de scoring de personnes.",
      },
      {
        id: "ia13",
        question:
          "Vous demandez à une IA de « classer 10 dossiers locataires du plus solide au plus fragile ». Quel est le risque juridique principal ?",
        options: [
          "Aucun : le classement algorithmique est neutre par nature",
          "Une discrimination involontaire : si le modèle pondère patronyme, lieu de résidence ou âge, le tri viole les 25 critères prohibés — et la responsabilité reste la vôtre",
          "Une violation du droit d'auteur des candidats",
          "Un problème uniquement si le classement est publié",
        ],
        correctIndex: 1,
        explanation:
          "L'IA peut intégrer des critères prohibés de manière invisible : « c'est l'algorithme » n'est pas une défense — la décision de tri est celle du professionnel. La sélection de candidats ne se délègue pas ; en support, seuls des critères objectifs et légaux (taux d'effort, complétude) sont admissibles.",
      },
      {
        id: "ia14",
        question: "En matière de photos d'annonces, où passe la ligne entre l'autorisé et l'interdit ?",
        options: [
          "Tout est permis tant que le bien se vend",
          "Home staging virtuel signalé (« photo aménagée virtuellement ») : autorisé ; modifier la réalité du bien (effacer un poteau, agrandir une pièce, inventer une vue) : pratique trompeuse interdite",
          "Toute retouche, même la luminosité, est interdite",
          "Les images générées par IA sont interdites dans l'immobilier",
        ],
        correctIndex: 1,
        explanation:
          "Le critère est la loyauté : aider l'acquéreur à se projeter (meublage virtuel signalé) est légitime ; le tromper sur les caractéristiques réelles du bien relève des pratiques commerciales trompeuses (Code de la consommation) et détruit la confiance en visite.",
      },
      {
        id: "ia15",
        question:
          "Une annonce générée par IA contient une erreur qui induit un acquéreur en erreur. Qui est juridiquement responsable ?",
        options: [
          "L'éditeur de l'outil d'IA",
          "Le professionnel qui a publié l'annonce : l'outil n'est jamais responsable à sa place",
          "Personne : l'erreur d'une machine est un cas de force majeure",
          "L'acquéreur, qui aurait dû vérifier",
        ],
        correctIndex: 1,
        explanation:
          "La responsabilité de ce qui est publié incombe au professionnel — c'est la traduction juridique de la règle d'or. D'où la relecture humaine obligatoire avant toute publication, inscrite dans la charte IA d'agence (8 points).",
      },
    ],
  },
];

/** Mélange l'ordre des réponses (graine = id) : la bonne réponse n'est plus toujours en B. */
function shuffleExamQuestion(q: ExamQuestion, target: number): ExamQuestion {
  if (!q.options || q.correctIndex == null) return q;
  const { items, index } = placeAt(q.id, q.options, q.correctIndex, target);
  return { ...q, options: items, correctIndex: index };
}

/** Examens publiés : contenu rédigé ci-dessus, ordre des réponses mélangé. */
export const MODULE_EXAMS: ModuleExam[] = RAW_MODULE_EXAMS.map((exam) => ({
  ...exam,
  // Bonne réponse répartie à parts égales sur A/B/C/D dans chaque examen.
  questions: (() => {
    const positions = balancedPositions(`exam:${exam.moduleSlug}`, exam.questions.length);
    return exam.questions.map((q, i) => shuffleExamQuestion(q, positions[i]));
  })(),
}));

export const FINAL_EXAM_ID = "certification-finale";
export const FINAL_EXAM_QUESTION_COUNT = 30;

/**
 * Modules couverts par l'examen final de certification : le parcours principal
 * (formations autonomes à 59 € exclues) hors modules bonus (déontologie).
 * Avant correctif, l'examen piochait dans TOUS les examens, y compris les
 * formations que les clients du pack n'ont pas achetées.
 */
export function getCertificationExamModuleSlugs(): string[] {
  return FORMATION_MODULES.map((m) => m.slug).filter(
    (slug) => !BONUS_MODULE_SLUGS.includes(slug) && MODULE_EXAMS.some((e) => e.moduleSlug === slug)
  );
}

export function getModuleExam(moduleSlug: string): ModuleExam | undefined {
  if (moduleSlug === FINAL_EXAM_ID) {
    return getFinalExam();
  }
  return MODULE_EXAMS.find((e) => e.moduleSlug === moduleSlug);
}

export function getFinalExam(): ModuleExam {
  // Répartition équilibrée : FINAL_EXAM_QUESTION_COUNT questions tirées au hasard
  // dans les modules certifiants (le reste de la division va aux premiers modules).
  const slugs = getCertificationExamModuleSlugs();
  const perModule = Math.floor(FINAL_EXAM_QUESTION_COUNT / slugs.length);
  let remainder = FINAL_EXAM_QUESTION_COUNT - perModule * slugs.length;
  const allFinalQuestions: ExamQuestion[] = [];

  for (const slug of slugs) {
    const exam = MODULE_EXAMS.find((e) => e.moduleSlug === slug)!;
    const take = perModule + (remainder > 0 ? 1 : 0);
    if (remainder > 0) remainder--;
    const shuffled = [...exam.questions].sort(() => 0.5 - Math.random());
    allFinalQuestions.push(...shuffled.slice(0, take));
  }

  return {
    moduleSlug: FINAL_EXAM_ID,
    title: "Certification Professionnelle — Agent Immobilier (42h)",
    duration: 45,
    questions: allFinalQuestions.sort(() => 0.5 - Math.random()),
  };
}
