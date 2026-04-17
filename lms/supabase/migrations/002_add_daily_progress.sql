-- Add daily_progress JSONB column to user_settings for tracking daily learning progress
alter table user_settings add column if not exists daily_progress jsonb;
