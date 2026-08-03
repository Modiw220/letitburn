import { Lock } from 'lucide-react'
import { formatCurrencyWithCode } from '../../utils/formatCurrency'

interface DonationSummaryProps {
  amount: number
  onContinue: () => void
  onChangeAmount: () => void
  disabled?: boolean
  paymentConfigured?: boolean
}

export default function DonationSummary({
  amount,
  onContinue,
  onChangeAmount,
  disabled = false,
  paymentConfigured = true,
}: DonationSummaryProps) {
  return (
    <div className="mt-8 rounded-2xl border border-support-gold/20 bg-support-gold/5 p-5 md:p-6">
      <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
        Your donation
      </h3>
      <p className="mt-2 text-2xl font-semibold text-text-main">
        {formatCurrencyWithCode(amount)}
      </p>
      <ul className="mt-4 space-y-1 text-sm text-text-muted">
        <li>One-time payment</li>
        <li>No subscription</li>
      </ul>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        {paymentConfigured && (
          <button
            type="button"
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-support-gold/40 bg-support-gold/10 px-5 py-3 text-sm font-semibold text-support-gold disabled:opacity-50"
            onClick={onContinue}
            disabled={disabled}
          >
            <Lock className="h-4 w-4" aria-hidden="true" />
            Continue to Secure Donation
          </button>
        )}
        <button
          type="button"
          className="min-h-[48px] rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-text-muted hover:text-text-main"
          onClick={onChangeAmount}
        >
          Change Amount
        </button>
      </div>

      <p className="mt-4 text-xs text-text-muted">
        Payment is processed securely by the configured payment provider.
      </p>
    </div>
  )
}
