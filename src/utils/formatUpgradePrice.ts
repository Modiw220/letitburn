import type { UpgradePrice } from '../types/upgrades'

export function convertToMinorUnits(dollars: number): number {
  return Math.round(dollars * 100)
}

export function formatUpgradePrice(price: UpgradePrice): string {
  if (price.type === 'fixed') {
    const dollars = price.amountMinor / 100
    return dollars % 1 === 0 ? `$${dollars.toFixed(0)}` : `$${dollars.toFixed(2)}`
  }

  const min = price.minimumMinor / 100
  const max = price.maximumMinor / 100
  const format = (value: number) =>
    value % 1 === 0 ? `$${value.toFixed(0)}` : `$${value.toFixed(2)}`
  return `${format(min)}–${format(max)}`
}

export function formatUpgradePriceWithRangeLabel(price: UpgradePrice): string {
  if (price.type === 'fixed') {
    return formatUpgradePrice(price)
  }
  return `Planned range: ${formatUpgradePrice(price)}`
}

export function getPriceMinorUnits(price: UpgradePrice): number | null {
  if (price.type === 'fixed') return price.amountMinor
  return null
}
