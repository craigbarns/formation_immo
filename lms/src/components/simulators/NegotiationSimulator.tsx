"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MessageSquare, 
  User, 
  RotateCcw, 
  Send, 
  Sparkles, 
  Trophy, 
  Brain,
  Quote,
  Target,
  ChevronDown
} from "lucide-react";
import { EmojiIcon } from "@/components/ui/EmojiIcon";
import { recordSimulatorUsed } from "@/lib/gamification";

interface DialogueLine {
  role: "client" | "vous";
  text: string;
}

interface Scenario {
  id: string;
  title: string;
  description: string;
  startNode: string;
  nodes: Record<string, DialogueNode>;
}

type DialogueNode = 
  | { type: "client"; text: string; next: string }
  | { type: "choice"; prompt: string; options: ChoiceOption[] }
  | { type: "end"; text: string; feedback: string; score: number };

interface ChoiceOption {
  label: string;
  next: string;
  feedback?: string;
}

const SCENARIOS: Scenario[] = [
  {
    id: "exclusivite",
    title: "Obtenir l'exclusivité",
    description: "Un vendeur hésitant qui veut garder la main en mandat simple.",
    startNode: "intro",
    nodes: {
      intro: {
        type: "client",
        text: "Je préfère rester en mandat simple. Comme ça, si je trouve l'acheteur moi-même ou via une autre agence, je ne vous dois rien.",
        next: "choix1",
      },
      choix1: {
        type: "choice",
        prompt: "Comment réagissez-vous à cette objection sur la liberté ?",
        options: [
          { label: "Je comprends, mais vous allez multiplier les interlocuteurs et perdre en cohérence de prix.", next: "client2a" },
          { label: "L'exclusivité me permet d'investir 3000€ en marketing (photo pro, drone, portails premium) que je ne peux pas risquer en simple.", next: "client2b" },
        ],
      },
      client2a: {
        type: "client",
        text: "La cohérence, c'est mon affaire. Plus il y a d'agences, plus j'ai de chances de vendre vite, non ?",
        next: "choix2a",
      },
      client2b: {
        type: "client",
        text: "3000€ ? C'est beaucoup. Mais si ça ne se vend pas, j'aurai perdu du temps avec une seule agence.",
        next: "choix2b",
      },
      choix2a: {
        type: "choice",
        prompt: "Le client croit au volume. Votre réponse ?",
        options: [
          { label: "Au contraire, un bien présent partout avec des prix différents dévalorise votre maison.", next: "fin_moyenne" },
          { label: "Expliquons l'effet 'bien brûlé' : les acheteurs sérieux se demandent pourquoi personne n'en veut.", next: "fin_haute" },
        ],
      },
      choix2b: {
        type: "choice",
        prompt: "Le client a peur du risque. Votre réponse ?",
        options: [
          { label: "Je m'engage sur un plan d'action écrit. Si je ne respecte pas une étape, vous résiliez sans frais.", next: "fin_excellente" },
          { label: "Faites-moi confiance, je suis le leader sur ce secteur.", next: "fin_moyenne" },
        ],
      },
      fin_haute: {
        type: "end",
        text: "D'accord, je n'avais pas vu les choses comme ça. On essaie l'exclusivité pour 3 mois.",
        feedback: "Excellente utilisation de la psychologie de l'acheteur. Vous avez créé de la rareté.",
        score: 85,
      },
      fin_excellente: {
        type: "end",
        text: "C'est honnête. Si vous mettez les moyens et que je peux résilier si ça ne bouge pas, je signe.",
        feedback: "Parfait. Le 'mandat de confiance' avec engagement de moyens est l'arme absolue.",
        score: 100,
      },
      fin_moyenne: {
        type: "end",
        text: "Bon... laissez-moi réfléchir encore un peu. On se rappelle demain.",
        feedback: "Trop frontal ou trop vague. Le client n'est pas rassuré sur son gain réel.",
        score: 50,
      },
    }
  }
];

