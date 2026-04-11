"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Mic, MessageCircle, Sparkles, Volume2, Heart, Star, Clapperboard } from "lucide-react";

export default function MarieDidPage() {
  return (
    <div className="mx-auto max-w-4xl space-y-12">
      <section className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="relative mb-6 inline-block"
        >
          <div className="text-8xl">👩‍🏫</div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -right-4 -top-4 text-4xl"
          >
            ✨
          </motion.div>
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -bottom-2 -left-4 text-3xl"
          >
            🎬
          </motion.div>
        </motion.div>

        <h1 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
          Marie — <span className="text-brand-navy">vidéo D-ID</span>
        </h1>
        <p className="mb-6 text-xl text-gray-600">
          Voix + image animée avec la chaîne <span className="font-semibold text-brand-navy">script → TTS → D-ID</span>
        </p>

        <div className="flex flex-wrap justify-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-gold-soft px-4 py-2 font-semibold text-brand-navy">
            <Volume2 className="h-4 w-4" />
            Voix (Mistral / ElevenLabs)
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-sky-100 px-4 py-2 font-semibold text-sky-800">
            <Clapperboard className="h-4 w-4" />
            D-ID Talking Photo
          </span>
          <span className="inline-flex items-center gap-2 rounded-full bg-violet-100 px-4 py-2 font-semibold text-violet-800">
            <Mic className="h-4 w-4" />
            Coach texte (FrenchCoach)
          </span>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        {[
          {
            icon: MessageCircle,
            title: "Scripts du dépôt",
            desc: "Les fichiers Markdown des modules servent de base ; découpez en phrases courtes pour chaque plan D-ID.",
          },
          {
            icon: Volume2,
            title: "Audio avant vidéo",
            desc: "Générez d’abord le MP3 (README : Mistral Voxtral ou ElevenLabs), puis importez l’audio dans D-ID Studio ou l’API.",
          },
          {
            icon: Heart,
            title: "Cohérence visage / voix",
            desc: "Gardez la même voix TTS et la même photo d’avatar pour toutes les séquences d’un module.",
          },
        ].map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="card-elevated rounded-2xl p-6 text-center"
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100">
              <feature.icon className="h-7 w-7 text-brand-navy" />
            </div>
            <h3 className="mb-2 font-bold text-gray-900">{feature.title}</h3>
            <p className="text-sm text-gray-600">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      <section className="card-elevated rounded-2xl bg-gradient-to-br from-brand-gold-soft/80 to-white p-8">
        <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-gray-900">
          <Sparkles className="h-6 w-6 text-brand-gold" />
          Où cliquer dans le LMS ?
        </h2>
        <ul className="space-y-4 text-left text-gray-800">
          <li className="flex gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-navy font-bold text-white">
              1
            </span>
            <span>
              <Link href="/formation/interactive-avatar" className="font-semibold text-brand-navy underline-offset-4 hover:underline">
                Scripts & beats D-ID (exemple Loi ALUR)
              </Link>{" "}
              — textes prêts à copier pour TTS et tournage.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-navy font-bold text-white">
              2
            </span>
            <span>
              <strong>Coach</strong> : utilisez le widget flottant (FrenchCoach) en bas à droite pour des réponses
              immédiates sans vidéo.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-navy font-bold text-white">
              3
            </span>
            <span>
              <Link href="/formation/production" className="font-semibold text-brand-navy underline-offset-4 hover:underline">
                Tableau de production
              </Link>{" "}
              — suivi des vidéos et visuels par module.
            </span>
          </li>
        </ul>
      </section>

      <section className="card-elevated rounded-2xl p-8">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">Tu peux aussi réviser avec…</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            "Les différents types de mandats",
            "Les diagnostics obligatoires",
            "Comment estimer un bien",
            "La négociation de prix",
            "La loi ALUR",
            "Le compromis de vente",
          ].map((topic, index) => (
            <motion.div
              key={topic}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="flex cursor-default items-center gap-3 rounded-xl border-2 border-transparent bg-white p-4 shadow-sm transition hover:border-brand-navy/15"
            >
              <Star className="h-5 w-5 text-brand-gold" />
              <span className="font-medium text-gray-800">{topic}</span>
            </motion.div>
          ))}
        </div>
      </section>

      <p className="text-center text-sm text-zinc-500">
        L’ancienne URL <code className="rounded bg-zinc-100 px-1">/formation/marie-heygen</code> redirige ici.
        Guide technique : <code className="rounded bg-zinc-100 px-1">lms/docs/D-ID-INTEGRATION.md</code>
      </p>
    </div>
  );
}
