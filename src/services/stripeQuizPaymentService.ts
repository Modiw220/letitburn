import type {
  CheckoutInput,
  CheckoutSession,
  PaymentVerification,
  QuizPaymentService,
  VerifyPaymentInput,
} from '../types/quizPayments'

export class StripeQuizPaymentService implements QuizPaymentService {
  async createCheckoutSession(_input: CheckoutInput): Promise<CheckoutSession> {
    const response = await fetch('/api/quiz-reports/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(_input),
    })

    if (!response.ok) {
      throw new Error('Unable to create checkout session.')
    }

    return response.json() as Promise<CheckoutSession>
  }

  async verifyPayment(input: VerifyPaymentInput): Promise<PaymentVerification> {
    const response = await fetch('/api/quiz-reports/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })

    if (!response.ok) {
      return {
        verified: false,
        errorMessage:
          'We could not verify the payment. Please check with your payment provider before trying again.',
      }
    }

    return response.json() as Promise<PaymentVerification>
  }
}
