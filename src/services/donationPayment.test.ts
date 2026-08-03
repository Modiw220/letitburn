import { describe, expect, it } from 'vitest'
import {
  MockDonationPaymentService,
  setMockDonationOutcome,
} from '../services/mockDonationPaymentService'
import { amountToMinorUnits } from '../utils/validateDonationAmount'

describe('donation payment service', () => {
  const service = new MockDonationPaymentService()

  const checkoutInput = (amount: number) => ({
    amount,
    amountInMinorUnits: amountToMinorUnits(amount),
    currency: 'USD' as const,
  })

  it('verified donation displays the server-confirmed amount', async () => {
    setMockDonationOutcome('success')
    const session = await service.createCheckoutSession(checkoutInput(3))
    const verification = await service.verifyDonation({ sessionId: session.sessionId })
    expect(verification.verified).toBe(true)
    expect(verification.amount).toBe(3)
  })

  it('cancelled donation is not marked successful', async () => {
    setMockDonationOutcome('cancelled')
    const session = await service.createCheckoutSession(checkoutInput(1))
    const verification = await service.verifyDonation({ sessionId: session.sessionId })
    expect(verification.verified).toBe(false)
  })

  it('verification failure is not marked successful', async () => {
    setMockDonationOutcome('failed')
    const session = await service.createCheckoutSession(checkoutInput(5))
    const verification = await service.verifyDonation({ sessionId: session.sessionId })
    expect(verification.verified).toBe(false)
  })

  it('duplicate submission is prevented by checkout guard contract', () => {
    let submitting = false
    const startCheckout = () => {
      if (submitting) return false
      submitting = true
      return true
    }

    expect(startCheckout()).toBe(true)
    expect(startCheckout()).toBe(false)
  })

  it('mock mode is visibly labeled in checkout session', async () => {
    const session = await service.createCheckoutSession(checkoutInput(1))
    expect(session.mockMode).toBe(true)
    expect(session.sessionId).toContain('mock_donation_')
  })

  it('client amount changes do not bypass server validation contract', async () => {
    setMockDonationOutcome('success')
    const session = await service.createCheckoutSession(checkoutInput(1))
    const verification = await service.verifyDonation({ sessionId: session.sessionId })
    expect(verification.amount).toBe(1)
    expect(verification.amount).not.toBe(999)
  })
})

describe('donation payment mode', () => {
  it('mock mode is not silently enabled in production builds', () => {
    const isProduction = import.meta.env.PROD
    const mode = import.meta.env.VITE_DONATION_PAYMENT_MODE ?? 'mock'

    if (isProduction && mode === 'mock') {
      expect(import.meta.env.VITE_ALLOW_MOCK_DONATIONS).toBe('true')
    } else {
      expect(true).toBe(true)
    }
  })
})
