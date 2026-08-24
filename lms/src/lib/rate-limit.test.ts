import { afterEach, describe, expect, it, vi } from "vitest";

afterEach(() => {
  vi.doUnmock("@/lib/supabase/admin");
  vi.restoreAllMocks();
  vi.resetModules();
});

describe("checkRateLimit", () => {
  it("uses the distributed Supabase result", async () => {
    const single = vi.fn().mockResolvedValue({
      data: { allowed: true, remaining: 12 },
      error: null,
    });
    const rpc = vi.fn(() => ({ single }));

    vi.doMock("@/lib/supabase/admin", () => ({
      createAdminClient: () => ({ rpc }),
    }));

    const { checkRateLimit } = await import("./rate-limit");
    await expect(checkRateLimit("user:distributed")).resolves.toEqual({
      allowed: true,
      remaining: 12,
    });
    expect(rpc).toHaveBeenCalledWith("check_api_rate_limit", {
      p_key: "user:distributed",
      p_max_requests: 20,
      p_window_seconds: 60,
    });
  });

  it("falls back to memory and opens the circuit after a database error", async () => {
    const single = vi.fn().mockResolvedValue({
      data: null,
      error: new Error("database unavailable"),
    });
    const rpc = vi.fn(() => ({ single }));
    vi.spyOn(console, "error").mockImplementation(() => {});

    vi.doMock("@/lib/supabase/admin", () => ({
      createAdminClient: () => ({ rpc }),
    }));

    const { checkRateLimit } = await import("./rate-limit");
    await expect(checkRateLimit("user:fallback")).resolves.toEqual({
      allowed: true,
      remaining: 19,
    });
    await expect(checkRateLimit("user:fallback")).resolves.toEqual({
      allowed: true,
      remaining: 18,
    });
    expect(rpc).toHaveBeenCalledTimes(1);
  });
});
