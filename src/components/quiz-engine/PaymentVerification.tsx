import { Loader2 } from 'lucide-react'

export default function PaymentVerification() {
  return (
    <section className="quiz-stage-card mx-auto max-w-[960px] text-center" aria-live="polite">
      <Loader2 className="mx-auto h-8 w-8 animate-spin text-calm-cyan" aria-hidden="true" />
      <p className="mt-4 text-sm text-text-muted">Confirming your payment…</p>
    </section>
  )
}
