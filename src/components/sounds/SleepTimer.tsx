import { useId, useState } from 'react'
import { Moon, RotateCcw, Timer } from 'lucide-react'
import { sleepTimerPresets } from '../../data/sleepTimerOptions'
import { useSoundPlayer } from '../../context/SoundPlayerContext'

export default function SleepTimer() {
  const {
    selectedSound,
    timerActive,
    timerFormatted,
    timerPreset,
    startTimer,
    cancelTimer,
    setTimerPreset,
    play,
  } = useSoundPlayer()

  const [customMinutes, setCustomMinutes] = useState('20')
  const [validationError, setValidationError] = useState<string | null>(null)
  const sectionId = useId()

  const handlePreset = (minutes: number) => {
    setTimerPreset(minutes)
    setValidationError(null)
  }

  const handleStart = async (andPlay: boolean) => {
    if (!selectedSound) return

    let minutes = timerPreset
    if (timerPreset === 'custom') {
      const parsed = Number(customMinutes)
      if (!Number.isInteger(parsed) || parsed < 1 || parsed > 180) {
        setValidationError('Enter a whole number between 1 and 180 minutes.')
        return
      }
      minutes = parsed
    }

    if (typeof minutes !== 'number') return

    const started = startTimer(minutes)
    if (!started) return

    if (andPlay) {
      await play()
    }
  }

  return (
    <section
      id="sleep-timer"
      className="rounded-2xl border border-border-card bg-bg-card/60 p-5 md:p-6"
      aria-labelledby={`${sectionId}-heading`}
    >
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 text-calm-cyan">
          <Moon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <h3
            id={`${sectionId}-heading`}
            className="font-heading text-lg font-semibold text-text-main"
          >
            Sleep timer
          </h3>
          <p className="mt-1 text-sm text-text-muted">
            Stop the sound automatically after a set time.
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {sleepTimerPresets.map((minutes) => (
          <button
            key={minutes}
            type="button"
            className={`min-h-[44px] rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              timerPreset === minutes
                ? 'border-calm-cyan/50 bg-calm-cyan/10 text-text-main'
                : 'border-white/10 bg-white/[0.03] text-text-muted hover:text-text-main'
            }`}
            onClick={() => handlePreset(minutes)}
            aria-pressed={timerPreset === minutes}
          >
            {minutes} min
          </button>
        ))}
        <button
          type="button"
          className={`min-h-[44px] rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
            timerPreset === 'custom'
              ? 'border-calm-cyan/50 bg-calm-cyan/10 text-text-main'
              : 'border-white/10 bg-white/[0.03] text-text-muted hover:text-text-main'
          }`}
          onClick={() => {
            setTimerPreset('custom')
            setValidationError(null)
          }}
          aria-pressed={timerPreset === 'custom'}
        >
          Custom
        </button>
      </div>

      {timerPreset === 'custom' && (
        <div className="mt-4">
          <label htmlFor={`${sectionId}-custom`} className="text-sm text-text-muted">
            Custom minutes (1–180)
          </label>
          <input
            id={`${sectionId}-custom`}
            type="number"
            min={1}
            max={180}
            step={1}
            value={customMinutes}
            onChange={(e) => {
              setCustomMinutes(e.target.value)
              setValidationError(null)
            }}
            className="mt-2 w-full max-w-[160px] rounded-lg border border-white/10 bg-bg-main/60 px-3 py-2.5 text-sm text-text-main"
          />
          {validationError && (
            <p className="mt-2 text-sm text-fire-orange" role="alert">
              {validationError}
            </p>
          )}
        </div>
      )}

      {timerActive && (
        <div className="mt-4 flex items-center gap-2 rounded-xl border border-calm-cyan/20 bg-calm-cyan/5 px-4 py-3">
          <Timer className="h-4 w-4 text-calm-cyan" aria-hidden="true" />
          <span className="text-sm text-text-main">
            Timer running: <span className="tabular-nums font-medium">{timerFormatted}</span>
          </span>
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="button"
          className="min-h-[44px] rounded-xl border border-calm-cyan/30 bg-calm-cyan/10 px-5 py-2.5 text-sm font-semibold text-calm-cyan transition-colors hover:bg-calm-cyan/15 disabled:cursor-not-allowed disabled:opacity-40"
          onClick={() => void handleStart(true)}
          disabled={!selectedSound}
        >
          Start Timer &amp; Play
        </button>
        <button
          type="button"
          className="min-h-[44px] rounded-xl border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-medium text-text-muted transition-colors hover:text-text-main disabled:cursor-not-allowed disabled:opacity-40"
          onClick={() => void handleStart(false)}
          disabled={!selectedSound}
        >
          Start Timer
        </button>
        {timerActive && (
          <button
            type="button"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-white/10 px-5 py-2.5 text-sm font-medium text-text-muted transition-colors hover:text-text-main"
            onClick={cancelTimer}
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Cancel Timer
          </button>
        )}
      </div>
    </section>
  )
}
