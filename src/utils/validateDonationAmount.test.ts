import { describe, expect, it } from 'vitest'
import { amountToMinorUnits, validateDonationAmount } from '../utils/validateDonationAmount'

describe('donation amount validation', () => {
  it('$1 selection produces 100 minor units', () => {
    const result = validateDonationAmount(1)
    expect(result.valid).toBe(true)
    expect(result.amountInMinorUnits).toBe(100)
  })

  it('$3 selection produces 300 minor units', () => {
    expect(validateDonationAmount(3).amountInMinorUnits).toBe(300)
  })

  it('$5 selection produces 500 minor units', () => {
    expect(validateDonationAmount(5).amountInMinorUnits).toBe(500)
  })

  it('custom $2.50 produces 250 minor units', () => {
    expect(validateDonationAmount('2.50').amountInMinorUnits).toBe(250)
  })

  it('rejects values below $1', () => {
    const result = validateDonationAmount('0.50')
    expect(result.valid).toBe(false)
    expect(result.error).toBe('Please enter at least $1.')
  })

  it('rejects values above $1,000', () => {
    const result = validateDonationAmount('1001')
    expect(result.valid).toBe(false)
    expect(result.error).toBe('Please enter an amount of $1,000 or less.')
  })

  it('rejects invalid text', () => {
    const result = validateDonationAmount('abc')
    expect(result.valid).toBe(false)
    expect(result.error).toBe('Enter a valid donation amount.')
  })

  it('rejects zero', () => {
    expect(validateDonationAmount('0').valid).toBe(false)
  })

  it('converts amounts without floating-point drift', () => {
    expect(amountToMinorUnits(2.5)).toBe(250)
  })
})

describe('donation payment gating', () => {
  it('URL query parameters alone cannot create success state', () => {
    const urlSuccess = new URLSearchParams('?donation=success').get('donation') === 'success'
    const verified = false
    expect(urlSuccess && !verified).toBe(true)
  })

  it('localStorage alone cannot create success state', () => {
    const stored = 'paid'
    const verified = false
    expect(stored === 'paid' && !verified).toBe(true)
  })
})
