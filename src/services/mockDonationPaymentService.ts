import type {
  CreateDonationCheckoutInput,
  DonationCheckoutSession,
  DonationPaymentService,
  DonationVerification,
  VerifyDonationInput,
} from '../types/donations'
import { generateDonationReference } from '../utils/generateDonationReference'

type MockOutcome = 'success' | 'cancelled' | 'failed'

let pendingOutcome: MockOutcome = 'success'
let lastCheckoutAmount: number | null = null

export function setMockDonationOutcome(outcome: MockOutcome) {
  pendingOutcome = outcome
}

export function getLastCheckoutAmount(): number | null {
  return lastCheckoutAmount
}

export class MockDonationPaymentService implements DonationPaymentService {
  async createCheckoutSession(
    input: CreateDonationCheckoutInput,
  ): Promise<DonationCheckoutSession> {
    lastCheckoutAmount = input.amount
    await delay(250)
    return {
      sessionId: `mock_donation_${Date.now()}`,
      mockMode: true,
    }
  }

  async verifyDonation(input: VerifyDonationInput): Promise<DonationVerification> {
    void input
    await delay(350)

    if (pendingOutcome === 'cancelled') {
      pendingOutcome = 'success'
      return {
        verified: false,
        errorMessage: 'The donation was cancelled.',
      }
    }

    if (pendingOutcome === 'failed') {
      pendingOutcome = 'success'
      return {
        verified: false,
        errorMessage:
          'We could not verify the donation. Please check with your payment provider before trying again.',
      }
    }

    pendingOutcome = 'success'
    return {
      verified: true,
      amount: lastCheckoutAmount ?? undefined,
      currency: 'USD',
      reference: generateDonationReference(),
      completedAt: new Date().toISOString(),
    }
  }
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
