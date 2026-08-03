import { ShieldCheck } from 'lucide-react'

export default function QuizPrivacyNotice() {
  return (
    <section
      className="mt-12 rounded-2xl border border-border-card bg-bg-card/50 px-5 py-5 md:px-6"
      aria-labelledby="quiz-privacy-heading"
    >
      <div className="flex items-start gap-3">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-calm-cyan" aria-hidden="true" />
        <div>
          <h2
            id="quiz-privacy-heading"
            className="font-heading text-base font-semibold text-text-main md:text-lg"
          >
            Private by design.
          </h2>
          <p className="mt-2 text-sm text-text-muted">
            Quiz answers should remain in the current browser session unless the user explicitly
            chooses to continue to a payment or download step.
          </p>
          <p className="mt-2 text-sm text-text-muted">
            You can browse and start a quiz without signing in.
          </p>
        </div>
      </div>
    </section>
  )
}
