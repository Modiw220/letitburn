import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

interface RequireAuthProps {
  children: ReactNode
}

export default function RequireAuth({ children }: RequireAuthProps) {
  const { user, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="rounded-2xl border border-border-card bg-bg-card/75 px-5 py-6 text-sm text-text-muted">
        Checking your session…
      </div>
    )
  }

  if (!user) {
    const next = `${location.pathname}${location.search}`
    const href = `/auth?next=${encodeURIComponent(next)}`

    return (
      <div className="rounded-2xl border border-border-card bg-bg-card/75 px-5 py-6">
        <p className="text-sm leading-relaxed text-text-muted">
          Sign in to continue. Free tools still work without an account; this step is only for
          restoring purchases or account-linked features.
        </p>
        <Link
          to={href}
          className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-xl border border-calm-cyan/40 bg-calm-cyan/15 px-5 py-2.5 text-sm font-semibold text-calm-cyan transition-colors hover:bg-calm-cyan/20"
        >
          Sign in
        </Link>
      </div>
    )
  }

  return <>{children}</>
}
