import PricingHeroVisual from './PricingHeroVisual'

export default function PricingHero() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="pricing-hero text-center" aria-labelledby="pricing-hero-heading">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-calm-cyan">
        Pricing & Upgrades
      </p>
      <h1
        id="pricing-hero-heading"
        className="mx-auto mt-3 max-w-3xl font-heading text-3xl font-semibold leading-tight text-text-main md:text-4xl"
      >
        Keep the essentials free. Add more only when it helps.
      </h1>

      <p className="mx-auto mt-5 max-w-2xl text-base font-medium leading-relaxed text-text-main md:text-lg">
        The core emotional release tools are free. Paid options help support the platform.
      </p>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-text-muted md:text-base">
        Optional upgrades provide deeper reports, extra creative content, enhanced sound tools, and
        reduced advertising. You can continue using the core experience without purchasing anything.
      </p>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <button
          type="button"
          className="inline-flex min-h-[48px] items-center justify-center rounded-xl border border-fire-orange/40 bg-fire-orange/10 px-6 py-3 text-sm font-semibold text-bright-orange"
          onClick={() => scrollTo('upgrades')}
        >
          View Optional Upgrades
        </button>
        <button
          type="button"
          className="min-h-[48px] rounded-xl border border-white/15 bg-white/[0.04] px-6 py-3 text-sm font-medium text-text-main hover:bg-white/[0.08]"
          onClick={() => scrollTo('free-core')}
        >
          See What Stays Free
        </button>
      </div>

      <p className="mx-auto mt-5 max-w-xl text-sm text-text-muted">
        No automatic subscriptions. Any recurring or time-limited product must be labelled clearly
        before payment.
      </p>

      <div className="mt-10">
        <PricingHeroVisual />
      </div>
    </section>
  )
}
