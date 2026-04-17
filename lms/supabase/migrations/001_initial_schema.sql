-- ============================================================
-- LMS Formation Immobilière — Schéma initial Supabase
-- ============================================================

-- 1. Profils étendus (liés à auth.users gérée par Supabase)
-- ============================================================
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  role text default 'student' check (role in ('student', 'admin')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Trigger : créer automatiquement un profil à l'inscription
-- ============================================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. Progression des leçons
-- ============================================================
create table if not exists lesson_progress (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  lesson_key text not null,
  completed boolean default true,
  completed_at timestamptz default now(),
  unique(user_id, lesson_key)
);

-- 3. État gamification
-- ============================================================
create table if not exists gamification_state (
  user_id uuid references auth.users on delete cascade primary key,
  xp int default 0,
  streak int default 0,
  last_login_date text default '',
  total_quiz_correct int default 0,
  total_exams_taken int default 0,
  total_exams_perfect int default 0,
  simulators_used text[] default '{}',
  lesson_times jsonb default '{}',
  exam_scores jsonb default '{}',
  xp_history jsonb default '[]',
  module_timers jsonb default '{}',
  daily_activity jsonb default '{}',
  completed_checklists text[] default '{}',
  flashcards_reviewed int default 0,
  earned_badges text[] default '{}',
  updated_at timestamptz default now()
);

-- 4. Favoris
-- ============================================================
create table if not exists bookmarks (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  module_slug text not null,
  lesson_slug text not null,
  lesson_title text not null,
  module_title text not null,
  created_at timestamptz default now(),
  unique(user_id, module_slug, lesson_slug)
);

-- 5. Notes personnelles
-- ============================================================
create table if not exists notes (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  module_slug text not null,
  lesson_slug text not null,
  content text not null,
  color text default 'yellow',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- 6. Flashcards SM-2
-- ============================================================
create table if not exists flashcards_sm2 (
  user_id uuid references auth.users on delete cascade primary key,
  cards jsonb default '[]',
  updated_at timestamptz default now()
);

-- 7. Résultats examens
-- ============================================================
create table if not exists exam_results (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users on delete cascade not null,
  module_slug text not null,
  score int not null,
  total int not null,
  taken_at timestamptz default now()
);

-- 8. Paramètres utilisateur
-- ============================================================
create table if not exists user_settings (
  user_id uuid references auth.users on delete cascade primary key,
  theme text default 'system',
  daily_goal jsonb default '{"lessonsPerDay":2,"minutesPerDay":30}',
  focus_mode boolean default false,
  updated_at timestamptz default now()
);

-- 9. Row Level Security (RLS)
-- ============================================================
alter table profiles enable row level security;
alter table lesson_progress enable row level security;
alter table gamification_state enable row level security;
alter table bookmarks enable row level security;
alter table notes enable row level security;
alter table flashcards_sm2 enable row level security;
alter table exam_results enable row level security;
alter table user_settings enable row level security;

-- Policies : chaque user ne voit/modifie que ses propres données
-- ============================================================
create policy "Users can view own profile" on profiles
  for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles
  for update using (auth.uid() = id);

create policy "Users can manage own progress" on lesson_progress
  for all using (auth.uid() = user_id);

create policy "Users can manage own gamification" on gamification_state
  for all using (auth.uid() = user_id);

create policy "Users can manage own bookmarks" on bookmarks
  for all using (auth.uid() = user_id);

create policy "Users can manage own notes" on notes
  for all using (auth.uid() = user_id);

create policy "Users can manage own flashcards" on flashcards_sm2
  for all using (auth.uid() = user_id);

create policy "Users can manage own exam results" on exam_results
  for all using (auth.uid() = user_id);

create policy "Users can manage own settings" on user_settings
  for all using (auth.uid() = user_id);

-- 10. Indexes
-- ============================================================
create index if not exists idx_lesson_progress_user on lesson_progress(user_id);
create index if not exists idx_bookmarks_user on bookmarks(user_id);
create index if not exists idx_notes_user on notes(user_id);
create index if not exists idx_exam_results_user on exam_results(user_id);
