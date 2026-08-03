import type { QuizPricing } from '../types/quizzes'

export const QUIZ_REPORT_PRICE: QuizPricing & { amountInMinorUnits: number } = {
  amount: 1,
  amountInMinorUnits: 100,
  currency: 'USD',
  display: '$1',
}
