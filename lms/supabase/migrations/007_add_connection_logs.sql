create table if not exists public.connection_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  email text,
  started_at timestamptz not null,
  ended_at timestamptz,
  duration_seconds integer,
  module_slug text,
  lesson_slug text,
  created_at timestamptz default now()
);

create index if not exists idx_connection_logs_user_started
  on public.connection_logs(user_id, started_at desc);

create index if not exists idx_connection_logs_user
  on public.connection_logs(user_id);

alter table public.connection_logs enable row level security;

grant select, insert on public.connection_logs to authenticated;

drop policy if exists "Users can insert own logs" on public.connection_logs;
create policy "Users can insert own logs" on public.connection_logs
  for insert with check (auth.uid() = user_id);

drop policy if exists "Users can read own logs" on public.connection_logs;
create policy "Users can read own logs" on public.connection_logs
  for select using (auth.uid() = user_id);
