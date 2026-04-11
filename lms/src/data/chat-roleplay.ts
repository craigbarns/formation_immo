/**
 * Simulations conversationnelles (roleplay) — format « chat » avec embranchements.
 * Liées par moduleSlug + lessonSlug comme les autres blocs interactifs.
 */

export type ChatRPNode =
  | { id: string; kind: "client"; text: string; next: string }
  | {
      id: string;
      kind: "choose";
      prompt: string;
      options: { label: string; next: string }[];
    }
  | { id: string; kind: "end"; text: string };

export type ChatRoleplayScenario = {
  id: string;
  moduleSlug: string;
  lessonSlug: string;
  title: string;
  description: string;
  startId: string;
  nodes: Record<string, ChatRPNode>;
};

const NEGOCIATION_MANDAT: ChatRoleplayScenario = {
  id: "crp-trans-neg-mandat",
  moduleSlug: "transaction",
  lessonSlug: "negociation-mandat",
  title: "Négociation d'un mandat exclusif",
  description:
    "Un vendeur hésite entre mandat simple et exclusif. Choisissez vos réponses : le ton et les arguments influencent la suite de la conversation.",
  startId: "c-open",
  nodes: {
    "c-open": {
      id: "c-open",
      kind: "client",
      text: "Bonjour. J'ai trois agences qui veulent vendre mon appartement. Pourquoi je signerais un mandat exclusif avec vous plutôt qu'un mandat simple ? Je ne veux pas me fermer des portes.",
      next: "ch-1",
    },
    "ch-1": {
      id: "ch-1",
      kind: "choose",
      prompt: "Votre première réponse :",
      options: [
        {
          label:
            "Le mandat exclusif concentre nos moyens : stratégie prix unique, diffusion coordonnée et suivi quotidien — c'est ce qui débloque les ventes les plus rapides.",
          next: "c-pos",
        },
        {
          label:
            "Si vous refusez l'exclusif, nous passons au suivant. Les mandats simples, nous les signons à la chaîne.",
          next: "c-cold",
        },
        {
          label:
            "Les deux se valent, c'est surtout une question de feeling avec l'agent.",
          next: "c-vague",
        },
      ],
    },
    "c-pos": {
      id: "c-pos",
      kind: "client",
      text: "D'accord, je vois l'idée de coordination. Mais concrètement, quel engagement de votre côté si je vous confie l'exclusivité ?",
      next: "ch-2",
    },
    "c-cold": {
      id: "c-cold",
      kind: "client",
      text: "Euh… ce ton-là ne me rassure pas. Je cherchais un partenaire, pas un ultimatum. Bonne journée.",
      next: "end-lost",
    },
    "c-vague": {
      id: "c-vague",
      kind: "client",
      text: "Hmm. Si vous-même ne tranchez pas, comment voulez-vous me convaincre ? Je vais comparer ailleurs.",
      next: "end-soft",
    },
    "ch-2": {
      id: "ch-2",
      kind: "choose",
      prompt: "Précisez votre proposition :",
      options: [
        {
          label:
            "Planning de diffusion sous 48 h, reporting hebdomadaire, visite ciblée avec feedback le lendemain, et ajustement prix validé ensemble si le marché ne suit pas.",
          next: "c-win",
        },
        {
          label:
            "On verra au feeling une fois le mandat signé — l'essentiel est l'exclusivité.",
          next: "c-weak",
        },
      ],
    },
    "c-win": {
      id: "c-win",
      kind: "client",
      text: "Là c'est clair. Si vous tenez ce rythme, je suis prêt à signer l'exclusif trois mois avec reconduction. Envoyez-moi le projet de mandat.",
      next: "end-win",
    },
    "c-weak": {
      id: "c-weak",
      kind: "client",
      text: "Je préfère qu'on m'écoute sur le calendrier concret avant de signer. Repassez avec un vrai plan d'action.",
      next: "end-soft",
    },
    "end-win": {
      id: "end-win",
      kind: "end",
      text: "Simulation réussie : vous avez structuré l'argument exclusif + un engagement mesurable. C'est typiquement ce qui rassure un vendeur exigeant.",
    },
    "end-soft": {
      id: "end-soft",
      kind: "end",
      text: "Fin de scénario : le client n'est pas convaincu — il faut revenir avec un plan chiffré (délais, reporting, stratégie prix). Réessayez en étant plus précis sur les livrables.",
    },
    "end-lost": {
      id: "end-lost",
      kind: "end",
      text: "Relation rompue : en négociation de mandat, le ton professionnel et l'écoute priment. Reprenez la conversation en valorisant le projet du vendeur.",
    },
  },
};

