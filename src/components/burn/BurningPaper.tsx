import { useEffect, useRef, type CSSProperties } from 'react'
import {
  BURN_ANIMATION_MS,
  BURN_ANIMATION_REDUCED_MS,
} from '../../types/burn'
import { useReducedMotion } from '../../hooks/useReducedMotion'

interface BurningPaperProps {
  text: string
  onComplete: () => void
  onError?: () => void
}

export default function BurningPaper({
  text,
  onComplete,
  onError,
}: BurningPaperProps) {
  const reducedMotion = useReducedMotion()
  const completedRef = useRef(false)
  const duration = reducedMotion ? BURN_ANIMATION_REDUCED_MS : BURN_ANIMATION_MS

  useEffect(() => {
    completedRef.current = false

    const timer = window.setTimeout(() => {
      if (!completedRef.current) {
        completedRef.current = true
        onComplete()
      }
    }, duration)

    return () => window.clearTimeout(timer)
  }, [duration, onComplete])

  useEffect(() => {
    const failSafe = window.setTimeout(() => {
      if (!completedRef.current) {
        completedRef.current = true
        onError?.()
        onComplete()
      }
    }, duration + 500)

    return () => window.clearTimeout(failSafe)
  }, [duration, onComplete, onError])

  return (
    <div
      className={`burn-paper-stage mx-auto w-full max-w-[400px] ${reducedMotion ? 'burn-paper-stage--reduced' : ''}`}
      aria-hidden="true"
    >
      <div
        className="burn-paper writing-paper"
        style={{ '--burn-duration': `${duration}ms` } as CSSProperties}
      >
        <p className="writing-paper-prompt font-handwriting text-[15px] text-[#6B5A45]">
          Today, I choose to release…
        </p>
        <p className="burn-paper-text font-handwriting mt-3 whitespace-pre-wrap break-words text-[#2A241D]">
          {text}
        </p>

        <div className="burn-paper-char" />
        <div className="burn-paper-flames" />
        <div className="burn-paper-smoke" />
        <div className="burn-paper-ash" />
        <div className="burn-paper-glow" />

        {!reducedMotion && (
          <>
            <span className="burn-ember burn-ember--1" />
            <span className="burn-ember burn-ember--2" />
            <span className="burn-ember burn-ember--3" />
            <span className="burn-ember burn-ember--4" />
          </>
        )}
      </div>
    </div>
  )
}
