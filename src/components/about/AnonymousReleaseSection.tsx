import { Flame, PenLine, Trash2, Wind } from 'lucide-react'
import AboutPullQuote from './AboutPullQuote'

const flowSteps = [
  { label: 'Write', icon: PenLine },
  { label: 'Release', icon: Flame },
  { label: 'Clear', icon: Trash2 },
  { label: 'Breathe', icon: Wind },
]

export default function AnonymousReleaseSection() {
  return (
    <section
      id="anonymous-release"
      className="about-anchor-section mt-16 md:mt-20"
      aria-labelledby="anonymous-release-heading"
    >
      <h2
        id="anonymous-release-heading"
        className="font-heading text-2xl font-semibold text-text-main md:text-3xl"
      >
        Why anonymous release matters.
      </h2>

      <div className="mt-6 max-w-[720px] space-y-4 text-sm leading-relaxed text-text-muted md:text-base">
        <p>
          Not every thought needs to become a post, a permanent record, or a conversation. Sometimes
          writing something down is useful precisely because nobody else needs to see it.
        </p>
        <p>
          Anonymous release reduces the pressure to explain, perform, defend, or organize what you
          feel. It creates room for an unfinished thought to exist briefly and then leave.
        </p>
        <p>
          Privacy can make it easier to begin, but privacy does not mean isolation must be permanent.
          Some moments are suited to quiet reflection. Other moments may need trusted human or
          professional support.
        </p>
      </div>

      <div className="mt-8 max-w-xl">
        <AboutPullQuote>You can release a thought without turning it into an identity.</AboutPullQuote>
      </div>

      <div className="about-release-flow mt-10" aria-label="Anonymous release flow">
        <ol className="about-release-flow-list">
          {flowSteps.map((step, index) => {
            const Icon = step.icon
            return (
              <li key={step.label} className="about-release-flow-step">
                <div className="about-release-flow-icon" aria-hidden="true">
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </div>
                <span className="text-sm font-medium text-text-main">{step.label}</span>
                {index < flowSteps.length - 1 && (
                  <span className="about-release-flow-connector" aria-hidden="true" />
                )}
              </li>
            )
          })}
        </ol>
      </div>

      <p className="mt-8 max-w-[720px] text-sm leading-relaxed text-text-muted">
        Letting go of a note may create a moment of space. It is not a promise that the underlying
        feeling will disappear.
      </p>
    </section>
  )
}
