import Link from "next/link";
import { notFound } from "next/navigation";
import { getModuleExam } from "@/data/exam-questions";
import { ExamMode } from "@/components/exam/ExamMode";

type Props = { params: Promise<{ moduleSlug: string }> };

export default async function ExamPage({ params }: Props) {
  const { moduleSlug } = await params;
  const exam = getModuleExam(moduleSlug);
  if (!exam) notFound();

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
