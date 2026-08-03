import { Link } from 'react-router-dom'

interface QuizDisclaimerProps {
  className?: string
}

export default function QuizDisclaimer({ className = '' }: QuizDisclaimerProps) {
  return (
    <section
      className={`mt-8 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-5 md:px-6 ${className}`.trim()}
      aria-labelledby="quiz-disclaimer-heading"
    >
      <h2 id="quiz-disclaimer-heading" className="sr-only">
        Medical disclaimer
      </h2>
      <p className="text-sm leading-relaxed text-text-muted">
        These quizzes are self-reflection tools. They do not provide a medical or psychological
        diagnosis and should not replace support from a qualified professional.
      </p>
      <p className="mt-3 text-sm leading-relaxed text-text-muted">
        If you are worried about your wellbeing or safety, consider speaking with a qualified
        professional or someone you trust.{' '}
        <Link
          to="/safety-resources"
          className="text-calm-cyan underline-offset-2 hover:underline"
        >
          View safety resources
        </Link>
      </p>
      <p className="mt-4 text-xs text-text-muted/80">
        Let It Burn is not an emergency service.
      </p>
    </section>
  )
}
