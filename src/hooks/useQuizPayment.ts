import { useCallback, useRef, useState } from 'react'
import { QUIZ_REPORT_PRICE } from '../data/quizPricing'
import { getQuizPaymentService, isMockPaymentMode } from '../services/quizPaymentService'
import { setMockPaymentOutcome } from '../services/mockQuizPaymentService'
import type { PaymentStatus } from '../types/quizPayments'

interface UseQuizPaymentOptions {
  quizId: string
  quizSlug: string
  reportLabel: string
  onVerified: (accessToken: string) => void
  announce: (message: string) => void
}

export function useQuizPayment({
  quizId,
  quizSlug,
  reportLabel,
  onVerified,
  announce,
}: UseQuizPaymentOptions) {
  const [status, setStatus] = useState<PaymentStatus>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [sessionId, setSessionId] = useState<string | null>(null)
  const [accessToken, setAccessToken] = useState<string | null>(null)
  const serviceRef = useRef(getQuizPaymentService())

  const resetPayment = useCallback(() => {
    setStatus('idle')
    setErrorMessage(null)
    setSessionId(null)
    setAccessToken(null)
  }, [])

  const startCheckout = useCallback(async () => {
    setStatus('creating-session')
    setErrorMessage(null)

    try {
      const session = await serviceRef.current.createCheckoutSession({
        quizId,
        quizSlug,
        reportLabel,
        amountInMinorUnits: QUIZ_REPORT_PRICE.amountInMinorUnits,
        currency: QUIZ_REPORT_PRICE.currency,
      })
      setSessionId(session.sessionId)

      if (session.checkoutUrl) {
        setStatus('redirecting')
        window.location.href = session.checkoutUrl
        return
      }

      setStatus('idle')
    } catch {
      setStatus('failed')
      setErrorMessage(
        'We could not verify the payment. Please check with your payment provider before trying again.',
      )
    }
  }, [quizId, quizSlug, reportLabel])

  const verifySession = useCallback(
    async (id: string) => {
      setStatus('verifying')
      announce('Payment verification started')

      try {
        const result = await serviceRef.current.verifyPayment({ sessionId: id, quizId })
        if (result.verified && result.accessToken) {
          setAccessToken(result.accessToken)
          setStatus('succeeded')
          announce('Payment verified')
          announce('Full report unlocked')
          onVerified(result.accessToken)
          return true
        }

        setStatus(result.errorMessage?.includes('cancelled') ? 'cancelled' : 'failed')
        setErrorMessage(
          result.errorMessage ??
            'We could not verify the payment. Please check with your payment provider before trying again.',
        )
        return false
      } catch {
        setStatus('failed')
        setErrorMessage(
          'We could not verify the payment. Please check with your payment provider before trying again.',
        )
        return false
      }
    },
    [announce, onVerified, quizId],
  )

  const simulateMockPayment = useCallback(
    async (outcome: 'success' | 'cancelled' | 'failed') => {
      setMockPaymentOutcome(outcome)
      const id = sessionId ?? `mock_${Date.now()}`
      setSessionId(id)

      if (outcome === 'cancelled') {
        setStatus('cancelled')
        setErrorMessage('Payment was cancelled. Your free result is still available.')
        return
      }

      if (outcome === 'failed') {
        setStatus('failed')
        setErrorMessage(
          'We could not verify the payment. Please check with your payment provider before trying again.',
        )
        return
      }

      setStatus('verifying')
      await verifySession(id)
    },
    [sessionId, verifySession],
  )

  return {
    status,
    errorMessage,
    sessionId,
    accessToken,
    isMockMode: isMockPaymentMode(),
    startCheckout,
    verifySession,
    simulateMockPayment,
    resetPayment,
    isReportUnlocked: status === 'succeeded' && Boolean(accessToken),
  }
}
