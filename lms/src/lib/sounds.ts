/**
 * Système de sons gamifiés — Web Audio API pure, zéro dépendance
 */

let ctx: AudioContext | null = null;

function getCtx(): AudioContext {
  if (!ctx || ctx.state === "closed") {
    ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
  }
  if (ctx.state === "suspended") ctx.resume();
  return ctx;
}

function playNote(
  freq: number,
  duration: number,
  type: OscillatorType = "sine",
  vol = 0.25,
  startDelay = 0
) {
  try {
    const c = getCtx();
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.connect(gain);
    gain.connect(c.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, c.currentTime + startDelay);
    gain.gain.setValueAtTime(0, c.currentTime + startDelay);
    gain.gain.linearRampToValueAtTime(vol, c.currentTime + startDelay + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + startDelay + duration);
    osc.start(c.currentTime + startDelay);
    osc.stop(c.currentTime + startDelay + duration);
  } catch {
    // Silently fail if audio context unavailable
  }
}

let enabled = true;

export const sounds = {
  setEnabled(val: boolean) { enabled = val; },
  isEnabled() { return enabled; },

  /** Gain XP — ding court */
  xpGain() {
    if (!enabled || typeof window === "undefined") return;
    playNote(880, 0.08, "sine", 0.2);
    playNote(1108, 0.1, "sine", 0.15, 0.07);
  },

  /** Niveau suivant — fanfare montante */
  levelUp() {
    if (!enabled || typeof window === "undefined") return;
    const melody = [523, 659, 784, 1047];
    melody.forEach((f, i) => playNote(f, 0.18, "sine", 0.28, i * 0.1));
    playNote(1047, 0.5, "sine", 0.2, melody.length * 0.1);
  },

  /** Badge débloqué — accord joyeux */
  badgeUnlock(rarity: "common" | "rare" | "epic" | "legendary" = "common") {
    if (!enabled || typeof window === "undefined") return;
    const melodies: Record<string, number[]> = {
      common:    [659, 784, 1047],
      rare:      [659, 784, 988, 1175],
      epic:      [523, 659, 784, 1047, 1319],
      legendary: [523, 659, 784, 1047, 1319, 1568],
    };
    const vol = rarity === "legendary" ? 0.35 : rarity === "epic" ? 0.30 : 0.25;
    (melodies[rarity] ?? melodies.common).forEach((f, i) =>
      playNote(f, 0.2, "sine", vol, i * 0.1)
    );
  },

  /** Bonne réponse quiz */
  quizCorrect() {
    if (!enabled || typeof window === "undefined") return;
    playNote(523, 0.07, "sine", 0.2);
    playNote(659, 0.1, "sine", 0.2, 0.06);
  },

  /** Mauvaise réponse quiz */
  quizWrong() {
    if (!enabled || typeof window === "undefined") return;
    playNote(220, 0.12, "sawtooth", 0.15);
    playNote(180, 0.18, "sawtooth", 0.1, 0.1);
  },

  /** Leçon terminée */
  lessonComplete() {
    if (!enabled || typeof window === "undefined") return;
    const melody = [523, 659, 784, 659, 784, 1047];
    melody.forEach((f, i) => playNote(f, 0.14, "sine", 0.22, i * 0.09));
  },

  /** Clic léger UI */
  click() {
    if (!enabled || typeof window === "undefined") return;
    playNote(1200, 0.04, "square", 0.05);
  },

  /** Hover */
  hover() {
    if (!enabled || typeof window === "undefined") return;
    playNote(800, 0.03, "sine", 0.04);
  },
};
