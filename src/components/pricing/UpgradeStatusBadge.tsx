import type { UpgradeProduct } from '../../types/upgrades'

interface UpgradeStatusBadgeProps {
  product: UpgradeProduct
}

const statusLabels: Record<UpgradeProduct['status'], string> = {
  available: 'Available',
  planned: 'Planned',
  'coming-later': 'Coming later',
  'requires-configuration': 'Not available yet',
}

const statusClasses: Record<UpgradeProduct['status'], string> = {
  available: 'bg-success-green/15 text-success-green border-success-green/30',
  planned: 'bg-white/5 text-text-muted border-white/10',
  'coming-later': 'bg-white/5 text-text-muted border-white/10',
  'requires-configuration': 'bg-amber-400/10 text-amber-200 border-amber-400/20',
}

export default function UpgradeStatusBadge({ product }: UpgradeStatusBadgeProps) {
  return (
    <span
      className={`inline-flex min-h-[28px] items-center rounded-full border px-2.5 py-1 text-xs font-medium ${statusClasses[product.status]}`}
    >
      {statusLabels[product.status]}
    </span>
  )
}
