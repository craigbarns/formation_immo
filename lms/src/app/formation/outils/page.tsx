import Link from "next/link";
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
    <div className="space-y-12">
      {/* Header */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a3a5c] via-[#244b75] to-[#0f2540] px-6 py-10 text-white shadow-2xl md:px-10 md:py-12">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
          aria-hidden
        />
        <nav className="mb-6 flex items-center gap-2 text-sm text-white/60">
          <Link href="/formation" className="transition hover:text-white">Parcours</Link>
          <span>/</span>
          <span className="text-white">Outils interactifs</span>
        </nav>
        <div className="flex items-start gap-5">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-3xl shadow-inner ring-1 ring-white/20">
            🧮
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#d4af37]">Formation 42h</p>
            <h1 className="mt-1 text-3xl font-black leading-tight tracking-tight md:text-4xl">
              Outils interactifs
            </h1>
            <p className="mt-3 max-w-2xl text-base leading-relaxed text-white/75">
              Simulateurs professionnels et entraînements pratiques — conçus pour maîtriser le
              financement, la rentabilité, la négociation et l'argumentaire vendeur comme un expert.
            </p>
          </div>
        </div>

        {/* Quick links */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {tools.map((t) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-sm transition hover:bg-white/20"
            >
              <span className="text-2xl">{t.icon}</span>
              <div>
                <p className="text-sm font-bold">{t.label}</p>
                <p className="text-[11px] text-white/60">{t.tag}</p>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Simulateur crédit */}
      <section id="credit" className="scroll-mt-6">
        <ToolHeader icon="🏦" tag="Financement" tagColor="blue" title="Simulateur de crédit immobilier" />
        <p className="mb-5 max-w-2xl text-sm leading-relaxed text-zinc-600">
          Calculez instantanément les mensualités, le coût total, le taux d&apos;endettement, le TAEG
          et visualisez un tableau d&apos;amortissement simplifié. Choisissez un scénario prédéfini ou personnalisez chaque paramètre.
        </p>
        <AdvancedCreditSimulator />
      </section>

      {/* Simulateur rentabilité */}
      <section id="rentabilite" className="scroll-mt-6">
        <ToolHeader icon="📈" tag="Investissement" tagColor="green" title="Rentabilité locative avancée" />
        <p className="mb-5 max-w-2xl text-sm leading-relaxed text-zinc-600">
          Calculez le rendement brut, net-net, le cashflow mensuel et le délai de retour sur investissement.
          Activez le mode LMNP pour estimer l&apos;impact fiscal Micro-BIC.
        </p>
        <RentabilitySimulator />
      </section>

      {/* Capacité d'emprunt */}
      <section id="capacite" className="scroll-mt-6">
        <ToolHeader icon="💳" tag="Financement" tagColor="blue" title="Capacité d&apos;emprunt (reverse)" />
        <p className="mb-5 max-w-2xl text-sm leading-relaxed text-zinc-600">
          À partir de vos revenus et de votre taux d&apos;endettement cible, calculez votre mensualité maximale,
          votre capacité d&apos;emprunt totale et le prix maximum du bien que vous pouvez viser.
        </p>
        <CapaciteEmpruntSimulator />
      </section>

      {/* Net vendeur */}
      <section id="net-vendeur" className="scroll-mt-6">
        <ToolHeader icon="🏷️" tag="Terrain" tagColor="amber" title="Calculateur net vendeur" />
        <p className="mb-5 max-w-2xl text-sm leading-relaxed text-zinc-600">
          Calculez le prix net vendeur à partir du prix FAI et du taux d&apos;honaires.
          Générez des phrases d&apos;argumentaire prêtes à l&apos;emploi pour vos rendez-vous vendeur.
        </p>
        <NetVendeurSimulator />
      </section>

      {/* Jeu de rôle */}
      <section id="negociation" className="scroll-mt-6">
        <ToolHeader icon="🎭" tag="Terrain" tagColor="purple" title="Jeu de rôle : Négociation" />
        <p className="mb-5 max-w-2xl text-sm leading-relaxed text-zinc-600">
          Entraînez-vous en situation réelle avec 2 scénarios complets (4 tours chacun).
          Choisissez vos réponses face à un client simulé et obtenez un feedback immédiat sur votre approche.
        </p>
        <NegotiationSimulator />
      </section>

      {/* Retour */}
      <div className="border-t border-zinc-200 pt-6">
        <Link
          href="/formation"
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-3 text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-[#1a3a5c]/30 hover:shadow-md"
        >
          ← Retour au parcours
        </Link>
      </div>
    </div>
  );
}

function ToolHeader({
  icon,
  tag,
  tagColor,
  title,
}: {
  icon: string;
  tag: string;
  tagColor: "blue" | "green" | "purple" | "amber";
  title: string;
}) {
  const colors: Record<string, string> = {
    blue: "border-blue-200 bg-blue-50 text-blue-700",
    green: "border-emerald-200 bg-emerald-50 text-emerald-700",
    purple: "border-purple-200 bg-purple-50 text-purple-700",
    amber: "border-amber-200 bg-amber-50 text-amber-700",
  };
  const iconBg: Record<string, string> = {
    blue: "border-blue-200 bg-blue-50",
    green: "border-emerald-200 bg-emerald-50",
    purple: "border-purple-200 bg-purple-50",
    amber: "border-amber-200 bg-amber-50",
  };
  return (
    <div className="mb-5 flex items-center gap-4">
      <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border text-xl ${iconBg[tagColor]}`}>
        {icon}
      </div>
      <div>
        <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${colors[tagColor]}`}>
          {tag}
        </span>
        <h2 className="mt-0.5 text-xl font-bold text-[#1a3a5c]">{title}</h2>
      </div>
      <div className="h-px flex-1 bg-gradient-to-r from-zinc-200 to-transparent" aria-hidden />
    </div>
  );
}
