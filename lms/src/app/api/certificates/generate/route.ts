import { NextResponse } from "next/server";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { renderToBuffer } from "@react-pdf/renderer";
import { createElement } from "react";
import { AttestationPDF, type AttestationData } from "@/lib/pdf/AttestationPDF";
import {
  ModuleAttestationPDF,
  type ModuleAttestationData,
} from "@/lib/pdf/ModuleAttestationPDF";
import { FORMATION } from "@/lib/pdf/formation-data";
import { fetchActiveEntitlementRows } from "@/lib/auth-access";
import { getEntitlements } from "@/lib/entitlements";
import { getModuleCompletion } from "@/lib/module-completion";

export async function POST(request: Request) {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }
    const token = authHeader.slice(7);

    const supabaseClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token);
    if (authError || !user) {
      return NextResponse.json({ error: "Token invalide" }, { status: 401 });
    }
    const userId = user.id;

    // 1. Get user profile
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("full_name, gender, learner_status")
      .eq("id", userId)
      .single();

    const fullName = profile?.full_name ?? "Apprenant";
    const nameParts = fullName.trim().split(" ");
    const firstName = nameParts[0] ?? "";
    const lastName = nameParts.slice(1).join(" ") || nameParts[0];
    const gender = (profile?.gender as "M" | "F") ?? null;
    const status = profile?.learner_status ?? "Agent Immobilier";

    // ── Scope MODULE : attestation de suivi d'un module (spec §5.8) ──
    // Sans body { moduleSlug } : flux certification finale inchangé ci-dessous.
    const body = await request.json().catch(() => ({}) as Record<string, unknown>);
    const moduleSlug =
      typeof (body as { moduleSlug?: unknown }).moduleSlug === "string"
        ? ((body as { moduleSlug: string }).moduleSlug)
        : null;

    if (moduleSlug) {
      return generateModuleAttestation({
        supabaseAdmin,
        userId,
        email: user.email ?? null,
        learner: { firstName, lastName, gender, status },
        moduleSlug,
      });
    }

    // 2. Get subscription (start date)
    const { data: subscription } = await supabaseAdmin
      .from("user_subscriptions")
      .select("created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: true })
      .limit(1)
      .single();

    // 3. Get final exam result (moduleSlug = "certification-finale")
    const { data: examResult } = await supabaseAdmin
      .from("exam_results")
      .select("score, created_at")
      .eq("user_id", userId)
      .eq("module_slug", "certification-finale")
      .eq("passed", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (!examResult) {
      return NextResponse.json(
        { error: "La certification finale n'a pas encore été validée (score ≥ 70% requis)." },
        { status: 403 }
      );
    }

    const finalScore = examResult.score;

    // 4. Get or create certificate record
    let { data: certificate } = await supabaseAdmin
      .from("certificates")
      .select("*")
      .eq("user_id", userId)
      .eq("passed", true)
      .order("issued_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    if (!certificate) {
      const year = new Date().getFullYear();
      const rand = Math.floor(10000 + Math.random() * 90000);
      const certNumber = `ATC-${year}-${rand}`;

      const { data: created, error: createErr } = await supabaseAdmin
        .from("certificates")
        .insert({
          user_id: userId,
          cert_number: certNumber,
          student_name: fullName,
          modules: FORMATION.modules.map(m => m.slug),
          final_score: finalScore,
          passed: true,
          issued_at: examResult.created_at,
          qr_payload: JSON.stringify({ certNumber, userId, issuedAt: examResult.created_at }),
        })
        .select()
        .single();

      if (createErr || !created) {
        return NextResponse.json({ error: "Impossible de créer le certificat." }, { status: 500 });
      }
      certificate = created;
    }

    // 5. Compute dates
    const startDate = subscription?.created_at ?? certificate.issued_at;
    const endDate = certificate.issued_at;
    const generatedAt = new Date().toISOString();

    // Spread module dates over the training period
    const start = new Date(startDate);
    const end = new Date(endDate);
    const totalMs = end.getTime() - start.getTime();
    const moduleDates = FORMATION.modules.map((mod, idx) => {
      const offsetStart = Math.floor((totalMs * idx) / FORMATION.modules.length);
      const offsetEnd = Math.floor((totalMs * (idx + 1)) / FORMATION.modules.length);
      return {
        slug: mod.slug,
        startDate: new Date(start.getTime() + offsetStart).toISOString(),
        endDate: new Date(start.getTime() + offsetEnd).toISOString(),
      };
    });

    // 6. Build attestation data
    const attestationData: AttestationData = {
      learner: { firstName, lastName, gender, status },
      training: { startDate, endDate, moduleDates },
      quiz: { score: finalScore },
      certificate: { generatedAt, certNumber: certificate.cert_number },
    };

    // 7. Generate PDF buffer
    const pdfBuffer = await renderToBuffer(
      // @ts-expect-error – @react-pdf/renderer types don't align with React 19 element types
      createElement(AttestationPDF, { data: attestationData })
    );

    // 8. Upload to Supabase Storage
    const bucket = "attestations";
    const filePath = `${certificate.cert_number}.pdf`;

    // Create bucket if needed (will fail silently if exists)
    await supabaseAdmin.storage.createBucket(bucket, {
      public: true,
      allowedMimeTypes: ["application/pdf"],
    }).catch(() => {});

    const { error: uploadError } = await supabaseAdmin.storage
      .from(bucket)
      .upload(filePath, pdfBuffer, {
        contentType: "application/pdf",
        upsert: true,
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      // Return PDF directly if storage fails
      return new Response(new Uint8Array(pdfBuffer), {
        headers: {
          "Content-Type": "application/pdf",
          "Content-Disposition": `attachment; filename="attestation-${certificate.cert_number}.pdf"`,
        },
      });
    }

    // 9. Get public URL
    const { data: urlData } = supabaseAdmin.storage
      .from(bucket)
      .getPublicUrl(filePath);
    const pdfUrl = urlData.publicUrl;

    // 10. Update certificate record
    await supabaseAdmin
      .from("certificates")
      .update({ pdf_url: pdfUrl, pdf_path: filePath })
      .eq("id", certificate.id);

    return NextResponse.json({ pdfUrl, certNumber: certificate.cert_number });
  } catch (err) {
    console.error("Certificate generation error:", err);
    return NextResponse.json(
      { error: "Erreur lors de la génération de l'attestation" },
      { status: 500 }
    );
  }
}

/**
 * Attestation de SUIVI pour un module (option A — spec §5.8).
 * Gardes serveur (Règle d'or §4) : module possédé (pack ou unité) ET terminé
 * (toutes les leçons dans lesson_progress). Idempotent par (user, module).
 */
async function generateModuleAttestation(args: {
  supabaseAdmin: SupabaseClient;
  userId: string;
  email: string | null;
  learner: { firstName: string; lastName: string; gender: "M" | "F" | null; status: string };
  moduleSlug: string;
}) {
  const { supabaseAdmin, userId, email, learner, moduleSlug } = args;

  const moduleInfo = FORMATION.modules.find((m) => m.slug === moduleSlug);
  if (!moduleInfo) {
    return NextResponse.json({ error: "Module inconnu." }, { status: 404 });
  }
  if (!email) {
    return NextResponse.json({ error: "Email du compte introuvable." }, { status: 403 });
  }

  // Garde 1 : module possédé (pack ou à l'unité)
  const rows = await fetchActiveEntitlementRows({ email, userId });
  const owned = getEntitlements(rows);
  if (!(owned.hasPack || owned.modules.has(moduleSlug))) {
    return NextResponse.json({ error: "Module non possédé." }, { status: 403 });
  }

  // Garde 2 : module terminé (toutes les leçons complétées)
  const completion = await getModuleCompletion(userId, moduleSlug);
  if (!completion.completed) {
    return NextResponse.json(
      { error: "Terminez toutes les leçons du module pour obtenir votre attestation." },
      { status: 403 }
    );
  }

  // Période : début = octroi du droit (module ou pack), fin = dernière leçon complétée
  const { data: entitlementRow } = await supabaseAdmin
    .from("user_subscriptions")
    .select("created_at")
    .eq("formation_id", "immobilier")
    .or(`email.eq.${email.toLowerCase()},user_id.eq.${userId}`)
    .or(`module_slug.eq.${moduleSlug},module_slug.is.null`)
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  const endDate = completion.completedAt ?? new Date().toISOString();
  const startDate = (entitlementRow?.created_at as string | undefined) ?? endDate;

  // Certificat idempotent : un seul par (user, module)
  const { data: existingCerts } = await supabaseAdmin
    .from("certificates")
    .select("*")
    .eq("user_id", userId)
    .eq("passed", true);

  let certificate =
    (existingCerts ?? []).find((c) => {
      const mods = Array.isArray(c.modules) ? (c.modules as string[]) : [];
      return mods.length === 1 && mods[0] === moduleSlug;
    }) ?? null;

  if (!certificate) {
    const year = new Date().getFullYear();
    const rand = Math.floor(10000 + Math.random() * 90000);
    const certNumber = `ATM-${year}-${rand}`;

    const { data: created, error: createErr } = await supabaseAdmin
      .from("certificates")
      .insert({
        user_id: userId,
        cert_number: certNumber,
        student_name: `${learner.firstName} ${learner.lastName}`.trim(),
        modules: [moduleSlug],
        // Attestation de suivi : pas d'examen — le PDF module n'affiche pas de score,
        // mais certificates.final_score est NOT NULL.
        final_score: 100,
        passed: true,
        issued_at: endDate,
        qr_payload: JSON.stringify({ certNumber, userId, moduleSlug, issuedAt: endDate }),
      })
      .select()
      .single();

    if (createErr || !created) {
      return NextResponse.json({ error: "Impossible de créer l'attestation." }, { status: 500 });
    }
    certificate = created;
  }

  const generatedAt = new Date().toISOString();
  const attestationData: ModuleAttestationData = {
    learner,
    module: {
      slug: moduleSlug,
      title: moduleInfo.title,
      durationHours: moduleInfo.durationHours,
    },
    period: { startDate, endDate },
    certificate: { certNumber: certificate.cert_number, generatedAt },
  };

  const pdfBuffer = await renderToBuffer(
    // @ts-expect-error – @react-pdf/renderer types don't align with React 19 element types
    createElement(ModuleAttestationPDF, { data: attestationData })
  );

  const bucket = "attestations";
  const filePath = `${certificate.cert_number}.pdf`;

  await supabaseAdmin.storage
    .createBucket(bucket, { public: true, allowedMimeTypes: ["application/pdf"] })
    .catch(() => {});

  const { error: uploadError } = await supabaseAdmin.storage
    .from(bucket)
    .upload(filePath, pdfBuffer, { contentType: "application/pdf", upsert: true });

  if (uploadError) {
    console.error("Storage upload error:", uploadError);
    return new Response(new Uint8Array(pdfBuffer), {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="attestation-${certificate.cert_number}.pdf"`,
      },
    });
  }

  const { data: urlData } = supabaseAdmin.storage.from(bucket).getPublicUrl(filePath);
  await supabaseAdmin
    .from("certificates")
    .update({ pdf_url: urlData.publicUrl, pdf_path: filePath })
    .eq("id", certificate.id);

  return NextResponse.json({ pdfUrl: urlData.publicUrl, certNumber: certificate.cert_number });
}
