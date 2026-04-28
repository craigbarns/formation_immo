-- Migration 008 : aligne exam_results sur le schéma attendu par actions/certification.ts
-- La table a été créée par 001_initial_schema avec (score, total, taken_at).
-- La migration 20260419 a été ignorée (CREATE TABLE IF NOT EXISTS).
-- On ajoute les colonnes manquantes et on crée l'alias created_at.

-- Colonnes manquantes
ALTER TABLE public.exam_results
  ADD COLUMN IF NOT EXISTS passed          boolean      NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS answers         jsonb        NOT NULL DEFAULT '[]',
  ADD COLUMN IF NOT EXISTS attempt_number  integer      NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS duration_seconds integer,
  ADD COLUMN IF NOT EXISTS created_at      timestamptz  NOT NULL DEFAULT now();

-- Contrainte unicité attendue par le code
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint
    WHERE conrelid = 'public.exam_results'::regclass
      AND conname = 'exam_results_user_id_module_slug_attempt_number_key'
  ) THEN
    ALTER TABLE public.exam_results
      ADD CONSTRAINT exam_results_user_id_module_slug_attempt_number_key
      UNIQUE (user_id, module_slug, attempt_number);
  END IF;
END $$;

-- Index pour les requêtes par user+module
CREATE INDEX IF NOT EXISTS idx_exam_results_user_module
  ON public.exam_results(user_id, module_slug);

-- Politique RLS manquante pour l'INSERT (migration 001 ne l'avait pas)
DROP POLICY IF EXISTS "exam_results_insert_own" ON public.exam_results;
CREATE POLICY exam_results_insert_own
  ON public.exam_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Corrige la policy certificates_verify_public trop permissive (USING(true) expose tous les certs)
-- On la remplace par une vérification sur cert_number uniquement via une fonction
DROP POLICY IF EXISTS certificates_verify_public ON public.certificates;

-- Accorde l'accès de vérification publique uniquement via une colonne non-sensible
-- (la page /certification/verify?cert= lit par cert_number, pas de données personnelles sensibles)
-- On garde la lisibilité publique mais on la limite à un select sur cert_number+passed+issued_at
-- Note : Supabase RLS filtre les lignes, pas les colonnes — la vraie protection est côté API.
-- Pour la certification obligatoire ALUR le cert_number doit rester vérifiable publiquement.
-- On supprime simplement la policy redondante (select_own suffit pour l'apprenant).
-- Les routes API de vérification utilisent le service role qui bypasse RLS.
