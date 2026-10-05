/**
 * Central privacy configuration for Let It Burn.
 *
 * Placeholder production values for launch readiness. This policy page should
 * receive qualified legal review before production launch.
 */

import { ADS_ENABLED, STORAGE_KEYS } from '../types/sounds'
import type {
  PaymentPrivacyConfig,
  PrivacyContactConfig,
  PrivacyPolicyMeta,
  PrivacyProviderConfig,
} from '../types/privacy'

export const PRIVACY_POLICY_META: PrivacyPolicyMeta = {
  effectiveDate: '2026-08-12',
  lastUpdated: '2026-08-12',
  version: '1.0.0',
}

export const PRIVACY_CONTACT_CONFIG: PrivacyContactConfig = {
  privacyEmail: 'privacy@letitburn.app',
  supportEmail: 'support@letitburn.app',
  mailingAddress: '',
  dataProtectionContact: '',
}

export const PAYMENT_PRIVACY_CONFIG: PaymentPrivacyConfig = {
  providerName: 'Stripe',
  providerPrivacyUrl: 'https://stripe.com/privacy',
  dataReceivedByPlatform: [
    'Transaction identifier',
    'Amount and currency',
    'Payment status',
    'Date and time of transaction',
  ],
}

export const MINIMUM_USER_AGE: number | null = 16

export const EMAIL_PROVIDER_CONFIG: PrivacyProviderConfig = {
  name: 'Resend',
  purpose: 'Deliver quiz report emails when a user requests email delivery',
  privacyUrl: 'https://resend.com/legal/privacy-policy',
  enabled: true,
}

export const ANALYTICS_PROVIDERS: PrivacyProviderConfig[] = []

export const ADVERTISING_PROVIDER: PrivacyProviderConfig = {
  name: '',
  purpose: 'Display advertisements on less sensitive pages when enabled',
  privacyUrl: '',
  enabled: ADS_ENABLED,
}

export const ERROR_MONITORING_PROVIDER: PrivacyProviderConfig = {
  name: '',
  purpose: 'Monitor application errors and stability',
  privacyUrl: '',
  enabled: false,
}

export const PRIVACY_FEATURE_FLAGS = {
  adsEnabled: ADS_ENABLED,
  analyticsEnabled: ANALYTICS_PROVIDERS.some((p) => p.enabled),
  marketingEmailEnabled: false,
  consentManagerEnabled: false,
  versionHistoryEnabled: false,
  privacyRequestFormEnabled: true,
} as const

export const LOCAL_STORAGE_KEYS = [
  'let-it-burn-theme',
  'let-it-burn-fire-sound',
  STORAGE_KEYS.volume,
  STORAGE_KEYS.muted,
  STORAGE_KEYS.lastSoundId,
  STORAGE_KEYS.timerPreset,
] as const

export const PAYMENT_ENV = {
  quizMode: import.meta.env.VITE_QUIZ_PAYMENT_MODE ?? 'mock',
  donationMode: import.meta.env.VITE_DONATION_PAYMENT_MODE ?? 'mock',
} as const
