"use client";

import { motion } from "framer-motion";
import { FrenchCoach } from "@/components/coach";
import { COACH_IDENTITY } from "@/lib/coach/french-coach";
import { MessageCircle, Sparkles, Heart, Brain, Target } from "lucide-react";

export default function CoachMariePage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Hero */}
      <section className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="text-8xl mb-6"
        >
          {COACH_IDENTITY.avatar}
        </motion.div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Je suis {COACH_IDENTITY.name}
        </h1>
        <p className="text-xl text-gray-600 mb-4">{COACH_IDENTITY.role}</p>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-gold/10 rounded-full text-brand-gold font-semibold">
          <Sparkles className="w-4 h-4" />
          100% Française 🇫🇷
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6">
        {[
          {
            icon: Brain,
            title: "Pédagogue",
            desc: "J'explique les concepts complexes de manière simple et accessible",
          },
          {
            icon: Heart,
            title: "Encouragante",
            desc: "Je célèbre tes progrès et te motive à chaque étape",
          },
          {
            icon: Target,
            title: "Pragmatique",
            desc: "Je donne des conseils actionnables pour le terrain",
          },
        ].map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card-elevated p-6 rounded-2xl text-center"
          >
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-brand-gold/10 flex items-center justify-center">
              <feature.icon className="w-6 h-6 text-brand-gold" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Topics */}
      <section className="card-elevated p-8 rounded-2xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <MessageCircle className="w-6 h-6 text-brand-gold" />
          Je peux t'aider sur
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            "📋 La loi ALUR et la conformité",
            "🤝 Les techniques de négociation",
            "💰 Le financement et la fiscalité",
            "📱 Le marketing digital immobilier",
            "🏠 La conduite de visites",
            "✍️ La rédaction des mandats",
            "🎯 Le closing et la conversion",
            "📊 L'estimation des biens",
          ].map((topic, index) => (
            <motion.div
              key={topic}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="p-4 bg-gray-50 rounded-xl text-gray-800 font-medium hover:bg-brand-gold/10 transition cursor-pointer"
            >
              {topic}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to action */}
      <section className="text-center p-8 bg-gradient-to-r from-brand-navy to-brand-navy-deep rounded-2xl text-white">
        <h2 className="text-2xl font-bold mb-4">Prêt(e) à discuter ?</h2>
        <p className="text-white/80 mb-6">
          Clique sur le bouton en bas à droite pour commencer une conversation avec moi !
        </p>
        <div className="inline-flex items-center gap-2 px-6 py-3 bg-brand-gold rounded-xl font-bold text-brand-navy">
          <span className="text-2xl">👇</span>
          Je t'attends en bas à droite !
        </div>
      </section>

      {/* The actual coach component */}
      <FrenchCoach />
    </div>
  );
}
