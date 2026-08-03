import { useCallback, useEffect, useRef, useState } from 'react'
import { STORAGE_KEYS } from '../types/sounds'
import { clampVolume } from '../utils/audio'
import { readBoolean, readNumber, readStorage, writeStorage } from '../utils/storage'

export function useSoundPreferences() {
  const [volume, setVolumeState] = useState(() =>
    clampVolume(readNumber(STORAGE_KEYS.volume, 50)),
  )
  const [muted, setMutedState] = useState(() =>
    readBoolean(STORAGE_KEYS.muted, false),
  )
  const [lastSoundId, setLastSoundIdState] = useState<string | null>(() =>
    readStorage(STORAGE_KEYS.lastSoundId),
  )
  const [timerPreset, setTimerPresetState] = useState<number | 'custom'>(() => {
    const raw = readStorage(STORAGE_KEYS.timerPreset)
    if (!raw) return 30
    if (raw === 'custom') return 'custom'
    const parsed = Number(raw)
    return Number.isFinite(parsed) ? parsed : 30
  })

  const setVolume = useCallback((value: number) => {
    const clamped = clampVolume(value)
    setVolumeState(clamped)
    writeStorage(STORAGE_KEYS.volume, String(clamped))
  }, [])

  const setMuted = useCallback((value: boolean) => {
    setMutedState(value)
    writeStorage(STORAGE_KEYS.muted, String(value))
  }, [])

  const setLastSoundId = useCallback((id: string | null) => {
    setLastSoundIdState(id)
    if (id) {
      writeStorage(STORAGE_KEYS.lastSoundId, id)
    }
  }, [])

  const setTimerPreset = useCallback((value: number | 'custom') => {
    setTimerPresetState(value)
    writeStorage(STORAGE_KEYS.timerPreset, String(value))
  }, [])

  return {
    volume,
    muted,
    lastSoundId,
    timerPreset,
    setVolume,
    setMuted,
    setLastSoundId,
    setTimerPreset,
  }
}

export function useVolumeBeforeMute(muted: boolean, volume: number) {
  const volumeBeforeMuteRef = useRef(50)

  useEffect(() => {
    if (!muted && volume > 0) {
      volumeBeforeMuteRef.current = volume
    }
  }, [muted, volume])

  return volumeBeforeMuteRef
}