const PROSPECTION_APPEL: ChatRoleplayScenario = {
  id: "crp-trans-prosp",
  moduleSlug: "transaction",
  lessonSlug: "prospection",
  title: "Appel de prospection — décrocher le rendez-vous",
  description: "Un propriétaire vient d'afficher 'À Vendre'. Vous l'appelez pour décrocher un rendez-vous d'estimation. Choisissez votre accroche : certaines ouvrent la conversation, d'autres la ferment immédiatement.",
  startId: "c-open",
  nodes: {
    "c-open": { id: "c-open", kind: "client", text: "Allô ?", next: "ch-1" },
    "ch-1": {
      id: "ch-1", kind: "choose", prompt: "Votre accroche d'ouverture :",
      options: [
        { label: "Bonjour, j'appelle pour votre panneau 'À Vendre' — j'ai des acheteurs qualifiés qui cherchent exactement ce type de bien dans votre secteur.", next: "c-interesse" },
        { label: "Bonjour, je suis agent immobilier, est-ce que vous envisagez de vendre votre appartement ?", next: "c-mefiant" },
        { label: "Bonjour, vous vendez ? C'est pour combien ?", next: "c-ferme" },
      ],
    },
    "c-interesse": { id: "c-interesse", kind: "client", text: "Ah oui ? Vous avez des acheteurs pour ce secteur ? Parce que j'ai mis le panneau il y a 2 jours et j'ai déjà eu quelques appels mais aucun sérieux.", next: "ch-2" },
    "c-mefiant": { id: "c-mefiant", kind: "client", text: "Je me débrouille tout seul pour l'instant merci. J'ai pas envie de payer des honoraires.", next: "ch-2b" },
    "c-ferme": { id: "c-ferme", kind: "client", text: "Je cherche pas d'agence, bonne journée.", next: "end-lost" },
    "ch-2": {
      id: "ch-2", kind: "choose", prompt: "Comment qualifier et progresser vers le RDV ?",
      options: [
        { label: "Exactement — j'ai 3 acheteurs en recherche active dans votre quartier. Seriez-vous disponible pour un point de 20 minutes cette semaine ? Je vous apporte aussi une estimation gratuite basée sur les ventes récentes.", next: "c-rdv-ok" },
        { label: "Oui j'ai des clients. Votre prix de vente c'est combien ?", next: "c-decroche" },
        { label: "Je peux vous envoyer des informations par mail si vous voulez.", next: "c-decroche" },
      ],
    },
    "ch-2b": {
      id: "ch-2b", kind: "choose", prompt: "Comment répondre à l'objection honoraires ?",
      options: [
        { label: "Je comprends. Justement, venez me rencontrer — je vais vous montrer avec des chiffres concrets pourquoi un mandat se vend souvent plus cher et plus vite qu'un PAP. 20 minutes, cette semaine ?", next: "c-rdv-ok" },
        { label: "Nos honoraires sont très compétitifs, seulement 3,5 %.", next: "c-decroche" },
        { label: "C'est normal de penser ça au début. Mais les statistiques montrent que...", next: "c-decroche" },
      ],
    },
    "c-rdv-ok": { id: "c-rdv-ok", kind: "client", text: "20 minutes ça me convient. Jeudi vers 18h vous êtes disponible ?", next: "ch-3" },
    "c-decroche": { id: "c-decroche", kind: "client", text: "Ecoutez je vais voir comment ça se passe, si j'ai besoin je vous rappellerai.", next: "end-soft" },
    "ch-3": {
      id: "ch-3", kind: "choose", prompt: "Comment confirmer le RDV et valoriser votre démarche ?",
      options: [
        { label: "Parfait, jeudi 18h. Je prépare une analyse comparative des ventes récentes dans votre rue — vous aurez une fourchette de prix réaliste avec les données du marché. À jeudi !", next: "end-win" },
        { label: "Jeudi 18h c'est noté. Je passerai vous voir.", next: "end-soft" },
      ],
    },
    "end-win": { id: "end-win", kind: "end", text: "Excellent ! Vous avez décroché le RDV en valorisant votre expertise (acheteurs qualifiés + estimation data-driven) plutôt qu'en vendant votre agence. C'est la clé de la prospection efficace : apportez de la valeur avant de demander quoi que ce soit." },
    "end-soft": { id: "end-soft", kind: "end", text: "Fin de scénario : le contact est tiède. Rappellez dans 8 jours avec une accroche différente — une vente récente dans sa rue ou un acheteur avec profil précis. La prospection est un marathon, pas un sprint." },
    "end-lost": { id: "end-lost", kind: "end", text: "Appel terminé trop tôt. L'accroche prix en ouverture positionne l'agent en vendeur, pas en expert. Recommencez en créant de la valeur dès le premier mot." },
  },
};

