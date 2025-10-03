export function validatePrompt(text: string): string | null {
  const trimmed = text.trim()
  if (!trimmed) return 'Please enter a prompt.'
  if (trimmed.length > 10000) return 'Prompt is too long. Maximum is 10,000 characters.'
  return null
}


