import { UPGRADE_CATALOGUE } from '../../config/upgradePricing'
import { categoryLabels } from '../../data/upgradeCategories'
import { formatUpgradePrice, formatUpgradePriceWithRangeLabel } from '../../utils/formatUpgradePrice'
import UpgradeStatusBadge from './UpgradeStatusBadge'
import { getBillingLabel } from './pricingUtils'

export default function PricingComparisonTable() {
  return (
    <section
      id="comparison"
      className="pricing-anchor-section mt-16 md:mt-20"
      aria-labelledby="comparison-heading"
    >
      <h2 id="comparison-heading" className="font-heading text-2xl font-semibold text-text-main md:text-3xl">
        Compare optional upgrades.
      </h2>

      <div className="mt-8 hidden overflow-x-auto md:block">
        <table className="pricing-table min-w-full text-left text-sm">
          <caption className="sr-only">Comparison of optional Let It Burn upgrades</caption>
          <thead>
            <tr>
              <th scope="col">Product</th>
              <th scope="col">Category</th>
              <th scope="col">Price</th>
              <th scope="col">Billing</th>
              <th scope="col">Main benefit</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {UPGRADE_CATALOGUE.map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>{categoryLabels[product.category]}</td>
                <td>
                  {product.price.type === 'range'
                    ? formatUpgradePriceWithRangeLabel(product.price)
                    : formatUpgradePrice(product.price)}
                </td>
                <td>{getBillingLabel(product.billingType, product.durationDays)}</td>
                <td>{product.mainBenefit}</td>
                <td>
                  <UpgradeStatusBadge product={product} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 space-y-4 md:hidden">
        {UPGRADE_CATALOGUE.map((product) => (
          <article
            key={product.id}
            className="rounded-2xl border border-white/10 bg-bg-card/50 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-medium text-text-main">{product.title}</h3>
              <UpgradeStatusBadge product={product} />
            </div>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-text-muted">Category</dt>
                <dd className="text-text-main">{categoryLabels[product.category]}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-text-muted">Price</dt>
                <dd className="text-text-main">
                  {product.price.type === 'range'
                    ? formatUpgradePriceWithRangeLabel(product.price)
                    : formatUpgradePrice(product.price)}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-text-muted">Billing</dt>
                <dd className="text-text-main">
                  {getBillingLabel(product.billingType, product.durationDays)}
                </dd>
              </div>
              <div>
                <dt className="text-text-muted">Main benefit</dt>
                <dd className="mt-1 text-text-main">{product.mainBenefit}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </section>
  )
}
