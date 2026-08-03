import { useQuizEngine } from '../../hooks/useQuizEngine'
import { QUIZ_REPORT_PRICE } from '../../data/quizPricing'

export default function QuizReportOffer() {
  const { unlockReport } = useQuizEngine()

  return (
    <section
      className="mt-8 rounded-2xl border border-support-gold/20 bg-support-gold/5 p-6 md:p-8"
      aria-labelledby="report-offer-heading"
    >
      <div className="flex flex-wrap items-center gap-3">
        <h3 id="report-offer-heading" className="font-heading text-xl font-semibold text-text-main">
          Go deeper with your full reflection report.
        </h3>
        <span className="rounded-full border border-white/10 px-2.5 py-1 text-xs font-medium text-text-muted">
          Optional
        </span>
      </div>

      <p className="mt-3 text-sm text-text-muted">
        Receive a detailed breakdown of your four reflection areas, personalized prompts, calming
        exercises, and a downloadable report.
      </p>
      <p className="mt-2 text-sm font-medium text-support-gold">
        {QUIZ_REPORT_PRICE.display}
      </p>
      <p className="mt-3 text-sm text-text-muted">
        Your free result above remains available without purchase.
      </p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          className="min-h-[48px] rounded-xl border border-support-gold/40 bg-support-gold/10 px-5 py-3 text-sm font-semibold text-support-gold transition-colors hover:bg-support-gold/15"
          onClick={unlockReport}
        >
          Unlock Full Report for {QUIZ_REPORT_PRICE.display}
        </button>
        <button
          type="button"
          className="min-h-[48px] rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-text-muted hover:text-text-main"
          onClick={() =>
            document.getElementById('basic-result-heading')?.scrollIntoView({ behavior: 'smooth' })
          }
        >
          Keep My Free Result
        </button>
      </div>
    </section>
  )
}
