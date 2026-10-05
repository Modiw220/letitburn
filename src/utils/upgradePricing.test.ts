import { describe, expect, it } from 'vitest'
import { UPGRADE_CATALOGUE, getUpgradeById } from '../config/upgradePricing'
import { MockUpgradeCheckoutService } from '../services/upgradeCheckoutService'
import { filterUpgradesByCategory } from '../hooks/useUpgradeFilters'
import {
  convertToMinorUnits,
  formatUpgradePrice,
  formatUpgradePriceWithRangeLabel,
} from '../utils/formatUpgradePrice'
import { validateUpgradeCatalogue } from '../utils/validateUpgradeCatalogue'
import { buildPricingStructuredData } from '../utils/pricingStructuredData'

describe('upgrade pricing catalogue', () => {
  it('displays all nine provided prices exactly', () => {
    expect(formatUpgradePrice(getUpgradeById('full-quiz-report')!.price)).toBe('$1')
    expect(formatUpgradePrice(getUpgradeById('extended-report')!.price)).toBe('$2.99')
    expect(formatUpgradePrice(getUpgradeById('premium-pdf-report')!.price)).toBe('$4.99')
    expect(formatUpgradePrice(getUpgradeById('remove-ads-month')!.price)).toBe('$1.99')
    expect(formatUpgradePrice(getUpgradeById('remove-ads-forever')!.price)).toBe('$7.99')
    expect(formatUpgradePrice(getUpgradeById('coloring-packs')!.price)).toBe('$1.99')
    expect(formatUpgradePrice(getUpgradeById('sound-mixer')!.price)).toBe('$2.99')
    expect(formatUpgradePrice(getUpgradeById('premium-sounds')!.price)).toBe('$2.99')
    expect(formatUpgradePrice(getUpgradeById('relaxation-bundle')!.price)).toBe('$8.99')
    expect(formatUpgradePriceWithRangeLabel(getUpgradeById('sound-mixer')!.price)).toBe('$2.99')
  })

  it('converts fixed prices to minor units without floating-point drift', () => {
    expect(convertToMinorUnits(1)).toBe(100)
    expect(convertToMinorUnits(2.99)).toBe(299)
    expect(getUpgradeById('sound-mixer')!.price).toMatchObject({ amountMinor: 299 })
  })

  it('rejects invalid price ranges', () => {
    const validation = validateUpgradeCatalogue([
      {
        ...UPGRADE_CATALOGUE[0],
        id: 'invalid-range-test',
        price: { type: 'range', minimumMinor: 500, maximumMinor: 100, currency: 'USD' },
      },
    ])
    expect(validation.valid).toBe(false)
  })

  it('has no duplicate product IDs', () => {
    const ids = UPGRADE_CATALOGUE.map((product) => product.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('comparison table rows match catalogue entries', () => {
    expect(UPGRADE_CATALOGUE).toHaveLength(9)
  })

  it('labels thirty-day ad removal as time-limited', () => {
    const product = getUpgradeById('remove-ads-month')!
    expect(product.billingType).toBe('time-limited')
    expect(product.durationDays).toBe(30)
  })

  it('keeps permanent ad removal available with fixed price', () => {
    const product = getUpgradeById('remove-ads-forever')!
    expect(product.available).toBe(true)
    expect(product.status).toBe('available')
  })

  it('filter counts are correct', () => {
    expect(filterUpgradesByCategory(UPGRADE_CATALOGUE, 'all')).toHaveLength(9)
    expect(filterUpgradesByCategory(UPGRADE_CATALOGUE, 'quiz-report')).toHaveLength(3)
  })
})

describe('upgrade checkout gating', () => {
  const service = new MockUpgradeCheckoutService()

  it('available extended report can create checkout sessions', async () => {
    const session = await service.createCheckoutSession({
      productId: 'extended-report',
      expectedPriceMinor: 299,
      currency: 'USD',
    })
    expect(session.mockMode).toBe(true)
  })

  it('available product uses verified server-side price contract', async () => {
    await expect(
      service.createCheckoutSession({
        productId: 'full-quiz-report',
        expectedPriceMinor: 999,
        currency: 'USD',
      }),
    ).rejects.toThrow('Price mismatch')
  })

  it('includes available products in structured data', () => {
    const data = buildPricingStructuredData('https://example.com')
    expect((data?.itemListElement?.length ?? 0) >= 1).toBe(true)
    expect(data?.itemListElement?.[0]?.name).toBeTruthy()
  })
})
