import { donationPrinciples } from '../../data/donationPrinciples'

export default function DonationTransparency() {
  return (
    <section className="mt-16 md:mt-20" aria-labelledby="transparency-heading">
      <h2 id="transparency-heading" className="font-heading text-2xl font-semibold text-text-main md:text-3xl">
        What we promise about donations.
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {donationPrinciples.map((principle) => (
          <article
            key={principle.id}
            className="rounded-2xl border border-border-card bg-bg-card/50 p-5"
          >
            <h3 className="font-medium text-text-main">{principle.title}</h3>
            <p className="mt-2 text-sm text-text-muted">{principle.text}</p>
          </article>
        ))}
      </div>

      <p className="mt-6 text-sm text-text-muted">
        Future premium tools may have separate pricing, but donations remain voluntary support.
      </p>
    </section>
  )
}
