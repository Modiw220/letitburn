import { Flower2, Square } from 'lucide-react'
import type { DrawingMode } from '../../types/drawing'

interface ModeSelectorProps {
  mode: DrawingMode
  onChange: (mode: DrawingMode) => void
}

export default function ModeSelector({ mode, onChange }: ModeSelectorProps) {
  return (
    <div
      className="flex w-full max-w-full flex-col gap-1 rounded-xl border border-border-card bg-bg-card p-1 sm:inline-flex sm:w-auto sm:flex-row"
      role="group"
      aria-label="Drawing mode"
    >
      <button
        type="button"
        onClick={() => onChange('blank')}
        aria-pressed={mode === 'blank'}
        className={`inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors sm:w-auto sm:justify-start ${
          mode === 'blank'
            ? 'bg-accent-purple/20 text-text-main shadow-[0_0_20px_rgba(154,104,245,0.15)]'
            : 'text-text-muted hover:text-text-main'
        }`}
      >
        <Square className="h-4 w-4 shrink-0" aria-hidden="true" />
        Blank Canvas
      </button>
      <button
        type="button"
        onClick={() => onChange('template')}
        aria-pressed={mode === 'template'}
        className={`inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors sm:w-auto sm:justify-start ${
          mode === 'template'
            ? 'bg-calm-cyan/15 text-text-main shadow-[0_0_20px_rgba(70,202,212,0.12)]'
            : 'text-text-muted hover:text-text-main'
        }`}
      >
        <Flower2 className="h-4 w-4 shrink-0" aria-hidden="true" />
        Coloring Templates
      </button>
    </div>
  )
}
