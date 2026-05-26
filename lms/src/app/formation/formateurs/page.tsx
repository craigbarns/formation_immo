import type { Metadata } from "next";
import { MODULE_AVATARS } from "@/data/module-avatars";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Sparkles, UserCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Formateurs",
  description: "Découvrez les 5 experts pédagogiques de Formation 42h, un spécialiste par module.",
};

export default function FormateursPage() {
  return (
    <div className="space-y-12">
      <Link
        href="/formation"
        className="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-white/75 transition-colors hover:text-brand-gold"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden /> Retour au parcours
      </Link>

      <header className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#070d18] px-8 py-16 text-center shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.1),transparent_70%)] pointer-events-none" />
        <p className="inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold mb-8">
          <Sparkles className="h-4 w-4 animate-pulse" /> Excellence pédagogique
        </p>
        <h1 className="text-4xl font-black tracking-tight text-white md:text-6xl uppercase leading-none">
          Votre équipe <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold via-white to-brand-gold">d&apos;experts</span>
        </h1>
        <p className="mx-auto mt-8 max-w-2xl text-lg text-white/50 leading-relaxed italic">
          Chaque module est animé par une professionnelle de terrain. Leur expertise combinée couvre l&apos;intégralité du cycle de vie d&apos;une transaction immobilière.
        </p>
      </header>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {MODULE_AVATARS.map((avatar) => (
          <Link
            key={avatar.moduleSlug}
            href={`/formation/${avatar.moduleSlug}`}
            className="group relative flex flex-col items-center overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#070d18] p-8 text-center transition-all duration-500 hover:border-brand-gold/40 hover:-translate-y-2 shadow-2xl"
          >
            <div
              className="absolute top-0 left-0 right-0 h-1.5 opacity-60 group-hover:opacity-100 transition-opacity"
              style={{ background: avatar.accentColor }}
            />

            <div
              className="relative h-28 w-28 overflow-hidden rounded-full shadow-2xl ring-4 ring-white/5 transition-transform duration-700 group-hover:scale-110"
              style={{ padding: "4px", background: `linear-gradient(135deg, ${avatar.accentColor}, #d4af37)` }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-full bg-[#030712]">
                {avatar.photoUrl ? (
                    <Image
                    src={avatar.photoUrl}
                    alt={avatar.name}
                    fill
                    className="object-cover"
                    sizes="112px"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center text-3xl font-black text-white">
                    {avatar.initials}
                    </div>
                )}
              </div>
            </div>

            <div className="mt-8 space-y-2">
              <p className="text-xl font-black text-white uppercase tracking-tight">{avatar.name}</p>
              <p
                className="rounded-full px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-lg inline-block"
                style={{ backgroundColor: avatar.accentColor }}
              >
                {avatar.role}
              </p>
            </div>
            
            <p className="mt-6 text-sm leading-relaxed text-white/50 italic flex-1">
                &laquo; {avatar.description} &raquo;
            </p>

            <div
              className="mt-8 w-full rounded-2xl py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white border border-white/10 bg-white/5 transition-all group-hover:bg-brand-gold group-hover:text-brand-navy group-hover:border-brand-gold shadow-xl active:scale-95"
            >
              Maîtriser le module <ArrowLeft className="inline-block w-3 h-3 ml-2 rotate-180" />
            </div>
          </Link>
        ))}
      </div>

      <div className="rounded-[2.5rem] border border-slate-100 dark:border-white/5 bg-white dark:bg-white/[0.02] p-10 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
          <div className="h-16 w-16 shrink-0 rounded-2xl bg-brand-gold/10 border border-brand-gold/20 flex items-center justify-center text-brand-gold">
              <UserCheck size={32} />
          </div>
          <div className="text-center md:text-left">
              <h3 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">Accompagnement personnalisé</h3>
              <p className="mt-2 text-slate-500 dark:text-white/75 leading-relaxed max-w-2xl">
                  En plus de ces supports vidéo, nos expertes répondent à vos questions techniques directement dans l&apos;espace commentaire de chaque leçon. Profitez de ce mentorat pour sécuriser vos dossiers.
              </p>
          </div>
      </div>
    </div>
  );
}
