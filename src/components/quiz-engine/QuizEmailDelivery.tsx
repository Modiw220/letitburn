import { useState } from 'react'
import type { FullReflectionReport } from '../../types/quizResults'
import { sendQuizReportEmail } from '../../services/quizEmailService'
import { validateEmail } from '../../utils/validateEmail'

interface QuizEmailDeliveryProps {
  report: FullReflectionReport
  emailConfigured: boolean
  accessToken: string | null
  onAnnounce: (message: string) => void
}

export default function QuizEmailDelivery({
  report,
  emailConfigured,
  accessToken,
  onAnnounce,
}: QuizEmailDeliveryProps) {
  const [email, setEmail] = useState('')
  const [includeScore, setIncludeScore] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [sending, setSending] = useState(false)

  const handleSend = async () => {
    setError(null)
    setMessage(null)

    if (!validateEmail(email)) {
      setError('Enter a valid email address.')
      return
    }

    setSending(true)
    const result = await sendQuizReportEmail({
      accessToken: accessToken ?? '',
      quizId: report.basicResult.quizId,
      recipientEmail: email.trim(),
      includeScoreInSubject: includeScore,
      report,
    })
    setSending(false)

    if (result.sent) {
      setMessage(result.message)
      onAnnounce('Report email sent')
    } else {
      setError(result.message)
    }
  }

  return (
    <section className="mt-8 rounded-xl border border-white/10 bg-white/[0.02] p-5" aria-labelledby="email-report-heading">
      <h3 id="email-report-heading" className="font-heading text-lg font-semibold text-text-main">
        Email this report
      </h3>
      <p className="mt-2 text-sm text-text-muted">
        Enter an email address only if you want a copy sent to you.
      </p>

      {!emailConfigured ? (
        <p className="mt-4 text-sm text-text-muted">
          Email delivery is not configured yet. You can still download your PDF.
        </p>
      ) : (
        <>
          <label htmlFor="report-email" className="mt-4 block text-sm text-text-muted">
            Email address
          </label>
          <input
            id="report-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-lg border border-white/10 bg-bg-main/50 px-3 py-2.5 text-sm text-text-main"
            autoComplete="email"
          />

          <label className="mt-4 flex min-h-[44px] items-center gap-2 text-sm text-text-muted">
            <input
              type="checkbox"
              checked={includeScore}
              onChange={(e) => setIncludeScore(e.target.checked)}
              className="h-4 w-4"
            />
            Include my overall score in the email subject
          </label>

          <button
            type="button"
            className="mt-4 min-h-[48px] rounded-xl border border-white/15 px-5 py-3 text-sm font-medium text-text-main disabled:opacity-50"
            onClick={() => void handleSend()}
            disabled={sending}
          >
            Send Report
          </button>
        </>
      )}

      <p className="mt-4 text-xs text-text-muted">
        We use this address only to deliver this report unless you separately choose to receive
        updates.
      </p>

      {message && <p className="mt-3 text-sm text-calm-cyan">{message}</p>}
      {error && (
        <p className="mt-3 text-sm text-text-muted" role="alert">
          {error}
        </p>
      )}
    </section>
  )
}
