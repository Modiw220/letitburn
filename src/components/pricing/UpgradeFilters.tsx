import { upgradeCategoryFilters } from '../../data/upgradeCategories'
import type { UpgradeFilterCategory } from '../../types/upgrades'

interface UpgradeFiltersProps {
  category: UpgradeFilterCategory
  onCategoryChange: (category: UpgradeFilterCategory) => void
  resultLabel: string
}

export default function UpgradeFilters({
  category,
  onCategoryChange,
  resultLabel,
}: UpgradeFiltersProps) {
  return (
    <div className="upgrade-filters">
      <div
        className="flex gap-2 overflow-x-auto pb-1"
        role="group"
        aria-label="Filter optional upgrades by category"
      >
        {upgradeCategoryFilters.map((filter) => {
          const selected = category === filter.id
          return (
            <button
              key={filter.id}
              type="button"
              className={`min-h-[44px] shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                selected
                  ? 'border-calm-cyan/40 bg-calm-cyan/10 text-text-main'
                  : 'border-white/10 bg-white/[0.03] text-text-muted hover:text-text-main'
              }`}
              aria-pressed={selected}
              onClick={() => onCategoryChange(filter.id)}
            >
              {filter.label}
            </button>
          )
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        {resultLabel}
      </p>
      <p className="mt-3 text-sm text-text-muted" aria-hidden="true">
        {resultLabel}
      </p>
    </div>
  )
}
