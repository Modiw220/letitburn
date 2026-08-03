import { Link } from 'react-router-dom'
import { trustItems } from '../../data/trustItems'

const accentStyles = {
  cyan: 'text-calm-cyan bg-calm-cyan/10 border-calm-cyan/20',
  purple: 'text-accent-purple bg-accent-purple/10 border-accent-purple/20',
  green: 'text-success-green bg-success-green/10 border-success-green/20',
  orange: 'text-fire-orange bg-fire-orange/10 border-fire-orange/20',
} as const

const linkAccentStyles = {
  cyan: 'text-calm-cyan',
  purple: 'text-accent-purple',
  green: 'text-success-green',
  orange: 'text-fire-orange',
} as const

export default function TrustSection() {
  return (
    <section
      className="content-container py-10 md:py-14"
      aria-labelledby="trust-heading"
    >
      <h2 id="trust-heading" className="sr-only">
        Trust and safety
      </h2>

      <div className="grid gap-0 md:grid-cols-2 lg:grid-cols-4">
        {trustItems.map((item, index) => {
          const Icon = item.icon
          const accent = accentStyles[item.accent]

          return (
            <article
              key={item.id}
              className={`relative px-0 py-6 md:px-6 md:py-4 ${
                index > 0 ? 'border-t border-white/[0.08] lg:border-t-0' : ''
              } ${index > 0 ? 'lg:border-l lg:border-white/[0.08]' : ''}`}
            >
              <div className="flex flex-col items-start">
                <span
                  className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border ${accent}`}
                  aria-hidden="true"
                >
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>

                <h3 className="font-heading text-lg font-semibold text-text-main">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm leading-relaxed text-text-muted">
                  {item.text}
                </p>

                {item.linkText && item.linkHref && (
                  <Link
                    to={item.linkHref}
                    className={`mt-3 text-sm font-semibold transition-opacity hover:opacity-80 ${linkAccentStyles[item.accent]}`}
                  >
                    {item.linkText}
                  </Link>
                )}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
