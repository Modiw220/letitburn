import { BarChart3, Clock, FileText, ListChecks } from 'lucide-react'

const steps = [
  {
    icon: ListChecks,
    title: 'Answer honestly',
    text: 'Choose the response that feels closest to your recent experiences or usual patterns.',
  },
  {
    icon: Clock,
    title: 'Finish in a few minutes',
    text: 'Most quizzes take between two and five minutes.',
  },
  {
    icon: BarChart3,
    title: 'See a free result',
    text: 'Receive a simple overview that highlights the main pattern in your answers.',
  },
  {
    icon: FileText,
    title: 'Choose whether to go deeper',
    text: 'An optional $1 report can provide more detailed explanations and reflection prompts.',
  },
]

export default function QuizHowItWorks() {
  return (
    <section
      id="how-it-works"
      className="mt-16 md:mt-20"
      aria-labelledby="how-it-works-heading"
    >
      <h2
        id="how-it-works-heading"
        className="font-heading text-2xl font-semibold text-text-main md:text-3xl"
      >
        How the quizzes work.
      </h2>

      <ol className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {steps.map((step, index) => {
          const Icon = step.icon
          return (
            <li
              key={step.title}
              className="rounded-2xl border border-border-card bg-bg-card/50 p-5"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-calm-cyan">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-xs font-semibold uppercase tracking-wider text-text-muted">
                  Step {index + 1}
                </span>
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold text-text-main">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-text-muted">{step.text}</p>
            </li>
          )
        })}
      </ol>

      <p className="mt-6 text-sm text-text-muted">
        You never need to purchase a report to view your basic result.
      </p>
    </section>
  )
}
