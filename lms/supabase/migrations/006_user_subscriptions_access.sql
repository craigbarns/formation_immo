-- Manual and Stripe-backed full access for the immobilier formation.
create table if not exists public.user_subscriptions (
  id uuid default gen_random_uuid() primary key,
  email text not null,
  formation_id text not null default 'immobilier',
  status text not null default 'active' check (status in ('active', 'inactive', 'cancelled', 'refunded')),
  user_id uuid references auth.users(id) on delete set null,
  stripe_session_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.user_subscriptions add column if not exists id uuid default gen_random_uuid();
alter table public.user_subscriptions add column if not exists email text;
alter table public.user_subscriptions add column if not exists formation_id text default 'immobilier';
alter table public.user_subscriptions add column if not exists status text default 'active';
alter table public.user_subscriptions add column if not exists user_id uuid references auth.users(id) on delete set null;
alter table public.user_subscriptions add column if not exists stripe_session_id text;
alter table public.user_subscriptions add column if not exists created_at timestamptz default now();
alter table public.user_subscriptions add column if not exists updated_at timestamptz default now();

create unique index if not exists user_subscriptions_email_formation_id_idx
  on public.user_subscriptions (email, formation_id);

create index if not exists idx_user_subscriptions_user
  on public.user_subscriptions(user_id);

alter table public.user_subscriptions enable row level security;

drop policy if exists "Users can view own subscriptions" on public.user_subscriptions;
create policy "Users can view own subscriptions" on public.user_subscriptions
  for select using (
    auth.uid() = user_id
    or lower(auth.jwt()->>'email') = lower(email)
  );
