import { emotionalWellbeingQuiz } from './emotionalWellbeingQuiz'
import type { QuizDefinition } from '../../types/quizEngine'

export const IMPLEMENTED_QUIZ_SLUGS = ['emotional-wellbeing-check-in'] as const

const definitions: Record<string, QuizDefinition> = {
  [emotionalWellbeingQuiz.slug]: emotionalWellbeingQuiz,
}

export function getQuizDefinition(slug: string): QuizDefinition | undefined {
  return definitions[slug]
}

export function isQuizImplemented(slug: string): boolean {
  return IMPLEMENTED_QUIZ_SLUGS.includes(slug as (typeof IMPLEMENTED_QUIZ_SLUGS)[number])
}
