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

// Load logo once at module init (server-side only)
function loadLogo(): string {
  try {
    const filePath = path.join(process.cwd(), "public", "logo-pass-formation.png");
    const buf = fs.readFileSync(filePath);
    return `data:image/png;base64,${buf.toString("base64")}`;
  } catch {
    return "";
  }
}
const LOGO_SRC = loadLogo();

const DARK = "#1a1a1a";
const NAVY = "#1e3a6e";
const GRAY = "#555555";
const LGRAY = "#f0f0f0";
const BGRAY = "#e0e0e0";

const s = StyleSheet.create({
  page:       { paddingTop: 20, paddingBottom: 38, paddingHorizontal: 40, fontFamily: "Helvetica", fontSize: 10, color: DARK, backgroundColor: "#fff" },
  logoWrap:   { alignItems: "center", marginBottom: 4 },
  logo:       { width: 115, height: 50 },
  titleH1:    { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 12, marginTop: 4 },
  topLine:    { borderBottomWidth: 0.5, borderBottomColor: "#aaa", marginBottom: 10 },
  bodyTxt:    { fontSize: 10, lineHeight: 1.8, marginBottom: 3 },
  bold:       { fontWeight: "bold" },
  italic:     { fontStyle: "italic" },
  ftBox:      { backgroundColor: LGRAY, padding: "6 10", marginBottom: 10, marginTop: 6 },
  ftTxt:      { fontSize: 10.5, fontWeight: "bold", textAlign: "center" },
  table:      { marginBottom: 10, borderWidth: 0.5, borderColor: "#bbb" },
  tHead:      { flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: "#bbb" },
  tHCell:     { fontSize: 9, fontWeight: "bold", padding: "4 5" },
  tRow:       { flexDirection: "row", borderBottomWidth: 0.5, borderBottomColor: BGRAY },
  tCell:      { fontSize: 9, padding: "3 5" },
  cMod:       { flex: 3.5 },
  cMod2:      { flex: 1.2 },
  cDur:       { flex: 0.8 },
  cDates:     { flex: 1.8 },
  infoRow:    { flexDirection: "row", marginBottom: 2 },
  infoLbl:    { fontSize: 9.5, width: 148 },
  infoVal:    { fontSize: 9.5, flex: 1 },
  objTitle:   { fontSize: 11, fontWeight: "bold", textDecoration: "underline", marginBottom: 8, marginTop: 4 },
  validTxt:   { fontSize: 10, lineHeight: 1.7, fontWeight: "bold", marginBottom: 5 },
  alurTxt:    { fontSize: 10, fontWeight: "bold", marginBottom: 10 },
  sigArea:    { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginTop: 8 },
  cachet:     { width: 128, borderWidth: 1, borderColor: NAVY, padding: "5 7", alignItems: "center" },
  cachetBold: { fontSize: 7.5, fontWeight: "bold", color: NAVY, textAlign: "center", marginBottom: 2 },
  cachetTxt:  { fontSize: 6.5, color: NAVY, textAlign: "center", lineHeight: 1.55 },
  sigRight:   { width: 155, alignItems: "center" },
  sigSpacer:  { height: 30 },
  sigLine:    { borderBottomWidth: 0.5, borderBottomColor: "#999", width: 130, marginBottom: 4 },
  sigName:    { fontSize: 9, fontWeight: "bold", textAlign: "center" },
  sigRole:    { fontSize: 7.5, fontStyle: "italic", textAlign: "center", color: GRAY },
  footer:     { position: "absolute", bottom: 14, left: 40, right: 40 },
  footerLine: { borderTopWidth: 0.5, borderTopColor: "#ccc", marginBottom: 3 },
  footerTxt:  { fontSize: 6.5, color: GRAY, textAlign: "center", lineHeight: 1.5, fontStyle: "italic" },
  pageNum:    { fontSize: 7.5, color: GRAY, textAlign: "right", marginTop: 2 },
  annexeH2:   { fontSize: 14, fontWeight: "bold", textAlign: "center", marginBottom: 4, marginTop: 4 },
  annexeSub:  { fontSize: 10, fontStyle: "italic", textAlign: "center", marginBottom: 12 },
  secLbl:     { fontSize: 10, marginBottom: 5 },
  bullet:     { flexDirection: "row", marginBottom: 3, paddingLeft: 6 },
  bulletDot:  { fontSize: 9.5, marginRight: 6 },
  bulletTxt:  { fontSize: 9.5, flex: 1, lineHeight: 1.5 },
  modHeader:  { fontSize: 10, fontWeight: "bold", marginTop: 9, marginBottom: 3, paddingLeft: 4, borderLeftWidth: 2, borderLeftColor: NAVY },
});

