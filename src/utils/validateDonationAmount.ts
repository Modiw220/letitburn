import { DONATION_CONFIG } from '../data/donationConfig'
import type { DonationAmountValidation } from '../types/donations'

export function amountToMinorUnits(amount: number): number {
  return Math.round(amount * 100)
}

export function validateDonationAmount(raw: string | number | null): DonationAmountValidation {
  if (raw === null || raw === '') {
    return { valid: false, amount: null, amountInMinorUnits: null, error: null }
  }

  const normalized = typeof raw === 'number' ? String(raw) : raw.trim().replace(/^\$/, '')

  if (!/^\d+(\.\d{1,2})?$/.test(normalized)) {
    return {
      valid: false,
      amount: null,
      amountInMinorUnits: null,
      error: 'Enter a valid donation amount.',
    }
  }

  const amount = Number(normalized)

  if (!Number.isFinite(amount) || amount <= 0) {
    return {
      valid: false,
      amount: null,
      amountInMinorUnits: null,
      error: 'Enter a valid donation amount.',
    }
  }

  if (amount < DONATION_CONFIG.minimumAmount) {
    return {
      valid: false,
      amount: null,
      amountInMinorUnits: null,
      error: 'Please enter at least $1.',
    }
  }

  if (amount > DONATION_CONFIG.maximumAmount) {
    return {
      valid: false,
      amount: null,
      amountInMinorUnits: null,
      error: 'Please enter an amount of $1,000 or less.',
    }
  }

  return {
    valid: true,
    amount,
    amountInMinorUnits: amountToMinorUnits(amount),
    error: null,
  }
}
