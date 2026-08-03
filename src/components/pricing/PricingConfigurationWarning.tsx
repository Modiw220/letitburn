import { validateUpgradeCatalogue } from '../../utils/validateUpgradeCatalogue'

export default function PricingConfigurationWarning() {
  if (import.meta.env.PROD) return null

  const validation = validateUpgradeCatalogue()
  if (validation.valid) return null

  return (
    <div
      className="pricing-config-warning mb-8 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5"
      role="status"
    >
      <p className="text-sm font-semibold text-amber-100">Upgrade catalogue configuration notice</p>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-amber-50/90">
        {validation.errors.map((error) => (
          <li key={error}>{error}</li>
        ))}
      </ul>
    </div>
  )
}
