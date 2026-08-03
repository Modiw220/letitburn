import { useCallback, useEffect, useState } from 'react'
import {
  BREATH_EXHALE_MS,
  BREATH_HOLD_MS,
  BREATH_INHALE_MS,
} from '../../types/burn'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type BreathPhase = 'inhale' | 'hold' | 'exhale'

const PHASE_LABELS: Record<BreathPhase, string> = {
  inhale: 'Inhale',
  hold: 'Hold',
  exhale: 'Exhale',
}

interface BreathingGuideProps {
  onComplete: () => void
  onSkip: () => void
}

export default function BreathingGuide({ onComplete, onSkip }: BreathingGuideProps) {
  const reducedMotion = useReducedMotion()
  const [phase, setPhase] = useState<BreathPhase>('inhale')
  const totalMs = BREATH_INHALE_MS + BREATH_HOLD_MS + BREATH_EXHALE_MS

  const runCycle = useCallback(() => {
    setPhase('inhale')

    const holdTimer = window.setTimeout(
      () => setPhase('hold'),
      BREATH_INHALE_MS,
    )
    const exhaleTimer = window.setTimeout(
      () => setPhase('exhale'),
      BREATH_INHALE_MS + BREATH_HOLD_MS,
    )
    const completeTimer = window.setTimeout(onComplete, totalMs)

    return () => {
      window.clearTimeout(holdTimer)
      window.clearTimeout(exhaleTimer)
      window.clearTimeout(completeTimer)
    }
  }, [onComplete, totalMs])

  useEffect(() => runCycle(), [runCycle])

  return (
    <div className="mx-auto flex max-w-md flex-col items-center py-8 text-center">
      <h2 className="font-heading text-3xl font-semibold text-text-main md:text-4xl">
        It&apos;s gone.
      </h2>
      <p className="mt-2 text-lg text-text-muted">Take a breath.</p>

      <div className="relative mt-10 flex h-48 w-48 items-center justify-center">
        {reducedMotion ? (
          <div
            className="breath-progress-ring breath-progress-ring--static"
            style={{ animationDuration: `${totalMs}ms` }}
            aria-hidden="true"
          />
        ) : (
          <div
            className={`breath-circle breath-circle--${phase}`}
            aria-hidden="true"
          />
        )}

        <span
          className="relative z-10 text-sm font-medium uppercase tracking-[0.2em] text-calm-cyan"
          aria-live="polite"
        >
          {PHASE_LABELS[phase]}
        </span>
      </div>

      <button
        type="button"
        onClick={onSkip}
        className="mt-10 rounded-xl border border-border-card px-6 py-3 text-sm font-medium text-text-muted transition-colors hover:border-white/25 hover:text-text-main"
      >
        Continue
      </button>
    </div>
  )
}
