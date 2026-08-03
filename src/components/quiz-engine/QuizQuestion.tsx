import { useEffect } from 'react'
import { useQuizEngine } from '../../hooks/useQuizEngine'
import { DIMENSION_LABELS } from '../../types/quizEngine'
import QuizAnswerScale from './QuizAnswerScale'
import QuizNavigation from './QuizNavigation'
import QuizProgress from './QuizProgress'

export default function QuizQuestion() {
  const {
    definition,
    currentQuestion,
    currentQuestionIndex,
    getAnswer,
    setAnswer,
    requestExit,
  } = useQuizEngine()

  const selected = getAnswer(currentQuestion.id)
  const isLast = currentQuestionIndex === definition.questions.length - 1

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement
      ) {
        return
      }

      if (event.key >= '1' && event.key <= '5') {
        const index = Number(event.key) - 1
        setAnswer(currentQuestion.id, index as 0 | 1 | 2 | 3 | 4)
      }

      if (event.key === 'Escape') {
        event.preventDefault()
        requestExit()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentQuestion.id, requestExit, setAnswer])

  return (
    <section className="mx-auto max-w-[960px]" aria-labelledby="current-question-heading">
      <QuizProgress />
      <div className="quiz-stage-card">
        <p className="text-xs font-semibold uppercase tracking-wider text-calm-cyan">
          {DIMENSION_LABELS[currentQuestion.dimension]}
        </p>
        <h2
          id="current-question-heading"
          className="mt-3 font-heading text-2xl font-semibold leading-snug text-text-main md:text-3xl"
        >
          {currentQuestion.text}
        </h2>

        <div className="mt-8">
          <QuizAnswerScale
            selected={selected}
            onSelect={(value) => setAnswer(currentQuestion.id, value)}
          />
        </div>

        <QuizNavigation isLast={isLast} canContinue={selected !== undefined} />
      </div>
    </section>
  )
}
