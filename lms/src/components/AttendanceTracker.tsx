"use client";

import { useEffect } from "react";
import { useParams, usePathname } from "next/navigation";
import {
  ATTENDANCE_HEARTBEAT_MS,
  ATTENDANCE_IDLE_TIMEOUT_MS,
  ATTENDANCE_MAX_BATCH_SIZE,
  ATTENDANCE_SAMPLE_MS,
  attendanceEventSchema,
  creditedActiveMilliseconds,
} from "@/lib/attendance";
import type { AttendanceEventInput } from "@/lib/attendance";

const STORAGE_PREFIX = "attendance-pending-v2";
const MAX_PENDING_EVENTS = 250;
const MAX_EVENT_MS = 40_000;

interface ActiveInterval {
  startedAtMs: number;
  endedAtMs: number;
}

function firstParam(value: string | string[] | undefined): string | null {
  if (Array.isArray(value)) return value[0] || null;
  return value || null;
}

function isMediaPlaying(): boolean {
  return [...document.querySelectorAll("audio, video")].some((element) => {
    const media = element as HTMLMediaElement;
    return !media.paused && !media.ended && media.readyState >= 2;
  });
}

function readPendingEvents(storageKey: string): AttendanceEventInput[] {
  try {
    const value = JSON.parse(localStorage.getItem(storageKey) || "[]");
    if (!Array.isArray(value)) return [];
    const oldestAcceptedAt = Date.now() - 29 * 60_000;
    return value
      .flatMap((candidate) => {
        const parsed = attendanceEventSchema.safeParse(candidate);
        return parsed.success && Date.parse(parsed.data.endedAt) >= oldestAcceptedAt
          ? [parsed.data]
          : [];
      })
      .slice(-MAX_PENDING_EVENTS);
  } catch {
    return [];
  }
}

function persistPendingEvents(storageKey: string, events: AttendanceEventInput[]) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(events.slice(-MAX_PENDING_EVENTS)));
  } catch {
    // Le suivi en mémoire continue si le stockage local est indisponible.
  }
}

