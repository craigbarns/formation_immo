#!/usr/bin/env python3
"""Génère le support de cours complet (PDF) remis aux apprenants en fin de formation.

Source : lms/src/data/course.ts (ordre des modules/leçons, durées, objectifs)
         + scripts Markdown de chaque leçon, nettoyés des éléments de production
           vidéo (B-roll, pauses, prompts Midjourney, voix, timecodes...).
Sortie : SUPPORT_FORMATION_COMPLET.pdf (+ .html intermédiaire non versionné)
"""

import html
import re
import sys
from pathlib import Path

import markdown
from weasyprint import CSS, HTML

ROOT = Path(__file__).resolve().parent.parent
COURSE_TS = ROOT / "lms" / "src" / "data" / "course.ts"
OUT_PDF = ROOT / "SUPPORT_FORMATION_COMPLET.pdf"

# ─── Lecture de course.ts ──────────────────────────────────────────────────────

def ts_str(block: str, key: str) -> str | None:
    m = re.search(key + r'\s*:\s*\n?\s*"((?:[^"\\]|\\.)*)"', block)
    return m.group(1).replace('\\"', '"') if m else None


def parse_course():
    src = COURSE_TS.read_text(encoding="utf-8")
    start = src.index("lessons:")  # premier module
    start = src.rfind("{", 0, src.rfind("slug:", 0, start))
    body = src[start:]
    modules = []
    # Découpe par module : chaque module a un title "Module N — ..."
    for mm in re.finditer(r'slug:\s*"([^"]+)",\s*\n\s*title:\s*"(Module[^"]+)"', body):
        modules.append({"slug": mm.group(1), "title": mm.group(2), "pos": mm.start()})
    for i, mod in enumerate(modules):
        end = modules[i + 1]["pos"] if i + 1 < len(modules) else len(body)
        chunk = body[mod["pos"]:end]
        mod["summary"] = ts_str(chunk, "summary") or ""
        mod["description"] = ts_str(chunk, "description") or ""
        lessons = []
        parts = re.split(r'\n\s*\{\s*\n\s*slug:', chunk.split("lessons:", 1)[1])
        for p in parts[1:]:
            p = "slug:" + p
            obj = re.search(r"objectives:\s*\[(.*?)\]", p, re.S)
            lessons.append({
                "title": ts_str(p, "title"),
                "file": ts_str(p, "scriptFile"),
                "duration": int(re.search(r"duration:\s*(\d+)", p).group(1)),
                "objectives": re.findall(r'"((?:[^"\\]|\\.)*)"', obj.group(1)) if obj else [],
            })
        mod["lessons"] = lessons
    return modules

# ─── Nettoyage des scripts ─────────────────────────────────────────────────────

DROP_SECTION = re.compile(
    r"informations techniques|prompt midjourney|fiche récapitulative des b-rolls|"
    r"fiche technique|récapitulatif technique|notes de production|métadonnées|"
    r"storyboard|b-roll|spécifications|elevenlabs|checklist de production|"
    r"fiche récapitulative$|indications? de réalisation|visuels? à produire",
    re.I,
)
META_LINE = re.compile(
    r"^\s*[-*]?\s*\*\*(durée|nombre de mots|rythme|voix|alternative|avatar|ton|"
    r"style|musique|format|mots)[^*]*\*\*\s*:", re.I)
EMOJI = re.compile("[\U0001F300-\U0001FAFF☀-➿️‍]")
DURATION = re.compile(
    r"\s*[-–—:]?\s*\(?\s*(\d+:\d+\s*[-–]\s*\d+:\d+|\d+\s*(minutes?|min|secondes?|sec|s)\b(\s*\d+(\s*secondes?|s)?)?)\s*\)?",
    re.I)


def clean_heading(text: str) -> str:
    t = EMOJI.sub("", text).strip()
    t = t.strip('"“”')
    t = re.sub(r"\(\s*\d+:\d+\s*[-–]\s*\d+:\d+\s*\)", "", t)
    t = re.sub(r"\([^)]*\b(minutes?|secondes?|min|sec)\b[^)]*\)", "", t, flags=re.I)
    # [SEGMENT 2 - PROBLÉMATIQUE] - 1 minute  /  [SEGMENT 1 : ACCROCHE - 45 secondes]
    m = re.match(r"\[\s*SEGMENT\s*\d+\s*[-:–]\s*([^\]]+)\]", t, re.I)
    if m:
        t = m.group(1)
    t = re.sub(r"\s*[-–]\s*\d+\s*(minutes?|secondes?)(\s*\d+)?\s*$", "", t, flags=re.I)
    t = re.sub(r"^PARTIE\s+\d+\s*:\s*", "", t, flags=re.I)
    t = re.sub(r"^(SEGMENT|SÉQUENCE)\s*\d+\s*[-:–]\s*", "", t, flags=re.I)
    t = t.strip(" -–:[]")
    if t.isupper():
        t = t.capitalize()
        t = re.sub(r"\b(dpe|alur|sru|erp|ptz|lmnp|crm|seo|rgpd|cntgi|tracfin|ifi|kpi|r0|r1|r2|dvf|laarc|spin|aida)\b",
                   lambda x: x.group(0).upper(), t, flags=re.I)
    return t.strip()


