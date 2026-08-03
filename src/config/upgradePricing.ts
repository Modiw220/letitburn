/**
 * Central upgrade catalogue — single source of truth for pricing page products.
 *
 * Entitlement note: persistent access (ad removal, packs, bundles) requires
 * server-side entitlement records and/or user accounts before cross-device
 * restoration can be promised. Do not store permanent purchase access only
 * in localStorage.
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
      'Standard PDF download when supported',
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
    status: 'planned',
    icon: 'files',
    accent: 'lavender',
    available: false,
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
    status: 'planned',
    icon: 'file-down',
    accent: 'gold',
    available: false,
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
      'Hide eligible advertisement placements for 30 days on the supported browser or verified purchase account.',
    includedFeatures: [
      'Eligible ad placements hidden for 30 days',
      'Applies only where advertising is enabled',
      'One-time purchase, not a subscription',
    ],
    limitation:
      'Cross-device access requires a secure entitlement system and is not available until configured.',
    status: 'planned',
    icon: 'calendar-off',
    accent: 'green',
    available: false,
    mainBenefit: 'Temporary ad-free browsing on eligible pages',
  },
  {
    id: 'remove-ads-forever',
    title: 'Remove Ads Forever',
    category: 'ad-free',
    price: { type: 'range', minimumMinor: 499, maximumMinor: 999, currency: 'USD' },
    billingType: 'one-time',
    entitlementType: 'ad-removal',
    description:
      'A planned permanent ad-removal option for supported pages.',
    includedFeatures: [
      'Permanent ad removal on eligible pages once configured',
      'Exact entitlement scope to be defined before launch',
    ],
    limitation:
      '“Forever” meaning (account lifetime, service lifetime, or device scope) must be finalized before purchase is enabled.',
    status: 'planned',
    icon: 'badge-check',
    accent: 'green',
    available: false,
    mainBenefit: 'Long-term ad-free access on eligible pages',
  },
  {
    id: 'coloring-packs',
    title: 'Premium Coloring Packs',
    category: 'drawing',
    price: { type: 'range', minimumMinor: 99, maximumMinor: 299, currency: 'USD' },
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
    limitation: 'Each pack’s exact price will be shown before purchase.',
    status: 'planned',
    icon: 'palette',
    accent: 'purple',
    route: '/relaxing-drawing',
    available: false,
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
    status: 'planned',
    icon: 'sliders-horizontal',
    accent: 'cyan',
    route: '/sounds',
    available: false,
    mainBenefit: 'Layer and mix calming sounds',
  },
  {
    id: 'premium-sounds',
    title: 'Premium Soundscapes',
    category: 'sounds',
    price: { type: 'range', minimumMinor: 199, maximumMinor: 499, currency: 'USD' },
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
    limitation: 'Each collection’s exact price will be shown before purchase.',
    status: 'planned',
    icon: 'headphones',
    accent: 'cyan',
    route: '/sounds',
    available: false,
    mainBenefit: 'Additional premium sound collections',
  },
  {
    id: 'relaxation-bundle',
    title: 'Relaxation Bundle',
    category: 'bundle',
    price: { type: 'range', minimumMinor: 699, maximumMinor: 999, currency: 'USD' },
    billingType: 'one-time',
    entitlementType: 'bundle',
    description:
      'A planned collection combining selected reports, drawing content, and sound upgrades.',
    includedFeatures: [
      'One premium coloring pack',
      'Sound Mixer access',
      'One premium soundscape collection',
      'One premium or extended reflection report',
    ],
    limitation: 'Final contents and price will be shown clearly before availability.',
    status: 'coming-later',
    icon: 'package-open',
    accent: 'gold',
    available: false,
    mainBenefit: 'Combined drawing, sound, and reflection upgrades',
  },
]

export function getUpgradeById(id: string): UpgradeProduct | undefined {
  return UPGRADE_CATALOGUE.find((product) => product.id === id)
}

export function getAvailableUpgrades(): UpgradeProduct[] {
  return UPGRADE_CATALOGUE.filter((product) => product.available && product.status === 'available')
}
