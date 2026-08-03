import { ShieldCheck, Unlock } from 'lucide-react'

const freeItems = [
  {
    title: 'Burn Your Thoughts',
    text: 'Write and symbolically release a note without creating an account.',
  },
  {
    title: 'Basic Relaxing Drawing',
    text: 'Use the blank canvas, core brushes, colors, and free templates.',
  },
  {
    title: 'Single-Sound Listening',
    text: 'Play one free sound at a time with volume and timer controls.',
  },
  {
    title: 'Basic Quiz Results',
    text: 'Complete supported quizzes and receive a useful basic reflection result.',
  },
]

export default function FreeCoreSection() {
  return (
    <section
      id="free-core"
      className="pricing-anchor-section mt-16 md:mt-20"
      aria-labelledby="free-core-heading"
    >
      <div className="rounded-2xl border border-calm-cyan/20 bg-calm-cyan/5 p-6 md:p-8">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-calm-cyan" aria-hidden="true" />
          <div className="min-w-0 flex-1">
            <h2 id="free-core-heading" className="font-heading text-2xl font-semibold text-text-main md:text-3xl">
              What remains free.
            </h2>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-text-muted md:text-base">
              You can use the main release and relaxation tools without purchasing an upgrade. Paid
              options should add convenience, detail, or creative variety. They should not block the
              basic emotional-release experience.
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {freeItems.map((item) => (
            <article
              key={item.title}
              className="rounded-xl border border-white/8 bg-bg-card/40 p-5"
            >
              <div className="flex items-start gap-3">
                <Unlock className="mt-0.5 h-4 w-4 shrink-0 text-calm-cyan" aria-hidden="true" />
                <div>
                  <h3 className="font-medium text-text-main">{item.title}</h3>
                  <p className="mt-2 text-sm text-text-muted">{item.text}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        <p className="mt-6 text-sm text-text-muted">
          Optional purchases should expand these experiences rather than remove the usefulness of the
          free version.
        </p>
      </div>
    </section>
  )
}
