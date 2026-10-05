import type { ColoringTemplate } from '../../types/drawing'

interface TemplateCardProps {
  template: ColoringTemplate
  isSelected: boolean
  onSelect: (template: ColoringTemplate) => void
}

const difficultyLabels = {
  simple: 'Simple',
  medium: 'Medium',
  detailed: 'Detailed',
} as const

export default function TemplateCard({
  template,
  isSelected,
  onSelect,
}: TemplateCardProps) {
  return (
    <article
      className={`flex flex-col overflow-hidden rounded-2xl border bg-bg-card transition-all ${
        isSelected
          ? 'border-accent-purple shadow-[0_0_24px_rgba(154,104,245,0.15)]'
          : 'border-border-card hover:border-white/20'
      }`}
    >
      <div className="flex aspect-[4/3] items-center justify-center bg-[#FAF8F3] p-6">
        <img
          src={template.thumbnail}
          alt=""
          className="max-h-full max-w-full object-contain"
          aria-hidden="true"
          data-pin-nopin="true"
        />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-heading text-base font-semibold text-text-main">
          {template.title}
        </h3>
        <p className="mt-1 text-xs text-text-muted">
          {difficultyLabels[template.difficulty]}
        </p>
        <button
          type="button"
          onClick={() => onSelect(template)}
          className={`mt-4 rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${
            isSelected
              ? 'bg-accent-purple/20 text-accent-purple'
              : 'border border-border-card text-text-main hover:border-white/25'
          }`}
        >
          {isSelected ? 'Selected' : 'Use Template'}
        </button>
      </div>
    </article>
  )
}
