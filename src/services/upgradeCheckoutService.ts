import type {
  CreateUpgradeCheckoutInput,
  UpgradeCheckoutService,
  UpgradeCheckoutSession,
  UpgradePurchaseVerification,
  VerifyUpgradePurchaseInput,
} from '../types/upgrades'
import { getUpgradeById } from '../config/upgradePricing'

export class UnavailableUpgradeCheckoutService implements UpgradeCheckoutService {
  async createCheckoutSession(_input: CreateUpgradeCheckoutInput): Promise<UpgradeCheckoutSession> {
    throw new Error('Upgrade checkout is not available for this product.')
  }

  async verifyPurchase(_input: VerifyUpgradePurchaseInput): Promise<UpgradePurchaseVerification> {
    return {
      verified: false,
      errorMessage: 'Upgrade verification is not available.',
    }
  }
}

export class MockUpgradeCheckoutService implements UpgradeCheckoutService {
  async createCheckoutSession(input: CreateUpgradeCheckoutInput): Promise<UpgradeCheckoutSession> {
    const product = getUpgradeById(input.productId)
    if (!product?.available || product.status !== 'available') {
      throw new Error('This upgrade is not available for purchase.')
    }

    if (product.price.type === 'fixed' && input.expectedPriceMinor !== undefined) {
      if (input.expectedPriceMinor !== product.price.amountMinor) {
        throw new Error('Price mismatch. Server-side validation required.')
      }
    }

    return {
      sessionId: `mock_upgrade_${input.productId}_${Date.now()}`,
      mockMode: true,
    }
  }

  async verifyPurchase(input: VerifyUpgradePurchaseInput): Promise<UpgradePurchaseVerification> {
    const product = getUpgradeById(input.productId)
    if (!product) {
      return { verified: false, errorMessage: 'Unknown product.' }
    }

    return {
      verified: true,
      productId: product.id,
      amountMinor: product.price.type === 'fixed' ? product.price.amountMinor : undefined,
      currency: 'USD',
      entitlementType: product.entitlementType,
    }
  }
}

export class PaymentProviderUpgradeService implements UpgradeCheckoutService {
  async createCheckoutSession(input: CreateUpgradeCheckoutInput): Promise<UpgradeCheckoutSession> {
    const response = await fetch('/api/upgrades/create-checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })

    if (!response.ok) {
      throw new Error('Unable to create upgrade checkout session.')
    }

    return response.json() as Promise<UpgradeCheckoutSession>
  }

  async verifyPurchase(input: VerifyUpgradePurchaseInput): Promise<UpgradePurchaseVerification> {
    const response = await fetch('/api/upgrades/verify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })

    if (!response.ok) {
      return {
        verified: false,
        errorMessage: 'We could not verify the upgrade purchase.',
      }
    }

    return response.json() as Promise<UpgradePurchaseVerification>
  }
}

export function getUpgradeCheckoutService(): UpgradeCheckoutService {
  const mode = import.meta.env.VITE_UPGRADE_PAYMENT_MODE ?? import.meta.env.VITE_QUIZ_PAYMENT_MODE
  if (mode === 'stripe') {
    return new PaymentProviderUpgradeService()
  }
  if (import.meta.env.DEV || import.meta.env.VITE_ALLOW_MOCK_UPGRADES === 'true') {
    return new MockUpgradeCheckoutService()
  }
  return new UnavailableUpgradeCheckoutService()
}