def clean_script(md: str) -> str:
    lines = md.splitlines()
    out = []
    in_code = False
    skip_level = None  # niveau de titre de la section ignorée
    seen_body = False
    for line in lines:
        s = line.strip()
        if s.startswith("```"):
            in_code = not in_code
            continue
        if in_code:
            continue
        h = re.match(r"^(#{1,6})\s+(.*)$", s)
        if h:
            level, title = len(h.group(1)), h.group(2)
            if skip_level is not None and level <= skip_level:
                skip_level = None
            if skip_level is not None:
                continue
            if level == 1:
                continue  # titre "SCRIPT VIDÉO N" remplacé par le titre de leçon
            if DROP_SECTION.search(title):
                skip_level = level
                continue
            plain = EMOJI.sub("", title).strip()
            if re.search(r"script complet", plain, re.I) or plain.startswith('"'):
                continue
            ct = clean_heading(title)
            if not ct:
                continue
            seen_body = True
            out.append(("H", level, ct))
            continue
        if skip_level is not None:
            continue
        # Intertitres en gras : **ÉTAPE 1 : ...** (1:45 - 2:45)  /  **[SOUS-PARTIE D : ...]**
        b = re.match(r"^\*\*\[?([^*\]]+?)\]?\*\*\s*(\(\s*\d+:\d+\s*[-–]\s*\d+:\d+\s*\))?\s*$", s)
        if b and (b.group(2) or s.startswith("**[")):
            title = re.sub(r"^SOUS-PARTIE\s+\w\s*:\s*", "", b.group(1).strip(), flags=re.I)
            out.append(("H", 4, clean_heading(title)))
            continue
        if s.startswith(">") and re.search(r"narration audio|tts", s, re.I):
            continue
        if META_LINE.match(s):
            continue
        if re.match(r"^\*\*(narration|voix off|voix|narrateur|formateur|avatar)[^*]*:?\s*\*\*\s*:?\s*$", s, re.I):
            continue
        if re.match(r"^\*[^*].*(script rédigé|durée|mots\s*:).*\*$", s, re.I):
            continue
        # Lignes de régie entièrement entre crochets : [B-ROLL : ...], [TRANSITION], [ÉCRAN ...]
        if re.match(r"^\[[^\]]*\]\.?$", s) or re.match(r"^\*?\[(b-roll|transition|écran|musique|plan|visuel|texte à l'écran|incrustation|graphique|son)", s, re.I):
            continue
        t = line
        t = re.sub(r"\[(PAUSE|SILENCE|RESPIRATION|SOURIRE|TON|EMPHASE|INSISTER|RALENTIR)[^\]]*\]", "", t, flags=re.I)
        t = re.sub(r"\[(B-ROLL|TRANSITION|ÉCRAN|VISUEL|INCRUSTATION|TEXTE)[^\]]*\]", "", t, flags=re.I)
        t = re.sub(r"\s{2,}", " ", t).rstrip()
        # guillemets de narration englobant tout le paragraphe
        ts = t.strip()
        if len(ts) > 2 and ts[0] in '"“' and ts[-1] in '"”' and ts.count('"') <= 2:
            t = ts[1:-1].strip()
        out.append(("T", 0, t))

    # Reconstruction : titres internes -> h3/h4 (le titre de leçon est un h2)
    res = []
    for kind, level, text in out:
        if kind == "H":
            lvl = 3 if level <= 3 else 4
            res.append("")
            res.append("#" * lvl + " " + text)
            res.append("")
        else:
            if text.strip() == "---":
                continue
            res.append(text)
    txt = "\n".join(res)
    txt = re.sub(r"\n{3,}", "\n\n", txt).strip()
    return txt

# ─── Rendu HTML ────────────────────────────────────────────────────────────────

def fmt_duration(minutes: int) -> str:
    h, m = divmod(minutes, 60)
    if h and m:
        return f"{h}h{m:02d}"
    return f"{h}h" if h else f"{m} min"


def md_to_html(text: str) -> str:
    return markdown.markdown(text, extensions=["tables", "sane_lists"])


