import { createAdminClient } from "@/lib/supabase/admin";

const WINDOW_MS = 60_000;
const MAX_REQUESTS = 20;
const DATABASE_RETRY_DELAY_MS = 60_000;

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
}

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

interface DatabaseRateLimitRow {
  allowed: boolean;
  remaining: number;
}

const store = new Map<string, RateLimitEntry>();
let databaseRetryAfter = 0;

function checkInMemory(key: string): RateLimitResult {
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

async function checkInSupabase(key: string): Promise<RateLimitResult> {
  const admin = createAdminClient();
  const { data, error } = await admin
    .rpc("check_api_rate_limit", {
      p_key: key,
      p_max_requests: MAX_REQUESTS,
      p_window_seconds: WINDOW_MS / 1000,
    })
    .single();

  if (error) throw error;

  const row = data as DatabaseRateLimitRow | null;
  if (!row || typeof row.allowed !== "boolean" || typeof row.remaining !== "number") {
    throw new Error("Invalid Supabase rate-limit response");
  }

  return row;
}

/**
 * Distributed rate limit backed by Supabase. If the database or RPC is
 * temporarily unavailable, a per-instance limiter keeps the endpoint usable
 * and a short circuit breaker prevents a request storm against the backend.
 */
export async function checkRateLimit(key: string): Promise<RateLimitResult> {
  const now = Date.now();
  if (now < databaseRetryAfter) return checkInMemory(key);

  try {
    const result = await checkInSupabase(key);
    databaseRetryAfter = 0;
    return result;
  } catch (error) {
    databaseRetryAfter = now + DATABASE_RETRY_DELAY_MS;
    console.error("[rate-limit] Supabase unavailable; using in-memory fallback", error);
    return checkInMemory(key);
  }
}
