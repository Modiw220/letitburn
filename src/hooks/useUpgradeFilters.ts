import { useMemo, useState } from 'react'
import { UPGRADE_CATALOGUE } from '../config/upgradePricing'
import type { UpgradeFilterCategory, UpgradeProduct } from '../types/upgrades'

export function useUpgradeFilters() {
  const [category, setCategory] = useState<UpgradeFilterCategory>('all')

  const filteredProducts = useMemo(() => {
    if (category === 'all') return UPGRADE_CATALOGUE
    return UPGRADE_CATALOGUE.filter((product) => product.category === category)
  }, [category])

  const resultLabel = useMemo(() => {
    const count = filteredProducts.length
    const noun = count === 1 ? 'optional upgrade' : 'optional upgrades'
    if (category === 'all') return `Showing ${count} ${noun}`
    return `Showing ${count} ${category.replace('-', ' ')} ${count === 1 ? 'upgrade' : 'upgrades'}`
  }, [category, filteredProducts.length])

  return {
    category,
    setCategory,
    filteredProducts,
    resultLabel,
    totalCount: UPGRADE_CATALOGUE.length,
  }
}

export function filterUpgradesByCategory(
  products: UpgradeProduct[],
  category: UpgradeFilterCategory,
): UpgradeProduct[] {
  if (category === 'all') return products
  return products.filter((product) => product.category === category)
}
