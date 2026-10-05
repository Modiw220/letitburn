import { createClient, type SupabaseClient, type User } from 'https://esm.sh/@supabase/supabase-js@2.49.1'

export function getServiceRoleClient(): SupabaseClient {
  const url = Deno.env.get('SUPABASE_URL')
  const key = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (!url || !key) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
  }
  return createClient(url, key, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

export function getUserClient(authHeader: string | null): SupabaseClient {
  const url = Deno.env.get('SUPABASE_URL')
  const anon = Deno.env.get('SUPABASE_ANON_KEY')
  if (!url || !anon) {
    throw new Error('Missing SUPABASE_URL or SUPABASE_ANON_KEY')
  }
  if (!authHeader) {
    throw new Error('Missing Authorization header')
  }
  return createClient(url, anon, {
    global: { headers: { Authorization: authHeader } },
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

export async function requireUser(
  req: Request,
): Promise<{ user: User; userClient: SupabaseClient; admin: SupabaseClient }> {
  const authHeader = req.headers.get('Authorization')
  if (!authHeader) {
    throw new AuthError('Authentication required')
  }
  const userClient = getUserClient(authHeader)
  const {
    data: { user },
    error,
  } = await userClient.auth.getUser()
  if (error || !user) {
    throw new AuthError('Invalid or expired session')
  }
  return { user, userClient, admin: getServiceRoleClient() }
}

export async function optionalUser(
  req: Request,
): Promise<{ user: User | null; userClient: SupabaseClient | null; admin: SupabaseClient }> {
  const authHeader = req.headers.get('Authorization')
  const admin = getServiceRoleClient()
  if (!authHeader) {
    return { user: null, userClient: null, admin }
  }
  try {
    const userClient = getUserClient(authHeader)
    const {
      data: { user },
    } = await userClient.auth.getUser()
    return { user: user ?? null, userClient, admin }
  } catch {
    return { user: null, userClient: null, admin }
  }
}

export class AuthError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'AuthError'
  }
}
