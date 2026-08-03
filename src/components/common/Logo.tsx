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
      className={`group inline-flex min-w-0 items-center gap-2.5 no-underline focus-visible:rounded-lg sm:gap-3 ${className}`}
      aria-label="Let It Burn — Home"
    >
      <span
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/25 transition-colors group-hover:border-fire-orange/60 sm:h-11 sm:w-11"
        aria-hidden="true"
      >
        <Flame className="h-5 w-5 text-fire-orange" strokeWidth={1.75} />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="truncate font-heading text-base font-semibold leading-tight tracking-tight text-text-main sm:text-lg">
          Let It Burn
        </span>
        {showTagline && (
          <span className="hidden text-[10px] font-medium uppercase tracking-[0.18em] text-text-muted sm:block">
            Write it. Burn it. Breathe.
          </span>
        )}
      </span>
    </Link>
  )
}
