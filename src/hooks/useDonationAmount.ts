import { useCallback, useMemo, useState } from 'react'
import { donationTiers } from '../data/donationTiers'
import type { DonationSelection } from '../types/donations'
import { formatCurrency } from '../utils/formatCurrency'
import { validateDonationAmount } from '../utils/validateDonationAmount'

export function useDonationAmount() {
  const [selection, setSelection] = useState<DonationSelection>({
    tierId: null,
    amount: null,
    customAmount: '',
  })

  const selectTier = useCallback((tierId: string) => {
    const tier = donationTiers.find((t) => t.id === tierId)
    if (!tier) return

    if (tier.custom) {
      setSelection({ tierId, amount: null, customAmount: selection.customAmount })
      return
    }

    setSelection({ tierId, amount: tier.amount, customAmount: '' })
  }, [selection.customAmount])

  const setCustomAmount = useCallback((value: string) => {
    setSelection((prev) => ({
      ...prev,
      tierId: 'tier-custom',
      customAmount: value,
      amount: null,
    }))
  }, [])

  const clearSelection = useCallback(() => {
    setSelection({ tierId: null, amount: null, customAmount: '' })
  }, [])

  const validation = useMemo(() => {
    if (selection.tierId === 'tier-custom') {
      if (!selection.customAmount.trim()) {
        return { valid: false, amount: null, amountInMinorUnits: null, error: null }
      }
      return validateDonationAmount(selection.customAmount)
    }

    if (selection.amount !== null) {
      return validateDonationAmount(selection.amount)
    }

    return { valid: false, amount: null, amountInMinorUnits: null, error: null }
  }, [selection.amount, selection.customAmount, selection.tierId])

  const formattedAmount = validation.amount !== null ? formatCurrency(validation.amount) : null

  return {
    selection,
    selectTier,
    setCustomAmount,
    clearSelection,
    validation,
    formattedAmount,
    isCustomSelected: selection.tierId === 'tier-custom',
  }
}
