import type { QuizAnswer } from '../types/quizEngine'

const VALID_VALUES = new Set([0, 1, 2, 3, 4])

export function calculateTotalScore(answers: QuizAnswer[]): number {
  return answers.reduce((sum, answer) => {
    if (!VALID_VALUES.has(answer.value)) {
      throw new Error('Invalid answer value')
    }
    return sum + answer.value
  }, 0)
}

export function calculatePercentage(total: number, maximum: number): number {
  if (maximum <= 0) return 0
  return Math.round((total / maximum) * 100)
}
