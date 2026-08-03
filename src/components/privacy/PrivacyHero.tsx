import { ShieldCheck } from 'lucide-react'
import { PRIVACY_POLICY_META } from '../../config/privacyConfig'
import { formatPolicyDate } from '../../utils/formatPolicyDate'
import { getProductionSafePolicyDate, shouldShowPrivacyConfigWarning } from '../../utils/validatePrivacyConfig'

export default function PrivacyHero() {
  const effectiveDate = getProductionSafePolicyDate(PRIVACY_POLICY_META.effectiveDate)
  const lastUpdated = getProductionSafePolicyDate(PRIVACY_POLICY_META.lastUpdated)
  const version =
    PRIVACY_POLICY_META.version === 'TODO' && !import.meta.env.DEV
      ? null
      : PRIVACY_POLICY_META.version

  return (
    <header className="privacy-hero">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-purple">
        Privacy Policy
      </p>
      <h1 className="mt-3 font-heading text-3xl font-semibold leading-tight text-text-main md:text-4xl">
        Your privacy is our{' '}
        <span className="text-accent-purple">priority</span>.
      </h1>
      <p className="mt-5 max-w-[760px] text-sm leading-relaxed text-text-muted md:text-base">
        This Privacy Policy explains how Let It Burn handles information when you use its release,
        relaxation, sound, quiz, payment, and report features.
      </p>

      <dl className="privacy-meta mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-text-muted">
        <div>
          <dt className="inline font-medium text-text-main">Effective date: </dt>
          <dd className="inline">{formatPolicyDate(effectiveDate)}</dd>
        </div>
        <div>
          <dt className="inline font-medium text-text-main">Last updated: </dt>
          <dd className="inline">{formatPolicyDate(lastUpdated)}</dd>
        </div>
        {version && (
          <div>
            <dt className="inline font-medium text-text-main">Version: </dt>
            <dd className="inline">{version}</dd>
          </div>
        )}
      </dl>

      {shouldShowPrivacyConfigWarning() && (
        <p className="mt-4 text-sm text-amber-200/90">
          Policy dates and contact details are not yet configured for production publication.
        </p>
      )}

      <p className="privacy-disclaimer mt-4 flex items-start gap-2 text-xs text-text-muted/80">
        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
        <span>
          This page describes how the application is designed to work. It is not legal advice.
        </span>
      </p>
    </header>
  )
}
