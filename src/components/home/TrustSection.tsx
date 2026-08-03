import { Link } from 'react-router-dom'
import { trustItems } from '../../data/trustItems'

const accentStyles = {
  cyan: 'text-calm-cyan bg-calm-cyan/10 border-calm-cyan/20',
  purple: 'text-accent-purple bg-accent-purple/10 border-accent-purple/20',
  green: 'text-success-green bg-success-green/10 border-success-green/20',
  orange: 'text-fire-orange bg-fire-orange/10 border-fire-orange/20',
} as const

export default function TrustSection() {
  const [supportItem, ...primaryItems] = trustItems.slice().reverse()
  const SupportIcon = supportItem.icon

  return (
    <section
      className="content-container py-10 md:py-14"
      aria-labelledby="trust-heading"
    >
      <h2 id="trust-heading" className="sr-only">
        Trust and safety
      </h2>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-[28px] border border-border-card bg-bg-card/45 px-5 py-6 md:px-7 md:py-7">
          <h3 className="font-heading text-2xl font-semibold text-text-main">
            Private by default.
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-muted">
            The first promise of Let It Burn is low pressure. No account wall. No public feed. No
            need to explain yourself before you can begin.
          </p>

          <div className="mt-6 grid gap-0 md:grid-cols-3">
            {primaryItems.map((item, index) => {
              const Icon = item.icon
              const accent = accentStyles[item.accent]

              return (
                <article
                  key={item.id}
                  className={`relative px-0 py-5 md:px-5 ${
                    index > 0 ? 'border-t border-white/[0.08] md:border-l md:border-t-0' : ''
                  }`}
                >
                  <div className="flex flex-col items-start">
                    <span
                      className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full border ${accent}`}
                      aria-hidden="true"
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>

                    <h4 className="font-heading text-lg font-semibold text-text-main">
                      {item.title}
                    </h4>

                    <p className="mt-2 text-sm leading-relaxed text-text-muted">
                      {item.text}
                    </p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>

        <article className="rounded-[28px] border border-support-gold/18 bg-[linear-gradient(180deg,rgba(246,185,59,0.07),rgba(15,27,44,0.82))] px-5 py-6 md:px-7 md:py-7">
          <span
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full border ${accentStyles[supportItem.accent]}`}
            aria-hidden="true"
          >
            <SupportIcon className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <h3 className="mt-4 font-heading text-2xl font-semibold text-text-main">
            {supportItem.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-text-muted">
            {supportItem.text}
          </p>
          {supportItem.linkText && supportItem.linkHref && (
            <Link
              to={supportItem.linkHref}
              className="mt-6 inline-flex min-h-[46px] items-center justify-center rounded-xl border border-support-gold/35 bg-support-gold/10 px-5 py-3 text-sm font-semibold text-support-gold transition-transform hover:-translate-y-0.5"
            >
              {supportItem.linkText}
            </Link>
          )}
        </article>
      </div>
    </section>
  )
}
