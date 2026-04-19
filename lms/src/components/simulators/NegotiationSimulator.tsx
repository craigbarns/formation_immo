"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Bot, AlertCircle, Award, RotateCcw, TrendingUp } from "lucide-react";
import { recordSimulatorUsed } from "@/lib/gamification";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
  options?: DialogOption[];
  feedback?: string;
  scoreImpact?: number;
};

type DialogOption = {
  id: string;
  text: string;
  response: string;
  feedback: string;
  scoreImpact: number;
};

type Scenario = {
  id: string;
  title: string;
  description: string;
  messages: Message[];
};

const SCENARIOS: Scenario[] = [
  {
    id: "vendeur_prix",
    title: "M. Dubois — Le vendeur au prix élevé",
    description: "Un vendeur qui trouve son bien exceptionnel et a déjà une estimation concurrente.",
    messages: [
      {
        id: "msg_0",
        sender: "bot",
        text: "Bonjour. Je vous ai fait venir pour l'estimation de ma maison, mais je vous préviens : je ne suis pas pressé de vendre, et l'agence concurrente m'en a proposé 450 000 €, ce qui me semble être un minimum.",
        options: [
          {
            id: "opt_1",
            text: "450 000 € ? C'est beaucoup trop cher pour le marché actuel, vous ne vendrez jamais.",
            response: "Je suis désolé, je ne vous permets pas de juger mon bien comme ça. Si vous n'êtes pas capable de le vendre à ce prix, d'autres le feront.",
            feedback: "Mauvaise approche : Le client se braque. Il ne faut jamais contredire frontalement l'ego du vendeur avant d'avoir des arguments tangibles.",
            scoreImpact: -20,
          },
          {
            id: "opt_2",
            text: "Je comprends très bien Monsieur. 450 000 € est un excellent objectif. Nous allons tout faire pour l'atteindre.",
            response: "Ah, au moins vous êtes optimiste. Mais comment comptez-vous faire exactement par rapport à l'autre agence ?",
            feedback: "Approche risquée : Vous vous engagez sur un prix que vous ne connaissez pas. Risque d'invendu ou de mandat sans valeur.",
            scoreImpact: -5,
          },
          {
            id: "opt_3",
            text: "C'est tout à fait légitime de vouloir en tirer le meilleur prix. Dites-m'en plus sur ce qui, selon vous, justifie cette valeur par rapport au marché local ?",
            response: "Eh bien, nous avons refait l'isolation, et c'est une des rares maisons du quartier avec une vue dégagée. Et puis on y a mis beaucoup de cœur.",
            feedback: "Excellente approche ! L'empathie couplée à une question ouverte permet au client de justifier son prix et de s'ouvrir sans être contredit.",
            scoreImpact: +15,
          },
        ],
      },
      {
        id: "msg_1",
        sender: "bot",
        text: "D'ailleurs, si je signe avec vous, vos honoraires sont de combien ? L'autre agence m'a proposé 3%.",
        options: [
          {
            id: "opt_1_1",
            text: "Je peux m'aligner sur 3% si vous signez l'exclusivité avec moi.",
            response: "D'accord, mais à 3% j'espère que vous en ferez plus qu'eux...",
            feedback: "Vous avez concédé vos honoraires trop vite. La valeur ajoutée doit passer avant le prix.",
            scoreImpact: -10,
          },
          {
            id: "opt_1_2",
            text: "Mes honoraires sont de 5%. C'est non négociable car je fournis un travail de qualité.",
            response: "5% ? C'est hors de question, autant travailler avec les autres.",
            feedback: "Fermeture totale = rupture du dialogue.",
            scoreImpact: -15,
          },
          {
            id: "opt_1_3",
            text: "Leur barème est à 3%... Savez-vous précisément quels services et quels moyens ils mettent à votre disposition pour ce prix ?",
            response: "Ils font des photos et publient sur LeBonCoin, je suppose. Pourquoi, vous proposez quoi de plus ?",
            feedback: "Brillant ! Déplacer le débat du 'Prix' vers la 'Valeur'.",
            scoreImpact: +15,
          },
        ],
      },
      {
        id: "msg_2",
        sender: "bot",
        text: "Vous me parlez beaucoup, mais concrètement, qu'est-ce qui me prouve que vous vendrez plus cher qu'eux ?",
        options: [
          {
            id: "opt_2_1",
            text: "Je vous donne ma parole d'honneur que je ferai le maximum.",
            response: "Votre parole... C'est gentil, mais ce n'est pas un argument de vente.",
            feedback: "La parole n'a pas de valeur commerciale. Un argument chiffré ou un processus structuré est indispensable.",
            scoreImpact: -10,
          },
          {
            id: "opt_2_2",
            text: "Regardez ces 5 comparables vendus ces 3 derniers mois. Avec une stratégie marketing complète, les biens bien présentés se vendent en moyenne 8% plus cher.",
            response: "8% de plus ? Montrez-moi ces comparables, j'aimerais bien voir ça.",
            feedback: "Parfait. L'argument chiffré avec preuve concrète (comparables) est le plus convaincant.",
            scoreImpact: +15,
          },
          {
            id: "opt_2_3",
            text: "On verra bien au moment de la vente. Le marché décide, pas moi.",
            response: "Si vous n'êtes pas sûr de vous, pourquoi je vous paierais des honoraires ?",
            feedback: "Manque de confiance perçu = manque de crédibilité. Un agent doit projouter l'expertise.",
            scoreImpact: -15,
          },
        ],
      },
      {
        id: "msg_3",
        sender: "bot",
        text: "Très bien, je suis prêt à vous signer un mandat. Mais je veux un point chaque semaine et la possibilité de résilier avec un préavis de 7 jours.",
        options: [
          {
            id: "opt_3_1",
            text: "7 jours de préavis, c'est impossible. Un mandat, c'est un engagement minimum de 3 mois.",
            response: "3 mois sans possibilité de sortie ? Non, je ne suis pas à l'aise avec ça.",
            feedback: "Trop catégorique. Le client a besoin de se sentir sécurisé, pas enfermé.",
            scoreImpact: -5,
          },
          {
            id: "opt_3_2",
            text: "Je vous propose un point hebdomadaire par email + un appel téléphonique. Et un clause de résiliation à 14 jours si aucune visite n'a eu lieu en 30 jours.",
            response: "14 jours si aucune visite... Ça me semble raisonnable. OK pour le mandat.",
            feedback: "Excellente négociation WIN-WIN. Vous donnez une garantie de suivi tout en protégeant votre travail.",
            scoreImpact: +15,
          },
          {
            id: "opt_3_3",
            text: "OK, 7 jours, pas de problème. L'important est de signer.",
            response: "Ah bon ? D'accord alors...",
            feedback: "Vous avez concédé sans contrepartie. Ce mandat sera très difficile à défendre commercialement.",
            scoreImpact: -10,
          },
        ],
      },
    ],
  },
  {
    id: "acheteur_hesitant",
    title: "Mme Leroy — L'acheteuse hésitante",
    description: "Une acheteuse qui a peur de se précipiter et remet en cause chaque décision.",
    messages: [
      {
        id: "ach_0",
        sender: "bot",
        text: "Bonjour, l'appartement est joli, mais je ne sais pas... Il y a tellement de choix en ce moment. Et puis le prix me semble un peu élevé par rapport à ce que j'avais vu en ligne.",
        options: [
          {
            id: "ach_opt_1",
            text: "Vous n'avez pas les moyens ? On peut toujours négocier avec le vendeur.",
            response: "Ce n'est pas une question de moyens ! C'est juste que je ne veux pas me faire avoir.",
            feedback: "Suggérer que le client n'a pas les moyens est blessant et contre-productif.",
            scoreImpact: -20,
          },
          {
            id: "ach_opt_2",
            text: "Je comprends votre hésitation. C'est un achat important. Qu'est-ce qui, pour vous, ferait la différence entre un bon et un mauvais choix ?",
            response: "Je dirais... la luminosité, le calme, et surtout la revente facile dans 5 ans si j'ai besoin de déménager.",
            feedback: "Belle remontée de besoins. Vous identifiez ses vrais critères de décision.",
            scoreImpact: +15,
          },
          {
            id: "ach_opt_3",
            text: "Ne vous inquiétez pas, ce bien ne restera pas longtemps. Vous devriez faire une offre aujourd'hui.",
            response: "Aujourd'hui ? Mais je viens juste d'arriver ! Vous me mettez la presshe, là.",
            feedback: "La pression artificielle crée du rejet chez un profil anxieux.",
            scoreImpact: -15,
          },
        ],
      },
      {
        id: "ach_1",
        sender: "bot",
        text: "Et ce bruit de voisinage que j'ai entendu tout à l'heure... C'est souvent comme ça ?",
        options: [
          {
            id: "ach_1_1",
            text: "Non non, c'était exceptionnel. L'immeuble est très calme en général.",
            response: "Vous en êtes sûr ? J'ai l'impression que vous me racontez n'importe quoi pour vendre.",
            feedback: "Nier un fait observable détruit la confiance. L'honnêteté est plus crédible.",
            scoreImpact: -15,
          },
          {
            id: "ach_1_2",
            text: "Oui, il y a un peu de passage en journée. C'est un immeuble familial. Par contre, après 20h, c'est très calme. C'est un critère bloquant pour vous ?",
            response: "Non, ce n'est pas bloquant. J'ai juste besoin de savoir à quoi m'attendre.",
            feedback: "Très bien. Honnêteté + reformulation du critère bloquant = sérénité retrouvée.",
            scoreImpact: +15,
          },
          {
            id: "ach_1_3",
            text: "Vous avez des oreilles très sensibles. Mes autres clients n'ont jamais rien dit.",
            response: "Mes oreilles ? C'est une façon de me dire que je suis difficile ?",
            feedback: "Moquerie déguisée = client qui s'éloigne définitivement.",
            scoreImpact: -20,
          },
        ],
      },
      {
        id: "ach_2",
        sender: "bot",
        text: "Mon mari n'est pas venu aujourd'hui. Il veut absolument voir le DPE et les 3 derniers PV d'assemblée générale avant de décider.",
        options: [
          {
            id: "ach_2_1",
            text: "C'est normal. Je vous envoie tout par email ce soir, et on se revoit demain si vous voulez.",
            response: "Demain ? Il est en déplacement professionnel toute la semaine. Mais envoyez-moi les documents, je les lui transmettrai.",
            feedback: "Bonne réactivité. Proposer une suite rapide rassure un profil méthodique.",
            scoreImpact: +10,
          },
          {
            id: "ach_2_2",
            text: "Les documents sont dans le descriptif. Vous n'avez pas besoin de les revoir.",
            response: "Si mon mari veut les revoir, c'est qu'il en a besoin. Ne me dites pas ce qui est utile ou pas.",
            feedback: "Ne jamais minimiser les demandes de précision d'un client.",
            scoreImpact: -15,
          },
          {
            id: "ach_2_3",
            text: "Je peux organiser un second rendez-vous avec vous ET votre mari, avec un notaire si besoin, pour qu'il ait toutes les réponses sur place.",
            response: "Avec un notaire ? C'est une excellente idée. Mon mari appréciera la transparence.",
            feedback: "Service premium qui rassure toute la famille. Excellent move.",
            scoreImpact: +15,
          },
        ],
      },
      {
        id: "ach_3",
        sender: "bot",
        text: "OK, on va faire une offre. Mais à 5% en dessous du prix demandé. Si le vendeur refuse, on passera à autre chose.",
        options: [
          {
            id: "ach_3_1",
            text: "5% de moins, c'est insultant pour le vendeur. Il ne vous répondra même pas.",
            response: "5% c'est insultant ? Ce n'est pourtant pas la mer à boire. Vous défendez qui là, le vendeur ou moi ?",
            feedback: "L'agent doit rester neutre et aider à structurer l'offre, pas juger son montant.",
            scoreImpact: -15,
          },
          {
            id: "ach_3_2",
            text: "Une offre à -5% est recevable si elle est bien argumentée. Laissez-moi préparer un dossier solide avec vos points forts d'acquéreur pour maximiser vos chances.",
            response: "Un dossier solide... Oui, ça me rassure. Faites comme vous pensez que c'est mieux.",
            feedback: "Parfait. Structurer l'offre avec des arguments vendeurs transforme une négociation agressive en collaboration.",
            scoreImpact: +15,
          },
          {
            id: "ach_3_3",
            text: "OK, je transmets l'offre telle quelle. Le vendeur dira oui ou non.",
            response: "Vous ne voulez même pas essayer de la valoriser ? Bon, très bien...",
            feedback: "Passivité = valeur ajoutée nulle. L'agent doit être un négociateur actif.",
            scoreImpact: -10,
          },
        ],
      },
    ],
  },
];

