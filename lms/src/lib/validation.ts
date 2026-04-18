import { z } from "zod";

export const CoachMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(5000), // 5KB max per message
});

export const CoachRequestSchema = z.object({
  messages: z.array(CoachMessageSchema).max(50),
  moduleSlug: z.string().max(50).optional(),
  lessonSlug: z.string().max(50).optional(),
  lessonTitle: z.string().max(100).optional(),
});

export const TTSRequestSchema = z.object({
  text: z.string().min(1).max(4096),
});

export const SaveMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(5000),
  moduleSlug: z.string().max(50).optional(),
  lessonSlug: z.string().max(50).optional(),
  lessonTitle: z.string().max(100).optional(),
});
