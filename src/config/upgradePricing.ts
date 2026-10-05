/**
 * Central upgrade catalogue — single source of truth for pricing page products.
 *
 * Persistent access uses server-side entitlements tied to authenticated accounts.
 */

import { QUIZ_REPORT_PRICE } from '../data/quizPricing'
import type { UpgradeProduct } from '../types/upgrades'

export const UPGRADE_CATALOGUE: UpgradeProduct[] = [
  {
    id: 'full-quiz-report',
    title: 'Full Quiz Report',
    category: 'quiz-report',
    price: {
      type: 'fixed',
      amountMinor: QUIZ_REPORT_PRICE.amountInMinorUnits,
      currency: 'USD',
    },
    billingType: 'one-time',
    entitlementType: 'single-report',
    description:
      'A detailed reflection report available after completing a supported quiz.',
    includedFeatures: [
      'Expanded result explanation',
      'Dimension breakdown',
      'Personalized reflection prompts',
      'Calming exercises',
      'Standard PDF download',
    ],
    limitation: 'Available for supported quizzes such as the Emotional Wellbeing Check-In.',
    status: 'available',
    icon: 'file-text',
    accent: 'blue',
    route: '/quizzes/emotional-wellbeing-check-in',
    available: true,
    mainBenefit: 'Deeper quiz reflection with expanded prompts and exercises',
  },
  {
    id: 'extended-report',
    title: 'Extended Reflection Report',
    category: 'quiz-report',
    price: { type: 'fixed', amountMinor: 299, currency: 'USD' },
    billingType: 'one-time',
    entitlementType: 'single-report',
    description:
      'A longer report with additional interpretation, exercises, and guided reflection sections.',
    includedFeatures: [
      'More detailed pattern breakdown',
      'Additional journaling prompts',
      'Longer practical reflection guide',
      'Expanded suggested-next-step section',
    ],
    status: 'available',
    icon: 'files',
    accent: 'lavender',
    available: true,
    mainBenefit: 'Extended interpretation and guided reflection',
  },
  {
    id: 'premium-pdf-report',
    title: 'Premium PDF Report',
    category: 'quiz-report',
    price: { type: 'fixed', amountMinor: 499, currency: 'USD' },
    billingType: 'one-time',
    entitlementType: 'download',
    description:
      'A polished printable report designed for personal reflection and offline use.',
    includedFeatures: [
      'Print-optimized layout',
      'Expanded visual summaries',
      'Additional worksheets',
      'Printable prompt pages',
      'High-quality PDF formatting',
    ],
    status: 'available',
    icon: 'file-down',
    accent: 'gold',
    available: true,
    mainBenefit: 'Print-ready reflection report',
  },
  {
    id: 'remove-ads-month',
    title: 'Remove Ads for One Month',
    category: 'ad-free',
    price: { type: 'fixed', amountMinor: 199, currency: 'USD' },
    billingType: 'time-limited',
    entitlementType: 'ad-removal',
    durationDays: 30,
    description:
      'Hide eligible advertisement placements for 30 days on your signed-in account.',
    includedFeatures: [
      'Eligible ad placements hidden for 30 days',
      'Applies only where advertising is enabled',
      'One-time purchase, not a subscription',
    ],
    limitation: 'Requires an account so the entitlement can restore across devices.',
    status: 'available',
    icon: 'calendar-off',
    accent: 'green',
    available: true,
    mainBenefit: 'Temporary ad-free browsing on eligible pages',
  },
  {
    id: 'remove-ads-forever',
    title: 'Remove Ads Forever',
    category: 'ad-free',
    price: { type: 'fixed', amountMinor: 799, currency: 'USD' },
    billingType: 'one-time',
    entitlementType: 'ad-removal',
    description:
      'Permanent ad-removal for eligible pages on your account.',
    includedFeatures: [
      'Permanent ad removal on eligible pages',
      'Restores with your account on other devices',
    ],
    limitation: 'Applies to eligible placements while advertising remains part of the product.',
    status: 'available',
    icon: 'badge-check',
    accent: 'green',
    available: true,
    mainBenefit: 'Long-term ad-free access on eligible pages',
  },
  {
    id: 'coloring-packs',
    title: 'Premium Coloring Packs',
    category: 'drawing',
    price: { type: 'fixed', amountMinor: 199, currency: 'USD' },
    billingType: 'one-time-per-pack',
    entitlementType: 'content-pack',
    description:
      'Optional themed collections of original adult-coloring templates.',
    includedFeatures: [
      'Botanical Calm',
      'Moonlit Patterns',
      'Geometric Reset',
      'Quiet Landscapes',
      'Free templates remain available',
    ],
    limitation: 'Checkout unlocks the Botanical Calm starter pack; more packs can be added from Drawing.',
    status: 'available',
    icon: 'palette',
    accent: 'purple',
    route: '/relaxing-drawing',
    available: true,
    mainBenefit: 'Extra themed coloring templates',
  },
  {
    id: 'sound-mixer',
    title: 'Sound Mixer',
    category: 'sounds',
    price: { type: 'fixed', amountMinor: 299, currency: 'USD' },
    billingType: 'one-time',
    entitlementType: 'feature-access',
    description:
      'Layer multiple sounds and control each sound independently.',
    includedFeatures: [
      'Multi-sound playback',
      'Individual volume controls',
      'Basic mix presets',
      'Timer compatibility',
    ],
    status: 'available',
    icon: 'sliders-horizontal',
    accent: 'cyan',
    route: '/sounds',
    available: true,
    mainBenefit: 'Layer and mix calming sounds',
  },
  {
    id: 'premium-sounds',
    title: 'Premium Soundscapes',
    category: 'sounds',
    price: { type: 'fixed', amountMinor: 299, currency: 'USD' },
    billingType: 'one-time-per-pack',
    entitlementType: 'content-pack',
    description:
      'Optional longer or more detailed sound collections.',
    includedFeatures: [
      'Night Rain',
      'Coastal Evening',
      'Winter Fireplace',
      'Forest After Storm',
      'Quiet Library',
      'Free sounds remain available',
    ],
    limitation: 'Checkout unlocks the Night Rain starter collection; more packs can be added from Sounds.',
    status: 'available',
    icon: 'headphones',
    accent: 'cyan',
    route: '/sounds',
    available: true,
    mainBenefit: 'Additional premium sound collections',
  },
  {
    id: 'relaxation-bundle',
    title: 'Relaxation Bundle',
    category: 'bundle',
    price: { type: 'fixed', amountMinor: 899, currency: 'USD' },
    billingType: 'one-time',
    entitlementType: 'bundle',
    description:
      'A combined collection of drawing, sound, and reflection upgrades.',
    includedFeatures: [
      'Botanical Calm coloring pack',
      'Sound Mixer access',
      'Night Rain soundscape collection',
      'Extended reflection report credit',
    ],
    status: 'available',
    icon: 'package-open',
    accent: 'gold',
    available: true,
    mainBenefit: 'Combined drawing, sound, and reflection upgrades',
  },
]

export function getUpgradeById(id: string): UpgradeProduct | undefined {
  return UPGRADE_CATALOGUE.find((product) => product.id === id)
}

export function getAvailableUpgrades(): UpgradeProduct[] {
  return UPGRADE_CATALOGUE.filter((product) => product.available && product.status === 'available')
}
