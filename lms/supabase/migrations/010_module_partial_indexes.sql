-- Vente des modules à l'unité (2/2) : index uniques partiels.
-- ⚠️ N'appliquer qu'APRÈS que le code (grantEntitlement) soit en prod,
-- sinon l'octroi pack de l'ancien code casse (il s'appuie sur l'index droppé).
drop index if exists user_subscriptions_email_formation_id_idx;

-- Un seul accès "pack" par (email, formation) — module_slug IS NULL.
create unique index if not exists user_subscriptions_pack_idx
  on public.user_subscriptions (email, formation_id)
  where module_slug is null;

-- Un seul accès par module par (email, formation) — module_slug renseigné.
create unique index if not exists user_subscriptions_module_idx
  on public.user_subscriptions (email, formation_id, module_slug)
  where module_slug is not null;
