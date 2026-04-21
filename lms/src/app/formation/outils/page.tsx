import type { Metadata } from "next";
import Link from "next/link";
import { EmojiIcon } from "@/components/ui/EmojiIcon";
import { ArrowLeft, Sparkles, Gavel, HandCoins, Banknote, Briefcase, FileSpreadsheet, Wrench, Calculator } from "lucide-react";

export const metadata: Metadata = {
  title: "Simulateurs & outils",
  description: "Simulateurs de crédit, rentabilité locative, capacité d'emprunt, net vendeur et jeu de rôle négociation.",
};
import { AdvancedCreditSimulator, RentabilitySimulator, NetVendeurSimulator, CapaciteEmpruntSimulator } from "@/components/simulators";
import { NegotiationSimulator } from "@/components/simulators/NegotiationSimulator";

export default function OutilsPage() {
  const tools = [
    { id: "credit", icon: "🏦", label: "Simulateur crédit", tag: "Financement", color: "blue" },
    { id: "rentabilite", icon: "📈", label: "Rentabilité locative", tag: "Investissement", color: "green" },
    { id: "capacite", icon: "💳", label: "Capacité d'emprunt", tag: "Financement", color: "blue" },
    { id: "net-vendeur", icon: "🏷️", label: "Net vendeur", tag: "Terrain", color: "amber" },
    { id: "negociation", icon: "🎭", label: "Jeu de rôle négociation", tag: "Terrain", color: "purple" },
  ] as const;

  return (
    <div className="space-y-12 pb-20">
      <Link
        href="/formation"
        className="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-brand-gold"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Retour au parcours
      </Link>

      {/* Header */}
      <section className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#070d18] px-8 py-16 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.1),transparent_70%)] pointer-events-none" />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
          aria-hidden
        />
        
        <div className="relative flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-5 py-2 text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold mb-8">
            <Sparkles className="h-4 w-4 animate-pulse" /> ARSENAL OPÉRATIONNEL
          </div>
          <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl uppercase leading-none">
            Outils <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-white to-brand-gold">interactifs</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg text-white/50 leading-relaxed italic font-medium">
            Simulateurs financiers et entraînements immersifs conçus pour asseoir votre autorité face aux clients et sécuriser chaque étape de la transaction.
          </p>
        </div>

        {/* Quick links */}
        <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {tools.map((t) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              className="group flex flex-col items-center gap-4 rounded-3xl border border-white/5 bg-white/[0.03] p-6 backdrop-blur-xl transition-all duration-300 hover:border-brand-gold/30 hover:bg-white/5 hover:-translate-y-1 shadow-2xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#030712] border border-white/5 shadow-xl group-hover:scale-110 transition-transform">
                <EmojiIcon emoji={t.icon} className="h-7 w-7" />
              </div>
              <div className="text-center">
                <p className="text-xs font-black uppercase tracking-widest text-white/80 group-hover:text-brand-gold transition-colors">{t.label}</p>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20 mt-1">{t.tag}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Simulateur crédit */}
      <section id="credit" className="scroll-mt-32 space-y-8">
        <ToolHeader icon={<Banknote />} tag="Financement" tagColor="blue" title="Simulateur de crédit immobilier" />
        <div className="rounded-[2.5rem] border border-white/10 bg-[#070d18] p-8 md:p-12 shadow-2xl">
            <p className="mb-10 max-w-3xl text-lg leading-relaxed text-white/50 font-medium italic border-l-2 border-brand-gold/30 pl-6">
            &laquo; Calculez instantanément les mensualités, le coût total, le taux d&apos;endettement et le TAEG. Visualisez l&apos;impact d&apos;un rachat de crédit ou d&apos;une modulation d&apos;échéance. &raquo;
            </p>
            <AdvancedCreditSimulator />
        </div>
      </section>

      {/* Simulateur rentabilité */}
      <section id="rentabilite" className="scroll-mt-32 space-y-8">
        <ToolHeader icon={<Calculator />} tag="Investissement" tagColor="green" title="Rentabilité locative avancée" />
        <div className="rounded-[2.5rem] border border-white/10 bg-[#070d18] p-8 md:p-12 shadow-2xl">
            <p className="mb-10 max-w-3xl text-lg leading-relaxed text-white/50 font-medium italic border-l-2 border-brand-gold/30 pl-6">
            &laquo; Calculez le rendement brut, net-net et le cashflow mensuel. Anticipez l&apos;impact fiscal en Micro-BIC ou au Réel pour conseiller vos investisseurs avec précision. &raquo;
            </p>
            <RentabilitySimulator />
        </div>
      </section>

      {/* Capacité d'emprunt */}
      <section id="capacite" className="scroll-mt-32 space-y-8">
        <ToolHeader icon={<FileSpreadsheet />} tag="Financement" tagColor="blue" title="Capacité d&apos;emprunt stratégique" />
        <div className="rounded-[2.5rem] border border-white/10 bg-[#070d18] p-8 md:p-12 shadow-2xl">
            <p className="mb-10 max-w-3xl text-lg leading-relaxed text-white/50 font-medium italic border-l-2 border-brand-gold/30 pl-6">
            &laquo; Déterminez l&apos;enveloppe d&apos;acquisition maximale à partir des revenus et charges de vos clients. Validez la faisabilité d&apos;un projet avant même le passage chez le courtier. &raquo;
            </p>
            <CapaciteEmpruntSimulator />
        </div>
      </section>

      {/* Net vendeur */}
      <section id="net-vendeur" className="scroll-mt-32 space-y-8">
        <ToolHeader icon={<HandCoins />} tag="Terrain" tagColor="amber" title="Calculateur net vendeur" />
        <div className="rounded-[2.5rem] border border-white/10 bg-[#070d18] p-8 md:p-12 shadow-2xl">
            <p className="mb-10 max-w-3xl text-lg leading-relaxed text-white/50 font-medium italic border-l-2 border-brand-gold/30 pl-6">
            &laquo; Convertissez instantanément un prix FAI en net vendeur. Intégrez vos honoraires de manière transparente et justifiez votre valeur ajoutée. &raquo;
            </p>
            <NetVendeurSimulator />
        </div>
      </section>

      {/* Jeu de rôle */}
      <section id="negociation" className="scroll-mt-32 space-y-8">
        <ToolHeader icon={<Gavel />} tag="Terrain" tagColor="purple" title="Atelier : Négociation Mandat" />
        <div className="rounded-[2.5rem] border border-white/10 bg-[#070d18] p-8 md:p-12 shadow-2xl">
            <p className="mb-10 max-w-3xl text-lg leading-relaxed text-white/50 font-medium italic border-l-2 border-brand-gold/30 pl-6">
            &laquo; Affrontez des situations de blocage réelles. Choisissez vos arguments face à un client exigeant et recevez une analyse instantanée de votre posture commerciale. &raquo;
            </p>
            <NegotiationSimulator />
        </div>
      </section>
    </div>
  );
}

function ToolHeader({
  icon,
  tag,
  tagColor,
  title,
}: {
  icon: React.ReactNode;
  tag: string;
  tagColor: "blue" | "green" | "purple" | "amber";
  title: string;
}) {
  const colors: Record<string, string> = {
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    green: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    amber: "bg-amber-500/10 text-brand-gold border-brand-gold/20",
  };
  
  return (
    <div className="flex flex-wrap items-center gap-6">
      <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border shadow-xl ${colors[tagColor]}`}>
        {icon}
      </div>
      <div>
        <span className={`rounded-full border px-3 py-1 text-[10px] font-black uppercase tracking-widest ${colors[tagColor]}`}>
          {tag}
        </span>
        <h2 className="mt-2 text-2xl font-black text-white uppercase tracking-tight leading-none">{title}</h2>
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" aria-hidden />
    </div>
  );
}
