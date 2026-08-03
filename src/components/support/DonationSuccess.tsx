import { Check } from 'lucide-react'
import { Link } from 'react-router-dom'
import { formatCurrencyWithCode } from '../../utils/formatCurrency'
import type { DonationVerification } from '../../types/donations'

interface DonationSuccessProps {
  verification: DonationVerification
}

export default function DonationSuccess({ verification }: DonationSuccessProps) {
  const completedDate = verification.completedAt
    ? new Date(verification.completedAt).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : new Date().toLocaleDateString()

  return (
    <div className="support-success-panel mt-8 rounded-2xl border border-calm-cyan/20 bg-calm-cyan/5 p-6 text-center md:p-8">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-calm-cyan/30 bg-calm-cyan/10">
        <Check className="h-7 w-7 text-calm-cyan" aria-hidden="true" />
      </div>
      <h3 className="mt-5 font-heading text-2xl font-semibold text-text-main">
        Thank you for helping this space stay open.
      </h3>
      <p className="mx-auto mt-3 max-w-lg text-sm text-text-muted">
        Your support helps maintain a private place where people can release something, slow down,
        or take a breath.
      </p>

      <dl className="mx-auto mt-6 max-w-sm space-y-2 text-sm text-text-muted">
        {verification.amount !== undefined && (
          <div className="flex justify-between gap-4">
            <dt>Amount</dt>
            <dd className="text-text-main">{formatCurrencyWithCode(verification.amount)}</dd>
          </div>
        )}
        <div className="flex justify-between gap-4">
          <dt>Type</dt>
          <dd className="text-text-main">One-time donation</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt>Date</dt>
          <dd className="text-text-main">{completedDate}</dd>
        </div>
        {verification.reference && (
          <div className="flex justify-between gap-4">
            <dt>Reference</dt>
            <dd className="text-text-main">{verification.reference}</dd>
          </div>
        )}
      </dl>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Link
          to="/"
          className="min-h-[48px] rounded-xl border border-calm-cyan/40 bg-calm-cyan/10 px-5 py-3 text-sm font-semibold text-calm-cyan"
        >
          Return to the Tools
        </Link>
        <Link
          to="/burn-thoughts"
          className="min-h-[48px] rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-text-main"
        >
          Burn a Thought
        </Link>
      </div>

      <p className="mt-6 text-sm text-text-muted">
        Whether or not you donate again, you are welcome to keep using this space.
      </p>
    </div>
  )
}
