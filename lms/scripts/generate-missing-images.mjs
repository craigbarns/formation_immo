import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const lmsRoot = path.resolve(__dirname, "..");
const publicDir = path.join(lmsRoot, "public");
const infographicsDir = path.join(publicDir, "formation-infographies");

const W = 1024;
const H = 728;

const C = {
  bg: "#fbfaf6",
  surface: "#ffffff",
  ink: "#1a3a5c",
  ink2: "#2d5a87",
  muted: "#5c6673",
  soft: "#f7f3e8",
  pale: "#f0e6c8",
  gold: "#d4af37",
  goldDark: "#7a6008",
  green: "#3ba66b",
  greenSoft: "#e8f5ee",
  amber: "#f2b544",
  amberSoft: "#fff4dd",
  red: "#b84646",
  redSoft: "#fdecec",
  blueSoft: "#e9f2fb",
  indigo: "#6366f1",
  indigoSoft: "#eef2ff",
  border: "#d9dee7",
};

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function wrap(text, maxChars) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let line = "";
  for (const word of words) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > maxChars && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function text(x, y, value, opts = {}) {
  const {
    size = 18,
    weight = 400,
    fill = C.ink,
    anchor = "start",
    family = "Avenir Next, Inter, Helvetica Neue, Arial, sans-serif",
    spacing = 0,
    transform = "",
  } = opts;
  return `<text x="${x}" y="${y}" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}" letter-spacing="${spacing}" ${transform ? `transform="${transform}"` : ""}>${esc(value)}</text>`;
}

function multiline(x, y, value, width, opts = {}) {
  const {
    size = 18,
    lineHeight = Math.round(size * 1.35),
    fill = C.muted,
    weight = 400,
    anchor = "start",
    family = "Avenir Next, Inter, Helvetica Neue, Arial, sans-serif",
  } = opts;
  const maxChars = Math.max(12, Math.floor(width / (size * 0.52)));
  return wrap(value, maxChars)
    .map((line, i) => {
      return `<text x="${x}" y="${y + i * lineHeight}" font-family="${family}" font-size="${size}" font-weight="${weight}" fill="${fill}" text-anchor="${anchor}">${esc(line)}</text>`;
    })
    .join("");
}

function rect(x, y, w, h, opts = {}) {
  const {
    rx = 14,
    fill = C.surface,
    stroke = C.border,
    sw = 2,
    opacity = 1,
  } = opts;
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" opacity="${opacity}"/>`;
}

function line(x1, y1, x2, y2, opts = {}) {
  const { stroke = C.border, sw = 2, dash = "" } = opts;
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}" ${dash ? `stroke-dasharray="${dash}"` : ""}/>`;
}

function dot(x, y, fill = C.gold) {
  return `<circle cx="${x}" cy="${y}" r="5" fill="${fill}"/>`;
}

function checkbox(x, y, label, opts = {}) {
  const { fill = C.muted, checked = false, size = 17 } = opts;
  return [
    rect(x, y - 13, 14, 14, { rx: 3, fill: checked ? C.greenSoft : "#fff", stroke: checked ? C.green : C.border, sw: 1.5 }),
    checked ? `<path d="M${x + 3} ${y - 6} L${x + 6} ${y - 2} L${x + 12} ${y - 10}" fill="none" stroke="${C.green}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>` : "",
    multiline(x + 24, y, label, 220, { size, fill, lineHeight: Math.round(size * 1.25) }),
  ].join("");
}

function header(title, subtitle) {
  return [
    text(W / 2, 48, title.toUpperCase(), {
      size: 27,
      weight: 800,
      fill: C.ink,
      anchor: "middle",
      spacing: 2.4,
    }),
    subtitle
      ? text(W / 2, 76, subtitle, {
          size: 15,
          weight: 600,
          fill: C.goldDark,
          anchor: "middle",
          spacing: 0.6,
        })
      : "",
  ].join("");
}

function base(content) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${C.bg}"/>
  <rect x="28" y="20" width="968" height="688" rx="30" fill="${C.surface}" stroke="#ebe5d6" stroke-width="1.5"/>
  <path d="M64 94 H960" stroke="${C.pale}" stroke-width="2"/>
  ${content}
