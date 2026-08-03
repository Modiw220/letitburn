import { aboutToolLinks } from '../../data/aboutToolLinks'
import AboutToolCard from './AboutToolCard'

export default function AboutToolsGrid() {
  return (
    <section className="mt-16 md:mt-20" aria-labelledby="tools-heading">
      <h2 id="tools-heading" className="font-heading text-2xl font-semibold text-text-main md:text-3xl">
        Different moments need different tools.
      </h2>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {aboutToolLinks.map((tool) => (
          <AboutToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  )
}
