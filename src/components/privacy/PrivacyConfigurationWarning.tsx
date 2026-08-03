import { shouldShowPrivacyConfigWarning, validatePrivacyConfig } from '../../utils/validatePrivacyConfig'

export default function PrivacyConfigurationWarning() {
  if (!shouldShowPrivacyConfigWarning()) {
    return null
  }

  const { missingFields } = validatePrivacyConfig()

  return (
    <div
      className="privacy-config-warning mb-8 rounded-2xl border border-amber-400/30 bg-amber-400/10 p-5"
      role="status"
    >
      <p className="text-sm font-semibold text-amber-100">Development privacy configuration notice</p>
      <p className="mt-2 text-sm text-amber-50/90">
        Some production privacy details are not configured yet. Complete the following before
        publishing:
      </p>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-amber-50/90">
        {missingFields.map((field) => (
          <li key={field}>{field}</li>
        ))}
      </ul>
    </div>
  )
}
