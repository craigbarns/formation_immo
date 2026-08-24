-- Auditable attendance v2.
--
-- New evidence is immutable, short, foreground-only heartbeat intervals.
-- Legacy connection_logs remain untouched for auditability, but reporting caps
-- each legacy interval at 60 seconds and merges overlaps. This neutralizes the
-- historical duplicate/background-time bug without rewriting source records.

begin;

create table if not exists public.attendance_identities (
  user_id uuid primary key,
  email text,
  full_name text,
  first_seen_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now()
);

create table if not exists public.attendance_events (
  id uuid primary key,
  user_id uuid not null,
  session_id uuid not null,
  sequence_no integer not null check (sequence_no between 0 and 1000000),
  started_at timestamptz not null,
  ended_at timestamptz not null,
  module_slug text,
  lesson_slug text,
  page_path text not null,
  evidence_source text not null default 'active-heartbeat-v2'
    check (evidence_source = 'active-heartbeat-v2'),
  recorded_at timestamptz not null default now(),
  check (ended_at > started_at),
  check (ended_at - started_at <= interval '45 seconds'),
  check (length(page_path) between 1 and 500),
  check (module_slug is null or length(module_slug) <= 120),
  check (lesson_slug is null or length(lesson_slug) <= 120),
  unique (user_id, session_id, sequence_no)
);

create index if not exists idx_attendance_events_user_started
  on public.attendance_events (user_id, started_at, ended_at);
create index if not exists idx_attendance_events_recorded
  on public.attendance_events (recorded_at);

alter table public.attendance_events enable row level security;
alter table public.attendance_identities enable row level security;

revoke all on public.attendance_events from public, anon, authenticated;
revoke all on public.attendance_identities from public, anon, authenticated;

-- Preserve identity snapshots for existing evidence without exposing names in
-- client-side tracking payloads.
insert into public.attendance_identities (
  user_id,
  email,
  full_name,
  first_seen_at,
  last_seen_at
)
select
  logs.user_id,
  max(logs.email),
  max(profiles.full_name),
  min(logs.started_at),
  max(coalesce(logs.ended_at, logs.started_at))
from public.connection_logs as logs
left join public.profiles as profiles on profiles.id = logs.user_id
group by logs.user_id
on conflict (user_id) do update set
  email = coalesce(public.attendance_identities.email, excluded.email),
  full_name = coalesce(public.attendance_identities.full_name, excluded.full_name),
  first_seen_at = least(public.attendance_identities.first_seen_at, excluded.first_seen_at),
  last_seen_at = greatest(public.attendance_identities.last_seen_at, excluded.last_seen_at);

-- V1 accepted client-controlled wall-clock durations and must now be read-only.
revoke insert on public.connection_logs from authenticated;
drop policy if exists "Users can insert own logs" on public.connection_logs;

-- Keep legacy proof rows even when an authentication account is later removed.
alter table public.connection_logs
  drop constraint if exists connection_logs_user_id_fkey;

create or replace function public.record_attendance_events(p_events jsonb)
returns integer
language plpgsql
security definer
set search_path = pg_catalog, public, auth
as $$
declare
  event_payload jsonb;
  event_id uuid;
  session_id uuid;
  sequence_no integer;
  event_started_at timestamptz;
  event_ended_at timestamptz;
  module_slug text;
  lesson_slug text;
  page_path text;
  current_user_id uuid := auth.uid();
  server_now timestamptz := clock_timestamp();
  inserted_count integer := 0;
