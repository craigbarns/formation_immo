import { MODULE_AVATARS } from "@/data/module-avatars";
import { CHARACTERS } from "@/components/avatars/AvatarIllustration";
import { AvatarIllustration } from "@/components/avatars/AvatarIllustration";
import type { ModuleSlug } from "@/components/avatars/AvatarIllustration";
import Link from "next/link";

export default function FormateursPage() {
  return (
    <div className="space-y-10">
      <header className="text-center space-y-3">
        <p className="text-xs font-bold uppercase tracking-widest text-brand-gold">Votre équipe pédagogique</p>
        <h1 className="text-3xl font-bold tracking-tight text-brand-navy md:text-4xl">
          5 experts, 5 modules
        </h1>
        <p className="mx-auto max-w-2xl text-base text-zinc-600">
          Chaque module est animé par un professionnel de terrain. Leur expertise combinée couvre l&apos;ensemble du métier d&apos;agent immobilier.
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {MODULE_AVATARS.map((avatar) => {
          const char = CHARACTERS[avatar.moduleSlug as ModuleSlug];
          if (!char) return null;
          return (
            <Link
              key={avatar.moduleSlug}
              href={`/formation/${avatar.moduleSlug}`}
              className="group card-elevated card-elevated-hover relative flex flex-col items-center overflow-hidden rounded-2xl p-6 text-center transition"
            >
              {/* Color bar */}
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                style={{ background: `linear-gradient(90deg, ${char.accentColor}, ${char.accentColor}88)` }}
              />

              <AvatarIllustration
                moduleSlug={avatar.moduleSlug as ModuleSlug}
                size="lg"
                showName={false}
                animated
                expression="neutral"
              />

              <div className="mt-4 space-y-1">
                <p className="font-bold text-brand-navy">{char.name}</p>
                <p
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white inline-block"
                  style={{ backgroundColor: char.accentColor }}
                >
                  {char.role}
                </p>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-zinc-500">{avatar.description}</p>
              <div
                className="mt-4 rounded-xl px-4 py-2 text-xs font-bold text-white transition group-hover:opacity-90"
                style={{ backgroundColor: char.accentColor }}
              >
                Voir le module &rarr;
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