def build_html(modules) -> str:
    total = sum(l["duration"] for m in modules for l in m["lessons"])
    n_lessons = sum(len(m["lessons"]) for m in modules)
    parts = []

    # Couverture
    parts.append(f"""
<section class="cover">
  <div class="cover-band"></div>
  <p class="cover-kicker">Support de cours</p>
  <h1 class="cover-title">Formation Agent Immobilier</h1>
  <p class="cover-sub">Certification professionnelle — {fmt_duration(total)}</p>
  <div class="cover-rule"></div>
  <p class="cover-meta">{len(modules)} modules · {n_lessons} leçons</p>
  <table class="cover-fields">
    <tr><td>Participant(e)</td><td></td></tr>
    <tr><td>Session</td><td></td></tr>
    <tr><td>Date de fin de formation</td><td></td></tr>
  </table>
  <p class="cover-foot">Document pédagogique remis au participant — usage personnel.<br>
  Contenu à jour de la réglementation en vigueur à la date d'édition.</p>
</section>""")

    # Sommaire
    toc = ['<section class="toc"><h1 class="toc-title">Sommaire</h1>']
    for mi, mod in enumerate(modules, 1):
        mdur = sum(l["duration"] for l in mod["lessons"])
        toc.append(f'<p class="toc-mod"><a href="#m{mi}">{html.escape(mod["title"])}</a>'
                   f'<span class="toc-dur">{fmt_duration(mdur)}</span></p>')
        for li, les in enumerate(mod["lessons"], 1):
            toc.append(f'<p class="toc-les"><a href="#m{mi}l{li}">{mi}.{li} {html.escape(les["title"])}</a></p>')
    toc.append("</section>")
    parts.append("\n".join(toc))

    # Modules
    for mi, mod in enumerate(modules, 1):
        mdur = sum(l["duration"] for l in mod["lessons"])
        rows = "".join(
            f"<tr><td>{mi}.{li}</td><td>{html.escape(l['title'])}</td><td>{fmt_duration(l['duration'])}</td></tr>"
            for li, l in enumerate(mod["lessons"], 1))
        mod_name = html.escape(re.sub(r"^Module \d+\s*[—-]\s*", "", mod["title"]))
        parts.append(f"""
<section class="module-cover" id="m{mi}">
  <p class="mod-num">Module {mi}</p>
  <h1 class="mod-title">{mod_name}</h1>
  <p class="mod-dur">Durée : {fmt_duration(mdur)}</p>
  <p class="mod-desc">{html.escape(mod['description'])}</p>
  <table class="mod-table"><thead><tr><th>N°</th><th>Leçon</th><th>Durée</th></tr></thead>
  <tbody>{rows}</tbody></table>
</section>""")
        for li, les in enumerate(mod["lessons"], 1):
            path = ROOT / les["file"]
            if not path.exists():
                print(f"ATTENTION fichier manquant : {les['file']}", file=sys.stderr)
                continue
            body = md_to_html(clean_script(path.read_text(encoding="utf-8")))
            objs = "".join(f"<li>{html.escape(o)}</li>" for o in les["objectives"])
            parts.append(f"""
<section class="lesson" id="m{mi}l{li}">
  <p class="les-kicker">Module {mi} · Leçon {mi}.{li} · {fmt_duration(les['duration'])}</p>
  <h2 class="les-title">{html.escape(les['title'])}</h2>
  <div class="objectives"><p class="obj-title">Objectifs de la leçon</p><ul>{objs}</ul></div>
  <div class="les-body">{body}</div>
</section>""")

    return f"""<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8">
<title>Support de formation — Agent Immobilier</title></head><body>
{''.join(parts)}
</body></html>"""


