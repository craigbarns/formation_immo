-- Distributed API rate limiting backed by Supabase Postgres.
-- Only the service role can execute the RPC; application users never access
-- the counters directly.

create table if not exists public.api_rate_limits (
  rate_key text primary key,
  window_started_at timestamptz not null default now(),
  request_count integer not null default 1 check (request_count >= 0),
  updated_at timestamptz not null default now()
);

alter table public.api_rate_limits enable row level security;
revoke all on table public.api_rate_limits from anon, authenticated;

create or replace function public.check_api_rate_limit(
  p_key text,
  p_max_requests integer default 20,
  p_window_seconds integer default 60
)
returns table(allowed boolean, remaining integer)
language plpgsql
security definer
set search_path = public
as $$
declare
  current_count integer;
  now_ts timestamptz := statement_timestamp();
begin
  if p_key is null or length(p_key) = 0 or length(p_key) > 256 then
    raise exception 'Invalid rate-limit key';
  end if;
  if p_max_requests < 1 or p_window_seconds < 1 then
    raise exception 'Invalid rate-limit configuration';
  end if;

  insert into public.api_rate_limits as limits (
    rate_key,
    window_started_at,
    request_count,
    updated_at
  )
  values (p_key, now_ts, 1, now_ts)
  on conflict (rate_key) do update
  set
    request_count = case
      when limits.window_started_at <= now_ts - make_interval(secs => p_window_seconds)
        then 1
      else limits.request_count + 1
    end,
    window_started_at = case
      when limits.window_started_at <= now_ts - make_interval(secs => p_window_seconds)
        then now_ts
      else limits.window_started_at
    end,
    updated_at = now_ts
  returning request_count into current_count;

  return query select
    current_count <= p_max_requests,
    greatest(p_max_requests - current_count, 0);
end;
$$;

revoke all on function public.check_api_rate_limit(text, integer, integer)
  from public, anon, authenticated;
grant execute on function public.check_api_rate_limit(text, integer, integer)
  to service_role;