begin
  if current_user_id is null then
    raise exception 'Authentication required';
  end if;
  if jsonb_typeof(p_events) <> 'array' then
    raise exception 'Attendance payload must be an array';
  end if;
  if jsonb_array_length(p_events) < 1 or jsonb_array_length(p_events) > 25 then
    raise exception 'Attendance batch size is invalid';
  end if;

  insert into public.attendance_identities (
    user_id,
    email,
    full_name,
    first_seen_at,
    last_seen_at
  )
  select
    current_user_id,
    nullif(auth.jwt()->>'email', ''),
    profiles.full_name,
    server_now,
    server_now
  from (select 1) as seed
  left join public.profiles as profiles on profiles.id = current_user_id
  on conflict (user_id) do update set
    email = coalesce(public.attendance_identities.email, excluded.email),
    full_name = coalesce(excluded.full_name, public.attendance_identities.full_name),
    last_seen_at = excluded.last_seen_at;

  for event_payload in select value from jsonb_array_elements(p_events)
  loop
    event_id := (event_payload->>'eventId')::uuid;
    session_id := (event_payload->>'sessionId')::uuid;
    sequence_no := (event_payload->>'sequence')::integer;
    event_started_at := (event_payload->>'startedAt')::timestamptz;
    event_ended_at := (event_payload->>'endedAt')::timestamptz;
    module_slug := nullif(btrim(event_payload->>'moduleSlug'), '');
    lesson_slug := nullif(btrim(event_payload->>'lessonSlug'), '');
    page_path := btrim(event_payload->>'pagePath');

    if sequence_no not between 0 and 1000000
      or event_ended_at <= event_started_at
      or event_ended_at - event_started_at > interval '45 seconds'
      or event_ended_at - event_started_at < interval '0.25 seconds'
      or event_started_at < server_now - interval '30 minutes'
      or event_ended_at > server_now + interval '5 minutes'
      or page_path not like '/formation%'
      or length(page_path) > 500
      or (module_slug is not null and length(module_slug) > 120)
      or (lesson_slug is not null and length(lesson_slug) > 120)
    then
      raise exception 'Invalid attendance event';
    end if;

    insert into public.attendance_events (
      id,
      user_id,
      session_id,
      sequence_no,
      started_at,
      ended_at,
      module_slug,
      lesson_slug,
      page_path
    )
    values (
      event_id,
      current_user_id,
      session_id,
      sequence_no,
      event_started_at,
      event_ended_at,
      module_slug,
      lesson_slug,
      page_path
    )
    on conflict do nothing;

    if found then inserted_count := inserted_count + 1; end if;
  end loop;

  return inserted_count;
end;
$$;

revoke all on function public.record_attendance_events(jsonb) from public, anon;
grant execute on function public.record_attendance_events(jsonb) to authenticated;

create or replace function public.attendance_source_intervals(p_learner_id uuid default null)
returns table (
  user_id uuid,
  started_at timestamptz,
  ended_at timestamptz,
  module_slug text,
  lesson_slug text,
  page_path text,
  evidence_quality text
)
language sql
stable
security definer
set search_path = pg_catalog, public
as $$
  select
    events.user_id,
    events.started_at,
    events.ended_at,
    events.module_slug,
    events.lesson_slug,
    events.page_path,
    'verified-active'::text
  from public.attendance_events as events
  where p_learner_id is null or events.user_id = p_learner_id

  union all

  select
    logs.user_id,
    logs.started_at,
    logs.started_at
      + least(greatest(logs.duration_seconds, 0), 60) * interval '1 second',
    logs.module_slug,
    logs.lesson_slug,
    case
      when logs.module_slug is not null and logs.lesson_slug is not null
        then '/formation/' || logs.module_slug || '/' || logs.lesson_slug
      when logs.module_slug is not null then '/formation/' || logs.module_slug
      else '/formation'
    end,
    'historical-normalized'::text
  from public.connection_logs as logs
  where logs.duration_seconds > 0
    and (p_learner_id is null or logs.user_id = p_learner_id);
$$;

revoke all on function public.attendance_source_intervals(uuid)
  from public, anon, authenticated;

