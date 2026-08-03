import type { UpgradePrice } from '../../types/upgrades'
import { formatUpgradePrice, formatUpgradePriceWithRangeLabel } from '../../utils/formatUpgradePrice'

interface UpgradePriceDisplayProps {
  price: UpgradePrice
  className?: string
}

export default function UpgradePriceDisplay({ price, className = '' }: UpgradePriceDisplayProps) {
  const isRange = price.type === 'range'

  return (
    <div className={className}>
      <p className="text-2xl font-semibold text-text-main" aria-label={isRange ? 'Planned price range' : 'Price'}>
        {isRange ? formatUpgradePriceWithRangeLabel(price) : formatUpgradePrice(price)}
      </p>
      {isRange && (
        <p className="mt-1 text-xs text-text-muted">Final price will be confirmed before launch.</p>
      )}
    </div>
  )
}
