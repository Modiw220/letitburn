import {
  PRIVACY_CONTACT_CONFIG,
  PRIVACY_POLICY_META,
  PAYMENT_PRIVACY_CONFIG,
  EMAIL_PROVIDER_CONFIG,
  MINIMUM_USER_AGE,
} from '../config/privacyConfig'

export interface PrivacyConfigValidation {
  isProductionReady: boolean
  missingFields: string[]
}

export function validatePrivacyConfig(): PrivacyConfigValidation {
  const missingFields: string[] = []

  if (PRIVACY_POLICY_META.effectiveDate === 'TODO') {
    missingFields.push('PRIVACY_POLICY_META.effectiveDate')
  }
  if (PRIVACY_POLICY_META.lastUpdated === 'TODO') {
    missingFields.push('PRIVACY_POLICY_META.lastUpdated')
  }
  if (PRIVACY_POLICY_META.version === 'TODO') {
    missingFields.push('PRIVACY_POLICY_META.version')
  }
  if (!PRIVACY_CONTACT_CONFIG.privacyEmail) {
    missingFields.push('PRIVACY_CONTACT_CONFIG.privacyEmail')
  }

  const stripeConfigured =
    import.meta.env.VITE_QUIZ_PAYMENT_MODE === 'stripe' ||
    import.meta.env.VITE_DONATION_PAYMENT_MODE === 'stripe'

  if (stripeConfigured && !PAYMENT_PRIVACY_CONFIG.providerName) {
    missingFields.push('PAYMENT_PRIVACY_CONFIG.providerName')
  }

  if (EMAIL_PROVIDER_CONFIG.enabled && !EMAIL_PROVIDER_CONFIG.name) {
    missingFields.push('EMAIL_PROVIDER_CONFIG.name')
  }

  if (MINIMUM_USER_AGE === null) {
    missingFields.push('MINIMUM_USER_AGE')
  }

  return {
    isProductionReady: missingFields.length === 0,
    missingFields,
  }
}

export function shouldShowPrivacyConfigWarning(): boolean {
  return import.meta.env.DEV && !validatePrivacyConfig().isProductionReady
}

export function getProductionSafePolicyDate(value: string): string | null {
  if (value === 'TODO') return null
  return value
}