create or replace function public.get_attendance_totals()
returns table (
  user_id uuid,
  total_active_seconds bigint,
  verified_active_seconds bigint,
  historical_active_seconds bigint,
  first_activity_at timestamptz,
  last_activity_at timestamptz,
  evidence_events bigint
)
language sql
stable
security definer
set search_path = pg_catalog, public
as $$
  with source as (
    select * from public.attendance_source_intervals(null)
  ),
  total_ranges as (
    select
      source.user_id,
      range_agg(tstzrange(source.started_at, source.ended_at, '[)')) as ranges,
      min(source.started_at) as first_activity_at,
      max(source.ended_at) as last_activity_at,
      count(*)::bigint as evidence_events
    from source
    group by source.user_id
  ),
  total_seconds as (
    select
      totals.user_id,
      floor(sum(extract(epoch from upper(active_range) - lower(active_range))))::bigint
        as active_seconds
    from total_ranges as totals
    cross join lateral unnest(totals.ranges) as active_range
    group by totals.user_id
  ),
  quality_ranges as (
    select
      source.user_id,
      source.evidence_quality,
      range_agg(tstzrange(source.started_at, source.ended_at, '[)')) as ranges
    from source
    group by source.user_id, source.evidence_quality
  ),
  quality_seconds as (
    select
      quality.user_id,
      quality.evidence_quality,
      floor(sum(extract(epoch from upper(active_range) - lower(active_range))))::bigint
        as active_seconds
    from quality_ranges as quality
    cross join lateral unnest(quality.ranges) as active_range
    group by quality.user_id, quality.evidence_quality
  )
  select
    totals.user_id,
    seconds.active_seconds,
    coalesce(max(quality.active_seconds) filter (
      where quality.evidence_quality = 'verified-active'
    ), 0)::bigint,
    coalesce(max(quality.active_seconds) filter (
      where quality.evidence_quality = 'historical-normalized'
    ), 0)::bigint,
    totals.first_activity_at,
    totals.last_activity_at,
    totals.evidence_events
  from total_ranges as totals
  join total_seconds as seconds on seconds.user_id = totals.user_id
  left join quality_seconds as quality on quality.user_id = totals.user_id
  group by
    totals.user_id,
    seconds.active_seconds,
    totals.first_activity_at,
    totals.last_activity_at,
    totals.evidence_events;
$$;

revoke all on function public.get_attendance_totals()
  from public, anon, authenticated;
grant execute on function public.get_attendance_totals() to service_role;

create or replace function public.get_learner_attendance_sessions(p_learner_id uuid)
returns table (
  session_key text,
  started_at timestamptz,
  ended_at timestamptz,
  active_seconds bigint,
  module_slugs text[],
  lesson_slugs text[],
  page_paths text[],
  evidence_events bigint,
  evidence_quality text
)
language sql
stable
security definer
set search_path = pg_catalog, public
as $$
  with source as (
    select *
    from public.attendance_source_intervals(p_learner_id)
  ),
  ordered as (
    select
      source.*,
      max(source.ended_at) over (
        order by source.started_at, source.ended_at
        rows between unbounded preceding and 1 preceding
      ) as previous_max_end
    from source
  ),
  marked as (
    select
      ordered.*,
      case
        when ordered.previous_max_end is null
          or ordered.started_at > ordered.previous_max_end + interval '2 minutes'
          then 1
        else 0
      end as starts_new_session
    from ordered
  ),
  grouped as (
    select
      marked.*,
      sum(marked.starts_new_session) over (
        order by marked.started_at, marked.ended_at
      ) as session_number
    from marked
  ),
  bundled as (
    select
      grouped.session_number,
      min(grouped.started_at) as started_at,
      max(grouped.ended_at) as ended_at,
      range_agg(tstzrange(grouped.started_at, grouped.ended_at, '[)')) as ranges,
      coalesce(
        array_agg(distinct grouped.module_slug)
          filter (where grouped.module_slug is not null),
        '{}'::text[]
      ) as module_slugs,
      coalesce(
        array_agg(distinct grouped.lesson_slug)
          filter (where grouped.lesson_slug is not null),
        '{}'::text[]
      ) as lesson_slugs,
      coalesce(
        array_agg(distinct grouped.page_path)
          filter (where grouped.page_path is not null),
        '{}'::text[]
      ) as page_paths,
      count(*)::bigint as evidence_events,
      case
        when bool_and(grouped.evidence_quality = 'verified-active') then 'verified-active'
        when bool_and(grouped.evidence_quality = 'historical-normalized')
          then 'historical-normalized'
        else 'mixed'
      end as evidence_quality
    from grouped
    group by grouped.session_number
  )
  select
    md5(p_learner_id::text || bundled.started_at::text || bundled.session_number::text),
    bundled.started_at,
    bundled.ended_at,
    (
      select floor(sum(extract(epoch from upper(active_range) - lower(active_range))))::bigint
      from unnest(bundled.ranges) as active_range
    ) as active_seconds,
    bundled.module_slugs,
    bundled.lesson_slugs,
    bundled.page_paths,
    bundled.evidence_events,
    bundled.evidence_quality
  from bundled
  order by bundled.started_at desc;
$$;

revoke all on function public.get_learner_attendance_sessions(uuid)
  from public, anon, authenticated;
grant execute on function public.get_learner_attendance_sessions(uuid) to service_role;

commit;
