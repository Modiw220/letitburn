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
    <div className="burn-page relative min-h-[calc(100vh-78px)]">
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

      <div className="burn-page-content relative z-10 mx-auto max-w-[1200px] px-5 py-10 md:px-8 md:py-14 lg:py-16">
        {showWriting && (
          <header className="mx-auto mb-10 max-w-2xl text-center">
            <p className="text-xs font-medium uppercase tracking-[0.22em] text-fire-orange">
              Private Release Space
            </p>
            <h1 className="mt-4 font-heading text-3xl font-semibold text-text-main md:text-4xl lg:text-[42px]">
              Write what you want to let go of.
            </h1>
            <p className="mt-4 text-base text-text-muted md:text-lg">
              This space is yours. Write freely, without judgment.
            </p>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-text-muted">
              <span className="inline-flex items-center gap-1.5">
                <Shield className="h-4 w-4 text-calm-cyan" aria-hidden="true" />
                Anonymous
              </span>
              <span aria-hidden="true">·</span>
              <span>No account needed</span>
              <span aria-hidden="true">·</span>
              <span>Your note is not saved</span>
            </div>
          </header>
        )}

        <div className="mx-auto w-full max-w-[720px]">
          {showWriting && (
            <>
              <WritingPaper
                ref={textareaRef}
                value={note}
                onChange={setNote}
                disabled={isBurnInProgress}
              />

              <div id="burn-note-privacy" className="mt-6">
                <PrivacyNotice />
              </div>

              <div className="mt-8 flex flex-col items-center gap-4">
                <button
                  type="button"
                  onClick={requestBurn}
                  disabled={isNoteEmpty || isBurnInProgress}
                  aria-disabled={isNoteEmpty || isBurnInProgress}
                  aria-describedby={isNoteEmpty ? 'burn-button-hint' : undefined}
                  className="btn-primary-glow inline-flex min-h-[54px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fire-orange to-bright-orange px-8 py-3.5 text-base font-semibold text-white transition-transform hover:-translate-y-0.5 active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-45 disabled:shadow-none sm:w-auto"
                >
                  <Flame className="h-5 w-5" aria-hidden="true" />
                  Burn It
                </button>

                {isNoteEmpty && (
                  <p id="burn-button-hint" className="sr-only">
                    Enter text in the note before burning.
                  </p>
                )}

                <div className="flex flex-wrap items-center justify-center gap-4">
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
            </>
          )}

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

        {(showWriting || stage === 'complete') && (
          <footer className="mx-auto mt-16 max-w-xl border-t border-white/[0.06] pt-8 text-center">
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
