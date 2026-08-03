import { forwardRef } from 'react'
import { Repeat, Timer } from 'lucide-react'
import { SOUND_ACCENT_COLORS, useSoundPlayer } from '../../context/SoundPlayerContext'
import ActiveSoundIndicator from './ActiveSoundIndicator'
import AudioErrorNotice from './AudioErrorNotice'
import PlaybackControls from './PlaybackControls'
import SleepTimer from './SleepTimer'
import SoundArtwork from './SoundArtwork'
import SoundWaveAnimation from './SoundWaveAnimation'
import VolumeControl from './VolumeControl'

const FeaturedSoundPlayer = forwardRef<HTMLElement>(function FeaturedSoundPlayer(_, ref) {
  const {
    selectedSound,
    status,
    volume,
    muted,
    error,
    loadingSlow,
    timerActive,
    timerFormatted,
    togglePlayPause,
    stop,
    setVolume,
    toggleMute,
    retryPlay,
    clearError,
  } = useSoundPlayer()

  const accentColor = selectedSound
    ? SOUND_ACCENT_COLORS[selectedSound.accent]
    : '#6BA7D9'

  return (
    <section
      ref={ref}
      id="featured-player"
      className="sound-featured-player rounded-3xl border border-border-card bg-bg-card/80 p-5 shadow-[0_20px_60px_rgba(0,0,0,0.25)] md:p-8"
      aria-labelledby="featured-player-heading"
    >
      {!selectedSound ? (
        <div className="grid gap-6 py-8 text-left md:py-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-calm-cyan/20 bg-calm-cyan/8 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-calm-cyan">
              Ready when you are
            </div>
            <h2
              id="featured-player-heading"
              className="mt-4 font-heading text-2xl font-semibold text-text-main md:text-3xl"
            >
              Choose a sound to begin.
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-text-muted md:text-base">
              Start with one steady sound. Keep it simple first, then decide whether you want to stay,
              stop, or switch.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <p className="text-sm font-semibold text-text-main">Best first picks</p>
                <p className="mt-2 text-sm text-text-muted">
                  Rain, waves, or brown noise work well when you do not want to choose for long.
                </p>
              </div>
              <div className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                <p className="text-sm font-semibold text-text-main">What happens next</p>
                <p className="mt-2 text-sm text-text-muted">
                  Playback, timer, mute, and volume controls appear here after you choose.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-[24px] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(107,167,217,0.12),transparent_60%)] p-6 text-center">
            <SoundWaveAnimation className="mx-auto mb-6 h-8 text-text-muted/40" />
            <p className="text-sm text-text-muted">
              Select any sound below and it will expand into this player.
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <SoundArtwork
              accent={selectedSound.accent}
              artworkSrc={selectedSound.artworkSrc}
              title={selectedSound.title}
              large
            />

            <div>
              <h2
                id="featured-player-heading"
                className="font-heading text-2xl font-semibold text-text-main md:text-3xl"
              >
                {selectedSound.title}
              </h2>
              <p className="mt-2 text-sm text-text-muted md:text-base">
                {selectedSound.description}
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-4">
                <ActiveSoundIndicator status={status} accentColor={accentColor} />
                <span className="inline-flex items-center gap-1.5 text-xs text-text-muted">
                  <Repeat className="h-3.5 w-3.5" aria-hidden="true" />
                  Looping
                </span>
                {timerActive && (
                  <span className="inline-flex items-center gap-1.5 text-xs text-calm-cyan">
                    <Timer className="h-3.5 w-3.5" aria-hidden="true" />
                    {timerFormatted}
                  </span>
                )}
              </div>

              {loadingSlow && status === 'loading' && (
                <p className="mt-3 text-sm text-text-muted">
                  This sound is taking longer than expected.
                </p>
              )}

              <div className="mt-6">
                <PlaybackControls
                  status={status}
                  onPlayPause={() => void togglePlayPause()}
                  onStop={stop}
                  disabled={false}
                  size="large"
                />
              </div>

              <div className="mt-6">
                <VolumeControl
                  volume={volume}
                  muted={muted}
                  onVolumeChange={setVolume}
                  onToggleMute={toggleMute}
                />
              </div>
            </div>
          </div>

          {error && (
            <AudioErrorNotice
              message={error}
              onRetry={retryPlay}
              onDismiss={clearError}
            />
          )}

          <div className="mt-8">
            <SleepTimer />
          </div>
        </>
      )}
    </section>
  )
})

export default FeaturedSoundPlayer
