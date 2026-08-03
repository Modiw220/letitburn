import { useQuizEngine } from '../../hooks/useQuizEngine'
import { DIMENSION_LABELS, DIMENSION_ORDER } from '../../types/quizEngine'
import QuizDisclaimer from './QuizDisclaimer'
import QuizPrivacyNotice from './QuizPrivacyNotice'

export default function QuizReview() {
  const { definition, answers, calculateResult, goToQuestionsFromReview } = useQuizEngine()

  return (
    <section className="quiz-stage-card mx-auto max-w-[960px]" aria-labelledby="quiz-review-heading">
      <h2 id="quiz-review-heading" className="font-heading text-2xl font-semibold text-text-main md:text-3xl">
        Ready to view your reflection?
      </h2>
      <p className="mt-3 text-sm text-text-muted">
        {answers.length} of {definition.questions.length} questions answered
      </p>

      <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {DIMENSION_ORDER.map((dimension) => (
          <li
            key={dimension}
            className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-text-muted"
          >
            {DIMENSION_LABELS[dimension]}
          </li>
        ))}
      </ul>

      <QuizPrivacyNotice className="mt-6" />
      <QuizDisclaimer className="mt-4" />

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          className="min-h-[48px] rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-text-muted transition-colors hover:text-text-main"
          onClick={goToQuestionsFromReview}
        >
          Review Answers
        </button>
        <button
          type="button"
          className="min-h-[48px] rounded-xl border border-calm-cyan/40 bg-calm-cyan/15 px-5 py-3 text-sm font-semibold text-calm-cyan transition-colors hover:bg-calm-cyan/20"
          onClick={calculateResult}
        >
          View My Free Result
        </button>
      </div>
    </section>
  )
}