function getFeedbackLevel(score: number) {
  if (score >= 80) return { label: "Expert", color: "text-emerald-600", bg: "bg-emerald-100", message: "Votre approche est structurée, empathique et orientée valeur. Vous savez créer du lien tout en protégeant vos intérêts." };
  if (score >= 60) return { label: "Bon", color: "text-blue-600", bg: "bg-blue-100", message: "Vous avez de bons réflexes. Quelques ajustements sur la gestion des objections et la fermeté vous permettront de signer plus de mandats." };
  if (score >= 40) return { label: "Moyen", color: "text-amber-600", bg: "bg-amber-100", message: "Des bases solides, mais des choix trop rapides ou trop défensifs peuvent braquer le client. Travaillez l'écoute active." };
  return { label: "À travailler", color: "text-red-600", bg: "bg-red-100", message: "Plusieurs approches ont mis le client en retrait. Privilégiez les questions ouvertes, l'empathie et évitez la pression ou le jugement." };
}

export function NegotiationSimulator() {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [step, setStep] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [score, setScore] = useState(50);
  const [isTyping, setIsTyping] = useState(false);
  const [finished, setFinished] = useState(false);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  const scenario = SCENARIOS[scenarioIndex];

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, finished]);

  useEffect(() => {
    // Init first message — différé pour éviter setState synchronously dans l'effet
    queueMicrotask(() => {
      setMessages([scenario.messages[0]]);
      setScore(50);
      setStep(0);
      setFinished(false);
    });
  }, [scenarioIndex, scenario.messages]);

  const handleOptionSelect = async (option: DialogOption, messageIndex: number) => {
    // crypto.randomUUID() est disponible partout (Node 19+ et tous navigateurs récents).
    const userMsg: Message = {
      id: `user_${crypto.randomUUID()}`,
      sender: "user",
      text: option.text,
    };

    setMessages((prev) => {
      const newMsgs = [...prev];
      newMsgs[messageIndex].options = undefined;
      return [...newMsgs, userMsg];
    });

    setIsTyping(true);
    setScore((prev) => Math.min(100, Math.max(0, prev + option.scoreImpact)));

    setTimeout(() => {
      setIsTyping(false);
      const botResponse: Message = {
        id: `bot_${Date.now()}`,
        sender: "bot",
        text: option.response,
        feedback: option.feedback,
        scoreImpact: option.scoreImpact,
      };
      setMessages((prev) => [...prev, botResponse]);

      const nextStep = step + 1;
      if (nextStep < scenario.messages.length) {
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            setStep(nextStep);
            setMessages((prev) => [...prev, scenario.messages[nextStep]]);
          }, 1200);
        }, 2500);
      } else {
        setTimeout(() => {
          setFinished(true);
          recordSimulatorUsed("negociation");
        }, 2000);
      }
    }, 1200);
  };

  const restart = () => {
    const nextScenario = (scenarioIndex + 1) % SCENARIOS.length;
    setScenarioIndex(nextScenario);
  };

  const feedback = getFeedbackLevel(score);

  return (
    <div className="flex flex-col h-[720px] max-h-[88vh] rounded-2xl border border-zinc-200/80 bg-white shadow-xl overflow-hidden font-sans">
      {/* Header */}
      <div className="bg-brand-navy text-white px-6 py-4 flex items-center justify-between shadow-md z-10 relative">
        <div className="flex items-center gap-3">
          <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm border border-white/20">
            <Bot size={24} className="text-brand-gold" />
          </div>
          <div>
            <h3 className="font-bold text-lg leading-tight">{scenario.title}</h3>
            <p className="text-white/80 text-xs">Simulateur de Négociation • Tour {Math.min(step + 1, scenario.messages.length)} / {scenario.messages.length}</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs font-semibold uppercase tracking-wider text-white/80 mb-1">Score</span>
          <div className="w-32 h-2.5 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${score > 70 ? "bg-emerald-400" : score < 40 ? "bg-red-400" : "bg-brand-gold"}`}
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <span className="mt-1 text-2xs font-bold text-white/80">{score}/100</span>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-zinc-50 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex w-full ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[90%] sm:max-w-[80%] flex gap-3 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                {/* Avatar */}
                <div className="shrink-0 mt-1">
                  {msg.sender === "bot" ? (
                    <div className="w-8 h-8 rounded-full bg-brand-navy flex items-center justify-center text-white shadow-sm">
                      <span className="text-xs font-bold">D</span>
                    </div>
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-zinc-200 flex items-center justify-center text-zinc-600 shadow-sm border border-zinc-300">
                      <User size={16} />
                    </div>
                  )}
                </div>

                {/* Bubble */}
                <div className="flex flex-col gap-1.5">
                  <div className={`px-4 py-3 shadow-sm ${
                    msg.sender === "user" ? "bg-brand-navy text-white rounded-2xl rounded-tr-sm" : "bg-white border border-zinc-200 text-zinc-800 rounded-2xl rounded-tl-sm"
                  }`}>
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </div>

                  {msg.feedback && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className={`flex items-start gap-2 text-xs p-2.5 rounded-lg border ${
                        (msg.scoreImpact ?? 0) > 0 ? "bg-emerald-50 border-emerald-200 text-emerald-800" : "bg-red-50 border-red-200 text-red-800"
                      }`}
                    >
                      {(msg.scoreImpact ?? 0) > 0 ? <Award size={14} className="shrink-0 mt-0.5" /> : <AlertCircle size={14} className="shrink-0 mt-0.5" />}
                      <span className="font-medium">{msg.feedback}</span>
                      <span className="ml-auto font-bold whitespace-nowrap">{(msg.scoreImpact ?? 0) > 0 ? "+" : ""}{msg.scoreImpact} pts</span>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* End Screen */}
        <AnimatePresence>
          {finished && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="mx-auto max-w-md card-elevated-lg p-6"
            >
              <div className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${feedback.bg}`}>
                <TrendingUp className={`h-8 w-8 ${feedback.color}`} />
              </div>
              <h4 className={`text-center text-xl font-bold ${feedback.color}`}>{feedback.label}</h4>
              <p className="mt-2 text-center text-sm text-zinc-600">{feedback.message}</p>
              <div className="mt-4 text-center">
                <p className="text-3xl font-black text-brand-navy">{score}<span className="text-lg text-zinc-400">/100</span></p>
              </div>
              <button
                onClick={restart}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 rounded-xl bg-brand-navy px-4 py-2.5 text-sm font-bold text-white shadow transition hover:bg-brand-navy-deep"
              >
                <RotateCcw size={16} />
                {SCENARIOS.length > 1 ? "Changer de scénario" : "Recommencer"}
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start pt-2">
            <div className="flex gap-3 max-w-[75%]">
              <div className="shrink-0">
                <div className="w-8 h-8 rounded-full bg-brand-navy flex items-center justify-center text-white shadow-sm">
                  <span className="text-xs font-bold">D</span>
                </div>
              </div>
              <div className="bg-white border border-zinc-200 rounded-2xl rounded-tl-sm px-4 py-3 flex items-center gap-1 shadow-sm">
                <motion.div className="w-1.5 h-1.5 bg-zinc-400 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0 }} />
                <motion.div className="w-1.5 h-1.5 bg-zinc-400 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.2 }} />
                <motion.div className="w-1.5 h-1.5 bg-zinc-400 rounded-full" animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 0.8, delay: 0.4 }} />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={endOfMessagesRef} />
      </div>

      {/* Options Area */}
      <div className="bg-white border-t border-zinc-200 p-4">
        {!finished && messages[messages.length - 1]?.options ? (
          <div className="space-y-2">
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Choisissez votre réponse :</p>
            {messages[messages.length - 1].options!.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleOptionSelect(opt, messages.length - 1)}
                className="w-full text-left p-3 rounded-xl border border-zinc-200 hover:border-brand-gold hover:bg-amber-50/50 transition-all group flex items-start gap-3 shadow-sm hover:shadow-md"
              >
                <div className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity text-brand-gold">
                  <Send size={14} />
                </div>
                <span className="text-sm font-medium text-zinc-700 group-hover:text-zinc-900 leading-snug">{opt.text}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-4 text-zinc-400 text-sm italic">
            {!isTyping && !finished && <span>En attente de la réponse du client...</span>}
            {finished && <span>Exercice terminé. Analysez votre score ci-dessus.</span>}
          </div>
        )}
      </div>
    </div>
  );
}
