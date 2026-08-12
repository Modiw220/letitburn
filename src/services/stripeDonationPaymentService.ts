import type {
  CreateDonationCheckoutInput,
  DonationCheckoutSession,
  DonationPaymentService,
  DonationVerification,
  VerifyDonationInput,
} from '../types/donations'
import { invokeFunction } from '../lib/invokeFunction'

export class StripeDonationPaymentService implements DonationPaymentService {
  async createCheckoutSession(
    input: CreateDonationCheckoutInput,
  ): Promise<DonationCheckoutSession> {
    return invokeFunction<DonationCheckoutSession>('donation-checkout', input, {
      requireAuth: false,
    })
  }

  async verifyDonation(input: VerifyDonationInput): Promise<DonationVerification> {
    try {
      return await invokeFunction<DonationVerification>('donation-verify', input, {
        requireAuth: false,
      })
    } catch {
      return {
        verified: false,
        errorMessage:
          'We could not verify the donation. Please check with your payment provider before trying again.',
      }
    }
  }
}
