import { Link } from 'react-router-dom'

export default function PricingDisclosure() {
  return (
    <section className="mt-16 space-y-8 md:mt-20" aria-label="Purchase disclosures">
      <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 md:p-6">
        <h2 className="font-heading text-xl font-semibold text-text-main">
          Taxes, fees, and regional availability
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-text-muted">
          Taxes, payment-provider requirements, and regional availability may vary. Any additional
          amount must be displayed before the user confirms payment.
        </p>
      </div>

      <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 md:p-6">
        <h2 className="font-heading text-xl font-semibold text-text-main">
          Questions about a purchase?
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-text-muted">
          Refund eligibility, cancellation rules, and access restoration depend on the specific
          product, payment provider, and applicable law.
        </p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
          <Link to="/contact" className="text-sm text-calm-cyan underline-offset-2 hover:underline">
            Purchase Help
          </Link>
          <Link to="/privacy" className="text-sm text-calm-cyan underline-offset-2 hover:underline">
            Privacy Policy
          </Link>
          <Link to="/support" className="text-sm text-calm-cyan underline-offset-2 hover:underline">
            Support the Platform
          </Link>
        </div>
        {import.meta.env.DEV && (
          <p className="mt-4 text-xs text-amber-200/90">
            TODO: Replace with verified production refund policy before publishing.
          </p>
        )}
      </div>

      <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-5 md:p-6">
        <p className="text-sm text-text-muted">
          Purchasing an upgrade does not change the non-diagnostic nature of Let It Burn&apos;s
          self-reflection tools.
        </p>
        <p className="mt-3 text-sm text-text-muted">
          Payment providers may process information required to complete and verify a transaction.
        </p>
        <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
          <Link to="/privacy" className="text-sm text-calm-cyan underline-offset-2 hover:underline">
            Privacy Policy
          </Link>
          <Link
            to="/safety-resources"
            className="text-sm text-calm-cyan underline-offset-2 hover:underline"
          >
            Safety Resources
          </Link>
        </div>
      </div>
    </section>
  )
}
