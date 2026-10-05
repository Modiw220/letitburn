import { Flame, Shield } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useBurnSequence } from '../../hooks/useBurnSequence'
import { useFireSound } from '../../hooks/useFireSound'
import BurnConfirmationDialog from './BurnConfirmationDialog'
import BreathingGuide from './BreathingGuide'
import BurningPaper from './BurningPaper'
import ClearNoteDialog from './ClearNoteDialog'
import CompletionActions from './CompletionActions'
import EmberParticles from './EmberParticles'
import FireSoundToggle from './FireSoundToggle'
import PrivacyNotice from './PrivacyNotice'
import WritingPaper from './WritingPaper'

export default function BurnExperience() {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const [clearDialogOpen, setClearDialogOpen] = useState(false)
  const [fireSoundEnabled, setFireSoundEnabled] = useState(false)
  const [liveMessage, setLiveMessage] = useState('')
  const { play: playFireSound, stop: stopFireSound } = useFireSound()

  const announce = useCallback((message: string) => {
    setLiveMessage(message)
  }, [])

  const {
    stage,
    note,
    setNote,
    burnSnapshot,
    requestBurn,
    cancelConfirm,
    confirmBurn,
    completeBurnAnimation,
    completeBreathing,
    resetExperience,
    clearNote,
    isBurnInProgress,
  } = useBurnSequence({ onAnnounce: announce })

  const handleConfirmBurn = useCallback(() => {
    if (textareaRef.current) {
      textareaRef.current.blur()
    }
    confirmBurn()
    if (fireSoundEnabled) {
      playFireSound()
    }
  }, [confirmBurn, fireSoundEnabled, playFireSound])

  const handleBurnComplete = useCallback(() => {
    stopFireSound()
    completeBurnAnimation()
  }, [completeBurnAnimation, stopFireSound])

  const handleWriteAnother = useCallback(() => {
    resetExperience()
    window.setTimeout(() => {
      const isDesktop = window.matchMedia('(min-width: 768px)').matches
      if (isDesktop) textareaRef.current?.focus()
    }, 100)
  }, [resetExperience])

  const handleClearConfirm = useCallback(() => {
    clearNote()
    setClearDialogOpen(false)
  }, [clearNote])

  const isNoteEmpty = note.trim().length === 0
  const showWriting = stage === 'writing' || stage === 'confirming'

  return (
    <div className="burn-page relative">
      <div className="burn-page-bg" aria-hidden="true">
        <EmberParticles count={5} />
      </div>

      <div
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      >
        {liveMessage}
      </div>

      <div className="burn-page-content relative z-10 mx-auto max-w-[1200px] px-4 md:px-8">
        {showWriting && (
          <div className="burn-writing-viewport flex flex-col justify-center py-4 md:py-5">
            <header className="mx-auto mb-4 max-w-3xl shrink-0 text-center md:mb-5">
              <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-fire-orange md:text-xs">
                Private Release Space
              </p>
              <h1 className="mt-2 font-heading text-2xl font-semibold text-text-main md:mt-3 md:text-3xl lg:text-[34px]">
                Write what you want to let go of.
              </h1>
              <p className="mt-2 text-sm text-text-muted md:text-base">
                This space is yours. Write freely, without judgment.
              </p>

              <div className="mt-3 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 text-xs text-text-muted md:text-sm">
                <span className="inline-flex items-center gap-1">
                  <Shield className="h-3.5 w-3.5 text-calm-cyan" aria-hidden="true" />
                  Anonymous
                </span>
                <span aria-hidden="true">·</span>
                <span>No account needed</span>
                <span aria-hidden="true">·</span>
                <span>Your note is not saved</span>
              </div>
            </header>

            <div className="mx-auto w-full max-w-[680px] shrink min-h-0">
              <div className="rounded-[24px] border border-border-card bg-bg-card/50 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.2)] md:p-4">
                <div className="mb-3 flex items-center justify-between gap-2 rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2 text-xs text-text-muted md:text-sm">
                  <span>Write</span>
                  <span className="text-white/20" aria-hidden="true">→</span>
                  <span>Burn</span>
                  <span className="text-white/20" aria-hidden="true">→</span>
                  <span>Breathe</span>
                </div>

                <WritingPaper
                  ref={textareaRef}
                  value={note}
                  onChange={setNote}
                  disabled={isBurnInProgress}
                />

                <div className="mt-3 grid gap-3 md:grid-cols-[1fr_auto] md:items-end">
                  <div id="burn-note-privacy" className="rounded-xl border border-white/8 bg-white/[0.03] px-3 py-2.5">
                    <PrivacyNotice compact />
                  </div>

                  <div className="flex flex-col items-stretch gap-2.5 md:items-end">
                    <button
                      type="button"
                      onClick={requestBurn}
                      disabled={isNoteEmpty || isBurnInProgress}
                      aria-disabled={isNoteEmpty || isBurnInProgress}
                      aria-describedby={isNoteEmpty ? 'burn-button-hint' : undefined}
                      className="btn-primary-glow inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fire-orange to-bright-orange px-6 py-3 text-base font-semibold text-white transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none md:w-auto"
                    >
                      <Flame className="h-5 w-5" aria-hidden="true" />
                      Burn It
                    </button>

                    {isNoteEmpty && (
                      <p id="burn-button-hint" className="sr-only">
                        Enter text in the note before burning.
                      </p>
                    )}

                    <div className="flex flex-wrap items-center justify-center gap-3 md:justify-end">
                      <button
                        type="button"
                        onClick={() => setClearDialogOpen(true)}
                        disabled={isNoteEmpty || isBurnInProgress}
                        className="text-sm text-text-muted transition-colors hover:text-text-main disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        Clear the note
                      </button>

                      <FireSoundToggle
                        disabled={isBurnInProgress}
                        onChange={setFireSoundEnabled}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="mx-auto w-full max-w-[560px] py-6 md:py-8">
          {stage === 'burning' && burnSnapshot && (
            <BurningPaper
              text={burnSnapshot}
              onComplete={handleBurnComplete}
              onError={stopFireSound}
            />
          )}

          {stage === 'breathing' && (
            <BreathingGuide
              onComplete={completeBreathing}
              onSkip={completeBreathing}
            />
          )}

          {stage === 'complete' && (
            <CompletionActions onWriteAnother={handleWriteAnother} />
          )}
        </div>

        {stage === 'complete' && (
          <footer className="mx-auto mt-8 max-w-xl rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 py-5 text-center">
            <p className="text-sm text-text-muted">
              Let It Burn is a reflection tool, not emergency support.
            </p>
            <Link
              to="/safety-resources"
              className="mt-2 inline-block text-sm font-medium text-calm-cyan transition-opacity hover:opacity-80"
            >
              Need immediate help? View safety resources.
            </Link>
          </footer>
        )}
      </div>

      <BurnConfirmationDialog
        open={stage === 'confirming'}
        onConfirm={handleConfirmBurn}
        onCancel={cancelConfirm}
      />

      <ClearNoteDialog
        open={clearDialogOpen}
        onCancel={() => setClearDialogOpen(false)}
        onConfirm={handleClearConfirm}
      />
    </div>
  )
}
