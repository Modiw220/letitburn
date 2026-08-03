import { tools } from '../../data/tools'
import ToolCard from './ToolCard'

export default function ToolsSection() {
  return (
    <section
      id="tools"
      className="content-container scroll-mt-24 py-8 md:py-12"
      aria-labelledby="tools-heading"
    >
      <h2 id="tools-heading" className="sr-only">
        Wellness tools
      </h2>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  )
}