const CLOSING_ACHETEUR: ChatRoleplayScenario = {
  id: "crp-ter-closing",
  moduleSlug: "terrain",
  lessonSlug: "closing",
  title: "Closing acheteur — transformer l'hésitation en offre",
  description: "Un acheteur a visité deux fois le même bien. Il hésite encore. Vous l'appelez pour identifier le blocage et l'aider à décider. Chaque réponse influence la suite.",
  startId: "c-open",
  nodes: {
    "c-open": { id: "c-open", kind: "client", text: "Oui bonjour... On réfléchit encore pour l'appartement du boulevard des Capucines. C'est une grande décision vous comprenez.", next: "ch-1" },
    "ch-1": {
      id: "ch-1", kind: "choose", prompt: "Comment identifier le vrai blocage ?",
      options: [
        { label: "Je comprends tout à fait. Vous avez visité deux fois — qu'est-ce qui vous plaît dans ce bien ? Et qu'est-ce qui vous retient encore ?", next: "c-parle" },
        { label: "Vous savez, il y a un autre acheteur qui est très intéressé...", next: "c-pression" },
        { label: "Vous avez combien comme budget maximum ?", next: "c-dur" },
      ],
    },
    "c-parle": { id: "c-parle", kind: "client", text: "Ce qui me plaît : la luminosité et l'étage. Ce qui me retient... honnêtement c'est le prix. On est à 10 000 € de trop par rapport à notre budget maximal.", next: "ch-2" },
    "c-pression": { id: "c-pression", kind: "client", text: "Ah... Vous me dites ça pour me forcer à décider ? Je n'aime pas me faire presser. Je vais y réfléchir encore.", next: "end-lost" },
    "c-dur": { id: "c-dur", kind: "client", text: "Je ne vois pas pourquoi je vous donnerais cette information. On parlera quand on aura décidé.", next: "end-lost" },
    "ch-2": {
      id: "ch-2", kind: "choose", prompt: "L'écart est de 10 000 €. Comment l'abordez-vous ?",
      options: [
        { label: "10 000 € sur 20 ans de crédit, c'est 42 €/mois de différence. Est-ce que ça vaut le coup de passer à côté d'un bien qui coche toutes vos cases pour 42 €/mois ?", next: "c-reflechit" },
        { label: "Je peux essayer de négocier avec le vendeur si vous êtes prêts à faire une offre maintenant.", next: "c-negoc" },
        { label: "10 000 € c'est beaucoup. Peut-être qu'il faudra chercher autre chose.", next: "end-soft" },
      ],
    },
    "c-reflechit": { id: "c-reflechit", kind: "client", text: "42 €/mois... je n'avais pas vu les choses comme ça. Mais et si le vendeur refusait de négocier ?", next: "ch-3" },
    "c-negoc": { id: "c-negoc", kind: "client", text: "Vous pensez qu'il y a une marge ? Parce qu'on est vraiment au maximum de ce qu'on peut faire.", next: "ch-3" },
    "ch-3": {
      id: "ch-3", kind: "choose", prompt: "Comment finaliser vers une offre ?",
      options: [
        { label: "Posons les choses : si le vendeur acceptait votre prix, vous êtes prêts à faire l'offre aujourd'hui ? Je vais l'appeler tout de suite et vous rappelle dans l'heure.", next: "end-win" },
        { label: "Le vendeur est flexible selon ce que j'ai compris. Faites une offre à votre prix et on verra.", next: "end-soft" },
      ],
    },
    "end-win": { id: "end-win", kind: "end", text: "Parfait ! Vous avez identifié le vrai blocage (prix), le rationalisé (42€/mois), et obtenu un engagement conditionnel avant d'aller négocier. C'est le closing professionnel : vous êtes médiateur, pas vendeur." },
    "end-soft": { id: "end-soft", kind: "end", text: "L'acheteur n'est pas fermé mais il n'est pas engagé. Reformulez le bénéfice unique du bien et proposez un troisième rendez-vous dans le bien pour lever les doutes restants." },
    "end-lost": { id: "end-lost", kind: "end", text: "La pression ou les questions trop directes ont rompu la confiance. En closing, l'écoute active et les questions ouvertes surpassent toujours les techniques de pression." },
  },
};

