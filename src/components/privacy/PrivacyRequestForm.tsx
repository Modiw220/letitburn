import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { getPrivacyRequestService } from '../../services/privacyRequestService'
import type { PrivacyRequestType } from '../../types/privacy'

const REQUEST_TYPES: { value: PrivacyRequestType; label: string }[] = [
  { value: 'access', label: 'Access my data' },
  { value: 'correction', label: 'Correct my data' },
  { value: 'deletion', label: 'Delete my data' },
  { value: 'objection', label: 'Object to processing' },
  { value: 'restriction', label: 'Restrict processing' },
  { value: 'portability', label: 'Data portability' },
  { value: 'opt-out', label: 'Opt out' },
  { value: 'consent-withdrawal', label: 'Withdraw consent' },
  { value: 'other', label: 'Other request' },
]

export default function PrivacyRequestForm() {
  const { user, loading } = useAuth()
  const [type, setType] = useState<PrivacyRequestType>('access')
  const [email, setEmail] = useState(user?.email ?? '')
  const [details, setDetails] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  if (loading) {
    return (
      <p className="text-sm text-text-muted" role="status">
        Checking sign-in status…
      </p>
    )
  }

  if (!user) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <h3 className="font-heading text-lg font-semibold text-text-main">
          Privacy request form
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">
          Sign in to submit a privacy request through the website. This helps verify the account
          tied to the request.
        </p>
        <Link
          to="/auth"
          className="mt-4 inline-flex min-h-[44px] items-center justify-center rounded-xl border border-calm-cyan/40 bg-calm-cyan/15 px-4 py-2.5 text-sm font-semibold text-calm-cyan"
        >
          Sign in to continue
        </Link>
      </div>
    )
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)
    setSuccess(null)

    const trimmedEmail = email.trim()
    if (!trimmedEmail.includes('@')) {
      setError('Please enter a valid email address.')
      return
    }

    setSubmitting(true)
    try {
      const result = await getPrivacyRequestService().submitRequest({
        type,
        email: trimmedEmail,
        details: details.trim(),
      })
      if (!result.submitted) {
        setError(result.message)
        return
      }
      setSuccess(
        result.reference
          ? `${result.message} Reference: ${result.reference}`
          : result.message,
      )
      setDetails('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to submit your privacy request.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
      noValidate
    >
      <div>
        <h3 className="font-heading text-lg font-semibold text-text-main">
          Privacy request form
        </h3>
        <p className="mt-1 text-sm text-text-muted">
          Submit a request related to your account data. Identity verification may still be
          required.
        </p>
      </div>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-text-main">Request type</span>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as PrivacyRequestType)}
          className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-text-main outline-none ring-calm-cyan/40 focus:ring-2"
        >
          {REQUEST_TYPES.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-text-main">Email</span>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-text-main outline-none ring-calm-cyan/40 placeholder:text-text-muted focus:ring-2"
          placeholder="you@example.com"
        />
      </label>

      <label className="block space-y-2">
        <span className="text-sm font-medium text-text-main">Details</span>
        <textarea
          rows={4}
          value={details}
          onChange={(e) => setDetails(e.target.value)}
          className="w-full resize-y rounded-xl border border-white/12 bg-white/[0.04] px-4 py-3 text-sm text-text-main outline-none ring-calm-cyan/40 placeholder:text-text-muted focus:ring-2"
          placeholder="Share any details that help process this request."
        />
      </label>

      {error && (
        <p
          className="rounded-xl border border-fire-orange/30 bg-fire-orange/10 px-4 py-3 text-sm text-bright-orange"
          role="alert"
        >
          {error}
        </p>
      )}

      {success && (
        <p
          className="rounded-xl border border-calm-cyan/30 bg-calm-cyan/10 px-4 py-3 text-sm text-text-main"
          role="status"
        >
          {success}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex min-h-[48px] w-full items-center justify-center rounded-xl border border-calm-cyan/40 bg-calm-cyan/15 px-6 py-3 text-sm font-semibold text-calm-cyan transition-colors hover:bg-calm-cyan/20 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {submitting ? 'Submitting…' : 'Submit privacy request'}
      </button>
    </form>
  )
}
