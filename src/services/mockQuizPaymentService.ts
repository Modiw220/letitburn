import type {
  CheckoutInput,
  CheckoutSession,
  PaymentVerification,
  QuizPaymentService,
  VerifyPaymentInput,
} from '../types/quizPayments'

type MockOutcome = 'success' | 'cancelled' | 'failed'

let pendingOutcome: MockOutcome = 'success'

export function setMockPaymentOutcome(outcome: MockOutcome) {
  pendingOutcome = outcome
}

export class MockQuizPaymentService implements QuizPaymentService {
  async createCheckoutSession(input: CheckoutInput): Promise<CheckoutSession> {
    void input
    await delay(300)
    return {
      sessionId: `mock_${Date.now()}`,
      mockMode: true,
    }
  }

  async verifyPayment(input: VerifyPaymentInput): Promise<PaymentVerification> {
    void input
    await delay(400)

    if (pendingOutcome === 'cancelled') {
      pendingOutcome = 'success'
      return { verified: false, errorMessage: 'Payment was cancelled.' }
    }

    if (pendingOutcome === 'failed') {
      pendingOutcome = 'success'
      return {
        verified: false,
        errorMessage: 'We could not verify the payment. Please check with your payment provider before trying again.',
      }
    }

    pendingOutcome = 'success'
    return {
      verified: true,
      accessToken: `verified_${input.sessionId}`,
    }
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
