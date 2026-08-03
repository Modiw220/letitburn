import { aboutPlatformFeatures } from '../../data/aboutPlatformFeatures'
import PlatformFeatureCard from './PlatformFeatureCard'

export default function PlatformDefinition() {
  return (
    <section id="what-it-is" className="about-anchor-section mt-16 md:mt-20" aria-labelledby="what-it-is-heading">
      <h2 id="what-it-is-heading" className="font-heading text-2xl font-semibold text-text-main md:text-3xl">
        What this platform is.
      </h2>

      <div className="mt-6 max-w-[720px] space-y-4 text-sm leading-relaxed text-text-muted md:text-base">
        <p>
          Let It Burn is a private self-reflection and relaxation platform. It gives people simple
          ways to release a thought, slow down through drawing, listen to steady sounds, or notice
          emotional patterns through short quizzes.
        </p>
        <p>
          The tools are designed to be easy to begin. You should not need to build a profile, prepare
          an explanation, or turn a private moment into public content.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {aboutPlatformFeatures.map((feature) => (
          <PlatformFeatureCard key={feature.id} feature={feature} />
        ))}
      </div>
    </section>
  )
}
