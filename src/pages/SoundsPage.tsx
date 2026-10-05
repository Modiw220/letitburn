import { useCallback, useEffect, useRef, useState } from 'react'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import FeaturedSoundPlayer from '../components/sounds/FeaturedSoundPlayer'
import PersistentMiniPlayer from '../components/sounds/PersistentMiniPlayer'
import PremiumSoundPreview from '../components/sounds/PremiumSoundPreview'
import SoundKeyboardShortcutsDialog, {
  KeyboardShortcutsButton,
} from '../components/sounds/SoundKeyboardShortcutsDialog'
import SoundLibrary from '../components/sounds/SoundLibrary'
import SoundMixer from '../components/sounds/SoundMixer'
import SoundPrivacyNotice from '../components/sounds/SoundPrivacyNotice'
import SoundsHero from '../components/sounds/SoundsHero'
import SoundSupportPanel from '../components/sounds/SoundSupportPanel'
import { SoundPlayerProvider, useSoundPlayer } from '../context/SoundPlayerContext'
import { useFeaturedPlayerVisibility } from '../hooks/useFeaturedPlayerVisibility'
import { useReducedMotion } from '../hooks/useReducedMotion'

interface SoundsPageProps {
  theme: 'dark' | 'light'
  onToggleTheme: () => void
}

function SoundsPageContent() {
  const featuredRef = useRef<HTMLElement>(null)
  const isFeaturedVisible = useFeaturedPlayerVisibility(featuredRef)
  const reducedMotion = useReducedMotion()
  const [shortcutsOpen, setShortcutsOpen] = useState(false)
  const {
    selectedSound,
    togglePlayPause,
    stop,
    toggleMute,
    setVolume,
    volume,
  } = useSoundPlayer()

  const scrollToPlayer = useCallback(() => {
    featuredRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }, [])

  useEffect(() => {
    const isEditableTarget = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) return false
      const tag = target.tagName
      return (
        tag === 'INPUT' ||
        tag === 'TEXTAREA' ||
        tag === 'SELECT' ||
        target.isContentEditable
      )
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (shortcutsOpen) return
      if (isEditableTarget(event.target)) return
      if (event.target instanceof HTMLInputElement && event.target.type === 'range') return

      switch (event.key) {
        case ' ':
          if (event.target instanceof HTMLButtonElement) return
          event.preventDefault()
          if (selectedSound) void togglePlayPause()
          break
        case 's':
        case 'S':
          if (!selectedSound) return
          stop()
          break
        case 'm':
        case 'M':
          toggleMute()
          break
        case 'ArrowUp':
          event.preventDefault()
          setVolume(Math.min(100, volume + 5))
          break
        case 'ArrowDown':
          event.preventDefault()
          setVolume(Math.max(0, volume - 5))
          break
        case 't':
        case 'T':
          document.getElementById('sleep-timer')?.scrollIntoView({ behavior: 'smooth' })
          document.querySelector<HTMLElement>('#sleep-timer button')?.focus()
          break
        default:
          break
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [
    selectedSound,
    shortcutsOpen,
    stop,
    toggleMute,
    togglePlayPause,
    setVolume,
    volume,
  ])

  return (
    <>
      <main className={`sounds-page relative pb-28 md:pb-24 ${reducedMotion ? 'sounds-page--reduced' : ''}`}>
        <div className="sounds-page-glow" aria-hidden="true" />

        <div className="content-container relative z-[1] py-8 md:py-12">
          <SoundsHero />

          <div className="mt-10 md:mt-12">
            <FeaturedSoundPlayer ref={featuredRef} />
          </div>

          <div className="mt-6 flex justify-end">
            <KeyboardShortcutsButton onOpen={() => setShortcutsOpen(true)} />
          </div>

          <div className="relative">
            <SoundLibrary />
            <SoundMixer />
            <PremiumSoundPreview />
            <div className="mt-12 grid gap-4 xl:grid-cols-[1.05fr_0.95fr]">
              <SoundSupportPanel />
              <SoundPrivacyNotice />
            </div>
          </div>
        </div>
      </main>

      <PersistentMiniPlayer
        visible={Boolean(selectedSound) && !isFeaturedVisible}
        onScrollToPlayer={scrollToPlayer}
      />

      <SoundKeyboardShortcutsDialog
        open={shortcutsOpen}
        onClose={() => setShortcutsOpen(false)}
      />
    </>
  )
}

export default function SoundsPage({ theme, onToggleTheme }: SoundsPageProps) {
  return (
    <>
      <Header theme={theme} onToggleTheme={onToggleTheme} />
      <SoundPlayerProvider>
        <SoundsPageContent />
      </SoundPlayerProvider>
      <Footer />
    </>
  )
}
