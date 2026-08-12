import type { StorageEntry } from '../types/privacy'
import { STORAGE_KEYS } from '../types/sounds'

export const storageRegistry: StorageEntry[] = [
  {
    key: 'let-it-burn-theme',
    technology: 'localStorage',
    category: 'essential',
    purpose: 'Remember light or dark appearance preference',
    duration: 'Until cleared by the user or browser',
    enabled: true,
  },
  {
    key: 'let-it-burn-fire-sound',
    technology: 'localStorage',
    category: 'preference',
    purpose: 'Remember whether fire sound is enabled on Burn Your Thoughts',
    duration: 'Until cleared by the user or browser',
    enabled: true,
  },
  {
    key: STORAGE_KEYS.volume,
    technology: 'localStorage',
    category: 'preference',
    purpose: 'Remember sound player volume level',
    duration: 'Until cleared by the user or browser',
    enabled: true,
  },
  {
    key: STORAGE_KEYS.muted,
    technology: 'localStorage',
    category: 'preference',
    purpose: 'Remember whether sound playback is muted',
    duration: 'Until cleared by the user or browser',
    enabled: true,
  },
  {
    key: STORAGE_KEYS.lastSoundId,
    technology: 'localStorage',
    category: 'preference',
    purpose: 'Remember the last selected calming sound',
    duration: 'Until cleared by the user or browser',
    enabled: true,
  },
  {
    key: STORAGE_KEYS.timerPreset,
    technology: 'localStorage',
    category: 'preference',
    purpose: 'Remember the selected sleep timer preset on the Sounds page',
    duration: 'Until cleared by the user or browser',
    enabled: true,
  },
  {
    key: 'lib-quiz-result:*',
    technology: 'sessionStorage',
    category: 'essential',
    purpose: 'Temporarily keep a free quiz result on this device while Stripe checkout completes',
    duration: 'Cleared after report unlock or when the browser tab session ends',
    enabled: true,
  },
]

export const enabledStorageEntries = storageRegistry.filter((entry) => entry.enabled)
