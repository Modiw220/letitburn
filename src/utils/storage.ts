export function readStorage(key: string): string | null {
  try {
    return localStorage.getItem(key)
  } catch {
    return null
  }
}

export function writeStorage(key: string, value: string): void {
  try {
    localStorage.setItem(key, value)
  } catch {
    /* ignore */
  }
}

export function readNumber(key: string, fallback: number): number {
  const raw = readStorage(key)
  if (!raw) return fallback
  const parsed = Number(raw)
  return Number.isFinite(parsed) ? parsed : fallback
}

export function readBoolean(key: string, fallback: boolean): boolean {
  const raw = readStorage(key)
  if (raw === null) return fallback
  return raw === 'true'
}
