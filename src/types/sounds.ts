export type AudioStatus =
  | 'idle'
  | 'loading'
  | 'ready'
  | 'playing'
  | 'paused'
  | 'stopped'
  | 'error'

export type SoundCategory = 'nature' | 'noise' | 'comfort' | 'ambience'

export type SoundAccent =
  | 'rain'
  | 'ocean'
  | 'fireplace'
  | 'forest'
  | 'thunderstorm'
  | 'brown-noise'
  | 'pink-noise'
  | 'cafe'

export interface SoundItem {
  id: string
  title: string
  description: string
  category: SoundCategory
  audioSrc: string
  artworkSrc?: string
  accent: SoundAccent
}

export interface PlayerState {
  selectedSoundId: string | null
  status: AudioStatus
  volume: number
  muted: boolean
  error: string | null
}

export interface SleepTimerState {
  active: boolean
  durationMinutes: number | null
  endsAt: number | null
  remainingSeconds: number
}

export interface PremiumSoundFeature {
  id: string
  title: string
  description: string
  icon: 'sliders' | 'heart' | 'sparkles' | 'badge'
  productId: string
  entitlementCheck: 'sound-mixer' | 'premium-sounds' | 'ad-free'
}

export const STORAGE_KEYS = {
  volume: 'letItBurn.soundVolume',
  muted: 'letItBurn.soundMuted',
  lastSoundId: 'letItBurn.lastSoundId',
  timerPreset: 'letItBurn.timerPreset',
} as const

export const ADS_ENABLED = true
