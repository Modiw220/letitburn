import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import PageSectionIntro from '../components/common/PageSectionIntro'
import { useAuth } from '../context/AuthContext'
import { usePageMeta } from '../hooks/usePageMeta'

interface AuthPageProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

type AuthMode = 'sign-in' | 'sign-up' | 'magic-link'

function safeNextPath(raw: string | null): string {
  if (!raw || !raw.startsWith('/') || raw.startsWith('//')) return '/account'
  return raw
}

function AuthPageContent() {
  const { user, loading, signInWithPassword, signUpWithPassword, signInWithMagicLink } = useAuth()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const nextPath = useMemo(() => safeNextPath(searchParams.get('next')), [searchParams])

  const [mode, setMode] = useState<AuthMode>('sign-in')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [magicLinkSent, setMagicLinkSent] = useState(false)

  usePageMeta({
    title: 'Sign in | Let It Burn',
    description:
      'Sign in to Let It Burn to restore optional purchases and keep your account details in one calm place.',
    canonicalPath: '/auth',
  })

  useEffect(() => {
    if (!loading && user) {
      navigate(nextPath, { replace: true })
    }
  }, [loading, user, navigate, nextPath])

  const modes: { id: AuthMode; label: string }[] = [
    { id: 'sign-in', label: 'Sign in' },
    { id: 'sign-up', label: 'Sign up' },
    { id: 'magic-link', label: 'Magic link' },
  ]

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setError(null)
    setMagicLinkSent(false)
    setSubmitting(true)

    const trimmedEmail = email.trim()
    if (!trimmedEmail) {
      setError('Please enter your email.')
      setSubmitting(false)
      return
    }

    let result: { error: string | null } = { error: null }

    if (mode === 'sign-in') {
      result = await signInWithPassword(trimmedEmail, password)
    } else if (mode === 'sign-up') {
      result = await signUpWithPassword(trimmedEmail, password, displayName.trim() || undefined)
    } else {
      result = await signInWithMagicLink(trimmedEmail)
    }

    setSubmitting(false)

    if (result.error) {
      setError(result.error)
      return
    }

    if (mode === 'magic-link') {
      setMagicLinkSent(true)
      return
    }

    navigate(nextPath, { replace: true })
  }

  if (loading || user) {
    return (
      <main className="page-shell page-shell--editorial py-8 md:py-12">
        <div className="content-container max-w-[720px]">
          <section className="rounded-[28px] border border-border-card bg-bg-card/75 p-6 md:p-8">
            <p className="text-sm text-text-muted">
              {user ? 'Redirecting to your account…' : 'Checking your session…'}
            </p>
          </section>
        </div>
      </main>
    )
  }

  return (
    <main className="page-shell page-shell--editorial py-8 md:py-12">
      <div className="content-container max-w-[720px]">
        <section className="rounded-[28px] border border-border-card bg-bg-card/75 p-6 md:p-8 lg:p-10">
          <PageSectionIntro
            eyebrow="Account"
            title="Sign in when you need purchases restored."
            description="Free tools stay available without an account. Sign in only if you want to restore optional upgrades or keep receipts in one place."
          />

          <div
            className="mt-8 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Authentication mode"
          >
            {modes.map((item) => {
              const active = mode === item.id
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => {
                    setMode(item.id)
                    setError(null)
                    setMagicLinkSent(false)
                  }}
                  className={`min-h-[44px] rounded-xl px-4 py-2 text-sm font-medium transition-colors ${
                    active
                      ? 'border border-calm-cyan/50 bg-calm-cyan/12 text-text-main'
                      : 'border border-white/10 bg-white/[0.03] text-text-muted hover:text-text-main'
                  }`}
                >
                  {item.label}
                </button>
              )
            })}
          </div>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
            {mode === 'sign-up' && (
              <label className="block space-y-2">
                <span className="text-sm font-medium text-text-main">Display name</span>
                <input
                  type="text"
                  name="displayName"
                  autoComplete="nickname"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-text-main outline-none ring-calm-cyan/40 placeholder:text-text-muted focus:ring-2"
                  placeholder="Optional"
                />
              </label>
            )}

            <label className="block space-y-2">
              <span className="text-sm font-medium text-text-main">Email</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-text-main outline-none ring-calm-cyan/40 placeholder:text-text-muted focus:ring-2"
                placeholder="you@example.com"
              />
            </label>

            {mode !== 'magic-link' && (
              <label className="block space-y-2">
                <span className="text-sm font-medium text-text-main">Password</span>
                <input
                  type="password"
                  name="password"
                  autoComplete={mode === 'sign-up' ? 'new-password' : 'current-password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-text-main outline-none ring-calm-cyan/40 placeholder:text-text-muted focus:ring-2"
                  placeholder="Your password"
                />
              </label>
            )}

            {error && (
              <p className="rounded-xl border border-fire-orange/30 bg-fire-orange/10 px-4 py-3 text-sm text-bright-orange" role="alert">
                {error}
              </p>
            )}

            {magicLinkSent && (
              <p className="rounded-xl border border-calm-cyan/30 bg-calm-cyan/10 px-4 py-3 text-sm text-text-main" role="status">
                Check your email for a sign-in link. You can close this tab after you open it.
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl border border-calm-cyan/40 bg-calm-cyan/15 px-6 py-3 text-sm font-semibold text-calm-cyan transition-colors hover:bg-calm-cyan/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting
                ? 'Working…'
                : mode === 'sign-in'
                  ? 'Sign in'
                  : mode === 'sign-up'
                    ? 'Create account'
                    : 'Send magic link'}
            </button>
          </form>

          <p className="mt-6 text-sm text-text-muted">
            Looking for upgrades instead?{' '}
            <Link to="/pricing" className="text-calm-cyan hover:underline">
              View pricing
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  )
}

export default function AuthPage({ theme, onToggleTheme }: AuthPageProps) {
  return (
    <>
      <Header theme={theme} onToggleTheme={onToggleTheme} />
      <AuthPageContent />
      <Footer />
    </>
  )
}
