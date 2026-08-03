import { Link } from 'react-router-dom'
import { aboutBoundaries } from '../../data/aboutBoundaries'
import type { PlatformBoundary } from '../../types/about'
import { getAboutIcon } from './aboutUtils'

interface BoundaryCardProps {
  boundary: PlatformBoundary
}

function BoundaryCard({ boundary }: BoundaryCardProps) {
  const Icon = getAboutIcon(boundary.icon)

  return (
    <article className="about-boundary-card flex gap-4 rounded-2xl border border-white/8 bg-white/[0.02] p-5">
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.04] text-text-muted"
        aria-hidden="true"
      >
        <Icon className="h-5 w-5" strokeWidth={1.5} />
      </div>
      <div>
        <h3 className="font-medium text-text-main">{boundary.title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-text-muted">{boundary.description}</p>
      </div>
    </article>
  )
}

export default function PlatformBoundaries() {
  return (
    <section
      id="what-it-is-not"
      className="about-anchor-section mt-16 md:mt-20"
      aria-labelledby="what-it-is-not-heading"
    >
      <h2
        id="what-it-is-not-heading"
        className="font-heading text-2xl font-semibold text-text-main md:text-3xl"
      >
        What this platform is not.
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {aboutBoundaries.map((boundary) => (
          <BoundaryCard key={boundary.id} boundary={boundary} />
        ))}
      </div>

      <p className="mt-6">
        <Link
          to="/safety-resources"
          className="text-sm text-calm-cyan underline-offset-2 hover:underline"
        >
          View safety resources
        </Link>
      </p>
    </section>
  )
}