export function NegotiationSimulator() {
  const [activeScenario, setActiveScenario] = useState(SCENARIOS[0]);
  const [history, setHistory] = useState<DialogueLine[]>([]);
  const [currentNodeId, setCurrentNodeId] = useState(activeScenario.startNode);
  const [finished, setFinished] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    recordSimulatorUsed("negotiation");
    // Lancer le premier message
    const firstNode = activeScenario.nodes[activeScenario.startNode];
    if (firstNode.type === "client") {
      setHistory([{ role: "client", text: firstNode.text }]);
      setCurrentNodeId(firstNode.next);
    }
  }, [activeScenario]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleChoice = useCallback((option: ChoiceOption) => {
    const userLine: DialogueLine = { role: "vous", text: option.label };
    setHistory(prev => [...prev, userLine]);
    
    setTimeout(() => {
      const nextNode = activeScenario.nodes[option.next];
      if (nextNode.type === "client") {
        setHistory(prev => [...prev, { role: "client", text: nextNode.text }]);
        setCurrentNodeId(nextNode.next);
      } else if (nextNode.type === "end") {
        setHistory(prev => [...prev, { role: "client", text: nextNode.text }]);
        setCurrentNodeId(option.next);
        setFinished(true);
      } else {
        setCurrentNodeId(option.next);
      }
    }, 600);
  }, [activeScenario]);

  const reset = () => {
    setHistory([]);
    setCurrentNodeId(activeScenario.startNode);
    setFinished(false);
    // Restart logic
    const firstNode = activeScenario.nodes[activeScenario.startNode];
    if (firstNode.type === "client") {
      setHistory([{ role: "client", text: firstNode.text }]);
      setCurrentNodeId(firstNode.next);
    }
  };

  const currentNode = activeScenario.nodes[currentNodeId];

  return (
    <div className="space-y-10">
        <div className="flex flex-col lg:flex-row gap-10">
            {/* Chat Area */}
            <div className="flex-1 flex flex-col h-[600px] rounded-[2.5rem] border border-white/10 bg-[#030712] shadow-2xl overflow-hidden">
                <div className="bg-[#070d18] border-b border-white/5 px-8 py-6 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold">
                            <MessageSquare size={20} />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-brand-gold">Simulation Active</p>
                            <h4 className="text-sm font-black text-white uppercase tracking-tight">{activeScenario.title}</h4>
                        </div>
                    </div>
                    {finished && (
                        <button onClick={reset} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">
                            <RotateCcw size={14} /> REJOUER
                        </button>
                    )}
                </div>

                <div className="flex-1 overflow-y-auto p-6 md:p-10 space-y-6 scrollbar-hide bg-mesh">
                    <AnimatePresence initial={false}>
                        {history.map((line, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                className={`flex ${line.role === "vous" ? "justify-end" : "justify-start"}`}
                            >
                                <div className={`flex gap-3 max-w-[85%] ${line.role === "vous" ? "flex-row-reverse" : "flex-row"}`}>
                                    <div className={`mt-1 h-8 w-8 shrink-0 rounded-full flex items-center justify-center shadow-lg border ${
                                        line.role === "vous" ? "bg-white/10 border-white/20 text-white" : "bg-brand-gold border-brand-gold text-brand-navy"
                                    }`}>
                                        {line.role === "vous" ? <User size={14} /> : <MessageSquare size={14} />}
                                    </div>
                                    <div
                                        className={`rounded-2xl px-5 py-4 text-base leading-relaxed shadow-2xl ${
                                        line.role === "vous"
                                            ? "bg-brand-gold text-brand-navy font-bold rounded-tr-sm"
                                            : "bg-[#070d18] border border-white/10 text-white/90 font-medium rounded-tl-sm shadow-black/40"
                                        }`}
                                    >
                                        {line.text}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                    <div ref={scrollRef} />
                </div>

                <div className="p-6 md:p-10 bg-[#070d18]/80 backdrop-blur-xl border-t border-white/5">
                    <AnimatePresence mode="wait">
                        {!finished && currentNode?.type === "choice" ? (
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-6"
                            >
                                <div className="flex items-center gap-3 px-2">
                                    <Send size={14} className="text-brand-gold animate-pulse" />
                                    <p className="text-[10px] font-black uppercase tracking-widest text-white/40">{currentNode.prompt}</p>
                                </div>
                                <div className="grid gap-4">
                                    {currentNode.options.map((opt, i) => (
                                        <button
                                            key={i}
                                            onClick={() => handleChoice(opt)}
                                            className="group relative flex items-center gap-5 rounded-2xl border border-white/10 bg-white/5 p-5 text-left text-sm font-bold text-white transition-all duration-300 hover:border-brand-gold/50 hover:bg-white/10 hover:-translate-y-1 shadow-xl active:scale-[0.98]"
                                        >
                                            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-black/40 text-[10px] font-black text-brand-gold border border-white/10 group-hover:bg-brand-gold group-hover:text-brand-navy transition-colors">
                                                {i + 1}
                                            </span>
                                            <span className="flex-1 leading-tight">{opt.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        ) : finished ? (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="text-center"
                            >
                                <div className="inline-flex items-center gap-3 rounded-full bg-brand-gold/10 border border-brand-gold/20 px-6 py-2 mb-6">
                                    <Trophy size={16} className="text-brand-gold" />
                                    <span className="text-[10px] font-black uppercase tracking-widest text-brand-gold">Scénario Complété</span>
                                </div>
                                <div className="flex justify-center mb-6">
                                    <div className="relative">
                                        <div className="absolute inset-0 rounded-full bg-brand-gold/20 blur-2xl animate-pulse" />
                                        <div className="relative text-6xl font-black text-white tabular-nums tracking-tighter shadow-2xl">
                                            {(currentNode as any).score}<span className="text-2xl opacity-20">/100</span>
                                        </div>
                                    </div>
                                </div>
                                <p className="text-lg leading-relaxed text-white/80 italic font-medium max-w-lg mx-auto mb-8 px-4">
                                    &laquo; {(currentNode as any).feedback} &raquo;
                                </p>
                                <button
                                    onClick={reset}
                                    className="group inline-flex items-center gap-4 rounded-2xl bg-brand-gold px-12 py-5 text-sm font-black uppercase tracking-widest text-brand-navy shadow-[0_20px_50px_rgba(212,175,55,0.25)] transition hover:bg-white hover:scale-105 active:scale-95"
                                >
                                    <RotateCcw size={18} className="transition-transform group-hover:rotate-180 duration-700" />
                                    Réessayer le scénario
                                </button>
                            </motion.div>
                        ) : (
                            <div className="flex items-center justify-center py-10">
                                <div className="flex gap-2">
                                    <div className="w-2 h-2 rounded-full bg-brand-gold animate-bounce [animation-delay:-0.3s]" />
                                    <div className="w-2 h-2 rounded-full bg-brand-gold animate-bounce [animation-delay:-0.15s]" />
                                    <div className="w-2 h-2 rounded-full bg-brand-gold animate-bounce" />
                                </div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Sidebar Context */}
            <aside className="lg:w-80 space-y-6">
                <div className="rounded-[2rem] border border-white/10 bg-[#070d18] p-8 shadow-2xl">
                    <div className="flex items-center gap-3 mb-6">
                        <Brain className="text-brand-gold w-6 h-6" />
                        <h4 className="text-xs font-black uppercase tracking-widest text-white">Objectifs du simulateur</h4>
                    </div>
                    <ul className="space-y-4">
                        {[
                            "Gérer les objections courantes",
                            "Démontrer la valeur ajoutée",
                            "Sécuriser le mandat exclusif",
                            "Maintenir une posture d'expert"
                        ].map(obj => (
                            <li key={obj} className="flex items-start gap-3 text-sm text-white/50 font-medium italic">
                                <span className="h-1.5 w-1.5 rounded-full bg-brand-gold/40 mt-1.5 shrink-0" />
                                {obj}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="rounded-[2rem] border border-brand-gold/20 bg-brand-gold/5 p-8 shadow-2xl">
                    <div className="flex items-center gap-3 mb-4 text-brand-gold">
                        <Target size={20} />
                        <h4 className="text-xs font-black uppercase tracking-widest">Le conseil de Marie</h4>
                    </div>
                    <p className="text-sm leading-relaxed text-white/70 italic font-medium">
                        &laquo; En négociation, celui qui pose les questions dirige l&apos;entretien. Ne vous justifiez pas, argumentez en bénéfices clients. &raquo;
                    </p>
                </div>
            </aside>
        </div>
    </div>
  );
}
