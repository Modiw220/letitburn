import { useCallback, useEffect, useRef } from 'react'

const FIRE_SOUND_PATH = '/audio/fire-crackle.mp3'

export function useFireSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const stop = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    audio.currentTime = 0
  }, [])

  const play = useCallback(() => {
    try {
      if (!audioRef.current) {
        const audio = new Audio(FIRE_SOUND_PATH)
        audio.volume = 0.25
        audio.loop = false
        audioRef.current = audio
      }

      const audio = audioRef.current
      audio.currentTime = 0
      void audio.play().catch(() => {
        /* missing file or autoplay blocked — continue silently */
      })
    } catch {
      /* continue silently */
    }
  }, [])

  useEffect(() => stop, [stop])

  return { play, stop }
}
