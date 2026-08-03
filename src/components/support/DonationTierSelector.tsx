import { donationTiers } from '../../data/donationTiers'
import DonationTierCard from './DonationTierCard'

interface DonationTierSelectorProps {
  selectedTierId: string | null
  onSelect: (tierId: string) => void
}

export default function DonationTierSelector({
  selectedTierId,
  onSelect,
}: DonationTierSelectorProps) {
  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      role="group"
      aria-label="Donation amount options"
    >
      {donationTiers.map((tier) => (
        <DonationTierCard
          key={tier.id}
          tier={tier}
          selected={selectedTierId === tier.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  )
}
