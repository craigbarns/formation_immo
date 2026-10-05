/**
 * Mélange DÉTERMINISTE de l'ordre des réponses d'un QCM.
 *
 * Bug (octobre 2026) : 80 % des bonnes réponses étaient en position B — un
 * apprenant pouvait deviner sans connaître le cours. Les données restent
 * rédigées librement ; l'ordre affiché est permuté ici.
 *
 * La graine est l'id de la question : l'ordre est identique côté serveur et
 * côté client (aucun décalage d'affichage) et stable d'une visite à l'autre,
 * tandis que la position de la bonne réponse se répartit sur A/B/C/D.
 */

/** Hash FNV-1a 32 bits. */
function hashString(value: string): number {
  let hash = 0x811c9dc5;
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return hash >>> 0;
}

/** Générateur pseudo-aléatoire mulberry32 (déterministe pour une graine). */
function mulberry32(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Permutation de 0..n-1 : `perm[nouvellePosition] = anciennePosition`. */
export function seededPermutation(seed: string, n: number): number[] {
  const rand = mulberry32(hashString(seed));
  const perm = Array.from({ length: n }, (_, i) => i);
  for (let i = n - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [perm[i], perm[j]] = [perm[j], perm[i]];
  }
  return perm;
}

/** Réordonne `items` et renvoie la nouvelle position de l'élément d'indice `index`. */
export function reorder<T>(
  seed: string,
  items: readonly T[],
  index: number
): { items: T[]; index: number } {
  const perm = seededPermutation(seed, items.length);
  return { items: perm.map((old) => items[old]), index: perm.indexOf(index) };
}

/**
 * Positions cibles de la bonne réponse pour une série de `count` questions à
 * `optionCount` choix : chaque lettre revient autant de fois (à une près),
 * dans un ordre mélangé — ni « tout en B », ni motif A-B-C-D prévisible.
 */
export function balancedPositions(seed: string, count: number, optionCount = 4): number[] {
  const slots = Array.from({ length: count }, (_, i) => i % optionCount);
  return seededPermutation(seed, count).map((i) => slots[i]);
}

/** Mélange les mauvaises réponses et place la bonne (`index`) en position `target`. */
export function placeAt<T>(
  seed: string,
  items: readonly T[],
  index: number,
  target: number
): { items: T[]; index: number } {
  const others = items.filter((_, i) => i !== index);
  const shuffled = seededPermutation(seed, others.length).map((i) => others[i]);
  const at = Math.min(Math.max(target, 0), others.length);
  return { items: [...shuffled.slice(0, at), items[index], ...shuffled.slice(at)], index: at };
}
