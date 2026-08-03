import {
  DIMENSION_ORDER,
  type QuizAnswer,
  type QuizQuestion,
  type ReflectionDimension,
} from '../types/quizEngine'
import type { DimensionResult } from '../types/quizResults'
import { interpretDimensionScore } from './interpretDimensionScore'

export function calculateDimensionScores(
  questions: QuizQuestion[],
  answers: QuizAnswer[],
): DimensionResult[] {
  const answerMap = new Map(answers.map((a) => [a.questionId, a.value]))

  return DIMENSION_ORDER.map((dimension) => {
    const dimensionQuestions = questions.filter((q) => q.dimension === dimension)
    const score = dimensionQuestions.reduce((sum, question) => {
      const value = answerMap.get(question.id)
      if (value === undefined) return sum
      return sum + value
    }, 0)

    return {
      dimension,
      score,
      maximumScore: dimensionQuestions.length * 4,
      interpretation: interpretDimensionScore(score),
    }
  })
}

export function findStrongestDimension(
  dimensions: DimensionResult[],
): ReflectionDimension {
  return [...dimensions].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return (
      DIMENSION_ORDER.indexOf(a.dimension) - DIMENSION_ORDER.indexOf(b.dimension)
    )
  })[0].dimension
}

export function findAttentionDimension(
  dimensions: DimensionResult[],
): ReflectionDimension {
  return [...dimensions].sort((a, b) => {
    if (a.score !== b.score) return a.score - b.score
    return (
      DIMENSION_ORDER.indexOf(a.dimension) - DIMENSION_ORDER.indexOf(b.dimension)
    )
  })[0].dimension
}
