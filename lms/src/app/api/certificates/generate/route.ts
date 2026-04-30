import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { renderToBuffer } from "@react-pdf/renderer";
import { createElement } from "react";
import { AttestationPDF, type AttestationData } from "@/lib/pdf/AttestationPDF";
import { FORMATION } from "@/lib/pdf/formation-data";

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

    // 2. Get subscription (start date)
    const { data: subscription } = await supabaseAdmin
      .from("user_subscriptions")
      .select("created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: true })
      .limit(1)
      .single();

    // 3. Get existing certificate or check eligibility
    const { data: certificate } = await supabaseAdmin
      .from("certificates")
      .select("*")
      .eq("user_id", userId)
      .eq("passed", true)
      .order("issued_at", { ascending: false })
      .limit(1)
      .single();

    if (!certificate) {
      return NextResponse.json(
        { error: "Aucun certificat validé trouvé. La formation doit être complétée avec un score ≥ 80%." },
        { status: 403 }
      );
    }

    // 4. Get final exam score
    const { data: examResult } = await supabaseAdmin
      .from("exam_results")
      .select("score")
      .eq("user_id", userId)
      .eq("module_slug", "certification")
      .eq("passed", true)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    const finalScore = examResult?.score ?? certificate.final_score ?? 80;

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
      // @ts-ignore – @react-pdf/renderer types don't align with React 19 element types
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
