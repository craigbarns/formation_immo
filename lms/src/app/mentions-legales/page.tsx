import Link from "next/link";
import { Building2, Mail, Server, FileText, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Mentions légales — Formation 42h",
  description: "Mentions légales du site Formation 42h, formation en ligne pour agents immobiliers.",
};

const SECTIONS = [
  {
    icon: Building2,
    title: "Éditeur du site",
    content: [
      "Formation 42h",
      "N° d'activité en cours d'inscription",
      "Contact : contact@formation42h.fr",
    ],
  },
  {
    icon: Server,
    title: "Hébergement",
    content: [
      "Vercel Inc.",
      "340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis",
      "Site web : vercel.com",
    ],
  },
  {
    icon: FileText,
    title: "Propriété intellectuelle",
    content: [
      "L'ensemble du contenu de ce site (textes, images, vidéos, audio, code) est la propriété exclusive de Formation 42h.",
      "Toute reproduction, représentation ou diffusion, intégrale ou partielle, sans autorisation préalable est interdite.",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Données personnelles",
    content: [
      "Les données collectées (nom, email, progression) sont utilisées uniquement pour le fonctionnement du service.",
      "Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données.",
      "Pour exercer ces droits, contactez-nous à contact@formation42h.fr.",
    ],
  },
  {
    icon: Mail,
    title: "Contact",
    content: [
      "Pour toute question relative aux mentions légales, contactez-nous à contact@formation42h.fr.",
    ],
  },
];

export default function MentionsLegalesPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-brand-navy">Mentions légales</h1>
        <p className="mt-2 text-sm text-zinc-500">Dernière mise à jour : avril 2026</p>
      </div>

      <div className="space-y-8">
        {SECTIONS.map((section) => (
          <section key={section.title} className="card-elevated p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-navy/5">
                <section.icon className="h-5 w-5 text-brand-navy" />
              </div>
              <h2 className="text-lg font-bold text-brand-navy">{section.title}</h2>
            </div>
            <div className="space-y-2 text-sm leading-relaxed text-zinc-600">
              {section.content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link
          href="/formation"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-navy px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-navy-deep"
        >
          ← Retour au parcours
        </Link>
      </div>
    </div>
  );
}
