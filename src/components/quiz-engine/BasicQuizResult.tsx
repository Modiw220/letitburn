import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useQuizEngine } from '../../hooks/useQuizEngine'
import QuizDisclaimer from './QuizDisclaimer'
import QuizReportOffer from './QuizReportOffer'
import QuizResultMeter from './QuizResultMeter'
import QuizSafetyNotice from './QuizSafetyNotice'

const FREE_ACTIONS = [
  { label: 'Write and Release', href: '/burn-thoughts' },
  { label: 'Listen to a Calming Sound', href: '/sounds' },
  { label: 'Try Relaxing Drawing', href: '/relaxing-drawing' },
]

export default function BasicQuizResult() {
  const { basicResult, definition, requestRestart } = useQuizEngine()

  if (!basicResult) return null

  return (
    <section className="mx-auto max-w-[960px]" aria-labelledby="basic-result-heading">
      <div className="quiz-stage-card">
        <h2 id="basic-result-heading" className="font-heading text-2xl font-semibold text-text-main md:text-3xl">
          Your wellbeing reflection
        </h2>

        <p className="mt-4 text-lg font-medium text-text-main">{basicResult.range.label}</p>
        <p className="mt-2 text-sm text-text-muted">
          {basicResult.totalScore} out of {basicResult.maximumScore}
        </p>

        <QuizResultMeter
          percentage={basicResult.percentage}
          accentColor={definition.accentColor}
        />

        <p className="mt-6 text-sm leading-relaxed text-text-muted">{basicResult.range.explanation}</p>

        <div className="mt-8 rounded-xl border border-white/10 bg-white/[0.03] p-5">
          <h3 className="font-heading text-lg font-semibold text-text-main">One small next step</h3>
          <p className="mt-2 text-sm text-text-muted">{basicResult.range.suggestedNextStep}</p>
        </div>

        <div className="mt-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-text-muted">
            Gentle next steps on Let It Burn
          </h3>
          <ul className="mt-4 space-y-3">
            {FREE_ACTIONS.map((action) => (
              <li key={action.href}>
                <Link
                  to={action.href}
                  className="inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-calm-cyan hover:underline"
                >
                  {action.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <QuizDisclaimer className="mt-8" />
        <QuizSafetyNotice className="mt-4" />

        <button
          type="button"
          className="mt-6 text-sm text-text-muted transition-colors hover:text-text-main"
          onClick={requestRestart}
        >
          Take the Check-In Again
        </button>
      </div>

      <QuizReportOffer />
    </section>
  )
}
