import type { ReactNode } from 'react'

interface TrustStripItem {
  label: string
  value?: string
  href?: string
}

interface TrustStripProps {
  tone?: 'calm' | 'support' | 'warning'
  items: TrustStripItem[]
  action?: ReactNode
  className?: string
}

export default function TrustStrip({
  tone = 'calm',
  items,
  action,
  className = '',
}: TrustStripProps) {
  return (
    <div data-trust-tone={tone} className={`surface-trust-strip ${className}`.trim()}>
      <ul className="trust-strip-grid">
        {items.map((item) => (
          <li key={`${item.label}-${item.value ?? item.href ?? 'item'}`}>
            <span className="trust-strip-label">{item.label}</span>
            {item.href ? (
              <a href={item.href} className="trust-strip-link">
                {item.value ?? item.href}
              </a>
            ) : (
              <span className="trust-strip-value">{item.value}</span>
            )}
          </li>
        ))}
      </ul>
      {action ? <div className="trust-strip-action">{action}</div> : null}
    </div>
  )
}
