interface QuizDisclaimerProps {
  className?: string
}

export default function QuizDisclaimer({ className = '' }: QuizDisclaimerProps) {
  return (
    <div
      className={`rounded-xl border border-calm-cyan/20 bg-calm-cyan/5 px-4 py-4 ${className}`}
    >
      <p className="text-sm font-medium text-text-main">
        This is a self-reflection tool, not a medical diagnosis.
      </p>
      <p className="mt-2 text-sm text-text-muted">
        Your answers are intended to help you notice patterns. They should not replace advice or
        support from a qualified professional.
      </p>
    </div>
  )
}
