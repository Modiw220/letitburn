import { MockDonationPaymentService } from './mockDonationPaymentService'
import { StripeDonationPaymentService } from './stripeDonationPaymentService'
import type { DonationPaymentService } from '../types/donations'

export type DonationPaymentMode = 'mock' | 'stripe'

export function getDonationPaymentMode(): DonationPaymentMode {
  const mode = import.meta.env.VITE_DONATION_PAYMENT_MODE as DonationPaymentMode | undefined
  if (mode === 'stripe') return 'stripe'
  return 'mock'
}

export function isDonationPaymentConfigured(): boolean {
  return getDonationPaymentMode() === 'mock' || getDonationPaymentMode() === 'stripe'
}

export function isMockDonationMode(): boolean {
  return getDonationPaymentMode() === 'mock'
}

export function isMockDonationModeAllowed(): boolean {
  if (!isMockDonationMode()) return false
  if (!import.meta.env.PROD) return true
  return import.meta.env.VITE_ALLOW_MOCK_DONATIONS === 'true'
}

export function getDonationPaymentService(): DonationPaymentService {
  return getDonationPaymentMode() === 'stripe'
    ? new StripeDonationPaymentService()
    : new MockDonationPaymentService()
}
