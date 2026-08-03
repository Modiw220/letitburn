import type { ReactNode } from 'react'

interface PageSectionIntroProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  actions?: ReactNode
  className?: string
}

export default function PageSectionIntro({
  eyebrow,
  title,
  description,
  align = 'left',
  actions,
  className = '',
}: PageSectionIntroProps) {
  const isCenter = align === 'center'

  return (
    <div className={`${isCenter ? 'text-center' : ''} ${className}`.trim()}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-calm-cyan">
          {eyebrow}
        </p>
      )}
      <h2
        className={`font-heading text-2xl font-semibold text-text-main md:text-3xl ${
          eyebrow ? 'mt-3' : ''
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-3 text-sm leading-relaxed text-text-muted md:text-base ${
            isCenter ? 'mx-auto max-w-2xl' : 'max-w-2xl'
          }`}
        >
          {description}
        </p>
      )}
      {actions && (
        <div
          className={`mt-5 flex flex-wrap gap-3 ${
            isCenter ? 'justify-center' : ''
          }`}
        >
          {actions}
        </div>
      )}
    </div>
  )
}
