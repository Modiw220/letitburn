import PageSectionIntro from '../common/PageSectionIntro'
import { tools } from '../../data/tools'
import ToolCard from './ToolCard'

export default function ToolsSection() {
  return (
    <section
      id="tools"
      className="content-container scroll-mt-24 py-8 md:py-12"
      aria-labelledby="tools-heading"
    >
      <div className="rounded-[28px] border border-border-card bg-bg-card/50 px-5 py-6 md:px-7 md:py-8">
        <PageSectionIntro
          eyebrow="Choose a starting point"
          title="A different tool for each kind of pause."
          description="Some moments need release. Others need color, sound, or a quieter reflection. Start with the tool that asks the least from you."
          className="mb-8"
        />

        <h2 id="tools-heading" className="sr-only">
          Wellness tools
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {tools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </div>
    </section>
  )
}
