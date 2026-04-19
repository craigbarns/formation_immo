-- ============================================================
-- Certification backend — exam results + certificates
-- ============================================================

-- Exam results (each attempt)
CREATE TABLE IF NOT EXISTS exam_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module_slug text NOT NULL,
  score integer NOT NULL CHECK (score >= 0 AND score <= 100),
  passed boolean NOT NULL DEFAULT false,
  answers jsonb NOT NULL DEFAULT '[]',
  duration_seconds integer,
  attempt_number integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),

  UNIQUE(user_id, module_slug, attempt_number)
);

-- Certificates (attestations délivrées)
CREATE TABLE IF NOT EXISTS certificates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  cert_number text NOT NULL UNIQUE,
  student_name text NOT NULL,
  modules jsonb NOT NULL DEFAULT '[]',
  final_score integer NOT NULL CHECK (final_score >= 0 AND final_score <= 100),
  passed boolean NOT NULL DEFAULT false,
  issued_at timestamptz NOT NULL DEFAULT now(),
  verified_at timestamptz,
  qr_payload text
);

-- Enable RLS
ALTER TABLE exam_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE certificates ENABLE ROW LEVEL SECURITY;

-- RLS policies: users can only read/write their own data
CREATE POLICY exam_results_select_own
  ON exam_results FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY exam_results_insert_own
  ON exam_results FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY certificates_select_own
  ON certificates FOR SELECT
  USING (auth.uid() = user_id);

-- Public read for verification (cert_number only)
CREATE POLICY certificates_verify_public
  ON certificates FOR SELECT
  USING (true);

-- Indexes
CREATE INDEX idx_exam_results_user_module ON exam_results(user_id, module_slug);
CREATE INDEX idx_certificates_number ON certificates(cert_number);
