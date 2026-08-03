import { useCallback, useRef, useState } from 'react'
import { getUpgradeById } from '../config/upgradePricing'
import { getUpgradeCheckoutService } from '../services/upgradeCheckoutService'
import type { UpgradePurchaseVerification } from '../types/upgrades'

export function useUpgradeCheckout() {
  const [status, setStatus] = useState<'idle' | 'creating' | 'failed'>('idle')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const submittingRef = useRef(false)
  const serviceRef = useRef(getUpgradeCheckoutService())

  const startCheckout = useCallback(async (productId: string) => {
    const product = getUpgradeById(productId)
    if (!product?.available || product.status !== 'available') {
      setErrorMessage('This product is planned and is not currently available.')
      return false
    }

    if (product.price.type !== 'fixed') {
      setErrorMessage('Checkout requires a verified fixed price.')
      return false
    }

    if (submittingRef.current) return false
    submittingRef.current = true
    setStatus('creating')
    setErrorMessage(null)

    try {
      const session = await serviceRef.current.createCheckoutSession({
        productId,
        expectedPriceMinor: product.price.amountMinor,
        currency: 'USD',
      })

      if (session.checkoutUrl) {
        window.location.href = session.checkoutUrl
        return true
      }

      setStatus('idle')
      return true
    } catch {
      setStatus('failed')
      setErrorMessage('Upgrade checkout is not available yet.')
      return false
    } finally {
      submittingRef.current = false
    }
  }, [])

  const verifyPurchase = useCallback(
    async (sessionId: string, productId: string): Promise<UpgradePurchaseVerification> => {
      return serviceRef.current.verifyPurchase({ sessionId, productId })
    },
    [],
  )

  return { status, errorMessage, startCheckout, verifyPurchase }
}
