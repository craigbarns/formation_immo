-- La contrainte historique UNIQUE (email, formation_id) n'autorise qu'une ligne
-- par email : le 2e module d'un même achat (ou tout achat suivant) échouait en
-- 409 "duplicate key". La migration 010 n'avait supprimé que l'index
-- user_subscriptions_email_formation_id_idx, pas cette contrainte _key créée
-- hors migrations. L'unicité est assurée par les index partiels de la 010.
alter table public.user_subscriptions
  drop constraint if exists user_subscriptions_email_formation_id_key;
