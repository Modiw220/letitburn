import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { sounds } from '../data/sounds'
import { useAudioFade } from '../hooks/useAudioFade'
import { useMediaSession } from '../hooks/useMediaSession'
import { useSleepTimer } from '../hooks/useSleepTimer'
import { useSoundPreferences, useVolumeBeforeMute } from '../hooks/useSoundPreferences'
import type { AudioStatus, SoundItem } from '../types/sounds'
import { volumeToGain } from '../utils/audio'

export const SOUND_ACCENT_COLORS = {
  rain: '#6BA7D9',
  ocean: '#47C4C9',
  fireplace: '#FF7A2F',
  forest: '#73B87C',
  thunderstorm: '#7B75D6',
  'brown-noise': '#A67C5B',
  'pink-noise': '#D88CA7',
  cafe: '#D6A45F',
} as const

export function getSoundById(id: string | null): SoundItem | null {
  if (!id) return null
  return sounds.find((s) => s.id === id) ?? null
}

interface SoundPlayerContextValue {
  selectedSound: SoundItem | null
  status: AudioStatus
  volume: number
  muted: boolean
  error: string | null
  loadingSlow: boolean
  liveMessage: string
  timerActive: boolean
  timerFormatted: string
  timerPreset: number | 'custom'
  selectSound: (id: string) => Promise<void>
  play: () => Promise<void>
  pause: () => void
  stop: () => void
  togglePlayPause: () => Promise<void>
  setVolume: (value: number) => void
  toggleMute: () => void
  startTimer: (minutes: number) => boolean
  cancelTimer: () => void
  setTimerPreset: (value: number | 'custom') => void
  retryPlay: () => Promise<void>
  clearError: () => void
  playSoundFromCard: (id: string) => Promise<void>
}

const SoundPlayerContext = createContext<SoundPlayerContextValue | null>(null)

const LOADING_SLOW_MS = 8000

