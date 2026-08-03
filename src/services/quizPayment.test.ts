import { describe, expect, it } from 'vitest'
import { MockQuizPaymentService, setMockPaymentOutcome } from '../services/mockQuizPaymentService'
import { QUIZ_REPORT_PRICE } from '../data/quizPricing'

describe('quiz payment', () => {
  const service = new MockQuizPaymentService()
  const checkoutInput = {
    quizId: 'emotional-wellbeing',
    quizSlug: 'emotional-wellbeing-check-in',
    reportLabel: 'Emotional Wellbeing Full Reflection Report',
    amountInMinorUnits: QUIZ_REPORT_PRICE.amountInMinorUnits,
    currency: 'USD' as const,
  }

  it('sends the configured quiz and price to payment service', async () => {
    const session = await service.createCheckoutSession(checkoutInput)
    expect(session.sessionId).toContain('mock_')
    expect(checkoutInput.amountInMinorUnits).toBe(100)
  })

  it('successful verified payment unlocks report token', async () => {
    setMockPaymentOutcome('success')
    const session = await service.createCheckoutSession(checkoutInput)
    const verification = await service.verifyPayment({
      sessionId: session.sessionId,
      quizId: checkoutInput.quizId,
    })
    expect(verification.verified).toBe(true)
    expect(verification.accessToken).toBeTruthy()
  })

  it('cancelled payment does not unlock report', async () => {
    setMockPaymentOutcome('cancelled')
    const session = await service.createCheckoutSession(checkoutInput)
    const verification = await service.verifyPayment({
      sessionId: session.sessionId,
      quizId: checkoutInput.quizId,
    })
    expect(verification.verified).toBe(false)
  })

  it('failed verification does not unlock report', async () => {
    setMockPaymentOutcome('failed')
    const session = await service.createCheckoutSession(checkoutInput)
    const verification = await service.verifyPayment({
      sessionId: session.sessionId,
      quizId: checkoutInput.quizId,
    })
    expect(verification.verified).toBe(false)
  })
})
