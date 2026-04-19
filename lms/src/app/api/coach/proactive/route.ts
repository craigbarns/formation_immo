import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";
import { z } from "zod";

const RequestSchema = z.object({
  currentLessonTimeMs: z.number().optional(),
  moduleSlug: z.string().optional(),
  lessonSlug: z.string().optional(),
});

export interface ProactiveMessage {
  id: string;
  type: "stuck" | "errors" | "absent" | "exam_fail" | "none";
  title: string;
  message: string;
  cta: string;
  priority: number; // higher = more urgent
}

function daysSince(dateStr: string): number {
  const d = new Date(dateStr);
  const now = new Date();
  return Math.floor((now.getTime() - d.getTime()) / (1000 * 60 * 60 * 24));
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.json({ message: null });

  const { allowed } = checkRateLimit(user.id + ":proactive");
  if (!allowed) return NextResponse.json({ message: null });

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: null });
  }

  const parse = RequestSchema.safeParse(body);
  if (!parse.success) return NextResponse.json({ message: null });

  const { currentLessonTimeMs } = parse.data;

  const messages: ProactiveMessage[] = [];

  // ── 1. Stuck on lesson ( > 10 min on same lesson) ──
  if (currentLessonTimeMs && currentLessonTimeMs > 10 * 60 * 1000) {
    messages.push({
      id: "stuck",
      type: "stuck",
      title: "Tu bloques sur cette leçon ?",
      message: "Tu es dessus depuis plus de 10 minutes. Je peux t'expliquer autrement ou te donner un exemple concret.",
      cta: "Demander de l'aide",
      priority: 70,
    });
  }

  // ── 2. Two wrong answers in a row on same module ──
  const { data: recentErrors } = await supabase
    .from("user_answers")
    .select("question_id, module_slug, created_at")
    .eq("user_id", user.id)
    .eq("is_correct", false)
    .order("created_at", { ascending: false })
    .limit(5);

  if (recentErrors && recentErrors.length >= 2) {
    const firstTwo = recentErrors.slice(0, 2);
    const sameModule = firstTwo.every((e) => e.module_slug === firstTwo[0].module_slug);
    // Check if they are within 30 min of each other
    const times = firstTwo.map((e) => new Date(e.created_at).getTime()).sort((a, b) => b - a);
    const within30Min = times[0] - times[times.length - 1] < 30 * 60 * 1000;

    if (sameModule && within30Min) {
      messages.push({
        id: "errors",
        type: "errors",
        title: "2 QCM ratés d'affilée",
        message: `Tu as buté sur ${firstTwo[0].module_slug}. Ce n'est pas grave — je peux te refaire un résumé ciblé ou te proposer des flashcards sur ce point.`,
        cta: "Réviser ce point",
        priority: 85,
      });
    }
  }

  // ── 3. Last exam failed (< 50%) ──
  const { data: lastExam } = await supabase
    .from("exam_results")
    .select("module_slug, score, total, taken_at")
    .eq("user_id", user.id)
    .order("taken_at", { ascending: false })
    .limit(1)
    .single();

  if (lastExam && lastExam.score / lastExam.total < 0.5) {
    const days = daysSince(lastExam.taken_at);
    if (days <= 2) {
      messages.push({
        id: "exam_fail",
        type: "exam_fail",
        title: "Ton dernier examen était difficile",
        message: `Tu as eu ${Math.round((lastExam.score / lastExam.total) * 100)}% sur ${lastExam.module_slug}. Ne lâche rien — on peut reprendre les bases ensemble.`,
        cta: "Revoir les bases",
        priority: 90,
      });
    }
  }

  // ── 4. Absent for 3+ days ──
  const { data: gamification } = await supabase
    .from("gamification_state")
    .select("last_login_date")
    .eq("user_id", user.id)
    .single();

  if (gamification?.last_login_date) {
    const days = daysSince(gamification.last_login_date);
    if (days >= 3) {
      messages.push({
        id: "absent",
        type: "absent",
        title: days >= 7 ? "Ça fait une semaine !" : "Tu nous manques",
        message: days >= 7
          ? "Une semaine sans ouvrir la formation. 10 minutes aujourd'hui suffisent à relancer ta streak."
          : "3 jours sans connexion. Ta streak est en danger — un petit quiz de 5 min pour la sauver ?",
        cta: "Reprendre maintenant",
        priority: days >= 7 ? 95 : 80,
      });
    }
  }

  // Return highest priority message, or none
  if (messages.length === 0) return NextResponse.json({ message: null });

  messages.sort((a, b) => b.priority - a.priority);
  return NextResponse.json({ message: messages[0] });
}
