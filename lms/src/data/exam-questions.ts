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
    duration: 20,
    questions: [
      {
        id: "d1",
        question:
          "Le vendeur vous a dit ne pas descendre sous 300 000 €. Un acquéreur vous remet une offre écrite à 280 000 €. Que faites-vous ?",
        options: [
          "Vous la transmettez : le vendeur doit connaître toute offre reçue",
          "Vous la refusez vous-même, puisqu'elle est sous le prix plancher",
          "Vous la gardez de côté, au cas où aucune autre offre n'arriverait",
          "Vous demandez d'abord à l'acquéreur de remonter à 300 000 €",
        ],
        correctIndex: 0,
        explanation:
          "Code de déontologie (décret n° 2015-1090), art. 8 : l'agent informe son mandant de toute offre reçue et lui communique les éléments utiles à une décision libre et éclairée. C'est au vendeur, pas à l'agent, de refuser ou de contre-proposer.",
      },
      {
        id: "d2",
        question:
          "Votre frère veut acheter un appartement dont vous avez le mandat de vente. Est-ce possible ?",
        options: [
          "Oui, à condition d'en informer d'abord le vendeur",
          "Non : un proche de l'agent ne peut pas acheter le bien",
          "Oui, sans formalité, s'il paie le prix de l'annonce",
          "Oui, à condition de renoncer à vos honoraires",
        ],
        correctIndex: 0,
        explanation:
          "Art. 9 du code de déontologie : l'agent ne peut acquérir, ni faire acquérir par un proche ou une société dans laquelle il a des intérêts, un bien dont il a le mandat, sans en avoir préalablement informé son mandant. L'information doit précéder toute offre.",
      },
      {
        id: "d3",
        question:
          "Votre agence détient des parts d'un courtier en crédit que vous recommandez à vos acquéreurs. Que devez-vous faire ?",
        options: [
          "Les informer de ce lien et de l'avantage que vous en tirez",
          "Rien, tant que le taux du courtier reste vraiment compétitif",
          "Cesser toute recommandation : la loi Hoguet l'interdit",
          "Le déclarer à la CCI lors du renouvellement de carte",
        ],
        correctIndex: 0,
        explanation:
          "Art. 9 du code de déontologie : l'agent informe ses mandants et les autres parties des liens capitalistiques ou juridiques qu'il a avec les entreprises, banques ou établissements financiers dont il propose les services, ainsi que de toute rémunération qu'il en tire.",
      },
      {
        id: "d4",
        question:
          "Des héritiers en désaccord vous demandent une valeur de la maison pour leur partage. Que leur précisez-vous ?",
        options: [
          "Votre avis de valeur n'est pas une expertise : un expert peut s'imposer",
          "Votre estimation s'impose aux héritiers comme au notaire chargé du partage",
          "Votre estimation vaut expertise, dès lors qu'elle est signée et datée",
          "Rien : la valeur retenue relève de l'administration fiscale seule",
        ],
        correctIndex: 0,
        explanation:
          "Art. 6 du code de déontologie : quand il estime un bien, l'agent informe son client que l'estimation n'est pas une expertise. Art. 4 : il refuse les missions pour lesquelles il n'est pas compétent ou oriente vers un expert qualifié, ce qui s'impose en cas de partage conflictuel.",
      },
      {
        id: "d5",
        question:
          "Un vendeur est sous mandat exclusif avec un confrère jusqu'en décembre. Il vous propose de faire visiter « discrètement ». Que faites-vous ?",
        options: [
          "Vous refusez : vous l'inciteriez à violer son exclusivité",
          "Vous acceptez : le vendeur reste libre de choisir son agent",
          "Vous acceptez, si vous ne posez aucun panneau sur le bien",
          "Vous acceptez, à condition de partager vos honoraires",
        ],
        correctIndex: 0,
        explanation:
          "Art. 10 du code de déontologie (confraternité) : l'agent s'abstient d'inciter les clients d'un confrère à rompre leurs engagements. Le vendeur qui vend par un autre agent pendant l'exclusivité doit en outre une indemnité au premier. Vous pourrez intervenir à la fin du mandat.",
      },
      {
        id: "d6",
        question:
          "Un bailleur vous demande d'écarter les candidats avec de jeunes enfants, « pour le parquet ». Que faites-vous ?",
        options: [
          "Vous refusez : la situation de famille est un critère interdit",
          "Vous acceptez : le bailleur reste libre de choisir son locataire",
          "Vous acceptez, à condition de ne pas l'écrire dans l'annonce",
          "Vous acceptez, mais seulement pour une location meublée",
        ],
        correctIndex: 0,
        explanation:
          "La situation de famille fait partie des critères de l'article 225-1 du Code pénal. Refuser un logement pour ce motif est une discrimination, et l'agent qui exécute la consigne engage sa propre responsabilité. Le seul critère légitime est la solvabilité, appréciée sur des pièces autorisées.",
      },
      {
        id: "d7",
        question: "Parmi ces pièces, laquelle pouvez-vous demander à un candidat locataire ?",
        options: [
          "Ses trois derniers bulletins de salaire",
          "Ses trois derniers relevés de compte bancaire",
          "Une attestation de bonne tenue de son compte",
          "Un extrait de son casier judiciaire",
        ],
        correctIndex: 0,
        explanation:
          "Le décret n° 2015-1437 du 5 novembre 2015 fixe la liste limitative des pièces exigibles : identité, domicile, activité professionnelle, ressources (bulletins de salaire, avis d'imposition…). Relevés de compte, attestation de bonne tenue de compte et casier judiciaire sont interdits.",
      },
      {
        id: "d8",
        question: "Un candidat locataire n'est pas retenu. Combien de temps pouvez-vous garder son dossier ?",
        options: [
          "Trois mois au plus, puis suppression",
          "Un an, pour pouvoir le recontacter plus tard",
          "Trois ans, comme pour un prospect",
          "Cinq ans, comme l'exige TRACFIN",
        ],
        correctIndex: 0,
        explanation:
          "Le référentiel de la CNIL sur la gestion locative (2021) retient trois mois pour les dossiers des candidats non retenus : passé ce délai, ils sont supprimés ou anonymisés. Le dossier contient des données sensibles (ressources, identité) qui n'ont plus de raison d'être conservées.",
      },
      {
        id: "d9",
        question:
          "Une association fait un testing sur votre agence : deux candidats identiques, sauf le nom. Seul l'un est rappelé. Cette preuve est-elle recevable ?",
        options: [
          "Oui : la loi admet le testing comme preuve de discrimination",
          "Non : une preuve obtenue par un stratagème est irrecevable",
          "Non, sauf si le testing a été mené par un commissaire de justice",
          "Oui, mais elle ne peut fonder qu'une action civile en réparation",
        ],
        correctIndex: 0,
        explanation:
          "Article 225-3-1 du Code pénal : la discrimination est constituée même si elle vise des personnes qui ont sollicité le bien dans le but de démontrer le comportement discriminatoire. Le testing est une preuve recevable devant le juge pénal.",
      },
      {
        id: "d10",
        question: "Un agent refuse une location à un candidat en raison de son origine. Quelle peine encourt-il personnellement ?",
        options: [
          "Jusqu'à 3 ans d'emprisonnement et 45 000 € d'amende",
          "Une amende administrative de 1 500 € prononcée par la CCI",
          "Aucune : seul le bailleur qui a donné la consigne est poursuivi",
          "Des dommages-intérêts au candidat, sans aucune sanction pénale",
        ],
        correctIndex: 0,
        explanation:
          "Article 225-2 du Code pénal : refuser la fourniture d'un bien ou d'un service pour un motif discriminatoire est puni de 3 ans d'emprisonnement et 45 000 € d'amende (le quintuple pour une personne morale). L'agent qui exécute la consigne du bailleur est lui-même auteur de l'infraction.",
      },
      {
        id: "d11",
        question:
          "Un voisin vous demande à quel prix l'appartement du 3e a été vendu, et pourquoi le vendeur est parti. Que répondez-vous ?",
        options: [
          "Rien : les informations sur votre client restent confidentielles",
          "Le prix, puisqu'il sera de toute façon publié dans la base publique DVF",
          "Tout, si le voisin envisage de vendre lui-même son appartement",
          "Tout, puisque la vente est désormais signée chez le notaire",
        ],
        correctIndex: 0,
        explanation:
          "Art. 7 du code de déontologie : l'agent fait preuve de prudence et de discrétion sur les informations relatives à ses mandants et aux contrats. Il n'en est délié que par la loi, une décision de justice ou l'accord de l'intéressé. Les données DVF publiques, anonymisées, ne l'autorisent pas à commenter la situation de son client.",
      },
      {
        id: "d12",
        question: "Quelle formation continue un négociateur titulaire d'une attestation d'habilitation doit-il suivre ?",
        options: [
          "42 h sur 3 ans, dont 2 h de déontologie et 2 h de non-discrimination",
          "14 h par an, sans thème imposé, pour le seul titulaire de la carte",
          "21 h sur 3 ans, uniquement en présentiel dans un centre agréé",
          "Aucune : la formation continue ne vise que le seul titulaire de la carte",
        ],
        correctIndex: 0,
        explanation:
          "Décret n° 2016-173 : 14 heures par an ou 42 heures sur trois années consécutives, pour le titulaire de la carte, les dirigeants et les collaborateurs habilités. Sur trois ans, au moins 2 heures portent sur la déontologie et 2 heures sur la non-discrimination dans l'accès au logement (décret n° 2020-1259).",
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
          "Un artisan boulanger, immatriculé comme artisan, loue une boutique pour y exploiter son fonds. Son bail relève-t-il du statut des baux commerciaux ?",
        options: [
          "Oui : le statut couvre les fonds des commerçants et des artisans",
          "Non : seuls les commerçants inscrits au RCS peuvent en bénéficier",
          "Non : le statut suppose un bail signé devant un notaire",
          "Oui, mais seulement si la boutique a une enseigne sur la rue",
        ],
        correctIndex: 0,
        explanation:
          "Article L.145-1 du Code de commerce : le statut s'applique aux baux des locaux dans lesquels un fonds est exploité, qu'il appartienne à un commerçant ou à un artisan immatriculé. Aucune forme notariée n'est exigée.",
      },
      {
        id: "mf2",
        question: "Un restaurateur signe un bail commercial classique. Quelle durée minimale, et quand peut-il partir ?",
        options: [
          "9 ans au moins ; il peut partir à la fin de chaque période de 3 ans",
          "6 ans au moins ; il ne peut partir qu'à l'expiration du bail",
          "3 ans au moins ; il peut partir à tout moment, avec 3 mois de préavis",
          "12 ans au moins ; il ne peut partir qu'au terme de la 9e année",
        ],
        correctIndex: 0,
        explanation:
          "Article L.145-4 du Code de commerce : la durée du bail commercial ne peut être inférieure à 9 ans. Le locataire peut donner congé à l'expiration de chaque période triennale, au moins 6 mois à l'avance (sauf exceptions, notamment pour les baux de plus de 9 ans).",
      },
      {
        id: "mf3",
        question:
          "Un bail de 9 ans est renouvelé. Le bailleur veut porter le loyer à la valeur du marché, 30 % plus haut. Le peut-il ?",
        options: [
          "Non, sauf modification notable : la hausse suit l'indice ILC ou ILAT",
          "Oui : au renouvellement, le loyer est toujours fixé au prix du marché",
          "Oui, si le locataire ne conteste pas sous un mois devant la CCI",
          "Non : le loyer reste celui du bail initial, sans aucune indexation",
        ],
        correctIndex: 0,
        explanation:
          "Article L.145-34 du Code de commerce : pour un bail de 9 ans, le loyer de renouvellement est plafonné à la variation de l'indice (ILC ou ILAT), sauf modification notable des éléments de la valeur locative. Même en cas de déplafonnement, la hausse est étalée : 10 % au plus par an.",
      },
      {
        id: "mf4",
        question: "Lequel de ces éléments ne fait jamais partie d'un fonds de commerce ?",
        options: [
          "Les murs dans lesquels le fonds est exploité",
          "La clientèle attachée à l'exploitation du fonds",
          "Le droit au bail du local où il est exploité",
          "Le nom commercial et l'enseigne de l'activité",
        ],
        correctIndex: 0,
        explanation:
          "Le fonds de commerce est un ensemble de biens mobiliers : clientèle (élément essentiel), nom commercial, enseigne, droit au bail, matériel, marchandises (art. L.141-5 du Code de commerce). Les murs sont un immeuble : ils se vendent séparément, souvent à un autre acquéreur.",
      },
      {
        id: "mf5",
        question:
          "La cession d'un fonds a été publiée au BODACC. De quel délai disposent les créanciers du vendeur pour faire opposition au paiement du prix ?",
        options: [
          "10 jours après la dernière publication ; le prix reste séquestré",
          "2 mois après l'acte ; le prix est versé directement au vendeur",
          "1 an, pendant lequel l'acquéreur répond des dettes du vendeur",
          "Aucun délai : les créanciers perdent leurs droits à la signature",
        ],
        correctIndex: 0,
        explanation:
          "Article L.141-14 du Code de commerce : les créanciers du cédant peuvent former opposition dans les 10 jours suivant la dernière publication. C'est pourquoi le prix est confié à un séquestre : l'acquéreur qui paierait le vendeur trop tôt pourrait devoir payer une seconde fois.",
      },
      {
        id: "mf6",
        question: "Le propriétaire des murs d'une boutique veut les vendre à un investisseur. Le commerçant locataire a-t-il un droit ?",
        options: [
          "Oui : un droit de préférence, il reçoit l'offre en premier",
          "Non : la vente des murs ne regarde que le bailleur et l'acquéreur",
          "Oui, mais seulement si son bail prévoit une clause de préemption",
          "Oui : il peut exiger une baisse de loyer du nouveau propriétaire",
        ],
        correctIndex: 0,
        explanation:
          "Article L.145-46-1 du Code de commerce (loi Pinel) : le bailleur notifie au locataire le prix et les conditions de la vente. Le locataire a un mois pour accepter, puis deux mois pour signer (quatre s'il emprunte). Des exceptions existent : vente globale d'un immeuble, cession au conjoint ou à un parent…",
      },
      {
        id: "mf7",
        question: "Le bailleur refuse le renouvellement du bail, sans motif grave et légitime. Que doit-il au locataire ?",
        options: [
          "Une indemnité d'éviction, égale au préjudice causé par le refus",
          "Rien, dès lors que le congé a été donné six mois avant le terme",
          "Un mois de loyer par année d'occupation, plafonné à 12 mois",
          "Le seul remboursement des travaux réalisés dans le local loué",
        ],
        correctIndex: 0,
        explanation:
          "Article L.145-14 du Code de commerce : le bailleur peut refuser le renouvellement, mais il doit alors payer une indemnité d'éviction égale au préjudice causé. Il n'en est dispensé qu'en cas de motif grave et légitime, ou dans les cas prévus par la loi (immeuble insalubre, reconstruction…).",
      },
      {
        id: "mf8",
        question: "Que comprend en principe l'indemnité d'éviction d'un commerçant qui perd son fonds ?",
        options: [
          "La valeur du fonds, plus les frais de déménagement et de réinstallation",
          "Trois années de loyer, quel que soit le chiffre d'affaires réalisé du fonds",
          "Le seul remboursement des travaux d'aménagement non encore amortis",
          "Un forfait fixé par la CCI en fonction de la surface du local loué",
        ],
        correctIndex: 0,
        explanation:
          "Article L.145-14 : l'indemnité comprend notamment la valeur marchande du fonds, augmentée des frais normaux de déménagement et de réinstallation et des frais et droits de mutation d'un fonds de même valeur. Si le fonds peut être transféré sans perte de clientèle, elle se limite à la valeur du droit au bail.",
      },
      {
        id: "mf9",
        question: "Le bailleur veut délivrer congé pour la fin du bail commercial. Sous quelle forme et dans quel délai ?",
        options: [
          "Par acte de commissaire de justice, au moins 6 mois avant",
          "Par lettre recommandée avec AR, au moins 3 mois avant",
          "Par courriel, si le bail prévoit ce mode de notification",
          "Oralement, avec une confirmation écrite dans le mois suivant",
        ],
        correctIndex: 0,
        explanation:
          "Article L.145-9 du Code de commerce : le congé du bailleur est délivré par acte extrajudiciaire (commissaire de justice, ex-huissier), au moins 6 mois à l'avance, et indique ses motifs. Seul le locataire peut utiliser la lettre recommandée pour son congé triennal (art. L.145-4).",
      },
      {
        id: "mf10",
        question: "Une avocate loue un local pour y installer son cabinet. Quel bail s'applique en principe ?",
        options: [
          "Un bail professionnel : 6 ans au moins, congé à tout moment",
          "Un bail commercial : l'avocate exerce une activité de service",
          "Un bail d'habitation, puisque la locataire est une personne physique",
          "Un bail dérogatoire, seul bail ouvert aux professions libérales",
        ],
        correctIndex: 0,
        explanation:
          "Les professions libérales ne sont pas commerçantes : leur local relève du bail professionnel (loi du 23 décembre 1986, art. 57 A), d'au moins 6 ans, que le locataire peut résilier à tout moment avec 6 mois de préavis. Les parties peuvent toutefois choisir volontairement le statut commercial.",
      },
      {
        id: "mf11",
        question:
          "Le bail met « toutes les réparations » à la charge du locataire. Le bailleur peut-il lui faire payer la réfection de la toiture ?",
        options: [
          "Non : les grosses réparations ne peuvent pas lui être imputées",
          "Oui : la clause du bail prime, le locataire l'a acceptée en signant",
          "Oui, à condition de lui accorder en échange une baisse de loyer",
          "Non, sauf si le bail commercial a été signé devant un notaire",
        ],
        correctIndex: 0,
        explanation:
          "Article R.145-35 du Code de commerce (loi Pinel, baux conclus ou renouvelés depuis le 5 novembre 2014) : les grosses réparations de l'article 606 du Code civil (toiture, gros murs, voûtes…) ne peuvent pas être mises à la charge du locataire. La clause est sans effet sur ce point.",
      },
      {
        id: "mf12",
        question: "Un investisseur achète des murs de boutique via une société à l'IS. Comment sont taxés les loyers et la plus-value ?",
        options: [
          "IS sur le résultat après amortissement ; plus-value sans abattement",
          "Revenus fonciers à l'IR ; plus-value avec abattement pour durée",
          "Loyers exonérés, car il s'agit de murs à usage commercial",
          "IS sur les loyers bruts ; plus-value totalement exonérée après 22 ans",
        ],
        correctIndex: 0,
        explanation:
          "À l'IS, les loyers entrent dans le résultat de la société, après déduction des charges et de l'amortissement du bien (hors terrain). La plus-value est professionnelle : calculée sur la valeur nette comptable, sans abattement pour durée de détention, donc souvent élevée à la revente.",
      },
      {
        id: "mf13",
        question: "Un promoteur veut louer un local pendant 2 ans pour une agence de vente temporaire. Quel bail est adapté ?",
        options: [
          "Un bail dérogatoire : 3 ans au plus, sans droit au renouvellement",
          "Un bail commercial de 9 ans, avec un congé possible dès la 3e année",
          "Un bail professionnel de 6 ans, réservé aux promoteurs",
          "Un bail emphytéotique, d'une durée de 18 à 99 ans",
        ],
        correctIndex: 0,
        explanation:
          "Article L.145-5 du Code de commerce : le bail dérogatoire ne peut excéder 3 ans au total, renouvellements compris, et n'ouvre pas droit au statut. Attention : si le locataire reste en place plus d'un mois après le terme sans opposition du bailleur, un bail commercial de 9 ans naît.",
      },
      {
        id: "mf14",
        question:
          "Des murs de boutique sont loués 24 000 € HT par an. Prix d'achat, frais compris : 400 000 €. Quel est le rendement brut ?",
        options: [
          "6 %",
          "4,8 %",
          "7,5 %",
          "16,7 %",
        ],
        correctIndex: 0,
        explanation:
          "Rendement brut = loyer annuel / prix d'acquisition frais compris = 24 000 / 400 000 = 6 %. Le rendement net retranche les charges non refacturables ; la taxe foncière peut être refacturée au locataire si le bail le prévoit, mais pas les grosses réparations.",
      },
      {
        id: "mf15",
        question:
          "Un commerçant cède son fonds, bail compris. Le bail prévoit qu'il reste garant solidaire du repreneur. Pour combien de temps ?",
        options: [
          "3 ans au plus à compter de la cession",
          "Jusqu'au terme du bail cédé, sans limite",
          "9 ans, durée légale d'un bail commercial",
          "Aucune : la clause est interdite par la loi",
        ],
        correctIndex: 0,
        explanation:
          "Article L.145-16-2 du Code de commerce (loi Pinel) : la garantie solidaire du cédant ne peut être invoquée que pendant 3 ans à compter de la cession. Le bailleur doit en outre l'informer de tout défaut de paiement du repreneur dans le mois où le loyer aurait dû être payé (art. L.145-16-1).",
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
          "Un acquéreur découvre que la maison achetée, annoncée en classe D, relève en réalité de la classe F. Peut-il agir ?",
        options: [
          "Oui : le DPE est opposable, il peut agir contre le vendeur",
          "Non : le DPE n'a qu'une valeur informative pour l'acquéreur",
          "Non, sauf si la maison a été construite avant l'année 1975",
          "Oui, mais uniquement contre l'agence qui a publié l'annonce",
        ],
        correctIndex: 0,
        explanation:
          "Depuis le 1er juillet 2021 (loi ELAN), le DPE est opposable : l'acquéreur ou le locataire peut se retourner contre le vendeur ou le bailleur, qui pourra lui-même appeler le diagnostiqueur en garantie. Seules les recommandations de travaux restent indicatives.",
      },
      {
        id: "re2",
        question: "Depuis juillet 2021, sur quoi repose le calcul du DPE d'un logement ?",
        options: [
          "Les caractéristiques du bâti : isolation, fenêtres, chauffage, ventilation",
          "Les factures d'énergie des occupants sur les trois dernières années",
          "La moyenne des consommations relevées dans le quartier du logement",
          "Une déclaration du propriétaire, contrôlée ensuite par le notaire",
        ],
        correctIndex: 0,
        explanation:
          "La méthode 3CL-DPE 2021 calcule la consommation à partir du bâti et des équipements, et non plus des factures, qui dépendent des habitudes des occupants. Depuis le 1er janvier 2026, l'électricité y est comptée avec un coefficient de 1,9 au lieu de 2,3.",
      },
      {
        id: "re3",
        question:
          "Octobre 2026. Un bailleur loue depuis 2023 un appartement classé F. Que doit-il savoir ?",
        options: [
          "Il pourra le louer jusqu'au 1er janvier 2028, mais sans hausse de loyer",
          "Il ne peut déjà plus le louer : les logements F sont indécents depuis 2025",
          "Il pourra le louer jusqu'en 2034, date fixée pour toutes les classes",
          "Il peut le louer sans limite : l'interdiction ne vise que les ventes",
        ],
        correctIndex: 0,
        explanation:
          "Calendrier de la loi Climat et Résilience : les logements G ne sont plus décents depuis le 1er janvier 2025, les F ne le seront plus au 1er janvier 2028, les E en 2034. Depuis août 2022, le loyer des logements F et G ne peut plus être augmenté, ni en cours de bail, ni au renouvellement, ni à la relocation.",
      },
      {
        id: "re4",
        question: "Une annonce de vente concerne une maison classée G. Quelle mention doit-elle porter ?",
        options: [
          "« Logement à consommation énergétique excessive »",
          "« Travaux de rénovation obligatoires avant la vente »",
          "« Passoire thermique : location définitivement interdite »",
          "Aucune mention particulière : la classe G suffit",
        ],
        correctIndex: 0,
        explanation:
          "Pour les logements classés F et G, l'annonce, de vente comme de location, doit porter la mention « logement à consommation énergétique excessive », en plus des classes énergie et climat et de l'estimation des dépenses annuelles d'énergie. Aucune obligation de travaux ne pèse sur la vente.",
      },
      {
        id: "re5",
        question: "Dans une maison ancienne non isolée, quelle paroi laisse en général fuir le plus de chaleur ?",
        options: [
          "La toiture, autour de 25 à 30 % des pertes",
          "Les fenêtres, autour de 40 à 50 % des pertes",
          "Le plancher bas, autour de 35 % des pertes",
          "La porte d'entrée, autour de 20 % des pertes",
        ],
        correctIndex: 0,
        explanation:
          "La chaleur monte : dans une maison non isolée, la toiture représente 25 à 30 % des déperditions (ADEME), devant les murs (20 à 25 %), l'air renouvelé et les fuites, les fenêtres (10 à 15 %) et le plancher bas (7 à 10 %). Isoler les combles est souvent le premier geste le plus rentable.",
      },
      {
        id: "re6",
        question: "Un client fait isoler sa maison et changer ses fenêtres, sans rien d'autre. Quel risque lui signaler ?",
        options: [
          "Sans ventilation adaptée, humidité et moisissures",
          "Un DPE automatiquement dégradé d'une classe entière",
          "Une maison devenue trop chaude en plein hiver",
          "Aucun : l'isolation n'a que des avantages",
        ],
        correctIndex: 0,
        explanation:
          "Une maison rendue étanche sans ventilation adaptée (VMC) n'évacue plus l'humidité : condensation, moisissures, air intérieur dégradé. Isolation, étanchéité et ventilation se pensent ensemble, dans un bouquet de travaux cohérent.",
      },
      {
        id: "re7",
        question: "Pourquoi conseille-t-on d'isoler avant de remplacer le système de chauffage ?",
        options: [
          "Les besoins baissent : l'équipement installé est plus petit et moins cher",
          "Les aides publiques ne financent plus que l'isolation des logements",
          "Les pompes à chaleur sont interdites dans les maisons non isolées",
          "La loi impose cet ordre précis des travaux depuis le 1er janvier 2025",
        ],
        correctIndex: 0,
        explanation:
          "Une fois l'enveloppe traitée, les besoins de chauffage chutent : on dimensionne un équipement plus petit, moins cher, qui fonctionne mieux. Aucune loi n'impose l'ordre des travaux, et MaPrimeRénov' par geste finance justement le chauffage décarboné.",
      },
      {
        id: "re8",
        question: "Quelles conditions ouvrent la rénovation d'ampleur de MaPrimeRénov' en 2026 ?",
        options: [
          "Logement classé E, F ou G, gain de 2 classes et accompagnement",
          "Tout logement, dès 10 000 € de travaux faits par un artisan RGE",
          "Le seul remplacement d'une chaudière au fioul par une pompe à chaleur",
          "Un chantier achevé en moins de six mois, sans condition de DPE",
        ],
        correctIndex: 0,
        explanation:
          "Guide des aides de l'Anah (septembre 2026) : le parcours d'ampleur est réservé aux logements classés E, F ou G, de plus de 15 ans, en résidence principale. Il exige au moins deux gestes d'isolation, un gain d'au moins deux classes et l'accompagnement de Mon Accompagnateur Rénov'.",
      },
      {
        id: "re9",
        question:
          "Un ménage aux revenus intermédiaires gagne deux classes avec 50 000 € HT de travaux. Quelle aide MaPrimeRénov' d'ampleur ?",
        options: [
          "13 500 € : 45 % d'un plafond de 30 000 € HT",
          "22 500 € : 45 % du montant total des travaux",
          "24 000 € : 80 % d'un plafond de 30 000 € HT",
          "3 000 € : 10 % d'un plafond de 30 000 € HT",
        ],
        correctIndex: 0,
        explanation:
          "Barème 2026 : plafond de dépenses de 30 000 € HT pour un gain de deux classes (40 000 € pour trois ou plus), et taux de 80 % (très modestes), 60 % (modestes), 45 % (intermédiaires) ou 10 % (supérieurs). Ici : 30 000 × 45 % = 13 500 €.",
      },
      {
        id: "re10",
        question: "Quelle condition est commune à MaPrimeRénov', aux CEE et à l'éco-PTZ ?",
        options: [
          "Des travaux réalisés par une entreprise qualifiée RGE",
          "Un logement laissé vide pendant toute la durée du chantier",
          "Un propriétaire installé dans le logement depuis dix ans",
          "Un chantier entièrement terminé en moins de trois mois",
        ],
        correctIndex: 0,
        explanation:
          "La qualification RGE (Reconnu garant de l'environnement) de l'entreprise conditionne MaPrimeRénov', les primes CEE et l'éco-PTZ. Vérifiez-la sur l'annuaire officiel de France Rénov' avant de signer un devis.",
      },
      {
        id: "re11",
        question:
          "Un client reçoit un appel : « Nous sommes mandatés par l'État pour vos aides à la rénovation. » Que lui dites-vous ?",
        options: [
          "C'est illégal : ce démarchage par téléphone est interdit",
          "C'est légitime s'il vérifie le numéro SIRET de l'entreprise",
          "C'est légal s'il a donné son accord préalable à ces appels",
          "C'est une démarche officielle du réseau France Rénov'",
        ],
        correctIndex: 0,
        explanation:
          "La loi du 24 juillet 2020 interdit le démarchage téléphonique en rénovation énergétique, même avec le consentement du particulier (sauf contrat en cours). Personne n'est « mandaté par l'État » : France Rénov' ne démarche pas, c'est le ménage qui la contacte.",
      },
      {
        id: "re12",
        question: "Pour financer le reste à charge d'une rénovation d'ampleur aidée par MaPrimeRénov', quel prêt peut-on obtenir ?",
        options: [
          "Un éco-PTZ jusqu'à 50 000 €, sur 20 ans au plus",
          "Un prêt de l'Anah sans intérêts, sans plafond de montant",
          "Un éco-PTZ de 15 000 € au plus, à rembourser sur 10 ans",
          "Aucun : MaPrimeRénov' exclut tout prêt à taux zéro",
        ],
        correctIndex: 0,
        explanation:
          "L'éco-PTZ MaPrimeRénov' finance le reste à charge jusqu'à 50 000 €, sur 20 ans au plus, avec des démarches simplifiées : la notification de l'Anah remplace les devis auprès de la banque. Il faut le débloquer dans les 6 mois suivant l'octroi de l'aide.",
      },
      {
        id: "re13",
        question:
          "Octobre 2026. Un client veut 6 kWc de panneaux en Provence, sans batterie. Que lui dites-vous de la rentabilité ?",
        options: [
          "Elle repose sur l'autoconsommation : retour vers 11 à 15 ans",
          "Le surplus vendu rembourse l'installation en quatre ou cinq ans",
          "La prime à l'autoconsommation couvre un tiers du prix du devis",
          "Aucune rentabilité n'est possible : le solaire est déficitaire",
        ],
        correctIndex: 0,
        explanation:
          "Arrêté du 1er juin 2026 : pour les installations de 9 kWc au plus dont le raccordement est demandé depuis le 5 juin 2026, le surplus est racheté 1,1 c€/kWh et la prime à l'autoconsommation a disparu. La rentabilité vient des économies sur la facture : retour de l'ordre de 11 à 15 ans, pour un matériel garanti 25 ans.",
      },
      {
        id: "re14",
        question: "Sans batterie, quelle part de sa production un foyer consomme-t-il en général sur place ?",
        options: [
          "30 à 50 % ; le reste part sur le réseau",
          "100 % : tout est consommé dans la maison",
          "80 à 90 %, quel que soit le mode de vie",
          "Moins de 5 %, presque tout est revendu",
        ],
        correctIndex: 0,
        explanation:
          "Sans batterie, un foyer autoconsomme typiquement 30 à 50 % de sa production. Depuis juin 2026, le surplus injecté ne rapporte presque plus rien : on augmente la part autoconsommée en décalant les usages en journée (chauffe-eau, recharge du véhicule, électroménager).",
      },
      {
        id: "re15",
        question: "Vous vendez une maison équipée de panneaux solaires. Que vérifiez-vous en priorité ?",
        options: [
          "Propriété, contrat d'achat, conformité et effet sur le DPE",
          "Rien : les panneaux suivent la maison, sans aucun risque",
          "La seule facture d'électricité du vendeur sur douze mois",
          "Que les panneaux soient démontés avant la signature",
        ],
        correctIndex: 0,
        explanation:
          "Quatre vérifications : qui possède l'installation (un crédit affecté doit être soldé ou repris, un bail de toiture s'impose à l'acquéreur) ; le contrat d'obligation d'achat, transférable par avenant (un contrat antérieur à juin 2026 garde son tarif, souvent bien plus élevé) ; la conformité (Consuel, déclaration préalable, décennale) ; l'effet sur le DPE et la valeur.",
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
          "Vous demandez à ChatGPT le prix moyen au m² d'un quartier. Il répond « 4 870 €/m² », chiffre précis et convaincant. Que faites-vous ?",
        options: [
          "Vous le vérifiez à la source (DVF, notaires) avant tout usage",
          "Vous le publiez : les IA sont reliées aux données des notaires",
          "Vous le confirmez en posant la même question à une autre IA",
          "Vous le retenez en le minorant de 10 %, par simple prudence",
        ],
        correctIndex: 0,
        explanation:
          "Une IA générative produit le texte le plus probable, pas un chiffre vérifié : elle peut « halluciner » une donnée plausible mais fausse. Seule une source primaire (base DVF, notaires, références de l'agence) permet d'utiliser un prix. Une seconde IA peut halluciner de la même façon.",
      },
      {
        id: "ia2",
        question: "Fondamentalement, qu'est-ce qu'une IA générative comme ChatGPT, Claude ou Gemini ?",
        options: [
          "Un modèle entraîné à prédire la suite la plus probable d'un texte",
          "Une base de données immobilière mise à jour en temps réel",
          "Un moteur de recherche amélioré qui cite toujours ses sources",
          "Un logiciel expert programmé règle par règle par des juristes",
        ],
        correctIndex: 0,
        explanation:
          "Un grand modèle de langage apprend, sur d'immenses volumes de textes, à prédire la suite la plus probable. D'où sa fluidité, et ses erreurs : il ne consulte pas une base de données et ne garantit pas ses sources, sauf outil de recherche branché et vérifié.",
      },
      {
        id: "ia3",
        question: "Quelle règle résume l'usage professionnel de l'IA enseigné dans cette formation ?",
        options: [
          "L'IA propose, le professionnel vérifie, relit et décide",
          "L'IA décide, le professionnel se contente d'exécuter",
          "Ne jamais utiliser l'IA pour un document destiné à un client",
          "Toujours comparer au moins trois IA pour chaque tâche",
        ],
        correctIndex: 0,
        explanation:
          "L'IA propose, le professionnel dispose : vérifier les faits, relire chaque texte, protéger les données. L'IA fait gagner du temps sur la rédaction et l'analyse, mais la responsabilité reste celle de l'agent.",
      },
      {
        id: "ia4",
        question: "Parmi ces tâches, laquelle l'IA générative accomplit-elle le mieux aujourd'hui ?",
        options: [
          "Rédiger, résumer, reformuler et traduire des textes",
          "Détecter des fissures structurelles sur des photos",
          "Mener seule une négociation de prix avec un acquéreur",
          "Estimer un bien atypique avec précision, sans visite",
        ],
        correctIndex: 0,
        explanation:
          "Le langage est le cœur de compétence des modèles génératifs : rédaction, synthèse, reformulation, traduction. Le diagnostic technique, la négociation et l'estimation d'un bien atypique exigent une expertise et une présence humaines.",
      },
      {
        id: "ia5",
        question: "Que signifient les quatre lettres de la méthode de prompt CRTE enseignée dans cette formation ?",
        options: [
          "Contexte, Rôle, Tâche, Exemple",
          "Client, Résultat, Ton, Envoi",
          "Consigne, Relecture, Test, Envoi",
          "Cible, Rédaction, Ton, Édition",
        ],
        correctIndex: 0,
        explanation:
          "CRTE : donner le Contexte (le bien, le client, l'objectif), un Rôle (« tu es un négociateur expérimenté »), une Tâche précise et un Exemple du résultat attendu. Plus le prompt est structuré, moins l'IA comble les vides en inventant.",
      },
      {
        id: "ia6",
        question: "Pourquoi joindre l'une de vos meilleures annonces à un prompt de rédaction ?",
        options: [
          "L'IA imite le style qu'on lui montre : le texte garde votre ton",
          "Pour que l'IA la reprenne mot pour mot dans la nouvelle annonce",
          "Pour prouver à l'IA que vous maîtrisez la rédaction d'annonces",
          "C'est inutile : toutes les IA rédigent exactement de la même façon",
        ],
        correctIndex: 0,
        explanation:
          "Un exemple est l'instruction la plus efficace : l'IA reproduit le ton, la structure et la longueur qu'on lui montre. Sans exemple, elle produit un texte générique, souvent chargé de superlatifs.",
      },
      {
        id: "ia7",
        question:
          "Vous faites rédiger par une IA une réponse à un prospect. Quelle consigne limite le plus le risque d'informations inventées ?",
        options: [
          "« Si une information manque, écris [À COMPLÉTER] »",
          "« Sois créatif, chaleureux et vraiment convaincant »",
          "« Réponds le plus vite possible, en trois lignes »",
          "« Mets en avant tous les atouts possibles du bien »",
        ],
        correctIndex: 0,
        explanation:
          "Autoriser explicitement l'IA à signaler un manque, plutôt qu'à deviner, réduit fortement les hallucinations. Les consignes de créativité ou de mise en valeur l'incitent au contraire à combler les vides.",
      },
      {
        id: "ia8",
        question:
          "Un vendeur arrive avec l'estimation d'un site en ligne, 15 % au-dessus de votre avis de valeur. Que faites-vous ?",
        options: [
          "Vous montrez ce que l'algorithme ignore du bien, références à l'appui",
          "Vous vous alignez sur le chiffre du site pour obtenir le mandat",
          "Vous coupez la poire en deux entre les deux estimations reçues",
          "Vous expliquez que ces outils en ligne ne sont que des gadgets",
        ],
        correctIndex: 0,
        explanation:
          "Un estimateur automatique ignore l'état, la luminosité, le vis-à-vis ou les travaux du bien. On étaye son avis de valeur par de vraies ventes comparables, sans dénigrer l'outil. S'aligner sur un prix surévalué fait perdre des mois au vendeur.",
      },
      {
        id: "ia9",
        question:
          "Vous faites analyser par l'IA un PV d'assemblée générale de 40 pages. Qu'exigez-vous pour que l'analyse soit fiable ?",
        options: [
          "Pour chaque point, la citation exacte et la page, à vérifier",
          "Un résumé le plus court possible, limité à cinq lignes",
          "L'analyse des dix premières pages, où tout l'essentiel figure",
          "La même analyse par une deuxième IA, pour comparer les deux",
        ],
        correctIndex: 0,
        explanation:
          "Exiger la citation et la page rend chaque affirmation vérifiable : on contrôle dans le document les travaux votés, les procédures ou les impayés. Un résumé trop court ou partiel peut omettre un point déterminant pour l'acquéreur.",
      },
      {
        id: "ia10",
        question:
          "Un collègue colle le dossier complet d'un candidat locataire dans un chatbot gratuit « pour vérifier la solvabilité ». Qu'en dites-vous ?",
        options: [
          "Double faute : données sensibles exposées et décision déléguée",
          "Acceptable, à condition d'effacer la conversation juste après",
          "Acceptable, à condition que le candidat n'en soit pas informé",
          "Bonne pratique : c'est rapide, gratuit et parfaitement neutre",
        ],
        correctIndex: 0,
        explanation:
          "Bulletins de salaire et pièce d'identité partent vers un outil non maîtrisé, sans base légale ni information du candidat (RGPD). Et l'évaluation d'une personne est confiée à un modèle opaque, avec un risque de discrimination dont l'agent reste responsable.",
      },
      {
        id: "ia11",
        question: "Avant de coller dans une IA un texte qui concerne un client, quel réflexe RGPD s'impose ?",
        options: [
          "Anonymiser : retirer noms, coordonnées et données sensibles",
          "Attendre la signature du mandat pour avoir son accord écrit",
          "Vérifier d'abord la solvabilité du client auprès de sa banque",
          "Rien de particulier, dès lors que l'abonnement IA est payant",
        ],
        correctIndex: 0,
        explanation:
          "L'IA n'a pas besoin de l'identité du client pour analyser un texte. Anonymiser (« Client A », adresse retirée) limite le risque. Un abonnement payant ne dispense pas de vérifier les conditions d'usage des données, ni d'informer les personnes.",
      },
      {
        id: "ia12",
        question: "Selon l'AI Act européen, que doit savoir un visiteur qui échange avec le chatbot de votre site ?",
        options: [
          "Qu'il échange avec une IA, et non avec un conseiller humain",
          "Le nom exact du modèle d'IA utilisé et son numéro de version",
          "Rien, si le chatbot se présente avec un prénom de conseiller",
          "Le nom de l'éditeur du chatbot et le pays de ses serveurs",
        ],
        correctIndex: 0,
        explanation:
          "Le règlement européen sur l'IA (art. 50) impose d'informer les personnes qu'elles interagissent avec un système d'IA, sauf si c'est évident. Présenter un chatbot comme un conseiller humain est interdit.",
      },
      {
        id: "ia13",
        question:
          "Vous demandez à une IA de « classer 10 dossiers locataires du plus solide au plus fragile ». Quel est le risque principal ?",
        options: [
          "Une discrimination involontaire, dont vous restez responsable",
          "Aucun : un classement fait par un algorithme est forcément neutre",
          "Une atteinte au droit d'auteur des candidats sur leurs dossiers",
          "Un risque seulement si le classement est publié en ligne",
        ],
        correctIndex: 0,
        explanation:
          "Si le modèle pondère le nom, l'adresse, l'âge ou la situation de famille, le tri devient discriminatoire au sens de l'article 225-1 du Code pénal, même sans intention. La sélection d'un locataire doit reposer sur des critères objectifs de solvabilité, appréciés par l'agent.",
      },
      {
        id: "ia14",
        question: "Pour les photos d'une annonce, où passe la limite entre ce qui est permis et ce qui est interdit ?",
        options: [
          "Meubler virtuellement en le signalant : oui ; effacer un défaut : non",
          "Toute image générée par IA est interdite dans les annonces immobilières",
          "Toute retouche, même de la luminosité, est interdite sur une annonce",
          "Tout est permis, puisque l'acquéreur verra le bien lors de la visite",
        ],
        correctIndex: 0,
        explanation:
          "Le home staging virtuel est admis s'il est signalé (« aménagement virtuel ») et accompagné de photos réelles. Effacer un poteau, agrandir une pièce ou inventer une vue trompe l'acquéreur : c'est une pratique commerciale trompeuse.",
      },
      {
        id: "ia15",
        question: "Une annonce rédigée par IA contient une erreur qui trompe un acquéreur. Qui en répond juridiquement ?",
        options: [
          "Le professionnel qui l'a publiée : l'outil ne répond pas à sa place",
          "L'éditeur de l'outil d'IA, seul auteur du texte de l'annonce",
          "L'acquéreur, qui aurait dû vérifier lui-même chaque information",
          "Personne : l'erreur d'une machine relève de la force majeure",
        ],
        correctIndex: 0,
        explanation:
          "L'annonce est publiée sous la responsabilité du professionnel, qui doit en vérifier l'exactitude. L'IA est un outil : utiliser un texte généré ne transfère ni ne réduit la responsabilité de l'agent envers l'acquéreur.",
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
