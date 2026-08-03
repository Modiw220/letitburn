import { useEffect } from 'react'
import type { SoundItem } from '../types/sounds'

interface UseMediaSessionOptions {
  sound: SoundItem | null
  isPlaying: boolean
  onPlay: () => void
  onPause: () => void
  onStop: () => void
}

export function useMediaSession({
  sound,
  isPlaying,
  onPlay,
  onPause,
  onStop,
}: UseMediaSessionOptions) {
  useEffect(() => {
    if (!('mediaSession' in navigator) || !sound) return

    const artwork = sound.artworkSrc
      ? [{ src: sound.artworkSrc, sizes: '512x512', type: 'image/webp' }]
      : []

    navigator.mediaSession.metadata = new MediaMetadata({
      title: sound.title,
      artist: 'Let It Burn',
      album: 'Calming Sounds',
      artwork,
    })

    navigator.mediaSession.playbackState = isPlaying ? 'playing' : 'paused'

    navigator.mediaSession.setActionHandler('play', onPlay)
    navigator.mediaSession.setActionHandler('pause', onPause)
    navigator.mediaSession.setActionHandler('stop', onStop)

    return () => {
      navigator.mediaSession.setActionHandler('play', null)
      navigator.mediaSession.setActionHandler('pause', null)
      navigator.mediaSession.setActionHandler('stop', null)
    }
  }, [sound, isPlaying, onPlay, onPause, onStop])
}
