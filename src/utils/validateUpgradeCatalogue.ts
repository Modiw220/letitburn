import { UPGRADE_CATALOGUE } from '../config/upgradePricing'
import type { UpgradeProduct } from '../types/upgrades'

export interface CatalogueValidation {
  valid: boolean
  invalidProductIds: string[]
  errors: string[]
}

export function validateUpgradeCatalogue(
  products: UpgradeProduct[] = UPGRADE_CATALOGUE,
): CatalogueValidation {
  const invalidProductIds: string[] = []
  const errors: string[] = []
  const seenIds = new Set<string>()

  products.forEach((product) => {
    if (seenIds.has(product.id)) {
      invalidProductIds.push(product.id)
      errors.push(`Duplicate product ID: ${product.id}`)
    }
    seenIds.add(product.id)

    if (product.price.type === 'range' && product.price.minimumMinor > product.price.maximumMinor) {
      invalidProductIds.push(product.id)
      errors.push(`Invalid price range for ${product.id}`)
    }

    if (product.price.currency !== 'USD') {
      invalidProductIds.push(product.id)
      errors.push(`Unsupported currency for ${product.id}`)
    }

    if (product.available && product.status !== 'available') {
      invalidProductIds.push(product.id)
      errors.push(`${product.id} is marked available but status is ${product.status}`)
    }

    if (product.status === 'available' && !product.available) {
      invalidProductIds.push(product.id)
      errors.push(`${product.id} has available status but available flag is false`)
    }

    if (product.available && !product.route && product.entitlementType === 'single-report') {
      invalidProductIds.push(product.id)
      errors.push(`${product.id} is available but has no route`)
    }
  })

  return {
    valid: invalidProductIds.length === 0 && errors.length === 0,
    invalidProductIds: [...new Set(invalidProductIds)],
    errors,
  }
}

export function getProductionSafeProducts(
  products: UpgradeProduct[] = UPGRADE_CATALOGUE,
): UpgradeProduct[] {
  const validation = validateUpgradeCatalogue(products)
  if (validation.valid) return products
  if (import.meta.env.DEV) return products
  return products.filter((product) => !validation.invalidProductIds.includes(product.id))
}
