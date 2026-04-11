import fs from "fs";
import path from "path";

const MODULE_SCRIPT_ROOTS = [
  "module1-juridique",
  "module2-transaction",
  "module3-financement",
  "module4-marketing",
  "module5-terrain",
];

export function lessonScriptDirectories(repoRoot) {
  return MODULE_SCRIPT_ROOTS.map((name) => path.join(repoRoot, name, "scripts"));
}

export function walkMarkdownScripts(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) {
      if (name === "narration-audio" || name === "node_modules") continue;
      walkMarkdownScripts(p, acc);
    } else if (name.endsWith(".md") && !name.startsWith("README")) {
      acc.push(p);
    }
  }
  return acc;
}

export function allLessonMarkdownPaths(repoRoot) {
  return lessonScriptDirectories(repoRoot).flatMap((dir) => walkMarkdownScripts(dir));
}