export function AttendanceTracker({
  learnerId,
  disabled = false,
}: {
  learnerId: string;
  disabled?: boolean;
}) {
  const params = useParams<{ moduleSlug?: string | string[]; lessonSlug?: string | string[] }>();
  const pathname = usePathname();
  const moduleSlug = firstParam(params.moduleSlug);
  const lessonSlug = firstParam(params.lessonSlug);

  useEffect(() => {
    if (disabled || !learnerId || !pathname.startsWith("/formation")) return;

    const storageKey = `${STORAGE_PREFIX}:${learnerId}`;
    const pendingEvents = readPendingEvents(storageKey);
    const activeIntervals: ActiveInterval[] = [];
    const sessionId = crypto.randomUUID();
    let sequence = 0;
    let sending = false;
    let stopped = false;
    let lastSampleMono = performance.now();
    let lastInteractionMono = lastSampleMono;

    const appendActiveInterval = (startedAtMs: number, endedAtMs: number) => {
      if (endedAtMs <= startedAtMs) return;
      const previous = activeIntervals.at(-1);
      if (previous && startedAtMs - previous.endedAtMs <= 1_000) {
        previous.endedAtMs = Math.max(previous.endedAtMs, endedAtMs);
        return;
      }
      activeIntervals.push({ startedAtMs, endedAtMs });
    };

    const sampleActiveTime = () => {
      const nowMono = performance.now();
      const nowWall = Date.now();
      const mediaPlaying = isMediaPlaying();
      const creditedMs = creditedActiveMilliseconds({
        sampleStartedAtMs: lastSampleMono,
        sampleEndedAtMs: nowMono,
        lastInteractionAtMs: lastInteractionMono,
        visible: document.visibilityState === "visible",
        focused: document.hasFocus(),
        mediaPlaying,
      });

      if (creditedMs > 0) {
        const activeEndMono = mediaPlaying
          ? nowMono
          : Math.min(nowMono, lastInteractionMono + ATTENDANCE_IDLE_TIMEOUT_MS);
        const activeEndWall = nowWall - (nowMono - activeEndMono);
        appendActiveInterval(activeEndWall - creditedMs, activeEndWall);
      }

      lastSampleMono = nowMono;
    };

    const queueActiveIntervals = () => {
      for (const interval of activeIntervals.splice(0)) {
        let cursor = interval.startedAtMs;
        while (interval.endedAtMs - cursor >= 250) {
          const eventEnd = Math.min(interval.endedAtMs, cursor + MAX_EVENT_MS);
          pendingEvents.push({
            eventId: crypto.randomUUID(),
            sessionId,
            sequence: sequence++,
            startedAt: new Date(cursor).toISOString(),
            endedAt: new Date(eventEnd).toISOString(),
            moduleSlug,
            lessonSlug,
            pagePath: pathname,
          });
          cursor = eventEnd;
        }
      }

      if (pendingEvents.length > MAX_PENDING_EVENTS) {
        pendingEvents.splice(0, pendingEvents.length - MAX_PENDING_EVENTS);
      }
      persistPendingEvents(storageKey, pendingEvents);
    };

    const sendPendingEvents = async (useBeacon = false) => {
      const oldestAcceptedAt = Date.now() - 29 * 60_000;
      for (let index = pendingEvents.length - 1; index >= 0; index -= 1) {
        if (Date.parse(pendingEvents[index].endedAt) < oldestAcceptedAt) {
          pendingEvents.splice(index, 1);
        }
      }
      persistPendingEvents(storageKey, pendingEvents);
      if (pendingEvents.length === 0) return;
      const batch = pendingEvents.slice(0, ATTENDANCE_MAX_BATCH_SIZE);
      const payload = JSON.stringify({ events: batch });

      if (useBeacon && navigator.sendBeacon) {
        navigator.sendBeacon(
          "/api/attendance/heartbeat",
          new Blob([payload], { type: "text/plain;charset=UTF-8" }),
        );
        return;
      }

      if (sending || stopped) return;
      sending = true;
      try {
        const response = await fetch("/api/attendance/heartbeat", {
          method: "POST",
          body: payload,
          headers: { "Content-Type": "application/json" },
          credentials: "same-origin",
          cache: "no-store",
          keepalive: true,
        });
        if (!response.ok) return;

        const sentIds = new Set(batch.map((event) => event.eventId));
        for (let index = pendingEvents.length - 1; index >= 0; index -= 1) {
          if (sentIds.has(pendingEvents[index].eventId)) pendingEvents.splice(index, 1);
        }
        persistPendingEvents(storageKey, pendingEvents);
      } catch {
        // La file persistée sera renvoyée au prochain heartbeat ou chargement.
      } finally {
        sending = false;
      }
    };

    const recordInteraction = () => {
      lastInteractionMono = performance.now();
    };

    const flush = (useBeacon = false) => {
      sampleActiveTime();
      queueActiveIntervals();
      void sendPendingEvents(useBeacon);
    };

    const handlePresenceChange = () => {
      flush(false);
      lastSampleMono = performance.now();
      if (document.visibilityState === "visible" && document.hasFocus()) {
        recordInteraction();
      }
    };

    const handlePageHide = () => flush(true);
    const sampleInterval = window.setInterval(sampleActiveTime, ATTENDANCE_SAMPLE_MS);
    const heartbeatInterval = window.setInterval(() => flush(false), ATTENDANCE_HEARTBEAT_MS);
    const interactionEvents: Array<keyof WindowEventMap> = [
      "keydown",
      "pointerdown",
      "scroll",
      "touchstart",
    ];

    interactionEvents.forEach((eventName) =>
      window.addEventListener(eventName, recordInteraction, { passive: true }),
    );
    window.addEventListener("focus", handlePresenceChange);
    window.addEventListener("blur", handlePresenceChange);
    window.addEventListener("pagehide", handlePageHide);
    document.addEventListener("visibilitychange", handlePresenceChange);

    void sendPendingEvents(false);

    return () => {
      window.clearInterval(sampleInterval);
      window.clearInterval(heartbeatInterval);
      interactionEvents.forEach((eventName) =>
        window.removeEventListener(eventName, recordInteraction),
      );
      window.removeEventListener("focus", handlePresenceChange);
      window.removeEventListener("blur", handlePresenceChange);
      window.removeEventListener("pagehide", handlePageHide);
      document.removeEventListener("visibilitychange", handlePresenceChange);
      flush(true);
      stopped = true;
    };
  }, [disabled, learnerId, lessonSlug, moduleSlug, pathname]);

  return null;
}