const ARGUMENTAIRE_VISITE: ChatRoleplayScenario = {
  id: "crp-ter-arg",
  moduleSlug: "terrain",
  lessonSlug: "argumentaire",
  title: "Argumentaire en visite — gérer les objections acheteur",
  description: "Vous faites visiter un T3 à un couple d'acheteurs exigeants. Ils soulèvent plusieurs objections. Votre façon de répondre détermine si la visite aboutit à une offre.",
  startId: "c-open",
  nodes: {
    "c-open": { id: "c-open", kind: "client", text: "L'étage est bien, la luminosité aussi. Mais honnêtement... la cuisine est vraiment petite. Et le prix me semble élevé pour ce quartier.", next: "ch-1" },
    "ch-1": {
      id: "ch-1", kind: "choose", prompt: "Comment répondre à la double objection cuisine + prix ?",
      options: [
        { label: "Je comprends votre remarque sur la cuisine. Voyons d'abord ce que vous aimez dans ce bien — la luminosité, l'étage, le quartier. Sur le prix, j'ai les comparables récents : les T3 similaires dans ce secteur partent entre 350 000 et 380 000 €. Celui-ci est à 365 000 €.", next: "c-ecoute" },
        { label: "La cuisine se rénove facilement, et le prix est celui du marché.", next: "c-sceptique" },
        { label: "C'est vrai que la cuisine est petite. Je peux demander au propriétaire de baisser le prix.", next: "c-faible" },
      ],
    },
    "c-ecoute": { id: "c-ecoute", kind: "client", text: "Ok pour les comparables, c'est rassurant. Mais une cuisine ouverte sur le salon, ça coûte combien à faire ?", next: "ch-2" },
    "c-sceptique": { id: "c-sceptique", kind: "client", text: "Vous dites ça à tous les clients. Montrez-moi les comparables si vous avez.", next: "ch-2" },
    "c-faible": { id: "c-faible", kind: "client", text: "Si le proprio baisse le prix alors on regarde. Mais sinon c'est non.", next: "end-soft" },
    "ch-2": {
      id: "ch-2", kind: "choose", prompt: "La question cuisine ouverte : comment valoriser le potentiel ?",
      options: [
        { label: "Une ouverture cuisine-salon, selon les travaux, coûte entre 3 000 et 8 000 € si c'est une cloison non-porteuse. Ça transforme complètement l'appartement. Je peux vous mettre en contact avec un artisan partenaire pour un devis gratuit.", next: "c-potentiel" },
        { label: "C'est variable, ça dépend de beaucoup de choses.", next: "c-sceptique2" },
        { label: "Je ne suis pas spécialiste travaux, je peux pas vous dire.", next: "c-sceptique2" },
      ],
    },
    "c-potentiel": { id: "c-potentiel", kind: "client", text: "3 000 à 8 000 € c'est raisonnable. Et ça serait notre appart custom. Bon... on aimerait réfléchir cette nuit. Vous pouvez bloquer jusqu'à demain 10h ?", next: "ch-3" },
    "c-sceptique2": { id: "c-sceptique2", kind: "client", text: "Vous n'êtes pas très précis. On va réfléchir, on vous rappellera peut-être.", next: "end-soft" },
    "ch-3": {
      id: "ch-3", kind: "choose", prompt: "La demande de blocage : comment répondre ?",
      options: [
        { label: "Je peux signaler au vendeur que vous êtes sérieux et demander une priorité jusqu'à demain 10h. Mais je dois être honnête : il y a une autre visite ce soir. Si vous êtes vraiment intéressés, une offre conditionnelle à votre financement vous protège sans engagement ferme.", next: "end-win" },
        { label: "Bien sûr, je bloque jusqu'à demain 10h, pas de problème.", next: "end-soft" },
      ],
    },
    "end-win": { id: "end-win", kind: "end", text: "Bravo — vous avez géré les deux objections avec des données (comparables + chiffrage travaux), valorisé le potentiel, et orienté vers une offre conditionnelle protectrice. C'est l'argumentaire expert." },
    "end-soft": { id: "end-soft", kind: "end", text: "La visite se termine sans engagement. Envoyez ce soir les comparables par email avec une note sur le potentiel travaux — relancez demain matin." },
    "end-lost": { id: "end-lost", kind: "end", text: "Le couple est reparti sans engagement ferme. L'argumentaire trop passif ou trop vendeur a manqué de données et de structure. Travaillez votre dossier comparatif avant chaque visite." },
  },
};

