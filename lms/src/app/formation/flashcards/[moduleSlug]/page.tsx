import Link from "next/link";
import { notFound } from "next/navigation";
import { COURSE } from "@/data/course";
import { getFlashcardsForModule } from "@/data/flashcards";
import { getAvatarForModule } from "@/data/module-avatars";
import { FlashcardSM2 } from "@/components/flashcards/FlashcardSM2";

type Props = { params: Promise<{ moduleSlug: string }> };

export const dynamic = "force-dynamic";

export default async function FlashcardsPage({ params }: Props) {
  const { moduleSlug } = await params;
  const mod = COURSE.find((m) => m.slug === moduleSlug);
  if (!mod) notFound();

  const cards = getFlashcardsForModule(moduleSlug);
  const avatar = getAvatarForModule(moduleSlug);

  return (
    <div>
      <div className="mb-6 text-sm text-zinc-500">
        <Link href="/formation" className="hover:text-brand-navy">
          Parcours
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/formation/${mod.slug}`} className="hover:text-brand-navy">
          {mod.title.replace(/^Module \d+ — /, "")}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-brand-navy font-medium">Flashcards</span>
      </div>

      {/* Header with avatar */}
      <div className="mb-6 flex items-center gap-4">
        {avatar && (
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white"
            style={{ backgroundColor: avatar.accentColor }}
          >
            {avatar.initials}
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-brand-navy">
            Flashcards — {mod.title.replace(/^Module \d+ — /, "")}
          </h1>
          <p className="text-sm text-zinc-600">
            {cards.length} cartes de revision{avatar ? ` avec ${avatar.name}` : ""}
          </p>
        </div>
      </div>

      {cards.length > 0 ? (
        <div className="space-y-6">
          {/* Mode selector */}
          <div className="flex items-center gap-4 rounded-xl border border-zinc-200 bg-white p-4">
            <span className="text-sm font-medium text-zinc-600">Mode d&apos;apprentissage :</span>
            <div className="flex gap-2">
              <Link
                href={`?mode=classic`}
                className="rounded-lg bg-brand-navy px-4 py-2 text-sm font-medium text-white"
              >
                Classique
              </Link>
              <Link
                href={`?mode=sm2`}
                className="rounded-lg border border-brand-gold px-4 py-2 text-sm font-medium text-brand-gold hover:bg-brand-gold/10"
              >
                Répétition espacée (SM-2)
              </Link>
            </div>
          </div>
          
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
      ) : (
        <div className="rounded-xl border border-zinc-200 bg-white p-8 text-center">
          <p className="text-zinc-500">Aucune flashcard disponible pour ce module.</p>
        </div>
      )}

      <div className="mt-8">
        <Link
          href={`/formation/${mod.slug}`}
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
        >
          Retour au module
        </Link>
      </div>
    </div>
  );
}
