export type UpgradeCategory =
  | 'quiz-report'
  | 'ad-free'
  | 'drawing'
  | 'sounds'
  | 'bundle'

export type UpgradeStatus =
  | 'available'
  | 'planned'
  | 'coming-later'
  | 'requires-configuration'

export type BillingType = 'one-time' | 'time-limited' | 'one-time-per-pack'

export type EntitlementType =
  | 'single-report'
  | 'download'
  | 'content-pack'
  | 'feature-access'
  | 'ad-removal'
  | 'bundle'

export interface FixedPrice {
  type: 'fixed'
  amountMinor: number
  currency: 'USD'
}

export interface RangePrice {
  type: 'range'
  minimumMinor: number
  maximumMinor: number
  currency: 'USD'
}

export type UpgradePrice = FixedPrice | RangePrice

export interface UpgradeProduct {
  id: string
  title: string
  category: UpgradeCategory
  price: UpgradePrice
  billingType: BillingType
  entitlementType: EntitlementType
  durationDays?: number
  description: string
  includedFeatures: string[]
  limitation?: string
  status: UpgradeStatus
  icon: string
  accent: string
  route?: string
  available: boolean
  mainBenefit: string
}

export interface CreateUpgradeCheckoutInput {
  productId: string
  expectedPriceMinor?: number
  currency: 'USD'
}

export interface UpgradeCheckoutSession {
  checkoutUrl?: string
  sessionId: string
  mockMode?: boolean
}

export interface VerifyUpgradePurchaseInput {
  sessionId: string
  productId: string
}

export interface UpgradePurchaseVerification {
  verified: boolean
  productId?: string
  amountMinor?: number
  currency?: 'USD'
  entitlementType?: EntitlementType
  expiresAt?: string
  errorMessage?: string
}

export interface UpgradeCheckoutService {
  createCheckoutSession(input: CreateUpgradeCheckoutInput): Promise<UpgradeCheckoutSession>
  verifyPurchase(input: VerifyUpgradePurchaseInput): Promise<UpgradePurchaseVerification>
}

export type UpgradeFilterCategory = UpgradeCategory | 'all'
