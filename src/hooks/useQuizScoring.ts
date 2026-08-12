import { getScoreRangesForQuiz } from '../data/quizScoreRanges'
import type { QuizAnswer, QuizDefinition } from '../types/quizEngine'
import type { BasicQuizResult } from '../types/quizResults'
import { calculateDimensionScores } from '../utils/calculateDimensionScores'
import { calculatePercentage, calculateTotalScore } from '../utils/calculateQuizScore'
import { findScoreRange } from '../utils/findScoreRange'

export function computeBasicResult(
  definition: QuizDefinition,
  answers: QuizAnswer[],
): BasicQuizResult | null {
  if (answers.length !== definition.questions.length) {
    return null
  }

  const questionIds = new Set(definition.questions.map((q) => q.id))
  for (const answer of answers) {
    if (!questionIds.has(answer.questionId)) return null
    if (answer.value < 0 || answer.value > 4) return null
  }

  try {
    const totalScore = calculateTotalScore(answers)
    const maximumScore = definition.questions.length * 4
    const range = findScoreRange(totalScore, getScoreRangesForQuiz(definition.id))

    return {
      quizId: definition.id,
      totalScore,
      maximumScore,
      percentage: calculatePercentage(totalScore, maximumScore),
      range,
      dimensions: calculateDimensionScores(definition.questions, answers),
    }
  } catch {
    return null
  }
}

export function useQuizScoring(definition: QuizDefinition, answers: QuizAnswer[]) {
  return computeBasicResult(definition, answers)
}
