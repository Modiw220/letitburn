import type { PrivacySummaryItem } from '../types/privacy'

export const privacySummaryItems: PrivacySummaryItem[] = [
  {
    id: 'private-by-design',
    title: 'Private by design',
    description: 'We aim to avoid collecting sensitive content that a feature does not need.',
    icon: 'shield-check',
  },
  {
    id: 'you-stay-in-control',
    title: 'You stay in control',
    description: 'You choose when to write, download, purchase, or request email delivery.',
    icon: 'sliders-horizontal',
  },
  {
    id: 'no-selling-emotional-data',
    title: 'No selling emotional data',
    description: 'We do not sell private writing or quiz-answer content.',
    icon: 'eye-off',
  },
  {
    id: 'built-with-care',
    title: 'Built with care',
    description: 'Privacy decisions are treated as part of the product experience.',
    icon: 'heart',
  },
]
