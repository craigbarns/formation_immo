import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { FORMATION, ORGANIZATION, REPRESENTATIVE } from "./formation-data";

Font.register({
  family: "Helvetica",
  fonts: [
    { src: "Helvetica" },
    { src: "Helvetica-Bold", fontWeight: "bold" },
    { src: "Helvetica-Oblique", fontStyle: "italic" },
  ],
});

const NAVY = "#1a2e5a";
const GOLD = "#b8860b";
const LIGHT_GRAY = "#f5f5f5";
const BORDER_GRAY = "#d0d0d0";
const TEXT_DARK = "#1a1a1a";
const TEXT_GRAY = "#555555";

const styles = StyleSheet.create({
  page: {
    padding: "28mm 20mm 20mm 20mm",
    fontFamily: "Helvetica",
    fontSize: 9,
    color: TEXT_DARK,
    backgroundColor: "#ffffff",
  },
  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    borderBottomWidth: 2,
    borderBottomColor: NAVY,
    paddingBottom: 10,
    marginBottom: 14,
  },
  orgName: {
    fontSize: 14,
    fontWeight: "bold",
    color: NAVY,
    marginBottom: 3,
  },
  orgInfo: {
    fontSize: 8,
    color: TEXT_GRAY,
    lineHeight: 1.5,
  },
  badge: {
    backgroundColor: NAVY,
    color: "#ffffff",
    padding: "4 8",
    fontSize: 7,
    fontWeight: "bold",
    textAlign: "center",
  },
  // Title section
  titleSection: {
    alignItems: "center",
    marginBottom: 18,
    paddingVertical: 10,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: GOLD,
  },
  mainTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: NAVY,
    textTransform: "uppercase",
    letterSpacing: 2,
    marginBottom: 2,
  },
  titleSubline: {
    fontSize: 8,
    color: GOLD,
    fontStyle: "italic",
  },
  // Body text
  bodySection: {
    marginBottom: 14,
    lineHeight: 1.6,
  },
  bodyText: {
    fontSize: 10,
    color: TEXT_DARK,
    lineHeight: 1.7,
  },
  learnerName: {
    fontSize: 12,
    fontWeight: "bold",
    color: NAVY,
  },
  formationTitle: {
    fontSize: 11,
    fontWeight: "bold",
    color: NAVY,
    fontStyle: "italic",
  },
  // Table
  table: {
    marginBottom: 14,
    borderWidth: 1,
    borderColor: BORDER_GRAY,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: NAVY,
  },
  tableHeaderCell: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 8,
    padding: "5 6",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    borderTopWidth: 0.5,
    borderTopColor: BORDER_GRAY,
  },
  tableRowAlt: {
    backgroundColor: LIGHT_GRAY,
  },
  tableCell: {
    fontSize: 8,
    padding: "4 6",
    color: TEXT_DARK,
  },
  tableTotalRow: {
    flexDirection: "row",
    backgroundColor: "#e8edf4",
    borderTopWidth: 1,
    borderTopColor: NAVY,
  },
  tableTotalCell: {
    fontSize: 8,
    fontWeight: "bold",
    padding: "4 6",
    color: NAVY,
  },
  colModule: { flex: 3.5 },
  colModalite: { flex: 1.5 },
  colDuree: { flex: 1 },
  colDates: { flex: 2 },
  // Info section
  infoSection: {
    marginBottom: 14,
    backgroundColor: LIGHT_GRAY,
    padding: "8 10",
    borderLeftWidth: 3,
    borderLeftColor: NAVY,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 3,
  },
  infoLabel: {
    fontSize: 8.5,
    fontWeight: "bold",
    color: NAVY,
    width: 140,
  },
  infoValue: {
    fontSize: 8.5,
    color: TEXT_DARK,
    flex: 1,
  },
  // Validation
  validationSection: {
    marginBottom: 14,
    padding: "8 10",
    borderWidth: 1,
    borderColor: GOLD,
    borderStyle: "dashed",
  },
  validationText: {
    fontSize: 9,
    color: TEXT_DARK,
    lineHeight: 1.6,
    fontStyle: "italic",
    marginBottom: 5,
  },
  alurBadge: {
    backgroundColor: GOLD,
    color: "#ffffff",
    fontSize: 8,
    fontWeight: "bold",
    padding: "2 6",
    alignSelf: "flex-start",
  },
  // Signature
  signatureSection: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
    marginBottom: 20,
  },
  signatureBox: {
    width: 200,
    alignItems: "center",
  },
  signatureDate: {
    fontSize: 9,
    color: TEXT_GRAY,
    marginBottom: 30,
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomColor: BORDER_GRAY,
    width: 160,
    marginBottom: 4,
  },
  signatureName: {
    fontSize: 9,
    fontWeight: "bold",
    color: NAVY,
    textAlign: "center",
  },
  signatureTitle: {
    fontSize: 7.5,
    color: TEXT_GRAY,
    textAlign: "center",
    fontStyle: "italic",
  },
  // Page number
  pageNumber: {
    position: "absolute",
    bottom: 15,
    left: 0,
    right: 0,
    textAlign: "center",
    fontSize: 7.5,
    color: TEXT_GRAY,
  },
  pageDecorBottom: {
    position: "absolute",
    bottom: 24,
    left: "20mm",
    right: "20mm",
    borderTopWidth: 0.5,
    borderTopColor: BORDER_GRAY,
  },
  // Annexe
  annexeTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: NAVY,
    textAlign: "center",
    marginBottom: 4,
  },
  annexeSubtitle: {
    fontSize: 9,
    color: TEXT_GRAY,
    textAlign: "center",
    marginBottom: 16,
    fontStyle: "italic",
  },
  sectionTitle: {
    fontSize: 10,
    fontWeight: "bold",
    color: NAVY,
    marginBottom: 6,
    marginTop: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: BORDER_GRAY,
    paddingBottom: 3,
  },
  objectiveItem: {
    flexDirection: "row",
    marginBottom: 3,
  },
  bullet: {
    fontSize: 9,
    color: GOLD,
    marginRight: 6,
    fontWeight: "bold",
  },
  objectiveText: {
    fontSize: 9,
    color: TEXT_DARK,
    flex: 1,
    lineHeight: 1.5,
  },
  moduleBlock: {
    marginBottom: 10,
    padding: "6 8",
    backgroundColor: LIGHT_GRAY,
    borderLeftWidth: 2,
    borderLeftColor: NAVY,
  },
  moduleBlockTitle: {
    fontSize: 9.5,
    fontWeight: "bold",
    color: NAVY,
    marginBottom: 5,
  },
  certNumberSection: {
    position: "absolute",
    bottom: 30,
    right: "20mm",
    fontSize: 7,
    color: TEXT_GRAY,
    textAlign: "right",
  },
});

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
  quiz: {
    score: number;
  };
  certificate: {
    generatedAt: string;
    certNumber: string;
  };
}

