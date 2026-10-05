import { Check } from 'lucide-react'
import { drawingColors, lightDrawingColorValues } from '../../data/drawingColors'

interface ColorPaletteProps {
  selectedColor: string
  onSelect: (color: string) => void
  customColor: string
  onCustomChange: (color: string) => void
}

export default function ColorPalette({
  selectedColor,
  onSelect,
  customColor,
  onCustomChange,
}: ColorPaletteProps) {
  return (
    <div className="space-y-4">
      <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
        Colors
      </p>
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-8">
        {drawingColors.map((color) => {
          const isSelected = selectedColor === color.value
          return (
            <button
              key={color.value}
              type="button"
              onClick={() => onSelect(color.value)}
              aria-label={color.name}
              aria-pressed={isSelected}
              title={color.name}
              className={`relative flex h-11 w-11 items-center justify-center rounded-full border-2 transition-transform hover:scale-105 ${
                isSelected
                  ? 'border-white ring-2 ring-accent-purple/50'
                  : color.value === '#FFFFFF'
                    ? 'border-white/30'
                    : 'border-transparent'
              }`}
              style={{ backgroundColor: color.value }}
            >
              {isSelected && (
                <Check
                  className="h-4 w-4"
                  style={{
                    color: lightDrawingColorValues.has(color.value)
                      ? '#2F3542'
                      : '#FFFFFF',
                  }}
                  aria-hidden="true"
                />
              )}
            </button>
          )
        })}
      </div>

      <div>
        <label
          htmlFor="custom-color"
          className="mb-2 block text-xs font-medium text-text-muted"
        >
          Custom color
        </label>
        <div className="flex items-center gap-3">
          <input
            id="custom-color"
            type="color"
            value={customColor}
            onChange={(event) => {
              onCustomChange(event.target.value)
              onSelect(event.target.value)
            }}
            className="h-11 w-11 cursor-pointer rounded-lg border border-border-card bg-transparent"
          />
          <span className="font-mono text-xs text-text-muted">{customColor}</span>
        </div>
      </div>
    </div>
  )
}
