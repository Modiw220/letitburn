import { Flame } from 'lucide-react'
import { Link } from 'react-router-dom'

interface LogoProps {
  className?: string
  showTagline?: boolean
}

export default function Logo({ className = '', showTagline = true }: LogoProps) {
  return (
    <Link
      to="/"
      className={`group inline-flex items-center gap-3 no-underline focus-visible:rounded-lg ${className}`}
      aria-label="Let It Burn — Home"
    >
      <span
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 transition-colors group-hover:border-fire-orange/60"
        aria-hidden="true"
      >
        <Flame className="h-5 w-5 text-fire-orange" strokeWidth={1.75} />
      </span>
      <span className="flex flex-col">
        <span className="font-heading text-lg font-semibold leading-tight tracking-tight text-text-main">
          Let It Burn
        </span>
        {showTagline && (
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-text-muted">
            Write it. Burn it. Breathe.
          </span>
        )}
      </span>
    </Link>
  )
}
