export type PaymentStatus =
  | 'idle'
  | 'creating-session'
  | 'redirecting'
  | 'verifying'
  | 'succeeded'
  | 'cancelled'
  | 'failed'

export interface CheckoutInput {
  quizId: string
  quizSlug: string
  reportLabel: string
  amountInMinorUnits: number
  currency: 'USD'
}

export interface CheckoutSession {
  sessionId: string
  checkoutUrl?: string
  mockMode?: boolean
}

export interface VerifyPaymentInput {
  sessionId: string
  quizId: string
}

export interface PaymentVerification {
  verified: boolean
  accessToken?: string
  errorMessage?: string
}

export interface QuizPaymentService {
  createCheckoutSession(input: CheckoutInput): Promise<CheckoutSession>
  verifyPayment(input: VerifyPaymentInput): Promise<PaymentVerification>
}
