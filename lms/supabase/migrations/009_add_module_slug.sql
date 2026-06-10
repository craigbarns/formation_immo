-- Vente des modules à l'unité (1/2) : ajoute la granularité "module".
-- Additif & sans risque : l'ancien code ignore cette colonne.
-- module_slug NULL = pack (tous les modules).
alter table public.user_subscriptions
  add column if not exists module_slug text;
