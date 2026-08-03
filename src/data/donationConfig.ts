import type { DonationConfig } from '../types/donations'

export const DONATION_CONFIG: DonationConfig = {
  currency: 'USD',
  minimumAmount: 1,
  maximumAmount: 1000,
  presetAmounts: [1, 3, 5],
}
