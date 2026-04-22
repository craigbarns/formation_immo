import Link from "next/link";
import {
  AlertTriangle,
  ArrowLeft,
  CreditCard,
  FileText,
  Lock,
  RefreshCcw,
  Scale,
} from "lucide-react";

export const metadata = {
  title: "Conditions générales de vente | MonPassFormation",
  description:
    "Conditions générales de vente de MonPassFormation, espace digital de formations professionnelles PASS Formation.",
};

const sections = [
  {
    icon: FileText,
    title: "Désignation",
    content: [
      "PASS Formation désigne un organisme de formation professionnelle situé au 6 rue Maurice Caunes, 31200 Toulouse.",
      "MonPassFormation correspond à l'espace digital permettant de présenter, vendre et suivre des formations professionnelles en ligne.",
    ],
  },
  {
    icon: Scale,
    title: "Objet et champ d'application",
    content: [
      "Les présentes conditions encadrent l'achat et l'utilisation des formations proposées sur MonPassFormation.",
      "Toute commande implique l'acceptation des présentes conditions générales de vente par le client.",
    ],
  },
  {
    icon: CreditCard,
    title: "Prix et paiement",
    content: [
      "Les prix sont indiqués sur les pages de présentation des formations.",
      "Le paiement en ligne sera traité par Stripe lorsque l'option sera activée sur le site.",
      "Certaines demandes peuvent nécessiter un échange préalable avec PASS Formation, notamment en cas de financement CPF, OPCO ou entreprise.",
    ],
  },
  {
    icon: Lock,
    title: "Accès au contenu",
    content: [
      "L'accès à une formation est personnel, nominatif et non transférable.",
      "Après validation du paiement ou de l'inscription, l'apprenant accède à son espace personnel et aux contenus associés à la formation achetée.",
      "Les supports pédagogiques sont protégés par le droit d'auteur et ne peuvent être reproduits, transmis ou revendus sans autorisation.",
    ],
  },
  {
    icon: RefreshCcw,
    title: "Rétractation, report et annulation",
    content: [
      "Les règles de rétractation, report ou annulation dépendent du type de commande, du statut du client et du mode de financement.",
      "Pour les contenus numériques accessibles immédiatement, le droit de rétractation peut être limité si l'accès commence avec l'accord exprès du client.",
      "Toute demande particulière doit être adressée à contact@passformation.com.",
    ],
  },
  {
    icon: AlertTriangle,
    title: "Responsabilité",
    content: [
      "Les formations sont fournies à titre pédagogique et professionnel. Elles ne constituent pas un conseil juridique personnalisé.",
      "La formation immobilière accompagne la montée en compétence et la formation continue. Elle ne remplace pas les démarches administratives nécessaires auprès des organismes compétents.",
    ],
  },
  {
    icon: Scale,
    title: "Droit applicable",
    content: [
      "Les présentes conditions sont soumises au droit français.",
      "En cas de litige, une solution amiable sera recherchée prioritairement. À défaut, les juridictions compétentes seront déterminées conformément aux règles applicables.",
    ],
  },
];

export default function CGVPage() {
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
          <p className="text-sm font-black uppercase text-brand-gold">Document contractuel</p>
          <h1 className="mt-3 text-3xl font-black text-brand-navy sm:text-4xl">
            Conditions générales de vente
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
