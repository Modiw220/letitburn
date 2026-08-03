import { useQuizEngine } from '../../hooks/useQuizEngine'

interface QuizNavigationProps {
  isLast: boolean
  canContinue: boolean
}

export default function QuizNavigation({ isLast, canContinue }: QuizNavigationProps) {
  const {
    currentQuestionIndex,
    goNext,
    goPrevious,
    goToReview,
    requestExit,
  } = useQuizEngine()

  return (
    <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <button
        type="button"
        className="text-sm text-text-muted transition-colors hover:text-text-main"
        onClick={requestExit}
      >
        Exit Quiz
      </button>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          className="min-h-[48px] rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-text-muted transition-colors hover:text-text-main disabled:cursor-not-allowed disabled:opacity-40"
          onClick={goPrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>

        {isLast ? (
          <button
            type="button"
            className="min-h-[48px] rounded-xl border border-calm-cyan/40 bg-calm-cyan/15 px-5 py-3 text-sm font-semibold text-calm-cyan transition-colors hover:bg-calm-cyan/20 disabled:cursor-not-allowed disabled:opacity-40"
            onClick={goToReview}
            disabled={!canContinue}
          >
            View Result
          </button>
        ) : (
          <button
            type="button"
            className="min-h-[48px] rounded-xl border border-calm-cyan/40 bg-calm-cyan/15 px-5 py-3 text-sm font-semibold text-calm-cyan transition-colors hover:bg-calm-cyan/20 disabled:cursor-not-allowed disabled:opacity-40"
            onClick={goNext}
            disabled={!canContinue}
          >
            Continue
          </button>
        )}
      </div>
    </div>
  )
}