function fmt(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "2-digit", month: "2-digit", year: "numeric" });
}
function fmtLong(iso: string) {
  return new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" });
}

function PageHeader() {
  return (
    <View>
      <View style={s.logoWrap}>
        {LOGO_SRC ? <Image src={LOGO_SRC} style={s.logo} /> : null}
      </View>
      <Text style={s.titleH1}>Attestation de formation</Text>
      <View style={s.topLine} />
    </View>
  );
}

function PageFooter({ page, total }: { page: number; total: number }) {
  return (
    <View style={s.footer}>
      <View style={s.footerLine} />
      <Text style={s.footerTxt}>
        {ORGANIZATION.name}  |  {ORGANIZATION.address}  |  Numéro SIRET: {ORGANIZATION.siret}  |  Numéro de déclaration d'activité: {ORGANIZATION.activityDeclarationNumber} (auprès du préfet de région de: {ORGANIZATION.prefectureRegion}){"\n"}e-mail: {ORGANIZATION.email}   tel: {ORGANIZATION.phone}
      </Text>
      <Text style={s.pageNum}>Page {page} / {total}</Text>
    </View>
  );
}

export interface AttestationData {
  learner: {
    firstName: string;
    lastName: string;
    gender: "M" | "F" | null;
    status: string;
  };
  training: {
    startDate: string;
    endDate: string;
    moduleDates: Array<{ slug: string; startDate: string; endDate: string }>;
  };
  quiz: { score: number };
  certificate: { generatedAt: string; certNumber: string };
}

