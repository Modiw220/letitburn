const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function validateEmail(email: string): boolean {
  const trimmed = email.trim()
  if (!trimmed || trimmed.length > 254) return false
  return EMAIL_PATTERN.test(trimmed)
}
