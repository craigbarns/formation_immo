"use client";

import { PresenterCard, InteractiveLesson, AnimatedAvatar } from "@/components/presenters";
import { motion } from "framer-motion";

const presenters = [
  {
    name: "Alexandre",
    role: "Expert Juridique",
    color: "#1a3a5c",
    emoji: "👨‍⚖️",
    messages: [
      { id: "1", text: "Bonjour ! Je suis Alexandre, votre guide pour le module juridique.", expression: "happy" as const },
      { id: "2", text: "Aujourd'hui, nous allons découvrir les secrets de la loi ALUR.", expression: "focused" as const },
      { id: "3", text: "Prêt à devenir un expert en conformité ? C'est parti ! 🚀", expression: "excited" as const },
    ],
  },
  {
    name: "Sarah",
    role: "Coach Transaction",
    color: "#d4af37",
    emoji: "👩‍💼",
    messages: [
      { id: "1", text: "Salut ! Moi c'est Sarah, spécialiste de la négociation.", expression: "happy" as const },
      { id: "2", text: "Je vais vous apprendre à convertir chaque prospect en client.", expression: "thinking" as const },
      { id: "3", text: "Avec mes techniques, vous allez décrocher des mandats exclusifs ! 💪", expression: "excited" as const },
    ],
  },
  {
    name: "Thomas",
    role: "Analyste Financier",
    color: "#10b981",
    emoji: "👨‍💻",
    messages: [
      { id: "1", text: "Bonjour, je suis Thomas. Les chiffres n'ont plus de secrets pour moi.", expression: "neutral" as const },
      { id: "2", text: "Nous allons calculer rentabilité, taux d'endettement et fiscalité.", expression: "focused" as const },
      { id: "3", text: "Maîtrisez les finances et vous maîtriserez la transaction ! 📊", expression: "excited" as const },
    ],
  },
];

const demoLesson = {
  title: "Découverte Interactive",
  presenter: {
    name: "Léa",
    role: "Experte Marketing",
    color: "#ec4899",
    emoji: "👩‍🎨",
  },
  steps: [
    {
      id: "1",
      title: "Bienvenue dans cette formation",
      content: "Bonjour ! Je suis Léa, votre experte en marketing immobilier. Aujourd'hui, nous allons apprendre à créer des annonces qui vendent.",
      tip: "Une bonne annonce se lit comme une histoire où le client est le héros.",
    },
    {
      id: "2",
      title: "La photo fait 90% du travail",
      content: "La première image de votre annonce détermine si le client clique ou passe son chemin. Investissez dans de belles photos !",
      action: "Reprenez vos 3 dernières annonces et notez la qualité des photos de 1 à 10.",
    },
    {
      id: "3",
      title: "Le titre qui accroche",
      content: "Un titre efficace = Type de bien + Atout principal + Localisation. Ex: 'Appartement T3 lumineux - Terrasse 20m² - Lyon 6e'",
      tip: "Évitez les MAJUSCULES et les superlatifs vides comme 'magnifique' ou 'exceptionnel'.",
    },
  ],
};

export default function DemoPresentersPage() {
  return (
    <div className="space-y-12">
      <section>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Nos Formateurs</h1>
        <p className="text-gray-600 mb-8">Des experts passionnés pour vous accompagner</p>
        
        <div className="grid md:grid-cols-3 gap-6">
          {presenters.map((p, index) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <PresenterCard {...p} />
            </motion.div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Leçon Interactive</h2>
        <InteractiveLesson
          title={demoLesson.title}
          presenter={demoLesson.presenter}
          steps={demoLesson.steps}
        />
      </section>

      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Expressions Animées</h2>
        <div className="grid grid-cols-5 gap-6">
          {(["neutral", "happy", "thinking", "excited", "focused"] as const).map((expr) => (
            <div key={expr} className="text-center">
              <AnimatedAvatar
                name={expr}
                role="Expression"
                color="#1a3a5c"
                emoji="🎭"
                expression={expr}
                size="md"
              />
              <p className="mt-2 text-sm text-gray-500 capitalize">{expr}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
