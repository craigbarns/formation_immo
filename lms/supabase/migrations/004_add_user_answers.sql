create table user_answers (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  question_id text not null,
  module_slug text not null,
  lesson_slug text,
  question_text text,
  selected_answer text,
  correct_answer text,
  is_correct boolean not null,
  time_spent_seconds int,
  source text not null check (source in ('exam', 'quiz')),
  created_at timestamptz default timezone('utc'::text, now())
);

create index idx_user_answers_user_created on user_answers (user_id, created_at desc);
create index idx_user_answers_user_module on user_answers (user_id, module_slug);
create index idx_user_answers_user_incorrect on user_answers (user_id, is_correct) where is_correct = false;

alter table user_answers enable row level security;

create policy "Users can view their own answers"
  on user_answers for select
  using (auth.uid() = user_id);

create policy "Users can insert their own answers"
  on user_answers for insert
  with check (auth.uid() = user_id);
