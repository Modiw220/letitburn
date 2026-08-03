import type { QuizItem } from '../../types/quizzes'
import QuizCard from './QuizCard'
import QuizEmptyState from './QuizEmptyState'

interface QuizGridProps {
  quizzes: QuizItem[]
  hasSearch: boolean
  onClearSearch: () => void
  onViewAll: () => void
}

export default function QuizGrid({
  quizzes: visibleQuizzes,
  hasSearch,
  onClearSearch,
  onViewAll,
}: QuizGridProps) {
  if (visibleQuizzes.length === 0) {
    return (
      <QuizEmptyState
        onClearSearch={onClearSearch}
        onViewAll={onViewAll}
        hasSearch={hasSearch}
      />
    )
  }

  return (
    <>
      {visibleQuizzes.map((quiz) => (
        <QuizCard key={quiz.id} quiz={quiz} />
      ))}
    </>
  )
}
