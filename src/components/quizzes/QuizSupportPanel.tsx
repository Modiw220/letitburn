import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function QuizSupportPanel() {
  return (
    <section
      className="mt-12 rounded-2xl border border-border-card bg-bg-card px-6 py-8 text-center md:px-10"
      aria-labelledby="quiz-support-heading"
    >
      <h2
        id="quiz-support-heading"
        className="font-heading text-xl font-semibold text-text-main md:text-2xl"
      >
        Help keep reflection tools accessible.
      </h2>
      <p className="mx-auto mt-2 max-w-lg text-sm text-text-muted">
        Support helps maintain free basic quiz results and the wider Let It Burn experience.
      </p>
      <Link
        to="/support"
        className="btn-primary-glow mt-6 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-support-gold/40 bg-support-gold/10 px-6 py-3 text-sm font-semibold text-support-gold transition-transform hover:-translate-y-0.5"
      >
        <Heart className="h-4 w-4 fill-support-gold" aria-hidden="true" />
        Support Let It Burn
      </Link>
    </section>
  )
}
