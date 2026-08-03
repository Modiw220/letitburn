import { Link } from 'react-router-dom'
import { Clock, FileText, Gift, ListChecks } from 'lucide-react'
import { useQuizEngine } from '../../hooks/useQuizEngine'
import { QUIZ_REPORT_PRICE } from '../../data/quizPricing'
import QuizDisclaimer from './QuizDisclaimer'
import QuizPrivacyNotice from './QuizPrivacyNotice'
import QuizSafetyNotice from './QuizSafetyNotice'

export default function QuizIntro() {
  const { definition, beginQuiz } = useQuizEngine()

  return (
    <section className="quiz-stage-card mx-auto max-w-[1040px]" aria-labelledby="quiz-intro-heading">
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-calm-cyan">
            {definition.eyebrow}
          </p>
          <h1
            id="quiz-intro-heading"
            className="mt-3 font-heading text-3xl font-semibold text-text-main md:text-4xl"
          >
            {definition.introHeading}
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-text-muted md:text-base">
            {definition.introDescription}
          </p>

          <ul className="mt-6 grid grid-cols-2 gap-3 text-sm text-text-muted md:grid-cols-4">
            <li className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4 text-calm-cyan" aria-hidden="true" />
              About {definition.estimatedMinutes} minutes
            </li>
            <li className="inline-flex items-center gap-2">
              <ListChecks className="h-4 w-4 text-calm-cyan" aria-hidden="true" />
              {definition.questions.length} questions
            </li>
            <li className="inline-flex items-center gap-2">
              <Gift className="h-4 w-4 text-calm-cyan" aria-hidden="true" />
              Free basic result
            </li>
            <li className="inline-flex items-center gap-2">
              <FileText className="h-4 w-4 text-calm-cyan" aria-hidden="true" />
              Optional {QUIZ_REPORT_PRICE.display} full report
            </li>
          </ul>

          <QuizDisclaimer className="mt-6" />

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="min-h-[48px] rounded-xl border border-calm-cyan/40 bg-calm-cyan/15 px-6 py-3 text-sm font-semibold text-calm-cyan transition-colors hover:bg-calm-cyan/20"
              onClick={beginQuiz}
            >
              Begin Check-In
            </button>
            <Link
              to="/quizzes"
              className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-medium text-text-main transition-colors hover:bg-white/[0.08]"
            >
              Back to All Quizzes
            </Link>
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
            <h2 className="font-heading text-xl font-semibold text-text-main">
              What to expect
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              There are no right or wrong answers. Choose the response that feels closest to your recent
              experience, then review the result at your own pace.
            </p>
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
            <QuizPrivacyNotice className="mt-0" />
          </div>

          <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-5">
            <QuizSafetyNotice className="mt-0" />
          </div>
        </aside>
      </div>
    </section>
  )
}
