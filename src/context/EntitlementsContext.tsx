import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { supabase } from '../lib/supabaseClient'
import type { EntitlementRow } from '../types/database'
import { useAuth } from './AuthContext'

interface EntitlementsContextValue {
  entitlements: EntitlementRow[]
  loading: boolean
  refresh: () => Promise<void>
  hasEntitlement: (productId: string, packId?: string | null) => boolean
  hasEntitlementType: (entitlementType: string) => boolean
  hasPack: (packId: string) => boolean
  isAdFree: boolean
  hasSoundMixer: boolean
}

const EntitlementsContext = createContext<EntitlementsContextValue | null>(null)

function isActive(row: EntitlementRow): boolean {
  if (!row.expires_at) return true
  return new Date(row.expires_at).getTime() > Date.now()
}

export function EntitlementsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth()
  const [entitlements, setEntitlements] = useState<EntitlementRow[]>([])
  const [loading, setLoading] = useState(false)

  const refresh = useCallback(async () => {
    if (!user) {
      setEntitlements([])
      return
    }
    setLoading(true)
    const { data } = await supabase.from('entitlements').select('*').eq('user_id', user.id)
    setEntitlements((data as EntitlementRow[] | null)?.filter(isActive) ?? [])
    setLoading(false)
  }, [user])

  useEffect(() => {
    void refresh()
  }, [refresh])

  const hasEntitlement = useCallback(
    (productId: string, packId?: string | null) =>
      entitlements.some(
        (e) =>
          e.product_id === productId &&
          (packId == null ? true : e.pack_id === packId),
      ),
    [entitlements],
  )

  const hasEntitlementType = useCallback(
    (entitlementType: string) =>
      entitlements.some((e) => e.entitlement_type === entitlementType),
    [entitlements],
  )

  const hasPack = useCallback(
    (packId: string) => entitlements.some((e) => e.pack_id === packId),
    [entitlements],
  )

  const value = useMemo(
    () => ({
      entitlements,
      loading,
      refresh,
      hasEntitlement,
      hasEntitlementType,
      hasPack,
      isAdFree: entitlements.some((e) => e.entitlement_type === 'ad-removal'),
      hasSoundMixer: entitlements.some(
        (e) => e.product_id === 'sound-mixer' || e.entitlement_type === 'feature-access',
      ),
    }),
    [entitlements, loading, refresh, hasEntitlement, hasEntitlementType, hasPack],
  )

  return (
    <EntitlementsContext.Provider value={value}>{children}</EntitlementsContext.Provider>
  )
}

export function useEntitlements(): EntitlementsContextValue {
  const ctx = useContext(EntitlementsContext)
  if (!ctx) throw new Error('useEntitlements must be used within EntitlementsProvider')
  return ctx
}
