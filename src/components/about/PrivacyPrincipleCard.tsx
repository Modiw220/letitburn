import type { PrivacyPrinciple } from '../../types/about'
import { getAboutIcon } from './aboutUtils'

interface PrivacyPrincipleCardProps {
  principle: PrivacyPrinciple
}

export default function PrivacyPrincipleCard({ principle }: PrivacyPrincipleCardProps) {
  const Icon = getAboutIcon(principle.icon)

  return (
    <article className="about-privacy-card flex h-full flex-col rounded-2xl border border-border-card bg-bg-card/60 p-5 md:p-6">
      <div
        className="flex h-10 w-10 items-center justify-center rounded-xl bg-calm-cyan/10 text-calm-cyan"
        aria-hidden="true"
      >
        <Icon className="h-5 w-5" strokeWidth={1.5} />
      </div>
      <h3 className="mt-4 font-heading text-lg font-semibold text-text-main">{principle.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-text-muted">{principle.description}</p>
    </article>
  )
}
