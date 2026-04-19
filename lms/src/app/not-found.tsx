import Link from "next/link";
import { Home, Search } from "lucide-react";

export const metadata = {
  title: "Page non trouvée",
  description: "La page que vous recherchez n'existe pas ou a été déplacée.",
};

export default function NotFoundPage() {
  return (
    <div className="formation-canvas flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
      <div className="mx-auto max-w-md space-y-6">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-brand-navy/5">
          <Search className="h-10 w-10 text-brand-navy/30" />
        </div>
        <h1 className="text-4xl font-black text-brand-navy">404</h1>
        <p className="text-lg text-zinc-600">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/formation"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-navy-soft"
          >
            <Home className="h-4 w-4" />
            Retour au parcours
          </Link>
        </div>
      </div>
    </div>
  );
}
