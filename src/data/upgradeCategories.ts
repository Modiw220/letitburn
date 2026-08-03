import type { UpgradeFilterCategory } from '../types/upgrades'

export const upgradeCategoryFilters: {
  id: UpgradeFilterCategory
  label: string
}[] = [
  { id: 'all', label: 'All Upgrades' },
  { id: 'quiz-report', label: 'Quiz Reports' },
  { id: 'ad-free', label: 'Ad-Free' },
  { id: 'drawing', label: 'Drawing' },
  { id: 'sounds', label: 'Sounds' },
  { id: 'bundle', label: 'Bundles' },
]

export const categoryLabels: Record<string, string> = {
  'quiz-report': 'Quiz Report',
  'ad-free': 'Ad-Free',
  drawing: 'Drawing',
  sounds: 'Sounds',
  bundle: 'Bundle',
}
