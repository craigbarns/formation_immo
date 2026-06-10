import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { verifyModuleAccess } from "@/lib/access";
import { getModuleExam } from "@/data/exam-questions";
import { ExamMode } from "@/components/exam/ExamMode";

type Props = { params: Promise<{ moduleSlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { moduleSlug } = await params;
  const exam = getModuleExam(moduleSlug);
  return {
    title: exam ? `Examen — ${exam.title}` : "Examen",
    description: exam ? `Examen blanc du module ${exam.title}` : "Examen blanc de formation",
  };
}

export default async function ExamPage({ params }: Props) {
  const { moduleSlug } = await params;
  const exam = getModuleExam(moduleSlug);
  if (!exam) notFound();

  // Garde serveur (spec §4) : module possédé (pack ou unité) sinon page module verrouillée.
  const access = await verifyModuleAccess(moduleSlug);
  if (!access.hasAccess) redirect(`/formation/${moduleSlug}`);

  return (
    <div>
      <Link href="/formation" className="text-sm text-zinc-500 hover:text-brand-navy">
        ← Retour au parcours
      </Link>

      <div className="mt-6">
        <ExamMode exam={exam} />
      </div>
    </div>
  );
}
