import { useCallback, useRef } from 'react'

interface FadeOptions {
  durationMs?: number
  steps?: number
}

export function useAudioFade() {
  const fadeRef = useRef<number | null>(null)
  const intervalRef = useRef<number | null>(null)

  const cancelFade = useCallback(() => {
    if (fadeRef.current !== null) {
      cancelAnimationFrame(fadeRef.current)
      fadeRef.current = null
    }
    if (intervalRef.current !== null) {
      window.clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const fadeVolume = useCallback(
    (
      audio: HTMLAudioElement,
      fromGain: number,
      toGain: number,
      options: FadeOptions = {},
    ): Promise<void> => {
      cancelFade()

      const durationMs = options.durationMs ?? 400
      const steps = options.steps ?? 20
      const stepMs = durationMs / steps
      const delta = (toGain - fromGain) / steps

      return new Promise((resolve) => {
        let step = 0
        audio.volume = Math.min(1, Math.max(0, fromGain))

        intervalRef.current = window.setInterval(() => {
          step += 1
          const next = fromGain + delta * step
          audio.volume = Math.min(1, Math.max(0, next))

          if (step >= steps) {
            cancelFade()
            audio.volume = Math.min(1, Math.max(0, toGain))
            resolve()
          }
        }, stepMs)
      })
    },
    [cancelFade],
  )

  return { fadeVolume, cancelFade }
}
