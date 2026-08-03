import type { UpgradeProduct } from '../../types/upgrades'
import UpgradeCard from './UpgradeCard'

interface UpgradeCatalogueProps {
  products: UpgradeProduct[]
}

export default function UpgradeCatalogue({ products }: UpgradeCatalogueProps) {
  return (
    <section id="upgrades" className="pricing-anchor-section mt-12 md:mt-16" aria-labelledby="upgrades-heading">
      <h2 id="upgrades-heading" className="font-heading text-2xl font-semibold text-text-main md:text-3xl">
        Optional upgrade catalogue
      </h2>
      <p className="mt-3 max-w-2xl text-sm text-text-muted md:text-base">
        Compare what is available now and what is still being prepared. Planned products cannot be
        purchased from this page.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <UpgradeCard key={product.id} product={product} />
        ))}
      </div>

      {products.length === 0 && (
        <p className="mt-6 text-sm text-text-muted">No upgrades match this filter.</p>
      )}
    </section>
  )
}
