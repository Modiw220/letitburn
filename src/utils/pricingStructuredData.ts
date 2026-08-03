import { getAvailableUpgrades } from '../config/upgradePricing'
import { formatUpgradePrice } from './formatUpgradePrice'

export function buildPricingStructuredData(origin?: string) {
  const base = origin ?? (typeof window !== 'undefined' ? window.location.origin : '')
  const available = getAvailableUpgrades()

  if (available.length === 0) return undefined

  return {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'Let It Burn Optional Upgrades',
    url: `${base}/pricing`,
    itemListElement: available.map((product, index) => ({
      '@type': 'Offer',
      position: index + 1,
      name: product.title,
      description: product.description,
      price: formatUpgradePrice(product.price).replace('$', ''),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      url: product.route ? `${base}${product.route}` : `${base}/pricing#upgrades`,
    })),
  }
}
