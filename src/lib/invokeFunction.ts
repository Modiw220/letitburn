import { supabase, getFunctionsBaseUrl } from '../lib/supabaseClient'

export async function invokeFunction<T>(
  name: string,
  body: unknown,
  options?: { requireAuth?: boolean },
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (options?.requireAuth !== false && session?.access_token) {
    headers.Authorization = `Bearer ${session.access_token}`
  } else if (options?.requireAuth) {
    throw new Error('Sign in is required for this action.')
  } else if (session?.access_token) {
    headers.Authorization = `Bearer ${session.access_token}`
  }

  const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string
  if (anonKey) {
    headers.apikey = anonKey
  }

  const response = await fetch(`${getFunctionsBaseUrl()}/${name}`, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
  })

  const payload = (await response.json().catch(() => ({}))) as T & {
    error?: string
    message?: string
  }

  if (!response.ok) {
    throw new Error(payload.error || payload.message || `Request failed (${response.status})`)
  }

  return payload
}
