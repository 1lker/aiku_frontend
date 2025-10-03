import { z } from "zod";

export const promptSchema = z
  .string()
  .min(1, "Please enter a prompt.")
  .max(10000, "Prompt is too long. Maximum is 10,000 characters.");

export function validatePrompt(text: string): string | null {
  const result = promptSchema.safeParse(text.trim());
  if (!result.success) {
    return result.error.issues[0].message;
  }
  return null;
}
