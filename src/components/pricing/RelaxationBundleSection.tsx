import { getUpgradeById } from '../../config/upgradePricing'
import { formatUpgradePriceWithRangeLabel } from '../../utils/formatUpgradePrice'
import UpgradeStatusBadge from './UpgradeStatusBadge'

export default function RelaxationBundleSection() {
  const bundle = getUpgradeById('relaxation-bundle')
  if (!bundle) return null

  return (
    <section className="mt-16 md:mt-20" aria-labelledby="bundle-heading">
      <div className="rounded-[18px] border border-support-gold/20 bg-support-gold/5 p-6 md:p-8">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <h2 id="bundle-heading" className="font-heading text-2xl font-semibold text-text-main md:text-3xl">
            One optional bundle, when the pieces are ready.
          </h2>
          <UpgradeStatusBadge product={bundle} />
        </div>

        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-text-muted md:text-base">
          The planned Relaxation Bundle may combine selected drawing, sound, and reflection upgrades
          at one clear one-time price.
        </p>

        <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 text-sm text-text-muted">
          {bundle.includedFeatures.map((item) => (
            <li key={item} className="flex gap-2">
              <span className="text-support-gold" aria-hidden="true">
                ·
              </span>
              {item}
            </li>
          ))}
        </ul>

        <p className="mt-6 text-lg font-semibold text-text-main">
          {formatUpgradePriceWithRangeLabel(bundle.price)}
        </p>
        <p className="mt-4 text-sm text-text-muted">
          Final contents and price will be shown clearly before this becomes available.
        </p>
      </div>
    </section>
  )
}