</svg>`;
}

async function writePng(fileName, svg) {
  await fs.mkdir(infographicsDir, { recursive: true });
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9, adaptiveFiltering: true }).toFile(path.join(infographicsDir, fileName));
}

function diagnosticsSvg() {
  const rows = [
    ["DPE", "Toute vente / location", "10 ans", "Classer F/G = alerte travaux"],
    ["Amiante", "Permis avant 07/1997", "Illimité si négatif", "Vérifier parties privatives"],
    ["Plomb", "Logement avant 1949", "1 an vente / 6 ans loc.", "Risque enfants et travaux"],
    ["Électricité", "Installation > 15 ans", "3 ans", "Signal travaux sécurité"],
    ["Gaz", "Installation > 15 ans", "3 ans", "Couper les approximations"],
    ["Termites", "Zone arrêtée", "6 mois", "Contrôler la commune"],
    ["ERP", "Toute transaction", "6 mois", "Risques, sols, pollution"],
    ["Assainissement", "Non collectif", "3 ans", "Travaux possibles sous 1 an"],
  ];
  const y0 = 130;
  const rowH = 55;
  const cols = [72, 255, 500, 675];
  const widths = [165, 220, 150, 265];
  const body = [
    header("Tableau des diagnostics obligatoires", "Validités et réflexes pro avant publication"),
    rect(58, 110, 908, 498, { rx: 16, fill: "#fff", stroke: C.ink2, sw: 2 }),
    rect(58, 110, 908, 48, { rx: 16, fill: C.blueSoft, stroke: C.ink2, sw: 0 }),
    text(cols[0], 141, "DIAGNOSTIC", { size: 14, weight: 800, fill: C.ink, spacing: 0.7 }),
    text(cols[1], 141, "QUAND ?", { size: 14, weight: 800, fill: C.ink, spacing: 0.7 }),
    text(cols[2], 141, "VALIDITE", { size: 14, weight: 800, fill: C.ink, spacing: 0.7 }),
    text(cols[3], 141, "ALERTE PRO", { size: 14, weight: 800, fill: C.ink, spacing: 0.7 }),
    ...rows.flatMap((row, i) => {
      const y = y0 + 48 + i * rowH;
      const fill = i % 2 === 0 ? "#ffffff" : "#fbfcfe";
      return [
        `<rect x="58" y="${y - 8}" width="908" height="${rowH}" fill="${fill}"/>`,
        line(58, y + rowH - 8, 966, y + rowH - 8, { stroke: "#e8ecf2", sw: 1 }),
        text(cols[0], y + 25, row[0], { size: 18, weight: 800, fill: i < 3 ? C.ink : C.ink2 }),
        multiline(cols[1], y + 18, row[1], widths[1], { size: 16, fill: C.muted, lineHeight: 19 }),
        multiline(cols[2], y + 18, row[2], widths[2], { size: 16, fill: C.muted, lineHeight: 19 }),
        multiline(cols[3], y + 18, row[3], widths[3], { size: 16, fill: C.muted, lineHeight: 19 }),
      ];
    }),
    rect(116, 635, 792, 42, { rx: 10, fill: C.soft, stroke: "#e6d9aa", sw: 1.5 }),
    text(512, 662, "Règle terrain : dossier complet avant visite qualifiée, doute = contrôle expert.", {
      size: 16,
      weight: 700,
      fill: C.goldDark,
      anchor: "middle",
    }),
  ];
  return base(body.join(""));
}

function mandatsSvg() {
  const cards = [
    {
      title: "Mandat simple",
      color: C.ink2,
      fill: C.blueSoft,
      items: ["Plusieurs agences possibles", "Vendeur peut vendre seul", "Concurrence forte", "Suivi commercial fragile"],
      metric: "Taux de maîtrise : faible",
    },
    {
      title: "Semi-exclusif",
      color: C.amber,
      fill: C.amberSoft,
      items: ["Une agence prioritaire", "Vente directe encadrée", "Bon compromis confiance", "Clauses à verrouiller"],
      metric: "Taux de maîtrise : moyen",
    },
    {
      title: "Exclusif",
      color: C.green,
      fill: C.greenSoft,
      items: ["Une stratégie unique", "Budget marketing assumable", "Reporting vendeur clair", "Délai et prix mieux pilotés"],
      metric: "Taux de maîtrise : élevé",
    },
  ];
  const body = [
    header("Comparatif des types de mandats", "Choisir le cadre selon confiance, délai et stratégie"),
    ...cards.flatMap((card, i) => {
      const x = 64 + i * 320;
      return [
        rect(x, 122, 278, 386, { rx: 18, fill: "#fff", stroke: card.color, sw: 2 }),
        rect(x, 122, 278, 58, { rx: 18, fill: card.fill, stroke: card.color, sw: 0 }),
        text(x + 139, 158, card.title.toUpperCase(), { size: 18, weight: 800, fill: C.ink, anchor: "middle", spacing: 0.8 }),
        ...card.items.map((item, j) => checkbox(x + 28, 223 + j * 50, item, { checked: j < 2, fill: C.muted, size: 16 })),
        rect(x + 24, 438, 230, 42, { rx: 10, fill: card.fill, stroke: card.color, sw: 1.5 }),
        text(x + 139, 464, card.metric, { size: 15, weight: 800, fill: C.ink, anchor: "middle" }),
      ];
    }),
    text(512, 554, "CLAUSES À VÉRIFIER", { size: 17, weight: 800, fill: C.red, anchor: "middle", spacing: 1.5 }),
    rect(94, 578, 836, 96, { rx: 14, fill: "#fff8f8", stroke: "#e8b8b8", sw: 1.5 }),
    dot(132, 612, C.red),
    multiline(148, 617, "Durée, reconduction, honoraires, diffusion, compte-rendu et sortie anticipée.", 330, { size: 15, fill: C.muted, lineHeight: 20 }),
    dot(548, 612, C.red),
    multiline(564, 617, "Un mandat exclusif ne se vend pas comme une contrainte : il se vend comme une stratégie.", 315, { size: 15, fill: C.muted, lineHeight: 20 }),
  ];
  return base(body.join(""));
}

function reseauxSvg() {
  const sections = [
    {
      title: "Planning hebdo",
      color: C.amber,
      fill: C.amberSoft,
      items: ["2 biens vitrines", "1 conseil vendeur", "1 coulisse terrain", "1 preuve sociale"],
    },
    {
      title: "Avant publication",
      color: C.ink2,
      fill: C.blueSoft,
      items: ["Hook en 8 mots", "Photo verticale propre", "CTA clair", "Mentions conformes"],
    },
    {
      title: "Engagement",
      color: C.green,
      fill: C.greenSoft,
      items: ["Répondre < 2h", "Relancer prospects chauds", "Sauver questions en FAQ", "DM vers rendez-vous"],
    },
    {
      title: "Mesure",
      color: C.indigo,
      fill: C.indigoSoft,
      items: ["Portée qualifiée", "Clics fiche bien", "Leads vendeurs", "RDV obtenus"],
    },
  ];
  const body = [
    header("Checklist réseaux sociaux 2026", "Cadence simple pour transformer l'audience en rendez-vous"),
    rect(96, 116, 832, 96, { rx: 16, fill: C.soft, stroke: "#e6d9aa", sw: 1.5 }),
    text(146, 152, "Objectif", { size: 16, weight: 800, fill: C.goldDark }),
    multiline(146, 176, "Publier moins, mais mieux : preuve locale, confiance vendeur et CTA mesurable.", 700, {
      size: 16,
      fill: C.ink,
      weight: 600,
    }),
    ...sections.flatMap((section, i) => {
      const x = 58 + (i % 2) * 474;
      const y = 240 + Math.floor(i / 2) * 185;
      return [
        rect(x, y, 416, 150, { rx: 16, fill: "#fff", stroke: section.color, sw: 2 }),
        rect(x, y, 416, 44, { rx: 16, fill: section.fill, stroke: section.color, sw: 0 }),
        text(x + 24, y + 29, section.title.toUpperCase(), { size: 16, weight: 800, fill: C.ink, spacing: 0.7 }),
        ...section.items.map((item, j) => checkbox(x + 24 + (j % 2) * 195, y + 78 + Math.floor(j / 2) * 42, item, { size: 15 })),
      ];
    }),
    rect(134, 636, 756, 40, { rx: 10, fill: C.greenSoft, stroke: "#b8dec9", sw: 1.5 }),
    text(512, 662, "Rythme recommandé : 5 posts / semaine + 15 minutes de suivi chaque jour.", {
      size: 16,
      weight: 800,
      fill: "#276749",
      anchor: "middle",
    }),
  ];
  return base(body.join(""));
}

function netVendeurSvg() {
  const steps = [
    ["Prix FAI", "250 000 €", C.blueSoft, C.ink2],
    ["Honoraires", "12 500 €", C.amberSoft, C.amber],
    ["Net vendeur", "237 500 €", C.greenSoft, C.green],
  ];
  const body = [
    header("Calculateur net vendeur", "Passer du prix affiché au montant réellement perçu"),
    rect(96, 120, 832, 88, { rx: 16, fill: C.soft, stroke: "#e6d9aa", sw: 1.5 }),
    text(512, 152, "FORMULE", { size: 14, weight: 800, fill: C.goldDark, anchor: "middle", spacing: 1.4 }),
    text(512, 184, "Net vendeur = Prix FAI - Honoraires agence", {
      size: 24,
      weight: 800,
      fill: C.ink,
      anchor: "middle",
    }),
    ...steps.flatMap((step, i) => {
      const x = 86 + i * 304;
      return [
        rect(x, 256, 244, 116, { rx: 18, fill: step[2], stroke: step[3], sw: 2 }),
        text(x + 122, 296, step[0].toUpperCase(), { size: 15, weight: 800, fill: C.ink, anchor: "middle", spacing: 0.8 }),
        text(x + 122, 338, step[1], { size: 28, weight: 900, fill: C.ink, anchor: "middle" }),
        i < 2 ? text(x + 275, 326, i === 0 ? "-" : "=", { size: 34, weight: 800, fill: C.goldDark, anchor: "middle" }) : "",
      ];
    }),
    text(512, 430, "ARGUMENTAIRE VENDEUR", { size: 17, weight: 800, fill: C.ink, anchor: "middle", spacing: 1.4 }),
    rect(70, 458, 406, 102, { rx: 15, fill: "#fff", stroke: C.ink2, sw: 2 }),
    text(98, 490, "1. Clarifier le mandat", { size: 18, weight: 800, fill: C.ink }),
    multiline(98, 518, "Séparez toujours prix FAI, honoraires et net vendeur dans votre explication.", 330, {
      size: 16,
      fill: C.muted,
    }),
    rect(548, 458, 406, 102, { rx: 15, fill: "#fff", stroke: C.green, sw: 2 }),
    text(576, 490, "2. Traduire en decision", { size: 18, weight: 800, fill: C.ink }),
    multiline(576, 518, "Montrez l'impact d'une baisse de prix avant de renégocier vos honoraires.", 330, {
      size: 16,
      fill: C.muted,
    }),
    rect(132, 610, 760, 46, { rx: 10, fill: C.redSoft, stroke: "#e6b8b8", sw: 1.5 }),
    text(512, 640, "À éviter : promettre un net vendeur sans vérifier le barème et la charge des honoraires.", {
      size: 16,
      weight: 800,
      fill: C.red,
      anchor: "middle",
    }),
  ];
  return base(body.join(""));
}

function iconSvg(size) {
  const scale = size / 512;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
      <stop offset="0%" stop-color="${C.ink}"/>
      <stop offset="100%" stop-color="${C.ink2}"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${Math.round(96 * scale)}" fill="url(#g)"/>
  <circle cx="${256 * scale}" cy="${256 * scale}" r="${188 * scale}" fill="none" stroke="${C.gold}" stroke-width="${20 * scale}"/>
  <path d="M${150 * scale} ${252 * scale} L${256 * scale} ${166 * scale} L${362 * scale} ${252 * scale}" fill="none" stroke="${C.gold}" stroke-width="${24 * scale}" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M${180 * scale} ${248 * scale} V${352 * scale} H${332 * scale} V${248 * scale}" fill="none" stroke="#fff7da" stroke-width="${24 * scale}" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="${256 * scale}" y="${329 * scale}" font-family="Avenir Next, Inter, Helvetica Neue, Arial, sans-serif" font-size="${90 * scale}" font-weight="900" fill="#fff7da" text-anchor="middle">42h</text>
</svg>`;
}

async function writeIcon(size) {
  await sharp(Buffer.from(iconSvg(size))).png({ compressionLevel: 9, adaptiveFiltering: true }).toFile(path.join(publicDir, `icon-${size}x${size}.png`));
}

await writePng("tableau-diagnostics.png", diagnosticsSvg());
await writePng("comparatif-mandats.png", mandatsSvg());
await writePng("checklist-reseaux.png", reseauxSvg());
await writePng("calculateur-net-vendeur.png", netVendeurSvg());
await writeIcon(192);
await writeIcon(512);

console.log("Created missing images:");
console.log(" - public/formation-infographies/tableau-diagnostics.png");
console.log(" - public/formation-infographies/comparatif-mandats.png");
console.log(" - public/formation-infographies/checklist-reseaux.png");
console.log(" - public/formation-infographies/calculateur-net-vendeur.png");
console.log(" - public/icon-192x192.png");
console.log(" - public/icon-512x512.png");
