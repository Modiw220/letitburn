import { Link } from 'react-router-dom'
import logoImage from '../../assets/let-it-burn-logo.png'

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
      <img
        src={logoImage}
        alt=""
        className="h-10 w-10 shrink-0 object-contain mix-blend-lighten sm:h-11 sm:w-11"
        aria-hidden="true"
      />
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
