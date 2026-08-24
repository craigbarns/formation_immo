import { describe, expect, it } from "vitest";
import {
  attendanceBatchSchema,
  attendanceDurationClock,
  creditedActiveMilliseconds,
  formatAttendanceDuration,
} from "./attendance";

describe("creditedActiveMilliseconds", () => {
  it("compte un intervalle actif au premier plan", () => {
    expect(
      creditedActiveMilliseconds({
        sampleStartedAtMs: 10_000,
        sampleEndedAtMs: 15_000,
        lastInteractionAtMs: 14_000,
        visible: true,
        focused: true,
      }),
    ).toBe(5_000);
  });

  it("ne compte ni arrière-plan ni fenêtre sans focus", () => {
    const base = {
      sampleStartedAtMs: 10_000,
      sampleEndedAtMs: 15_000,
      lastInteractionAtMs: 14_000,
    };
    expect(creditedActiveMilliseconds({ ...base, visible: false, focused: true })).toBe(0);
    expect(creditedActiveMilliseconds({ ...base, visible: true, focused: false })).toBe(0);
  });

  it("rejette les grands intervalles causés par une veille ou un throttling", () => {
    expect(
      creditedActiveMilliseconds({
        sampleStartedAtMs: 0,
        sampleEndedAtMs: 60_000,
        lastInteractionAtMs: 59_000,
        visible: true,
        focused: true,
      }),
    ).toBe(0);
  });

  it("ne crédite que la partie précédant le seuil d'inactivité", () => {
    expect(
      creditedActiveMilliseconds({
        sampleStartedAtMs: 119_000,
        sampleEndedAtMs: 124_000,
        lastInteractionAtMs: 0,
        visible: true,
        focused: true,
        idleTimeoutMs: 120_000,
      }),
    ).toBe(1_000);
  });

  it("continue pendant la lecture active d'un média", () => {
    expect(
      creditedActiveMilliseconds({
        sampleStartedAtMs: 300_000,
        sampleEndedAtMs: 305_000,
        lastInteractionAtMs: 0,
        visible: true,
        focused: true,
        mediaPlaying: true,
      }),
    ).toBe(5_000);
  });
});

describe("attendance payload", () => {
  it("refuse un chemin hors formation", () => {
    const result = attendanceBatchSchema.safeParse({
      events: [
        {
          eventId: "11111111-1111-4111-8111-111111111111",
          sessionId: "22222222-2222-4222-8222-222222222222",
          sequence: 0,
          startedAt: "2026-08-24T10:00:00.000Z",
          endedAt: "2026-08-24T10:00:20.000Z",
          moduleSlug: null,
          lessonSlug: null,
          pagePath: "/checkout/immobilier",
        },
      ],
    });
    expect(result.success).toBe(false);
  });
});

describe("attendance duration formatting", () => {
  it("formate sans arrondir les preuves", () => {
    expect(attendanceDurationClock(3_661)).toBe("01:01:01");
    expect(formatAttendanceDuration(3_661)).toBe("1 h 01 min");
  });
});
