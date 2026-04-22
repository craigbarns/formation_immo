import Link from "next/link";
import { ArrowLeft, Building2, FileText, Mail, Server, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Mentions légales | MonPassFormation",
  description:
    "Mentions légales de MonPassFormation, espace digital de formations professionnelles PASS Formation.",
};

const sections = [
  {
    icon: Building2,
    title: "Éditeur du site",
    content: [
      "PASS Formation",
      "6 rue Maurice Caunes, 31200 Toulouse",
      "Téléphone : 09 54 46 77 73",
      "Email : contact@passformation.com",
    ],
  },
  {
    icon: Server,
    title: "Hébergement",
    content: [
      "Site hébergé sur une infrastructure web compatible Next.js.",
      "Les informations d'hébergement définitives seront précisées lors de la mise en production du domaine.",
    ],
  },
  {
    icon: FileText,
    title: "Propriété intellectuelle",
    content: [
      "Les contenus pédagogiques, textes, images, vidéos, supports et éléments graphiques sont protégés par le droit d'auteur.",
      "Toute reproduction, diffusion ou réutilisation non autorisée est interdite.",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Données personnelles",
    content: [
      "Les données collectées servent à gérer l'inscription, l'accès aux formations, le suivi pédagogique et la relation client.",
      "Conformément au RGPD, chaque utilisateur peut demander l'accès, la rectification ou la suppression de ses données.",
      "Pour exercer ces droits : contact@passformation.com.",
    ],
  },
  {
    icon: Mail,
    title: "Contact",
    content: ["Pour toute question relative au site : contact@passformation.com."],
  },
];

export default function MentionsLegalesPage() {
  return (
    <main className="min-h-screen bg-zinc-50 px-5 py-12 text-zinc-950 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-bold text-brand-navy transition hover:text-brand-navy-mid"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Retour à l&apos;accueil
        </Link>

        <div className="mt-8 rounded-lg bg-white p-6 shadow-sm sm:p-8">
          <p className="text-sm font-black uppercase text-brand-gold">Informations légales</p>
          <h1 className="mt-3 text-3xl font-black text-brand-navy sm:text-4xl">
            Mentions légales
          </h1>
          <p className="mt-3 text-sm text-zinc-500">Dernière mise à jour : avril 2026</p>
        </div>

        <div className="mt-8 space-y-5">
          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <section key={section.title} className="rounded-lg border border-zinc-200 bg-white p-6">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-navy/5">
                    <Icon className="h-5 w-5 text-brand-navy" aria-hidden />
                  </span>
                  <h2 className="text-lg font-black text-brand-navy">{section.title}</h2>
                </div>
                <div className="mt-4 space-y-2 text-sm leading-6 text-zinc-600">
                  {section.content.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      </div>
    </main>
  );
}
