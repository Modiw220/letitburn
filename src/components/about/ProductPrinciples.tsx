import { productPrinciples } from '../../data/productPrinciples'

export default function ProductPrinciples() {
  return (
    <section
      id="principles"
      className="about-anchor-section mt-16 md:mt-20"
      aria-labelledby="principles-heading"
    >
      <h2 id="principles-heading" className="font-heading text-2xl font-semibold text-text-main md:text-3xl">
        How we want to build this.
      </h2>

      <ol className="mt-8 space-y-4">
        {productPrinciples.map((principle, index) => (
          <li
            key={principle.id}
            className="about-principle-item rounded-2xl border border-white/8 bg-white/[0.02] p-5 md:p-6"
          >
            <div className="flex gap-4">
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-calm-cyan/30 bg-calm-cyan/10 text-sm font-semibold text-calm-cyan"
                aria-hidden="true"
              >
                {index + 1}
              </span>
              <div>
                <h3 className="font-medium text-text-main">{principle.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {principle.description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
