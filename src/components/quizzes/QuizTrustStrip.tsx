import { Clock, FileText, Gift, ShieldCheck } from 'lucide-react'
import { Link } from 'react-router-dom'

const trustItems = [
  { icon: Clock, label: '2–5 minutes' },
  { icon: Gift, label: 'Free basic result' },
  { icon: FileText, label: 'Optional $1 full report' },
  { icon: ShieldCheck, label: 'Private self-reflection' },
]

export default function QuizTrustStrip() {
  return (
    <section
      className="mt-10 rounded-2xl border border-border-card bg-bg-card/60 px-5 py-6 md:px-8 md:py-7"
      aria-labelledby="quiz-trust-heading"
    >
      <h2 id="quiz-trust-heading" className="sr-only">
        Quiz trust information
      </h2>

      <ul className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {trustItems.map(({ icon: Icon, label }) => (
          <li key={label} className="flex flex-col items-center text-center sm:flex-row sm:text-left">
            <span className="mb-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-calm-cyan sm:mb-0 sm:mr-3">
              <Icon className="h-5 w-5" aria-hidden="true" />
            </span>
            <span className="text-sm font-medium text-text-main">{label}</span>
          </li>
        ))}
      </ul>

      <p className="mt-6 text-center text-sm text-text-muted md:text-left">
        These quizzes are for personal reflection and are not medical or psychological diagnoses.{' '}
        <Link
          to="/safety-resources"
          className="text-calm-cyan underline-offset-2 hover:underline"
        >
          Read the full disclaimer
        </Link>
      </p>
    </section>
  )
}
