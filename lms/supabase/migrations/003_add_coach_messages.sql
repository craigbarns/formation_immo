-- Table pour persister les conversations avec Marie
create table if not exists public.coach_messages (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  role text not null check (role in ('user', 'assistant')),
  content text not null,
  module_slug text,
  lesson_slug text,
  lesson_title text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index pour récupérer l'historique rapidement
create index if not exists idx_coach_messages_user_created
  on public.coach_messages(user_id, created_at desc);

-- RLS : l'utilisateur ne voit que SES messages
alter table public.coach_messages enable row level security;

create policy "Users can read own messages"
  on public.coach_messages for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can insert own messages"
  on public.coach_messages for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can delete own messages"
  on public.coach_messages for delete
  to authenticated
  using (auth.uid() = user_id);
