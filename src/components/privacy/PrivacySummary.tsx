import { privacySummaryItems } from '../../data/privacySummaryItems'
import { getPrivacyIcon } from './privacyUtils'

export default function PrivacySummary() {
  return (
    <section className="privacy-summary mt-10" aria-label="Privacy summary">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {privacySummaryItems.map((item) => {
          const Icon = getPrivacyIcon(item.icon)
          return (
            <article
              key={item.id}
              className="privacy-summary-card rounded-2xl border border-white/10 bg-bg-card/50 p-5"
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full bg-accent-purple/15 text-accent-purple"
                aria-hidden="true"
              >
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </div>
              <h2 className="mt-4 text-sm font-semibold text-text-main">{item.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{item.description}</p>
            </article>
          )
        })}
      </div>
    </section>
  )
}
