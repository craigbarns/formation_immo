"use client";

import { motion } from "framer-motion";
import { FrenchWomanCoach } from "@/components/heygen";
import { Mic, MessageCircle, Sparkles, Volume2, Heart, Star } from "lucide-react";

export default function MarieHeyGenPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      {/* Hero */}
      <section className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="relative inline-block mb-6"
        >
          <div className="text-8xl">👩‍🏫</div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-4 -right-4 text-4xl"
          >
            ✨
          </motion.div>
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -bottom-2 -left-4 text-3xl"
          >
            🎙️
          </motion.div>
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Marie <span className="text-pink-500">HeyGen</span>
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Ton coach IA en <span className="font-bold text-pink-500">vidéo</span>
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 text-pink-700 rounded-full font-semibold">
            <Volume2 className="w-4 h-4" />
            Voix féminine
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-full font-semibold">
            🇫🇷
            Français 100%
          </span>
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-semibold">
            <Mic className="w-4 h-4" />
            Conversation vocale
          </span>
        </div>
      </section>

      {/* Features */}
      <section className="grid md:grid-cols-3 gap-6">
        {[
          {
            icon: MessageCircle,
            title: "Discussion naturelle",
            desc: "Parle à Marie comme à une vraie personne. Elle comprend et répond en temps réel.",
            color: "pink",
          },
          {
            icon: Volume2,
            title: "Voix française",
            desc: "Une voix féminine claire et chaleureuse, sans accent anglais.",
            color: "rose",
          },
          {
            icon: Heart,
            title: "Pédagogie douce",
            desc: "Marie explique avec patience et t'encourage dans ton apprentissage.",
            color: "red",
          },
        ].map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card-elevated p-6 rounded-2xl text-center"
          >
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-pink-100 flex items-center justify-center">
              <feature.icon className="w-7 h-7 text-pink-500" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* How it works */}
      <section className="card-elevated p-8 rounded-2xl bg-gradient-to-br from-pink-50 to-rose-50">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <Sparkles className="w-6 h-6 text-pink-500" />
          Comment ça marche ?
        </h2>
        <div className="space-y-4">
          {[
            { step: "1", text: "Clique sur le bouton rose 👩‍🏫 en bas à droite" },
            { step: "2", text: "Autorise l'accès à ton microphone quand ton navigateur le demande" },
            { step: "3", text: "Parle à Marie comme à une vraie personne !" },
            { step: "4", text: "Elle te répond en vidéo avec sa voix française" },
          ].map((item) => (
            <div key={item.step} className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-pink-500 text-white font-bold flex items-center justify-center flex-shrink-0">
                {item.step}
              </div>
              <p className="text-gray-800">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Topics */}
      <section className="card-elevated p-8 rounded-2xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Pose-lui des questions sur...
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          {[
            "💼 Les différents types de mandats",
            "📋 Les diagnostics obligatoires",
            "🏠 Comment estimer un bien",
            "💰 La négociation de prix",
            "📸 Les photos immobilières",
            "🤝 Le closing et la signature",
            "⚖️ La loi ALUR",
            "📝 Le compromis de vente",
          ].map((topic, index) => (
            <motion.div
              key={topic}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="flex items-center gap-3 p-4 bg-white rounded-xl border-2 border-transparent hover:border-pink-200 transition cursor-pointer shadow-sm"
            >
              <Star className="w-5 h-5 text-pink-400" />
              <span className="text-gray-800 font-medium">{topic}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center p-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl text-white">
        <h2 className="text-2xl font-bold mb-4">Prêt(e) à discuter avec Marie ?</h2>
        <p className="text-white/90 mb-6">
          Elle t'attend en bas à droite de l'écran !
        </p>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-pink-600 rounded-xl font-bold"
        >
          <span className="text-2xl">👇</span>
          Clique sur le bouton rose
        </motion.div>
      </section>

      {/* The actual coach component */}
      <FrenchWomanCoach />
    </div>
  );
}
