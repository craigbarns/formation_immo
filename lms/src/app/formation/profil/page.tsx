import Link from "next/link";
import { ProfileContent } from "./ProfileContent";

export default function ProfilPage() {
  return (
    <div>
      <Link href="/formation" className="text-sm text-zinc-500 hover:text-[#1a3a5c]">
        ← Retour au parcours
      </Link>

      <h1 className="mt-4 text-2xl font-bold text-[#1a3a5c]">Mon profil</h1>
      <p className="mt-2 text-zinc-600">
        Suivez votre progression, vos badges et generez votre certificat.
      </p>

      <ProfileContent />
    </div>
  );
}