const ESTIMATION_VENDEUR: ChatRoleplayScenario = {
  id: "crp-trans-estim",
  moduleSlug: "transaction",
  lessonSlug: "estimation",
  title: "Estimation — convaincre un vendeur sur le bon prix",
  description: "Vous présentez une estimation à 320 000 € pour un T4. Le vendeur est convaincu que son bien vaut 380 000 € 'au moins'. Vous devez le convaincre avec des données, sans blesser sa fierté.",
  startId: "c-open",
  nodes: {
    "c-open": { id: "c-open", kind: "client", text: "320 000 €... C'est bien en-dessous de ce que j'attendais. J'ai vu des biens similaires à 380 000 € dans le quartier. Mon appartement a été entièrement rénové il y a 3 ans — ça vaut bien plus.", next: "ch-1" },
    "ch-1": {
      id: "ch-1", kind: "choose", prompt: "Comment réagir à la surenchère prix ?",
      options: [
        { label: "Je comprends que votre rénovation représente une vraie valeur. Regardons ensemble les ventes qui ont réellement abouti dans votre quartier — pas les prix demandés, mais les prix signés chez le notaire.", next: "c-data" },
        { label: "380 000 € c'est trop cher pour ce secteur, le marché est réaliste.", next: "c-vexe" },
        { label: "On peut toujours essayer à 360 000 € et on baissera si ça ne se vend pas.", next: "c-piege" },
      ],
    },
    "c-data": { id: "c-data", kind: "client", text: "Les prix signés ? Ah... je n'avais regardé que les annonces. Qu'est-ce que vous avez comme données ?", next: "ch-2" },
    "c-vexe": { id: "c-vexe", kind: "client", text: "Vous voulez dire que mon appartement ne vaut pas ce que j'espère ? C'est blessant à entendre.", next: "end-soft" },
    "c-piege": { id: "c-piege", kind: "client", text: "D'accord, mettons à 360 000 € alors.", next: "end-trap" },
    "ch-2": {
      id: "ch-2", kind: "choose", prompt: "Présentez vos comparables de façon convaincante :",
      options: [
        { label: "J'ai 4 ventes signées dans votre rue et les rues adjacentes, entre octobre et mars. Les T4 rénovés se sont vendus entre 308 000 et 335 000 €. Le bien à 380 000 € que vous avez vu est toujours en vente depuis 8 mois — ça veut dire qu'il ne trouve pas preneur.", next: "c-comprend" },
        { label: "Les données me donnent 320 000 €, c'est le marché.", next: "c-vexe" },
        { label: "J'ai quelques ventes mais elles ne correspondent pas exactement au vôtre.", next: "end-soft" },
      ],
    },
    "c-comprend": { id: "c-comprend", kind: "client", text: "Ah... 8 mois sans vente à 380 000 €. Je ne savais pas ça. Et ma rénovation, elle n'est pas valorisée dans vos 320 000 € ?", next: "ch-3" },
    "ch-3": {
      id: "ch-3", kind: "choose", prompt: "Comment valoriser la rénovation tout en restant réaliste ?",
      options: [
        { label: "Si. Ma base est 310 000 € pour un T4 standard. La rénovation qualité justifie une prime de 10 000 € — d'où mes 320 000 €. Je vous propose de viser 325 000 € avec une stratégie de prix qui génère des offres en 30 jours.", next: "end-win" },
        { label: "La rénovation est bien prise en compte, 320 000 € c'est juste.", next: "end-soft" },
        { label: "On peut monter à 340 000 € si vous voulez.", next: "end-trap" },
      ],
    },
    "end-win": { id: "end-win", kind: "end", text: "Excellent ! Vous avez utilisé les données (prix signés vs prix affichés), valorisé objectivement la rénovation, et proposé un prix de stratégie avec un engagement de résultat. C'est le rendez-vous estimation professionnel." },
    "end-soft": { id: "end-soft", kind: "end", text: "Le vendeur reste hésitant. Envoyez le rapport comparatif complet par email avec les photos des biens comparables — les données visuelles convainquent mieux qu'un discours seul." },
    "end-trap": { id: "end-trap", kind: "end", text: "Attention : accepter un prix surévalué pour obtenir le mandat est une erreur stratégique — le bien ne se vendra pas, et vous devrez renégocier dans 60 jours en position de faiblesse. Tenez votre analyse de marché." },
  },
};

const ALL: ChatRoleplayScenario[] = [
  NEGOCIATION_MANDAT,
  PROSPECTION_APPEL,
  CLOSING_ACHETEUR,
  ARGUMENTAIRE_VISITE,
  ESTIMATION_VENDEUR,
];

export function getChatRoleplay(
  moduleSlug: string,
  lessonSlug: string,
): ChatRoleplayScenario | null {
  return (
    ALL.find((s) => s.moduleSlug === moduleSlug && s.lessonSlug === lessonSlug) ??
    null
  );
}
