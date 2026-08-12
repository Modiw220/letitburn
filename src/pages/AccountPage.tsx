import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import PageSectionIntro from '../components/common/PageSectionIntro'
import { useAuth } from '../context/AuthContext'
import { useEntitlements } from '../context/EntitlementsContext'
import { usePageMeta } from '../hooks/usePageMeta'
import { supabase } from '../lib/supabaseClient'
import type { PurchaseRow } from '../types/database'

interface AccountPageProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

function formatMoney(amountMinor: number, currency: string): string {
  try {
    return new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amountMinor / 100)
  } catch {
    return `${(amountMinor / 100).toFixed(2)} ${currency}`
  }
}

function formatDate(value: string): string {
  try {
    return new Intl.DateTimeFormat(undefined, {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(value))
  } catch {
    return value
  }
}

function AccountPageContent() {
  const { user, loading, displayName, signOut } = useAuth()
  const { entitlements, loading: entitlementsLoading } = useEntitlements()
  const [purchases, setPurchases] = useState<PurchaseRow[]>([])
  const [purchasesLoading, setPurchasesLoading] = useState(false)
  const [purchasesError, setPurchasesError] = useState<string | null>(null)
  const [signingOut, setSigningOut] = useState(false)

  usePageMeta({
    title: 'Account | Let It Burn',
    description:
      'View your Let It Burn profile, restored entitlements, and optional purchase history.',
    canonicalPath: '/account',
  })

  useEffect(() => {
    if (!user) {
      setPurchases([])
      setPurchasesError(null)
      return
    }

    let cancelled = false
    setPurchasesLoading(true)
    setPurchasesError(null)

    void supabase
      .from('purchases')
      .select('*')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (cancelled) return
        if (error) {
          setPurchasesError(error.message)
          setPurchases([])
        } else {
          setPurchases((data as PurchaseRow[] | null) ?? [])
        }
        setPurchasesLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [user])

  async function handleSignOut() {
    setSigningOut(true)
    await signOut()
    setSigningOut(false)
  }

  if (loading) {
    return (
      <main className="page-shell page-shell--editorial py-8 md:py-12">
        <div className="content-container max-w-[960px]">
          <section className="rounded-[28px] border border-border-card bg-bg-card/75 p-6 md:p-8">
            <p className="text-sm text-text-muted">Loading your account…</p>
          </section>
        </div>
      </main>
    )
  }

  if (!user) {
    return (
      <main className="page-shell page-shell--editorial py-8 md:py-12">
        <div className="content-container max-w-[960px]">
          <section className="rounded-[28px] border border-border-card bg-bg-card/75 p-6 md:p-8 lg:p-10">
            <PageSectionIntro
              eyebrow="Account"
              title="Sign in to see your purchases."
              description="Free tools do not need an account. Sign in when you want to restore optional upgrades or review receipts."
              actions={
                <Link
                  to="/auth?next=/account"
                  className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-calm-cyan/40 bg-calm-cyan/15 px-6 py-3 text-sm font-semibold text-calm-cyan transition-colors hover:bg-calm-cyan/20"
                >
                  Sign in
                </Link>
              }
            />
          </section>
        </div>
      </main>
    )
  }

  return (
    <main className="page-shell page-shell--editorial py-8 md:py-12">
      <div className="content-container max-w-[960px] space-y-6">
        <section className="rounded-[28px] border border-border-card bg-bg-card/75 p-6 md:p-8 lg:p-10">
          <PageSectionIntro
            eyebrow="Account"
            title="Your calm dashboard."
            description="Profile details, active entitlements, and purchase history stay here so free tools can stay light."
          />

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <article className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
              <h2 className="font-heading text-lg font-semibold text-text-main">Profile</h2>
              <dl className="mt-4 space-y-3 text-sm">
                <div>
                  <dt className="text-text-muted">Display name</dt>
                  <dd className="mt-1 text-text-main">{displayName || 'Not set'}</dd>
                </div>
                <div>
                  <dt className="text-text-muted">Email</dt>
                  <dd className="mt-1 text-text-main">{user.email ?? 'Unavailable'}</dd>
                </div>
              </dl>
            </article>

            <article className="rounded-2xl border border-calm-cyan/20 bg-calm-cyan/6 p-5">
              <h2 className="font-heading text-lg font-semibold text-text-main">Quick links</h2>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  to="/pricing"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/12 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-text-main"
                >
                  Pricing
                </Link>
                <Link
                  to="/support"
                  className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/12 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-text-main"
                >
                  Support
                </Link>
                <button
                  type="button"
                  onClick={() => void handleSignOut()}
                  disabled={signingOut}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-xl border border-white/12 bg-white/[0.04] px-4 py-2.5 text-sm font-medium text-text-main disabled:opacity-50"
                >
                  {signingOut ? 'Signing out…' : 'Sign out'}
                </button>
              </div>
            </article>
          </div>
        </section>

        <section className="rounded-[28px] border border-border-card bg-bg-card/75 p-6 md:p-8">
          <h2 className="font-heading text-xl font-semibold text-text-main">Entitlements</h2>
          <p className="mt-2 text-sm text-text-muted">
            Active access restored to this account.
          </p>

          {entitlementsLoading ? (
            <p className="mt-4 text-sm text-text-muted">Loading entitlements…</p>
          ) : entitlements.length === 0 ? (
            <p className="mt-4 text-sm text-text-muted">
              No active entitlements yet.{' '}
              <Link to="/pricing" className="text-calm-cyan hover:underline">
                Browse optional upgrades
              </Link>
              .
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {entitlements.map((item) => (
                <li
                  key={item.id}
                  className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm"
                >
                  <p className="font-medium text-text-main">{item.product_id}</p>
                  <p className="mt-1 text-text-muted">
                    {item.entitlement_type}
                    {item.pack_id ? ` · pack ${item.pack_id}` : ''}
                    {item.expires_at ? ` · expires ${formatDate(item.expires_at)}` : ' · no expiry'}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="rounded-[28px] border border-border-card bg-bg-card/75 p-6 md:p-8">
          <h2 className="font-heading text-xl font-semibold text-text-main">Purchases</h2>
          <p className="mt-2 text-sm text-text-muted">
            Recent optional purchases linked to this account.
          </p>

          {purchasesLoading ? (
            <p className="mt-4 text-sm text-text-muted">Loading purchases…</p>
          ) : purchasesError ? (
            <p className="mt-4 text-sm text-bright-orange" role="alert">
              Could not load purchases: {purchasesError}
            </p>
          ) : purchases.length === 0 ? (
            <p className="mt-4 text-sm text-text-muted">No purchases yet.</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {purchases.map((purchase) => (
                <li
                  key={purchase.id}
                  className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <p className="font-medium text-text-main">
                      {purchase.product_id ?? purchase.purchase_type}
                    </p>
                    <p className="text-calm-cyan">
                      {formatMoney(purchase.amount_minor, purchase.currency)}
                    </p>
                  </div>
                  <p className="mt-1 text-text-muted">
                    {purchase.status} · {formatDate(purchase.created_at)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}

export default function AccountPage({ theme, onToggleTheme }: AccountPageProps) {
  return (
    <>
      <Header theme={theme} onToggleTheme={onToggleTheme} />
      <AccountPageContent />
      <Footer />
    </>
  )
}
