"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, User, Bot, AlertCircle, Award } from "lucide-react";

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

const INITIAL_SCENARIO: Message = {
  id: "msg_0",
  sender: "bot",
  text: "Bonjour. Je vous ai fait venir pour l'estimation de ma maison, mais je vous préviens tout de suite : je ne suis pas pressé de vendre, et l'agence concurrente m'en a proposé 450 000 €, ce qui me semble être un minimum.",
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
      scoreImpact: +20,
    },
  ],
};

const NEXT_SCENARIO: Message = {
  id: "msg_next",
  sender: "bot",
  text: "D'ailleurs, si je signe avec vous, vos honoraires sont de combien ? L'autre agence m'a proposé 3%.",
  options: [
    {
      id: "opt_next_1",
      text: "Je peux m'aligner sur 3% si vous signez l'exclusivité avec moi.",
      response: "D'accord, mais à 3% j'espère que vous en ferez plus qu'eux...",
      feedback: "Vous avez concédé vos honoraires trop vite. La valeur ajoutée doit passer avant le prix.",
      scoreImpact: -10,
    },
    {
      id: "opt_next_2",
      text: "Mes honoraires sont de 5%. C'est non négociable car je fournis un travail de qualité.",
      response: "5% ? C'est hors de question, autant travailler avec les autres.",
      feedback: "Fermeture totale = rupture du dialogue.",
      scoreImpact: -15,
    },
    {
      id: "opt_next_3",
      text: "Leur barème est à 3%... Savez-vous précisément quels services et quels moyens ils mettent à votre disposition pour ce prix ?",
      response: "Ils font des photos et publient sur LeBonCoin, je suppose. Pourquoi, vous proposez quoi de plus ?",
      feedback: "Brillant ! Déplacer le débat du 'Prix' vers la 'Valeur'.",
      scoreImpact: +20,
    },
  ]
}


export function NegotiationSimulator() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_SCENARIO]);
  const [score, setScore] = useState(50); // Start at neutral 50
  const [isTyping, setIsTyping] = useState(false);
  const [scenarioStep, setScenarioStep] = useState(0);
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleOptionSelect = async (option: DialogOption, messageIndex: number) => {
    // 1. Add user message
    const userMsg: Message = {
      id: `user_${Date.now()}`,
      sender: "user",
      text: option.text,
    };

    // Remove options from the previous bot message
    setMessages((prev) => {
      const newMsgs = [...prev];
      newMsgs[messageIndex].options = undefined;
      return [...newMsgs, userMsg];
    });

    // 2. Show typing indicator
    setIsTyping(true);

    // 3. Update score
    setScore((prev) => Math.min(100, Math.max(0, prev + option.scoreImpact)));

    // 4. Simulate delay
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

      // Trigger next scenario part after a larger delay
      if (scenarioStep === 0) {
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            setScenarioStep(1);
            setMessages((prev) => [...prev, NEXT_SCENARIO]);
          }, 1500);
        }, 3000);
      }

    }, 1500);
  };

  return (
    <div className="flex flex-col h-[700px] max-h-[85vh] rounded-2xl border border-zinc-200/80 bg-white shadow-xl overflow-hidden font-sans">
      {/* Header */}
      <div className="bg-[#1a3a5c] text-white px-6 py-4 flex items-center justify-between shadow-md z-10 relative">
        <div className="flex items-center gap-3">
          <div className="bg-white/10 p-2 rounded-xl backdrop-blur-sm border border-white/20">
            <Bot size={24} className="text-[#d4af37]" />
          </div>
          <div>
            <h3 className="font-bold text-lg leading-tight">M. Dubois (Vendeur)</h3>
            <p className="text-white/60 text-xs">Simulateur de Négociation • Module 2</p>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-1">Confiance Client</span>
          <div className="w-32 h-2.5 bg-white/20 rounded-full overflow-hidden">
            <motion.div 
              className={`h-full ${score > 70 ? 'bg-green-400' : score < 40 ? 'bg-red-400' : 'bg-[#d4af37]'}`}
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-zinc-50 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex w-full ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className={`max-w-[85%] sm:max-w-[75%] flex gap-3 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                
                {/* Avatar */}
                <div className="shrink-0 mt-1">
                  {msg.sender === "bot" ? (
                    <div className="w-8 h-8 rounded-full bg-[#1a3a5c] flex items-center justify-center text-white shadow-sm">
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
                  <div 
                    className={`px-4 py-3 shadow-sm ${
                      msg.sender === "user" 
                        ? "bg-[#1a3a5c] text-white rounded-2xl rounded-tr-sm" 
                        : "bg-white border border-zinc-200 text-zinc-800 rounded-2xl rounded-tl-sm"
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{msg.text}</p>
                  </div>
                  
                  {/* Feedback Tooltip for Bot Responses triggered by User */}
                  {msg.feedback && (
                    <motion.div 
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      className={`flex items-start gap-2 text-xs p-2.5 rounded-lg border ${
                        (msg.scoreImpact ?? 0) > 0 
                          ? "bg-green-50 border-green-200 text-green-800" 
                          : "bg-red-50 border-red-200 text-red-800"
                      }`}
                    >
                      {(msg.scoreImpact ?? 0) > 0 ? <Award size={14} className="shrink-0 mt-0.5" /> : <AlertCircle size={14} className="shrink-0 mt-0.5" />}
                      <span className="font-medium">{msg.feedback}</span>
                      <span className="ml-auto font-bold whitespace-nowrap">{(msg.scoreImpact ?? 0) > 0 ? '+' : ''}{msg.scoreImpact} XP</span>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start pt-2"
          >
            <div className="flex gap-3 max-w-[75%]">
              <div className="shrink-0">
                <div className="w-8 h-8 rounded-full bg-[#1a3a5c] flex items-center justify-center text-white shadow-sm">
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
        {messages[messages.length - 1]?.options ? (
          <div className="space-y-2">
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Choisissez votre réponse :</p>
            {messages[messages.length - 1].options!.map((opt) => (
              <button
                key={opt.id}
                onClick={() => handleOptionSelect(opt, messages.length - 1)}
                className="w-full text-left p-3 rounded-xl border border-zinc-200 hover:border-[#d4af37] hover:bg-amber-50/50 transition-all group flex items-start gap-3 shadow-sm hover:shadow-md"
              >
                <div className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity text-[#d4af37]">
                  <Send size={14} />
                </div>
                <span className="text-sm font-medium text-zinc-700 group-hover:text-zinc-900 leading-snug">{opt.text}</span>
              </button>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-4 text-zinc-400 text-sm italic">
            {!isTyping && scenarioStep === 1 && score < 100 && (
               <span>Le client réfléchit... ou l'exercice est terminé. Votre score final: {score}/100.</span>
            )}
            {isTyping && <span>En attente de la réponse du client...</span>}
          </div>
        )}
      </div>
    </div>
  );
}
