import { Loader2 } from 'lucide-react'
import { useQuizEngine } from '../../hooks/useQuizEngine'
import { QUIZ_REPORT_PRICE } from '../../data/quizPricing'
import PaymentVerification from './PaymentVerification'

export default function QuizPaymentPanel() {
  const {
    paymentStatus,
    paymentError,
    isMockPayment,
    startCheckout,
    simulateMockPayment,
    returnToFreeResult,
  } = useQuizEngine()

  if (paymentStatus === 'verifying' || paymentStatus === 'creating-session') {
    return <PaymentVerification />
  }

  return (
    <section className="quiz-stage-card mx-auto max-w-[960px]" aria-labelledby="payment-heading">
      <h2 id="payment-heading" className="font-heading text-2xl font-semibold text-text-main md:text-3xl">
        Unlock your full reflection report
      </h2>

      <div className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-5">
        <p className="font-medium text-text-main">Emotional Wellbeing Full Reflection Report</p>
        <ul className="mt-4 space-y-2 text-sm text-text-muted">
          <li>One-time payment · {QUIZ_REPORT_PRICE.display}</li>
          <li>Free result remains available</li>
          <li>No subscription</li>
          <li>Four-area breakdown, prompts, calming exercises, PDF, optional email</li>
        </ul>
      </div>

      <p className="mt-4 text-sm text-text-muted">
        This is a one-time purchase, not a subscription.
      </p>

      {paymentError && (
        <p className="mt-4 text-sm text-fire-orange" role="alert">
          {paymentError}
        </p>
      )}

      {isMockPayment && (
        <div className="mt-6 rounded-xl border border-amber-400/30 bg-amber-400/10 p-5">
          <p className="text-sm font-semibold text-amber-200">Development payment simulation</p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button
              type="button"
              className="min-h-[44px] rounded-lg border border-white/15 px-4 py-2 text-sm text-text-main"
              onClick={() => void simulateMockPayment('success')}
            >
              Simulate Successful Payment
            </button>
            <button
              type="button"
              className="min-h-[44px] rounded-lg border border-white/15 px-4 py-2 text-sm text-text-muted"
              onClick={() => void simulateMockPayment('cancelled')}
            >
              Simulate Cancelled Payment
            </button>
            <button
              type="button"
              className="min-h-[44px] rounded-lg border border-white/15 px-4 py-2 text-sm text-text-muted"
              onClick={() => void simulateMockPayment('failed')}
            >
              Simulate Payment Error
            </button>
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-support-gold/40 bg-support-gold/10 px-5 py-3 text-sm font-semibold text-support-gold"
          onClick={() => void startCheckout()}
          disabled={paymentStatus === 'redirecting'}
        >
          {paymentStatus === 'redirecting' && (
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
          )}
          Continue to Secure Payment
        </button>
        <button
          type="button"
          className="min-h-[48px] rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-text-muted hover:text-text-main"
          onClick={returnToFreeResult}
        >
          Return to Free Result
        </button>
      </div>
    </section>
  )
}
