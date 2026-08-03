import { useCallback, useRef, useState } from 'react'
import {
  getDonationPaymentService,
  isMockDonationModeAllowed,
} from '../services/donationPaymentService'
import { setMockDonationOutcome } from '../services/mockDonationPaymentService'
import type {
  DonationPaymentStatus,
  DonationVerification,
} from '../types/donations'

interface UseDonationPaymentOptions {
  onVerified: (result: DonationVerification) => void
  announce: (message: string) => void
}

export function useDonationPayment({ onVerified, announce }: UseDonationPaymentOptions) {
  const [status, setStatus] = useState<DonationPaymentStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [verification, setVerification] = useState<DonationVerification | null>(null)
  const submittingRef = useRef(false)
  const serviceRef = useRef(getDonationPaymentService())

  const resetPayment = useCallback(() => {
    setStatus('idle')
    setErrorMessage(null)
    setSessionId(null)
    setVerification(null)
    submittingRef.current = false
  }, [])

  const startCheckout = useCallback(
    async (amount: number, amountInMinorUnits: number) => {
      if (submittingRef.current) return
      submittingRef.current = true
      setStatus('creating-session')
      setErrorMessage(null)
      announce('Preparing secure payment')

      try {
        const session = await serviceRef.current.createCheckoutSession({
          amount,
          amountInMinorUnits,
          currency: 'USD',
        })
        setSessionId(session.sessionId)

        if (session.checkoutUrl) {
          setStatus('redirecting')
          window.location.href = session.checkoutUrl
          return
        }

        setStatus('idle')
        submittingRef.current = false
      } catch {
        submittingRef.current = false
        setStatus('failed')
        setErrorMessage('Online donations are not configured yet.')
      }
    },
    [announce],
  )

  const verifyDonation = useCallback(
    async (id: string) => {
      setStatus('verifying')
      announce('Confirming your donation')

      try {
        const result = await serviceRef.current.verifyDonation({ sessionId: id })
        if (result.verified) {
          setVerification(result)
          setStatus('succeeded')
          announce('Donation verified')
          onVerified(result)
          return true
        }

        const cancelled = result.errorMessage?.toLowerCase().includes('cancelled')
        setStatus(cancelled ? 'cancelled' : 'failed')
        setErrorMessage(
          cancelled
            ? 'The donation was cancelled. Nothing has changed, and you can continue using Let It Burn.'
            : result.errorMessage ??
                'We could not verify the donation. Please check with your payment provider before trying again.',
        )
        if (cancelled) announce('Donation cancelled')
        return false
      } catch {
        setStatus('failed')
        setErrorMessage(
          'We could not verify the donation. Please check with your payment provider before trying again.',
        )
        return false
      } finally {
        submittingRef.current = false
      }
    },
    [announce, onVerified],
  )

  const simulateMockDonation = useCallback(
    async (
      outcome: 'success' | 'cancelled' | 'failed',
      amount: number,
      amountInMinorUnits: number,
    ) => {
      setMockDonationOutcome(outcome)
      submittingRef.current = true
      setStatus('creating-session')

      try {
        const session = await serviceRef.current.createCheckoutSession({
          amount,
          amountInMinorUnits,
          currency: 'USD',
        })
        setSessionId(session.sessionId)

        if (outcome === 'success') {
          await verifyDonation(session.sessionId)
          return
        }

        if (outcome === 'cancelled') {
          setStatus('cancelled')
          setErrorMessage(
            'The donation was cancelled. Nothing has changed, and you can continue using Let It Burn.',
          )
          announce('Donation cancelled')
        } else {
          setStatus('failed')
          setErrorMessage(
            'We could not verify the donation. Please check with your payment provider before trying again.',
          )
        }
      } finally {
        submittingRef.current = false
      }
    },
    [announce, verifyDonation],
  )

  return {
    status,
    errorMessage,
    sessionId,
    verification,
    isMockMode: isMockDonationModeAllowed(),
    startCheckout,
    verifyDonation,
    simulateMockDonation,
    resetPayment,
    isSuccess: status === 'succeeded' && verification?.verified === true,
  }
}
