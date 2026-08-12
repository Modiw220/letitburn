import {
  DIMENSION_ORDER,
  getQuizDimensions,
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
  const dimensions = getQuizDimensions(questions)

  return dimensions.map((dimension) => {
    const dimensionQuestions = questions.filter((q) => q.dimension === dimension)
    const score = dimensionQuestions.reduce((sum, question) => {
      const value = answerMap.get(question.id)
      if (value === undefined) return sum
      return sum + value
    }, 0)
    const maximumScore = dimensionQuestions.length * 4

    return {
      dimension,
      score,
      maximumScore,
      interpretation: interpretDimensionScore(score, maximumScore),
    }
  })
}

function dimensionSortIndex(dimension: ReflectionDimension): number {
  const index = DIMENSION_ORDER.indexOf(dimension)
  return index === -1 ? Number.MAX_SAFE_INTEGER : index
}

export function findStrongestDimension(
  dimensions: DimensionResult[],
): ReflectionDimension {
  return [...dimensions].sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score
    return dimensionSortIndex(a.dimension) - dimensionSortIndex(b.dimension)
  })[0].dimension
}

export function findAttentionDimension(
  dimensions: DimensionResult[],
): ReflectionDimension {
  return [...dimensions].sort((a, b) => {
    if (a.score !== b.score) return a.score - b.score
    return dimensionSortIndex(a.dimension) - dimensionSortIndex(b.dimension)
  })[0].dimension
}
