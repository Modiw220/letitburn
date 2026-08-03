import type {
  CreateDonationCheckoutInput,
  DonationCheckoutSession,
  DonationPaymentService,
  DonationVerification,
  VerifyDonationInput,
} from '../types/donations'

export class StripeDonationPaymentService implements DonationPaymentService {
  async createCheckoutSession(
    input: CreateDonationCheckoutInput,
  ): Promise<DonationCheckoutSession> {
    const response = await fetch('/api/donations/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })

    if (!response.ok) {
      throw new Error('Unable to create donation checkout session.')
    }

    return response.json() as Promise<DonationCheckoutSession>
  }

  async verifyDonation(input: VerifyDonationInput): Promise<DonationVerification> {
    const response = await fetch('/api/donations/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })

    if (!response.ok) {
      return {
        verified: false,
        errorMessage:
          'We could not verify the donation. Please check with your payment provider before trying again.',
      }
    }

    return response.json() as Promise<DonationVerification>
  }
}
