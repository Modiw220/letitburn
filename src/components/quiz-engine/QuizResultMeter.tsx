import { useReducedMotion } from '../../hooks/useReducedMotion'

interface QuizResultMeterProps {
  percentage: number
  accentColor?: string
}

export default function QuizResultMeter({
  percentage,
  accentColor = '#46CAD4',
}: QuizResultMeterProps) {
  const reducedMotion = useReducedMotion()

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between text-sm text-text-muted">
        <span>Reflection overview</span>
        <span>{percentage}%</span>
      </div>
      <div
        className="mt-2 h-3 overflow-hidden rounded-full bg-white/10"
        role="img"
        aria-label={`Reflection meter at ${percentage} percent`}
      >
        <div
          className={`h-full rounded-full ${reducedMotion ? '' : 'transition-all duration-500'}`}
          style={{ width: `${percentage}%`, backgroundColor: accentColor }}
        />
      </div>
      <p className="mt-2 text-xs text-text-muted">
        This meter reflects your responses. It is not a medical risk gauge.
      </p>
    </div>
  )
}
