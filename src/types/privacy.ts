export interface PrivacySection {
  id: string
  number: number
  title: string
  summary: string
  icon: string
  accent: string
}

export interface PrivacySummaryItem {
  id: string
  title: string
  description: string
  icon: string
}

export interface PrivacyRightGroup {
  id: string
  region: string
  introduction: string
  rights: string[]
  notes: string[]
}

export interface RetentionItem {
  id: string
  dataType: string
  location: string
  purpose: string
  retention: string
  deletionTrigger: string
}

export interface CookieCategory {
  id: string
  title: string
  purpose: string
  required: boolean
  examples: string[]
  typicalDuration: string
  control: string
}

export interface PrivacyContactConfig {
  privacyEmail?: string
  supportEmail?: string
  mailingAddress?: string
  dataProtectionContact?: string
}

export interface PrivacyProviderConfig {
  name: string
  purpose: string
  privacyUrl?: string
  enabled: boolean
}

export interface StorageEntry {
  key: string
  technology: 'cookie' | 'localStorage' | 'sessionStorage'
  category: 'essential' | 'preference' | 'analytics' | 'advertising'
  purpose: string
  duration: string
  enabled: boolean
}

export type PrivacyRequestType =
  | 'access'
  | 'correction'
  | 'deletion'
  | 'objection'
  | 'restriction'
  | 'portability'
  | 'opt-out'
  | 'consent-withdrawal'
  | 'other'

export interface PrivacyRequestInput {
  type: PrivacyRequestType
  email: string
  details: string
}

export interface PrivacyRequestResult {
  submitted: boolean
  reference?: string
  message: string
}

export interface PrivacyPolicyMeta {
  effectiveDate: string
  lastUpdated: string
  version: string
}

export interface PaymentPrivacyConfig {
  providerName: string
  providerPrivacyUrl: string
  dataReceivedByPlatform: string[]
}