export function SoundPlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const loadTokenRef = useRef(0)
  const switchingRef = useRef(false)
  const { fadeVolume, cancelFade } = useAudioFade()

  const {
    volume,
    muted,
    lastSoundId,
    timerPreset,
    setVolume: persistVolume,
    setMuted: persistMuted,
    setLastSoundId,
    setTimerPreset,
  } = useSoundPreferences()

  const volumeBeforeMuteRef = useVolumeBeforeMute(muted, volume)

  const [selectedSoundId, setSelectedSoundId] = useState<string | null>(lastSoundId)
  const [status, setStatus] = useState<AudioStatus>(
    lastSoundId ? 'ready' : 'idle',
  )
  const [error, setError] = useState<string | null>(null)
  const [loadingSlow, setLoadingSlow] = useState(false)
  const [liveMessage, setLiveMessage] = useState('')

  const selectedSound = useMemo(
    () => getSoundById(selectedSoundId),
    [selectedSoundId],
  )

  const announce = useCallback((message: string) => {
    setLiveMessage(message)
  }, [])

  const applyVolumeToAudio = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = muted ? 0 : volumeToGain(volume)
  }, [muted, volume])

  const initAudio = useCallback(() => {
    if (!audioRef.current) {
      const audio = new Audio()
      audio.loop = true
      audio.preload = 'none'
      audioRef.current = audio
    }
    return audioRef.current
  }, [])

  const handleTimerComplete = useCallback(async () => {
    const audio = audioRef.current
    if (!audio) return

    const targetGain = muted ? 0 : volumeToGain(volume)
    if (targetGain > 0) {
      await fadeVolume(audio, audio.volume, 0, { durationMs: 3000 })
    }

    audio.pause()
    audio.currentTime = 0
    applyVolumeToAudio()
    setStatus('stopped')
  }, [applyVolumeToAudio, fadeVolume, muted, volume])

  const {
    active: timerActive,
    formattedRemaining: timerFormatted,
    startTimer,
    cancelTimer: cancelSleepTimer,
  } = useSleepTimer({
    onTimerComplete: handleTimerComplete,
    hasSelectedSound: Boolean(selectedSoundId),
    announce,
  })

  const cancelTimer = useCallback(() => {
    if (!timerActive) return
    cancelSleepTimer()
    announce('Sleep timer cancelled')
  }, [announce, cancelSleepTimer, timerActive])

  const loadSound = useCallback(
    async (sound: SoundItem): Promise<boolean> => {
      const audio = initAudio()
      const token = ++loadTokenRef.current
      setLoadingSlow(false)
      setError(null)
      setStatus('loading')

      const slowTimer = window.setTimeout(() => {
        if (loadTokenRef.current === token) setLoadingSlow(true)
      }, LOADING_SLOW_MS)

      try {
        if (audio.src !== new URL(sound.audioSrc, window.location.origin).href) {
          audio.pause()
          audio.currentTime = 0
          audio.src = sound.audioSrc
        }

        await new Promise<void>((resolve, reject) => {
          if (audio.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
            resolve()
            return
          }

          let settled = false
          const timeoutId = window.setTimeout(() => {
            if (settled) return
            settled = true
            cleanup()
            reject(new Error('load timeout'))
          }, 15000)

          const onReady = () => {
            if (settled) return
            settled = true
            cleanup()
            resolve()
          }
          const onError = () => {
            if (settled) return
            settled = true
            cleanup()
            reject(new Error('load failed'))
          }
          const cleanup = () => {
            window.clearTimeout(timeoutId)
            audio.removeEventListener('canplaythrough', onReady)
            audio.removeEventListener('canplay', onReady)
            audio.removeEventListener('error', onError)
          }

          audio.addEventListener('canplaythrough', onReady)
          audio.addEventListener('canplay', onReady)
          audio.addEventListener('error', onError)
          audio.load()
        })

        if (loadTokenRef.current !== token) return false

        window.clearTimeout(slowTimer)
        setLoadingSlow(false)
        applyVolumeToAudio()
        setStatus('ready')
        return true
      } catch {
        if (loadTokenRef.current !== token) return false
        window.clearTimeout(slowTimer)
        setLoadingSlow(false)
        setStatus('error')
        setError("We couldn't play this sound. Try another one.")
        announce('Sound could not be played')
        return false
      }
    },
    [announce, applyVolumeToAudio, initAudio],
  )

  const selectSound = useCallback(
    async (id: string) => {
      const sound = getSoundById(id)
      if (!sound) return

      const audio = initAudio()
      const wasPlaying = status === 'playing'
      const previousId = selectedSoundId

      if (previousId === id && status !== 'error') {
        setLastSoundId(id)
        return
      }

      if (wasPlaying && previousId && previousId !== id) {
        switchingRef.current = true
        cancelFade()
        const currentGain = audio.volume
        await fadeVolume(audio, currentGain, 0, { durationMs: 400 })
        audio.pause()
        audio.currentTime = 0
      }

      setSelectedSoundId(id)
      setLastSoundId(id)
      announce(`${sound.title} selected`)

      const loaded = await loadSound(sound)
      if (!loaded) {
        switchingRef.current = false
        return
      }

      if (wasPlaying && previousId !== id) {
        try {
          applyVolumeToAudio()
          audio.volume = 0
          await audio.play()
          await fadeVolume(audio, 0, muted ? 0 : volumeToGain(volume), {
            durationMs: 400,
          })
          setStatus('playing')
          announce(`${sound.title} playing`)
        } catch {
          setStatus('error')
          setError("We couldn't play this sound. Try another one.")
        }
        switchingRef.current = false
      }
    },
    [
      announce,
      applyVolumeToAudio,
      cancelFade,
      fadeVolume,
      initAudio,
      loadSound,
      muted,
      selectedSoundId,
      setLastSoundId,
      status,
      volume,
    ],
  )

  const play = useCallback(async () => {
    if (!selectedSound) return

    const audio = initAudio()

    if (status === 'loading' || switchingRef.current) return

    if (status === 'error' || !audio.src) {
      const loaded = await loadSound(selectedSound)
      if (!loaded) return
    }

    try {
      cancelFade()
      applyVolumeToAudio()
      await audio.play()
      setStatus('playing')
      announce(`${selectedSound.title} playing`)
    } catch {
      setStatus('error')
      setError("We couldn't play this sound. Try another one.")
      announce('Sound could not be played')
    }
  }, [announce, applyVolumeToAudio, cancelFade, initAudio, loadSound, selectedSound, status])

  const pause = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    setStatus('paused')
    announce('Playback paused')
  }, [announce])

  const stop = useCallback(() => {
    cancelFade()
    const audio = audioRef.current
    if (audio) {
      audio.pause()
      audio.currentTime = 0
      applyVolumeToAudio()
    }
    cancelSleepTimer()
    setStatus('stopped')
    announce('Playback stopped')
  }, [announce, applyVolumeToAudio, cancelFade, cancelSleepTimer])

  const togglePlayPause = useCallback(async () => {
    if (status === 'playing') {
      pause()
    } else {
      await play()
    }
  }, [pause, play, status])

  const setVolume = useCallback(
    (value: number) => {
      persistVolume(value)
      if (value > 0 && muted) {
        persistMuted(false)
      }
      announce(`Volume set to ${value} percent`)
    },
    [announce, muted, persistMuted, persistVolume],
  )

  const toggleMute = useCallback(() => {
    if (muted) {
      persistMuted(false)
      const restore = volumeBeforeMuteRef.current || volume || 50
      persistVolume(restore)
      announce(`Volume set to ${restore} percent`)
    } else {
      if (volume > 0) volumeBeforeMuteRef.current = volume
      persistMuted(true)
      announce('Volume muted')
    }
  }, [announce, muted, persistMuted, persistVolume, volume, volumeBeforeMuteRef])

  const playSoundFromCard = useCallback(
    async (id: string) => {
      if (selectedSoundId === id) {
        await togglePlayPause()
        return
      }

      const wasPlaying = status === 'playing'
      await selectSound(id)

      if (!wasPlaying) {
        await play()
      }
    },
    [play, selectSound, selectedSoundId, status, togglePlayPause],
  )

  const retryPlay = useCallback(async () => {
    if (!selectedSound) return
    setError(null)
    const loaded = await loadSound(selectedSound)
    if (loaded) await play()
  }, [loadSound, play, selectedSound])

  const clearError = useCallback(() => {
    setError(null)
    if (status === 'error') setStatus(selectedSoundId ? 'ready' : 'idle')
  }, [selectedSoundId, status])

  const handleStartTimer = useCallback(
    (minutes: number) => startTimer(minutes),
    [startTimer],
  )

  useEffect(() => {
    applyVolumeToAudio()
  }, [applyVolumeToAudio])

  useEffect(() => {
    const audio = initAudio()

    const onEnded = () => setStatus('stopped')
    const onPlay = () => setStatus('playing')
    const onPause = () => {
      if (!switchingRef.current) {
        setStatus((s) => (s === 'playing' ? 'paused' : s))
      }
    }

    audio.addEventListener('ended', onEnded)
    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)

    return () => {
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      cancelFade()
      audio.pause()
      audio.src = ''
    }
  }, [cancelFade, initAudio])

  useMediaSession({
    sound: selectedSound,
    isPlaying: status === 'playing',
    onPlay: () => void play(),
    onPause: pause,
    onStop: stop,
  })

  const value = useMemo<SoundPlayerContextValue>(
    () => ({
      selectedSound,
      status,
      volume,
      muted,
      error,
      loadingSlow,
      liveMessage,
      timerActive,
      timerFormatted,
      timerPreset,
      selectSound,
      play,
      pause,
      stop,
      togglePlayPause,
      setVolume,
      toggleMute,
      startTimer: handleStartTimer,
      cancelTimer,
      setTimerPreset,
      retryPlay,
      clearError,
      playSoundFromCard,
    }),
    [
      selectedSound,
      status,
      volume,
      muted,
      error,
      loadingSlow,
      liveMessage,
      timerActive,
      timerFormatted,
      timerPreset,
      selectSound,
      play,
      pause,
      stop,
      togglePlayPause,
      setVolume,
      toggleMute,
      handleStartTimer,
      cancelTimer,
      setTimerPreset,
      retryPlay,
      clearError,
      playSoundFromCard,
    ],
  )

  return (
    <SoundPlayerContext.Provider value={value}>
      {children}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {liveMessage}
      </div>
    </SoundPlayerContext.Provider>
  )
}

export function useSoundPlayer() {
  const ctx = useContext(SoundPlayerContext)
  if (!ctx) {
    throw new Error('useSoundPlayer must be used within SoundPlayerProvider')
  }
  return ctx
}

/** @deprecated Use useSoundPlayer — kept for spec file structure */
export const useAudioPlayer = useSoundPlayer
