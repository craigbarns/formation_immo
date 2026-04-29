#!/usr/bin/env python3
"""Convertit le programme global en PDF avec une mise en page premium."""

import markdown
from weasyprint import HTML, CSS
from pathlib import Path

ROOT = Path("/home/user/formation_immo")
SRC = ROOT / "PROGRAMME_GLOBAL_CERTIFICATION.md"
DST = ROOT / "PROGRAMME_GLOBAL_CERTIFICATION.pdf"

md_text = SRC.read_text(encoding="utf-8")
html_body = markdown.markdown(md_text, extensions=["tables", "fenced_code", "toc"])

css = """
@page {
    size: A4;
    margin: 2cm 1.8cm 2.2cm 1.8cm;
    @bottom-center {
        content: "Programme Global de Formation — Agent Immobilier Certifié — Page " counter(page) " / " counter(pages);
        font-family: 'Helvetica', sans-serif;
        font-size: 8pt;
        color: #1a3a5c;
    }
    @top-right {
        content: "Formation 42h";
        font-family: 'Helvetica', sans-serif;
        font-size: 8pt;
        color: #d4af37;
        font-weight: bold;
    }
}
body {
    font-family: 'Helvetica', 'Arial', sans-serif;
    font-size: 10pt;
    line-height: 1.5;
    color: #2c2c2c;
}
h1 {
    color: #1a3a5c;
    font-size: 22pt;
    border-bottom: 3px solid #d4af37;
    padding-bottom: 8px;
    margin-top: 0;
    page-break-before: auto;
}
h1:first-of-type {
    text-align: center;
    border-bottom: none;
    margin-bottom: 0;
}
h2 {
    color: #1a3a5c;
    font-size: 14pt;
    border-left: 4px solid #d4af37;
    padding-left: 10px;
    margin-top: 22px;
    page-break-after: avoid;
}
h3 {
    color: #1a3a5c;
    font-size: 12pt;
    margin-top: 16px;
    page-break-after: avoid;
}
h4 {
    color: #1a3a5c;
    font-size: 11pt;
    font-weight: bold;
    margin-top: 12px;
}
hr {
    border: none;
    border-top: 1px solid #d4af37;
    margin: 18px 0;
}
table {
    border-collapse: collapse;
    width: 100%;
    margin: 10px 0;
    font-size: 9pt;
    page-break-inside: avoid;
}
th {
    background-color: #1a3a5c;
    color: white;
    padding: 8px 6px;
    text-align: left;
    font-weight: bold;
    border: 1px solid #1a3a5c;
}
td {
    padding: 6px;
    border: 1px solid #cccccc;
    vertical-align: top;
}
tr:nth-child(even) {
    background-color: #f5f3ef;
}
strong {
    color: #1a3a5c;
}
ul, ol {
    margin: 8px 0;
    padding-left: 20px;
}
li {
    margin: 3px 0;
}
em {
    color: #555;
}
code {
    background-color: #f5f3ef;
    padding: 1px 4px;
    border-radius: 3px;
    font-size: 9pt;
}
.cover {
    text-align: center;
    margin-top: 60px;
}
"""

html_full = f"""<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="utf-8">
    <title>Programme Global de Formation - Agent Immobilier</title>
</head>
<body>
{html_body}
</body>
</html>
"""

HTML(string=html_full).write_pdf(str(DST), stylesheets=[CSS(string=css)])
print(f"PDF généré : {DST}")
print(f"Taille : {DST.stat().st_size // 1024} Ko")
