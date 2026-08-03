import { describe, expect, it } from 'vitest'
import { ADS_ENABLED } from '../types/sounds'
import { PRIVACY_FEATURE_FLAGS, PRIVACY_POLICY_META } from '../config/privacyConfig'
import { privacySections, privacySectionIds } from '../data/privacySections'
import { enabledStorageEntries, storageRegistry } from '../data/storageRegistry'
import {
  getProductionSafePolicyDate,
  shouldShowPrivacyConfigWarning,
  validatePrivacyConfig,
} from '../utils/validatePrivacyConfig'

describe('privacy page configuration', () => {
  it('every table-of-contents link matches a real section', () => {
    const tocIds = privacySections.map((section) => section.id)
    expect(tocIds).toEqual(privacySectionIds)
    tocIds.forEach((id) => {
      expect(privacySections.some((section) => section.id === id)).toBe(true)
    })
  })

  it('policy dates come from central configuration', () => {
    expect(PRIVACY_POLICY_META.effectiveDate).toBeDefined()
    expect(PRIVACY_POLICY_META.lastUpdated).toBeDefined()
    expect(PRIVACY_POLICY_META.version).toBeDefined()
  })

  it('storage table registry excludes burn notes and quiz answers', () => {
    const keys = storageRegistry.map((entry) => entry.key)
    expect(keys.some((key) => key.includes('burn') && key.includes('note'))).toBe(false)
    expect(keys.some((key) => key.includes('quiz'))).toBe(false)
  })

  it('ads-disabled state matches configuration flag', () => {
    expect(PRIVACY_FEATURE_FLAGS.adsEnabled).toBe(ADS_ENABLED)
    expect(PRIVACY_FEATURE_FLAGS.adsEnabled).toBe(false)
  })

  it('does not expose TODO placeholders as production-safe dates', () => {
    expect(getProductionSafePolicyDate('TODO')).toBeNull()
    expect(getProductionSafePolicyDate('2026-01-01')).toBe('2026-01-01')
  })

  it('detects missing production configuration', () => {
    const validation = validatePrivacyConfig()
    expect(validation.isProductionReady).toBe(false)
    expect(validation.missingFields.length).toBeGreaterThan(0)
  })

  it('shows configuration warning only in development', () => {
    expect(shouldShowPrivacyConfigWarning()).toBe(import.meta.env.DEV)
  })

  it('enabled storage entries come from the registry', () => {
    expect(enabledStorageEntries.every((entry) => entry.enabled)).toBe(true)
    expect(enabledStorageEntries.length).toBeGreaterThan(0)
  })
})
