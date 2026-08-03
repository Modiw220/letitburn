import { Check } from 'lucide-react'
import type { DonationTier } from '../../types/donations'
import { formatCurrency } from '../../utils/formatCurrency'
import { getTierIcon, TIER_ACCENT_COLORS } from './supportUtils'

interface DonationTierCardProps {
  tier: DonationTier
  selected: boolean
  onSelect: (tierId: string) => void
}

export default function DonationTierCard({ tier, selected, onSelect }: DonationTierCardProps) {
  const Icon = getTierIcon(tier.icon)
  const color = TIER_ACCENT_COLORS[tier.accent]
  const amountLabel = tier.custom ? 'Custom' : formatCurrency(tier.amount ?? 0)

  return (
    <button
      type="button"
      className={`donation-tier-card flex min-h-[120px] w-full flex-col rounded-2xl border p-5 text-left transition-colors ${
        selected
          ? 'border-opacity-60 ring-1'
          : 'border-border-card bg-bg-card/60 hover:border-white/20'
      }`}
      style={
        selected
          ? {
              borderColor: `${color}66`,
              backgroundColor: `${color}10`,
              boxShadow: `0 0 24px ${color}18`,
            }
          : undefined
      }
      onClick={() => onSelect(tier.id)}
      aria-pressed={selected}
    >
      <div className="flex items-start justify-between gap-3">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${color}18`, color }}
          aria-hidden="true"
        >
          <Icon className="h-5 w-5" strokeWidth={1.5} />
        </div>
        {selected && <Check className="h-5 w-5 shrink-0" style={{ color }} aria-hidden="true" />}
      </div>
      <p className="mt-4 text-xl font-semibold text-text-main">{amountLabel}</p>
      <p className="mt-1 font-medium text-text-main">{tier.title}</p>
      <p className="mt-2 text-sm text-text-muted">{tier.description}</p>
    </button>
  )
}
