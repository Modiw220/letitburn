import type { DonationTier } from '../types/donations'

export const donationTiers: DonationTier[] = [
  {
    id: 'tier-1',
    amount: 1,
    title: 'Keep the fire burning',
    description: 'A small contribution toward keeping the tools running.',
    icon: 'flame',
    accent: 'orange',
  },
  {
    id: 'tier-3',
    amount: 3,
    title: 'Support anonymous release',
    description: 'Help protect access to private, account-free emotional-release tools.',
    icon: 'shield',
    accent: 'cyan',
  },
  {
    id: 'tier-5',
    amount: 5,
    title: 'Help someone feel lighter',
    description: 'Support the continued development of simple calming and reflection experiences.',
    icon: 'heart',
    accent: 'gold',
  },
  {
    id: 'tier-custom',
    amount: null,
    title: 'Choose your own amount',
    description: 'Give an amount that works for you.',
    icon: 'hand-heart',
    accent: 'purple',
    custom: true,
  },
]
