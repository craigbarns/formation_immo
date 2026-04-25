import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 20;

// ── Upstash Redis (persistent across cold starts) ──────────────────────────
// Falls back to in-memory if env vars are absent (local dev / missing config).
let upstashLimiter: Ratelimit | null = null;

if (
  process.env.UPSTASH_REDIS_REST_URL &&
  process.env.UPSTASH_REDIS_REST_TOKEN
) {
  upstashLimiter = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(MAX_REQUESTS, "60 s"),
    analytics: false,
  });
}

// ── In-memory fallback ─────────────────────────────────────────────────────
interface RateLimitEntry {
  count: number;
  resetAt: number;
}
const store = new Map<string, RateLimitEntry>();

function checkInMemory(key: string): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true, remaining: MAX_REQUESTS - 1 };
  }

  if (entry.count >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: MAX_REQUESTS - entry.count };
}

// ── Public API ─────────────────────────────────────────────────────────────
export async function checkRateLimit(
  key: string
): Promise<{ allowed: boolean; remaining: number }> {
  if (upstashLimiter) {
    const result = await upstashLimiter.limit(key);
    return { allowed: result.success, remaining: result.remaining };
  }
  return checkInMemory(key);
}
