import { Loader2, Lock } from 'lucide-react'

interface DonationPaymentPanelProps {
  formattedAmount: string
  amount: number
  amountInMinorUnits: number
  isMockMode: boolean
  status: string
  errorMessage: string | null
  onContinue: () => void
  onReturn: () => void
  onSimulate: (outcome: 'success' | 'cancelled' | 'failed') => void
}

export default function DonationPaymentPanel({
  formattedAmount,
  isMockMode,
  status,
  errorMessage,
  onContinue,
  onReturn,
  onSimulate,
}: DonationPaymentPanelProps) {
  const isBusy = status === 'creating-session' || status === 'redirecting'

  return (
    <div className="mt-8 rounded-2xl border border-white/10 bg-bg-card/70 p-5 md:p-6">
      <h3 className="font-heading text-xl font-semibold text-text-main">Secure payment</h3>
      <p className="mt-2 text-sm text-text-muted">
        One-time donation · {formattedAmount} · No subscription or recurring charge.
      </p>

      {errorMessage && (
        <p className="mt-4 text-sm text-text-muted" role="alert">
          {errorMessage}
        </p>
      )}

      {isMockMode && (
        <div className="mt-6 rounded-xl border border-amber-400/30 bg-amber-400/10 p-5">
          <p className="text-sm font-semibold text-amber-200">Development donation simulation</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              className="min-h-[44px] rounded-lg border border-white/15 px-4 py-2 text-sm text-text-main"
              onClick={() => onSimulate('success')}
            >
              Simulate Successful Donation
            </button>
            <button
              type="button"
              className="min-h-[44px] rounded-lg border border-white/15 px-4 py-2 text-sm text-text-muted"
              onClick={() => onSimulate('cancelled')}
            >
              Simulate Cancelled Donation
            </button>
            <button
              type="button"
              className="min-h-[44px] rounded-lg border border-white/15 px-4 py-2 text-sm text-text-muted"
              onClick={() => onSimulate('failed')}
            >
              Simulate Payment Error
            </button>
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-support-gold/40 bg-support-gold/10 px-5 py-3 text-sm font-semibold text-support-gold disabled:opacity-50"
          onClick={onContinue}
          disabled={isBusy}
        >
          {isBusy ? (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          ) : (
            <Lock className="h-4 w-4" aria-hidden="true" />
          )}
          Continue to Secure Donation
        </button>
        <button
          type="button"
          className="min-h-[44px] rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-text-muted hover:text-text-main"
          onClick={onReturn}
        >
          Back to amount selection
        </button>
      </div>
    </div>
  )
}