function formatDate(isoDate: string): string {
  const d = new Date(isoDate);
  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function Header() {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.orgName}>{ORGANIZATION.name}</Text>
        <Text style={styles.orgInfo}>{ORGANIZATION.address}</Text>
        <Text style={styles.orgInfo}>SIRET : {ORGANIZATION.siret}</Text>
        <Text style={styles.orgInfo}>
          N° déclaration d'activité : {ORGANIZATION.activityDeclarationNumber}
        </Text>
        <Text style={styles.orgInfo}>
          Déclaré auprès du préfet de région {ORGANIZATION.prefectureRegion}
        </Text>
        <Text style={styles.orgInfo}>
          {ORGANIZATION.email} · {ORGANIZATION.phone}
        </Text>
      </View>
      <View>
        <Text style={styles.badge}>ORGANISME DE FORMATION</Text>
      </View>
    </View>
  );
}

export function AttestationPDF({ data }: { data: AttestationData }) {
  const civilite =
    data.learner.gender === "F"
      ? "Madame"
      : data.learner.gender === "M"
        ? "Monsieur"
        : "L'apprenant(e)";

  const fullName = `${data.learner.firstName} ${data.learner.lastName.toUpperCase()}`;
  const totalPages = 2;

  return (
    <Document
      title="Attestation de formation – PASS Formation"
      author={ORGANIZATION.name}
      subject={FORMATION.title}
    >
      {/* ─── PAGE 1 — Attestation ─────────────────────────────── */}
      <Page size="A4" style={styles.page}>
        <Header />

        {/* Title */}
        <View style={styles.titleSection}>
          <Text style={styles.mainTitle}>Attestation de Formation</Text>
          <Text style={styles.titleSubline}>
            Formation professionnelle continue – Loi ALUR
          </Text>
        </View>

        {/* Main body */}
        <View style={styles.bodySection}>
          <Text style={styles.bodyText}>
            Je, soussigné{" "}
            <Text style={{ fontWeight: "bold" }}>
              {REPRESENTATIVE.name}
            </Text>
            , représentant de l'organisme de formation{" "}
            <Text style={{ fontWeight: "bold" }}>{ORGANIZATION.name}</Text>,
          </Text>
          <Text style={styles.bodyText}>atteste que :</Text>
          <Text style={[styles.bodyText, { marginTop: 6, marginBottom: 6 }]}>
            <Text style={styles.learnerName}>
              {civilite} {fullName}
            </Text>
            ,{" "}
            <Text style={{ fontStyle: "italic" }}>{data.learner.status}</Text>,
          </Text>
          <Text style={styles.bodyText}>
            a bien suivi et achevé la formation suivante :
          </Text>
          <Text style={[styles.formationTitle, { marginTop: 5 }]}>
            « {FORMATION.title} »
          </Text>
        </View>

        {/* Table */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderCell, styles.colModule]}>
              Module
            </Text>
            <Text style={[styles.tableHeaderCell, styles.colModalite]}>
              Modalité
            </Text>
            <Text style={[styles.tableHeaderCell, styles.colDuree]}>
              Durée
            </Text>
            <Text style={[styles.tableHeaderCell, styles.colDates]}>
              Dates
            </Text>
          </View>
          {FORMATION.modules.map((mod, idx) => {
            const modDate = data.training.moduleDates.find(
              (d) => d.slug === mod.slug
            );
            const dateStr = modDate
              ? `du ${formatDate(modDate.startDate)} au ${formatDate(modDate.endDate)}`
              : `du ${formatDate(data.training.startDate)} au ${formatDate(data.training.endDate)}`;
            return (
              <View
                key={mod.slug}
                style={[styles.tableRow, idx % 2 === 1 ? styles.tableRowAlt : {}]}
              >
                <Text style={[styles.tableCell, styles.colModule]}>
                  {mod.title}
                </Text>
                <Text
                  style={[
                    styles.tableCell,
                    styles.colModalite,
                    { textAlign: "center" },
                  ]}
                >
                  {mod.modality}
                </Text>
                <Text
                  style={[
                    styles.tableCell,
                    styles.colDuree,
                    { textAlign: "center" },
                  ]}
                >
                  {mod.durationHours}h
                </Text>
                <Text style={[styles.tableCell, styles.colDates]}>
                  {dateStr}
                </Text>
              </View>
            );
          })}
          <View style={styles.tableTotalRow}>
            <Text style={[styles.tableTotalCell, styles.colModule]}>
              TOTAL
            </Text>
            <Text
              style={[styles.tableTotalCell, styles.colModalite, { textAlign: "center" }]}
            >
              E-learning
            </Text>
            <Text
              style={[styles.tableTotalCell, styles.colDuree, { textAlign: "center" }]}
            >
              {FORMATION.durationHours}h
            </Text>
            <Text style={[styles.tableTotalCell, styles.colDates]}>
              du {formatDate(data.training.startDate)} au{" "}
              {formatDate(data.training.endDate)}
            </Text>
          </View>
        </View>

        {/* Info section */}
        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Modalité pédagogique :</Text>
            <Text style={styles.infoValue}>
              cf. tableau liste des modules
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Lieu de la formation :</Text>
            <Text style={styles.infoValue}>{FORMATION.location}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Dates de la formation :</Text>
            <Text style={styles.infoValue}>
              du {formatDate(data.training.startDate)} au{" "}
              {formatDate(data.training.endDate)}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Durée de la formation :</Text>
            <Text style={styles.infoValue}>
              {FORMATION.durationHours} heures ({FORMATION.durationDays} jours)
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Nature de l'action :</Text>
            <Text style={styles.infoValue}>Action de formation</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Objectifs de la formation :</Text>
            <Text style={styles.infoValue}>
              cf. programme détaillé en annexe
            </Text>
          </View>
        </View>

        {/* Validation */}
        <View style={styles.validationSection}>
          <Text style={styles.validationText}>
            Les objectifs pédagogiques ont été atteints et l'apprenant a acquis
            les connaissances conformément au programme de la formation, en
            atteignant un taux de réussite au quiz final de{" "}
            <Text style={{ fontWeight: "bold" }}>{data.quiz.score}%</Text>,
            supérieur au seuil requis de 80%.
          </Text>
          <Text style={[styles.validationText, { marginBottom: 6 }]}>
            La formation est conforme à la{" "}
            <Text style={{ fontWeight: "bold" }}>loi ALUR</Text> (Accès au
            Logement et Urbanisme Rénové) et répond aux exigences de formation
            continue obligatoire de 42 heures sur 3 ans pour les professionnels
            de l'immobilier.
          </Text>
          <Text style={styles.alurBadge}>✓ LOI ALUR – 42H VALIDÉES</Text>
        </View>

        {/* Signature */}
        <View style={styles.signatureSection}>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureDate}>
              Fait à Toulouse, le {formatDate(data.certificate.generatedAt)}
            </Text>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureName}>{REPRESENTATIVE.name}</Text>
            <Text style={styles.signatureTitle}>
              Représentant – {ORGANIZATION.name}
            </Text>
          </View>
        </View>

        {/* Cert number */}
        <View style={styles.certNumberSection}>
          <Text>N° certificat : {data.certificate.certNumber}</Text>
        </View>

        {/* Page number */}
        <View style={styles.pageDecorBottom} />
        <Text style={styles.pageNumber}>
          Page 1 / {totalPages}
        </Text>
      </Page>

      {/* ─── PAGE 2 — Annexe ─────────────────────────────────── */}
      <Page size="A4" style={styles.page}>
        <Header />

        <View style={[styles.titleSection, { marginBottom: 12 }]}>
          <Text style={styles.annexeTitle}>
            Annexe – Programme détaillé
          </Text>
          <Text style={styles.annexeSubtitle}>
            {FORMATION.title}
          </Text>
        </View>

        {/* Formation objectives */}
        <Text style={styles.sectionTitle}>Objectifs de la formation</Text>
        {FORMATION.objectives.map((obj, i) => (
          <View key={i} style={styles.objectiveItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.objectiveText}>{obj}</Text>
          </View>
        ))}

        {/* Program per module */}
        <Text style={[styles.sectionTitle, { marginTop: 14 }]}>
          Contenu détaillé par module
        </Text>
        {FORMATION.programItems.map((prog, i) => {
          const mod = FORMATION.modules[i];
          return (
            <View key={i} style={styles.moduleBlock}>
              <Text style={styles.moduleBlockTitle}>
                Module {i + 1} – {prog.moduleTitle}
                {mod ? ` (${mod.durationHours}h)` : ""}
              </Text>
              {prog.items.map((item, j) => (
                <View key={j} style={styles.objectiveItem}>
                  <Text style={styles.bullet}>–</Text>
                  <Text style={styles.objectiveText}>{item}</Text>
                </View>
              ))}
            </View>
          );
        })}

        {/* Page number */}
        <View style={styles.pageDecorBottom} />
        <Text style={styles.pageNumber}>
          Page 2 / {totalPages}
        </Text>
      </Page>
    </Document>
  );
}
