import { useQuizEngine } from '../../hooks/useQuizEngine'
import { DIMENSION_LABELS } from '../../types/quizEngine'

export default function QuizProgress() {
  const { definition, currentQuestionIndex, answers } = useQuizEngine()
  const total = definition.questions.length
  const completed = answers.length
  const current = definition.questions[currentQuestionIndex]
  const percent = Math.round((completed / total) * 100)

  return (
    <div className="mx-auto mb-6 max-w-[960px]">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm text-text-muted">
        <span>
          Question {currentQuestionIndex + 1} of {total}
        </span>
        <span>{DIMENSION_LABELS[current.dimension]}</span>
      </div>
      <div
        className="mt-3 h-2 overflow-hidden rounded-full bg-white/10"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={completed}
        aria-label="Quiz progress"
      >
        <div
          className="h-full rounded-full bg-calm-cyan transition-all duration-300"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  )
}
