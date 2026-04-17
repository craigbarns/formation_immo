-- Add streak_reminder_dismissed to user_settings
alter table user_settings add column if not exists streak_reminder_dismissed jsonb;
