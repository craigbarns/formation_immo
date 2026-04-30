-- Add gender field to profiles for attestation (M = Monsieur, F = Madame)
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS gender text CHECK (gender IN ('M', 'F'));

-- Add learner status/job title
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS learner_status text DEFAULT 'Agent Immobilier';

-- Add PDF URL to certificates table
ALTER TABLE certificates ADD COLUMN IF NOT EXISTS pdf_url text;
ALTER TABLE certificates ADD COLUMN IF NOT EXISTS pdf_path text;

-- Index for faster lookups
CREATE INDEX IF NOT EXISTS idx_certificates_user_passed ON certificates(user_id, passed) WHERE passed = true;
