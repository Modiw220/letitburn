import { pricingPrinciples } from '../../data/pricingPrinciples'

export default function PricingPrinciples() {
  return (
    <section className="mt-16 md:mt-20" aria-labelledby="pricing-principles-heading">
      <h2 id="pricing-principles-heading" className="font-heading text-2xl font-semibold text-text-main md:text-3xl">
        Our pricing principles.
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {pricingPrinciples.map((principle) => (
          <article
            key={principle.id}
            className="rounded-2xl border border-white/8 bg-bg-card/40 p-5"
          >
            <h3 className="font-medium text-text-main">{principle.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-text-muted">{principle.description}</p>
          </article>
        ))}
      </div>

      <p className="mt-6 text-sm text-text-muted">
        Prices may change before planned products launch. Available products must always display the
        current verified price.
      </p>
    </section>
  )
}
