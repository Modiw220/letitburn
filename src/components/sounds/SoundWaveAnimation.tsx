import { useReducedMotion } from '../../hooks/useReducedMotion'

interface SoundWaveAnimationProps {
  active?: boolean
  className?: string
  barCount?: number
}

export default function SoundWaveAnimation({
  active = false,
  className = '',
  barCount = 4,
}: SoundWaveAnimationProps) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return (
      <div
        className={`flex items-end gap-1 ${className}`}
        aria-hidden="true"
      >
        {Array.from({ length: barCount }).map((_, i) => (
          <span
            key={i}
            className={`w-1 rounded-full bg-current transition-opacity ${
              active ? 'opacity-80' : 'opacity-30'
            }`}
            style={{ height: `${8 + (i % 3) * 4}px` }}
          />
        ))}
      </div>
    )
  }

  return (
    <div
      className={`sound-wave flex items-end gap-1 ${active ? 'sound-wave--active' : ''} ${className}`}
      aria-hidden="true"
    >
      {Array.from({ length: barCount }).map((_, i) => (
        <span
          key={i}
          className="sound-wave-bar w-1 rounded-full bg-current"
          style={{ animationDelay: `${i * 0.12}s` }}
        />
      ))}
    </div>
  )
}
