import { Link } from 'react-router-dom'
import type { AboutToolLink } from '../../types/about'
import { ABOUT_ACCENT_COLORS, getAboutIcon } from './aboutUtils'

interface AboutToolCardProps {
  tool: AboutToolLink
}

export default function AboutToolCard({ tool }: AboutToolCardProps) {
  const Icon = getAboutIcon(tool.icon)
  const color = ABOUT_ACCENT_COLORS[tool.accent]

  return (
    <article
      className="about-tool-card flex h-full flex-col rounded-2xl border border-border-card bg-bg-card/60 p-5 md:p-6"
      style={{ boxShadow: `0 0 0 1px ${color}10` }}
    >
      <div
        className="flex h-10 w-10 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${color}18`, color }}
        aria-hidden="true"
      >
        <Icon className="h-5 w-5" strokeWidth={1.5} />
      </div>
      <h3 className="mt-4 font-heading text-lg font-semibold text-text-main">{tool.title}</h3>
      <p className="mt-2 text-xs font-medium uppercase tracking-wide text-text-muted">
        Best for
      </p>
      <p className="mt-1 text-sm text-text-main">{tool.moment}</p>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-text-muted">{tool.description}</p>
      <Link
        to={tool.route}
        className="mt-5 inline-flex min-h-[44px] items-center text-sm font-medium underline-offset-2 hover:underline"
        style={{ color }}
      >
        {tool.actionLabel}
      </Link>
    </article>
  )
}
