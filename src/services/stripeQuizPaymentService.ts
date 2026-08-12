import type {
  CheckoutInput,
  CheckoutSession,
  PaymentVerification,
  QuizPaymentService,
  VerifyPaymentInput,
} from '../types/quizPayments'
import { invokeFunction } from '../lib/invokeFunction'

export class StripeQuizPaymentService implements QuizPaymentService {
  async createCheckoutSession(input: CheckoutInput): Promise<CheckoutSession> {
    return invokeFunction<CheckoutSession>('quiz-report-checkout', input, {
      requireAuth: true,
    })
  }

  async verifyPayment(input: VerifyPaymentInput): Promise<PaymentVerification> {
    try {
      return await invokeFunction<PaymentVerification>('quiz-report-verify', input, {
        requireAuth: true,
      })
    } catch {
      return {
        verified: false,
        errorMessage:
          'We could not verify the payment. Please check with your payment provider before trying again.',
      }
    }
  }
}
