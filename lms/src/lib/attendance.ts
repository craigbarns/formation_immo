import { z } from "zod";

export const ATTENDANCE_HEARTBEAT_MS = 20_000;
export const ATTENDANCE_SAMPLE_MS = 5_000;
export const ATTENDANCE_MAX_SAMPLE_GAP_MS = 15_000;
export const ATTENDANCE_IDLE_TIMEOUT_MS = 2 * 60_000;
export const ATTENDANCE_MAX_EVENT_SECONDS = 45;
export const ATTENDANCE_MAX_BATCH_SIZE = 25;

export const attendanceEventSchema = z.object({
  eventId: z.uuid(),
  sessionId: z.uuid(),
  sequence: z.number().int().min(0).max(1_000_000),
  startedAt: z.iso.datetime({ offset: true }),
  endedAt: z.iso.datetime({ offset: true }),
  moduleSlug: z.string().trim().min(1).max(120).nullable(),
  lessonSlug: z.string().trim().min(1).max(120).nullable(),
  pagePath: z.string().trim().startsWith("/formation").max(500),
});

export const attendanceBatchSchema = z.object({
  events: z.array(attendanceEventSchema).min(1).max(ATTENDANCE_MAX_BATCH_SIZE),
});

export type AttendanceEventInput = z.infer<typeof attendanceEventSchema>;

export interface ActiveSampleInput {
  sampleStartedAtMs: number;
  sampleEndedAtMs: number;
  lastInteractionAtMs: number;
  visible: boolean;
  focused: boolean;
  mediaPlaying?: boolean;
  idleTimeoutMs?: number;
  maxSampleGapMs?: number;
}

/**
 * Returns only the foreground, non-idle part of a sampling interval.
 * Long gaps (browser throttling, suspended laptop) are deliberately rejected.
 */
export function creditedActiveMilliseconds({
  sampleStartedAtMs,
  sampleEndedAtMs,
  lastInteractionAtMs,
  visible,
  focused,
  mediaPlaying = false,
  idleTimeoutMs = ATTENDANCE_IDLE_TIMEOUT_MS,
  maxSampleGapMs = ATTENDANCE_MAX_SAMPLE_GAP_MS,
}: ActiveSampleInput): number {
  const elapsed = sampleEndedAtMs - sampleStartedAtMs;
  if (!visible || !focused || elapsed <= 0 || elapsed > maxSampleGapMs) return 0;
  if (mediaPlaying) return elapsed;

  const activeUntil = lastInteractionAtMs + idleTimeoutMs;
  return Math.max(0, Math.min(sampleEndedAtMs, activeUntil) - sampleStartedAtMs);
}

export function formatAttendanceDuration(totalSeconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;

  if (hours > 0) return `${hours} h ${minutes.toString().padStart(2, "0")} min`;
  if (minutes > 0) return `${minutes} min ${seconds.toString().padStart(2, "0")} s`;
  return `${seconds} s`;
}

export function attendanceDurationClock(totalSeconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds));
  const hours = Math.floor(safeSeconds / 3600);
  const minutes = Math.floor((safeSeconds % 3600) / 60);
  const seconds = safeSeconds % 60;
  return [hours, minutes, seconds]
    .map((value) => value.toString().padStart(2, "0"))
    .join(":");
}
