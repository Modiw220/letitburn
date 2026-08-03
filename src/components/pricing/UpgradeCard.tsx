import { Link } from 'react-router-dom'
import type { UpgradeProduct } from '../../types/upgrades'
import { categoryLabels } from '../../data/upgradeCategories'
import UpgradePriceDisplay from './UpgradePrice'
import UpgradeStatusBadge from './UpgradeStatusBadge'
import { getBillingLabel, getUpgradeIcon, UPGRADE_ACCENT_COLORS } from './pricingUtils'

interface UpgradeCardProps {
  product: UpgradeProduct
}

export default function UpgradeCard({ product }: UpgradeCardProps) {
  const Icon = getUpgradeIcon(product.icon)
  const accent =
    UPGRADE_ACCENT_COLORS[product.accent as keyof typeof UPGRADE_ACCENT_COLORS] ??
    UPGRADE_ACCENT_COLORS.blue

  const actionContent = (() => {
    if (product.available && product.route) {
      return (
        <Link
          to={product.route}
          className="inline-flex min-h-[44px] w-full items-center justify-center rounded-xl border px-4 py-2.5 text-sm font-medium transition-colors"
          style={{ borderColor: `${accent}55`, color: accent, backgroundColor: `${accent}10` }}
        >
          View Upgrade
        </Link>
      )
    }

    if (product.status === 'requires-configuration') {
      return (
        <span className="inline-flex min-h-[44px] w-full items-center justify-center rounded-xl border border-white/10 px-4 py-2.5 text-sm text-text-muted">
          Not Available Yet
        </span>
      )
    }

    return (
      <span
        className="inline-flex min-h-[44px] w-full items-center justify-center rounded-xl border border-white/10 px-4 py-2.5 text-sm text-text-muted"
        aria-disabled="true"
      >
        Coming Later
      </span>
    )
  })()

  return (
    <article
      className="upgrade-card flex h-full flex-col rounded-[18px] border border-white/10 bg-bg-card/60 p-5 md:p-6"
      style={{ boxShadow: `0 0 0 1px ${accent}10` }}
    >
      <div className="flex items-start justify-between gap-3">
        <span
          className="inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide"
          style={{ borderColor: `${accent}33`, color: accent, backgroundColor: `${accent}10` }}
        >
          {categoryLabels[product.category]}
        </span>
        <UpgradeStatusBadge product={product} />
      </div>

      <div
        className="mt-5 flex h-11 w-11 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${accent}18`, color: accent }}
        aria-hidden="true"
      >
        <Icon className="h-5 w-5" strokeWidth={1.5} />
      </div>

      <h3 className="mt-4 font-heading text-xl font-semibold text-text-main">{product.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">{product.description}</p>

      <UpgradePriceDisplay price={product.price} className="mt-5" />

      <p className="mt-2 text-xs text-text-muted">
        {getBillingLabel(product.billingType, product.durationDays)}
      </p>

      <ul className="mt-4 space-y-1.5 text-sm text-text-muted">
        {product.includedFeatures.slice(0, 5).map((feature) => (
          <li key={feature} className="flex gap-2">
            <span aria-hidden="true" style={{ color: accent }}>
              ·
            </span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>

      {product.limitation && (
        <p className="mt-4 text-xs leading-relaxed text-text-muted/90">{product.limitation}</p>
      )}

      <div className="mt-6">{actionContent}</div>
    </article>
  )
}
