import Link from "next/link";
import { notFound } from "next/navigation";
import { COURSE } from "@/data/course";
import { getFlashcardsForModule } from "@/data/flashcards";
import { getAvatarForModule } from "@/data/module-avatars";
import { FlashcardSM2 } from "@/components/flashcards/FlashcardSM2";
import { ArrowLeft, Brain, Sparkles } from "lucide-react";

type Props = { params: Promise<{ moduleSlug: string }> };

export const dynamic = "force-dynamic";

export default async function FlashcardsPage({ params }: Props) {
  const { moduleSlug } = await params;
  const mod = COURSE.find((m) => m.slug === moduleSlug);
  if (!mod) notFound();

  const cards = getFlashcardsForModule(moduleSlug);
  const avatar = getAvatarForModule(moduleSlug);

  return (
    <div className="space-y-8">
      <Link
        href={`/formation/${mod.slug}`}
        className="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 dark:text-white/40 transition-colors hover:text-brand-gold"
      >
        <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Retour au module
      </Link>

      {/* Header with avatar */}
      <header className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#070d18] px-8 py-10 shadow-2xl">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(212,175,55,0.1),transparent_70%)] pointer-events-none" />
        <div className="relative flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
          {avatar && (
            <div
              className="relative h-24 w-24 overflow-hidden rounded-full shadow-2xl ring-4 ring-white/5 transition-transform duration-700 hover:scale-110"
              style={{ padding: "4px", background: `linear-gradient(135deg, ${avatar.accentColor}, #d4af37)` }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-full bg-[#030712]">
                <div className="flex h-full w-full items-center justify-center text-3xl font-black text-white">
                  {avatar.initials}
                </div>
              </div>
            </div>
          )}
          <div className="flex-1">
             <div className="inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-brand-gold mb-4">
                <Sparkles className="h-4 w-4 animate-pulse" /> RÉVISION ACTIVE
             </div>
             <h1 className="text-3xl font-black tracking-tight text-white md:text-5xl uppercase leading-none">
                Flashcards <span className="text-white/20">·</span> {mod.title.replace(/^Module \d+ — /, "")}
             </h1>
             <p className="mt-4 text-base text-white/40 font-medium italic">
                {cards.length} concepts clés à ancrer dans votre mémoire{avatar ? ` avec l'accompagnement de ${avatar.name}` : ""}.
             </p>
          </div>
        </div>
      </header>

      {cards.length > 0 ? (
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Card Area */}
          <div className="lg:col-span-2 space-y-8">
            <FlashcardSM2 
              flashcards={cards.map((c, i) => ({
                id: `${moduleSlug}-${i}`,
                front: c.question,
                back: c.answer,
                moduleSlug,
              }))} 
              moduleSlug={moduleSlug} 
            />
          </div>

          {/* Sidebar Info */}
          <aside className="space-y-6">
             <div className="rounded-[2rem] border border-white/10 bg-[#070d18] p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                    <Brain className="text-brand-gold w-6 h-6" />
                    <h3 className="text-sm font-black uppercase tracking-widest text-white">Méthode SM-2</h3>
                </div>
                <p className="text-sm leading-relaxed text-white/50 font-medium italic mb-6">
                    Le système de répétition espacée calcule automatiquement le moment idéal pour revoir chaque concept afin d&apos;optimiser votre mémorisation à long terme.
                </p>
                <div className="space-y-4">
                    <div className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-emerald-500" />
                        <span className="text-[10px] font-black text-white/70 uppercase">Facile : +4 jours</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-blue-500" />
                        <span className="text-[10px] font-black text-white/70 uppercase">Bien : +1 jour</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="h-2 w-2 rounded-full bg-red-500" />
                        <span className="text-[10px] font-black text-white/70 uppercase">Encore : &lt; 1 min</span>
                    </div>
                </div>
             </div>
          </aside>
        </div>
      ) : (
        <div className="rounded-[2.5rem] border border-white/10 bg-[#070d18] p-20 text-center shadow-2xl">
          <Brain className="h-16 w-16 text-white/10 mx-auto mb-6" />
          <p className="text-white/40 font-black uppercase tracking-widest">Aucune flashcard disponible pour ce module.</p>
        </div>
      )}
    </div>
  );
}
