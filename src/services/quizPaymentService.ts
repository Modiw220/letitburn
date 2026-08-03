import { MockQuizPaymentService } from './mockQuizPaymentService'
import { StripeQuizPaymentService } from './stripeQuizPaymentService'
import type { QuizPaymentService } from '../types/quizPayments'

export type QuizPaymentMode = 'mock' | 'stripe'

export function getQuizPaymentMode(): QuizPaymentMode {
  const mode = import.meta.env.VITE_QUIZ_PAYMENT_MODE as QuizPaymentMode | undefined
  if (mode === 'stripe') return 'stripe'
  return 'mock'
}

export function isMockPaymentMode(): boolean {
  return getQuizPaymentMode() === 'mock'
}

export function getQuizPaymentService(): QuizPaymentService {
  return getQuizPaymentMode() === 'stripe'
    ? new StripeQuizPaymentService()
    : new MockQuizPaymentService()
}
