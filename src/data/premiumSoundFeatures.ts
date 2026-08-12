import type { PremiumSoundFeature } from '../types/sounds'

export const premiumSoundFeatures: PremiumSoundFeature[] = [
  {
    id: 'mixer',
    title: 'Sound Mixer',
    description: 'Layer rain, fire, waves, and other sounds together.',
    icon: 'sliders',
    productId: 'sound-mixer',
    entitlementCheck: 'sound-mixer',
  },
  {
    id: 'saved-mixes',
    title: 'Saved Mixes',
    description: 'Save favorite combinations and return to them later.',
    icon: 'heart',
    productId: 'sound-mixer',
    entitlementCheck: 'sound-mixer',
  },
  {
    id: 'premium-scapes',
    title: 'Premium Soundscapes',
    description: 'Explore longer and more detailed immersive environments.',
    icon: 'sparkles',
    productId: 'premium-sounds',
    entitlementCheck: 'premium-sounds',
  },
  {
    id: 'ad-free',
    title: 'Ad-Free Listening',
    description: 'Enjoy the sound library without advertisement placements.',
    icon: 'badge',
    productId: 'remove-ads-forever',
    entitlementCheck: 'ad-free',
  },
]
