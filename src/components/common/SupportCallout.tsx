import { Heart } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { PageArchetype } from '../../utils/pageArchetypes'

interface SupportCalloutProps {
  id?: string
  title: string
  description: string
  ctaLabel?: string
  ctaHref?: string
  className?: string
  secondaryText?: string
  variant?: PageArchetype
}

export default function SupportCallout({
  id,
  title,
  description,
  ctaLabel = 'Support Let It Burn',
  ctaHref = '/support',
  className = '',
  secondaryText,
  variant = 'discovery',
}: SupportCalloutProps) {
  return (
    <section
      id={id}
      data-surface={variant}
      className={`rounded-2xl border border-support-gold/20 bg-[linear-gradient(180deg,rgba(246,185,59,0.08),rgba(15,27,44,0.7))] px-6 py-7 text-center md:px-10 ${className}`.trim()}
    >
      <h2 className="font-heading text-xl font-semibold text-text-main md:text-2xl">
        {title}
      </h2>
      <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-text-muted">
        {description}
      </p>
      <Link
        to={ctaHref}
        className="mt-6 inline-flex min-h-[48px] items-center justify-center gap-2 rounded-xl border border-support-gold/35 bg-support-gold/10 px-6 py-3 text-sm font-semibold text-support-gold transition-transform hover:-translate-y-0.5"
      >
        <Heart className="h-4 w-4 fill-support-gold" aria-hidden="true" />
        {ctaLabel}
      </Link>
      {secondaryText && (
        <p className="mt-4 text-sm text-text-muted">{secondaryText}</p>
      )}
    </section>
  )
}