export function AttestationPDF({ data }: { data: AttestationData }) {
  const { learner, training, quiz, certificate } = data;
  const civ = learner.gender === "F" ? "Mme" : "M.";
  const fullName = `${learner.firstName} ${learner.lastName}`;
  const TOTAL = 3;

  return (
    <Document
      title="Attestation de formation – PASS Formation"
      author={ORGANIZATION.name}
      subject={FORMATION.title}
    >
      {/* ═══ PAGE 1 — Attestation principale ═══ */}
      <Page size="A4" style={s.page}>
        <PageHeader />

        <Text style={s.bodyTxt}>
          Je, soussigné{" "}
          <Text style={s.bold}>{REPRESENTATIVE.name}</Text>
          {", représentant de l'organisme de formation "}
          <Text style={s.bold}>{ORGANIZATION.name}</Text>,
        </Text>
        <Text style={[s.bodyTxt, { marginBottom: 6 }]}>
          {"Atteste que : "}
          <Text style={s.bold}>{civ}{"  "}{fullName}, {learner.status}.</Text>
        </Text>
        <Text style={s.bodyTxt}>A bien suivi la formation suivante :</Text>

        <View style={s.ftBox}>
          <Text style={s.ftTxt}>{FORMATION.title}</Text>
        </View>

        {/* Table */}
        <View style={s.table}>
          <View style={s.tHead}>
            <Text style={[s.tHCell, s.cMod]}>Module</Text>
            <Text style={[s.tHCell, s.cMod2]}>Modalité</Text>
            <Text style={[s.tHCell, s.cDur]}>Durée</Text>
            <Text style={[s.tHCell, s.cDates]}>Dates</Text>
          </View>
          {FORMATION.modules.map((mod, idx) => {
            const md = training.moduleDates.find(d => d.slug === mod.slug);
            const dateStr = md
              ? `${fmt(md.startDate)} – ${fmt(md.endDate)}`
              : fmt(training.startDate);
            return (
              <View key={mod.slug} style={s.tRow}>
                <Text style={[s.tCell, s.cMod]}>{mod.title}</Text>
                <Text style={[s.tCell, s.cMod2]}>{mod.modality}</Text>
                <Text style={[s.tCell, s.cDur]}>{mod.durationHours}h</Text>
                <Text style={[s.tCell, s.cDates]}>{dateStr}</Text>
              </View>
            );
          })}
        </View>

        {/* Infos */}
        <View style={{ marginBottom: 8 }}>
          <View style={s.infoRow}>
            <Text style={s.infoLbl}>modalité pédagogique :</Text>
            <Text style={[s.infoVal, s.bold]}>cf. tableau_liste des modules</Text>
          </View>
          <Text style={[s.bodyTxt, { marginBottom: 2 }]}>Lieu de la formation :</Text>
          <Text style={[s.bodyTxt, { paddingLeft: 8, marginBottom: 5 }]}>Formation à distance</Text>
          <View style={s.infoRow}>
            <Text style={s.infoLbl}>Dates de la formation :</Text>
            <Text style={[s.infoVal, s.bold]}>du {fmtLong(training.startDate)} au {fmtLong(training.endDate)}</Text>
          </View>
          <View style={s.infoRow}>
            <Text style={s.infoLbl}>Durée de la formation :</Text>
            <Text style={[s.infoVal, s.bold]}>{FORMATION.durationHours} heures ({FORMATION.durationDays} jours)</Text>
          </View>
          <View style={s.infoRow}>
            <Text style={s.infoLbl}>Nature de l'action de formation :</Text>
            <Text style={[s.infoVal, s.bold]}>Action de formation</Text>
          </View>
        </View>

        <Text style={s.objTitle}>Objectifs de la formation : cf.programme détaillé en annexe</Text>

        <Text style={s.validTxt}>
          Les objectifs pédagogiques ont été atteints et l'apprenant a acquis les connaissances
          conformément au programme de la formation en atteignant un taux de réussite au Quizz final
          {" superieur à 80%."}{"\n"}
          {"(Score obtenu : "}<Text style={s.bold}>{quiz.score}%</Text>{")"}
        </Text>
        <Text style={s.alurTxt}>La formation est conforme à la loi ALUR.</Text>
        <Text style={[s.bodyTxt, { marginBottom: 14 }]}>
          {"Fait à TOULOUSE, le "}<Text style={s.bold}>{fmtLong(certificate.generatedAt)}</Text>
        </Text>

        {/* Signature row: cachet + signature */}
        <View style={s.sigArea}>
          <View style={s.cachet}>
            <Text style={s.cachetBold}>PASS FORMATION</Text>
            <Text style={s.cachetTxt}>6 Rue Maurice Caunes</Text>
            <Text style={s.cachetTxt}>31200 Toulouse</Text>
            <Text style={s.cachetTxt}>RCS Toulouse 517 603 783</Text>
            <Text style={s.cachetTxt}>Tél : {ORGANIZATION.phone}</Text>
            <Text style={s.cachetTxt}>N° Déc/activité : {ORGANIZATION.activityDeclarationNumber}</Text>
          </View>
          <View style={s.sigRight}>
            <View style={s.sigSpacer} />
            <View style={s.sigLine} />
            <Text style={s.sigName}>{REPRESENTATIVE.name}</Text>
            <Text style={s.sigRole}>Représentant – {ORGANIZATION.name}</Text>
          </View>
        </View>

        <PageFooter page={1} total={TOTAL} />
      </Page>

      {/* ═══ PAGE 2 — Annexe (modules 1–3) ═══ */}
      <Page size="A4" style={s.page}>
        <PageHeader />
        <Text style={s.annexeH2}>Annexe_Programme détaillé</Text>
        <Text style={s.annexeSub}>
          {"intitulé: "}<Text style={s.bold}>{FORMATION.title}</Text>
        </Text>

        <Text style={s.secLbl}>Objectifs de la formation:</Text>
        {FORMATION.objectives.map((obj, i) => (
          <View key={`obj-${i}`} style={s.bullet}>
            <Text style={s.bulletDot}>•</Text>
            <Text style={[s.bulletTxt, s.bold]}>{obj}</Text>
          </View>
        ))}

        <Text style={[s.secLbl, { marginTop: 10 }]}>Contenu</Text>
        {FORMATION.programItems.slice(0, 3).map((prog, i) => (
          <View key={`prog-${i}`}>
            <Text style={s.modHeader}>{prog.moduleTitle}{"  "}{`(${FORMATION.modules[i]?.durationHours ?? ""}h)`}</Text>
            {prog.items.map((item, j) => (
              <View key={`item-${i}-${j}`} style={s.bullet}>
                <Text style={s.bulletDot}>•</Text>
                <Text style={s.bulletTxt}>{item}</Text>
              </View>
            ))}
          </View>
        ))}

        <PageFooter page={2} total={TOTAL} />
      </Page>

      {/* ═══ PAGE 3 — Annexe suite (modules 4–6) ═══ */}
      <Page size="A4" style={s.page}>
        <PageHeader />

        {FORMATION.programItems.slice(3).map((prog, i) => (
          <View key={`prog2-${i}`}>
            <Text style={s.modHeader}>{prog.moduleTitle}{"  "}{`(${FORMATION.modules[i + 3]?.durationHours ?? ""}h)`}</Text>
            {prog.items.map((item, j) => (
              <View key={`item2-${i}-${j}`} style={s.bullet}>
                <Text style={s.bulletDot}>•</Text>
                <Text style={s.bulletTxt}>{item}</Text>
              </View>
            ))}
          </View>
        ))}

        <PageFooter page={3} total={TOTAL} />
      </Page>
    </Document>
  );
}
