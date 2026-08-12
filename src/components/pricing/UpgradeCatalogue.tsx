import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import type { UpgradeProduct } from '../../types/upgrades'
import UpgradeCard from './UpgradeCard'
import { useAuth } from '../../context/AuthContext'
import { useEntitlements } from '../../context/EntitlementsContext'
import { useUpgradeCheckout } from '../../hooks/useUpgradeCheckout'

interface UpgradeCatalogueProps {
  products: UpgradeProduct[]
}

export default function UpgradeCatalogue({ products }: UpgradeCatalogueProps) {
  const { user } = useAuth()
  const { hasEntitlement, refresh } = useEntitlements()
  const { status, errorMessage, startCheckout, verifyPurchase } = useUpgradeCheckout()
  const [buyingProductId, setBuyingProductId] = useState<string | null>(null)
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [verifyMessage, setVerifyMessage] = useState<string | null>(null)

  useEffect(() => {
    const sessionId = searchParams.get('session_id')
    const productId = searchParams.get('product_id')
    if (!sessionId || !productId) return

    let cancelled = false
    void (async () => {
      const result = await verifyPurchase(sessionId, productId)
      if (cancelled) return
      if (result.verified) {
        await refresh()
        setVerifyMessage('Purchase verified. Your entitlement is active on this account.')
      } else {
        setVerifyMessage(result.errorMessage ?? 'We could not verify that purchase yet.')
      }
      const next = new URLSearchParams(searchParams)
      next.delete('session_id')
      next.delete('product_id')
      setSearchParams(next, { replace: true })
    })()

    return () => {
      cancelled = true
    }
  }, [searchParams, setSearchParams, verifyPurchase, refresh])

  const handleBuy = async (productId: string) => {
    if (!user) {
      navigate(`/auth?next=${encodeURIComponent(`/pricing`)}`)
      return
    }
    setBuyingProductId(productId)
    await startCheckout(productId)
    setBuyingProductId(null)
  }

  return (
    <section id="upgrades" className="pricing-anchor-section mt-12 md:mt-16" aria-labelledby="upgrades-heading">
      <h2 id="upgrades-heading" className="font-heading text-2xl font-semibold text-text-main md:text-3xl">
        Optional upgrade catalogue
      </h2>
      <p className="mt-3 max-w-2xl text-sm text-text-muted md:text-base">
        Free tools work without an account. Purchases require sign-in so entitlements can restore across devices.
      </p>
      {!user && (
        <p className="mt-3 text-sm text-text-muted">
          <Link to="/auth?next=%2Fpricing" className="text-calm-cyan hover:underline">
            Sign in
          </Link>{' '}
          before buying upgrades.
        </p>
      )}
      {verifyMessage && <p className="mt-3 text-sm text-calm-cyan">{verifyMessage}</p>}
      {status === 'failed' && errorMessage && (
        <p className="mt-3 text-sm text-red-300">{errorMessage}</p>
      )}

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <UpgradeCard
            key={product.id}
            product={product}
            onBuy={handleBuy}
            buyingProductId={buyingProductId}
            buyError={buyingProductId === product.id ? errorMessage : null}
            owned={hasEntitlement(product.id)}
          />
        ))}
      </div>

      {products.length === 0 && (
        <p className="mt-6 text-sm text-text-muted">No upgrades match this filter.</p>
      )}
    </section>
  )
}
