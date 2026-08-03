import { ArrowRight, Clock, ListChecks } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getQuizRoute } from '../../data/quizzes'
import { QUIZ_REPORT_PRICE } from '../../data/quizPricing'
import type { QuizItem } from '../../types/quizzes'
import { formatQuizCategoryBadge, getQuizIcon, QUIZ_ACCENT_COLORS } from './quizUtils'

interface QuizCardProps {
  quiz: QuizItem
}

export default function QuizCard({ quiz }: QuizCardProps) {
  const Icon = getQuizIcon(quiz.icon)
  const accentColor = QUIZ_ACCENT_COLORS[quiz.accent]

  return (
    <article
      className="quiz-card group flex h-full flex-col rounded-[18px] border border-border-card bg-bg-card/80 p-6 transition-all md:p-7"
      style={{
        boxShadow: `0 0 0 1px ${accentColor}10`,
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className="inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold tracking-wide"
          style={{
            borderColor: `${accentColor}44`,
            color: accentColor,
            backgroundColor: `${accentColor}12`,
          }}
        >
          {formatQuizCategoryBadge(quiz.category)}
        </span>
        {quiz.featured && (
          <span className="rounded-full border border-calm-cyan/30 bg-calm-cyan/10 px-2.5 py-1 text-[11px] font-medium text-calm-cyan">
            Good place to begin
          </span>
        )}
      </div>

      <div
        className="mt-5 flex h-12 w-12 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${accentColor}18`, color: accentColor }}
        aria-hidden="true"
      >
        <Icon className="h-6 w-6" strokeWidth={1.5} />
      </div>

      <h3 className="mt-4 font-heading text-xl font-semibold text-text-main">{quiz.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">{quiz.description}</p>

      <ul className="mt-4 flex flex-wrap gap-4 text-sm text-text-muted">
        <li className="inline-flex items-center gap-1.5">
          <Clock className="h-4 w-4 shrink-0" aria-hidden="true" />
          {quiz.estimatedMinutes} minutes
        </li>
        <li className="inline-flex items-center gap-1.5">
          <ListChecks className="h-4 w-4 shrink-0" aria-hidden="true" />
          {quiz.questionCount} questions
        </li>
      </ul>

      <div className="mt-5 grid grid-cols-2 gap-3 rounded-xl border border-white/8 bg-white/[0.02] p-3">
        <div>
          <p className="text-xs font-medium text-text-muted">Basic result</p>
          <p className="mt-1 text-sm font-semibold text-text-main">Included</p>
          <p className="text-xs text-calm-cyan">Free</p>
        </div>
        <div>
          <p className="text-xs font-medium text-text-muted">Full report</p>
          <p className="mt-1 text-sm font-semibold text-text-main">
            {QUIZ_REPORT_PRICE.display}
          </p>
          <p className="text-xs text-text-muted">Optional</p>
        </div>
      </div>

      <p className="mt-3 text-xs text-text-muted">
        Start for free. The detailed report is optional.
      </p>

      <p className="mt-3 text-xs text-text-muted/90">
        Self-reflection only. Not a diagnosis.
      </p>

      <Link
        to={getQuizRoute(quiz.slug)}
        className="quiz-card-action mt-5 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors"
        style={{
          borderColor: `${accentColor}44`,
          backgroundColor: `${accentColor}14`,
          color: accentColor,
        }}
      >
        Start Free Quiz
        <ArrowRight className="h-4 w-4" aria-hidden="true" />
      </Link>
    </article>
  )
}
