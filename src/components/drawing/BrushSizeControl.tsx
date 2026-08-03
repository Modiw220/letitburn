import { BRUSH_PRESETS } from '../../types/drawing'

interface BrushSizeControlProps {
  brushSize: number
  onChange: (size: number) => void
}

export default function BrushSizeControl({
  brushSize,
  onChange,
}: BrushSizeControlProps) {
  return (
    <div className="space-y-4">
      <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
        Brush size
      </p>

      <div className="flex flex-wrap items-end gap-2">
        {BRUSH_PRESETS.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => onChange(size)}
            aria-label={`${size} pixel brush`}
            aria-pressed={brushSize === size}
            title={`${size}px`}
            className={`flex h-11 w-11 items-center justify-center rounded-full border transition-colors ${
              brushSize === size
                ? 'border-accent-purple bg-accent-purple/15'
                : 'border-border-card hover:border-white/25'
            }`}
          >
            <span
              className="rounded-full bg-text-main"
              style={{ width: Math.max(size * 0.6, 4), height: Math.max(size * 0.6, 4) }}
              aria-hidden="true"
            />
          </button>
        ))}
      </div>

      <div>
        <label htmlFor="brush-size-slider" className="sr-only">
          Brush size
        </label>
        <input
          id="brush-size-slider"
          type="range"
          min={2}
          max={50}
          value={brushSize}
          onChange={(event) => onChange(Number(event.target.value))}
          className="w-full accent-accent-purple"
        />
        <p className="mt-1 text-center text-xs text-text-muted">{brushSize}px</p>
      </div>
    </div>
  )
}