CSS_TEXT = """
@page {
  size: A4; margin: 2cm 1.9cm 2.2cm 1.9cm;
  @top-left { content: string(modtitle); font: 7.5pt Helvetica, sans-serif; color: #8a8a8a; }
  @top-right { content: "Support de formation — Agent immobilier"; font: bold 7.5pt Helvetica, sans-serif; color: #b8962e; }
  @bottom-center { content: counter(page) " / " counter(pages); font: 8pt Helvetica, sans-serif; color: #1a3a5c; }
}
@page cover { margin: 0; @top-left { content: none } @top-right { content: none } @bottom-center { content: none } }
@page modcover { @top-left { content: none } }
body { font-family: Helvetica, Arial, sans-serif; font-size: 10pt; line-height: 1.55; color: #2a2a2a; text-align: justify; hyphens: auto; }

.cover { page: cover; height: 297mm; background: #1a3a5c; color: #fff; padding: 0 22mm; box-sizing: border-box; text-align: left; position: relative; }
.cover-band { position: absolute; left: 0; top: 0; width: 8mm; height: 297mm; background: #d4af37; }
.cover-kicker { padding-top: 70mm; margin: 0; color: #d4af37; letter-spacing: 3px; text-transform: uppercase; font-size: 11pt; font-weight: bold; }
.cover-title { font-family: Georgia, serif; font-size: 36pt; line-height: 1.1; margin: 6mm 0 4mm; color: #fff; border: none; }
.cover-sub { font-size: 15pt; margin: 0; color: #e8e2d4; }
.cover-rule { width: 40mm; height: 2px; background: #d4af37; margin: 12mm 0 6mm; }
.cover-meta { font-size: 11pt; color: #e8e2d4; }
.cover-fields { margin-top: 30mm; width: 120mm; border-collapse: collapse; font-size: 10pt; }
.cover-fields td, .cover-fields tr:nth-child(even) td { border: none; border-bottom: 1px solid #d4af37; background: none; padding: 6mm 2mm 1.5mm 0; color: #e8e2d4; }
.cover-fields td:first-child { width: 55mm; }
.cover-foot { position: absolute; bottom: 18mm; left: 22mm; right: 22mm; font-size: 8pt; color: #b9c3cf; }

.toc { page-break-before: always; }
.toc-title, .mod-title { font-family: Georgia, serif; color: #1a3a5c; }
.toc-title { font-size: 24pt; border-bottom: 3px solid #d4af37; padding-bottom: 4px; }
.toc-mod { font-weight: bold; color: #1a3a5c; margin: 10px 0 3px; font-size: 10.5pt; }
.toc-les { margin: 1px 0 1px 14px; font-size: 9pt; text-align: left; }
.toc a { color: inherit; text-decoration: none; }
.toc-les a::after, .toc-mod a::after { content: leader('.') target-counter(attr(href), page); color: #777; font-weight: normal; }
.toc-dur { display: none; }

.module-cover { page: modcover; page-break-before: always; padding-top: 45mm; string-set: modtitle content(text); }
.module-cover .mod-title { string-set: modtitle content(text); }
.mod-num { color: #d4af37; text-transform: uppercase; letter-spacing: 3px; font-weight: bold; margin: 0; }
.mod-title { font-size: 28pt; margin: 4mm 0; line-height: 1.15; }
.mod-dur { color: #1a3a5c; font-weight: bold; border-left: 4px solid #d4af37; padding-left: 8px; }
.mod-desc { font-size: 11pt; color: #444; margin: 8mm 0; }

table { border-collapse: collapse; width: 100%; margin: 8px 0 12px; font-size: 8.8pt; text-align: left; page-break-inside: auto; }
th { background: #1a3a5c; color: #fff; padding: 6px; border: 1px solid #1a3a5c; }
td { padding: 5px 6px; border: 1px solid #d5d5d5; vertical-align: top; }
tr:nth-child(even) td { background: #f5f3ef; }
tr { page-break-inside: avoid; }

.lesson { page-break-before: always; }
.les-kicker { color: #b8962e; font-size: 8.5pt; font-weight: bold; text-transform: uppercase; letter-spacing: 1.5px; margin: 0; }
.les-title { font-family: Georgia, serif; color: #1a3a5c; font-size: 20pt; margin: 2mm 0 5mm; line-height: 1.2; border-bottom: 2px solid #d4af37; padding-bottom: 3mm; }
.objectives { background: #f5f3ef; border-left: 4px solid #d4af37; padding: 3mm 5mm; margin-bottom: 6mm; page-break-inside: avoid; }
.obj-title { font-weight: bold; color: #1a3a5c; margin: 0 0 1mm; }
.objectives ul { margin: 0; padding-left: 5mm; text-align: left; }
.les-body h3 { color: #1a3a5c; font-size: 13pt; margin: 7mm 0 2mm; page-break-after: avoid; border-left: 3px solid #d4af37; padding-left: 7px; text-align: left; }
.les-body h4 { color: #1a3a5c; font-size: 11pt; margin: 5mm 0 1.5mm; page-break-after: avoid; text-align: left; }
.les-body p { margin: 0 0 2.5mm; orphans: 3; widows: 3; }
.les-body ul, .les-body ol { margin: 1mm 0 3mm; padding-left: 6mm; text-align: left; }
.les-body li { margin: 0.8mm 0; }
.les-body strong { color: #1a3a5c; }
.les-body blockquote { margin: 3mm 0; padding: 2mm 5mm; border-left: 3px solid #1a3a5c; background: #f3f6f9; color: #333; }
.les-body hr { display: none; }
code { font-family: Helvetica, sans-serif; background: none; }
"""


def main():
    modules = parse_course()
    doc = build_html(modules)
    (ROOT / "scripts" / ".support_preview.html").write_text(doc, encoding="utf-8")
    HTML(string=doc, base_url=str(ROOT)).write_pdf(str(OUT_PDF), stylesheets=[CSS(string=CSS_TEXT)])
    total = sum(l["duration"] for m in modules for l in m["lessons"])
    print(f"{len(modules)} modules, {sum(len(m['lessons']) for m in modules)} leçons, {total} min")
    print(f"PDF : {OUT_PDF} ({OUT_PDF.stat().st_size // 1024} Ko)")


if __name__ == "__main__":
    main()
