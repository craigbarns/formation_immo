import Link from "next/link";
import { FileText, CreditCard, Lock, RefreshCcw, AlertTriangle, Scale } from "lucide-react";

export const metadata = {
  title: "Conditions générales de vente — Formation 42h",
  description: "CGV de la formation en ligne Formation 42h pour agents immobiliers.",
};

const SECTIONS = [
  {
    icon: FileText,
    title: "Objet",
    content: [
      "Les présentes conditions générales de vente régissent l'accès et l'utilisation de la formation en ligne 'Formation 42h' destinée aux agents immobiliers.",
      "L'achat de la formation implique l'acceptation sans réserve des présentes CGV.",
    ],
  },
  {
    icon: CreditCard,
    title: "Prix et paiement",
    content: [
      "Le prix de la formation est indiqué sur la page d'accueil et peut faire l'objet de promotions ponctuelles.",
      "Le paiement s'effectue en ligne par carte bancaire via notre prestataire de paiement sécurisé.",
      "La transaction est immédiatement débitée. Un reçu est envoyé par email.",
    ],
  },
  {
    icon: Lock,
    title: "Accès au contenu",
    content: [
      "L'accès à la formation est personnel et non transférable.",
      "L'utilisateur dispose d'un accès illimité dans le temps au contenu acquis.",
      "Les mises à jour du contenu sont incluses sans frais supplémentaires.",
    ],
  },
  {
    icon: RefreshCcw,
    title: "Droit de rétractation",
    content: [
      "Conformément à l'article L221-18 du Code de la consommation, le consommateur dispose d'un délai de 14 jours pour exercer son droit de rétractation.",
      "Pour les contenus numériques fournis immédiatement après l'achat, le droit de rétractation peut être renoncé avec l'accord exprès du consommateur.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Responsabilité",
    content: [
      "La formation est fournie à titre informatif et pédagogique. Elle ne constitue pas un conseil juridique personnalisé.",
      "L'éditeur ne saurait être tenu responsable des décisions prises par l'utilisateur sur la base du contenu enseigné.",
      "L'éditeur s'engage à maintenir le contenu à jour dans la mesure du possible, sans garantie d'exhaustivité.",
    ],
  },
  {
    icon: Scale,
    title: "Droit applicable",
    content: [
      "Les présentes CGV sont soumises au droit français.",
      "En cas de litige, une solution amiable sera recherchée avant toute action judiciaire. À défaut, les tribunaux compétents seront ceux du ressort du siège de l'éditeur.",
    ],
  },
];

export default function CGVPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-bold text-brand-navy">Conditions générales de vente</h1>
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
