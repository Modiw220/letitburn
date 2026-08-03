import { Link } from 'react-router-dom'

export default function PricingSupportPanel() {
  return (
    <section className="mt-16 md:mt-20" aria-labelledby="pricing-support-heading">
      <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 text-center md:p-8">
        <h2 id="pricing-support-heading" className="font-heading text-xl font-semibold text-text-main md:text-2xl">
          Prefer to support without buying an upgrade?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-text-muted">
          Voluntary donations help maintain free tools and reduce pressure for intrusive advertising.
        </p>
        <Link
          to="/support"
          className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-xl border border-white/15 px-6 py-3 text-sm font-medium text-text-main hover:bg-white/[0.05]"
        >
          Visit the Support Page
        </Link>
      </div>
    </section>
  )
}
