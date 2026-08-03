import { useCallback, useEffect, useRef, useState } from 'react'
import { TIMER_MAX_MINUTES, TIMER_MIN_MINUTES } from '../data/sleepTimerOptions'
import { formatRemainingTime } from '../utils/formatTime'

interface UseSleepTimerOptions {
  onTimerComplete: () => Promise<void>
  hasSelectedSound: boolean
  announce: (message: string) => void
}

export function useSleepTimer({
  onTimerComplete,
  hasSelectedSound,
  announce,
}: UseSleepTimerOptions) {
  const [active, setActive] = useState(false)
  const [durationMinutes, setDurationMinutes] = useState<number | null>(null)
  const [endsAt, setEndsAt] = useState<number | null>(null)
  const [remainingSeconds, setRemainingSeconds] = useState(0)
  const completingRef = useRef(false)
  const endsAtRef = useRef<number | null>(null)

  const cancelTimer = useCallback(() => {
    endsAtRef.current = null
    setActive(false)
    setDurationMinutes(null)
    setEndsAt(null)
    setRemainingSeconds(0)
    completingRef.current = false
  }, [])

  const validateMinutes = useCallback((minutes: number): boolean => {
    return (
      Number.isInteger(minutes) &&
      minutes >= TIMER_MIN_MINUTES &&
      minutes <= TIMER_MAX_MINUTES
    )
  }, [])

  const startTimer = useCallback(
    (minutes: number) => {
      if (!hasSelectedSound || !validateMinutes(minutes)) return false

      const target = Date.now() + minutes * 60 * 1000
      endsAtRef.current = target
      setDurationMinutes(minutes)
      setEndsAt(target)
      setActive(true)
      setRemainingSeconds(minutes * 60)
      announce(`Sleep timer started for ${minutes} minutes`)
      return true
    },
    [announce, hasSelectedSound, validateMinutes],
  )

  useEffect(() => {
    if (!active || !endsAtRef.current) return

    const tick = () => {
      const end = endsAtRef.current
      if (!end) return

      const remaining = Math.max(0, Math.ceil((end - Date.now()) / 1000))
      setRemainingSeconds(remaining)

      if (remaining <= 0 && !completingRef.current) {
        completingRef.current = true
        void onTimerComplete().finally(() => {
          announce('Sleep timer finished')
          cancelTimer()
        })
      }
    }

    tick()
    const intervalId = window.setInterval(tick, 1000)

    const handleVisibility = () => {
      if (document.visibilityState === 'visible') tick()
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      window.clearInterval(intervalId)
      document.removeEventListener('visibilitychange', handleVisibility)
    }
  }, [active, announce, cancelTimer, onTimerComplete])

  const formattedRemaining = formatRemainingTime(remainingSeconds)

  return {
    active,
    durationMinutes,
    endsAt,
    remainingSeconds,
    formattedRemaining,
    startTimer,
    cancelTimer,
    validateMinutes,
  }
}
