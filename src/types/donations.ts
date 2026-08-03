export type DonationTierAccent = 'orange' | 'cyan' | 'purple' | 'gold'

export type DonationTierIcon =
  | 'flame'
  | 'shield'
  | 'heart'
  | 'hand-heart'

export interface DonationTier {
  id: string
  amount: number | null
  title: string
  description: string
  icon: DonationTierIcon
  accent: DonationTierAccent
  custom?: boolean
}

export interface DonationConfig {
  currency: 'USD'
  minimumAmount: number
  maximumAmount: number
  presetAmounts: number[]
}

export interface DonationSelection {
  tierId: string | null
  amount: number | null
  customAmount: string
}

export type DonationPaymentStatus =
  | 'idle'
  | 'creating-session'
  | 'redirecting'
  | 'verifying'
  | 'succeeded'
  | 'cancelled'
  | 'failed'

export interface CreateDonationCheckoutInput {
  amount: number
  amountInMinorUnits: number
  currency: 'USD'
}

export interface DonationCheckoutSession {
  checkoutUrl?: string
  sessionId: string
  mockMode?: boolean
}

export interface VerifyDonationInput {
  sessionId: string
}

export interface DonationVerification {
  verified: boolean
  amount?: number
  currency?: 'USD'
  reference?: string
  completedAt?: string
  errorMessage?: string
}

export interface DonationPaymentService {
  createCheckoutSession(
    input: CreateDonationCheckoutInput,
  ): Promise<DonationCheckoutSession>
  verifyDonation(input: VerifyDonationInput): Promise<DonationVerification>
}

export interface DonationAmountValidation {
  valid: boolean
  amount: number | null
  amountInMinorUnits: number | null
  error: string | null
}
