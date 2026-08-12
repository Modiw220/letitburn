import { Link } from 'react-router-dom'
import { Lock } from 'lucide-react'
import type { ColoringTemplate } from '../../types/drawing'

interface TemplateCardProps {
  template: ColoringTemplate
  isSelected: boolean
  locked: boolean
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
  locked,
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
      <div className="relative flex aspect-[4/3] items-center justify-center bg-[#FAF8F3] p-6">
        <img
          src={template.thumbnail}
          alt=""
          className={`max-h-full max-w-full object-contain ${locked ? 'opacity-50' : ''}`}
          aria-hidden="true"
        />
        {locked && (
          <div className="absolute inset-0 flex items-center justify-center bg-[#FAF8F3]/55">
            <span className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-white/90 px-2.5 py-1 text-[11px] font-medium text-stone-700">
              <Lock className="h-3 w-3" aria-hidden="true" />
              Premium pack
            </span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-heading text-base font-semibold text-text-main">
          {template.title}
        </h3>
        <p className="mt-1 text-xs text-text-muted">
          {difficultyLabels[template.difficulty]}
          {template.premium ? ' · Premium' : ''}
        </p>
        {locked ? (
          <Link
            to="/pricing"
            className="mt-4 inline-flex items-center justify-center rounded-xl border border-calm-cyan/35 bg-calm-cyan/10 px-4 py-2.5 text-sm font-semibold text-calm-cyan"
          >
            Unlock on pricing
          </Link>
        ) : (
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
        )}
      </div>
    </article>
  )
}
