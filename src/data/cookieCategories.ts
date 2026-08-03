import type { CookieCategory } from '../types/privacy'
import { enabledStorageEntries } from './storageRegistry'
import { PRIVACY_FEATURE_FLAGS } from '../config/privacyConfig'

const preferenceExamples = enabledStorageEntries
  .filter((entry) => entry.category === 'preference')
  .map((entry) => `${entry.technology}: ${entry.key}`)

const essentialExamples = enabledStorageEntries
  .filter((entry) => entry.category === 'essential')
  .map((entry) => `${entry.technology}: ${entry.key}`)

export const cookieCategories: CookieCategory[] = [
  {
    id: 'essential',
    title: 'Essential',
    purpose: 'Required to operate core site features and security-related functions',
    required: true,
    examples: essentialExamples.length > 0 ? essentialExamples : ['localStorage: let-it-burn-theme'],
    typicalDuration: 'Session to persistent, depending on the technology',
    control: 'Required for basic operation; clearing browser data may reset preferences',
  },
  {
    id: 'preference',
    title: 'Preference',
    purpose: 'Remember choices such as appearance, sound settings, or tool preferences',
    required: false,
    examples:
      preferenceExamples.length > 0
        ? preferenceExamples
        : ['localStorage: letItBurn.soundVolume', 'localStorage: letItBurn.soundMuted'],
    typicalDuration: 'Until cleared by the user or browser',
    control: 'Can be cleared through browser site-data settings',
  },
  {
    id: 'analytics',
    title: 'Analytics',
    purpose: 'Help understand how the service is used so it can be improved',
    required: false,
    examples: PRIVACY_FEATURE_FLAGS.analyticsEnabled
      ? ['Configured analytics provider']
      : ['Not currently enabled'],
    typicalDuration: PRIVACY_FEATURE_FLAGS.analyticsEnabled
      ? 'According to configured provider'
      : 'Not applicable while disabled',
    control: PRIVACY_FEATURE_FLAGS.consentManagerEnabled
      ? 'Manage Cookie Preferences'
      : 'Not currently configurable in the application',
  },
  {
    id: 'advertising',
    title: 'Advertising',
    purpose: 'Support the service through advertisements on less sensitive pages',
    required: false,
    examples: PRIVACY_FEATURE_FLAGS.adsEnabled
      ? ['Configured advertising provider']
      : ['Not currently enabled'],
    typicalDuration: PRIVACY_FEATURE_FLAGS.adsEnabled
      ? 'According to configured provider'
      : 'Not applicable while disabled',
    control: PRIVACY_FEATURE_FLAGS.consentManagerEnabled
      ? 'Manage Cookie Preferences'
      : 'Not currently configurable in the application',
  },
]
