import type { ReactNode } from 'react'
import type { PageArchetype } from '../../utils/pageArchetypes'

interface PageHeroProps {
  variant: PageArchetype
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  meta?: ReactNode
  actions?: ReactNode
  children?: ReactNode
  className?: string
}

export default function PageHero({
  variant,
  eyebrow,
  title,
  description,
  align = 'left',
  meta,
  actions,
  children,
  className = '',
}: PageHeroProps) {
  return (
    <section
      data-hero-variant={variant}
      className={`surface-hero-stage hero-align-${align} ${className}`.trim()}
    >
      {eyebrow ? <p className="hero-eyebrow">{eyebrow}</p> : null}
      <div className="hero-copy">
        <h1 className="hero-title">{title}</h1>
        {description ? <div className="hero-description">{description}</div> : null}
        {meta ? <div className="hero-meta">{meta}</div> : null}
        {actions ? <div className="hero-actions">{actions}</div> : null}
      </div>
      {children}
    </section>
  )
}
