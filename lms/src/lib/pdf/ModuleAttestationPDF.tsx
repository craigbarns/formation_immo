import * as fs from "fs";
import * as path from "path";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
} from "@react-pdf/renderer";
import { FORMATION, ORGANIZATION, REPRESENTATIVE } from "./formation-data";

// Attestation de SUIVI pour UN module acheté à l'unité (pas de score —
// la certification finale avec examen reste gérée par AttestationPDF).

function loadAsset(filename: string): string {
  try {
    const filePath = path.join(process.cwd(), "public", filename);
    const buf = fs.readFileSync(filePath);
    const ext = filename.split(".").pop() ?? "png";
    const mime = ext === "jpg" || ext === "jpeg" ? "image/jpeg" : "image/png";
    return `data:${mime};base64,${buf.toString("base64")}`;
  } catch {
    return "";
  }
}
const LOGO_SRC = loadAsset("logo-pass-formation.png");
const TAMPON_SRC = loadAsset("tampon-pass-formation.jpg");

const DARK = "#1a1a1a";
const GRAY = "#555555";
const LGRAY = "#f0f0f0";

const s = StyleSheet.create({
  page: { paddingTop: 26, paddingBottom: 44, paddingHorizontal: 46, fontFamily: "Helvetica", fontSize: 10.5, color: DARK, backgroundColor: "#fff" },
  logoWrap: { alignItems: "center", marginBottom: 18 },
  logo: { width: 115, height: 50 },
  titleH1: { fontSize: 21, fontWeight: "bold", textAlign: "center", marginBottom: 4 },
  subtitle: { fontSize: 11, fontStyle: "italic", textAlign: "center", color: GRAY, marginBottom: 14 },
  topLine: { borderBottomWidth: 0.5, borderBottomColor: "#aaa", marginBottom: 14 },
  bodyTxt: { fontSize: 10.5, lineHeight: 1.9, marginBottom: 6 },
  bold: { fontWeight: "bold" },
  moduleBox: { backgroundColor: LGRAY, padding: "10 14", marginVertical: 12 },
  moduleTitle: { fontSize: 12, fontWeight: "bold", textAlign: "center", marginBottom: 4 },
  moduleMeta: { fontSize: 9.5, textAlign: "center", color: GRAY },
  infoRow: { flexDirection: "row", marginBottom: 3 },
  infoLbl: { fontSize: 10, width: 170 },
  infoVal: { fontSize: 10, flex: 1, fontWeight: "bold" },
  certBox: { marginTop: 14, padding: "8 12", borderWidth: 0.5, borderColor: "#bbb" },
  certTxt: { fontSize: 9, color: GRAY },
  sigArea: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginTop: 22 },
  cachet: { width: 154, height: 110 },
  sigRight: { width: 165, alignItems: "center" },
  sigDate: { fontSize: 9.5, marginBottom: 26 },
  sigLine: { borderBottomWidth: 0.5, borderBottomColor: "#999", width: 140, marginBottom: 4 },
  sigName: { fontSize: 9, fontWeight: "bold", textAlign: "center" },
  sigRole: { fontSize: 7.5, fontStyle: "italic", textAlign: "center", color: GRAY },
  footer: { position: "absolute", bottom: 16, left: 46, right: 46 },
  footerLine: { borderTopWidth: 0.5, borderTopColor: "#ccc", marginBottom: 3 },
  footerTxt: { fontSize: 6.5, color: GRAY, textAlign: "center", lineHeight: 1.5, fontStyle: "italic" },
});

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
}
function fmtLong(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

export interface ModuleAttestationData {
  learner: {
    firstName: string;
    lastName: string;
    gender: "M" | "F" | null;
    status: string;
  };
  module: {
    slug: string;
    title: string;
    durationHours: number;
  };
  period: { startDate: string; endDate: string };
  certificate: { certNumber: string; generatedAt: string };
}

export function ModuleAttestationPDF({ data }: { data: ModuleAttestationData }) {
  const { learner, module: mod, period, certificate } = data;
  const civility = learner.gender === "F" ? "Madame" : "Monsieur";

  return (
    <Document
      title={`Attestation de suivi — ${mod.title}`}
      author={ORGANIZATION.name}
      subject={FORMATION.title}
    >
      <Page size="A4" style={s.page}>
        <View style={s.logoWrap}>
          {LOGO_SRC ? <Image src={LOGO_SRC} style={s.logo} /> : null}
        </View>
        <Text style={s.titleH1}>Attestation de suivi de formation</Text>
        <Text style={s.subtitle}>Module suivi à l&apos;unité — {FORMATION.title}</Text>
        <View style={s.topLine} />

        <Text style={s.bodyTxt}>
          Je soussigné, <Text style={s.bold}>{REPRESENTATIVE.name}</Text>, représentant de
          l&apos;organisme de formation <Text style={s.bold}>{ORGANIZATION.name}</Text>
          {" "}(n° de déclaration d&apos;activité {ORGANIZATION.activityDeclarationNumber}),
          atteste que :
        </Text>

        <Text style={s.bodyTxt}>
          <Text style={s.bold}>{civility} {learner.firstName} {learner.lastName}</Text>
          {" "}({learner.status}) a suivi l&apos;intégralité du module de formation suivant :
        </Text>

        <View style={s.moduleBox}>
          <Text style={s.moduleTitle}>{mod.title}</Text>
          <Text style={s.moduleMeta}>
            Durée : {mod.durationHours} heures — {FORMATION.modality}
          </Text>
        </View>

        <View style={s.infoRow}>
          <Text style={s.infoLbl}>Période de réalisation :</Text>
          <Text style={s.infoVal}>du {fmt(period.startDate)} au {fmt(period.endDate)}</Text>
        </View>
        <View style={s.infoRow}>
          <Text style={s.infoLbl}>Modalité :</Text>
          <Text style={s.infoVal}>{FORMATION.modality}</Text>
        </View>
        <View style={s.infoRow}>
          <Text style={s.infoLbl}>Lieu :</Text>
          <Text style={s.infoVal}>{FORMATION.location}</Text>
        </View>

        <View style={s.certBox}>
          <Text style={s.certTxt}>
            Attestation n° {certificate.certNumber} — délivrée le {fmtLong(certificate.generatedAt)}.
            Cette attestation de suivi est délivrée pour valoir ce que de droit. Elle ne constitue
            pas la certification finale de la formation complète.
          </Text>
        </View>

        <View style={s.sigArea}>
          {TAMPON_SRC ? <Image src={TAMPON_SRC} style={s.cachet} /> : <View />}
          <View style={s.sigRight}>
            <Text style={s.sigDate}>Fait le {fmt(certificate.generatedAt)}</Text>
            <View style={s.sigLine} />
            <Text style={s.sigName}>{REPRESENTATIVE.name}</Text>
            <Text style={s.sigRole}>Représentant de l&apos;organisme</Text>
          </View>
        </View>

        <View style={s.footer}>
          <View style={s.footerLine} />
          <Text style={s.footerTxt}>
            {ORGANIZATION.name}  |  {ORGANIZATION.address}  |  Numéro SIRET: {ORGANIZATION.siret}  |  Numéro de déclaration d&apos;activité: {ORGANIZATION.activityDeclarationNumber} (auprès du préfet de région de: {ORGANIZATION.prefectureRegion}){"\n"}e-mail: {ORGANIZATION.email}   tel: {ORGANIZATION.phone}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
