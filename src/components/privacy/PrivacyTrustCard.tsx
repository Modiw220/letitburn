import type { ReactNode } from 'react'

interface PrivacyTrustCardProps {
  icon: ReactNode
  heading: string
  text: string
  action?: ReactNode
}

export default function PrivacyTrustCard({ icon, heading, text, action }: PrivacyTrustCardProps) {
  return (
    <article className="privacy-trust-card rounded-2xl border border-white/10 bg-bg-card/60 p-5">
      <div aria-hidden="true">{icon}</div>
      <h3 className="mt-4 text-sm font-semibold text-text-main">{heading}</h3>
      <p className="mt-2 text-sm leading-relaxed text-text-muted">{text}</p>
      {action && <div className="mt-4">{action}</div>}
    </article>
  )
}
