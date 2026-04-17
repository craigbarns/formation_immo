-- ============================================================
-- Migration 003 — Test de positionnement
-- ============================================================

create table if not exists placement_results (
  user_id uuid references auth.users on delete cascade primary key,
  score int not null,
  total_questions int not null,
  percentage int not null,
  level text not null check (level in ('debutant', 'intermediaire', 'avance')),
  module_scores jsonb default '{}',
  weak_modules text[] default '{}',
  strong_modules text[] default '{}',
  answers jsonb default '{}',
  created_at timestamptz default now()
);

alter table placement_results enable row level security;

create policy "Users can manage own placement results" on placement_results
  for all using (auth.uid() = user_id);
